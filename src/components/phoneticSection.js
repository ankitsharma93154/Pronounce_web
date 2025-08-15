import React, { memo } from "react";
import { AudioWaveform } from "lucide-react";

const PhoneticSection = memo(
  ({ phonetic, getPronunciation, toggleFavorite, isFavorite, isPlaying }) => (
    <div className="phonetic-section">
      <div className="section-header">
        <h3 className="section-title">Phonetic Transcription</h3>
      </div>
      <div className="phonetic-display">
        <button
          onClick={getPronunciation}
          className={`icon-button audio-waveform-btn${
            isPlaying ? " playing" : ""
          }`}
        >
          <AudioWaveform className="icon" />
        </button>
        <span className={`phonetic-text${isPlaying ? " playing" : ""}`}>{`${
          phonetic || "/ _ /"
        }`}</span>
      </div>
    </div>
  )
);

export default PhoneticSection;
