# GeoRMe — Geoscience · Remote · Metrics

Landing page for GeoRMe, a geospatial and remote sensing services initiative focused on:

- aerial inspection
- thermal imaging
- industrial and infrastructure inspection
- photovoltaic inspection
- environmental and scientific data acquisition
- geospatial processing and remote sensing workflows

The website is designed as a lightweight static site using plain HTML, CSS and JavaScript, with multilingual support and responsive layout.

---

# Project Goals

The objective of this repository is to provide:

- a fast-loading technical landing page
- multilingual support for Southern European operations
- lightweight deployment architecture
- compatibility with static hosting platforms
- scalable structure for future service expansion

The current operational target regions are:

- Spain
- Portugal
- Southern France

---

# Contact form and Odoo CRM

The contact form posts JSON to the same-origin `/api/contact` endpoint. The
`contact-api` service validates the request and creates an opportunity in
Odoo's `crm.lead` model. Odoo credentials are never sent to the browser.

Deployment:

1. Copy `deploy/.env.example` to `deploy/.env`.
2. Add the Odoo URL and API key.
3. Use `ODOO_API_MODE=json2` for Odoo 19, or `xmlrpc` for Odoo 18 and earlier.
4. Run `docker compose up -d --build` from the `deploy` directory.

`ODOO_SOURCE_ID` and `ODOO_TEAM_ID` are optional numeric IDs for routing web
opportunities inside Odoo.

---

# Technologies

```text
HTML5
CSS3
Vanilla JavaScript
