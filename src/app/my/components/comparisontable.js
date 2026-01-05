'use client';

import React from 'react';
import '../css/comparisontable.css';

const ComparisonTable = ({
  headers = ['Feature', 'Mayvk', 'Others'],
  rows = [],
  highlightColumn = 1, // Index of column to highlight (0-based)
  showCheckmarks = true,
  customStyles = {}
}) => {

  // Helper function to render cell content
  const renderCellContent = (content) => {
    // Check if content is boolean for checkmark/cross display
    if (typeof content === 'boolean' && showCheckmarks) {
      return content ? (
        <span className="check-mark">✓</span>
      ) : (
        <span className="cross-mark">✗</span>
      );
    }

    // Check if content is an object with custom rendering
    if (content && typeof content === 'object' && content.type) {
      switch (content.type) {
        case 'check':
          return <span className="check-mark">✓</span>;
        case 'cross':
          return <span className="cross-mark">✗</span>;
        case 'badge':
          return <span className="table-badge" style={content.style}>{content.text}</span>;
        default:
          return content.text || '';
      }
    }

    // Default text content
    return content;
  };

  return (
    <div className="comparison-table-wrapper" style={customStyles}>
      <table className="comparison-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className={`table-header ${index === highlightColumn ? 'highlighted' : ''}`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="table-row">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`table-cell ${cellIndex === highlightColumn ? 'highlighted' : ''} ${cellIndex === 0 ? 'feature-cell' : ''}`}
                >
                  {renderCellContent(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;