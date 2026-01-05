'use client';

import React from 'react';
import BusinessPageLayout from '../../components/businesspagelayout';
import '../privacy-policy/privacy.css';

const TermsAndConditionsPage = () => {
  return (
    <BusinessPageLayout>
      {({ openModal }) => (
        <div className="legal-page">
          <div className="legal-container">
            <h1 className="legal-title">Terms and Conditions</h1>
            <p className="legal-updated">Last Updated: January 2025</p>

            <div className="legal-content">
              <section>
                <h2>1. Agreement to Terms</h2>
                <p>
                  By accessing or using Mayvk's services ("Services"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use our Services.
                </p>
                <p>
                  These Terms apply to all users, including customers, businesses, and visitors who access or use our AI-powered customer support agents, website development services, and related products.
                </p>
              </section>

              <section>
                <h2>2. Description of Services</h2>
                <p>Mayvk provides:</p>
                <ul>
                  <li>AI-powered customer support agents for businesses</li>
                  <li>Website development and design services</li>
                  <li>Mobile application development</li>
                  <li>AI integration and automation solutions</li>
                  <li>Related software and consulting services</li>
                </ul>
                <p>
                  We reserve the right to modify, suspend, or discontinue any aspect of our Services at any time with or without notice.
                </p>
              </section>

              <section>
                <h2>3. Account Registration and Security</h2>
                <h3>3.1 Account Creation</h3>
                <p>
                  To use certain Services, you must create an account. You agree to provide accurate, current, and complete information during registration and to update it as necessary.
                </p>

                <h3>3.2 Account Security</h3>
                <p>
                  You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must notify us immediately of any unauthorized use of your account.
                </p>

                <h3>3.3 Account Termination</h3>
                <p>
                  We reserve the right to suspend or terminate your account if you violate these Terms or engage in fraudulent, abusive, or illegal activity.
                </p>
              </section>

              <section>
                <h2>4. Pricing and Payment</h2>
                <h3>4.1 Fees</h3>
                <p>
                  Pricing for our Services is as stated on our website or as agreed upon in writing. All fees are in USD unless otherwise specified.
                </p>

                <h3>4.2 Payment Terms</h3>
                <ul>
                  <li>Monthly subscriptions are billed in advance</li>
                  <li>One-time fees are due upon service commencement</li>
                  <li>Payment is required via credit card, debit card, or other approved methods</li>
                  <li>Late payments may result in service suspension</li>
                </ul>

                <h3>4.3 Refund Policy</h3>
                <p>
                  Refunds are provided at our discretion. Monthly subscription fees are non-refundable except as required by law. For one-time services, refund eligibility depends on project stage and agreement terms.
                </p>

                <h3>4.4 Price Changes</h3>
                <p>
                  We may change our pricing with 30 days' notice. Existing customers will be notified before changes take effect.
                </p>
              </section>

              <section>
                <h2>5. Free Trials and Promotional Offers</h2>
                <p>
                  Free trials and promotional offers are subject to specific terms communicated at the time of the offer. We reserve the right to modify or cancel promotions at any time.
                </p>
                <p>
                  At the end of a free trial, your account will automatically convert to a paid subscription unless you cancel before the trial ends.
                </p>
              </section>

              <section>
                <h2>6. Use of AI Services</h2>
                <h3>6.1 AI Training</h3>
                <p>
                  Our AI customer support agents learn from interactions to improve service quality. By using our AI services, you consent to the processing of conversation data for training purposes, subject to our Privacy Policy.
                </p>

                <h3>6.2 AI Limitations</h3>
                <p>
                  While our AI is designed to provide accurate and helpful responses, we do not guarantee perfection. You are responsible for reviewing and validating AI-generated content before use.
                </p>

                <h3>6.3 Prohibited Uses</h3>
                <p>You may not use our AI services to:</p>
                <ul>
                  <li>Generate harmful, illegal, or malicious content</li>
                  <li>Impersonate individuals or organizations</li>
                  <li>Violate intellectual property rights</li>
                  <li>Circumvent security measures or usage limits</li>
                  <li>Scrape or reverse engineer our AI models</li>
                </ul>
              </section>

              <section>
                <h2>7. Intellectual Property Rights</h2>
                <h3>7.1 Our Property</h3>
                <p>
                  All content, features, and functionality of our Services, including but not limited to text, graphics, logos, software, and AI models, are owned by Mayvk and protected by intellectual property laws.
                </p>

                <h3>7.2 Your Content</h3>
                <p>
                  You retain ownership of content you provide to our Services. By using our Services, you grant us a license to use, process, and store your content to provide and improve our Services.
                </p>

                <h3>7.3 Work Product</h3>
                <p>
                  For website development and custom services, ownership of deliverables transfers to you upon full payment, unless otherwise agreed in writing.
                </p>
              </section>

              <section>
                <h2>8. User Responsibilities</h2>
                <p>You agree to:</p>
                <ul>
                  <li>Use our Services in compliance with all applicable laws</li>
                  <li>Not interfere with or disrupt our Services</li>
                  <li>Not attempt to gain unauthorized access to our systems</li>
                  <li>Not upload malicious code or harmful content</li>
                  <li>Not use our Services to spam or harass others</li>
                  <li>Maintain accurate account information</li>
                </ul>
              </section>

              <section>
                <h2>9. Service Level and Availability</h2>
                <p>
                  We strive to maintain high availability of our Services but do not guarantee uninterrupted access. We are not liable for service interruptions due to maintenance, technical issues, or circumstances beyond our control.
                </p>
                <p>
                  For enterprise customers, specific service level agreements (SLAs) may be provided in separate agreements.
                </p>
              </section>

              <section>
                <h2>10. Limitation of Liability</h2>
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, MAYVK SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY.
                </p>
                <p>
                  Our total liability for any claim arising from these Terms or our Services shall not exceed the amount you paid us in the 12 months preceding the claim.
                </p>
              </section>

              <section>
                <h2>11. Warranties and Disclaimers</h2>
                <p>
                  OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>
                <p>
                  We do not warrant that our Services will be error-free, secure, or meet your specific requirements.
                </p>
              </section>

              <section>
                <h2>12. Indemnification</h2>
                <p>
                  You agree to indemnify and hold Mayvk harmless from any claims, damages, losses, and expenses (including legal fees) arising from your use of our Services, violation of these Terms, or infringement of third-party rights.
                </p>
              </section>

              <section>
                <h2>13. Termination</h2>
                <p>
                  Either party may terminate this agreement at any time. You may cancel your subscription through your account settings. We may terminate your access for violation of these Terms.
                </p>
                <p>
                  Upon termination, your right to use our Services ceases immediately. We may delete your data in accordance with our data retention policies.
                </p>
              </section>

              <section>
                <h2>14. Governing Law and Dispute Resolution</h2>
                <p>
                  These Terms are governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to conflict of law principles.
                </p>
                <p>
                  Any disputes arising from these Terms or our Services shall be resolved through binding arbitration, except where prohibited by law.
                </p>
              </section>

              <section>
                <h2>15. Changes to Terms</h2>
                <p>
                  We may modify these Terms at any time. We will notify you of material changes by email or through our Services. Continued use of our Services after changes constitutes acceptance of the new Terms.
                </p>
              </section>

              <section>
                <h2>16. Severability</h2>
                <p>
                  If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect.
                </p>
              </section>

              <section>
                <h2>17. Entire Agreement</h2>
                <p>
                  These Terms, together with our Privacy Policy and any additional agreements, constitute the entire agreement between you and Mayvk regarding our Services.
                </p>
              </section>

              <section>
                <h2>18. Contact Information</h2>
                <p>For questions about these Terms, please contact us:</p>
                <ul>
                  <li>Email: legal@mayvk.com</li>
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

export default TermsAndConditionsPage;
