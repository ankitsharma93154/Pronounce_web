import React from "react";
import { Link } from "react-router-dom";
import { Volume2, BookOpen } from "lucide-react"; // lightweight speaker icon

const mispronouncedWords = [
  "Gyro",
  "Worcestershire",
  "Dachshund",
  "Charcuterie",
  "Niche",
  "Porsche",
  "Tinnitus",
  "Colonel",
  "Mischievous",
  "Debris",
  "Genre",
  "Pronunciation",
  "Espresso",
  "Acai",
  "Quinoa",
  "Entrepreneur",
  "Epitome",
  "Prerogative",
  "Prescription",
  "Specific",
  "Bruschetta",
  "Phenomenon",
  "Definitely",
  "Prestigious",
  "Cryptography",
  "Cryptocurrency",
  "Facade",
  "Hyperbole",
  "Asterisk",
  "Fluorescent",
];

const MispronouncedWords = ({ pronounce }) => {
  return (
    <div className="mispronounced-container">
      <h2>Hear How These Words Are Really Pronounced</h2>
      <p className="subtitle">
        Click any word to hear its correct pronunciation.
      </p>
      <div className="word-grid">
        {mispronouncedWords.map((word, index) => (
          <div
            key={index}
            className="word-box"
            onClick={() => pronounce(word)}
            title="Click to hear pronunciation"
          >
            <span className="word-text">{word}</span>
            <Volume2 className="word-icon" size={16} />
            <div className="word-box-overlay"></div>
          </div>
        ))}
      </div>
      <p className="ipa-help-line mispronounced-related-reads">
        <BookOpen className="cta-inline-icon" size={14} />
        Related reads:{" "}
        <Link className="ipa-help-link" to="/blog/pronunciation-guide">
          50 Most Mispronounced Words
        </Link>{" "}
        and{" "}
        <Link className="ipa-help-link" to="/blog/silent-letters">
          Silent Letters Guide
        </Link>
      </p>
    </div>
  );
};

export default MispronouncedWords;
