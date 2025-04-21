import { Link } from "react-router-dom";
import "./Css/blogpage.css"; // Assuming you have a CSS file for styling

const posts = [
  {
    title: "10 Proven Tips to Perfect Your English Pronunciation",
    slug: "english-pronunciation-tips",
    date: "April 21, 2025",
  },
];

const Blog = () => {
  return (
    <div className="blog-wrapper">
      <div className="blog-container">
        <h1 className="blog-title">QuickPronounce Blog</h1>
        <ul className="blog-post-list">
          {posts.map((post, index) => (
            <li
              key={post.slug}
              className={
                index === 0
                  ? "blog-post-item blog-post-featured"
                  : "blog-post-item"
              }
            >
              <Link to={`/blog/${post.slug}`} className="blog-post-link">
                {post.title}
              </Link>
              <div className="blog-meta">
                <span className="blog-category">Pronunciation</span>
                <p className="blog-post-date">{post.date}</p>
              </div>
              {post.excerpt && <p className="blog-excerpt">{post.excerpt}</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Blog;
