import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import "./Css/FaqPage.css";

const FAQPage = () => {
  const faqData = useMemo(
    () => [
      // --- Learning ---
      {
        id: "faq-1",
        question: "How can I improve my English pronunciation fast?",
        answer:
          "To quickly improve your pronunciation, focus on listening and repeating native speech, mastering word stress, and practicing with tools like QuickPronounce, where you can instantly hear correct pronunciations in multiple accents.",
        icon: "🚀",
        category: "Learning",
      },
      {
        id: "faq-5",
        question: "How do I find the phonetic pronunciation of a word?",
        answer:
          "QuickPronounce provides IPA (International Phonetic Alphabet) transcriptions alongside audio. This helps you understand the exact phonetic spelling and mouth movements required for correct speech.",
        icon: "🗣️",
        category: "Learning",
      },
      {
        id: "faq-11",
        question: "How can I practice my accent consistently?",
        answer:
          "Use QuickPronounce daily to repeat words in different accents, record yourself, and compare. Consistent listening and speaking practice builds fluency over time.",
        icon: "🎧",
        category: "Learning",
      },

      // --- Techniques ---
      {
        id: "faq-2",
        question: "What is the best way to pronounce difficult English words?",
        answer:
          'Use phonetic tools and listen to native pronunciations. QuickPronounce lets you hear correct audio for tricky words like "colonel," "entrepreneur," or "genre" in American, British, and Australian accents.',
        icon: "🔍",
        category: "Techniques",
      },
      {
        id: "faq-8",
        question: "How do I know if I'm pronouncing a word correctly?",
        answer:
          "Compare your speech with the high-quality audio on QuickPronounce. Repeating after the native-sounding voice helps build muscle memory and improves your overall English fluency.",
        icon: "🎯",
        category: "Techniques",
      },
      {
        id: "faq-12",
        question: "How can I reduce my native accent when speaking English?",
        answer:
          "Focus on listening to native speakers, mimic intonation patterns, and practice with QuickPronounce's multi-accent audio. Regular repetition helps adjust your speech naturally.",
        icon: "🗣️",
        category: "Techniques",
      },

      // --- Tools ---
      {
        id: "faq-3",
        question: "Is there a free tool to check English pronunciation online?",
        answer:
          "Yes! QuickPronounce.site is a 100% free online pronunciation tool. It offers instant audio for any word with no sign-up required, making it ideal for students and professionals.",
        icon: "💰",
        category: "Tools",
      },
      {
        id: "faq-6",
        question: "Can I hear pronunciation of names and technical terms?",
        answer:
          "Absolutely. QuickPronounce supports a wide range of vocabulary, including brand names, geographical locations, and complex medical or technical terms with clear audio output.",
        icon: "📚",
        category: "Tools",
      },
      {
        id: "faq-9",
        question:
          "Is there an audio pronunciation dictionary for English learners?",
        answer:
          "QuickPronounce acts as a live audio dictionary. It provides not just the sound, but also meanings and examples, helping you learn how to use words in the correct context.",
        icon: "📖",
        category: "Tools",
      },
      {
        id: "faq-13",
        question: "Can I use QuickPronounce on mobile devices?",
        answer:
          "Yes, QuickPronounce is fully optimized for mobile. You can practice pronunciation anywhere using your smartphone or tablet.",
        icon: "📱",
        category: "Tools",
      },

      // --- Features ---
      {
        id: "faq-4",
        question:
          "What is the difference between American and British pronunciation?",
        answer:
          "The main differences lie in vowel sounds and rhoticity (the pronunciation of 'r'). QuickPronounce allows you to compare American vs. British accent audio side-by-side for any word to hear these nuances clearly.",
        icon: "🇬🇧",
        category: "Features",
      },
      {
        id: "faq-7",
        question:
          "Can I use QuickPronounce for American, British, Australian, or Indian accents?",
        answer:
          "Yes! You can choose from four distinct accents: American (US), British (UK), Australian (AU), and Indian (IN). Simply toggle the accent setting to hear the real-time difference.",
        icon: "🌎",
        category: "Features",
      },
      {
        id: "faq-14",
        question: "Can I compare multiple accents at once?",
        answer:
          "QuickPronounce allows side-by-side playback of different accents so you can hear subtle pronunciation differences and improve your fluency.",
        icon: "🔄",
        category: "Features",
      },

      // --- Support ---
      {
        id: "faq-15",
        question: "How can I support QuickPronounce?",
        answer:
          "You can support QuickPronounce via Ko-fi. Every contribution helps us maintain and improve the tool for all learners.",
        icon: "❤️",
        category: "Support",
      },
      {
        id: "faq-16",
        question: "Can I request new words or accents?",
        answer:
          "Absolutely! Use the Contact page to send suggestions for new words or accents, and we’ll consider them for future updates.",
        icon: "✉️",
        category: "Support",
      },
    ],
    [],
  );

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Group FAQs by category for headings
  const groupedFaqs = useMemo(() => {
    const groups = {};
    faqData.forEach((faq, index) => {
      if (!groups[faq.category]) groups[faq.category] = [];
      groups[faq.category].push({ ...faq, originalIndex: index });
    });
    return groups;
  }, [faqData]);

  const faqSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqData.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    };
  }, [faqData]);

  const renderFaqItem = (faq) => (
    <div className="faq-item" key={faq.id}>
      <button
        className={`faq-question ${activeIndex === faq.originalIndex ? "active" : ""}`}
        onClick={() => toggleAccordion(faq.originalIndex)}
        aria-expanded={activeIndex === faq.originalIndex}
      >
        <div className="question-content">
          <span className="faq-icon-indicator">{faq.icon}</span>
          <h2>{faq.question}</h2>
        </div>
        <div className="indicator-arrow">
          <svg
            className={`arrow-icon ${activeIndex === faq.originalIndex ? "rotated" : ""}`}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
      <div
        className={`faq-answer ${activeIndex === faq.originalIndex ? "open" : ""}`}
      >
        <p>{faq.answer}</p>
      </div>
    </div>
  );

  return (
    <div className="faq-container">
      <Helmet>
        <title>How to Pronounce Words: FAQ for Audio, IPA & Accents</title>
        <meta
          name="description"
          content="Get answers about how to pronounce words, use word pronunciation audio, compare accents, and read IPA with QuickPronounce."
        />
        <link rel="canonical" href="https://www.quickpronounce.site/faq" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="faq-header">
        <h1>How to Pronounce Words: Quick FAQ</h1>
        <p className="faq-intro">
          Learn how to master{" "}
          <strong>American, British, Australian, and Indian accents</strong>.
          Find tips on <strong>phonetic pronunciation</strong>,{" "}
          <strong>word pronunciation audio</strong>, and using our free
          pronunciation tool effectively.
        </p>
      </div>

      <div className="faq-columns">
        {Object.keys(groupedFaqs).map((category) => (
          <div className="faq-category-column" key={category}>
            <h2 className="faq-category-title">{category}</h2>
            {groupedFaqs[category].map(renderFaqItem)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
