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
          content="Sorry, the page you are looking for does not exist on QuickPronounce. Try searching for English pronunciation guides, tips, or use our free pronunciation tool."
        />
        <meta
          name="keywords"
          content="404 page, not found, QuickPronounce, pronunciation app, English pronunciation, error page, missing page, language learning"
        />
        <link rel="canonical" href="https://www.quickpronounce.site/404" />
        {/* Open Graph */}
        <meta
          property="og:title"
          content="404 – Page Not Found | QuickPronounce"
        />
        <meta
          property="og:description"
          content="Sorry, the page you are looking for does not exist on QuickPronounce. Try searching for English pronunciation guides, tips, or use our free pronunciation tool."
        />
        <meta
          property="og:image"
          content="https://www.quickpronounce.site/og-preview.png"
        />
        <meta property="og:url" content="https://www.quickpronounce.site/404" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="QuickPronounce" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="404 – Page Not Found | QuickPronounce"
        />
        <meta
          name="twitter:description"
          content="Sorry, the page you are looking for does not exist on QuickPronounce. Try searching for English pronunciation guides, tips, or use our free pronunciation tool."
        />
        <meta
          name="twitter:image"
          content="https://www.quickpronounce.site/images/quickpronounce-twitter.jpg"
        />
        <meta name="twitter:site" content="@quickpronounce" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "404 - Page Not Found",
            description:
              "The page you are looking for does not exist on QuickPronounce.",
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
