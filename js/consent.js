(() => {
  const CONSENT_KEY = "georme-analytics-consent";
  const GA_ID = "G-4J16NWSTLE";

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  function getConsent() {
    return localStorage.getItem(CONSENT_KEY);
  }

  function loadAnalytics() {
    if (document.querySelector('script[data-georme-analytics="true"]')) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script.dataset.geormeAnalytics = "true";
    document.head.appendChild(script);

    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { anonymize_ip: true });
    window.dispatchEvent(new CustomEvent("georme:analytics-ready"));
  }

  function ensureBanner() {
    let banner = document.querySelector("#cookieBanner");

    if (!banner) {
      banner = document.createElement("div");
      banner.id = "cookieBanner";
      banner.className = "cookie-banner";
      banner.hidden = true;
      banner.innerHTML = `
        <div class="cookie-banner-content">
          <p>
            Utilizamos cookies analíticas de Google, únicamente con tu permiso,
            para conocer el uso agregado de la web y mejorar nuestros servicios.
          </p>
          <div class="cookie-banner-actions">
            <a href="/cookies.html">Más información</a>
            <button type="button" class="cookie-secondary" data-cookie-reject>Rechazar</button>
            <button type="button" data-cookie-accept>Aceptar</button>
          </div>
        </div>
      `;
      document.body.appendChild(banner);
    }

    return banner;
  }

  function setConsent(value) {
    localStorage.setItem(CONSENT_KEY, value);
    ensureBanner().hidden = true;

    if (value === "accepted") {
      loadAnalytics();
    }

    window.dispatchEvent(
      new CustomEvent("georme:consent-changed", { detail: value })
    );
  }

  function showPreferences() {
    ensureBanner().hidden = false;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const banner = ensureBanner();

    banner.addEventListener("click", (event) => {
      if (event.target.closest("[data-cookie-accept]")) {
        setConsent("accepted");
      }

      if (event.target.closest("[data-cookie-reject]")) {
        setConsent("rejected");
      }
    });

    document.querySelectorAll("[data-cookie-settings]").forEach((button) => {
      button.addEventListener("click", showPreferences);
    });

    const consent = getConsent();
    if (consent === "accepted") {
      loadAnalytics();
    } else if (consent !== "rejected") {
      banner.hidden = false;
    }
  });

  window.GeoRMeConsent = {
    get: getConsent,
    showPreferences
  };
})();
