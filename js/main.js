const header = document.querySelector(".site-header");

function updateHeaderState() {
  if (!header) return;

  const scrollPosition =
    window.pageYOffset ||
    document.documentElement.scrollTop;

  if (scrollPosition > 40) {
    header.classList.remove("expanded");
    header.classList.add("compact");
  } else {
    header.classList.add("expanded");
    header.classList.remove("compact");
  }
}

function getNestedTranslation(obj, key) {
  return key.split(".").reduce((current, part) => {
    return current && current[part];
  }, obj);
}

function detectInitialLanguage() {
  const savedLang = localStorage.getItem("site-language");

  if (savedLang && translations[savedLang]) {
    return savedLang;
  }

  const browserLang = navigator.language.toLowerCase();

  if (browserLang.startsWith("ca")) return "ca";
  if (browserLang.startsWith("fr")) return "fr";
  if (browserLang.startsWith("es")) return "es";

  return "en";
}

function setLanguage(lang) {
  if (!translations[lang]) return;

  document.documentElement.lang = lang;
  localStorage.setItem("site-language", lang);

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const translatedText = getNestedTranslation(translations[lang], key);

    if (translatedText) {
      element.textContent = translatedText;
    } else if (lang === "es" && element.dataset.i18nDefault) {
      element.textContent = element.dataset.i18nDefault;
    }
  });

  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });

  updateServiceCatalogs(lang);
}

function renderServiceCatalog(catalog) {
  const areas = catalog.areas.map((area, index) => `
    <section class="service-catalog-card">
      <span class="service-catalog-card-number">0${index + 1}</span>
      <h5>${area[0]}</h5>
      <p>${area[1]}</p>
      <ul>${area[2].split(";").map((item) => `<li>${item}</li>`).join("")}</ul>
    </section>
  `).join("");

  const columns = catalog.columns.map((column) => `
    <section>
      <h5>${column[0]}</h5>
      <ul>${column[1].split(";").map((item) => `<li>${item}</li>`).join("")}</ul>
    </section>
  `).join("");

  return `
    <div class="service-catalog-intro">
      <p class="service-catalog-kicker">${catalog.kicker}</p>
      <h4>${catalog.heading}</h4>
      <p>${catalog.intro}</p>
    </div>
    <div class="service-catalog-areas">${areas}</div>
    <section class="service-catalog-process">
      <div>
        <p class="service-catalog-kicker">${catalog.process[0]}</p>
        <h4>${catalog.process[1]}</h4>
        <p>${catalog.process[2]}</p>
      </div>
      <ol>${catalog.process[3].split(";").map((item) => `<li>${item}</li>`).join("")}</ol>
    </section>
    <div class="service-catalog-columns">${columns}</div>
    <div class="service-catalog-closing">
      <p>${catalog.closing}</p>
      <a href="#contacto" class="btn btn-primary">${catalog.cta}</a>
    </div>
  `;
}

function updateServiceCatalogs(lang) {
  ["photovoltaic", "industrial", "research"].forEach((service) => {
    const details = document.querySelector(`.service-panel-${service} .service-catalog-details`);
    if (!details) return;

    const summary = details.querySelector("summary");
    const content = details.querySelector(".service-catalog-content");

    if (!details.dataset.defaultSummary) {
      details.dataset.defaultSummary = summary.textContent.trim();
      details.dataset.defaultContent = content.innerHTML;
    }

    const catalog = serviceCatalogTranslations?.[lang]?.[service];
    if (catalog) {
      summary.textContent = catalog.summary;
      content.innerHTML = renderServiceCatalog(catalog);
    } else {
      summary.textContent = details.dataset.defaultSummary;
      content.innerHTML = details.dataset.defaultContent;
    }
  });
}

function getCurrentTranslation(key, fallback) {
  const lang = document.documentElement.lang || "en";
  return getNestedTranslation(translations[lang] || translations.en, key) || fallback;
}

const journey = {
  startedAt: Date.now(),
  viewedSections: new Set(),
  maxScrollDepth: 0,
  formStarted: false
};

function trackEvent(name, parameters = {}) {
  if (!window.GeoRMeConsent || window.GeoRMeConsent.get() !== "accepted") return;
  window.gtag("event", name, parameters);
}

function sanitizeAttributionValue(value) {
  return String(value || "").trim().slice(0, 160);
}

function captureAttribution() {
  const params = new URLSearchParams(window.location.search);

  let referrer = "";
  if (document.referrer) {
    try {
      const referrerUrl = new URL(document.referrer);
      referrer = `${referrerUrl.hostname}${referrerUrl.pathname}`;
    } catch (error) {
      referrer = "";
    }
  }

  return {
    utm_source: sanitizeAttributionValue(params.get("utm_source")),
    utm_medium: sanitizeAttributionValue(params.get("utm_medium")),
    utm_campaign: sanitizeAttributionValue(params.get("utm_campaign")),
    utm_content: sanitizeAttributionValue(params.get("utm_content")),
    utm_term: sanitizeAttributionValue(params.get("utm_term")),
    landing_page: window.location.pathname,
    referrer
  };
}

const attribution = captureAttribution();

document.addEventListener("DOMContentLoaded", () => {
  updateHeaderState();

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.dataset.i18nDefault = element.textContent.trim();
  });

  const initialLang = detectInitialLanguage();
  setLanguage(initialLang);

  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => {
      setLanguage(button.dataset.lang);
      trackEvent("language_change", { language: button.dataset.lang });
    });
  });

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.querySelectorAll('a[href="#contacto"]').forEach((link) => {
    link.addEventListener("click", () => {
      trackEvent("contact_cta_click", { link_text: link.textContent.trim() });
    });
  });

  document.querySelectorAll('a[href*="linkedin.com"]').forEach((link) => {
    link.addEventListener("click", () => {
      trackEvent("linkedin_click", { destination: link.href });
    });
  });

  const observedSections = document.querySelectorAll("main section");
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const sectionName = entry.target.id || "hero";
      if (journey.viewedSections.has(sectionName)) return;

      journey.viewedSections.add(sectionName);
      trackEvent("section_view", { section_name: sectionName });
    });
  }, { threshold: 0.4 });

  observedSections.forEach((section) => sectionObserver.observe(section));

  const form = document.querySelector(".contact-form");

  if (form) {
    form.addEventListener("input", () => {
      if (journey.formStarted) return;
      journey.formStarted = true;
      trackEvent("form_start", { form_name: "contact" });
    });

    form.querySelector("#service").addEventListener("change", (event) => {
      trackEvent("service_interest", { service: event.target.value });
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const message = form.querySelector("#message");
      const submitButton = form.querySelector('[type="submit"]');
      const status = form.querySelector(".form-status");

      if (message.value.trim().length < 20) {
        status.textContent = getCurrentTranslation(
          "form.messageTooShort",
          "Please provide a more detailed message."
        );
        status.className = "form-status is-error";
        status.hidden = false;
        return;
      }

      const formData = new FormData(form);
      const analyticsAllowed =
        window.GeoRMeConsent &&
        window.GeoRMeConsent.get() === "accepted";
      const payload = {
        name: String(formData.get("name") || "").trim(),
        company: String(formData.get("company") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        phone: String(formData.get("phone") || "").trim(),
        service: String(formData.get("service") || "").trim(),
        message: String(formData.get("message") || "").trim(),
        website: String(formData.get("website") || ""),
        language: document.documentElement.lang || "en",
        attribution,
        engagement: analyticsAllowed ? {
          viewed_sections: Array.from(journey.viewedSections),
          max_scroll_depth: journey.maxScrollDepth,
          seconds_on_page: Math.round((Date.now() - journey.startedAt) / 1000)
        } : {}
      };

      submitButton.disabled = true;
      status.textContent = getCurrentTranslation("form.sending", "Sending…");
      status.className = "form-status";
      status.hidden = false;

      try {
        const response = await fetch(form.action, {
          method: form.method,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`Contact API returned ${response.status}`);
        }

        form.reset();
        trackEvent("generate_lead", {
          service: payload.service,
          source: attribution.utm_source || "direct"
        });
        status.textContent = getCurrentTranslation(
          "form.success",
          "Message sent successfully."
        );
        status.className = "form-status is-success";
      } catch (error) {
        console.warn("Contact request failed.", error);
        status.textContent = getCurrentTranslation(
          "form.error",
          "There was a problem sending your message. Please try again."
        );
        status.className = "form-status is-error";
      } finally {
        submitButton.disabled = false;
      }
    });
  }


});

window.addEventListener("scroll", () => {
  updateHeaderState();
  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  if (scrollableHeight <= 0) return;

  const depth = Math.min(
    100,
    Math.round((window.scrollY / scrollableHeight) * 100)
  );
  journey.maxScrollDepth = Math.max(journey.maxScrollDepth, depth);
});
window.addEventListener("touchmove", updateHeaderState);
