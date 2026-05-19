import React, { memo } from "react";
import AdSlot from "./AdSlot";

const MediumRectangleAd = memo(({ slot, className = "" }) => (
  <AdSlot slot={slot} className={className} width={300} height={250} />
));

MediumRectangleAd.displayName = "MediumRectangleAd";

export default MediumRectangleAd;
