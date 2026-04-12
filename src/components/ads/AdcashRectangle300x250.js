import React, { memo } from "react";
import AdcashSlot from "./AdcashSlot";

const AdcashRectangle300x250 = memo(({ zoneId, className = "" }) => (
  <AdcashSlot zoneId={zoneId} className={className} width={300} height={250} />
));

AdcashRectangle300x250.displayName = "AdcashRectangle300x250";

export default AdcashRectangle300x250;
