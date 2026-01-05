'use client';

import React from 'react';
import Link from 'next/link';
import CustomIcon from '../../../assets/customlogo';
import { productsMenu, servicesMenu } from '../data/navigation';
import '../css/footer.css';

const Footer = ({
  // Custom props for portfolio mode
  column1 = null,
  column2 = null,
  showLegal = true,
  showSocialLinks = true,
  tagline = "Transforming businesses with software solutions that increase revenue, cut costs, and save time.",
  contactEmail = "info@support.mayvk.com",
  contactPhone = "+61 451 955 140"
}) => {
  const currentYear = new Date().getFullYear();

  const defaultFooterLinks = {
    products: productsMenu.map(product => ({
      name: product.label,
      href: product.href
    })),
    services: servicesMenu.map(service => ({
      name: service.label,
      href: service.href
    })),
    legal: [
      { name: 'Privacy Policy', href: '/business/legals/privacy-policy' },
      { name: 'Terms & Conditions', href: '/business/legals/terms-&-conditions' },
    ]
  };

  const socialLinks = [
    { name: 'Twitter', icon: '𝕏', href: 'https://twitter.com' },
    { name: 'LinkedIn', icon: 'in', href: 'https://linkedin.com' },
    { name: 'Facebook', icon: 'f', href: 'https://facebook.com' },
    { name: 'Instagram', icon: '📷', href: 'https://instagram.com' }
  ];

  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-top">
          {/* Company Info */}
          <div className="footer-company">
            <div className="footer-logo">
              <CustomIcon className="footer-logo-icon" />
              <span className="footer-logo-text">Mayvk</span>
            </div>
            <p className="footer-tagline">
              {tagline}
            </p>

            {/* Contact Us */}
            <div className="footer-newsletter">
              <h4 className="newsletter-title">Contact Us</h4>
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-label">Phone:</span>
                  <a href={`tel:${contactPhone.replace(/\s/g, '')}`} className="contact-link">{contactPhone}</a>
                </div>
                <div className="contact-item">
                  <span className="contact-label">Email:</span>
                  <a href={`mailto:${contactEmail}`} className="contact-link">{contactEmail}</a>
                </div>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="footer-links-grid">
            {/* Column 1 - Products or Experience */}
            <div className="footer-links-column">
              <h4 className="footer-links-title">{column1?.title || 'Products'}</h4>
              <ul className="footer-links-list">
                {(column1?.links || defaultFooterLinks.products).map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="footer-link">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 - Services or Skills */}
            <div className="footer-links-column">
              <h4 className="footer-links-title">{column2?.title || 'Services'}</h4>
              <ul className="footer-links-list">
                {(column2?.links || defaultFooterLinks.services).map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="footer-link">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            {showLegal && (
              <div className="footer-links-column">
                <h4 className="footer-links-title">Legal</h4>
                <ul className="footer-links-list">
                  {defaultFooterLinks.legal.map((link, index) => (
                    <li key={index}>
                      <a href={link.href} className="footer-link">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className={`footer-bottom-content ${!showSocialLinks ? 'centered' : ''}`}>
            {/* Copyright */}
            <div className="footer-copyright">
              © {currentYear} Mayvk. All rights reserved.
            </div>

            {/* Social Links */}
            {showSocialLinks && (
              <div className="footer-social">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="footer-social-link"
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="social-icon">{social.icon}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;