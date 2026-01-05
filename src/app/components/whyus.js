'use client';

import React from 'react';
import '../css/whyus.css';

const WhyUs = ({
  showCTA = false,
  onCTAClick,
  pillText = "Why Us",
  title = "Why Choose Mayvk?",
  subtitle = "For long-term growth you need solutions that are cost-effective, not overpriced",
  features: customFeatures,
  ctaButtonText = "Schedule a Consultation",
  // New props for two-button mode
  primaryButton = null,
  secondaryButton = null
}) => {
  const defaultFeatures = [
    {
      id: 1,
      title: 'Fair Pricing',
      description: 'Unlike other agencies that overprice and bloat you with unnecessary maintenance costs, we focus on creating the best solution keeping cost-efficiency and quality in mind so you don\'t have a frustrating experience of rebuilding.',
      icon: '💰',
      color: '#4CAF50'
    },
    {
      id: 2,
      title: 'Fast & Secure Deployment',
      description: 'We ensure your project is deployed quickly without compromising security. Our streamlined processes mean you get your solution to market faster while maintaining the highest security standards.',
      icon: '🚀',
      color: '#2196F3'
    },
    {
      id: 3,
      title: 'Built by Engineers, Not Businessmen',
      description: 'Run by a Computer Science graduate, not money-hungry businessmen. We believe in transparent processes, honest communication, and solutions that actually work, not just what sells.',
      icon: '👨‍💻',
      color: '#FF9800'
    }
  ];

  const features = customFeatures || defaultFeatures;

  return (
    <section className="whyus-section">
      <div className="whyus-container">
        <div className="whyus-header">
          <span className="whyus-pill">{pillText}</span>
          <h2 className="whyus-title">{title}</h2>
          <p className="whyus-subtitle">
            {subtitle}
          </p>
        </div>

        <div className="whyus-features">
          {features.map((feature) => (
            <div key={feature.id} className="whyus-feature-card">
              <div className="feature-illustration">
                <div className="illustration-circle" style={{ background: `${feature.color}20` }}>
                  <span className="feature-icon" style={{ fontSize: '48px' }}>{feature.icon}</span>
                </div>
              </div>

              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>

        {showCTA && (
          <div className="whyus-cta-wrapper">
            {(primaryButton || secondaryButton) ? (
              <div className="whyus-buttons">
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
              <button className="cta-button" onClick={onCTAClick}>
                {ctaButtonText}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default WhyUs;