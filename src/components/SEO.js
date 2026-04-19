import React from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export const SITE_ORIGIN = "https://www.quickpronounce.site";

const normalizePath = (inputPath) => {
  let nextPath = inputPath || "/";

  if (/^https?:\/\//i.test(nextPath)) {
    try {
      nextPath = new URL(nextPath).pathname;
    } catch {
      nextPath = "/";
    }
  }

  nextPath = nextPath.split("#")[0].split("?")[0];
  nextPath = nextPath.replace(/\/{2,}/g, "/");

  if (!nextPath.startsWith("/")) {
    nextPath = `/${nextPath}`;
  }

  return nextPath || "/";
};

export const buildCanonicalUrl = (pathValue) => {
  const normalizedPath = normalizePath(pathValue);

  if (normalizedPath === "/") {
    return `${SITE_ORIGIN}/`;
  }

  return `${SITE_ORIGIN}${normalizedPath}`;
};

const SEO = ({
  title,
  description,
  path,
  image,
  ogType = "website",
  ogTitle,
  ogDescription,
  keywords,
  tags = [],
}) => {
  const location = useLocation();

  const canonicalUrl = React.useMemo(
    () => buildCanonicalUrl(path ?? location.pathname),
    [path, location.pathname],
  );

  if (process.env.NODE_ENV !== "production") {
    if (!title || !description) {
      // Keep missing metadata obvious during development.
      // eslint-disable-next-line no-console
      console.warn(
        "SEO component expects explicit title and description props.",
      );
    }
  }

  return (
    <Helmet prioritizeSeoTags>
      {title ? <title>{title}</title> : null}
      {description ? <meta name="description" content={description} /> : null}
      {keywords ? <meta name="keywords" content={keywords} /> : null}

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={ogTitle || title || ""} />
      <meta
        property="og:description"
        content={ogDescription || description || ""}
      />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      {image ? <meta property="og:image" content={image} /> : null}
      {ogType === "article"
        ? tags
            .filter((tag) => typeof tag === "string" && tag.trim())
            .map((tag) => (
              <meta key={tag} property="article:tag" content={tag.trim()} />
            ))
        : null}
    </Helmet>
  );
};

export default SEO;
