import React from 'react';
import './AudioLoader.css'; // Assuming the styles are in Loader.css

const Audio = () => {
  return (
    <div className="loader z-50">
      <div className="loader-inner">
        {Array.from({ length: 20}).map((_, index) => (
          <div key={index} className="loader-block"></div>
        ))}
      </div>
    </div>
  );
};

export default Audio;
