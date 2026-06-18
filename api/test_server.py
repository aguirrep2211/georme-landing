import os
import unittest
from unittest.mock import patch

import server


VALID_PAYLOAD = {
    "name": "Ada Lovelace",
    "company": "Analytical Engines",
    "email": "ada@example.com",
    "phone": "+34 600 000 000",
    "service": "consultoria-gis",
    "message": "Necesitamos analizar datos territoriales para un nuevo proyecto.",
    "language": "es",
    "website": "",
}


class ContactApiTests(unittest.TestCase):
    def test_validates_contact(self):
        contact = server.validate_payload(VALID_PAYLOAD)
        self.assertEqual(contact["email"], "ada@example.com")
        self.assertEqual(contact["service"], "consultoria-gis")

    def test_rejects_unknown_service(self):
        payload = {**VALID_PAYLOAD, "service": "unknown"}
        with self.assertRaises(server.ValidationError):
            server.validate_payload(payload)

    def test_honeypot_is_silently_accepted(self):
        payload = {**VALID_PAYLOAD, "website": "https://spam.example"}
        self.assertIsNone(server.validate_payload(payload))

    def test_builds_odoo_opportunity(self):
        contact = server.validate_payload(VALID_PAYLOAD)
        with patch.dict(os.environ, {}, clear=True):
            values = server.build_lead_values(contact)

        self.assertEqual(values["type"], "opportunity")
        self.assertEqual(values["contact_name"], "Ada Lovelace")
        self.assertEqual(values["partner_name"], "Analytical Engines")
        self.assertIn("Consultoría GIS", values["name"])

    def test_escapes_message_html(self):
        payload = {**VALID_PAYLOAD, "message": "<script>alert('x')</script> proyecto válido"}
        contact = server.validate_payload(payload)
        with patch.dict(os.environ, {}, clear=True):
            values = server.build_lead_values(contact)

        self.assertNotIn("<script>", values["description"])
        self.assertIn("&lt;script&gt;", values["description"])


if __name__ == "__main__":
    unittest.main()
