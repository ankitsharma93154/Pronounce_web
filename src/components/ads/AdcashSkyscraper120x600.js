import React, { memo } from "react";
import AdcashSlot from "./AdcashSlot";

const AdcashSkyscraper120x600 = memo(({ zoneId, className = "" }) => (
  <AdcashSlot zoneId={zoneId} className={className} width={120} height={600} />
));

AdcashSkyscraper120x600.displayName = "AdcashSkyscraper120x600";

export default AdcashSkyscraper120x600;
