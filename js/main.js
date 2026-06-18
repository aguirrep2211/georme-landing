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
    }
  });

  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });
}

function getCurrentTranslation(key, fallback) {
  const lang = document.documentElement.lang || "en";
  return getNestedTranslation(translations[lang] || translations.en, key) || fallback;
}

document.addEventListener("DOMContentLoaded", () => {
  updateHeaderState();

  const initialLang = detectInitialLanguage();
  setLanguage(initialLang);

  const cookieBanner = document.querySelector("#cookieBanner");
  const acceptCookiesButton = document.querySelector("#acceptCookies");

  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => {
      setLanguage(button.dataset.lang);
    });

  if (cookieBanner && acceptCookiesButton) {
  const cookiesAccepted = localStorage.getItem("georme-cookies-accepted");

  if (!cookiesAccepted) {
    cookieBanner.hidden = false;
  }

  acceptCookiesButton.addEventListener("click", () => {
    localStorage.setItem("georme-cookies-accepted", "true");
    cookieBanner.hidden = true;
  });
}

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
  const form = document.querySelector(".contact-form");

  if (form) {
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
      const payload = {
        name: String(formData.get("name") || "").trim(),
        company: String(formData.get("company") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        phone: String(formData.get("phone") || "").trim(),
        service: String(formData.get("service") || "").trim(),
        message: String(formData.get("message") || "").trim(),
        website: String(formData.get("website") || ""),
        language: document.documentElement.lang || "en"
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

window.addEventListener("scroll", updateHeaderState);
window.addEventListener("touchmove", updateHeaderState);
