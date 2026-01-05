"use client";
import React from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";

const SuccessModal = ({ isOpen, onClose, title, message, isError = false }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="success-modal-overlay" onClick={handleOverlayClick}>
      <div className="success-modal-content">
        <button onClick={onClose} className="success-modal-close-btn">
          <X size={18} />
        </button>

        <div className="success-modal-icon">
          {isError ? <AlertCircle size={64} /> : <CheckCircle size={64} />}
        </div>

        <div className="success-modal-header">
          <h2>{title || "Success!"}</h2>
          <p>{message || "Your request has been submitted successfully."}</p>
        </div>

        <div className="success-modal-actions">
          <button onClick={onClose} className="success-modal-button">
            Continue
          </button>
        </div>
      </div>

      <style jsx>{`
        .success-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }

        .success-modal-content {
          background-color: white;
          border-radius: 16px;
          padding: 32px 24px 24px;
          width: 90%;
          max-width: 400px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          position: relative;
          text-align: center;
        }

        .success-modal-close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          background: transparent;
          border: none;
          font-size: 18px;
          color: #666;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          transition: all 0.2s ease;
        }

        .success-modal-close-btn:hover {
          background-color: #f5f5f5;
          color: #333;
        }

        .success-modal-icon {
          font-size: 64px;
          color: ${isError ? '#EF4444' : '#10B981'};
          margin-bottom: 20px;
        }

        .success-modal-header h2 {
          font-size: 20px;
          font-weight: bold;
          color: #1a0c4f;
          margin: 0 0 12px 0;
          line-height: 1.2;
        }

        .success-modal-header p {
          font-size: 16px;
          color: #333;
          margin: 0 0 24px 0;
          line-height: 1.4;
        }

        .success-modal-actions {
          display: flex;
          justify-content: center;
        }

        .success-modal-button {
          background-color: #1a0c4f;
          color: white;
          border: none;
          padding: 12px 32px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s ease;
          min-width: 120px;
        }

        .success-modal-button:hover {
          background-color: #2a1c5f;
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
};

export default SuccessModal;