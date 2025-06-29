import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import "./Css/FaqPage.css"; // Assuming you have a CSS file for styling

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
        <title>
          FAQ – Quick Answers About Pronunciation, Accents & App Features |
          QuickPronounce
        </title>

        <meta
          name="description"
          content="Have questions about using QuickPronounce? Get instant answers on pronunciation tips, accent selection, app functionality, and more. Start speaking confidently today!"
        />

        <meta
          name="keywords"
          content="QuickPronounce FAQ, pronunciation help, accent selection, app support, how to use pronunciation app, language learning support, English speaking, ESL pronunciation tips"
        />

        <link rel="canonical" href="https://www.quickpronounce.site/faq" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="QuickPronounce FAQ – Get Help with Pronunciation, Accents & the App"
        />
        <meta
          property="og:description"
          content="Find answers to the most common questions about QuickPronounce. Learn how to choose accents, use the app effectively, and improve your English pronunciation."
        />
        <meta
          property="og:image"
          content="https://www.quickpronounce.site/images/quickpronounce-faq-banner.jpg"
        />
        <meta property="og:url" content="https://www.quickpronounce.site/faq" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="QuickPronounce" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="QuickPronounce FAQ – Answers About Pronunciation & the App"
        />
        <meta
          name="twitter:description"
          content="Need help with QuickPronounce? Check our FAQ for tips on using the app, selecting accents, and improving your English pronunciation fast."
        />
        <meta
          name="twitter:image"
          content="https://www.quickpronounce.site/images/quickpronounce-faq-banner.jpg"
        />
        <meta name="twitter:site" content="@quickpronounce" />

        {/* JSON-LD Structured Data (assuming `faqSchema` is defined above) */}
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
    </div>
  );
};

export default FAQPage;
