import React, { lazy, Suspense, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home"; // Direct import for Home
import { bootstrapAnalytics, trackPageView } from "./lib/analytics";

// Lazy load only secondary pages
const FAQPage = lazy(() => import("./pages/faqs"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Contact = lazy(() => import("./pages/contact"));
const Support = lazy(() => import("./pages/Support"));
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
const Advertise = lazy(() => import("./pages/Advertise"));
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
const QuizHubPage = lazy(() => import("./pages/quiz/Quiz"));
const QuizSlugPage = lazy(() => import("./pages/quiz/QuizSlug"));
// Loading component with reserved space to reduce route-level layout shifts.
const Loading = () => (
  <div className="loading loading--route" role="status" aria-live="polite">
    Loading...
  </div>
);

const AnalyticsTracker = () => {
  const location = useLocation();
  const lastTrackedPath = useRef("");

  useEffect(() => {
    bootstrapAnalytics();
  }, []);

  useEffect(() => {
    const currentPath = `${location.pathname}${location.search}${location.hash}`;

    if (lastTrackedPath.current === currentPath) {
      return;
    }

    lastTrackedPath.current = currentPath;
    trackPageView(currentPath);
  }, [location]);

  return null;
};

const App = () => {
  return (
    <Router>
      <AnalyticsTracker />
      <div className="app">
        <Header />
        <main className="app-content">
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/support" element={<Support />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route
                  path="/terms-and-conditions"
                  element={<TermsAndConditions />}
                />
                <Route path="/disclaimer" element={<Disclaimer />} />
                <Route path="/advertise" element={<Advertise />} />
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
                <Route path="/blog/ipa-guide" element={<IPA_GUIDE />} />
                <Route
                  path="/blog/silent-letters"
                  element={<SilentKillers />}
                />
                <Route
                  path="/blog/IPA-guide"
                  element={<Navigate to="/blog/ipa-guide" replace />}
                />
                <Route
                  path="/blog/ultimate-guide-to-ipa"
                  element={<Navigate to="/blog/ipa-guide" replace />}
                />
                <Route
                  path="/blog/SilentLetters"
                  element={<Navigate to="/blog/silent-letters" replace />}
                />
                <Route
                  path="/blog/silent-letters-pronunciation-guide"
                  element={<Navigate to="/blog/silent-letters" replace />}
                />
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
                <Route path="/quiz" element={<QuizHubPage />} />
                <Route path="/quiz/:slug" element={<QuizSlugPage />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
