import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./Css/NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-wrapper">
      <Helmet>
        <title>404 – Page Not Found | QuickPronounce</title>

        <meta
          name="description"
          content="Oops! The page you're looking for doesn't exist. Return to QuickPronounce to improve your English pronunciation with guides, tips, and our free tool."
        />

        <meta
          name="keywords"
          content="404 error, page not found, QuickPronounce missing page, pronunciation app, English speaking guide, error page, broken link, language learning"
        />

        <link rel="canonical" href="https://www.quickpronounce.site/404" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="404 – Oops! This Page Doesn't Exist | QuickPronounce"
        />
        <meta
          property="og:description"
          content="This page couldn't be found. But don't worry — head back to QuickPronounce and continue learning English pronunciation with our free tools and guides!"
        />
        <meta
          property="og:image"
          content="https://www.quickpronounce.site/images/quickpronounce-404-banner.jpg"
        />
        <meta property="og:url" content="https://www.quickpronounce.site/404" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="QuickPronounce" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="404 – This Page Isn’t Available | QuickPronounce"
        />
        <meta
          name="twitter:description"
          content="Looks like this page is missing. Head back to QuickPronounce for pronunciation tips, tools, and guides."
        />
        <meta
          name="twitter:image"
          content="https://www.quickpronounce.site/images/quickpronounce-404-banner.jpg"
        />
        <meta name="twitter:site" content="@quickpronounce" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "404 - Page Not Found",
            description:
              "Oops! This page doesn’t exist. Return to QuickPronounce to explore pronunciation tips and tools.",
            url: "https://www.quickpronounce.site/404",
          })}
        </script>
      </Helmet>

      <div className="not-found-container">
        <h1>404</h1>
        <p className="message">Oops! This page doesn't exist.</p>
        <Link to="/" className="home-link">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
