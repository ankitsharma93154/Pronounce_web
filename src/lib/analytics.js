const GA_MEASUREMENT_ID = "G-MY7J3QZ8Q7";

const GA_SCRIPT_ID = "ga4-script";

function ensureGtagStub() {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments);
    };
}

function scheduleIdle(callback) {
  if (typeof window === "undefined") return;

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(callback, { timeout: 2000 });
    return;
  }

  window.setTimeout(callback, 0);
}

function initGaConfig() {
  if (typeof window === "undefined" || !window.gtag) return;
  if (window.__ga4Configured) return;

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    send_page_view: false,
    transport_type: "beacon",
  });

  window.__ga4Configured = true;
}

export function bootstrapAnalytics() {
  if (process.env.NODE_ENV !== "production") return;
  if (typeof window === "undefined") return;
  if (window.__ga4BootstrapStarted) return;

  window.__ga4BootstrapStarted = true;
  ensureGtagStub();

  const loadGaScript = () => {
    const existingScript = document.getElementById(GA_SCRIPT_ID);
    if (existingScript) {
      initGaConfig();
      return;
    }

    const script = document.createElement("script");
    script.id = GA_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.onload = initGaConfig;
    document.head.appendChild(script);
  };

  if (document.readyState === "complete") {
    scheduleIdle(loadGaScript);
    return;
  }

  window.addEventListener(
    "load",
    () => {
      scheduleIdle(loadGaScript);
    },
    { once: true },
  );
}

export function trackPageView(path) {
  if (process.env.NODE_ENV !== "production") return;
  if (typeof window === "undefined" || !window.gtag || !path) return;

  window.gtag("event", "page_view", {
    page_path: path,
    page_title: document.title,
    page_location: window.location.href,
  });
}
