'use client';

import React, { useState } from 'react';
import Header from './header';
import Footer from './footer';
import DemoSignupModal from '../demo/demo-signupmodal';
import ComingSoonModal from './ComingSoonModal';
import { useModalLogic } from '../logic/modalLogic';

/**
 * Reusable Business Page Layout
 * Wraps common elements (Header, Footer, Modal) around custom content
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
  const { isModalOpen, modalData, openModal, closeModal } = useModalLogic();
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

  const openComingSoonModal = () => {
    setIsComingSoonOpen(true);
  };

  const closeComingSoonModal = () => {
    setIsComingSoonOpen(false);
  };

  const handleJoinWaitList = () => {
    openModal({ selectedServices: ['lead-generation-service'] });
  };

  return (
    <div className="business-page">
      <Header
        openModal={openModal}
        openComingSoonModal={openComingSoonModal}
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

      {/* Demo Signup Modal */}
      <DemoSignupModal
        isOpen={isModalOpen}
        onClose={closeModal}
        initialEmail={modalData.email}
        initialSelectedServices={modalData.selectedServices}
      />

      {/* Coming Soon Modal */}
      <ComingSoonModal
        isOpen={isComingSoonOpen}
        onClose={closeComingSoonModal}
        onJoinWaitList={handleJoinWaitList}
      />
    </div>
  );
};

export default BusinessPageLayout;
