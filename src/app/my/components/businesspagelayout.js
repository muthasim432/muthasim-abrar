'use client';

import React from 'react';
import Header from './header';
import Footer from './footer';

/**
 * Reusable Business Page Layout
 * Wraps common elements (Header, Footer) around custom content
 */
const BusinessPageLayout = ({
  children,
  customNavigation = null,
  headerPrimaryButton = null,
  headerSecondaryButton = null,
  // Footer props
  footerColumn1 = null,
  footerColumn2 = null,
  footerShowLegal = true,
  footerShowSocialLinks = true,
  footerTagline = null,
  footerContactEmail = null,
  footerContactPhone = null
}) => {
  const openModal = () => {}; // Placeholder for compatibility

  return (
    <div className="business-page">
      <Header
        openModal={openModal}
        customNavigation={customNavigation}
        primaryButton={headerPrimaryButton}
        secondaryButton={headerSecondaryButton}
      />

      {/* Pass openModal function to children via context or props */}
      {typeof children === 'function'
        ? children({ openModal })
        : children
      }

      <Footer
        column1={footerColumn1}
        column2={footerColumn2}
        showLegal={footerShowLegal}
        showSocialLinks={footerShowSocialLinks}
        tagline={footerTagline}
        contactEmail={footerContactEmail}
        contactPhone={footerContactPhone}
      />
    </div>
  );
};

export default BusinessPageLayout;
