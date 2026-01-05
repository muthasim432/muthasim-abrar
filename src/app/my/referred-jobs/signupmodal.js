"use client";
import React, { useState, useEffect } from "react";

// Utility function to get full phone number (same as original page)
const getFullPhoneNumber = (countryCombo, phone) => {
  if (!countryCombo) return phone ? phone.replace(/\D/g, "") : "";

  const split = countryCombo.split("|");
  const phoneCode = split.length > 1 ? split[1] : split[0]; // e.g. "+61"

  let number = (phone || "")
    .replace(/[^0-9+]/g, "")       // Keep only digits and "+"
    .replace(/^(\+)?0+/, "");      // Remove leading zeroes (and optional "+")
  
  // Remove country code from input if already present
  if (number.startsWith(phoneCode.replace("+", ""))) {
    number = number.slice(phoneCode.length - 1);
  }
  if (number.startsWith(phoneCode)) {
    number = number.slice(phoneCode.length);
  }
  // Remove leading zero again after strip
  if (number.startsWith("0")) {
    number = number.slice(1);
  }

  return `${phoneCode}${number}`;
};

const SignupModal = ({ 
  onClose, 
  referrerId, 
  jobId, 
  jobDetails, 
  referrerDetails 
}) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSending, setOtpSending] = useState(false);
  const [formData, setFormData] = useState({
    referrerId: referrerId,
    jobId: jobId,
    name: "",
    phoneNumber: "",
    phoneCountryCode: "", // Will be set when country list loads
    businessName: "",
    businessNumber: "",
    businessCategory: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    countryCode: "AU",
  });

  const [stripeCountries, setStripeCountries] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [serviceCategories, setServiceCategories] = useState([]);

  const api_url = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch stripe supported countries
        const stripeRes = await fetch(`${api_url}/api/shared/stripe-supported-countries`);
        const stripeData = await stripeRes.json();
        setStripeCountries(stripeData.countries.map((c) => c.toLowerCase()));

        // Fetch phone countries for dropdown
        const phoneRes = await fetch(`${api_url}/api/shared/get-stripe-supported-phone-countries`);
        const phoneData = await phoneRes.json();
        const formattedCountries = phoneData.countries?.map((country) => ({
          label: `${country.countryCode} (${country.phoneCode})`,
          value: `${country.countryCode}|${country.phoneCode}`,
          countryCode: country.countryCode,
          phoneCode: country.phoneCode,
        })) || [];
        setCountryList(formattedCountries);
        
        // Set default country code (find AU or first available)
        const defaultCountry = formattedCountries.find(c => c.countryCode === "AU") || formattedCountries[0];
        if (defaultCountry && !formData.phoneCountryCode) {
          setFormData(prev => ({ ...prev, phoneCountryCode: defaultCountry.value }));
        }

        // Fetch service categories for business category dropdown
        const servicesRes = await fetch(`${api_url}/api/shared/category`);
        const servicesData = await servicesRes.json();
        setServiceCategories(servicesData || []);
      } catch (err) {
        console.error("Failed to fetch initial data:", err);
        setCountryList([{ phoneCode: "+61", countryCode: "AU" }]);
      }
    };
    fetchData();
  }, [api_url]);

  // Effect to handle service name matching after both job details and service categories are loaded
  useEffect(() => {
    if (jobDetails && jobDetails.service && serviceCategories.length > 0 && !formData.businessCategory) {
      // Find matching service by name (case insensitive)
      const matchingService = serviceCategories.find(service => 
        service.name && service.name.toLowerCase() === jobDetails.service.toLowerCase()
      );
      
      if (matchingService) {
        setFormData(prev => ({ ...prev, businessCategory: matchingService._id }));
      }
    }
  }, [jobDetails, serviceCategories, formData.businessCategory]);

  const validateStep = () => {
    setError("");
    
    if (step === 1) {
      if (!formData.name.trim()) return setError("Name is required");
      if (!formData.phoneCountryCode) return setError("Please select a country");
      if (!formData.phoneNumber.trim()) return setError("Phone number is required");
    } else if (step === 2) {
      if (!formData.businessName.trim()) return setError("Business name is required");
      if (!formData.businessCategory.trim()) return setError("Business category is required");
    } else if (step === 3) {
      if (!formData.street.trim()) return setError("Street address is required");
      if (!formData.city.trim()) return setError("City is required");
      if (!formData.state.trim()) return setError("State is required");
      if (!formData.postalCode.trim()) return setError("Postal code is required");
    }
    
    return true;
  };

  const handleNext = async () => {
    if (step === 1 && !showOtp) {
      // Step 1: Send OTP
      if (!validateStep()) return;
      
      setOtpSending(true);
      setError("");

      try {
        const fullPhoneNumber = getFullPhoneNumber(formData.phoneCountryCode, formData.phoneNumber);

        // 1) PRE-CHECK with validateOnly BEFORE sending OTP
        const validateRes = await fetch(`${api_url}/api/provider/auth/register-referred`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            phoneNumber: fullPhoneNumber,
            referrerId: formData.referrerId,
            jobId: formData.jobId,
            validateOnly: true,
          }),
        });

        const validateData = await validateRes.json();
        if (!validateRes.ok) throw new Error(validateData.message);

        // 2) If OK, send OTP
        const otpRes = await fetch(`${api_url}/api/otp/send`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: fullPhoneNumber }),
        });

        const otpData = await otpRes.json();
        if (!otpData.success) throw new Error(otpData.error || "Failed to send OTP");

        setShowOtp(true);
        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setOtpSending(false);
      }
    } else if (step === 1 && showOtp) {
      // Step 1: Verify OTP and register user
      if (!otp.trim()) {
        setError("Please enter the OTP code");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const fullPhoneNumber = getFullPhoneNumber(formData.phoneCountryCode, formData.phoneNumber);

        // 1) Verify OTP
        const otpVerifyRes = await fetch(`${api_url}/api/otp/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: fullPhoneNumber,
            code: otp.trim(),
          }),
        });

        const otpVerifyData = await otpVerifyRes.json();
        if (!otpVerifyData.success) throw new Error(otpVerifyData.error || "OTP verification failed");

        // 2) Register user after OTP verification
        const registerRes = await fetch(`${api_url}/api/provider/auth/register-referred`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            phoneNumber: fullPhoneNumber,
            referrerId: formData.referrerId,
            jobId: formData.jobId,
          }),
        });

        const registerData = await registerRes.json();
        if (!registerRes.ok) throw new Error(registerData.message);

        // Store userId for later onboarding update
        setUserId(registerData.userId);

        // Move to next step
        setStep(2);
        setShowOtp(false);
        setOtp("");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      // Regular step validation for business info and address
      if (!validateStep()) return;
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleComplete = async () => {
    if (!validateStep()) return;
    
    if (!formData.countryCode || !stripeCountries.includes(formData.countryCode.toLowerCase())) {
      setError("This country is not supported by Stripe.");
      return;
    }

    if (!userId) {
      setError("User ID not found. Please try refreshing the page.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Update onboarding info with business details and address
      const onboardingRes = await fetch(`${api_url}/api/provider/onboarding/update/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: formData.businessName,
          businessNumber: formData.businessNumber,
          businessCategoryId: formData.businessCategory, // This is the service ID
          businessAddress: {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            postalCode: formData.postalCode,
            country: formData.countryCode,
          },
          onboardingStep: 1, // Mark as having completed basic business info
        }),
      });

      const onboardingData = await onboardingRes.json();
      if (!onboardingRes.ok) throw new Error(onboardingData.message);

      // Success! Move to final step
      setStep(4);
    } catch (err) {
      setError(err.message || "Failed to complete registration.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  if (step === 4) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="signup-modal success-modal" onClick={e => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>×</button>
          <div className="success-content">
            <div className="success-icon">✅</div>
            <h2>Welcome to Mayvk!</h2>
            <p>Your account has been created successfully. You can now download the Mayvk Provider app and start accepting jobs.</p>
            <div className="app-download-links">
              <a href="#" className="download-btn ios-btn">Download for iOS</a>
              <a href="#" className="download-btn android-btn">Download for Android</a>
            </div>
            <p className="small-text">
              {jobDetails 
                ? `You can now respond to the ${jobDetails.service || 'job'} request${referrerDetails ? ` from ${referrerDetails.businessName || referrerDetails.name}` : ''}.`
                : 'Start browsing available jobs in your area.'
              }
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="signup-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(step / 3) * 100}%` }}></div>
          </div>
          <h2>Join Mayvk as a Service Provider</h2>
          {referrerDetails && (
            <p className="referrer-info">
              Referred by: <strong>{referrerDetails.businessName || referrerDetails.name}</strong>
            </p>
          )}
        </div>

        <div className="modal-body">
          {error && <div className="error-message">{error}</div>}

          {step === 1 && (
            <div className="step-content">
              <h3>Personal Information</h3>
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                disabled={loading || showOtp}
              />
              
              <div className="phone-input-container">
                <select
                  value={formData.phoneCountryCode}
                  onChange={(e) => handleInputChange('phoneCountryCode', e.target.value)}
                  disabled={loading || showOtp}
                  className="country-code-select"
                >
                  <option value="">Select Country</option>
                  {countryList.map((country) => (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  disabled={loading || showOtp}
                  className="phone-number-input"
                />
              </div>
              
              {showOtp && (
                <div className="otp-section">
                  <p className="otp-sent-message">
                    We've sent a verification code to {formData.phoneNumber}
                  </p>
                  <input
                    type="text"
                    placeholder="Enter OTP Code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    disabled={loading}
                    maxLength={6}
                    className="otp-input"
                  />
                </div>
              )}
              
              {!showOtp && (
                <p className="passwordless-note">
                  No password needed - you'll receive an OTP to verify your phone number when you first log in.
                </p>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="step-content">
              <h3>Business Information</h3>
              <input
                type="text"
                placeholder="Business Name"
                value={formData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                disabled={loading}
              />
              <input
                type="text"
                placeholder="Business Number (Optional)"
                value={formData.businessNumber}
                onChange={(e) => handleInputChange('businessNumber', e.target.value)}
                disabled={loading}
              />
              {jobDetails && jobDetails.service ? (
                <div>
                  <input
                    type="text"
                    value={jobDetails.service}
                    disabled
                    className="preselected-category-input"
                    placeholder="Business Category"
                  />
                  <p className="preselected-note">
                    Business category pre-selected based on the job you're being referred for: <strong>{jobDetails.service}</strong>
                  </p>
                </div>
              ) : (
                <select
                  value={formData.businessCategory}
                  onChange={(e) => handleInputChange('businessCategory', e.target.value)}
                  disabled={loading}
                >
                  <option value="">Select Business Category</option>
                  {serviceCategories.map((service) => (
                    <option key={service._id} value={service._id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="step-content">
              <h3>Business Address</h3>
              <input
                type="text"
                placeholder="Street Address"
                value={formData.street}
                onChange={(e) => handleInputChange('street', e.target.value)}
                disabled={loading}
              />
              <input
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                disabled={loading}
              />
              <input
                type="text"
                placeholder="State"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                disabled={loading}
              />
              <input
                type="text"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={(e) => handleInputChange('postalCode', e.target.value)}
                disabled={loading}
              />
              <select
                value={formData.countryCode}
                onChange={(e) => handleInputChange('countryCode', e.target.value)}
                disabled={loading}
              >
                {countryList.map((country) => (
                  <option key={country.countryCode} value={country.countryCode}>
                    {country.countryCode}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="modal-footer">
          {step > 1 && (
            <button type="button" onClick={handleBack} disabled={loading} className="btn-secondary">
              Back
            </button>
          )}
          {step < 3 ? (
            <button type="button" onClick={handleNext} disabled={loading || otpSending} className="btn-primary">
              {step === 1 && !showOtp 
                ? (otpSending ? "Sending OTP..." : "Send OTP") 
                : step === 1 && showOtp 
                ? (loading ? "Verifying..." : "Verify & Continue") 
                : "Next"
              }
            </button>
          ) : (
            <button type="button" onClick={handleComplete} disabled={loading} className="btn-primary">
              {loading ? "Creating Account..." : "Complete Registration"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupModal;