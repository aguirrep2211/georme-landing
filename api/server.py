import html
import json
import logging
import os
import re
import threading
import time
import urllib.error
import urllib.request
import xmlrpc.client
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer


logging.basicConfig(
    level=os.getenv("LOG_LEVEL", "INFO"),
    format="%(asctime)s %(levelname)s %(message)s",
)
LOGGER = logging.getLogger("georme-contact-api")

MAX_BODY_BYTES = 16_384
EMAIL_PATTERN = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
GENERIC_EMAIL_DOMAINS = {
    "gmail.com",
    "hotmail.com",
    "outlook.com",
    "yahoo.com",
    "icloud.com",
    "proton.me",
    "protonmail.com",
}
ALLOWED_SERVICES = {
    "energia": "Energía",
    "industrial": "Inspección industrial e infraestructuras",
    "investigacion": "Medio ambiente y gestión del territorio",
    "consultoria-gis": "Consultoría GIS e inteligencia espacial",
    "otro": "Otro",
}


class ConfigurationError(RuntimeError):
    pass


class ValidationError(ValueError):
    pass


class RateLimiter:
    def __init__(self, limit=5, window_seconds=600):
        self.limit = limit
        self.window_seconds = window_seconds
        self._requests = {}
        self._lock = threading.Lock()

    def allow(self, client_ip):
        now = time.monotonic()
        threshold = now - self.window_seconds

        with self._lock:
            timestamps = [
                timestamp
                for timestamp in self._requests.get(client_ip, [])
                if timestamp > threshold
            ]
            if len(timestamps) >= self.limit:
                self._requests[client_ip] = timestamps
                return False

            timestamps.append(now)
            self._requests[client_ip] = timestamps
            return True


RATE_LIMITER = RateLimiter(
    limit=int(os.getenv("RATE_LIMIT_REQUESTS", "5")),
    window_seconds=int(os.getenv("RATE_LIMIT_WINDOW_SECONDS", "600")),
)


def required_setting(name):
    value = os.getenv(name, "").strip()
    if not value:
        raise ConfigurationError(f"Missing required setting: {name}")
    return value


def clean_text(value, field, minimum=0, maximum=2000):
    if not isinstance(value, str):
        raise ValidationError(f"Invalid {field}")

    cleaned = " ".join(value.split()) if field != "message" else value.strip()
    if len(cleaned) < minimum or len(cleaned) > maximum:
        raise ValidationError(f"Invalid {field}")
    return cleaned


def clean_string_list(value, field, maximum_items=10):
    if not isinstance(value, list) or len(value) > maximum_items:
        raise ValidationError(f"Invalid {field}")

    return [
        clean_text(item, field, 1, 80)
        for item in value
    ]


def validate_attribution(value):
    if value is None:
        value = {}
    if not isinstance(value, dict):
        raise ValidationError("Invalid attribution")

    allowed_fields = (
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_content",
        "utm_term",
        "landing_page",
        "referrer",
    )
    return {
        field: clean_text(value.get(field, ""), field, 0, 160)
        for field in allowed_fields
    }


def validate_engagement(value):
    if value is None:
        value = {}
    if not isinstance(value, dict):
        raise ValidationError("Invalid engagement")

    sections = clean_string_list(
        value.get("viewed_sections", []),
        "viewed_sections",
    )
    try:
        scroll_depth = int(value.get("max_scroll_depth", 0))
        seconds_on_page = int(value.get("seconds_on_page", 0))
    except (TypeError, ValueError) as error:
        raise ValidationError("Invalid engagement") from error

    if not 0 <= scroll_depth <= 100 or not 0 <= seconds_on_page <= 86_400:
        raise ValidationError("Invalid engagement")

    return {
        "viewed_sections": sections,
        "max_scroll_depth": scroll_depth,
        "seconds_on_page": seconds_on_page,
    }


def validate_payload(payload):
    if not isinstance(payload, dict):
        raise ValidationError("Invalid payload")

    if payload.get("website"):
        return None

    name = clean_text(payload.get("name", ""), "name", 2, 80)
    email = clean_text(payload.get("email", ""), "email", 5, 120).lower()
    if not EMAIL_PATTERN.fullmatch(email):
        raise ValidationError("Invalid email")

    service = clean_text(payload.get("service", ""), "service", 1, 40)
    if service not in ALLOWED_SERVICES:
        raise ValidationError("Invalid service")

    return {
        "name": name,
        "company": clean_text(payload.get("company", ""), "company", 0, 120),
        "email": email,
        "phone": clean_text(payload.get("phone", ""), "phone", 0, 40),
        "service": service,
        "message": clean_text(payload.get("message", ""), "message", 20, 2000),
        "language": clean_text(payload.get("language", "en"), "language", 2, 10),
        "attribution": validate_attribution(payload.get("attribution")),
        "engagement": validate_engagement(payload.get("engagement")),
    }


def calculate_lead_score(contact):
    score = 15
    reasons = ["Servicio concreto (+15)"]

    email_domain = contact["email"].rsplit("@", 1)[-1]
    if email_domain not in GENERIC_EMAIL_DOMAINS:
        score += 20
        reasons.append("Email corporativo (+20)")
    if contact["company"]:
        score += 20
        reasons.append("Empresa indicada (+20)")
    if len(contact["message"]) >= 120:
        score += 15
        reasons.append("Consulta detallada (+15)")
    if contact["attribution"]["utm_campaign"]:
        score += 10
        reasons.append("Campaña identificada (+10)")
    if len(contact["engagement"]["viewed_sections"]) >= 3:
        score += 10
        reasons.append("Interés en varias secciones (+10)")

    return min(score, 100), reasons


def build_lead_values(contact):
    service_name = ALLOWED_SERVICES[contact["service"]]
    message = html.escape(contact["message"]).replace("\n", "<br>")
    attribution = contact["attribution"]
    engagement = contact["engagement"]
    score, score_reasons = calculate_lead_score(contact)
    attribution_rows = "".join(
        f"<li><strong>{html.escape(key)}:</strong> {html.escape(value)}</li>"
        for key, value in attribution.items()
        if value
    ) or "<li>Acceso directo o atribución no disponible</li>"
    sections = ", ".join(engagement["viewed_sections"]) or "No disponible"
    score_rows = "".join(
        f"<li>{html.escape(reason)}</li>"
        for reason in score_reasons
    )
    description = (
        f"<p><strong>Servicio:</strong> {html.escape(service_name)}</p>"
        f"<p><strong>Idioma:</strong> {html.escape(contact['language'])}</p>"
        f"<p><strong>Mensaje:</strong><br>{message}</p>"
        f"<h3>Atribución web</h3><ul>{attribution_rows}</ul>"
        f"<p><strong>Secciones vistas:</strong> {html.escape(sections)}<br>"
        f"<strong>Profundidad máxima:</strong> {engagement['max_scroll_depth']}%<br>"
        f"<strong>Tiempo en página:</strong> {engagement['seconds_on_page']} s</p>"
        f"<h3>Puntuación inicial: {score}/100</h3><ul>{score_rows}</ul>"
    )
    values = {
        "name": f"[{score}/100] Web GeoRMe — {service_name} — {contact['name']}",
        "type": "opportunity",
        "contact_name": contact["name"],
        "email_from": contact["email"],
        "description": description,
        "priority": "3" if score >= 60 else "2" if score >= 40 else "1",
    }

    if contact["company"]:
        values["partner_name"] = contact["company"]
    if contact["phone"]:
        values["phone"] = contact["phone"]

    source_id = os.getenv("ODOO_SOURCE_ID", "").strip()
    if source_id:
        try:
            values["source_id"] = int(source_id)
        except ValueError as error:
            raise ConfigurationError("ODOO_SOURCE_ID must be an integer") from error

    team_id = os.getenv("ODOO_TEAM_ID", "").strip()
    if team_id:
        try:
            values["team_id"] = int(team_id)
        except ValueError as error:
            raise ConfigurationError("ODOO_TEAM_ID must be an integer") from error

    score_field = os.getenv("ODOO_SCORE_FIELD", "").strip()
    if score_field:
        if not re.fullmatch(r"x_[a-z0-9_]+", score_field):
            raise ConfigurationError("ODOO_SCORE_FIELD must be a custom x_ field")
        values[score_field] = score

    return values


def create_lead_json2(values):
    base_url = required_setting("ODOO_URL").rstrip("/")
    api_key = required_setting("ODOO_API_KEY")
    headers = {
        "Authorization": f"bearer {api_key}",
        "Content-Type": "application/json",
        "User-Agent": "GeoRMe contact API/1.0",
    }
    database = os.getenv("ODOO_DATABASE", "").strip()
    if database:
        headers["X-Odoo-Database"] = database

    request = urllib.request.Request(
        f"{base_url}/json/2/crm.lead/create",
        data=json.dumps({"vals": values}).encode("utf-8"),
        headers=headers,
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=15) as response:
        result = json.loads(response.read().decode("utf-8"))

    if type(result) is not int:
        raise RuntimeError("Odoo returned an invalid lead identifier")
    return result


def create_lead_xmlrpc(values):
    base_url = required_setting("ODOO_URL").rstrip("/")
    database = required_setting("ODOO_DATABASE")
    username = required_setting("ODOO_USERNAME")
    api_key = required_setting("ODOO_API_KEY")

    common = xmlrpc.client.ServerProxy(
        f"{base_url}/xmlrpc/2/common",
        allow_none=True,
    )
    uid = common.authenticate(database, username, api_key, {})
    if not uid:
        raise RuntimeError("Odoo authentication failed")

    models = xmlrpc.client.ServerProxy(
        f"{base_url}/xmlrpc/2/object",
        allow_none=True,
    )
    lead_id = models.execute_kw(
        database,
        uid,
        api_key,
        "crm.lead",
        "create",
        [values],
    )
    if type(lead_id) is not int:
        raise RuntimeError("Odoo returned an invalid lead identifier")
    return lead_id


def create_lead(contact):
    values = build_lead_values(contact)
    api_mode = os.getenv("ODOO_API_MODE", "json2").strip().lower()

    if api_mode == "json2":
        return create_lead_json2(values)
    if api_mode == "xmlrpc":
        return create_lead_xmlrpc(values)
    raise ConfigurationError("ODOO_API_MODE must be json2 or xmlrpc")


class ContactHandler(BaseHTTPRequestHandler):
    server_version = "GeoRMeContactAPI/1.0"

    def send_json(self, status, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.end_headers()
        self.wfile.write(body)

    def client_ip(self):
        forwarded_for = self.headers.get("X-Forwarded-For", "")
        if forwarded_for:
            return forwarded_for.split(",", 1)[0].strip()
        return self.client_address[0]

    def do_GET(self):
        if self.path == "/health":
            self.send_json(200, {"status": "ok"})
            return
        self.send_json(404, {"error": "not_found"})

    def do_POST(self):
        if self.path != "/contact":
            self.send_json(404, {"error": "not_found"})
            return

        if not RATE_LIMITER.allow(self.client_ip()):
            self.send_json(429, {"error": "rate_limited"})
            return

        try:
            content_length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            self.send_json(400, {"error": "invalid_request"})
            return

        if content_length <= 0 or content_length > MAX_BODY_BYTES:
            self.send_json(413, {"error": "invalid_size"})
            return

        try:
            payload = json.loads(self.rfile.read(content_length))
            contact = validate_payload(payload)
            if contact is None:
                self.send_json(200, {"status": "accepted"})
                return

            lead_id = create_lead(contact)
            LOGGER.info("Created Odoo CRM lead id=%s", lead_id)
            self.send_json(201, {"status": "created"})
        except (json.JSONDecodeError, UnicodeDecodeError, ValidationError):
            self.send_json(400, {"error": "invalid_request"})
        except ConfigurationError:
            LOGGER.exception("Contact API is not configured correctly")
            self.send_json(503, {"error": "service_unavailable"})
        except (urllib.error.URLError, xmlrpc.client.Error, TimeoutError):
            LOGGER.exception("Odoo request failed")
            self.send_json(502, {"error": "upstream_error"})
        except Exception:
            LOGGER.exception("Unexpected contact API error")
            self.send_json(500, {"error": "internal_error"})

    def log_message(self, message_format, *args):
        LOGGER.info("%s - %s", self.client_ip(), message_format % args)


def main():
    port = int(os.getenv("PORT", "8080"))
    server = ThreadingHTTPServer(("0.0.0.0", port), ContactHandler)
    LOGGER.info("Contact API listening on port %s", port)
    server.serve_forever()


if __name__ == "__main__":
    main()
