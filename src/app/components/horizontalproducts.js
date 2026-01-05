'use client';

import React, { useState, useEffect, useRef } from 'react';
import '../css/horizontalproducts.css';

const api_url = process.env.NEXT_PUBLIC_API_URL;

// Inline SVG fallback (no 404s)
const FALLBACK_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'>
      <rect width='100%' height='100%' fill='#f2f2f2'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
        font-family='Arial, Helvetica, sans-serif' font-size='24' fill='#999'>No image</text>
    </svg>`
  );

const HorizontalProducts = ({ providerId }) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [currentDot, setCurrentDot] = useState(0);
  const scrollContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function fetchProducts() {
      if (!api_url) {
        setLoading(false);
        return;
      }

      try {
        if (!providerId) {
          // Fetch the demo provider data first (like in demo page)
          const DEMO_PROVIDER_SLUG = "mayvk"; // Same as demo page

          try {
            // Get the demo provider's data
            const providerRes = await fetch(
              `${api_url}/api/shared/business-portal/by-slug/${DEMO_PROVIDER_SLUG}`,
              { cache: "no-store" }
            );

            if (providerRes.ok) {
              const providerData = await providerRes.json();

              // Now fetch products for this provider
              const productsRes = await fetch(
                `${api_url}/api/publicProducts/provider/products/by-provider/${providerData._id}?page=1&limit=20`,
                { cache: "no-store" }
              );

              const data = await productsRes.json();
              if (!mounted) return;

              const items = Array.isArray(data?.items) ? data.items : [];
              setProducts(items);
            } else {
              console.log("Could not fetch demo provider data");
              if (mounted) setProducts([]);
            }
          } catch (err) {
            console.error("Error fetching demo provider products:", err);
            if (mounted) setProducts([]);
          }
        } else {
          // Fetch for specific provider ID provided as prop
          const res = await fetch(
            `${api_url}/api/publicProducts/provider/products/by-provider/${providerId}?page=1&limit=20`,
            { cache: "no-store" }
          );
          const data = await res.json();

          if (!mounted) return;
          const items = Array.isArray(data?.items) ? data.items : [];
          setProducts(items);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        if (mounted) setProducts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchProducts();
    return () => (mounted = false);
  }, [providerId]);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scroll to update dots
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current || !isMobile) return;

      const container = scrollContainerRef.current;
      const scrollLeft = container.scrollLeft;
      const cardWidth = isMobile ? 280 : 320; // Based on CSS
      const gap = isMobile ? 16 : 24; // Based on CSS
      const fullCardWidth = cardWidth + gap;

      const index = Math.round(scrollLeft / fullCardWidth);
      setCurrentDot(index);
    };

    const container = scrollContainerRef.current;
    if (container && isMobile) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [products, isMobile]);

  // Handle dot click
  const scrollToCard = (index) => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const cardWidth = isMobile ? 280 : 320;
    const gap = isMobile ? 16 : 24;
    const fullCardWidth = cardWidth + gap;

    container.scrollTo({
      left: index * fullCardWidth,
      behavior: 'smooth'
    });
    setCurrentDot(index);
  };

  const formatAmount = (amount, hidePrice) => {
    if (hidePrice) return "Contact for pricing";
    if (amount === undefined || amount === null || amount === "") return "-";
    const num = Number(amount);
    if (Number.isNaN(num)) return String(amount);
    return `$${num.toFixed(2)}`;
  };

  return (
    <section className="horizontal-products-section">
      <div className="horizontal-products-container">
        <div className="section-header">
          <span className="section-pill">Solutions</span>
          <h2 className="section-title">Featured Products & Services</h2>
          <p className="section-subtitle">
            Discover our range of AI-powered solutions designed to help businesses
            increase revenue, cut costs, and save time.
          </p>
        </div>

        {loading ? (
          <div className="products-skeleton-horizontal">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton-card-horizontal" />
            ))}
          </div>
        ) : !products.length ? (
          <div className="products-empty">No products available yet.</div>
        ) : (
          <>
            <div className={`horizontal-scroll-container ${isMobile ? 'mobile' : ''}`} ref={scrollContainerRef}>
              <div className="horizontal-products-grid">
                {products.map((product) => {
                  // Get first image from images array
                  const firstImage = Array.isArray(product.images) && product.images.length > 0
                    ? product.images[0].url
                    : null;

                  return (
                    <div key={product._id} className="horizontal-product-card">
                      <div className="product-media">
                        <img
                          src={firstImage || FALLBACK_IMG}
                          alt={product.name}
                          className="product-photo"
                          onError={(e) => {
                            e.target.src = FALLBACK_IMG;
                          }}
                        />
                      </div>

                      <div className="product-info">
                        <div className="product-name">{product.name}</div>
                        <div className="product-desc">{product.description || '-'}</div>
                        <div className="product-amount">{formatAmount(product.amount, product.hidePrice)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dots navigation for mobile */}
            {isMobile && products.length > 1 && (
              <div className="products-dots-navigation">
                {products.map((_, index) => (
                  <button
                    key={index}
                    className={`dot ${index === currentDot ? 'active' : ''}`}
                    onClick={() => scrollToCard(index)}
                    aria-label={`Go to product ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default HorizontalProducts;
