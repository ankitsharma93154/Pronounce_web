import React, { memo, useEffect, useMemo, useRef, useState } from "react";

const ADSENSE_CLIENT_ID = "ca-pub-8551906707770773";
const INTERSECTION_ROOT_MARGIN = "320px 0px";

const AdSlot = memo(
  ({
    slot,
    className = "",
    width,
    height,
    lazy = true,
    adFormat = "auto",
    fullWidthResponsive = true,
    style,
  }) => {
    const wrapperRef = useRef(null);
    const hasPushedRef = useRef(false);
    const [isNearViewport, setIsNearViewport] = useState(!lazy);

    useEffect(() => {
      hasPushedRef.current = false;
      setIsNearViewport(!lazy);
    }, [lazy, slot]);

    useEffect(() => {
      if (!lazy || isNearViewport) {
        return;
      }

      const wrapperEl = wrapperRef.current;

      if (!wrapperEl) {
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
    }, [lazy, isNearViewport]);

    useEffect(() => {
      if (!slot || !isNearViewport || hasPushedRef.current) {
        return;
      }

      if (typeof window === "undefined") {
        return;
      }

      const adContainer = wrapperRef.current?.querySelector(".adsbygoogle");

      if (!adContainer) {
        return;
      }

      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        hasPushedRef.current = true;
      } catch (error) {
        // Leave the slot available for a later retry if AdSense is not ready yet.
      }
    }, [isNearViewport, slot]);

    const wrapperStyle = useMemo(
      () => ({
        width: width ? `min(100%, ${width}px)` : "100%",
        minHeight: height,
        maxWidth: "100%",
        ...style,
      }),
      [height, style, width],
    );

    if (!slot) {
      return null;
    }

    return (
      <div
        ref={wrapperRef}
        className={`ad-slot ${className}`.trim()}
        aria-label="Advertisement"
        style={wrapperStyle}
      >
        {isNearViewport && (
          <ins
            className="adsbygoogle ad-slot__ins"
            style={{ display: "block" }}
            data-ad-client={ADSENSE_CLIENT_ID}
            data-ad-slot={slot}
            data-ad-format={adFormat}
            data-full-width-responsive={String(fullWidthResponsive)}
          />
        )}
      </div>
    );
  },
);

AdSlot.displayName = "AdSlot";

export default AdSlot;