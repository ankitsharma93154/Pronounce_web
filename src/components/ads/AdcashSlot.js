import React, { memo, useEffect, useRef, useState } from "react";

const INTERSECTION_ROOT_MARGIN = "320px 0px";

const runWhenBrowserIsIdle = (callback) => {
  if (typeof window.requestIdleCallback === "function") {
    return window.requestIdleCallback(callback, { timeout: 1800 });
  }

  return window.setTimeout(callback, 250);
};

const cancelIdleRun = (handle) => {
  if (!handle) return;

  if (typeof window.cancelIdleCallback === "function") {
    window.cancelIdleCallback(handle);
    return;
  }

  window.clearTimeout(handle);
};

const AdcashSlot = memo(({ zoneId, className = "", width, height }) => {
  const wrapperRef = useRef(null);
  const hasRenderedRef = useRef(false);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const wrapperEl = wrapperRef.current;

    if (!zoneId || !wrapperEl || isNearViewport) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setIsNearViewport(true);
        observer.disconnect();
      },
      {
        root: null,
        rootMargin: INTERSECTION_ROOT_MARGIN,
        threshold: 0.01,
      },
    );

    observer.observe(wrapperEl);
    return () => observer.disconnect();
  }, [zoneId, isNearViewport]);

  useEffect(() => {
    const wrapperEl = wrapperRef.current;

    if (!zoneId || !wrapperEl || hasRenderedRef.current || !isNearViewport) {
      return;
    }

    let idleHandle;
    let isDisposed = false;
    let scriptEl;

    const runBanner = () => {
      if (isDisposed || hasRenderedRef.current) {
        return;
      }

      if (!window.aclib || typeof window.aclib.runBanner !== "function") {
        return;
      }

      scriptEl = document.createElement("script");
      scriptEl.type = "text/javascript";
      scriptEl.text = `aclib.runBanner({ zoneId: ${JSON.stringify(String(zoneId))} });`;

      hasRenderedRef.current = true;
      window.__QP_ADS_ACTIVE = true;
      window.__QP_ADS_ACTIVE_COUNT = (window.__QP_ADS_ACTIVE_COUNT || 0) + 1;
      wrapperEl.appendChild(scriptEl);
    };

    const scheduleRun = () => {
      idleHandle = runWhenBrowserIsIdle(runBanner);
    };

    if (document.readyState === "complete") {
      scheduleRun();
    } else {
      window.addEventListener("load", scheduleRun, { once: true });
    }

    return () => {
      isDisposed = true;
      cancelIdleRun(idleHandle);
      window.removeEventListener("load", scheduleRun);

      if (scriptEl.parentElement === wrapperEl) {
        wrapperEl.removeChild(scriptEl);
      }
    };
  }, [zoneId, isNearViewport]);

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
        contain: "layout style paint",
        containIntrinsicSize: `${height}px ${width}px`,
      }}
    ></div>
  );
});

AdcashSlot.displayName = "AdcashSlot";

export default AdcashSlot;
