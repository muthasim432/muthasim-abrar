'use client';

import React, { useState, useEffect } from 'react';

/**
 * Typing Animation Component
 * Cycles through phrases with typing and deleting effect
 */
const TypingAnimation = ({ phrases = [], className = '' }) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (phrases.length === 0) return;

    const currentPhrase = phrases[currentPhraseIndex];
    const typingSpeed = isDeleting ? 50 : 100; // Faster when deleting
    const pauseDuration = 2000; // Pause at end of phrase

    const handleTyping = () => {
      if (isPaused) {
        // After pause, start deleting
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseDuration);
        return;
      }

      if (!isDeleting) {
        // Typing forward
        if (currentText.length < currentPhrase.length) {
          setCurrentText(currentPhrase.substring(0, currentText.length + 1));
        } else {
          // Finished typing, pause before deleting
          setIsPaused(true);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentPhrase.substring(0, currentText.length - 1));
        } else {
          // Finished deleting, move to next phrase
          setIsDeleting(false);
          setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        }
      }
    };

    const timeout = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, currentPhraseIndex, phrases]);

  return (
    <span className={className}>
      {currentText}
      <span className="typing-cursor">|</span>
    </span>
  );
};

export default TypingAnimation;
