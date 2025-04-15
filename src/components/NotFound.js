import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-wrapper">
      <Helmet>
        <title>404 - Page Not Found | QuickPronounce</title>
        <meta name="robots" content="noindex" />
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
