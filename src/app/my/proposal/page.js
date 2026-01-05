'use client';

import React from 'react';
import './proposal.css';
import CustomIcon from '@/assets/customlogo';

const ProposalPage = () => {
  const currentYearlyCost = 24000;
  const newYearlyCost = 4800;
  const yearlySavings = currentYearlyCost - newYearlyCost;
  const savingsPercentage = ((yearlySavings / currentYearlyCost) * 100).toFixed(0);

  return (
    <div className="proposal-page">
      <div className="proposal-container">
        {/* Header */}
        <header className="proposal-header">
          <div className="proposal-logo">
            <CustomIcon />
            <h1 className="logo-text">Mayvk</h1>
          </div>
          <div className="proposal-meta">
            <p>System Rebuild Proposal</p>
            <p>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </header>

        {/* Executive Summary */}
        <section className="proposal-section">
          <h2 className="section-heading">Project Overview</h2>
          <p className="section-intro">
            This proposal outlines a comprehensive system rebuild designed to address current operational
            challenges while delivering significant cost savings and improved user experience.
          </p>
        </section>

        {/* Blue Ocean Strategy - THE MOAT */}
        <section className="proposal-section blue-ocean-section">
          <div className="savings-banner">
            <h2 className="savings-title">Blue Ocean Strategy</h2>
            <p className="savings-subtitle">Moving from competition to innovation</p>
          </div>

          <div className="ocean-comparison">
            <div className="ocean-container">
              <div className="ocean-circle red-ocean">
                <div className="ocean-title">Current System</div>
                <div className="ocean-features">
                  <span className="feature-pill">$2,000/month maintenance</span>
                  <span className="feature-pill">High AWS costs</span>
                  <span className="feature-pill">Ongoing technical debt</span>
                  <span className="feature-pill">Manual processes</span>
                </div>
              </div>

              <div className="ocean-circle blue-ocean">
                <div className="ocean-title">Our Offer</div>
                <div className="ocean-features">
                  <span className="feature-pill">$400/month maintenance</span>
                  <span className="feature-pill">~$90/month services</span>
                  <span className="feature-pill">Scalable infrastructure</span>
                  <span className="feature-pill">Automated processes</span>
                </div>
              </div>
            </div>

            <div className="brackets-container">
              <div className="single-bracket">
                <div className="bracket-shape">
                  <div className="bracket-line single"></div>
                  <div className="bracket-middle"></div>
                </div>
                <div className="bracket-label">
                  <div className="label-number">${currentYearlyCost.toLocaleString()}</div>
                  <div className="label-text">/year</div>
                </div>
              </div>

              <div className="savings-bracket">
                <div className="bracket-shape">
                  <div className="bracket-line top"></div>
                  <div className="bracket-middle"></div>
                  <div className="bracket-line bottom"></div>
                </div>
                <div className="savings-label">
                  <div className="savings-number">{savingsPercentage}%</div>
                  <div className="savings-text">SAVINGS</div>
                </div>
              </div>

              <div className="single-bracket">
                <div className="bracket-shape">
                  <div className="bracket-line single"></div>
                  <div className="bracket-middle"></div>
                </div>
                <div className="bracket-label">
                  <div className="label-number">${newYearlyCost.toLocaleString()}</div>
                  <div className="label-text">/year</div>
                </div>
              </div>
            </div>
          </div>

          <div className="savings-summary">
            <div className="summary-box">
              <div className="summary-label">Annual Savings</div>
              <div className="summary-value">${yearlySavings.toLocaleString()}</div>
            </div>
            <div className="summary-box">
              <div className="summary-label">One-Time Investment</div>
              <div className="summary-value">$15,000</div>
            </div>
          </div>
        </section>

        {/* Current Issues */}
        <section className="proposal-section">
          <h2 className="section-heading">Current Challenges</h2>
          <div className="issues-grid">
            <div className="issue-card">
              <div className="issue-icon">⚠️</div>
              <h3>Complicated Onboarding</h3>
              <p>Too many steps creating user friction and drop-off</p>
            </div>
            <div className="issue-card">
              <div className="issue-icon">🔍</div>
              <h3>Limited Job Visibility</h3>
              <p>Users only see jobs within their immediate area</p>
            </div>
            <div className="issue-card">
              <div className="issue-icon">📊</div>
              <h3>Lacking Analytics</h3>
              <p>Admin side missing critical reporting tools</p>
            </div>
            <div className="issue-card">
              <div className="issue-icon">💰</div>
              <h3>High Operational Costs</h3>
              <p>$2,000/month in maintenance and AWS fees</p>
            </div>
            <div className="issue-card">
              <div className="issue-icon">🔧</div>
              <h3>Manual Processes</h3>
              <p>Onboarding requires manual intervention</p>
            </div>
            <div className="issue-card">
              <div className="issue-icon">🌐</div>
              <h3>Poor Landing Page</h3>
              <p>Not intuitive or user-friendly</p>
            </div>
          </div>
        </section>

        {/* Proposed Solution */}
        <section className="proposal-section">
          <h2 className="section-heading">Proposed Solution</h2>
          <div className="solution-box">
            <h3>Full System Rebuild</h3>
            <p className="solution-price">$15,000 + $400/month maintenance</p>
            <p className="solution-description">
              A complete rebuild focused on simplicity, automation, and long-term scalability.
              Modern architecture designed to reduce costs and improve user experience.
            </p>
          </div>
        </section>

        {/* Deliverables */}
        <section className="proposal-section">
          <h2 className="section-heading">Deliverables</h2>
          <div className="deliverables-list">
            <div className="deliverable-item">
              <div className="deliverable-number">1</div>
              <div className="deliverable-content">
                <h4>Customer Web App</h4>
                <p>Simplified onboarding, global job visibility, improved UX</p>
              </div>
            </div>
            <div className="deliverable-item">
              <div className="deliverable-number">2</div>
              <div className="deliverable-content">
                <h4>Tradie Mobile App</h4>
                <p>Intuitive job management and real-time notifications</p>
              </div>
            </div>
            <div className="deliverable-item">
              <div className="deliverable-number">3</div>
              <div className="deliverable-content">
                <h4>Admin Dashboard</h4>
                <p>Analytics, insights, and centralized control</p>
              </div>
            </div>
            <div className="deliverable-item">
              <div className="deliverable-number">4</div>
              <div className="deliverable-content">
                <h4>Notification System</h4>
                <p>Real-time in-app and push notifications</p>
              </div>
            </div>
            <div className="deliverable-item bonus">
              <div className="deliverable-number">+</div>
              <div className="deliverable-content">
                <h4>Landing Page (Bonus)</h4>
                <p>New, clean, and intuitive layout before first deposit</p>
              </div>
            </div>
          </div>
        </section>

        {/* Deployment Plan */}
        <section className="proposal-section">
          <h2 className="section-heading">Deployment & Testing Plan</h2>
          <div className="deployment-phases">
            <div className="phase-card">
              <div className="phase-badge">Phase 1</div>
              <h4>Beta Testing</h4>
              <p>First 50 users via manual download for validation and feedback</p>
            </div>
            <div className="phase-card">
              <div className="phase-badge">Phase 2</div>
              <h4>Public Launch</h4>
              <p>Publish to Google Play and Apple App Store after validation</p>
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section className="proposal-section">
          <h2 className="section-heading">Milestone Breakdown</h2>
          <div className="milestones-table">
            <div className="table-header">
              <div className="table-cell">Milestone</div>
              <div className="table-cell">Scope</div>
              <div className="table-cell">Deliverable</div>
            </div>
            <div className="table-row">
              <div className="table-cell"><strong>1</strong></div>
              <div className="table-cell">Customer Web Frontend</div>
              <div className="table-cell">Interactive prototype</div>
            </div>
            <div className="table-row">
              <div className="table-cell"><strong>2</strong></div>
              <div className="table-cell">Tradie Mobile + Admin Frontends</div>
              <div className="table-cell">Completed interfaces</div>
            </div>
            <div className="table-row">
              <div className="table-cell"><strong>3</strong></div>
              <div className="table-cell">Backend Integration</div>
              <div className="table-cell">Fully connected system</div>
            </div>
            <div className="table-row">
              <div className="table-cell"><strong>4</strong></div>
              <div className="table-cell">Testing & Launch</div>
              <div className="table-cell">QA and deployment</div>
            </div>
          </div>
        </section>

        {/* Additional Costs */}
        <section className="proposal-section">
          <h2 className="section-heading">Additional Monthly Costs</h2>
          <div className="costs-table">
            <div className="table-row">
              <div className="table-cell"><strong>MongoDB Cloud</strong></div>
              <div className="table-cell">Managed database</div>
              <div className="table-cell">Free to start; usage-based later</div>
            </div>
            <div className="table-row">
              <div className="table-cell"><strong>Apple Developer Program</strong></div>
              <div className="table-cell">iOS App Store ($99/year)</div>
              <div className="table-cell">≈ $8/month</div>
            </div>
            <div className="table-row">
              <div className="table-cell"><strong>Google Developer Account</strong></div>
              <div className="table-cell">Play Store ($25 one-time)</div>
              <div className="table-cell">Negligible</div>
            </div>
            <div className="table-row">
              <div className="table-cell"><strong>Expo Developer Account</strong></div>
              <div className="table-cell">Builds & OTA updates</div>
              <div className="table-cell">≈ $38/month</div>
            </div>
            <div className="table-row">
              <div className="table-cell"><strong>Firebase Notifications</strong></div>
              <div className="table-cell">Push notifications</div>
              <div className="table-cell">Free</div>
            </div>
            <div className="table-row">
              <div className="table-cell"><strong>Vonage Authentication</strong></div>
              <div className="table-cell">OTP verification</div>
              <div className="table-cell">~$0.05 per SMS</div>
            </div>
            <div className="table-row">
              <div className="table-cell"><strong>Mailgun</strong></div>
              <div className="table-cell">Transactional emails</div>
              <div className="table-cell">≈ $30/month</div>
            </div>
            <div className="table-row total-row">
              <div className="table-cell"><strong>Total Additional Cost</strong></div>
              <div className="table-cell"></div>
              <div className="table-cell"><strong>≈ $75–$90/month + SMS charges</strong></div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="proposal-footer">
          <div className="footer-content">
            <div className="footer-logo">
              <CustomIcon />
              <h2 className="logo-text">Mayvk</h2>
            </div>
            <div className="footer-contact">
              <p className="contact-item">📞 +610451955140</p>
              <p className="contact-item">✉️ info@support.mayvk.com | muthasimabrar19@gmail.com</p>
              <p className="contact-item">💬 WhatsApp: +61403747010</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Mayvk. All rights reserved.</p>
          </div>
        </footer>
      </div>

      {/* Print Button */}
      <div className="print-actions">
        <button onClick={async () => {
          try {
            console.log('🔵 [FRONTEND] Download button clicked');
            const api_url = process.env.NEXT_PUBLIC_API_URL;
            console.log('🌐 [FRONTEND] API URL:', api_url);
            console.log('🚀 [FRONTEND] Fetching:', `${api_url}/api/proposal/download-pdf`);

            const response = await fetch(`${api_url}/api/proposal/download-pdf`);
            console.log('📡 [FRONTEND] Response received');
            console.log('📊 [FRONTEND] Status:', response.status, response.statusText);
            console.log('📝 [FRONTEND] Headers:');
            console.log('   - Content-Type:', response.headers.get('content-type'));
            console.log('   - Content-Length:', response.headers.get('content-length'));
            console.log('   - Content-Disposition:', response.headers.get('content-disposition'));

            if (!response.ok) {
              console.error('❌ [FRONTEND] Response not OK:', response.status);
              throw new Error(`Failed to download PDF: ${response.status} ${response.statusText}`);
            }

            console.log('✅ [FRONTEND] Response OK, creating blob...');
            const blob = await response.blob();
            console.log('✅ [FRONTEND] Blob created:');
            console.log('   - Size:', blob.size, 'bytes');
            console.log('   - Type:', blob.type);

            const url = window.URL.createObjectURL(blob);
            console.log('🔗 [FRONTEND] Object URL created:', url);

            const link = document.createElement('a');
            link.href = url;
            link.download = `mayvk-proposal-${Date.now()}.pdf`;
            console.log('📎 [FRONTEND] Download link created:', link.download);

            document.body.appendChild(link);
            link.click();
            console.log('✅ [FRONTEND] Click triggered');

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            console.log('✅ [FRONTEND] Cleanup complete');
            console.log('🎉 [FRONTEND] Download should be starting!');
          } catch (error) {
            console.error('❌ [FRONTEND] Error downloading PDF:', error);
            console.error('❌ [FRONTEND] Error name:', error.name);
            console.error('❌ [FRONTEND] Error message:', error.message);
            console.error('❌ [FRONTEND] Error stack:', error.stack);
            alert(`Error downloading PDF: ${error.message}\n\nCheck console for details.`);
          }
        }} className="print-button">
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default ProposalPage;
