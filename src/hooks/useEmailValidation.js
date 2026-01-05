/**
 * React Hook for Email Validation
 * Provides real-time email validation with debouncing
 */

import { useState, useEffect, useCallback } from 'react';
import { validateEmail, validateEmailBasic, validateEmailStrict } from '../utils/emailValidator';

export function useEmailValidation(email, options = {}) {
  const {
    validationMode = 'standard', // 'basic', 'standard', 'strict'
    debounceMs = 300,
    validateOnChange = true
  } = options;

  const [validation, setValidation] = useState({
    isValid: true,
    error: null,
    message: '',
    qualityScore: 100,
    isValidating: false
  });

  const validateEmailAsync = useCallback((emailValue) => {
    if (!emailValue || !emailValue.trim()) {
      setValidation({
        isValid: false,
        error: 'REQUIRED',
        message: 'Email is required.',
        qualityScore: 0,
        isValidating: false
      });
      return;
    }

    setValidation(prev => ({ ...prev, isValidating: true }));

    // Choose validation function based on mode
    let validationFn;
    switch (validationMode) {
      case 'basic':
        validationFn = validateEmailBasic;
        break;
      case 'strict':
        validationFn = validateEmailStrict;
        break;
      default:
        validationFn = validateEmail;
    }

    const result = validationFn(emailValue.trim());
    
    setValidation({
      isValid: result.isValid,
      error: result.error || null,
      message: result.message,
      qualityScore: result.qualityScore || 0,
      isValidating: false
    });
  }, [validationMode]);

  useEffect(() => {
    if (!validateOnChange || !email) return;

    const timeoutId = setTimeout(() => {
      validateEmailAsync(email);
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [email, validateEmailAsync, debounceMs, validateOnChange]);

  const validateNow = useCallback(() => {
    validateEmailAsync(email);
  }, [email, validateEmailAsync]);

  const clearValidation = useCallback(() => {
    setValidation({
      isValid: true,
      error: null,
      message: '',
      qualityScore: 100,
      isValidating: false
    });
  }, []);

  return {
    ...validation,
    validateNow,
    clearValidation,
    // Helper methods
    hasError: !validation.isValid && validation.error !== null,
    isRequired: validation.error === 'REQUIRED',
    isFakeEmail: validation.error === 'FAKE_EMAIL',
    isDisposableEmail: validation.error === 'DISPOSABLE_EMAIL',
    isSuspiciousDomain: validation.error === 'SUSPICIOUS_DOMAIN',
    isLowQuality: validation.error === 'LOW_QUALITY',
    isInvalidFormat: validation.error === 'INVALID_FORMAT'
  };
}

// Specialized hooks for different use cases
export function useEmailValidationBasic(email, options = {}) {
  return useEmailValidation(email, { ...options, validationMode: 'basic' });
}

export function useEmailValidationStrict(email, options = {}) {
  return useEmailValidation(email, { ...options, validationMode: 'strict' });
}