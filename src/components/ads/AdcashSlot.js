import React, { memo, useEffect, useRef } from "react";

const AdcashSlot = memo(({ zoneId, className = "", width, height }) => {
  const wrapperRef = useRef(null);
  const hasRenderedRef = useRef(false);

  useEffect(() => {
    const wrapperEl = wrapperRef.current;

    if (!zoneId || !wrapperEl || hasRenderedRef.current) {
      return;
    }

    if (!window.aclib || typeof window.aclib.runBanner !== "function") {
      return;
    }

    const scriptEl = document.createElement("script");
    scriptEl.type = "text/javascript";
    scriptEl.text = `aclib.runBanner({ zoneId: ${JSON.stringify(String(zoneId))} });`;

    hasRenderedRef.current = true;
    wrapperEl.appendChild(scriptEl);

    return () => {
      if (scriptEl.parentElement === wrapperEl) {
        wrapperEl.removeChild(scriptEl);
      }
    };
  }, [zoneId]);

  if (!zoneId) {
    return null;
  }

  return (
    <div
      ref={wrapperRef}
      className={`${className} adcash-slot`.trim()}
      aria-label="Advertisement"
      style={{
        width,
        minHeight: height,
        maxWidth: "100%",
      }}
    ></div>
  );
});

AdcashSlot.displayName = "AdcashSlot";

export default AdcashSlot;
