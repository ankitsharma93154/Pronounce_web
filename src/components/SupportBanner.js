import { Link } from "react-router-dom";

const SupportBanner = () => (
  <p className="support-banner support-banner--inline">
    <span className="support-banner__copy">
      <span className="support-banner__heart">❤️</span>
      <strong>Support QuickPronounce</strong> if it helps you.
    </span>
    <Link to="/support" className="support-banner__button">
      Support
    </Link>
  </p>
);

export default SupportBanner;
