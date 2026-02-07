import React, { memo } from "react";
import { AudioWaveform } from "lucide-react";

const PhoneticSection = memo(
  ({ phonetic, getPronunciation, isPlaying, syllables }) => (
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

        <span className={`phonetic-text${isPlaying ? " playing" : ""}`}>
          {phonetic || "/ _ /"}
        </span>
      </div>

      {/* Pronunciation Breakdown */}
      {syllables && syllables.length > 0 && (
        <div className="syllable-display">
          <div className="section-header">
            <h3 className="section-title">Pronunciation Breakdown</h3>
          </div>

          <div className="syllables-inline phonetic-display">
            {syllables.map((syllable, index) => (
              <React.Fragment key={index}>
                <span
                  className={`phonetic-text syllable stress-${
                    syllable.stress || 0
                  }`}
                  title={
                    syllable.stress === 1
                      ? "Primary stress"
                      : syllable.stress === 2
                        ? "Secondary stress"
                        : "Unstressed"
                  }
                >
                  {syllable.text}
                </span>

                {index < syllables.length - 1 && (
                  <span className="syllable-separator"> · </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  ),
);

export default PhoneticSection;
