import React, { useState, useRef } from 'react';
import '../css/process.css';

const Process = ({
  title = "Our Process",
  subtitle = "From concept to launch in simple steps",
  steps = []
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const handleScroll = () => {
    if (sliderRef.current) {
      const scrollPosition = sliderRef.current.scrollLeft;
      const slideWidth = sliderRef.current.offsetWidth;
      const newSlide = Math.round(scrollPosition / slideWidth);
      setCurrentSlide(newSlide);
    }
  };

  const scrollToSlide = (index) => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.offsetWidth;
      sliderRef.current.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
      });
      setCurrentSlide(index);
    }
  };

  return (
    <section className="service-process-section">
      <div className="service-process-container">
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">{subtitle}</p>

        <div
          className="process-steps"
          ref={sliderRef}
          onScroll={handleScroll}
        >
          {steps.map((step, index) => (
            <div key={index} className="process-step">
              <div className="step-number">{step.number || index + 1}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Dots for mobile */}
        <div className="process-dots">
          {steps.map((_, index) => (
            <button
              key={index}
              className={`process-dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => scrollToSlide(index)}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
