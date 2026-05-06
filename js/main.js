const header = document.querySelector(".site-header");

function updateHeaderState() {
  if (!header) return;

  if (window.scrollY > 80) {
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

document.addEventListener("DOMContentLoaded", () => {
  updateHeaderState();

  const initialLang = detectInitialLanguage();
  setLanguage(initialLang);

  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => {
      setLanguage(button.dataset.lang);
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
});

window.addEventListener("scroll", updateHeaderState);