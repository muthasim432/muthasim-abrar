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
import './aiagent.css';

const AIAgentPage = () => {
  return (
    <BusinessPageLayout>
      {({ openModal }) => {
        const handleGetStarted = (email) => {
          handleDemoSignupFromHero(email, openModal, ['ai-customer-assistant']);
        };

        return (
          <div className="ai-agent-page">
            {/* Hero Section - Reusing HomeHero with custom content */}
            <HomeHero
              onGetStarted={handleGetStarted}
              title="Simplest and Smartest AI Agent for Customer Support"
              useTypingAnimation={true}
              typingPhrases={[
                "Can Qualify Leads",
                "No Flowcharts Needed",
                "Train It Like a Human",
                "Learns From Escalations",
                "Handles Complex Logic",
                "Understands Context",
                "Naturally Sounding",

              ]}
              titleSuffix=""
              showAnnouncements={true}
              showFeaturesPills={true}
              featuresPills={[
                

  { text: 'Chat To Train', className: 'ticketing' },
  { text: 'Learns From File Uploads', className: 'live-chat' },
  { text: 'Understands Links', className: 'knowledge' },
  { text: 'Qualifies Leads', className: 'crm' },
  { text: 'Smart Escalation', className: 'chat-pages' }
              ]}
              showFreeBadge={true}
              freeBadgeText={
                <>
                  Customer Support Agent Shouldn't Be Expensive And Hard To Set Up.
                  <br />
                  Try Mayvk, Starting From Only <span className="highlight-price">$29.99/month</span>.
                </>
              }
              freeBadgeLink={{ text: "", href: "" }}
              emailPlaceholder="Enter your email to get started"
              buttonText="Start Free Trial"
            />

            {/* Problem Section */}
            <ProblemSection
              mainHeading="Typical Chat Bots Are Not Worth The Price."
              subtitle="Typical chat bots are robotic, dumb and frustrating to set up. 
              You spend more time on setting up tools like Microsoft Copilot than actually helping customers."
              problems={[
                {
                  icon: "💰",
                  title: "Expensive",
                  description: "Tools Like Copilot and Intercom charge exorbitant fees, often on a per user basis, that can add up to the cost pretty quickly." },
                {
                  icon: "🤖",
                  title: "Sounds Robotic and dumb",
                  description: "Can't handle complex queries and frustrates customers more than helping them. You end up losing reputation and sales."
                },
                {
                  icon: "🔧",
                  title: "Complicated Setup",
                  description: "The tool that promises to save you time ends up taking more time to set up and manage. You need to create flowcharts, rules etc and the AI still keeps forgetting."
                },
                {
                  icon: "📉",
                  title: "Lost Sales & Reputation",
                  description: "Poor customer support directly impacts your bottom line. Frustrated customers leave bad reviews and never come back."
                }
              ]}
            />


      {/* Work Gallery Section */}
            <WorkGallery
              title="AI Agent In Action"
              subtitle="See how our AI agent can transform customer support for businesses"
              showCTA={true}
              ctaButtonText="Start Free Trial"
              onCtaClick={() => openModal({ selectedServices: ['ai-customer-assistant'] })}
              projects={[
                {
                  id: 1,
                  title: "Smart Escalation.",
                  image: "/ourwork/aiagent.svg",
                  category: "Video Demo",
                  type: "video",
                  videoUrl: "https://youtube.com/shorts/_geEbsvqguM?feature=share"
                },
                {
                  id: 2,
                  title: "Lead Qualification.",
                  image: "/ourwork/chatapp.png",
                  category: "Video Demo",
                  type: "video",
                  videoUrl: "https://youtube.com/shorts/SLCNpK3M0qw?feature=share"
                },

                {
                  id: 3,
                  title: "Logical Intelligence.",
                  image: "/ourwork/mobilehome.svg",
                  category: "Video Demo",
                  type: "video",
                  videoUrl: "https://youtube.com/shorts/AbWSAkX3rtg?feature=share"
                },
                {
                  id: 4,
                  title: "Train It By Talking To It.",
                  image: "/ourwork/chatapp.png",
                  category: "Video Demo",
                  type: "video",
                  videoUrl: "https://youtube.com/shorts/F06Q7HmEjEw?feature=share"
                },
                        {
                  id: 5,
                  title: "Smart Link Sharing.",
                  image: "/ourwork/chatapp.png",
                  category: "Video Demo",
                  type: "video",
                  videoUrl: "https://youtube.com/shorts/JjMpA-v9EIM?si=WCAQcGdsfZOLTo4b"
                },
                         
              ]}
            />


            {/* Value Curve Graph */}
            <ValueCurveGraph
              title="Mayvk AI Is Simpler, Smarter and Lower Cost"
              subtitle={
                <>
                  You can train the AI by chatting with it, or by uploading files and links. It understands your business
                  contexts and logics, can qualify leads and doesn't forget. When it can't answer a question, it escalates, learns , gets
                  back to the customers and reuses the learning in the future interactions.
                </>
              }
              description="Customer Support AI Agents That Is Smart, Easy To Setup & Affordable"
              factors={["Logical Intelligence", "Ease of Use", "Conversational Ability", "Price", "Smart Learning", "Lead Qualification"]}
              solutions={[
                {
                  name: "Mayvk AI Agent",
                  color: "#1A0C4F",
                  values: [95, 90, 90, 20, 90, 90]
                },
                {
                  name: "Co pilot Studio",
                  color: "#FF8A65",
                  values: [20, 10, 60, 90, 10, 5]
                },
                {
                  name: "Zendesk",
                  color: "#FF69B4",
                  values: [20, 30, 60, 90, 10, 5]
                }
              ]}
            />

      

            {/* Features Grid */}
            <WhatYouGet
              title="What Makes Our AI Agent Different?"
              features={[
                {
                  icon: "💡",
                  title: "Context-Aware Intelligence",
                  description: "Understands your products, services, and business contexts to provide accurate, helpful responses"
                },
                {
                  icon: "💬",
                  title: "Easy Setup & Training",
                  description: "Instead of complicated flowcharts, simply chat with the AI to train it on your business workflows"
                },
                {
                  icon: "🎯",
                  title: "Lead Qualification",
                  description: "Tell the AI about how you qualify leads, and it will qualify them smartly, just like a human agent"
                },
                {
                  icon: "🌐",
                  title: "Multi-lingual Support",
                  description: "Mayvk can understand and respond in multiple languages, making it ideal for global businesses"
                },
                {
                  icon: "🧠",
                  title: "Continuous Learning",
                  description: "Gets smarter over time through customer interactions"
                },
                {
                  icon: "👥",
                  title: "Smart Escalation",
                  description: "When it can't answer, it escalates to a human and learns from the interaction, follows up with the customers with the learned data and reuses it in future interactions"
                }
              ]}
            />

            {/* Pricing Section */}
            <Pricing
              title="Pricing"
              subtitle={
                <>
                  <span className="highlight-price ">Lifetime Access: First 100 Verified Users</span>
                </>
              }
              plans={[
                // {
                //   name: "Starter",
                //   price: "19.99",
                //   pricePeriod: "/month",
                //   description: "Perfect for small businesses",
                //   features: [
                //     "✓ Up to 500 conversations/month",
                //     "✓ Basic AI training on your business",
                //     "✓ Website chat widget",
                //     "✓ Email support integration",
                //     "✓ Basic analytics dashboard"
                //   ],
                //   buttonText: "Start Free Trial"
                // },
                
                
                {
                  name: "Early Adopter's Deal",
                  price: "29.99",
                  pricePeriod: "/month",
                  description: "1 month free trial. No credit card required",
                  featured: true,
                  featuredBadge: "First 100 verified Users",
                  features: [
                    "✓ Unlimited conversations",
                    "✓ Unlimited Users",
                    "✓ AI training through chat, file uploads & links",
                    "✓ Multi-lingual support",
                    "✓ Lead qualification",
                    "✓ CRM integration",
                    "✓ Smart escalation & learning",
                    "✓ One tap invoicing",
                    "✓ AI email composer",
                    "✓ Brand email and invoicing",
                    "✓ Automated follow-ups",
                  ],
                  buttonText: "Start Free Trial"
                },



                // {
                //   name: "Enterprise",
                //   price: "Contact Us",
                //   pricePeriod: "",
                //   description: "For businesses with complex needs",
                //   features: [
                //     "✓ Unlimited conversations",
                //     "✓ Fully custom AI training",
                //     "✓ Multi-language support",
                //     "✓ Advanced integrations (CRM, ERP, etc.)",
                //     "✓ Dedicated account manager",
                //     "✓ Custom AI workflows",
                //     "✓ White-label options",
                //     "✓ 99.9% uptime SLA"
                //   ],
                //   buttonText: "Contact Sales"
                // }
              ]}
              onPlanClick={(plan) => openModal({ selectedServices: ['ai-customer-assistant'] })}
            />

            {/* Process Section */}
            <Process
              title="Get Started in 3 Simple Steps"
              subtitle="Deploy your AI customer support agent in minutes, not months"
              steps={[
                {
                  title: "Sign Up For a Free Trial",
                  description: "Upload your FAQs, product docs, and knowledge base. We'll train the AI on your business."
                },
                {
                  title: "Setup & Customize",
                  description: "Get a call back from our team to help you set up and customize the AI agent for your business"
                },
                {
                  title: "Go Live In Minutes",
                  description: "Instead of paying agencies large sum to help you set up an AI Agent, you can set up Mayvk just by talking to it and go live in minutes."
                },
         
              ]}
            />

            {/* CTA Section */}
            <CTASection
              title="Ready to Transform Your Customer Support?"
              description={
                <>
                  Be one of the first 100 verified users to get <span className="highlight-price">lifetime access</span> for only <span className="highlight-price">$29.99/month</span>.
                </>
              }
              buttonText="Start Free Trial"
              onButtonClick={() => openModal({ selectedServices: ['ai-customer-assistant'] })}
            />
          </div>
        );
      }}
    </BusinessPageLayout>
  );
};

export default AIAgentPage;
