'use client';

import React from 'react';
import '../css/problemsection.css';

/**
 * Problem Section Component
 * Shows what's costing users with current solutions
 * Reusable with custom content
 */
const ProblemSection = ({
  mainHeading = "Why current solutions?",
  subtitle = "Because you need better options",
  problems = [
    {
      icon: "💸",
      title: "High Costs",
      description: "Traditional solutions charge premium prices for basic features."
    },
    {
      icon: "🔒",
      title: "Limited Features",
      description: "You're locked into templates that don't fit your needs."
    },
    {
      icon: "⏰",
      title: "Time Consuming",
      description: "Complex systems that take forever to set up and manage."
    }
  ]
}) => {
  return (
    <section className="problem-section">
      <div className="problem-container">
        {/* Main Heading */}
        <h2 className="problem-main-heading">{mainHeading}</h2>

        {/* Subtitle */}
        <p
          className="problem-subtitle"
          dangerouslySetInnerHTML={{ __html: subtitle }}
        />

        {/* Problems Grid */}
        <div className="problems-grid">
          {problems.map((problem, index) => (
            <div key={index} className="problem-card">
              <div className="problem-icon-wrapper">
                <div className="problem-icon">{problem.icon}</div>
              </div>
              <h3 className="problem-title">{problem.title}</h3>
              <p className="problem-description">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
