'use client';

import React from 'react';
import ComparisonTable from './comparisontable';
import '../css/comparison.css';

const Comparison = ({
  showCTA = false,
  onCTAClick,
  pillText = "Tech Stack",
  title = "Technologies I Work With",
  subtitle = "Modern tools and frameworks to build scalable, high-performance solutions."
}) => {
  // Tech Stack table headers
  const techStackHeaders = ['Category', 'Technologies'];

  const techStackRows = [
    ['Frontend', 'React, Next.js, Vue.js, TypeScript, Tailwind CSS'],
    ['Backend', 'Node.js, Python, Express, FastAPI, Django'],
    ['AI / ML', 'OpenAI, LangChain, TensorFlow, PyTorch, Hugging Face'],
    ['Databases', 'PostgreSQL, MongoDB, Redis, Firebase, Supabase'],
    ['Cloud & DevOps', 'AWS, Google Cloud, Vercel, Docker, CI/CD'],
    ['Mobile', 'React Native, Flutter, iOS, Android'],
    ['Payments', 'Stripe, PayPal, Square, Afterpay'],
    ['APIs & Integrations', 'REST, GraphQL, WebSockets, Third-party APIs'],
  ];

  return (
    <section className="comparison-section">
      <div className="comparison-container">
        <div className="comparison-header">
          <span className="section-pill">{pillText}</span>
          <h2 className="comparison-title">{title}</h2>
          <p className="comparison-subtitle">
            {subtitle}
          </p>
        </div>

        <div className="comparison-block">
          <ComparisonTable
            headers={techStackHeaders}
            rows={techStackRows}
            highlightColumn={0}
            showCheckmarks={false}
          />
        </div>

        {showCTA && (
          <div className="comparison-cta-wrapper">
            <button className="cta-button" onClick={onCTAClick}>
              Schedule a Consultation
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Comparison;