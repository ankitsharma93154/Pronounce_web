// src/components/BlogPosts.js
import { Helmet } from "react-helmet";
import "./Css/BlogPosts.css";
import mispronouncedWordsImage from "../images/mispronounced-image.jpg";
import tenTipsImage from "../images/header.jpg";
import AmeVsBreIMG from "../images/AmeVsBre_thumbnail.webp";
import IPA_img from "../images/IPA_GUIDE_img.webp";
import silentLettersImage from "../images/silent_letters_intro.webp";

const blogPostsData = [
  {
    id: 1,
    title: "How to Pronounce the 50 Most Mispronounced English Words",
    description:
      "Master tricky English pronunciation with our expert audio guide. Learn to say difficult words correctly and never make common mistakes again!",
    imageUrl: mispronouncedWordsImage,
    date: "April 25, 2025",
    category: "Pronunciation Guide",
    readTime: "8 min read",
    link: "/blog/pronunciation-guide",
  },
  {
    id: 2,
    title: "10 Tips to Perfect Your English Pronunciation & Audio Clarity",
    description:
      "Improve your speaking skills with 10 actionable tips on phonetics, word stress, and intonation. Perfect for ESL learners wanting to sound more natural.",
    imageUrl: tenTipsImage,
    date: "May 20, 2025",
    category: "Learning Tips",
    readTime: "7 min read",
    link: "/blog/pronunciation-tips",
  },
  {
    id: 3,
    title: "American vs. British Pronunciation: Audio & Accent Sound Rules",
    description:
      "Compare American vs. British accent differences with real audio examples. Master the 4 fundamental rules of rhoticity and vowel shifts.",
    imageUrl: AmeVsBreIMG,
    date: "October 28, 2025",
    category: "Accent Training",
    readTime: "12 min read",
    link: "/blog/american-vs-british",
  },
  {
    id: 4,
    title: "The Ultimate IPA Guide: Master Phonetic Pronunciation Symbols",
    description:
      "Learn to read the International Phonetic Alphabet (IPA). Decode phonetic transcriptions and use QuickPronounce to check the IPA of any English word.",
    imageUrl: IPA_img,
    date: "December 14, 2025",
    category: "Phonetics",
    readTime: "8 min read",
    link: "/blog/IPA-guide",
  },
  {
    id: 5,
    title: "Silent Letters in English: Audio Pronunciation Rules for Learners",
    description:
      "Master 50+ words with silent letters. Learn the pronunciation rules for silent 'K', 'B', and 'T' backed by IPA phonetic guides.",
    imageUrl: silentLettersImage,
    date: "January 9, 2026",
    category: "Pronunciation Guide",
    readTime: "10 min read",
    link: "/blog/SilentLetters",
  },
];

const BlogPosts = () => {
  // ITEMLIST SCHEMA: Helps Google see this as a list of high-value articles
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: blogPostsData.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://www.quickpronounce.site${post.link}`,
      name: post.title,
    })),
  };

  return (
    <div className="blog-posts-page">
      <Helmet>
        <title>
          QuickPronounce Blog: English Pronunciation Guides & Accent Tips
        </title>
        <meta
          name="description"
          content="Expert blog posts on American vs British accents, IPA phonetic guides, and audio pronunciation tips. Improve your English speaking skills with QuickPronounce."
        />
        <link rel="canonical" href="https://www.quickpronounce.site/blog" />

        {/* OPEN GRAPH */}
        <meta
          property="og:title"
          content="QuickPronounce Blog: Accent Hacks & Audio Guides"
        />
        <meta
          property="og:description"
          content="Master English sounds with our deep-dive guides on phonetics, silent letters, and regional accents."
        />
        <meta
          property="og:url"
          content="https://www.quickpronounce.site/blog"
        />
        <meta property="og:type" content="blog" />

        <script type="application/ld+json">
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Blog",
              name: "QuickPronounce Pronunciation Blog",
              description:
                "Guides and tips for mastering English accents and phonetics.",
              url: "https://www.quickpronounce.site/blog",
            },
            itemListSchema,
          ])}
        </script>
      </Helmet>

      <header className="blog-header">
        <div className="container">
          <h1>English Pronunciation & Accent Blog</h1>
          <p className="subtitle">
            Master <strong>phonetic transcription</strong>, explore{" "}
            <strong>American vs British audio</strong>, and perfect your
            speaking skills.
          </p>
        </div>
      </header>

      <main className="container blog-content">
        <section className="blog-grid-section">
          <div className="blog-grid">
            {blogPostsData.map((post) => (
              <a
                href={post.link}
                key={post.id}
                className="blog-card"
                aria-label={`Read more about ${post.title}`}
              >
                <div
                  className="blog-card-image"
                  style={{ backgroundImage: `url(${post.imageUrl})` }}
                  role="img"
                  aria-label={post.title}
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
