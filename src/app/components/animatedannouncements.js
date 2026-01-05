'use client';

import React, { useState, useEffect } from 'react';
import '../css/animatedannouncements.css';

const AnimatedAnnouncements = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const announcements = [
    {
      id: 1,
      badge: 'OPEN',
      text: 'Available for hire - Full Time',
      color: '#4CAF50'
    },
    {
      id: 2,
      badge: 'SKILL',
      text: 'React, Next.js, Node.js Expert',
      color: '#7B61FF'
    },
    {
      id: 3,
      badge: 'NEW',
      text: 'AI & Machine Learning Projects',
      color: '#FF8A65'
    },
    {
      id: 4,
      badge: 'BUILT',
      text: '10+ Production Applications',
      color: '#2196F3'
    },
    {
      id: 5,
      badge: 'CS',
      text: 'Computer Science Graduate',
      color: '#9B59B6'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 3500); // Change every 3.5 seconds

    return () => clearInterval(interval);
  }, [announcements.length]);

  const currentItem = announcements[currentIndex];

  return (
    <div className="announcements-container">
      <div className="announcements-track">
        <div
          key={currentIndex}
          className="announcement-item"
        >
          <div className="announcement-badge-item">
            <span className="announcement-badge" style={{ background: currentItem.color }}>
              {currentItem.badge}
            </span>
            <span className="announcement-text" style={{ color: currentItem.color }}>
              {currentItem.text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedAnnouncements;