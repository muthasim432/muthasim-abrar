import React from 'react';
import '../css/whatyouget.css';

const WhatYouGet = ({
  title = "What You Get",
  features = []
}) => {
  return (
    <section className="service-features-section">
      <div className="service-features-container">
        <h2 className="section-title">{title}</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatYouGet;
