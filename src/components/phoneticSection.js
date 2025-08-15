import React, { memo } from "react";
import { AudioWaveform } from "lucide-react";

const isValidPhonetic = (phonetic) => {
  if (!phonetic) return false;
  const trimmed = phonetic.trim();
  return (
    trimmed &&
    trimmed !== "/ _ /" &&
    trimmed !== "Phonetic transcription not available."
  );
};

const PhoneticSection = memo(
  ({ phonetic, getPronunciation, toggleFavorite, isFavorite, isPlaying }) => {
    const animate = isPlaying && isValidPhonetic(phonetic);
    return (
      <div className="phonetic-section">
        <div className="section-header">
          <h3 className="section-title">Phonetic Transcription</h3>
        </div>
        <div className="phonetic-display">
          <button
            onClick={getPronunciation}
            className={`icon-button audio-waveform-btn${
              animate ? " playing" : ""
            }`}
          >
            <AudioWaveform className="icon" />
          </button>
          <span className={`phonetic-text${animate ? " playing" : ""}`}>
            {phonetic || "/ _ /"}
          </span>
        </div>
      </div>
    );
  }
);

export default PhoneticSection;
