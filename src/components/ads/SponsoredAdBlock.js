import React from "react";

const SponsoredAdBlock = ({
  className = "",
  label = "Ad",
  placement = "inline",
  children,
}) => {
  const placementClass = placement ? `ad-${placement}` : "";

  return (
    <section
      className={`ad-section ${placementClass} ${className}`.trim()}
      aria-label="Advertisement"
    >
      <p className="ad-label">{label}</p>
      <div className="ad-inner">{children}</div>
    </section>
  );
};

export default SponsoredAdBlock;
