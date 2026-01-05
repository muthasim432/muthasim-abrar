'use client';

import React from 'react';
import '../css/ctasection.css';

const CTASection = ({
  title = "Ready to Get Started?",
  description = "Let's build something amazing together",
  buttonText = "Schedule a Consultation",
  onButtonClick,
  // New props for two-button mode
  primaryButton = null,
  secondaryButton = null
}) => {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <h2 className="cta-title">{title}</h2>
        <p className="cta-description">{description}</p>
        {(primaryButton || secondaryButton) ? (
          <div className="cta-buttons-wrapper">
            {primaryButton && (
              <a href={primaryButton.href} className="cta-button primary">
                {primaryButton.text}
              </a>
            )}
            {secondaryButton && (
              <a href={secondaryButton.href} className="cta-button secondary">
                {secondaryButton.text}
              </a>
            )}
          </div>
        ) : (
          <button className="cta-button" onClick={onButtonClick}>
            {buttonText}
          </button>
        )}
      </div>
    </section>
  );
};

export default CTASection;
