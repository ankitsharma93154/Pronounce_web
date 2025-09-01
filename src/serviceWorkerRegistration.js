// Minimal service worker registration helper
export function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      const swUrl = `${process.env.PUBLIC_URL || ""}/sw.js`;
      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          // eslint-disable-next-line no-console
          console.log("ServiceWorker registered:", registration.scope);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.warn("ServiceWorker registration failed:", err);
        });
    });
  }
}

export function unregisterServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const reg of registrations) {
        reg.unregister();
      }
    });
  }
}
