'use client';

import React, { useState } from 'react';
import AnimatedAnnouncements from './animatedannouncements';
import TypingAnimation from './typinganimation';
import { useEmailValidationStrict } from '../../hooks/useEmailValidation';
import '../css/homehero.css';

const HomeHero = ({
  onGetStarted,
  title = "We Help You Build Premium",
  highlightedText = " Web Applications",
  titleSuffix = "Without Premium Pricing.",
  useTypingAnimation = false,
  typingPhrases = [
    "Web Applications",
    "AI Solutions",
    "Custom Software",
    "Digital Products",
    "SaaS Platforms"
  ],
  showAnnouncements = true,
  showFeaturesPills = true,
  featuresPills = [
    { text: 'AI Chat Assistant', className: 'live-chat' },
    { text: 'Lead Generation', className: 'lead-generation' },
    { text: 'Websites & Web Apps', className: 'knowledge' },
    { text: 'AI Solutions & Integration', className: 'crm' },
    { text: 'Mobile App', className: 'chat-pages' }
  ],
  showFreeBadge = true,
  freeBadgeText = "Because For long-term growth you need solutions that are cost-effective not overpriced",
  freeBadgeLink = { text: "", href: "" },
  emailPlaceholder = "Enter your email address",
  buttonText = "Get Started",
  // New props for button mode
  showEmailInput = true,
  primaryButton = null,
  secondaryButton = null
}) => {
  const [email, setEmail] = useState('');

  // Real-time email validation
  const emailValidation = useEmailValidationStrict(email, {
    validateOnChange: true,
    debounceMs: 500
  });

  return (
    <section className="home-hero-section">
      <div className="home-hero-container">
        {/* Animated Announcements */}
        {showAnnouncements && <AnimatedAnnouncements />}

        {/* Main Heading */}
        <h1 className="home-hero-title">
          {title}
          <br />
          {useTypingAnimation ? (
            <TypingAnimation phrases={typingPhrases} className="text-highlight" />
          ) : (
            <span className="text-highlight">{highlightedText}</span>
          )}
          {titleSuffix && (
            <>
              <br />
              {titleSuffix}
            </>
          )}
        </h1>

        {/* Email Input or Buttons */}
        {showEmailInput ? (
          <div className="hero-email-wrapper">
            <div className={`hero-email ${email && !emailValidation.isValid ? 'error' : ''} ${email && emailValidation.isValid ? 'valid' : ''}`}>
              <input
                type="email"
                className="email-input"
                placeholder={emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="email-submit-btn"
                onClick={() => {
                  if (!email || emailValidation.isValid) {
                    onGetStarted(email);
                  }
                }}
                disabled={email && !emailValidation.isValid}
              >
                {buttonText}
              </button>
            </div>
            {email && emailValidation.hasError && (
              <div className="hero-email-error">
                {emailValidation.message}
              </div>
            )}
            {email && emailValidation.isValid && (
              <div className="hero-email-success">
                Email looks good!
              </div>
            )}
          </div>
        ) : (primaryButton || secondaryButton) && (
          <div className="hero-buttons-wrapper">
            {primaryButton && (
              <a href={primaryButton.href} className="hero-btn-primary">
                {primaryButton.text}
              </a>
            )}
            {secondaryButton && (
              <a href={secondaryButton.href} className="hero-btn-secondary">
                {secondaryButton.text}
              </a>
            )}
          </div>
        )}

        {/* Features Pills */}
        {showFeaturesPills && featuresPills.length > 0 && (
          <div className="features-pills">
            {featuresPills.map((pill, index) => (
              <span key={index} className={`pill ${pill.className}`}>
                {pill.text}
              </span>
            ))}
          </div>
        )}

        {/* Free Badge */}
        {showFreeBadge && (
          <div className="free-badge">
            <span className="free-text">{freeBadgeText}</span>
            {freeBadgeLink && (
              <>
                {/* <span className="free-dash">-</span> */}
                <a href={freeBadgeLink.href} className="read-why">
                  {freeBadgeLink.text}
                </a>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeHero;