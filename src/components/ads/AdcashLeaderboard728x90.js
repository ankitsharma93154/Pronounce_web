import React, { memo } from "react";
import AdcashSlot from "./AdcashSlot";

const AdcashLeaderboard728x90 = memo(({ zoneId, className = "" }) => (
  <AdcashSlot zoneId={zoneId} className={className} width={728} height={90} />
));

AdcashLeaderboard728x90.displayName = "AdcashLeaderboard728x90";

export default AdcashLeaderboard728x90;
