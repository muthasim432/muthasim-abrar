"use client";
import React, { useState, useEffect } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import services from "../data/services";
import { MetaEvents } from "../../../ads-pixel"; // Import Meta Pixel tracking
import "../../../css/demosignup.css"; // Import the CSS file

const DemoSignupModal = ({ isOpen, onClose, onSubmit, initialEmail = "", initialSelectedServices = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    businessName: "",
    visitorName: "",
    role: "",
    services: initialSelectedServices,
    email: initialEmail,
    phone: "",
    primaryChallenge: "",
  });
  const [countryCode, setCountryCode] = useState("US|+1");
  const [countryList, setCountryList] = useState([]);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  // Update email when initialEmail prop changes
  useEffect(() => {
    if (initialEmail && initialEmail !== formData.email) {
      setFormData(prev => ({ ...prev, email: initialEmail }));
    }
  }, [initialEmail]);

  // Update services when initialSelectedServices prop changes
  useEffect(() => {
    if (initialSelectedServices && initialSelectedServices.length > 0) {
      setFormData(prev => ({ ...prev, services: initialSelectedServices }));
    }
  }, [initialSelectedServices]);

  // Fetch countries for phone code dropdown
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const api_url = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${api_url}/api/shared/get-stripe-supported-phone-countries`);
        const data = await response.json();
        const formattedCountries = data.countries.map((country) => ({
          label: `${country.countryCode} (${country.phoneCode})`,
          value: `${country.countryCode}|${country.phoneCode}`,
        }));
        setCountryList(formattedCountries);
      } catch (error) {
        console.error("Error fetching country list:", error);
      }
    };
    fetchCountries();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isCountryDropdownOpen && !event.target.closest('.demo-custom-dropdown')) {
        setIsCountryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCountryDropdownOpen]);


  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleServiceToggle = (serviceValue) => {
    setFormData((prev) => {
      const services = prev.services.includes(serviceValue)
        ? prev.services.filter(s => s !== serviceValue)
        : [...prev.services, serviceValue];
      return { ...prev, services };
    });
  };

  const handleNext = () => {
    if (currentSlide < 2) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    // Basic client-side checks only (required fields)
    if (!formData.email.trim()) {
      if (onSubmit) {
        onSubmit({
          success: false,
          title: "Validation Error",
          message: "Email address is required."
        });
      } else {
        alert("Email address is required.");
      }
      return;
    }

    // Validate country code
    if (!countryCode || !countryCode.includes('|')) {
      if (onSubmit) {
        onSubmit({
          success: false,
          title: "Validation Error",
          message: "Please select a country code for your phone number."
        });
      } else {
        alert("Please select a country code for your phone number.");
      }
      return;
    }

    const fullPhoneNumber = `${countryCode.split('|')[1]}${formData.phone}`;
    const finalFormData = { ...formData, phone: fullPhoneNumber };

    console.log("Submitting form data:", finalFormData);
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

    try {
      const api_url = process.env.NEXT_PUBLIC_API_URL;
      console.log("Making API call to:", `${api_url}/api/shared/demo-signup`);
      
      const response = await fetch(`${api_url}/api/shared/demo-signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalFormData),
      });

      console.log("Response status:", response.status);
      const result = await response.json();
      console.log("Response data:", result);

      if (result.success) {
        // Track successful demo signup as Lead event for Meta Pixel
        MetaEvents.generateLead({
          serviceName: 'Demo Signup',
          serviceCategory: formData.services.join(', '),
          value: 29.99, // Your monthly price
          currency: 'AUD'
        });

        if (onSubmit) {
          onSubmit({
            success: true,
            title: "Thank You!",
            message: "We'll contact you soon based on the authenticity of your submitted details to start your free trial."
          });
        } else {
          alert("Thank you for signing up! We'll contact you soon based on the authenticity of your submitted details to start your free trial.");
        }
        onClose();
      } else {
        if (onSubmit) {
          onSubmit({
            success: false,
            title: "Error",
            message: result.message || "Something went wrong. Please try again."
          });
        } else {
          alert(result.message || "Something went wrong. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error submitting demo signup:", error);
      if (onSubmit) {
        onSubmit({
          success: false,
          title: "Error",
          message: "Something went wrong. Please try again."
        });
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  const isSlide1Valid = formData.businessName.trim() && formData.visitorName.trim() && formData.role.trim() && formData.services.length > 0;
  const isSlide2Valid = formData.email.trim() && formData.phone.trim() && countryCode && countryCode.includes('|');
  const isSlide3Valid = formData.primaryChallenge.trim();

  return (
    <div className="demo-signup-modal-overlay" onClick={handleOverlayClick}>
      <div className="demo-signup-modal-content">
        <button onClick={onClose} className="demo-close-button">
          <FaTimes />
        </button>

        <header className="demo-header">
          <h2>Start Your Free Trial</h2>
          <p>Get started in just 3 simple steps</p>
        </header>

        <div className="demo-progress-indicator">
          {[0, 1, 2].map((step) => (
            <div
              key={step}
              className={`demo-progress-step ${
                step <= currentSlide ? "demo-progress-step-active" : ""
              }`}
            />
          ))}
        </div>

        <h3 className="demo-step-title">
          {currentSlide === 0
            ? "Tell us about your business"
            : currentSlide === 1
            ? "How can we reach you?"
            : "Tell us about your needs"}
        </h3>

        <div className="demo-slide-content">
          {currentSlide === 0 && (
            <div className="demo-form">
              <div className="demo-form-field">
                <label>Business Name *</label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange("businessName", e.target.value)}
                  placeholder="Enter your business name"
                  className="demo-form-input"
                />
              </div>

              <div className="demo-form-field">
                <label>Your Name *</label>
                <input
                  type="text"
                  value={formData.visitorName}
                  onChange={(e) => handleInputChange("visitorName", e.target.value)}
                  placeholder="Enter your full name"
                  className="demo-form-input"
                />
              </div>

              <div className="demo-form-field">
                <label>Your Role in the Business *</label>
                <select
                  value={formData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  className="demo-form-select"
                >
                  <option value="">Select your role</option>
                  <option value="Owner">Owner</option>
                  <option value="Manager">Manager</option>
                  <option value="Marketing Manager">Marketing Manager</option>
                  <option value="Operations Manager">Operations Manager</option>
                  <option value="Staff Member">Staff Member</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="demo-form-field">
                <label>Services Interested In * (Select all that apply)</label>
                <div className="demo-services-checkbox-group">
                  {services.map((service) => (
                    <label key={service.value} className="demo-checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.services.includes(service.value)}
                        onChange={() => handleServiceToggle(service.value)}
                        className="demo-checkbox-input"
                      />
                      <span className="demo-checkbox-text">{service.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentSlide === 1 && (
            <div className="demo-contact-form">
              <div className="demo-form-field">
                <label>Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email address"
                  className="demo-form-input"
                />
              </div>

              <div className="demo-form-field">
                <label>Phone Number *</label>
                <div className="demo-phone-row">
                  <div className="demo-custom-dropdown">
                    <div 
                      className="demo-custom-select"
                      onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                    >
                      <span className="demo-select-value">
                        {countryCode ? 
                          countryList.find(c => c.value === countryCode)?.label || "Select" 
                          : "Select"}
                      </span>
                      <span className="demo-select-arrow">▼</span>
                    </div>
                    {isCountryDropdownOpen && (
                      <div className="demo-dropdown-options">
                        <div 
                          className="demo-dropdown-option"
                          onClick={() => {
                            setCountryCode("");
                            setIsCountryDropdownOpen(false);
                          }}
                        >
                          Select Country
                        </div>
                        {countryList.length > 0 ? (
                          countryList.map((country) => (
                            <div
                              key={country.value}
                              className="demo-dropdown-option"
                              onClick={() => {
                                setCountryCode(country.value);
                                setIsCountryDropdownOpen(false);
                              }}
                            >
                              {country.label}
                            </div>
                          ))
                        ) : (
                          <div className="demo-dropdown-option">Loading countries...</div>
                        )}
                      </div>
                    )}
                  </div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Phone number"
                    className="demo-phone-input"
                  />
                </div>
              </div>

            </div>
          )}

          {currentSlide === 2 && (
            <div className="demo-description-form">
              <div className="demo-form-field">
                <label>Describe Your Problem *</label>
                <textarea
                  value={formData.primaryChallenge}
                  onChange={(e) => handleInputChange("primaryChallenge", e.target.value)}
                  placeholder="Tell us about your main business challenge and how you think our platform could help..."
                  className="demo-form-textarea"
                  rows="6"
                  maxLength="500"
                />
                <div className="demo-char-count">
                  {formData.primaryChallenge.length}/500 characters
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="demo-action-buttons">
          <button
            onClick={handleBack}
            disabled={currentSlide === 0}
            className="demo-back-button"
          >
            <FaChevronLeft />
            Back
          </button>

          {currentSlide < 2 ? (
            <button
              onClick={handleNext}
              disabled={currentSlide === 0 ? !isSlide1Valid : !isSlide2Valid}
              className="demo-next-button"
            >
              Next
              <FaChevronRight />
            </button>
          ) : (
            <button
              onClick={(e) => {
                console.log("Submit button clicked!");
                console.log("Form validation:", isSlide3Valid);
                console.log("Form data:", formData);
                handleSubmit(e);
              }}
              disabled={!isSlide3Valid}
              className="demo-submit-button"
            >
              Start Free Trial
            </button>
          )}
        </div>

        <p className="demo-footer">
          No credit card required • Cancel anytime • 14-day free trial
        </p>
      </div>
    </div>
  );
};

export default DemoSignupModal;