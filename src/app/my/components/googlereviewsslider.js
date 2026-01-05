'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FaStar, FaGoogle } from 'react-icons/fa';
import '../css/googlereviewsslider.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.REACT_APP_API_URL;
const MAYVK_PROVIDER_ID = process.env.NEXT_PUBLIC_MAYVK_PROVIDER_ID;

const GoogleReviewsSlider = () => {
  const [reviewsData, setReviewsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const autoScrollIntervalRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedReviews, setExpandedReviews] = useState({});

  useEffect(() => {
    if (MAYVK_PROVIDER_ID) {
      fetchGoogleReviews();
    } else {
      setError('Mayvk Provider ID not configured');
      setLoading(false);
    }
  }, []);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    if (!reviewsData?.reviews || reviewsData.reviews.length <= 1) return;

    // Start auto-scroll after component mounts
    autoScrollIntervalRef.current = setInterval(() => {
      if (!scrollContainerRef.current) return;

      const container = scrollContainerRef.current;
      const cardWidth = isMobile ? 280 : 350;
      const gap = isMobile ? 16 : 24;
      const fullCardWidth = cardWidth + gap;

      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % reviewsData.reviews.length;

        container.scrollTo({
          left: nextIndex * fullCardWidth,
          behavior: 'smooth'
        });

        return nextIndex;
      });
    }, 5000); // Auto-scroll every 5 seconds

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [reviewsData, isMobile]);

  const fetchGoogleReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/google/places/reviews/${MAYVK_PROVIDER_ID}`);

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setReviewsData(data);
          setError(null);
        } else {
          setError(data.error || 'No reviews found');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to fetch reviews');
      }
    } catch (err) {
      setError('Failed to load Google reviews');
      console.error('Error fetching Google reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <FaStar key={i} className="star-icon filled" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <FaStar key={i} className="star-icon half-filled" />
        );
      } else {
        stars.push(
          <FaStar key={i} className="star-icon empty" />
        );
      }
    }
    return stars;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const toggleExpanded = (index) => {
    setExpandedReviews(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const isTextLong = (text) => {
    if (!text) return false;
    const textContent = typeof text === 'object' ? text.text : text;
    return textContent && textContent.length > 200;
  };

  const getTruncatedText = (text) => {
    const textContent = typeof text === 'object' ? text.text : text;
    if (!textContent) return '';
    return textContent.substring(0, 200) + '...';
  };

  const getFullText = (text) => {
    return typeof text === 'object' ? text.text : text;
  };

  if (loading) {
    return (
      <section className="google-reviews-slider-section">
        <div className="reviews-slider-container">
          <div className="section-header">
            <span className="section-pill">
              <FaGoogle style={{ marginRight: '6px' }} />
              Google Reviews
            </span>
            <h2 className="section-title">What Our Clients Say</h2>
          </div>
          <div className="reviews-skeleton-horizontal">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton-card-horizontal" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    // Show error in development mode for debugging
    if (process.env.NODE_ENV === 'development') {
      return (
        <section className="google-reviews-slider-section">
          <div className="reviews-slider-container">
            <div style={{
              padding: '40px',
              textAlign: 'center',
              background: '#fff3cd',
              borderRadius: '12px',
              border: '2px solid #ffc107'
            }}>
              <h3 style={{ color: '#856404', marginBottom: '10px' }}>Google Reviews Error (Dev Mode)</h3>
              <p style={{ color: '#856404' }}>{error}</p>
              <p style={{ fontSize: '14px', marginTop: '10px', color: '#666' }}>
                Check: Backend server running? Place ID set in database? API key configured?
              </p>
            </div>
          </div>
        </section>
      );
    }
    return null; // Don't show in production if error
  }

  if (!reviewsData || !reviewsData.reviews || reviewsData.reviews.length === 0) {
    return null; // Don't show anything if there are no reviews
  }

  return (
    <section className="google-reviews-slider-section">
      <div className="reviews-slider-container">
        {/* Reviews Slider */}
        <div className={`horizontal-scroll-container ${isMobile ? 'mobile' : ''}`} ref={scrollContainerRef}>
          <div className="horizontal-reviews-grid">
            {reviewsData.reviews.map((review, index) => (
              <div key={index} className="horizontal-review-card">
                {/* Google Icon */}
                <div className="google-badge">
                  <svg width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    <path fill="none" d="M0 0h48v48H0z"/>
                  </svg>
                </div>

                {/* Reviewer Info */}
                <div className="reviewer-info">
                  <div className="reviewer-photo-wrapper">
                    {(review.profile_photo_url || review.authorAttribution?.photoUri) ? (
                      <>
                        <img
                          src={review.profile_photo_url || review.authorAttribution?.photoUri}
                          alt={review.author_name || review.authorAttribution?.displayName}
                          className="reviewer-photo"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            const placeholder = e.target.parentElement.querySelector('.reviewer-photo-placeholder');
                            if (placeholder) placeholder.style.display = 'flex';
                          }}
                        />
                        <div className="reviewer-photo-placeholder" style={{ display: 'none' }}>
                          {(review.author_name || review.authorAttribution?.displayName || 'A').charAt(0).toUpperCase()}
                        </div>
                      </>
                    ) : (
                      <div className="reviewer-photo-placeholder">
                        {(review.author_name || review.authorAttribution?.displayName || 'A').charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="reviewer-details">
                    <div className="reviewer-name">
                      {review.author_name || review.authorAttribution?.displayName || 'Anonymous'}
                    </div>
                    <div className="review-date">
                      {review.time ? formatDate(review.time) : (review.publishTime ? new Date(review.publishTime).toLocaleDateString() : 'Recent')}
                    </div>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="review-rating">
                  {renderStars(review.rating)}
                </div>

                {/* Review Text */}
                {(review.text || review.originalText) && (
                  <div className="review-text-container">
                    <div className="review-text">
                      {expandedReviews[index] || !isTextLong(review.text || review.originalText)
                        ? getFullText(review.text || review.originalText)
                        : getTruncatedText(review.text || review.originalText)
                      }
                    </div>
                    {isTextLong(review.text || review.originalText) && (
                      <button
                        className="read-more-btn"
                        onClick={() => toggleExpanded(index)}
                      >
                        {expandedReviews[index] ? 'Show less' : 'Read more'}
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviewsSlider;
