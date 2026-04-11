import React from "react";
import { Helmet } from "react-helmet";
import "./Css/SupportPage.css";

const SUPPORT_URL = "https://ko-fi.com/quickpronounce/tip";

const Support = () => {
  return (
    <div className="support-page" id="support-page">
      <Helmet>
        <title>Support QuickPronounce | UPI, PayPal, Debit & Credit Card</title>
        <meta
          name="description"
          content="QuickPronounce is an independent project run by a single founder. Support using UPI (India) or Ko-fi with PayPal and cards to help cover hosting and maintenance costs."
        />
        <link rel="canonical" href="https://www.quickpronounce.site/support" />

        <meta property="og:title" content="Support QuickPronounce" />
        <meta
          property="og:description"
          content="Support an independently built pronunciation tool by covering growing hosting and maintenance costs via UPI or Ko-fi."
        />
        <meta
          property="og:image"
          content="https://www.quickpronounce.site/og-preview.png"
        />
        <meta
          property="og:url"
          content="https://www.quickpronounce.site/support"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="QuickPronounce" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Support QuickPronounce",
            url: "https://www.quickpronounce.site/support",
            description:
              "Support page for QuickPronounce with UPI and Ko-fi payment options.",
            isPartOf: {
              "@type": "WebSite",
              name: "QuickPronounce",
              url: "https://www.quickpronounce.site",
            },
          })}
        </script>
      </Helmet>

      <div className="support-page__inner">
        <section className="support-page__hero">
          <h1>
            Enjoying QuickPronounce? Support It{" "}
            <span className="support-page__heart">❤</span>
          </h1>
          <p>
            Hi, I am Ankit, the person behind QuickPronounce. QuickPronounce is
            built and maintained by a single founder, and it is free for
            everyone to use. As usage grows, so do the costs of hosting, APIs,
            and keeping everything running smoothly. If this tool has helped
            you, consider supporting it through <strong>UPI</strong>,{" "}
            <strong>debit/credit card</strong> or <strong>PayPal</strong> via
            Ko-fi.
          </p>
        </section>

        <section className="support-page__grid" aria-label="Support options">
          <article className="support-card">
            <h2>Ko-fi (PayPal / Debit / Credit)</h2>
            <p>
              Use Ko-fi for international payments through PayPal or directly
              with debit and credit cards.
            </p>
            <a
              href={SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="support-card__kofi-banner-link"
              aria-label="Open Ko-fi support page"
            >
              <img
                src="https://storage.ko-fi.com/cdn/kofi3.png?v=6"
                alt="Support QuickPronounce on Ko-fi"
                width="320"
                height="72"
                className="support-card__kofi-banner"
                loading="lazy"
                decoding="async"
              />
            </a>
            <a
              href={SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="support-card__button"
            >
              Support on Ko-fi
            </a>
            <p className="support-card__hint">
              Ko-fi securely handles checkout and QuickPronounce does not store
              your payment data. Every contribution helps keep this independent
              project running.
            </p>
          </article>

          <article className="support-card">
            <h2>UPI (India)</h2>
            <p>
              Scan the QR code using any UPI app such as Google Pay, PhonePe,
              Paytm, or BHIM.
            </p>
            <img
              src="/GooglePay_QR.png"
              alt="UPI QR code to support QuickPronounce"
              width="320"
              height="320"
              className="support-card__qr"
              loading="lazy"
              decoding="async"
            />
            <p className="support-card__hint">
              Your support directly helps with server bills, uptime, and regular
              improvements. Tip: open this page on desktop and scan with your
              phone for the quickest checkout.
            </p>
          </article>
        </section>

        <section
          className="support-page__banner"
          aria-label="Support milestone"
        >
          <p>
            Supporters this month : <strong>1</strong>
            <span className="support-page__banner-heart"> ❤</span>. Thank you
            for supporting QuickPronounce.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Support;
