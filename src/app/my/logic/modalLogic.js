'use client';

import { useState } from 'react';
import { validateEmail } from '../../../utils/emailValidator';

/**
 * Custom hook for managing modal state and data
 * Can be reused across different components that need modal functionality
 */
export const useModalLogic = (initialData = {}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(initialData);

  const openModal = (data = {}) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Reset data after a brief delay to avoid UI flicker
    setTimeout(() => {
      setModalData(initialData);
    }, 300);
  };

  const updateModalData = (newData) => {
    setModalData(prev => ({ ...prev, ...newData }));
  };

  return {
    isModalOpen,
    modalData,
    openModal,
    closeModal,
    updateModalData
  };
};

/**
 * Handle demo signup modal specific logic
 */
export const handleDemoSignupFromHero = (email, openModal, selectedServices = []) => {
  // Since we're doing real-time validation in the UI,
  // we can trust that the email is valid when this is called
  if (!email) return false;

  // Open modal with pre-filled email and selected services
  openModal({ email, selectedServices });
  return true;
};

/**
 * Common validation utilities
 */
export const validatePhone = (phone) => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone);
};

/**
 * Common modal utilities
 */
export const preventScrollWhenModalOpen = (isOpen) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }
};