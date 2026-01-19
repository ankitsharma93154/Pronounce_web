import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import "./Css/FaqPage.css";

const FAQPage = () => {
  const faqData = useMemo(
    () => [
      {
        id: "faq-1",
        question: "How can I improve my English pronunciation fast?",
        answer:
          "To quickly improve your pronunciation, focus on listening and repeating native speech, mastering word stress, and practicing with tools like QuickPronounce, where you can instantly hear correct pronunciations in multiple accents.",
        icon: "🚀",
        category: "learning",
      },
      {
        id: "faq-2",
        question: "What is the best way to pronounce difficult English words?",
        answer:
          'Use phonetic tools and listen to native pronunciations. QuickPronounce lets you hear correct audio for tricky words like "colonel," "entrepreneur," or "genre" in American, British, and Australian accents.',
        icon: "🔍",
        category: "techniques",
      },
      {
        id: "faq-3",
        question: "Is there a free tool to check English pronunciation online?",
        answer:
          "Yes! QuickPronounce.site is a 100% free online pronunciation tool. It offers instant audio for any word with no sign-up required, making it ideal for students and professionals.",
        icon: "💰",
        category: "tools",
      },
      {
        id: "faq-4",
        question:
          "What is the difference between American and British pronunciation?",
        answer:
          "The main differences lie in vowel sounds and rhoticity (the pronunciation of 'r'). QuickPronounce allows you to compare American vs. British accent audio side-by-side for any word to hear these nuances clearly.",
        icon: "🇬🇧", // New: Targeted Accent Keyword
        category: "features",
      },
      {
        id: "faq-5",
        question: "How do I find the phonetic pronunciation of a word?",
        answer:
          "QuickPronounce provides IPA (International Phonetic Alphabet) transcriptions alongside audio. This helps you understand the exact phonetic spelling and mouth movements required for correct speech.",
        icon: "🗣️", // New: Targeted Phonetic Keyword
        category: "learning",
      },
      {
        id: "faq-6",
        question: "Can I hear pronunciation of names and technical terms?",
        answer:
          "Absolutely. QuickPronounce supports a wide range of vocabulary, including brand names, geographical locations, and complex medical or technical terms with clear audio output.",
        icon: "📚",
        category: "tools",
      },
      {
        id: "faq-7",
        question:
          "Can I use QuickPronounce for American, British, Australian, or Indian accents?",
        answer:
          "Yes! You can choose from four distinct accents: American (US), British (UK), Australian (AU), and Indian (IN). Simply toggle the accent setting to hear the real-time difference.",
        icon: "🌎",
        category: "features",
      },
      {
        id: "faq-8",
        question: "How do I know if I'm pronouncing a word correctly?",
        answer:
          "Compare your speech with the high-quality audio on QuickPronounce. Repeating after the native-sounding voice helps build muscle memory and improves your overall English fluency.",
        icon: "🎯",
        category: "techniques",
      },
      {
        id: "faq-9",
        question:
          "Is there an audio pronunciation dictionary for English learners?",
        answer:
          "QuickPronounce acts as a live audio dictionary. It provides not just the sound, but also meanings and examples, helping you learn how to use words in the correct context.",
        icon: "📖", // New: Targeted Audio Dictionary keyword
        category: "tools",
      },
      {
        id: "faq-10",
        question: "Is QuickPronounce mobile-friendly?",
        answer:
          "Yes, the site is fully optimized for mobile devices. You can use it as a portable pronunciation guide on your smartphone during classes, meetings, or travel.",
        icon: "📱",
        category: "features",
      },
    ],
    [],
  );

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const splitFaqs = useMemo(() => {
    const leftColumn = [];
    const rightColumn = [];
    faqData.forEach((faq, index) => {
      if (index % 2 === 0) leftColumn.push({ ...faq, originalIndex: index });
      else rightColumn.push({ ...faq, originalIndex: index });
    });
    return { leftColumn, rightColumn };
  }, [faqData]);

  const faqSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqData.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
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
        <title>
          FAQ – QuickPronounce: 4 English Accents & Audio Pronunciation Help
        </title>
        <meta
          name="description"
          content="Answers to common questions about English pronunciation. Learn about American vs British accents, IPA phonetics, and how to use our free audio tool."
        />
        <link rel="canonical" href="https://www.quickpronounce.site/faq" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p className="faq-intro">
          Learn how to master{" "}
          <strong>American, British, and Australian accents</strong>. Find tips
          on <strong>phonetic pronunciation</strong> and how to use our free
          audio tool effectively.
        </p>
      </div>

      <div className="faq-columns">
        <div className="faq-column">
          {splitFaqs.leftColumn.map((faq) => renderFaqItem(faq))}
        </div>
        <div className="faq-column">
          {splitFaqs.rightColumn.map((faq) => renderFaqItem(faq))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
