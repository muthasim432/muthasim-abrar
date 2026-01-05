'use client';

import React, { useState } from 'react';
import CustomIcon from '../../../assets/customlogo';
import { navigationMenu } from '../data/navigation';
import '../css/header.css';

const Header = ({
  openModal,
  openComingSoonModal,
  customNavigation = null,
  primaryButton = null,
  secondaryButton = null
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);

  // Use custom navigation if provided, otherwise use default
  const navMenu = customNavigation || navigationMenu;

  const toggleMobileDropdown = (label) => {
    setMobileDropdownOpen(mobileDropdownOpen === label ? null : label);
  };

  const handleGetStarted = () => {
    if (openModal) {
      openModal({});
    }
  };

  const handleGetLeads = () => {
    if (openComingSoonModal) {
      openComingSoonModal();
    }
  };

  return (
    <header className="business-header">
      <div className="header-container">
        {/* Logo Section */}
        <div className="header-logo-section">
          <a href="/business" className="logo-link">
            <CustomIcon className="logo" alt="Logo" />
            <span className="logo-text">Mayvk</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-list">
            {navMenu.map((item, index) => (
              <li key={index} className="nav-item">
                <a
                  href={item.href}
                  className="nav-link"
                  onClick={(e) => {
                    // Prevent navigation if it's just a dropdown menu
                    if (item.href === '#' && item.dropdown) {
                      e.preventDefault();
                    }
                  }}
                >
                  {item.label}
                  {item.dropdown && <span className="dropdown-arrow">▼</span>}
                </a>
                {item.dropdown && (
                  <div className="dropdown-menu">
                    {item.dropdown.map((dropdownItem, dropdownIndex) => (
                      <a
                        key={dropdownIndex}
                        href={dropdownItem.href}
                        className="dropdown-item"
                      >
                        {dropdownItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA Buttons */}
        <div className="header-actions">
          {secondaryButton ? (
            <a href={secondaryButton.href} className="btn-secondary">
              {secondaryButton.text}
            </a>
          ) : (
            <button className="btn-secondary btn-with-badge" onClick={handleGetLeads}>
              Get Leads
              <span className="coming-soon-badge">Coming Soon</span>
            </button>
          )}
          {primaryButton ? (
            <a href={primaryButton.href} className="btn-primary">
              {primaryButton.text}
            </a>
          ) : (
            <button className="btn-primary" onClick={handleGetStarted}>
              Get Started
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="menu-icon"></span>
          <span className="menu-icon"></span>
          <span className="menu-icon"></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="mobile-nav">
          <ul className="mobile-nav-list">
            {navMenu.map((item, index) => (
              <li key={index} className="mobile-nav-item">
                {item.dropdown ? (
                  <>
                    <div
                      className="mobile-nav-link-with-dropdown"
                      onClick={() => toggleMobileDropdown(item.label)}
                    >
                      <span>{item.label}</span>
                      <span className={`mobile-dropdown-arrow ${mobileDropdownOpen === item.label ? 'open' : ''}`}>
                        ▼
                      </span>
                    </div>
                    {mobileDropdownOpen === item.label && (
                      <div className="mobile-dropdown-menu">
                        {item.dropdown.map((dropdownItem, dropdownIndex) => (
                          <a
                            key={dropdownIndex}
                            href={dropdownItem.href}
                            className="mobile-dropdown-item"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {dropdownItem.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    href={item.href}
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
          {/* Mobile CTA Buttons */}
          <div className="mobile-cta-buttons">
            {primaryButton && (
              <a href={primaryButton.href} className="btn-primary mobile-cta">
                {primaryButton.text}
              </a>
            )}
            {secondaryButton && (
              <a href={secondaryButton.href} className="btn-secondary mobile-cta">
                {secondaryButton.text}
              </a>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;