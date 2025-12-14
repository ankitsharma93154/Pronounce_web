import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/Home"; // Direct import for Home

// Lazy load only secondary pages
const FAQPage = lazy(() => import("./pages/faqs"));
const AboutPage = lazy(() => import("./pages/contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PronunciationBlog = lazy(() => import("./pages/pronunciation-tips"));
const PronunciationGuide = lazy(() => import("./pages/pronunciation-guide"));
const PronunciationComparison = lazy(() => import("./pages/AmericanVsBritish"));
const IPA_GUIDE = lazy(() => import("./pages/IPA_Guide"));
const BlogPosts = lazy(() => import("./pages/Blogposts"));
// Loading component
const Loading = () => <div className="loading">Loading...</div>;

const App = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Preload commonly accessed pages
      import("./pages/contact");
      import("./pages/faqs");
      import("./pages/pronunciation-tips");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="app">
        <Header />

        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<AboutPage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/blog" element={<BlogPosts />} />
            <Route
              path="/blog/pronunciation-guide"
              element={<PronunciationGuide />}
            />
            <Route
              path="/blog/pronunciation-tips"
              element={<PronunciationBlog />}
            />
            <Route
              path="/blog/american-vs-british"
              element={<PronunciationComparison />}
            />
            <Route path="/blog/IPA-guide" element={<IPA_GUIDE />} />
            {/* <Route path="/blog" element={<PronunciationBlog />} />
            <Route path="/blog2" element={<PronunciationGuide />} /> */}
          </Routes>
        </Suspense>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
