import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./Css/Blog.css";

// Only import the header image upfront since it's above the fold
import headerImage from "../images/header.jpg";

const PronunciationBlog = () => {
  // State to store dynamically loaded images
  const [tipImages, setTipImages] = useState({});

  // Define tips data
  const tips = [
    {
      id: 1,
      title: "Master the Sounds of the English Alphabet",
      overview:
        "Understanding the sounds of each letter is crucial for pronunciation. English has a complex system of vowel and consonant sounds, many of which don't exist in other languages.",
      actionable:
        "Start with basic phonetic charts and focus on sounds like /æ/ (cat), /ʌ/ (cup), and /θ/ (think). Using phonetic transcriptions can help reinforce these sounds. Good pronunciation resources will provide audio examples of these fundamental sounds to help train your ear.",
      hasImage: true,
      imagePath: "tip6.jpg",
    },
    {
      id: 2,
      title: "Understand Word Stress and Intonation",
      overview:
        "Word stress refers to emphasizing certain syllables in words, and intonation is the rise and fall of your voice while speaking.",
      actionable:
        "Practice stressing the right syllables in words, such as 'photograph' vs. 'photographer.' Listen carefully to how native speakers emphasize different parts of words and try to mimic their patterns. Many pronunciation guides will highlight which syllables should be stressed in multi-syllable words.",
      hasImage: true,
      imagePath: "tip2.jpg",
    },
    {
      id: 3,
      title: "Use Phonetic Transcriptions (IPA)",
      overview:
        "The International Phonetic Alphabet (IPA) can seem daunting, but it's an incredibly powerful tool for mastering pronunciation.",
      actionable:
        "Start familiarizing yourself with IPA symbols for common English sounds. Use a dictionary with IPA symbols or a pronunciation resource that shows phonetic transcriptions to see how words are pronounced. Understanding these symbols will give you a visual representation of sounds that can be difficult to describe in writing.",
      hasImage: true,
      imagePath: "tip4.png",
    },
    {
      id: 4,
      title: "Listen to Native Speakers Regularly",
      overview:
        "The more you listen to native speakers, the more natural your pronunciation will become.",
      actionable:
        "Try mimicking what you hear in English movies, podcasts, or videos. Focus on the rhythm, stress, and intonation of native speakers. Pronunciation practice becomes much more effective when you have authentic examples to follow. Consider using resources that let you hear words pronounced in different regional accents.",
      hasImage: true,
      imagePath: "tip1.jpg",
    },
    {
      id: 5,
      title: "Record Yourself Speaking",
      overview:
        "Recording yourself is a fantastic way to measure your progress and identify areas where you need improvement.",
      actionable:
        "Use your phone or computer to record your speech. Then, listen carefully and compare your pronunciation to native speakers, paying attention to differences. This self-assessment technique helps you become more aware of your speech patterns and identify specific sounds or words that need more practice.",
      hasImage: true,
      imagePath: "tip5.jpg",
    },
    {
      id: 6,
      title: "Practice Speaking with a Language Partner",
      overview:
        "Conversing with a language partner gives you real-time feedback and can accelerate your learning.",
      actionable:
        "Join a language exchange group or find a speaking partner online. Practicing with a native or fluent speaker is invaluable for improving your pronunciation. They can point out errors that you might not notice yourself, and provide immediate corrections that help you adjust your speech patterns.",
      hasImage: true,
      imagePath: "tip3.jpg",
    },
    {
      id: 7,
      title: "Learn Regional Accents",
      overview:
        "English pronunciation can vary widely depending on the region (e.g., American vs. British vs. Australian English).",
      actionable:
        "Try to understand and mimic the regional variations in pronunciation. If you're learning American English, practice listening to American speakers regularly. Being exposed to different accents improves your overall comprehension skills and helps you communicate more effectively with a wider range of English speakers.",
      hasImage: true,
      imagePath: "tip8.jpg",
    },
    {
      id: 8,
      title: "Practice Difficult Sounds",
      overview:
        'Some sounds in English are notoriously difficult for non-native speakers, such as the "th" sound in "think" or "this."',
      actionable:
        "Isolate the challenging sounds and practice them repeatedly. Try tongue twisters like 'The thirty-three thieves thought that Thursday was their thirtieth birthday' to help you with sounds that are hard to pronounce. Focused practice on these troublesome sounds will yield better results than general speaking practice.",
      hasImage: false,
    },
    {
      id: 9,
      title: "Focus on Linking Sounds",
      overview:
        "Native English speakers often link words together to make speech flow more naturally.",
      actionable:
        'Practice linking words in sentences, such as "I wanna go" instead of "I want to go." This will help your speech sound more fluent and natural. Pay attention to how words blend together in natural speech - good pronunciation resources will demonstrate these connected speech patterns.',
      hasImage: false,
    },
    {
      id: 10,
      title: "Be Patient and Keep Practicing",
      overview:
        "Pronunciation improvement takes time and consistent effort. Celebrate small victories along the way.",
      actionable:
        "Set small, achievable pronunciation goals (e.g., mastering 10 new words a week) and track your progress. Remember that even native speakers have different accents, so aim for clarity rather than perfection. Regular practice with good resources and feedback is the key to continuous improvement.",
      hasImage: true,
      imagePath: "tip7.jpg",
    },
  ];

  // Use intersection observer to load images as they come into view
  useEffect(() => {
    // Create an intersection observer
    const loadImages = () => {
      // Dynamically import images only when needed
      const importImage = async (path) => {
        try {
          // Using dynamic import for each image
          const imageModule = await import(`../images/${path}`);
          setTipImages((prev) => ({
            ...prev,
            [path]: imageModule.default,
          }));
        } catch (error) {
          console.error(`Failed to load image: ${path}`, error);
        }
      };

      // Get all tips with images
      const tipsWithImages = tips.filter((tip) => tip.hasImage);

      // Create observers for each tip section
      tipsWithImages.forEach((tip) => {
        const tipElement = document.getElementById(`tip-${tip.id}`);

        if (tipElement) {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                // When tip section comes into view, load its image
                if (entry.isIntersecting && !tipImages[tip.imagePath]) {
                  importImage(tip.imagePath);
                  // Stop observing after loading
                  observer.unobserve(tipElement);
                }
              });
            },
            { rootMargin: "200px" } // Start loading when within 200px of viewport
          );

          observer.observe(tipElement);
        }
      });

      // Cleanup function to disconnect observers
      return () => {
        tipsWithImages.forEach((tip) => {
          const tipElement = document.getElementById(`tip-${tip.id}`);
          if (tipElement) {
            const observer = new IntersectionObserver(() => {});
            observer.unobserve(tipElement);
          }
        });
      };
    };

    loadImages();
  });

  return (
    <div className="pronunciation-blog">
      <Helmet>
        <title>
          10 Tips to Perfect Your English Pronunciation | QuickPronounce
        </title>
        <meta
          name="description"
          content="Improve your English pronunciation with 10 actionable tips on phonetics, intonation, and stress patterns. Start mastering your speaking skills today!"
        />
        <meta
          name="keywords"
          content="English pronunciation, pronunciation tips, language learning, phonetics, speaking skills, ESL"
        />
      </Helmet>
      <div className="blog-header">
        <div className="container">
          <h1>10 Proven Tips to Perfect Your English Pronunciation</h1>
          <h2>A Learner's Guide</h2>
          <div className="header-graphic">
            <img
              src={headerImage}
              alt="English pronunciation guide illustration"
            />
          </div>
          <div className="introduction">
            <p>
              Effective communication in English isn't just about vocabulary and
              grammar—it's about clear pronunciation. Whether you're preparing
              for an interview, traveling abroad, or just improving your
              fluency, mastering the sounds of English can make a world of
              difference. In this guide, we'll share 10 actionable tips to help
              you pronounce English words more accurately and communicate with
              confidence.
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="table-of-contents">
          <h3>Table of Contents</h3>
          <ol className="toc-list">
            {tips.map((tip) => (
              <li key={tip.id}>
                <a href={`#tip-${tip.id}`}>{tip.title}</a>
              </li>
            ))}
          </ol>
        </div>

        <div className="tips-content">
          {tips.map((tip) => (
            <div id={`tip-${tip.id}`} key={tip.id} className="tip-card">
              <div className="tip-number">Tip {tip.id}</div>
              <h3>{tip.title}</h3>

              {tip.hasImage ? (
                // Layout for tips with images (two-column)
                <div className="two-column-layout">
                  <div className="tip-content">
                    <div className="tip-section">
                      <h4>Overview:</h4>
                      <p>{tip.overview}</p>
                    </div>

                    <div className="tip-section">
                      <h4>Actionable Tip:</h4>
                      <p>{tip.actionable}</p>
                    </div>
                  </div>

                  <div className="tip-illustration">
                    {tipImages[tip.imagePath] ? (
                      <LazyLoadImage
                        src={tipImages[tip.imagePath]}
                        alt={`Illustration for ${tip.title}`}
                        effect="blur"
                        threshold={100}
                        placeholder={
                          <div className="image-placeholder">
                            <div className="loading-spinner"></div>
                          </div>
                        }
                      />
                    ) : (
                      <div className="image-placeholder">
                        <div className="loading-spinner"></div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Layout for tips without images (single-column)
                <div className="single-column-layout">
                  <div className="tip-content full-width">
                    <div className="tip-section">
                      <h4>Overview:</h4>
                      <p>{tip.overview}</p>
                    </div>

                    <div className="tip-section">
                      <h4>Actionable Tip:</h4>
                      <p>{tip.actionable}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="call-to-action">
          <h2>Ready to Perfect Your Pronunciation?</h2>
          <p>
            Our pronunciation tool can help you practice these techniques and
            improve your English speaking skills.
          </p>
          <Link to="/" className="home">
            Try it now!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PronunciationBlog;
