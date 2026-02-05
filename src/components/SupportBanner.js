import { useState, useEffect } from "react";

const DISMISS_DAYS = 7;
const DISMISS_KEY = "supportBannerDismissedAt";

const SupportBanner = ({ show }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!show) return;

    const dismissedAt = localStorage.getItem(DISMISS_KEY);

    if (dismissedAt) {
      const daysPassed =
        (Date.now() - Number(dismissedAt)) / (1000 * 60 * 60 * 24);

      if (daysPassed < DISMISS_DAYS) {
        return;
      }
    }

    setVisible(true);
  }, [show]);

  if (!visible) return null;

  const handleClose = () => {
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
    setVisible(false);
  };

  return (
    <div className="support-banner">
      <div className="support-banner__content">
        <span className="support-banner__icon">❤️</span>
        <span className="support-banner__text">
          <strong>Support QuickPronounce</strong>
          <span className="support-banner__sub">
            Free and ad-free. Support helps cover hosting and maintenance.
          </span>
        </span>
      </div>

      <div className="support-banner__actions">
        <a
          href="https://ko-fi.com/quickpronounce"
          target="_blank"
          rel="noopener noreferrer"
          className="support-banner__button"
        >
          Support
        </a>

        <button
          className="support-banner__close"
          onClick={handleClose}
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default SupportBanner;
