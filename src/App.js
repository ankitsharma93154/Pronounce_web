import React, { lazy, Suspense } from "react";
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
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const EditorialPolicy = lazy(() => import("./pages/EditorialPolicy"));
const IELTSBlog = lazy(() => import("./pages/blog/IELTSBlog.js"));
const SchwaSoundGuide = lazy(() => import("./pages/blog/schwa-sound-guide"));
const EdEndingsPronunciation = lazy(
  () => import("./pages/blog/ed-endings-pronunciation"),
);
const ConnectedSpeechGuide = lazy(
  () => import("./pages/blog/connected-speech-guide"),
);
const WordStressRulesGuide = lazy(
  () => import("./pages/blog/word-stress-rules-guide"),
);
const MinimalPairsTrainingPlan = lazy(
  () => import("./pages/blog/minimal-pairs-training-plan"),
);
const TheVsTheePronunciation = lazy(
  () => import("./pages/blog/the-vs-thee-pronunciation"),
);
const CanVsCantPronunciation = lazy(
  () => import("./pages/blog/can-vs-cant-pronunciation"),
);
const PronunciationJobInterviewGuide = lazy(
  () => import("./pages/blog/pronunciation-job-interview-guide"),
);
const PronunciationMythsGuide = lazy(
  () => import("./pages/blog/pronunciation-myths-guide"),
);
// Loading component
const Loading = () => <div className="loading">Loading...</div>;

const App = () => {
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
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/editorial-policy" element={<EditorialPolicy />} />
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
            <Route
              path="/blog/word-stress-rules-guide"
              element={<WordStressRulesGuide />}
            />
            <Route
              path="/blog/minimal-pairs-training-plan"
              element={<MinimalPairsTrainingPlan />}
            />
            <Route
              path="/blog/the-vs-thee-pronunciation"
              element={<TheVsTheePronunciation />}
            />
            <Route
              path="/blog/can-vs-cant-pronunciation"
              element={<CanVsCantPronunciation />}
            />
            <Route
              path="/blog/pronunciation-job-interview-guide"
              element={<PronunciationJobInterviewGuide />}
            />
            <Route
              path="/blog/pronunciation-myths-guide"
              element={<PronunciationMythsGuide />}
            />
          </Routes>
        </Suspense>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
