// src/components/BlogPosts.js
import { Helmet } from "react-helmet";
import "./Css/BlogPosts.css";
import mispronouncedWordsImage from "../images/mispronounced-image.jpg";
import tenTipsImage from "../images/header.jpg";

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
];

const BlogPosts = () => {
  return (
    <div className="blog-posts-page">
      <Helmet>
        <title>Our Blog - Discover Insights & Guides</title>
        <meta
          name="description"
          content="Explore our latest blog posts on self-improvement, technology, health, finance, and more. Find insightful guides and tips to enhance your knowledge."
        />
        <link rel="canonical" href="https://www.yourwebsite.com/blog" />
        <meta
          property="og:title"
          content="Our Blog - Discover Insights & Guides"
        />
        <meta
          property="og:description"
          content="Explore our latest blog posts on self-improvement, technology, health, finance, and more. Find insightful guides and tips to enhance your knowledge."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.yourwebsite.com/blog" />
        <meta
          property="og:image"
          content="https://www.yourwebsite.com/images/blog-banner.jpg"
        />
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
