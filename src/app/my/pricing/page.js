'use client';

import React from 'react';
import './pricing.css';
import CustomIcon from '@/assets/customlogo';

const PricingPage = () => {
  return (
    <div className="pricing-page">
      <div className="pricing-container">
        {/* Header */}
        <header className="pricing-header">
          <div className="pricing-logo">
            <CustomIcon />
            <h1 className="logo-text">Mayvk</h1>
          </div>
          <div className="pricing-meta">
            <h2>Hosting & Maintenance Pricing</h2>
            <p>Simple, Transparent, Capacity-Based Pricing</p>
          </div>
        </header>

        {/* Pricing Tiers */}
        <section className="pricing-section">
          <h2 className="section-heading">Pricing Tiers</h2>
          <table className="pricing-table">
            <thead>
              <tr>
                <th>Tier</th>
                <th>Base Capacity</th>
                <th>Growth Buffer</th>
                <th>Total Capacity</th>
                <th>Monthly Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="tier-name">Starter</td>
                <td>800</td>
                <td className="buffer">+800</td>
                <td>1,600</td>
                <td className="price">$400</td>
              </tr>
              <tr>
                <td className="tier-name">Growth</td>
                <td>1,600</td>
                <td className="buffer">+1,400</td>
                <td>3,000</td>
                <td className="price">$850</td>
              </tr>
              <tr>
                <td className="tier-name">Scale</td>
                <td>3,000</td>
                <td className="buffer">+2,000</td>
                <td>5,000</td>
                <td className="price">$1,500</td>
              </tr>
              <tr>
                <td className="tier-name">Pro</td>
                <td>5,000</td>
                <td className="buffer">+2,500</td>
                <td>7,500</td>
                <td className="price">$2,200</td>
              </tr>
              <tr>
                <td className="tier-name">Enterprise</td>
                <td>7,500</td>
                <td className="buffer">+2,500</td>
                <td>10,000</td>
                <td className="price">$3,000</td>
              </tr>
            </tbody>
          </table>
          <div className="info-box blue">
            <h3>Beyond 10,000 Users?</h3>
            <p>You have two options:</p>
            <ul style={{marginTop: '10px', marginBottom: '0', paddingLeft: '20px'}}>
              <li style={{marginBottom: '8px'}}><strong>Stay on Enterprise ($3,000)</strong> - Keep using the current tier until we notify you that an upgrade is needed.</li>
              <li><strong>Lock in a fixed price</strong> - We can agree on a set monthly price that covers you all the way up to 100,000 users. No surprise increases - one price for your growth goal.</li>
            </ul>
          </div>
        </section>

        {/* How It Works */}
        <section className="pricing-section">
          <h2 className="section-heading">How It Works</h2>
          <div className="how-cards">
            <div className="how-card green">
              <h4>Base Capacity</h4>
              <p>What your tier is optimized for. Runs smooth and fast.</p>
            </div>
            <div className="how-card blue">
              <h4>Growth Buffer</h4>
              <p>Extra capacity included at no additional cost. Handles growth spurts and busy days.</p>
            </div>
            <div className="how-card orange">
              <h4>Total Capacity</h4>
              <p>Maximum users before performance may start to drop.</p>
            </div>
          </div>
        </section>

        {/* What Happens At Each Stage */}
        <section className="pricing-section">
          <h2 className="section-heading">What Happens At Each Stage</h2>
          <table className="info-table">
            <thead>
              <tr>
                <th>Stage</th>
                <th>What Happens</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="label stage-green">Within Base Capacity</td>
                <td>App runs perfectly. Optimized performance.</td>
              </tr>
              <tr>
                <td className="label stage-blue">Within Growth Buffer</td>
                <td>Still runs smooth. No slowdown. You're covered.</td>
              </tr>
              <tr>
                <td className="label stage-orange">Beyond Total Capacity</td>
                <td>You can still stay on your current plan. We'll notify you when an upgrade is actually needed.</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Why Your App Needs a Server */}
        <section className="pricing-section">
          <h2 className="section-heading">Why Your App Needs a Server</h2>
          <div className="info-box blue">
            <p>Your app needs a server to run 24/7. The server is what makes your app accessible to users at any time. Without it, your app simply doesn't exist online.</p>
          </div>
          <div className="simple-list">
            <div className="simple-item">
              <strong>Server</strong>
              <span>A computer that runs your app and handles all user requests</span>
            </div>
            <div className="simple-item">
              <strong>Capacity</strong>
              <span>How many users the server can handle at the same time</span>
            </div>
            <div className="simple-item">
              <strong>Maintenance</strong>
              <span>Keeping the server secure, updated, and running smoothly</span>
            </div>
          </div>
        </section>

        {/* Understanding Capacity */}
        <section className="pricing-section">
          <h2 className="section-heading">Understanding Server Capacity</h2>
          <p className="section-intro">Each tier gives your server more resources to handle more users simultaneously:</p>
          <table className="info-table">
            <thead>
              <tr>
                <th>Tier</th>
                <th>Handles Up To</th>
                <th>Monthly Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Starter</td><td>1,600 users</td><td><strong>$400</strong></td></tr>
              <tr><td>Growth</td><td>3,000 users</td><td><strong>$850</strong></td></tr>
              <tr><td>Scale</td><td>5,000 users</td><td><strong>$1,500</strong></td></tr>
              <tr><td>Pro</td><td>7,500 users</td><td><strong>$2,200</strong></td></tr>
              <tr><td>Enterprise</td><td>10,000 users</td><td><strong>$3,000</strong></td></tr>
            </tbody>
          </table>
        </section>

        {/* Growth Buffer Explained */}
        <section className="pricing-section">
          <h2 className="section-heading">The Growth Buffer</h2>
          <div className="info-box blue">
            <h3>Extra capacity at no extra cost</h3>
            <p>Every tier includes a <strong>Growth Buffer</strong> - additional server capacity beyond what the tier is optimized for. This handles traffic spikes, busy days, and gradual growth without any slowdowns.</p>
          </div>
          <div className="simple-example">
            <p><strong>Example:</strong> The Starter tier is optimized for 800 users, but includes a Growth Buffer of +800. This means you can handle up to 1,600 users before needing to upgrade.</p>
          </div>
        </section>

        {/* Maintenance */}
        <section className="pricing-section">
          <h2 className="section-heading">Maintenance is Included</h2>
          <p className="section-intro">Your server needs ongoing care to stay secure and running fast. All maintenance is included in your monthly fee.</p>
          <table className="info-table">
            <thead>
              <tr>
                <th>Maintenance Task</th>
                <th>What It Means</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="label">Monitoring</td><td>Watching the system 24/7 for issues</td></tr>
              <tr><td className="label">Security updates</td><td>Patching vulnerabilities before hackers exploit them</td></tr>
              <tr><td className="label">Backups</td><td>Saving copies of everything daily</td></tr>
              <tr><td className="label">Performance checks</td><td>Making sure it runs fast</td></tr>
              <tr><td className="label">Bug fixes</td><td>Fixing problems when they appear</td></tr>
              <tr><td className="label">Emergency response</td><td>If something breaks at 2am, I fix it</td></tr>
            </tbody>
          </table>
          <div className="info-box blue">
            <p><strong>All included in your monthly cost. No extra fees.</strong></p>
          </div>
        </section>

        {/* Why NOT Commission */}
        <section className="pricing-section">
          <h2 className="section-heading">Why This is NOT Commission-Based</h2>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Commission Model</th>
                <th>This Model</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><span className="cross">✗</span> Charge per user</td><td><span className="check">✓</span> Charge for capacity</td></tr>
              <tr><td><span className="cross">✗</span> More customers = I earn more</td><td><span className="check">✓</span> More customers = same flat rate</td></tr>
              <tr><td><span className="cross">✗</span> I benefit from your growth</td><td><span className="check">✓</span> I benefit from keeping your app running</td></tr>
              <tr><td><span className="cross">✗</span> I have interest in your revenue</td><td><span className="check">✓</span> I have zero interest in your revenue</td></tr>
            </tbody>
          </table>
          <div className="info-box blue">
            <p><strong>I'm not your business partner - I'm your service provider.</strong></p>
            <p>You pay a flat monthly fee for server capacity and maintenance. Your revenue is yours - I don't take a cut.</p>
          </div>
        </section>

        {/* I Don't Own Your App */}
        <section className="pricing-section">
          <h2 className="section-heading">I Don't Own Your App</h2>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>What's Yours</th>
                <th>What's Mine</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><span className="check">✓</span> The app</td><td>The server infrastructure</td></tr>
              <tr><td><span className="check">✓</span> Your code</td><td>The managed hosting service</td></tr>
              <tr><td><span className="check">✓</span> Your customers</td><td>The maintenance & monitoring</td></tr>
              <tr><td><span className="check">✓</span> Your data</td><td>The responsibility to keep it running</td></tr>
              <tr><td><span className="check">✓</span> Your revenue</td><td>Nothing. Zero.</td></tr>
            </tbody>
          </table>
          <div className="info-box blue">
            <p><strong>Full ownership stays with you.</strong> I provide the infrastructure and keep it running - that's it.</p>
          </div>
          <div className="info-box orange">
            <ul>
              <li><span className="cross">✗</span> I don't have access to your customer database</li>
              <li><span className="cross">✗</span> I don't have ownership of your business</li>
              <li><span className="cross">✗</span> I don't have rights to your app or data</li>
              <li><span className="cross">✗</span> I don't take commission from your bookings or transactions</li>
            </ul>
          </div>
        </section>

        {/* My Role */}
        <section className="pricing-section">
          <h2 className="section-heading">My Role: Managed Server Service</h2>
          <p className="section-intro">I handle all the technical work so you can focus on your business.</p>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>What I Do</th>
                <th>What I Don't Do</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><span className="check">✓</span> Keep the server running 24/7</td><td><span className="cross">✗</span> Own any part of your business</td></tr>
              <tr><td><span className="check">✓</span> Monitor for problems</td><td><span className="cross">✗</span> Access your customer data</td></tr>
              <tr><td><span className="check">✓</span> Fix issues when they happen</td><td><span className="cross">✗</span> Charge per user or transaction</td></tr>
              <tr><td><span className="check">✓</span> Notify you when upgrade is needed</td><td><span className="cross">✗</span> Force you to upgrade</td></tr>
              <tr><td><span className="check">✓</span> Handle security & backups</td><td><span className="cross">✗</span> Take commission on your revenue</td></tr>
            </tbody>
          </table>
          <div className="info-box blue">
            <p><strong>My job is simple: Make sure your app runs reliably. That's it.</strong></p>
          </div>
        </section>

        {/* Billing */}
        <section className="pricing-section">
          <h2 className="section-heading">Billing</h2>
          <div className="billing-grid">
            <div className="billing-item"><strong>First Month</strong><span>Paid upfront</span></div>
            <div className="billing-item"><strong>After That</strong><span>Billed at end of each month</span></div>
            <div className="billing-item"><strong>Upgrade</strong><span>Anytime. New rate starts next billing cycle.</span></div>
            <div className="billing-item"><strong>Downgrade</strong><span>Yes, if users drop. Adjusted next month.</span></div>
          </div>
        </section>

        {/* What's Included */}
        <section className="pricing-section">
          <h2 className="section-heading">What's Included</h2>
          <div className="included-grid">
            <div className="included-item"><span className="icon">☁️</span> Server hosting & infrastructure</div>
            <div className="included-item"><span className="icon">🔒</span> Security & SSL certificates</div>
            <div className="included-item"><span className="icon">👁️</span> 24/7 monitoring</div>
            <div className="included-item"><span className="icon">🔧</span> Maintenance & updates</div>
            <div className="included-item"><span className="icon">💾</span> Daily backups</div>
            <div className="included-item"><span className="icon">📞</span> Technical support</div>
          </div>
        </section>

        {/* AWS Comparison */}
        <section className="pricing-section">
          <h2 className="section-heading">Compared to AWS</h2>
          <table className="comparison-table">
            <thead>
              <tr>
                <th></th>
                <th>This Service</th>
                <th>AWS</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><strong>Monthly Cost</strong></td><td><span className="check">✓</span> Fixed, predictable</td><td><span className="cross">✗</span> Unpredictable</td></tr>
              <tr><td><strong>Surprise Bills</strong></td><td><span className="check">✓</span> No</td><td><span className="cross">✗</span> Yes, common</td></tr>
              <tr><td><strong>Support</strong></td><td><span className="check">✓</span> Included</td><td><span className="cross">✗</span> Extra cost</td></tr>
              <tr><td><strong>Scaling</strong></td><td><span className="check">✓</span> Notify & upgrade when ready</td><td><span className="cross">✗</span> Auto-scales, auto-charges</td></tr>
            </tbody>
          </table>
        </section>

        {/* FAQ */}
        <section className="pricing-section">
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <div className="faq-item">
            <div className="faq-question">Q: What if we hit 801 users?</div>
            <div className="faq-answer">A: You're still at $400. The Growth Buffer covers you up to 1,600 users.</div>
          </div>
          <div className="faq-item">
            <div className="faq-question">Q: What if we go beyond Total Capacity?</div>
            <div className="faq-answer">A: You can stay on your current plan. We'll monitor the server and notify you when an upgrade is actually needed - until then, you're good.</div>
          </div>
          <div className="faq-item">
            <div className="faq-question">Q: Do we have to upgrade when notified?</div>
            <div className="faq-answer">A: No. It's your choice. We'll always notify you first, and you decide when you're ready to upgrade.</div>
          </div>
          <div className="faq-item">
            <div className="faq-question">Q: Can we downgrade if users drop?</div>
            <div className="faq-answer">A: Yes. We adjust your tier at the next billing cycle.</div>
          </div>
          <div className="faq-item">
            <div className="faq-question">Q: Are there any hidden fees?</div>
            <div className="faq-answer">A: No. The price shown is the price you pay. Everything is included.</div>
          </div>
          <div className="faq-item">
            <div className="faq-question">Q: Who owns our data?</div>
            <div className="faq-answer">A: You do. Full ownership. No commission on your users, no access to your customer database.</div>
          </div>
        </section>

        {/* Summary */}
        <section className="pricing-section">
          <h2 className="section-heading">Summary</h2>
          <div className="summary-box">
            <p><strong>Simple, transparent pricing.</strong> You own your app, your code, your customers, and your revenue. I provide the server infrastructure and keep it running 24/7. No ownership, no commission, no access to your data. Just reliable hosting and maintenance for a flat monthly fee.</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="pricing-footer">
          <div className="footer-content">
            <div className="footer-logo">
              <CustomIcon />
              <h2 className="logo-text">Mayvk</h2>
            </div>
            <div className="footer-contact">
              <p>📞 +61 0451 955 140</p>
              <p>✉️ info@support.mayvk.com</p>
              <p>💬 WhatsApp: +61 403 747 010</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>Questions? Let's talk.</p>
          </div>
        </footer>
      </div>

      {/* Download Button */}
      <div className="print-actions">
        <button onClick={() => window.print()} className="print-button">
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default PricingPage;
