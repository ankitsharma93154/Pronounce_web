import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./Css/BlogArticleTemplate.css";

const BlogArticleTemplate = ({
  seo = {},
  category,
  title,
  author,
  readTime,
  date,
  heroImage,
  heroImageAlt,
  cta,
  children,
}) => {
  const {
    pageTitle,
    description,
    canonicalUrl,
    ogTitle,
    ogDescription,
    ogImage,
    ogType = "article",
    extraMeta = [],
    structuredData,
  } = seo;
  const schemaBlocks = Array.isArray(structuredData)
    ? structuredData
    : structuredData
      ? [structuredData]
      : [];

  const metaParts = [author, readTime, date].filter(Boolean);
  const hasHeaderContent = Boolean(category || title || metaParts.length > 0);
  const ctaData =
    cta === false
      ? null
      : cta || {
          title: "Start Practicing",
          description:
            "Use QuickPronounce to check IPA, compare accents, and improve clarity.",
          buttonLabel: "Open QuickPronounce",
          buttonHref: "/",
        };

  return (
    <article className="bt-page-wrapper">
      <Helmet>
        {pageTitle ? <title>{pageTitle}</title> : null}
        {description ? <meta name="description" content={description} /> : null}
        {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}

        {ogTitle ? <meta property="og:title" content={ogTitle} /> : null}
        {ogDescription ? (
          <meta property="og:description" content={ogDescription} />
        ) : null}
        {canonicalUrl ? (
          <meta property="og:url" content={canonicalUrl} />
        ) : null}
        {ogType ? <meta property="og:type" content={ogType} /> : null}
        {ogImage ? <meta property="og:image" content={ogImage} /> : null}

        {extraMeta.map((metaTag, index) => {
          if (metaTag?.name) {
            return (
              <meta
                key={`name-${metaTag.name}-${index}`}
                name={metaTag.name}
                content={metaTag.content}
              />
            );
          }

          if (metaTag?.property) {
            return (
              <meta
                key={`property-${metaTag.property}-${index}`}
                property={metaTag.property}
                content={metaTag.content}
              />
            );
          }

          return null;
        })}

        {schemaBlocks.map((schema, index) => (
          <script key={`schema-${index}`} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
      </Helmet>

      <div className="bt-article-container">
        {hasHeaderContent ? (
          <header className="bt-header">
            {category ? <span className="bt-category">{category}</span> : null}
            {title ? <h1 className="bt-main-title">{title}</h1> : null}
            {metaParts.length > 0 ? (
              <div className="bt-meta">
                {metaParts.map((part, index) => (
                  <React.Fragment key={part}>
                    {index > 0 ? <span aria-hidden="true">|</span> : null}
                    <span>{part}</span>
                  </React.Fragment>
                ))}
              </div>
            ) : null}
          </header>
        ) : null}

        {heroImage ? (
          <img
            src={heroImage}
            alt={heroImageAlt || title}
            className="bt-hero-image"
          />
        ) : null}

        {children}

        {ctaData ? (
          <div className="bt-cta-box">
            <h2 className="bt-cta-title">{ctaData.title}</h2>
            {ctaData.description ? <p>{ctaData.description}</p> : null}
            {ctaData.buttonHref ? (
              <Link to={ctaData.buttonHref} className="bt-cta-btn">
                {ctaData.buttonLabel || "Read More"}
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
};

export const BlogSection = ({ title, children }) => (
  <section className="bt-section">
    {title ? <h2 className="bt-section-title">{title}</h2> : null}
    {children}
  </section>
);

export default BlogArticleTemplate;
