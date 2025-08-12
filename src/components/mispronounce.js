import React from "react";
import { Volume2 } from "lucide-react"; // lightweight speaker icon

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
    </div>
  );
};

export default MispronouncedWords;
