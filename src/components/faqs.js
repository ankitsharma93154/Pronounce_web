import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet";

// FAQ Component with two-column layout and visual indicators
const FAQPage = () => {
  // FAQ data with added icon category for each question
  const faqData = useMemo(
    () => [
      {
        id: "faq-1",
        question: "How can I improve my English pronunciation fast?",
        answer:
          "To quickly improve your pronunciation, focus on listening and repeating native speech, mastering word stress, and practicing with tools like QuickPronounce, where you can instantly hear correct pronunciations.",
        icon: "🚀", // Quick improvement
        category: "learning",
      },
      {
        id: "faq-2",
        question: "What is the best way to pronounce difficult English words?",
        answer:
          'Use phonetic tools and listen to native pronunciations. QuickPronounce lets you type any word and hear its correct pronunciation instantly, helping you learn tricky words like "colonel," "entrepreneur," or "genre."',
        icon: "🔍", // Methods
        category: "techniques",
      },
      {
        id: "faq-3",
        question: "Is there a free tool to check English pronunciation online?",
        answer:
          "Yes! QuickPronounce.site is 100% free and lets you hear how any English word is pronounced. No sign-up, no cost — just type and listen.",
        icon: "💰", // Free/Cost
        category: "tools",
      },
      {
        id: "faq-4",
        question: "How do I know if I'm pronouncing a word correctly?",
        answer:
          "Record yourself and compare with native audio using tools like QuickPronounce. Repetition and active listening are key to building muscle memory and clarity.",
        icon: "🎯", // Accuracy
        category: "techniques",
      },
      {
        id: "faq-5",
        question: "Does QuickPronounce support all English words?",
        answer:
          "Absolutely. You can type any English word, including names, technical terms, and commonly mispronounced words, and hear their pronunciation instantly.",
        icon: "📚", // Dictionary/coverage
        category: "tools",
      },
      {
        id: "faq-6",
        question:
          "Can I use QuickPronounce to learn American or British pronunciation?",
        answer:
          "Yes! QuickPronounce allows you to choose from four accents: American, British, Australian, Indian Simply select your preferred accent, and QuickPronounce will provide accurate, real-time pronunciations in that accent!",
        icon: "🌎", // Regional accents
        category: "features",
      },
      {
        id: "faq-7",
        question: "What are the most commonly mispronounced English words?",
        answer:
          'Some examples include "February," "debt," "mischievous," and "salmon." Use QuickPronounce to search and hear their correct pronunciation.',
        icon: "⚠️", // Common mistakes
        category: "learning",
      },
      {
        id: "faq-8",
        question: "Is QuickPronounce mobile-friendly?",
        answer:
          "Yes! QuickPronounce.site is optimized for mobile so you can check pronunciations on the go — perfect for students, travelers, and language learners.",
        icon: "📱", // Mobile
        category: "features",
      },
      {
        id: "faq-9",
        question:
          "Can I use QuickPronounce to prepare for interviews or speeches?",
        answer:
          "Definitely. Whether you're prepping for a job interview, speech, or presentation, QuickPronounce helps you sound more natural and confident.",
        icon: "🎤", // Speaking/Presenting
        category: "usage",
      },
      {
        id: "faq-10",
        question: "Do I need to create an account to use QuickPronounce?",
        answer:
          "Nope. No account, no hassle. Just visit quickpronounce.site, type your word, and get instant audio.",
        icon: "🔑", // Access/Login
        category: "usage",
      },
    ],
    []
  );

  // Accordion state and toggle function
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Split the FAQ items into two columns - creates two balanced arrays
  const splitFaqs = useMemo(() => {
    const leftColumn = [];
    const rightColumn = [];

    faqData.forEach((faq, index) => {
      if (index % 2 === 0) {
        leftColumn.push(faq);
      } else {
        rightColumn.push(faq);
      }
    });

    return { leftColumn, rightColumn };
  }, [faqData]);

  // FAQ Schema for SEO
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

  // Function to render a single FAQ item
  const renderFaqItem = (faq, index) => (
    <div className="faq-item" key={faq.id}>
      <button
        className={`faq-question ${activeIndex === index ? "active" : ""}`}
        onClick={() => toggleAccordion(index)}
        aria-expanded={activeIndex === index}
        aria-controls={`faq-answer-${index}`}
      >
        <div className="question-content">
          <span className="faq-icon-indicator">{faq.icon}</span>
          <h2>{faq.question}</h2>
        </div>
        <div className="indicator-arrow">
          <svg
            className={`arrow-icon ${activeIndex === index ? "rotated" : ""}`}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9L12 15L18 9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
      <div
        id={`faq-answer-${index}`}
        className={`faq-answer ${activeIndex === index ? "open" : ""}`}
      >
        <p>{faq.answer}</p>
      </div>
    </div>
  );

  return (
    <div className="faq-container">
      <Helmet>
        {/* <title>
          Frequently Asked Questions | QuickPronounce - English Pronunciation
          Guide
        </title>
        <meta
          name="description"
          content="Get answers to common questions about English pronunciation, accents, phonetics, and using QuickPronounce to improve your speaking skills."
        />
        <meta
          name="keywords"
          content="pronunciation FAQ, English accents, phonetic guide, pronunciation help, language learning, ESL, pronunciation tips"
        /> */}
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p className="faq-intro">
          Get answers to common questions about English pronunciation and how to
          use QuickPronounce to improve your speaking skills. Our comprehensive
          guide covers all aspects of pronunciation.
        </p>
      </div>

      <div className="faq-columns">
        <div className="faq-column">
          {splitFaqs.leftColumn.map((faq, index) =>
            renderFaqItem(faq, index * 2)
          )}
        </div>
        <div className="faq-column">
          {splitFaqs.rightColumn.map((faq, index) =>
            renderFaqItem(faq, index * 2 + 1)
          )}
        </div>
      </div>

      <style jsx>{`
        /* Updated CSS using global variables for dark mode compatibility */
        .faq-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          color: var(--text-primary);
        }

        .faq-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .faq-header h1 {
          background: var(--primary-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          display: inline-block;
        }

        .faq-intro {
          max-width: 800px;
          margin: 0 auto;
          color: var(--text-secondary);
          font-size: 1.1rem;
          line-height: 1.5;
        }

        /* Two-column layout */
        .faq-columns {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 1100px;
          margin: 0 auto;
        }

        @media (min-width: 900px) {
          .faq-columns {
            flex-direction: row;
          }

          .faq-column {
            flex: 1;
            margin: 0 1rem;
          }
        }

        .faq-item {
          margin-bottom: 1rem;
          border-radius: 12px;
          box-shadow: var(--shadow-md);
          background-color: var(--bg-primary);
          overflow: hidden;
          transition: transform var(--transition), box-shadow var(--transition);
          border: 1px solid var(--border-color);
        }

        .faq-item:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          text-align: left;
          padding: 1.2rem;
          background: var(--bg-primary);
          border: none;
          cursor: pointer;
          transition: background-color var(--transition);
          color: var(--text-primary);
        }

        /* Question content with icon */
        .question-content {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
        }

        .faq-icon-indicator {
          font-size: 1.3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 36px;
          height: 36px;
          background: var(--bg-secondary);
          border-radius: 50%;
          transition: background-color var(--transition);
        }

        .faq-question:hover {
          background-color: var(--bg-secondary);
        }

        .faq-question h2 {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .faq-question.active {
          background-color: var(--bg-secondary);
          border-bottom: 1px solid var(--border-color);
        }

        /* Arrow indicator instead of +/- */
        .indicator-arrow {
          flex-shrink: 0;
        }

        .arrow-icon {
          stroke: var(--primary);
          transition: transform var(--transition);
        }

        .arrow-icon.rotated {
          transform: rotate(180deg);
        }

        .faq-answer {
          max-height: 0;
          padding: 0 1.2rem 0 3.7rem; /* Increased left padding to align with icon */
          overflow: hidden;
          transition: all var(--transition);
          background-color: var(--bg-primary);
        }

        .faq-answer.open {
          max-height: 500px;
          padding: 1.2rem 1.2rem 1.2rem 3.7rem;
        }

        .faq-answer p {
          margin: 0;
          color: var(--text-secondary);
          line-height: 1.5;
          font-size: 1rem;
        }

        .faq-cta h2 {
          color: var(--text-primary);
          display: inline-block;
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .faq-cta p {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .cta-button {
          background: var(--primary-gradient);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 0.8rem 2rem;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition);
          box-shadow: var(--shadow-sm);
        }

        .cta-button:hover {
          background: var(--primary-gradient-hover);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        @media (max-width: 768px) {
          .faq-container {
            padding: 1.5rem;
          }

          .faq-header h1 {
            font-size: 2rem;
          }

          .faq-question h2 {
            font-size: 1rem;
          }

          .faq-icon-indicator {
            font-size: 1.2rem;
            min-width: 30px;
            height: 30px;
          }

          .faq-answer,
          .faq-answer.open {
            padding-left: 3.3rem;
          }
        }
      `}</style>
    </div>
  );
};

export default FAQPage;
