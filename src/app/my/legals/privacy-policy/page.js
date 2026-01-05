'use client';

import React from 'react';
import BusinessPageLayout from '../../components/businesspagelayout';
import './privacy.css';

const PrivacyPolicyPage = () => {
  return (
    <BusinessPageLayout>
      {({ openModal }) => (
        <div className="legal-page">
          <div className="legal-container">
            <h1 className="legal-title">Privacy Policy</h1>
            <p className="legal-updated">Last Updated: January 2025</p>

            <div className="legal-content">
              <section>
                <h2>1. Introduction</h2>
                <p>
                  Welcome to Mayvk ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services, including our AI-powered customer support agents, website development services, and related products.
                </p>
              </section>

              <section>
                <h2>2. Information We Collect</h2>
                <h3>2.1 Personal Information</h3>
                <p>We may collect the following personal information:</p>
                <ul>
                  <li>Name and contact information (email address, phone number)</li>
                  <li>Company name and business information</li>
                  <li>Payment and billing information</li>
                  <li>Account credentials and authentication data</li>
                  <li>Communication preferences</li>
                </ul>

                <h3>2.2 Usage Data</h3>
                <p>We automatically collect information about how you interact with our services:</p>
                <ul>
                  <li>Device information (IP address, browser type, operating system)</li>
                  <li>Usage patterns and analytics data</li>
                  <li>Conversation logs with AI agents (for service improvement)</li>
                  <li>Performance metrics and error logs</li>
                </ul>

                <h3>2.3 Customer Support Data</h3>
                <p>
                  When you use our AI customer support agents, we may collect and process customer interaction data, support tickets, and conversation histories to provide and improve our services.
                </p>
              </section>

              <section>
                <h2>3. How We Use Your Information</h2>
                <p>We use your information for the following purposes:</p>
                <ul>
                  <li>Providing and maintaining our services</li>
                  <li>Processing payments and managing your account</li>
                  <li>Training and improving our AI models</li>
                  <li>Sending service updates, technical notices, and support messages</li>
                  <li>Responding to your inquiries and providing customer support</li>
                  <li>Analyzing usage patterns to improve our products</li>
                  <li>Detecting and preventing fraud or security issues</li>
                  <li>Complying with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2>4. Data Sharing and Disclosure</h2>
                <p>We do not sell your personal information. We may share your information with:</p>
                <ul>
                  <li><strong>Service Providers:</strong> Third-party vendors who help us provide our services (payment processors, hosting providers, analytics services)</li>
                  <li><strong>Business Transfers:</strong> In connection with any merger, sale, or acquisition of all or a portion of our business</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                  <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</li>
                </ul>
              </section>

              <section>
                <h2>5. AI Training and Data Processing</h2>
                <p>
                  Our AI customer support agents learn from interactions to improve service quality. We may use anonymized and aggregated conversation data to train and enhance our AI models. You can opt out of having your data used for training purposes by contacting us.
                </p>
              </section>

              <section>
                <h2>6. Data Security</h2>
                <p>
                  We implement industry-standard security measures to protect your information, including:
                </p>
                <ul>
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Employee training on data protection</li>
                </ul>
                <p>
                  However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2>7. Your Rights and Choices</h2>
                <p>You have the right to:</p>
                <ul>
                  <li>Access your personal information</li>
                  <li>Correct inaccurate or incomplete data</li>
                  <li>Request deletion of your data (subject to legal obligations)</li>
                  <li>Opt out of marketing communications</li>
                  <li>Export your data in a portable format</li>
                  <li>Object to automated decision-making</li>
                </ul>
                <p>
                  To exercise these rights, please contact us at privacy@mayvk.com
                </p>
              </section>

              <section>
                <h2>8. Data Retention</h2>
                <p>
                  We retain your information for as long as necessary to provide our services and comply with legal obligations. When data is no longer needed, we securely delete or anonymize it.
                </p>
              </section>

              <section>
                <h2>9. International Data Transfers</h2>
                <p>
                  Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.
                </p>
              </section>

              <section>
                <h2>10. Children's Privacy</h2>
                <p>
                  Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children.
                </p>
              </section>

              <section>
                <h2>11. Cookies and Tracking Technologies</h2>
                <p>
                  We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized content. You can control cookie preferences through your browser settings.
                </p>
              </section>

              <section>
                <h2>12. Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                </p>
              </section>

              <section>
                <h2>13. Contact Us</h2>
                <p>If you have questions or concerns about this Privacy Policy, please contact us:</p>
                <ul>
                  <li>Email: privacy@mayvk.com</li>
                  <li>Email: support@mayvk.com</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      )}
    </BusinessPageLayout>
  );
};

export default PrivacyPolicyPage;
