import React from 'react';
import '../css/pricing.css';

const Pricing = ({
  title = "Choose Your Package",
  subtitle = "Flexible plans that scale with your business",
  plans = [],
  onPlanClick
}) => {
  return (
    <section className="service-pricing-section">
      <div className="service-pricing-container">
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">{subtitle}</p>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div key={index} className={`pricing-card ${plan.featured ? 'featured' : ''}`}>
              {plan.featured && <div className="featured-badge">{plan.featuredBadge || 'Most Popular'}</div>}
              <div className="pricing-header">
                <h3 className="pricing-title">{plan.name}</h3>

                {/* Monthly/recurring price */}
                {plan.price && (
                  <div className="pricing-price">
                    {!isNaN(plan.price) && <span className="price-currency">$</span>}
                    <span className={`price-amount ${isNaN(plan.price) ? 'text-price' : ''}`}>{plan.price}</span>
                    {!isNaN(plan.price) && plan.pricePeriod && <span className="price-period">{plan.pricePeriod}</span>}
                  </div>
                )}

                {/* One-time price pill */}
                {plan.oneTimePrice && (
                  <div className="one-time-pill">
                    One-time: {plan.showFromOneTime && 'from '}${plan.oneTimePrice}
                  </div>
                )}

                <p className="pricing-description">{plan.description}</p>
              </div>
              <ul className="pricing-features">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>{feature}</li>
                ))}
              </ul>
              <button
                className={`pricing-button ${plan.featured ? 'featured' : ''}`}
                onClick={() => onPlanClick(plan)}
              >
                {plan.buttonText || 'Get Started'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
