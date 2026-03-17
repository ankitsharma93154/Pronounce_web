// src/components/BlogPosts.js
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../Css/BlogPosts.css";
import mispronouncedWordsImage from "../../images/mispronounced-image.jpg";
import tenTipsImage from "../../images/header.jpg";
import AmeVsBreIMG from "../../images/AmeVsBre_thumbnail.webp";
import IPA_img from "../../images/IPA_GUIDE_img.webp";
import silentLettersImage from "../../images/silent_letters_intro.webp";
import IELTS_header from "../../images/IELTS_header.webp";
import schwaThumb from "../../images/schwa_sound_infographic.webp";
import edEndingsThumb from "../../images/ed_endings_decision_chart_high_res.webp";
import connectedSpeechThumb from "../../images/connected_speech_infographic.webp";
import wordStressThumb from "../../images/word_stress_thumbnail_v2.webp";
import minimalPairsThumb from "../../images/minimal_pairs_sound_contrast_map_v2.webp";
import theVsTheeThumb from "../../images/the_vs_thee_flowchart.webp";

const blogPostsData = [
  {
    id: 1,
    title: "How to Pronounce the 50 Most Mispronounced English Words",
    description:
      "Master tricky English pronunciation with this detailed audio guide. Learn to say difficult words correctly and never make common mistakes again!",
    imageUrl: mispronouncedWordsImage,
    date: "April 25, 2025",
    category: "Pronunciation Guide",
    readTime: "8 min read",
    link: "/blog/pronunciation-guide",
  },
  {
    id: 2,
    title: "10 Tips to Perfect Your English Pronunciation & Audio Clarity",
    description:
      "Improve your speaking skills with 10 actionable tips on phonetics, word stress, and intonation. Perfect for ESL learners who want to sound more natural.",
    imageUrl: tenTipsImage,
    date: "May 20, 2025",
    category: "Learning Tips",
    readTime: "7 min read",
    link: "/blog/pronunciation-tips",
  },
  {
    id: 3,
    title: "American vs. British Pronunciation: Audio & Accent Sound Rules",
    description:
      "Compare American vs. British accent differences with real audio examples. Master the 4 fundamental rules of rhoticity and vowel shifts.",
    imageUrl: AmeVsBreIMG,
    date: "October 28, 2025",
    category: "Accent Training",
    readTime: "12 min read",
    link: "/blog/american-vs-british",
  },
  {
    id: 4,
    title: "The Ultimate IPA Guide: Master Phonetic Pronunciation Symbols",
    description:
      "Learn to read the International Phonetic Alphabet (IPA). Decode phonetic transcriptions and use QuickPronounce to check the IPA of any English word.",
    imageUrl: IPA_img,
    date: "December 14, 2025",
    category: "Phonetics",
    readTime: "8 min read",
    link: "/blog/IPA-guide",
  },
  {
    id: 5,
    title: "Silent Letters in English: Audio Pronunciation Rules for Learners",
    description:
      "Master 50+ words with silent letters. Learn the pronunciation rules for silent 'K', 'B', and 'T' backed by IPA phonetic guides.",
    imageUrl: silentLettersImage,
    date: "January 9, 2026",
    category: "Pronunciation Guide",
    readTime: "10 min read",
    link: "/blog/SilentLetters",
  },
  {
    id: 6,
    title:
      "Mastering IELTS Speaking Pronunciation: How to Reach a Band 9 Without Sounding 'Fake'",
    description:
      "Achieve Band 9 in IELTS Speaking with expert pronunciation tips. Learn clarity, stress, and connected speech techniques for natural fluency.",
    imageUrl: IELTS_header,
    date: "January 22, 2026",
    category: "Exam Preparation",
    readTime: "12–14 min read",
    link: "/blog/ielts",
  },
  {
    id: 7,
    title:
      "Schwa Sound in English: The Relaxed Vowel That Makes You Sound Natural",
    description:
      "Learn the most common English vowel sound with practical examples, analogies, and a 5-minute daily drill.",
    imageUrl: schwaThumb,
    date: "March 9, 2026",
    category: "Pronunciation Guide",
    readTime: "9 min read",
    link: "/blog/schwa-sound-guide",
  },
  {
    id: 8,
    title: "How to Pronounce -ed Endings Without Guessing",
    description:
      "Master /t/, /d/, and /id/ past-tense endings with a simple rule system and quick speaking drills.",
    imageUrl: edEndingsThumb,
    date: "March 9, 2026",
    category: "Grammar + Pronunciation",
    readTime: "8 min read",
    link: "/blog/ed-endings-pronunciation",
  },
  {
    id: 9,
    title:
      "Connected Speech: Why Native English Sounds Fast and How to Train It",
    description:
      "Understand linking, elision, and assimilation with examples, analogies, and a repeatable 7-minute drill.",
    imageUrl: connectedSpeechThumb,
    date: "March 9, 2026",
    category: "Fluency Training",
    readTime: "11 min read",
    link: "/blog/connected-speech-guide",
  },
  {
    id: 10,
    title: "Word Stress in English: The Hidden Rule That Changes Meaning",
    description:
      "Learn practical word stress rules with real examples and drills to sound clearer in conversations, meetings, and exams.",
    imageUrl: wordStressThumb,
    date: "March 15, 2026",
    category: "Pronunciation Guide",
    readTime: "14–16 min read",
    link: "/blog/word-stress-rules-guide",
  },
  {
    id: 11,
    title:
      "Minimal Pairs Training Plan: The Fastest Way to Fix Confusing Sounds",
    description:
      "Train high-impact sound contrasts with a practical system that improves both listening precision and speaking clarity.",
    imageUrl: minimalPairsThumb,
    date: "March 15, 2026",
    category: "Fluency Training",
    readTime: "15–17 min read",
    link: "/blog/minimal-pairs-training-plan",
  },
  {
    id: 12,
    title:
      "The vs Thee: A Small Pronunciation Rule That Makes a Big Difference",
    description:
      "Master when to say /ðə/ vs /ðiː/ with sound-first rules, natural examples, and rhythm-friendly practice.",
    imageUrl: theVsTheeThumb,
    date: "March 15, 2026",
    category: "Pronunciation Guide",
    readTime: "12–14 min read",
    link: "/blog/the-vs-thee-pronunciation",
  },
];

const sortedBlogPostsData = [...blogPostsData].sort((a, b) => {
  const dateDiff = new Date(b.date) - new Date(a.date);
  return dateDiff !== 0 ? dateDiff : b.id - a.id;
});

const BlogPosts = () => {
  // ITEMLIST SCHEMA: Helps Google see this as a list of high-value articles
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: sortedBlogPostsData.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://www.quickpronounce.site${post.link}`,
      name: post.title,
    })),
  };

  return (
    <div className="blog-posts-page">
      <Helmet>
        <title>How to Pronounce Words: Audio, IPA & Accent Guides</title>
        <meta
          name="description"
          content="Explore guides on how to pronounce words, compare pronunciation audio, read IPA, and improve English accent clarity with QuickPronounce."
        />
        <link rel="canonical" href="https://www.quickpronounce.site/blog" />

        {/* OPEN GRAPH */}
        <meta
          property="og:title"
          content="How to Pronounce Words: Audio, IPA & Accent Guides"
        />
        <meta
          property="og:description"
          content="Master English sounds with practical guides on word pronunciation audio, IPA, silent letters, and accent differences."
        />
        <meta
          property="og:url"
          content="https://www.quickpronounce.site/blog"
        />
        <meta property="og:type" content="blog" />

        <script type="application/ld+json">
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Blog",
              name: "QuickPronounce Pronunciation Blog",
              description:
                "Guides and tips for mastering English accents and phonetics.",
              url: "https://www.quickpronounce.site/blog",
            },
            itemListSchema,
          ])}
        </script>
      </Helmet>

      <header className="blog-header">
        <div className="container">
          <h1>How to Pronounce Words, IPA, and Accent Differences</h1>
          <p className="subtitle">
            Master <strong>phonetic transcription</strong>, explore{" "}
            <strong>American vs British audio</strong>, and find practical
            guides for words learners search and replay most often.
          </p>
        </div>
      </header>

      <main className="container blog-content blog-content--spaced">
        <section className="blog-grid-section">
          <div className="blog-grid">
            {sortedBlogPostsData.map((post) => (
              <Link
                to={post.link}
                key={post.id}
                className="blog-card"
                aria-label={`Read more about ${post.title}`}
              >
                <img
                  className="blog-card-image"
                  src={post.imageUrl}
                  alt={post.title}
                  loading="lazy"
                />
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <span className="blog-card-category">{post.category}</span>
                    <span className="blog-card-date">{post.date}</span>
                  </div>
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-description">{post.description}</p>
                  <span className="blog-card-read-time">{post.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogPosts;
