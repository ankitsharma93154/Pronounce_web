import React, { memo, useEffect, useRef } from "react";

const RETRY_DELAY_MS = 250;
const MAX_RETRIES = 20;

const AdcashSlot = memo(({ zoneId, className = "", width, height }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const containerEl = containerRef.current;

    if (!zoneId || !containerEl) {
      return;
    }

    let retryTimer = null;
    let retryCount = 0;
    let cancelled = false;

    const tryRenderBanner = () => {
      if (cancelled) {
        return;
      }

      if (window.aclib && typeof window.aclib.runBanner === "function") {
        containerEl.innerHTML = "";
        window.aclib.runBanner({ zoneId: String(zoneId) });
        return;
      }

      retryCount += 1;
      if (retryCount <= MAX_RETRIES) {
        retryTimer = window.setTimeout(tryRenderBanner, RETRY_DELAY_MS);
      }
    };

    tryRenderBanner();

    return () => {
      cancelled = true;
      if (retryTimer) {
        window.clearTimeout(retryTimer);
      }
      containerEl.innerHTML = "";
    };
  }, [zoneId]);

  if (!zoneId) {
    return null;
  }

  return (
    <div
      className={`${className} adcash-slot`.trim()}
      aria-label="Advertisement"
      style={{
        width: `${width}px`,
        minHeight: `${height}px`,
        maxWidth: "100%",
      }}
    >
      <div ref={containerRef} />
    </div>
  );
});

AdcashSlot.displayName = "AdcashSlot";

export default AdcashSlot;
