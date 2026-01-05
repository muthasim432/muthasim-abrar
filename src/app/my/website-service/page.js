'use client';

import React from 'react';
import BusinessPageLayout from '../components/businesspagelayout';
import HomeHero from '../components/homehero';
import ProblemSection from '../components/problemsection';
import ValueCurveGraph from '../components/valuecurvegraph';
import WorkGallery from '../components/workgallery';
import WhatYouGet from '../components/whatyouget';
import Pricing from '../components/pricing';
import Process from '../components/process';
import CTASection from '../components/ctasection';
import { handleDemoSignupFromHero } from '../logic/modalLogic';
import './websiteservice.css';

const WebsiteServicePage = () => {
  return (
    <BusinessPageLayout>
      {({ openModal }) => {
        const handleGetStarted = (email) => {
          handleDemoSignupFromHero(email, openModal, ['website-services']);
        };

        return (
          <div className="website-service-page">
            {/* Hero Section - Reusing HomeHero with custom content */}
            <HomeHero
              onGetStarted={handleGetStarted}
              title="Your Website Is Your Reputation"
              highlightedText="We Make Sure You Don't Overpay For A Crappy One"
              titleSuffix=""
              showAnnouncements={true}
              showFeaturesPills={true}
              featuresPills={[
                { text: 'Custom Design', className: 'live-chat' },
                { text: 'Mobile Responsive', className: 'ticketing' },
                { text: 'SEO Optimized', className: 'knowledge' },
                { text: 'Fast Loading', className: 'crm' },
                { text: '24/7 Support', className: 'chat-pages' }
              ]}
              showFreeBadge={true}
              freeBadgeText="You shouldn't get overcharged for templated website, build a professional one from $4.00/m"
              freeBadgeLink={{ text: "", href: "" }}
              emailPlaceholder="Enter your email for a free quote"
              buttonText="Get Free Quote"
            />

            {/* Problem Section */}
            <ProblemSection
              mainHeading="You are paying to lose your reputation"
              subtitle="Whether its overpriced agencies charging $200 a year and $1000+ for a templated website, 
              or using DIY AI builders. One thing is common, you are getting ripped off of your 
              time and money with a crappy website."
              problems={[
                {
                  icon: "💸",
                  title: "Agency's Overpriced Templates",
                  description: "Web agencies charge $1,000+ for basic templates. You're paying premium prices for recycled designs."
                },
                {
                  icon: "⌛",
                  title: "Thousands of hours on Website Builders",
                  description: "Prompting Replit/Bolt or using Wix/Squarespace? They just don't come out right, unless you leave your business to be a full time web designer"
                },
                {
                  icon: "📉",
                  title: "Lost Reputation",
                  description: "Crappy website costs your reputation and you are unknowingly paying for it with lost sales, time and money."
                }
              ]}
            />

            {/* Value Curve Graph */}
            <ValueCurveGraph
              title="Mayvk Excels On What Matters the Most In Website Development"
              subtitle={
                <>
                    <b> A professional website with high converting messages is what matters the most in websites. </b>
                   Unlike other agencies who sell you overpriced templates from website builders,
                  we focus on building affordable custom website tailored to your needs. Starting from only <span className="highlight-price">$4.00 per month</span>.
                </>
              }
              description="High-Converting Websites For Low Price, With First Class Customer Support"
              factors={["Quality", "Price", "Conversion Rate", "Customer Support"]}
              solutions={[
                {
                  name: "Mayvk",
                  color: "#1A0C4F",
                  values: [90, 4, 85, 90]
                },
                {
                  name: "Website Builders",
                  color: "#FF8A65",
                  values: [10,30, 50, 10]
                },
                {
                  name: "Agency Service",
                  color: "#FF69B4",
                  values: [20, 80, 60, 10]
                }
              ]}
            />

            {/* Work Gallery Section */}
            <WorkGallery
              title="Our Projects"
              subtitle="Projects we've built for our clients"
            />

            {/* Features Grid */}
            <WhatYouGet
              title="What Does The Website Come With?"
              features={[
                {
                  icon: "🎨",
                  title: "Custom Design",
                  description: "Unique designs tailored to your brand identity and business goals"
                },
                {
                  icon: "📱",
                  title: "Mobile Responsive",
                  description: "Perfect experience on all devices - desktop, tablet, and mobile"
                },
                {
                  icon: "⚡",
                  title: "Lightning Fast",
                  description: "Optimized performance for better SEO and user experience"
                },
                {
                  icon: "🔒",
                  title: "Secure & Reliable",
                  description: "SSL certificates, regular backups, and enterprise-grade security"
                },
                {
                  icon: "🔍",
                  title: "SEO Optimized",
                  description: "Built-in SEO best practices to help you rank higher on Google"
                },
                {
                  icon: "💬",
                  title: "Ongoing Support",
                  description: "24/7 support and maintenance to keep your site running smoothly"
                }
              ]}
            />

            {/* Pricing Section */}
            <Pricing
              title="Choose Your Package"
              subtitle="Flexible and generous plans that scale with your business"
              plans={[
                {
                  name: "Starter",
                  price: "4",
                  oneTimePrice: "450",     // Shows: $50 one-time
                  pricePeriod: "/month",
                  description: "Perfect for small businesses. Billed annually",
                  features: [
                    "✓ Up to 5 pages",
                    "✓ Responsive design",
                    "✓ Contact form",
                    "✓ SEO Optimization",
                    "✓ Unlimited iterations"
                  ],
                  buttonText: "Get Started"
                },
                {
                  name: "Professional",
                  price: "50",
                  oneTimePrice: "600",     // Shows: $50 one-time
                  pricePeriod: "/month",
                  showFromOneTime: true,  // Shows: "One-time: from $450"
                  description: "Best for growing businesses",
                  featured: true,
                  featuredBadge: "Most Popular",
                  
                  features: [
                    "✓ Up to 10 pages",
                    "✓ Custom design",
                    "✓ Advanced SEO",
                    "✓ AI Lead Qualification",
                    "✓ AI assistant for customer Support",
                    "✓ Calendar integration",
                    "✓ Payment integration",
                    "✓ Invoicing",
                    "✓ Mobile App to manage your business on the go",
                    "✓ Ongoing support and maintenance"
                  ],
                  buttonText: "Get Started"
                },
                {
                  name: "Custome Solutions",
                  price: "Contact Us",
                  pricePeriod: "",

                  description: "For Start-ups and Business with specific needs",
                  features: [                 
      "✓ Advanced AI and Automation",
      "✓ Multi-platform integration",
      "✓ Ongoing optimization",
      "✓ Complete custom design & features",
      "✓ Complex integrations (CRM, ERP, etc.)",
      "✓ Secure & Scalable infrastructure",
      "✓ In-person meetings",

                  ],
                  buttonText: "Contact Us"
                }
              ]}
              onPlanClick={(plan) => openModal({ selectedServices: ['website-services'] })}
            />

            {/* Process Section */}
            <Process
              title="Our Process"
              subtitle="From concept to launch in 4 simple steps"
              steps={[
                {
                  title: "Discovery",
                  description: "We learn about your business, goals, and target audience"
                },
                {
                  title: "Design",
                  description: "Create mockups and get your approval before development"
                },
                {
                  title: "Development",
                  description: "Build your website with clean code and best practices"
                },
                {
                  title: "Launch",
                  description: "Test, refine, and launch your website to the world"
                }
              ]}
            />

            {/* CTA Section */}
            <CTASection
              title="Ready to Get Started?"
              description="Let's build something amazing together"
              buttonText="Schedule a Consultation"
              onButtonClick={() => openModal({ selectedServices: ['website-services'] })}
            />
          </div>
        );
      }}
    </BusinessPageLayout>
  );
};

export default WebsiteServicePage;
