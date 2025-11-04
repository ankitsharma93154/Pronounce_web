// src/components/BlogPosts.js
import { Helmet } from "react-helmet";
import "./Css/BlogPosts.css";
import mispronouncedWordsImage from "../images/mispronounced-image.jpg";
import tenTipsImage from "../images/header.jpg";
import AmeVsBreIMG from "../images/AmeVsBre_thumbnail.webp";

const blogPostsData = [
  {
    id: 1,
    title: "How to Pronounce the 50 Most Mispronounced English Words",
    description:
      'Master tricky pronunciations with our expert guide and never say "nucular" again!',
    imageUrl: mispronouncedWordsImage,
    date: "April 25, 2025",
    category: "Language Learning",
    readTime: "8 min read",
    link: "/blog/pronunciation-guide",
  },
  {
    id: 2,
    title: "10 Proven Tips to Perfect Your English Pronunciation",
    description:
      "Improve your English pronunciation with 10 actionable tips on phonetics, intonation, and stress patterns. Start mastering your speaking skills today!",
    imageUrl: tenTipsImage,
    date: "May 20, 2025",
    category: "Language Learning",
    readTime: "7 min read",
    link: "/blog/pronunciation-tips",
  },
  {
    id: 3,
    title:
      "American vs. British Pronunciation: The 4 Sound Rules That Explain Everything",
    description:
      "Master the 4 fundamental sound differences between American and British English. Complete guide with IPA, audio examples, and practice strategies for learners.",
    imageUrl: AmeVsBreIMG,
    date: "October 28, 2025",
    category: "Accent Training",
    readTime: "12 min read",
    link: "/blog/american-vs-british",
  },
];

const BlogPosts = () => {
  return (
    <div className="blog-posts-page">
      <Helmet>
        {/* OPTIMIZED TITLE TAG (87 characters) */}
        <title>
          QuickPronounce Blog: Pronunciation Tips, 4 Accents, IPA Guides & ESL
          Help
        </title>

        {/* OPTIMIZED META DESCRIPTION (159 characters) */}
        <meta
          name="description"
          content="Improve your English with expert pronunciation tips, accent guides (AmE, BrE, InE, AuE), phonetics tutorials, and free ESL resources. Explore must-read blogs on QuickPronounce."
        />

        {/* META KEYWORDS TAG REMOVED - NO SEO VALUE */}

        <link rel="canonical" href="https://www.quickpronounce.site/blog" />

        {/* OPTIMIZED OPEN GRAPH (for social media) */}
        <meta
          property="og:title"
          content="QuickPronounce Blog: Pronunciation Tips & Accent Hacks for Clearer English"
        />
        <meta
          property="og:description"
          content="Want to speak English clearly? Explore expert blog posts on pronunciation, 4-accent hacks, and IPA phonetics tips — only on QuickPronounce."
        />
        <meta
          property="og:image"
          content="https://www.quickpronounce.site/images/quickpronounce-blog-banner.jpg"
        />
        <meta
          property="og:url"
          content="https://www.quickpronounce.site/blog"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="QuickPronounce" />

        {/* OPTIMIZED TWITTER CARD */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="QuickPronounce Blog: Pronunciation Tips & Accent Hacks"
        />
        <meta
          name="twitter:description"
          content="Learn how to pronounce English better. Read top tips, expert guides, and accent improvement blogs at QuickPronounce."
        />
        <meta
          name="twitter:image"
          content="https://www.quickpronounce.site/images/quickpronounce-blog-banner.jpg"
        />
        <meta name="twitter:site" content="@quickpronounce" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            url: "https://www.quickpronounce.site/blog",
            name: "QuickPronounce Blog: Pronunciation Tips, 4 Accents, IPA Guides & ESL Help",
            description:
              "The QuickPronounce Blog offers pronunciation tips, 4-accent improvement guides, phonetics explanations, and ESL resources to help you speak English more clearly and confidently.",
          })}
        </script>
      </Helmet>

      <header className="blog-header">
        <div className="container">
          <h1>Our Latest Blog Posts</h1>
          <p className="subtitle">
            Stay updated with our expert insights and helpful guides.
          </p>
        </div>
      </header>

      <main className="container blog-content">
        <section className="blog-grid-section">
          <div className="blog-grid">
            {blogPostsData.map((post) => (
              <a href={post.link} key={post.id} className="blog-card">
                <div
                  className="blog-card-image"
                  style={{ backgroundImage: `url(${post.imageUrl})` }}
                ></div>
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <span className="blog-card-category">{post.category}</span>
                    <span className="blog-card-date">{post.date}</span>
                  </div>
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-description">{post.description}</p>
                  <span className="blog-card-read-time">{post.readTime}</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogPosts;
