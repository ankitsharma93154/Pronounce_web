import React, { memo } from "react";
import AdcashSlot from "./AdcashSlot";

const AdcashRectangle336x280 = memo(({ zoneId, className = "" }) => (
  <AdcashSlot zoneId={zoneId} className={className} width={336} height={280} />
));

AdcashRectangle336x280.displayName = "AdcashRectangle336x280";

export default AdcashRectangle336x280;
