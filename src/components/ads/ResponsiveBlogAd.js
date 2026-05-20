import React, { useEffect, useState } from "react";
import LeaderboardAd from "./LeaderboardAd";
import MediumRectangleAd from "./MediumRectangleAd";

const BLOG_MOBILE_BREAKPOINT = 768;

const ResponsiveBlogAd = ({
  desktopSlot,
  mobileSlot,
  className = "",
  mobileClassName = className,
  fullWidthResponsive = true,
}) => {
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window === "undefined" ? 0 : window.innerWidth,
  );

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (viewportWidth === 0) {
    return null;
  }

  if (viewportWidth < BLOG_MOBILE_BREAKPOINT) {
    if (!mobileSlot) {
      return null;
    }

    return <MediumRectangleAd slot={mobileSlot} className={mobileClassName} />;
  }

  if (!desktopSlot) {
    return null;
  }

  return (
    <LeaderboardAd
      slot={desktopSlot}
      className={className}
      fullWidthResponsive={fullWidthResponsive}
    />
  );
};

export default ResponsiveBlogAd;
