'use client';

import React from 'react';
import { X } from 'lucide-react';
import '../css/comingsoon.css';

const ComingSoonModal = ({ isOpen, onClose, onJoinWaitList }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleJoinWaitList = () => {
    onClose();
    if (onJoinWaitList) {
      onJoinWaitList();
    }
  };

  return (
    <div className="coming-soon-modal-overlay" onClick={handleOverlayClick}>
      <div className="coming-soon-modal-content">
        <button onClick={onClose} className="coming-soon-close-button">
          <X size={20} />
        </button>

        <div className="coming-soon-icon">🚀</div>

        <h2 className="coming-soon-title">Pay per conversion</h2>

        <p className="coming-soon-message">
          Stop wasting money on fake or low-quality leads. 
          Our performance-based Lead Generation Service ensures you pay only when a customer converts, 
          helping your business grow smarter and faster.
        </p>


        <button className="coming-soon-cta-button" onClick={handleJoinWaitList}>
          Join the Wait List
        </button>
      </div>
    </div>
  );
};

export default ComingSoonModal;
