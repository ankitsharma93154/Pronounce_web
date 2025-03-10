import React from "react";

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
];

const MispronouncedWords = ({ pronounce }) => {
  return (
    <div className="mispronounced-container">
      <h2>Commonly Mispronounced Words</h2>
      <div className="word-grid">
        {mispronouncedWords.map((word, index) => (
          <div key={index} className="word-box" onClick={() => pronounce(word)}>
            {word}
            <div className="word-box-overlay"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MispronouncedWords;
