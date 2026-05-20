import React, { memo } from "react";
import AdSlot from "./AdSlot";

const LeaderboardAd = memo(
  ({ slot, className = "", fullWidthResponsive = true }) => {
    // Temporarily commented out clipping to allow tall creatives
    // Previous inline style: style={{ maxHeight: 120, overflow: "hidden" }}
    return (
      <AdSlot
        slot={slot}
        className={className}
        width={728}
        height={90}
        adFormat="horizontal"
        fullWidthResponsive={fullWidthResponsive}
      />
    );
  },
);

LeaderboardAd.displayName = "LeaderboardAd";

export default LeaderboardAd;
