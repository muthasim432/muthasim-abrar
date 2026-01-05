'use client';

import React from 'react';
import BusinessPageLayout from './components/businesspagelayout';
import HomeHero from './components/homehero';
import WorkGallery from './components/workgallery';
import WhyUs from './components/whyus';
import Comparison from './components/comparison';
import CTASection from './components/ctasection';
import './css/businesshomepage.css';
import ProjectShowcase from './components/projectshowcase';
import TestimonialSection from './components/testimonialsection';
import { Code2, Handshake, MessageSquareText } from 'lucide-react';

// Custom navigation for portfolio page
const portfolioNavigation = [
  { label: 'About', href: '#about' },
  { label: 'AI Project', href: '#ai-project' },
  { label: 'Why Me', href: '#why-me' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Skills', href: '#skills' }
];

// Footer content for portfolio
const experienceProjects = {
  title: 'Experience',
  links: [
    { name: 'AI Customer Support Agent', href: '#ai-project' },
    { name: 'E-commerce Platform', href: '#portfolio' },
    { name: 'Mobile Ridesharing App', href: '#portfolio' },
    { name: 'Business Management System', href: '#portfolio' },
    { name: 'Real-time Chat Application', href: '#portfolio' }
  ]
};

const skillsList = {
  title: 'Skills',
  links: [
    { name: 'Full Stack Development', href: '#skills' },
    { name: 'AI & Machine Learning', href: '#skills' },
    { name: 'Mobile App Development', href: '#skills' },
    { name: 'Cloud & DevOps', href: '#skills' },
    { name: 'Database Design', href: '#skills' }
  ]
};

const BusinessHomePage = () => {
  return (
    <BusinessPageLayout
      customNavigation={portfolioNavigation}
      headerPrimaryButton={{ text: 'Hire Me', href: 'tel:0451955140' }}
      headerSecondaryButton={{ text: 'Email', href: 'mailto:mutasimabrar19@gmail.com' }}
      footerColumn1={experienceProjects}
      footerColumn2={skillsList}
      footerShowLegal={false}
      footerShowSocialLinks={false}
      footerTagline="Full Stack Developer & AI Solutions Builder. Available for full-time opportunities and freelance projects."
      footerContactEmail="mutasimabrar19@gmail.com"
      footerContactPhone="+61 451 955 140"
    >
      {({ openModal }) => {
        return (
          <div className="business-homepage-content">
            <section id="about">
              <HomeHero
                title="Hi, I'm Muthasim Abrar"
                highlightedText=""
                titleSuffix="I Build Digital Solutions."
                useTypingAnimation={true}
                showAnnouncements={false}
                showEmailInput={false}
                primaryButton={{ text: 'Hire Me', href: 'tel:0451955140' }}
                secondaryButton={{ text: 'Email', href: 'mailto:mutasimabrar19@gmail.com' }}
                typingPhrases={[
                  "Full Stack Developer",
                  "AI Solutions Builder",
                  "Mobile App Developer",
                  "Web Developer",
                  "Software Engineer"
                ]}
                featuresPills={[
                  { text: 'Web Development', className: 'live-chat' },
                  { text: 'AI Integration', className: 'lead-generation' },
                  { text: 'Mobile Apps', className: 'knowledge' },
                  { text: 'Backend Systems', className: 'crm' },
                  { text: 'Cloud & DevOps', className: 'chat-pages' }
                ]}
                freeBadgeText="Available for full-time opportunities and freelance projects"
              />

              {/* Testimonial Section - Commented Out */}
              {/* <TestimonialSection
                title="What People Say About Me"
                subtitle="Don't just take my word for it. Here's what clients and colleagues have to say about working with me."
              /> */}
            </section>

            {/* AI Agent In Action */}
            <section id="ai-project">
              <WorkGallery
                title="AI Agent In Action"
                subtitle="See the AI customer support agent I built - handling escalations, qualifying leads, and learning from interactions."
                showPill={true}
                pillText="My AI Project"
                projects={[
                  {
                    id: 1,
                    title: "Smart Escalation",
                    image: "/ourwork/aiagent.svg",
                    category: "Video Demo",
                    type: "video",
                    videoUrl: "https://youtube.com/shorts/_geEbsvqguM?feature=share"
                  },
                  {
                    id: 2,
                    title: "Lead Qualification",
                    image: "/ourwork/chatapp.png",
                    category: "Video Demo",
                    type: "video",
                    videoUrl: "https://youtube.com/shorts/SLCNpK3M0qw?feature=share"
                  },
                  {
                    id: 3,
                    title: "Logical Intelligence",
                    image: "/ourwork/mobilehome.svg",
                    category: "Video Demo",
                    type: "video",
                    videoUrl: "https://youtube.com/shorts/AbWSAkX3rtg?feature=share"
                  },
                  {
                    id: 4,
                    title: "Train It By Talking To It",
                    image: "/ourwork/chatapp.png",
                    category: "Video Demo",
                    type: "video",
                    videoUrl: "https://youtube.com/shorts/F06Q7HmEjEw?feature=share"
                  },
                  {
                    id: 5,
                    title: "Smart Link Sharing",
                    image: "/ourwork/chatapp.png",
                    category: "Video Demo",
                    type: "video",
                    videoUrl: "https://youtube.com/shorts/JjMpA-v9EIM?si=WCAQcGdsfZOLTo4b"
                  }
                ]}
              />
            </section>

            {/* Why Hire Me Section */}
            <section id="why-me">
              <WhyUs
                showCTA={true}
                pillText="Why Hire Me"
                title="Why Work With Me"
                subtitle="A versatile professional who bridges the gap between technical and business"
                features={[
                  {
                    id: 1,
                    title: 'Full Stack Developer',
                    description: 'From frontend to backend, databases to deployment - I build complete solutions. React, Next.js, Node.js, Python, AI integrations, mobile apps. Whatever the stack, I deliver.',
                    icon: <Code2 size={32} strokeWidth={1.5} />,
                    color: '#4CAF50'
                  },
                  {
                    id: 2,
                    title: 'Sales & Business Acumen',
                    description: 'Not just a coder who hides behind a screen. I understand business needs, can pitch ideas, close deals, and communicate with clients and stakeholders effectively.',
                    icon: <Handshake size={32} strokeWidth={1.5} />,
                    color: '#2196F3'
                  },
                  {
                    id: 3,
                    title: 'Technical Translator',
                    description: 'I break down complex technical concepts into simple, non-technical language. Perfect for bridging the gap between dev teams and business stakeholders who need to understand what\'s happening.',
                    icon: <MessageSquareText size={32} strokeWidth={1.5} />,
                    color: '#FF9800'
                  }
                ]}
                primaryButton={{ text: 'Hire Me', href: 'tel:0451955140' }}
                secondaryButton={{ text: 'Email', href: 'mailto:mutasimabrar19@gmail.com' }}
              />
            </section>

            {/* Portfolio - Work Gallery */}
            <section id="portfolio">
              <WorkGallery
                title="My Portfolio"
                subtitle="Projects I've built - from web applications to AI solutions and mobile apps."
                showPill={true}
                pillText="My Work"
              />
            </section>

            {/* Tech Stack */}
            <section id="skills">
              <Comparison
                showCTA={false}
                pillText="Tech Stack"
                title="Technologies I Work With"
                subtitle="Modern tools and frameworks I use to build scalable, high-performance solutions"
              />
            </section>

            {/* CTA Section */}
            <CTASection
              title="Let's Work Together"
              description="Looking for a developer who can bring your ideas to life? Let's connect."
              primaryButton={{ text: 'Hire Me', href: 'tel:0451955140' }}
              secondaryButton={{ text: 'Email', href: 'mailto:mutasimabrar19@gmail.com' }}
            />
          </div>
        );
      }}
    </BusinessPageLayout>
  );
};

export default BusinessHomePage;
