import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const REQUIRED_SUCCESS_COUNT = 3;
const SHOWN_COOLDOWN_MS = 3 * 24 * 60 * 60 * 1000;
const CLICKED_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;
const SUCCESS_COUNT_KEY = "successCount";
const SESSION_SHOWN_KEY = "supportShown";
const LAST_SHOWN_KEY = "supportLastShown";
const CLICKED_AT_KEY = "supportClickedAt";

const readLocalNumber = (key, fallback = 0) => {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    const parsed = Number.parseInt(raw || "", 10);
    return Number.isFinite(parsed) ? parsed : fallback;
  } catch (_) {
    return fallback;
  }
};

const writeLocalValue = (key, value) => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, value);
  } catch (_) {
    // Ignore storage errors so banner rendering remains resilient.
  }
};

const readSessionValue = (key) => {
  if (typeof window === "undefined") return null;

  try {
    return window.sessionStorage.getItem(key);
  } catch (_) {
    return null;
  }
};

const writeSessionValue = (key, value) => {
  if (typeof window === "undefined") return;

  try {
    window.sessionStorage.setItem(key, value);
  } catch (_) {
    // Ignore storage errors so banner rendering remains resilient.
  }
};

const isWithinCooldown = (timestamp, now, cooldownMs) =>
  Number.isFinite(timestamp) && timestamp > 0 && now - timestamp < cooldownMs;

const SupportBanner = ({ show, successCount = 0 }) => {
  const [mounted, setMounted] = useState(false);
  const [animate, setAnimate] = useState(false);

  // prevents double-counting views
  const hasTrackedView = useRef(false);

  useEffect(() => {
    if (!show || mounted) return;

    const now = Date.now();

    // Eligibility: wait until users have at least N successful queries.
    const totalSuccesses =
      Number.isFinite(successCount) && successCount > 0
        ? successCount
        : readLocalNumber(SUCCESS_COUNT_KEY, 0);

    if (totalSuccesses < REQUIRED_SUCCESS_COUNT) return;

    // Cooldowns: once per session and no repeats within 7 days after show/click.
    if (readSessionValue(SESSION_SHOWN_KEY) === "1") return;

    const lastShownAt = readLocalNumber(LAST_SHOWN_KEY, 0);
    const clickedAt = readLocalNumber(CLICKED_AT_KEY, 0);
    if (
      isWithinCooldown(lastShownAt, now, SHOWN_COOLDOWN_MS) ||
      isWithinCooldown(clickedAt, now, CLICKED_COOLDOWN_MS)
    ) {
      return;
    }

    writeLocalValue(LAST_SHOWN_KEY, String(now));
    writeSessionValue(SESSION_SHOWN_KEY, "1");

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
  }, [show, successCount, mounted]);

  const handleClose = () => {
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
            Free to use. If it has helped you, consider supporting it.
          </span>
        </span>
      </div>

      <div className="support-banner__actions">
        <Link
          to="/support"
          className="support-banner__button"
          onClick={() => {
            writeLocalValue(CLICKED_AT_KEY, String(Date.now()));

            if (window.umami) {
              window.umami.track("support_button_click", {
                location: "support_banner",
              });
            }
          }}
        >
          Support
        </Link>

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
