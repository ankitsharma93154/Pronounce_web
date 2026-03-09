import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/Home"; // Direct import for Home

// Lazy load only secondary pages
const FAQPage = lazy(() => import("./pages/faqs"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Contact = lazy(() => import("./pages/contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PronunciationBlog = lazy(() => import("./pages/blog/pronunciation-tips"));
const PronunciationGuide = lazy(
  () => import("./pages/blog/pronunciation-guide"),
);
const PronunciationComparison = lazy(
  () => import("./pages/blog/AmericanVsBritish"),
);
const SilentKillers = lazy(() => import("./pages/blog/SilentLetters"));
const IPA_GUIDE = lazy(() => import("./pages/blog/IPA_Guide"));
const BlogPosts = lazy(() => import("./pages/blog/Blogposts"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const IELTSBlog = lazy(() => import("./pages/blog/IELTSBlog.js"));
const SchwaSoundGuide = lazy(() => import("./pages/blog/schwa-sound-guide"));
const EdEndingsPronunciation = lazy(
  () => import("./pages/blog/ed-endings-pronunciation"),
);
const ConnectedSpeechGuide = lazy(
  () => import("./pages/blog/connected-speech-guide"),
);
// Loading component
const Loading = () => <div className="loading">Loading...</div>;

const App = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Preload commonly accessed pages
      import("./pages/contact");
      import("./pages/faqs");
      import("./pages/blog/pronunciation-tips");
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
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />
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
            <Route path="/blog/SilentLetters" element={<SilentKillers />} />
            <Route path="/blog/ielts" element={<IELTSBlog />} />
            <Route
              path="/blog/schwa-sound-guide"
              element={<SchwaSoundGuide />}
            />
            <Route
              path="/blog/ed-endings-pronunciation"
              element={<EdEndingsPronunciation />}
            />
            <Route
              path="/blog/connected-speech-guide"
              element={<ConnectedSpeechGuide />}
            />
          </Routes>
        </Suspense>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
