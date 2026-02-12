import { useState, useEffect, useRef } from "react";

const DISMISS_DAYS = 7;
const DISMISS_KEY = "supportBannerDismissedAt";

const SupportBanner = ({ show }) => {
  const [mounted, setMounted] = useState(false);
  const [animate, setAnimate] = useState(false);

  // prevents double-counting views
  const hasTrackedView = useRef(false);

  useEffect(() => {
    if (!show) return;

    const dismissedAt = localStorage.getItem(DISMISS_KEY);

    if (dismissedAt) {
      const daysPassed =
        (Date.now() - Number(dismissedAt)) / (1000 * 60 * 60 * 24);

      if (daysPassed < DISMISS_DAYS) return;
    }

    setMounted(true);

    // allow DOM paint, then animate + track view
    requestAnimationFrame(() => {
      setAnimate(true);

      if (!hasTrackedView.current && window.umami) {
        window.umami.track("support_banner_view", {
          location: "support_banner",
        });
        hasTrackedView.current = true;
      }
    });
  }, [show]);

  const handleClose = () => {
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
    setAnimate(false);

    // wait for exit animation
    setTimeout(() => setMounted(false), 1000);
  };

  if (!mounted) return null;

  return (
    <div className={`support-banner ${animate ? "is-visible" : ""}`}>
      <div className="support-banner__content">
        <span className="support-banner__icon">❤️</span>
        <span className="support-banner__text">
          <strong>Support QuickPronounce</strong>
          <span className="support-banner__sub">
            QuickPronounce stays free, independent, and ad-free. If it helped
            you today, consider supporting.
          </span>
        </span>
      </div>

      <div className="support-banner__actions">
        <a
          href="https://ko-fi.com/quickpronounce"
          target="_blank"
          rel="noopener noreferrer"
          className="support-banner__button"
          onClick={() => {
            if (window.umami) {
              window.umami.track("support_button_click", {
                location: "support_banner",
              });
            }
          }}
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
