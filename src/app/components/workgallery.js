'use client';

import React, { useState, useEffect, useRef } from 'react';
import '../css/workgallery.css';

const WorkGallery = ({
  title = "Our Work",
  subtitle = "Delivering exceptional results for our clients",
  projects = [],
  showPill = false,
  pillText = "Solutions",
  showCTA = false,
  ctaButtonText = "Get Started",
  onCtaClick
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const autoRotateRef = useRef(null);

  // Extract YouTube video ID from URL (supports regular videos and Shorts)
  const getYouTubeVideoId = (url) => {
    if (!url) return null;

    // Handle shorts URLs - extract video ID (11 chars) before any ? or & parameters
    if (url.includes('/shorts/')) {
      const shortsMatch = url.match(/\/shorts\/([a-zA-Z0-9_\-]+)/);
      if (shortsMatch && shortsMatch[1]) {
        // Return first 11 characters (standard YouTube video ID length)
        return shortsMatch[1].substring(0, 11);
      }
    }

    // Handle regular YouTube URLs
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2] && match[2].length === 11) ? match[2] : null;
  };

  // Default projects if none provided
  const defaultProjects = [
    {
      id: 1,
      title: "Car Detailing Website",
      image: "/ourwork/Rectangle.svg",
      category: "Web Development"
    },
    {
      id: 2,
      title: "Business Management App",
      image: "/ourwork/mobilehome.svg",
      category: "Mobile Development"
    },

   {
      id: 3,
      title: "Ridesharing App",
      image: "/ourwork/ridesharingapp.png",
      category: "Mobile Development"
    },


    {
      id: 4,
      title: "Chat App",
      image: "/ourwork/chatapp.png",
      category: "Mobile Development"
    },
    {
      id: 5,
      title: "Limousine Website",
      image: "/ourwork/limousines.png",
      category: "Web Development"
    },
    {
      id: 6,
      title: "AI Agent Handling Escalations",
      image: "/ourwork/aiagent.svg",
      category: "AI Solutions"
    },


    {
      id: 7,
      title: "Driving School Website",
      image: "/ourwork/auslink.png",
      category: "Web Development"
    }


  ];

  const displayProjects = projects.length > 0 ? projects : defaultProjects;

  // Auto-rotation effect
  useEffect(() => {
    if (isAutoRotating) {
      autoRotateRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % displayProjects.length);
      }, 3000);
    }

    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    };
  }, [isAutoRotating, displayProjects.length]);

  const handlePrev = () => {
    setIsAutoRotating(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? displayProjects.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setIsAutoRotating(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % displayProjects.length);
  };

  const handleProjectClick = (index) => {
    setIsAutoRotating(false);
    setCurrentIndex(index);

    // If it's a video, open modal
    const project = displayProjects[index];
    if (project.type === 'video' && project.videoUrl) {
      setSelectedVideo(project.videoUrl);
      setVideoModalOpen(true);
    }
  };

  const closeVideoModal = () => {
    setVideoModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <section className="work-gallery-section">
      <div className="work-gallery-container">
        {/* Header */}
        <div className="work-gallery-header">
          {showPill && <span className="work-gallery-pill">{pillText}</span>}
          <h2 className="work-gallery-title">{title}</h2>
          <p className="work-gallery-subtitle">{subtitle}</p>
        </div>

        {/* 3D Rotating Gallery */}
        <div className="carousel-wrapper">
          <div className="carousel-container">
            <div
              className="carousel"
              style={{
                transform: `rotateY(${-currentIndex * (360 / displayProjects.length)}deg)`
              }}
            >
              {displayProjects.map((project, index) => {
                const angle = (360 / displayProjects.length) * index;
                // Adjust radius based on number of items for better visibility
                const radius = displayProjects.length <= 3 ? 600 :
                               displayProjects.length === 4 ? 450 :
                               400;

                return (
                  <div
                    key={project.id}
                    className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
                    style={{
                      transform: `rotateY(${angle}deg) translateZ(${radius}px)`
                    }}
                    onClick={() => handleProjectClick(index)}
                  >
                    <div className="project-card">
                      <div className="project-image-wrapper">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="project-image"
                        />
                        {project.type === 'video' && (
                          <div className="video-play-overlay">
                            <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
                              <circle cx="32" cy="32" r="32" fill="rgba(255, 255, 255, 0.9)"/>
                              <path d="M26 20L44 32L26 44V20Z" fill="#1A0C4F"/>
                            </svg>
                          </div>
                        )}
                        <div className="project-overlay">
                          <div className="project-info">
                            <span className="project-category">{project.category}</span>
                            <h3 className="project-title">{project.title}</h3>
                            {project.type === 'video' && <span className="video-badge">▶ Watch Demo</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button className="nav-btn prev-btn" onClick={handlePrev}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="nav-btn next-btn" onClick={handleNext}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Project Indicators */}
        <div className="project-indicators">
          {displayProjects.map((project, index) => (
            <button
              key={project.id}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleProjectClick(index)}
              aria-label={`Go to ${project.title}`}
            />
          ))}
        </div>

        {/* Current Project Info */}
        <div className="current-project-info">
          <span className="current-category">{displayProjects[currentIndex].category}</span>
          <h3 className="current-title">{displayProjects[currentIndex].title}</h3>
        </div>

        {/* CTA Button */}
        {showCTA && onCtaClick && (
          <div className="work-gallery-cta">
            <button className="work-gallery-cta-button" onClick={onCtaClick}>
              {ctaButtonText}
            </button>
          </div>
        )}
      </div>

      {/* Video Modal */}
      {videoModalOpen && selectedVideo && (
        <div className="video-modal-overlay" onClick={closeVideoModal}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close" onClick={closeVideoModal}>
              ✕
            </button>
            <div className="video-container">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(selectedVideo)}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WorkGallery;
