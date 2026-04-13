const VITAL_BUDGETS = {
  CLS: 0.1,
  FID: 100,
  LCP: 2500,
};

const getAdState = () => {
  if (typeof window === "undefined") {
    return "ads-unknown";
  }

  return window.__QP_ADS_ACTIVE ? "ads-active" : "ads-inactive";
};

const withAdContext = (metric) => ({
  ...metric,
  adState: getAdState(),
  adSlotsMounted:
    typeof window !== "undefined" ? window.__QP_ADS_ACTIVE_COUNT || 0 : 0,
});

const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      const wrapped = (metric) => {
        const metricWithContext = withAdContext(metric);
        const budget = VITAL_BUDGETS[metricWithContext.name];

        if (budget !== undefined && metricWithContext.value > budget) {
          // Surface budget misses early during dev and production diagnostics.
          console.warn("Web vital budget exceeded", {
            name: metricWithContext.name,
            value: metricWithContext.value,
            budget,
            adState: metricWithContext.adState,
          });
        }

        onPerfEntry(metricWithContext);
      };

      onCLS(wrapped);
      onINP(wrapped);
      onFCP(wrapped);
      onLCP(wrapped);
      onTTFB(wrapped);
    });
  }
};

export default reportWebVitals;
