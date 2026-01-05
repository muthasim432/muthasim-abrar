'use client';

import React from 'react';
import '../css/valuecurvegraph.css';

/**
 * Value Curve Graph Component
 * Compares different solutions across multiple value factors
 * Reusable with custom data
 */
const ValueCurveGraph = ({
  title = "Value Comparison",
  subtitle = "See how we stack up against the competition",
  description = "",
  showPill = false,
  pillText = "Compare",
  factors = ["Quality", "Price", "Conversion Rate", "Customer Support"],
  solutions = [
    {
      name: "Mayvk",
      color: "#1A0C4F",
      values: [90, 95, 85, 90],
      labels: ["Premium Quality", "Best Value", "High Converting", "24/7 Support"]
    },
    {
      name: "Website Builders",
      color: "#FF8A65",
      values: [40, 60, 50, 30],
      labels: ["Basic Quality", "Mid Range", "Average Rate", "Limited Support"]
    },
    {
      name: "Agency Service",
      color: "#FF69B4",
      values: [70, 20, 60, 50],
      labels: ["Good Quality", "Very Expensive", "Good Rate", "Standard Support"]
    }
  ],
  lineWidth = 0.3,
  pointSize = 1.2
}) => {
  // Calculate graph dimensions
  const maxValue = 100;
  const minValue = 0;

  // Calculate position for each point
  const getYPosition = (value) => {
    const percentage = ((maxValue - value) / (maxValue - minValue)) * 100;
    return percentage;
  };

  const getXPosition = (index, total) => {
    const margin = 2.5; // 2.5% margin on each side for SVG points
    return margin + (index / (total - 1)) * (100 - 2 * margin);
  };

  const getXPositionForLabel = (index, total) => {
    const margin = 5; // 5% margin on each side for labels
    return margin + (index / (total - 1)) * (100 - 2 * margin);
  };

  return (
    <section className="value-curve-section">
      <div className="value-curve-container">
        {/* Header */}
        <div className="value-curve-header">
          {showPill && <span className="value-curve-pill">{pillText}</span>}
          <h2 className="value-curve-title">{title}</h2>
          <p className="value-curve-subtitle">{subtitle}</p>
        </div>

        {/* Legend */}
        <div className="value-curve-legend">
          {solutions.map((solution, index) => (
            <div key={index} className="legend-item">
              <span
                className="legend-color"
                style={{ backgroundColor: solution.color }}
              ></span>
              <span className="legend-name">{solution.name}</span>
            </div>
          ))}
        </div>

        {/* Graph Container */}
        <div className="graph-wrapper">
          <div className="graph-main-row">
            {/* Y-axis labels */}
            <div className="y-axis">
              <span className="y-label">High</span>
              <span className="y-label">Low</span>
            </div>

            {/* Main Graph */}
            <div className="graph-container">
            {/* Grid lines */}
            <div className="graph-grid">
              <div className="grid-line horizontal" style={{ top: '0%' }}></div>
              <div className="grid-line horizontal" style={{ top: '25%' }}></div>
              <div className="grid-line horizontal" style={{ top: '50%' }}></div>
              <div className="grid-line horizontal" style={{ top: '75%' }}></div>
              <div className="grid-line horizontal" style={{ top: '100%' }}></div>
            </div>

            {/* SVG for lines */}
            <svg className="graph-svg" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ aspectRatio: 'auto' }}>
              {solutions.map((solution, sIndex) => {
                const points = solution.values.map((value, fIndex) => {
                  const x = getXPosition(fIndex, factors.length);
                  const y = getYPosition(value);
                  return `${x},${y}`;
                }).join(' ');

                return (
                  <polyline
                    key={sIndex}
                    points={points}
                    fill="none"
                    stroke={solution.color}
                    strokeWidth={lineWidth}
                    className="value-line"
                  />
                );
              })}

              {/* Data points */}
              {solutions.map((solution, sIndex) =>
                solution.values.map((value, fIndex) => {
                  const x = getXPosition(fIndex, factors.length);
                  const y = getYPosition(value);

                  return (
                    <ellipse
                      key={`${sIndex}-${fIndex}`}
                      cx={x}
                      cy={y}
                      rx={pointSize * 0.3}
                      ry={pointSize}
                      fill={solution.color}
                      className="value-point"
                    />
                  );
                })
              )}
            </svg>
            </div>
          </div>

          {/* X-axis labels */}
          <div className="x-axis">
            {factors.map((factor, index) => (
              <div
                key={index}
                className="x-label"
                style={{ left: `${getXPositionForLabel(index, factors.length)}%` }}
              >
                {factor}
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        {description && (
          <div className="value-curve-description">
            <p className="description-text">{description}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ValueCurveGraph;
