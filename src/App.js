import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FAQPage from "./pages/faqs";
import AboutPage from "./pages/contact"; // this includes contact section
import Header from "./components/header";
import Footer from "./components/footer";
import NotFound from "./pages/NotFound"; // 404 page
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import PronunciationBlog from "./BlogPosts/pronunciation-tips"; // Example blog post

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<AboutPage />} />
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
          {/* Blog routes */}
          {/* <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} /> */}
          <Route path="/blog" element={<PronunciationBlog />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
