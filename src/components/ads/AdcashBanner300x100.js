import React, { memo } from "react";
import AdcashSlot from "./AdcashSlot";

const AdcashBanner300x100 = memo(({ zoneId, className = "" }) => (
  <AdcashSlot zoneId={zoneId} className={className} width={300} height={100} />
));

AdcashBanner300x100.displayName = "AdcashBanner300x100";

export default AdcashBanner300x100;
