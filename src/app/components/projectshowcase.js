'use client';

import React from 'react';
import '../css/projectshowcase.css';

const ProjectShowcase = ({
  pillText = "My Projects",
  title = "Featured Work",
  projects = []
}) => {
  // Default projects if none provided
  const defaultProjects = [
    {
      id: 1,
      videoUrl: "/videos/project1.mp4",
      title: "AI Chat Agent",
      description: "Built an intelligent customer support chatbot that reduced response time by 80%."
    },
    {
      id: 2,
      videoUrl: "/videos/project2.mp4",
      title: "E-commerce Platform",
      description: "Full-stack marketplace with payment integration and real-time inventory."
    },
    {
      id: 3,
      videoUrl: "/videos/project3.mp4",
      title: "Mobile App",
      description: "Cross-platform mobile application with 50k+ downloads."
    }
  ];

  const displayProjects = projects.length > 0 ? projects : defaultProjects;

  return (
    <section className="project-showcase-section">
      <div className="project-showcase-container">
        {/* Header */}
        <div className="project-showcase-header">
          <span className="project-showcase-pill">{pillText}</span>
          <h2 className="project-showcase-title">{title}</h2>
        </div>

        {/* Projects Grid */}
        <div className="project-showcase-grid">
          {displayProjects.map((project) => (
            <div key={project.id} className="showcase-card">
              {/* Video */}
              <div className="project-video-wrapper">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="project-video"
                >
                  <source src={project.videoUrl} type="video/mp4" />
                </video>
              </div>

              {/* Content */}
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
              </div>

              {/* Actions */}
              <div className="project-actions">
                <button className="action-btn">
                  <svg viewBox="0 0 24 24" className="action-icon">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  Like
                </button>
                <button className="action-btn">
                  <svg viewBox="0 0 24 24" className="action-icon">
                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
                  </svg>
                  Share
                </button>
                <button className="action-btn">
                  <svg viewBox="0 0 24 24" className="action-icon">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                  </svg>
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="project-showcase-footer">
          <button className="view-all-btn">View All Projects</button>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
