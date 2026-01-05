"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SignupModal from "./signupmodal";
import CustomIcon from "../../../assets/customlogo";
import "../../../css/referralsignup.css";

// Utility function to get full phone number (same as provider app)
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

const ReferredJobsSignup = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ref = searchParams.get("ref");
  const job = searchParams.get("job");

  const [jobDetails, setJobDetails] = useState(null);
  const [referrerDetails, setReferrerDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const api_url = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch job details if jobId exists
        if (job) {
          try {
            const jobRes = await fetch(`${api_url}/api/provider/auth/referral-job-info/${job}`);
            if (jobRes.ok) {
              const jobData = await jobRes.json();
              setJobDetails(jobData);
            }
          } catch (err) {
            console.error("Failed to fetch job details:", err);
          }
        }

        // Fetch referrer details if ref exists
        if (ref) {
          try {
            const referrerRes = await fetch(`${api_url}/api/shared/business-portal/${ref}`);
            if (referrerRes.ok) {
              const referrerData = await referrerRes.json();
              setReferrerDetails(referrerData);
            }
          } catch (err) {
            console.error("Failed to fetch referrer details:", err);
          }
        }
      } catch (err) {
        console.error("Failed to fetch initial data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [api_url, job, ref]);



  if (loading) {
    return (
      <div className="stripe-layout">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="stripe-layout">
        <div className="ai-container">
          {/* Left side - AI Hero section with header */}
          <div className="ai-hero-section">
            {/* Header inside left side */}
            <header className="ai-header">
              <div className="ai-nav">
                <div className="mayvk-brand">
                  <div className="mayvk-logo">
                    <CustomIcon />
                  </div>
                  <h1 className="brand-name">Mayvk</h1>
                </div>
              </div>
            </header>

            {/* AI Hero Content */}
            <div className="ai-hero-content">
              <div className="ai-glow-effect"></div>
              <h3 className="ai-hero-title">Unlock AI-Powered Success</h3>
              <p className="ai-hero-description">
                Join the future of service delivery with our intelligent platform that connects, optimizes, and scales your business automatically.
              </p>
              <div className="ai-features">
                <div className="ai-feature">
                  <span className="ai-feature-icon">🤖</span>
                  <span>Smart Customer Matching</span>
                </div>
                <div className="ai-feature">
                  <span className="ai-feature-icon">⚡</span>
                  <span>Automated Workflows</span>
                </div>
                <div className="ai-feature">
                  <span className="ai-feature-icon">📊</span>
                  <span>Predictive Analytics</span>
                </div>
              </div>
              <div className="ai-particle-effect"></div>
            </div>
          </div>

          {/* Right side - Job info */}
          <div className="job-info-section">
            <div className="job-info-content">
              <div className="referrer-badge">
                {referrerDetails ? (
                  <span>Referred by {referrerDetails.businessName || referrerDetails.name}</span>
                ) : (
                  <span>Job Referral</span>
                )}
              </div>
              
              <h2 className="job-title">
                {jobDetails?.service || 'Service'} Opportunity
              </h2>
              
              {jobDetails && (
                <div className="job-description">
                  <div className="job-detail">
                    <strong>Service Type:</strong> {jobDetails.service}
                  </div>
                  {jobDetails.customer && (
                    <div className="job-detail">
                      <strong>Customer:</strong> {jobDetails.customer}
                    </div>
                  )}
                  {jobDetails.details && (
                    <div className="job-detail">
                      <div 
                        className="job-details-content"
                        dangerouslySetInnerHTML={{ __html: jobDetails.details }} 
                      />
                    </div>
                  )}
                </div>
              )}
              
              <button 
                className="contact-customer-btn"
                onClick={() => setShowModal(true)}
              >
                Start AI Journey
                <span className="arrow-icon">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Signup Modal */}
      {showModal && (
        <SignupModal
          onClose={() => setShowModal(false)}
          referrerId={ref}
          jobId={job}
          jobDetails={jobDetails}
          referrerDetails={referrerDetails}
        />
      )}
    </>
  );
};

export default ReferredJobsSignup;