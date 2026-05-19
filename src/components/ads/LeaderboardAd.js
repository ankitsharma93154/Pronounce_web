import React, { memo } from "react";
import AdSlot from "./AdSlot";

const LeaderboardAd = memo(({ slot, className = "" }) => (
  <AdSlot
    slot={slot}
    className={className}
    width={728}
    height={90}
    adFormat="horizontal"
    fullWidthResponsive={false}
    style={{ maxHeight: 120, overflow: "hidden" }}
  />
));

LeaderboardAd.displayName = "LeaderboardAd";

export default LeaderboardAd;