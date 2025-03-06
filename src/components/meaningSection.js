import React, { memo } from "react";

const MeaningsSection = memo(({ meanings }) => (
  <div>
    <h3 className="section-title">Meanings</h3>
    <div className="meanings-list">
      {meanings.map((meaning, index) => (
        <div key={index} className="meaning-item">
          {meaning}
        </div>
      ))}
    </div>
  </div>
));

export default MeaningsSection;
