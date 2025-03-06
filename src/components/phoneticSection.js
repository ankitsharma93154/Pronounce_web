import React, { memo } from "react";
import { AudioWaveform, Heart, Share2 } from "lucide-react";

const PhoneticSection = memo(
  ({ phonetic, getPronunciation, toggleFavorite, isFavorite }) => (
    <div className="phonetic-section">
      <div className="section-header">
        <h3 className="section-title">Phonetic Transcription</h3>
        <div className="header-actions">
          <button onClick={toggleFavorite} className="icon-button">
            <Heart
              className="icon-sm"
              fill={isFavorite ? "currentColor" : "none"}
            />
          </button>
          <button className="icon-button">
            <Share2 className="icon-sm" />
          </button>
        </div>
      </div>
      <div className="phonetic-display">
        <button onClick={getPronunciation} className="icon-button">
          <AudioWaveform className="icon" />
        </button>
        <span className="phonetic-text">{phonetic || "/ _ /"}</span>
      </div>
    </div>
  )
);

export default PhoneticSection;
