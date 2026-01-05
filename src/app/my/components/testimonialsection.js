'use client';

import React from 'react';
import '../css/testimonialsection.css';

const TestimonialSection = ({
  title = "What People Are Saying",
  subtitle = "Don't just take my word for it. Here's what clients and colleagues have to say about working with me. Real feedback from real projects."
}) => {
  return (
    <section className="testimonial-section">
      <div className="testimonial-container">
        <div className="testimonial-content">
          <h2 className="testimonial-title">{title}</h2>
          <p className="testimonial-subtitle">
            {subtitle}
          </p>
          <div className="testimonial-buttons">
            <button className="testimonial-btn primary">View My Work</button>
            <button className="testimonial-btn secondary">Get In Touch</button>
          </div>
        </div>
        <div className="testimonial-video-wrapper">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="testimonial-video"
          >
            <source src="/videos/testimonial-intro.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
