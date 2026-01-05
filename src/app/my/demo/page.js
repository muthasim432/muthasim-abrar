"use client";
import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProviderStatsGrid from "../../../components/providerstatgrid";
import ProviderAvatar from "../../../components/provideravatar";
import ProviderProfilePanel from "../../../components/providerprofilepanel";
import ProviderProfileOverlay from "../../../components/providerprofileoverlay";
import InvoiceModal from "../../../components/invoicemodal";
import AvailableSlotsModal from "../../../components/availableslotsmodal";
import LoginModal from "../../../components/loginmodal";
import { FaRegCommentDots, FaRegCalendarCheck } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import BusinessPortalHeader from "../../../components/businessportalheader";
import { useUnread } from "../../../context/unreadcontext";
import "../../../css/businessportal.css";
import PoweredByMayvk from "../../../components/poweredby";
// re-use the same pieces inside the mobile card:
import SidebarProducts from "../../../components/sidebarproducts";
import SidebarAbout from "../../../components/sidebarabout";
import SidebarTutorials from "../../../components/sidebartutorials";
import PlanModal from "../../../components/planmodal";
import { allPlans } from "../../../plan/planData";
import DemoSignupModal from "./demo-signupmodal";
import SuccessModal from "../components/SuccessModal";

function getOrCreateTempCustomerId() {
  if (typeof window !== "undefined") {
    let id = localStorage.getItem("bp_guest_id");
    if (!id) {
      id = "guest_" + Math.random().toString(36).slice(2);
      localStorage.setItem("bp_guest_id", id);
    }
    return id;
  }
  return null;
}

const isMobile = () =>
  typeof window !== "undefined" && window.innerWidth <= 768;

/**
 * Inline SVG fallback (never 404s) — prevents onError loops.
 * 1200x675 grey card with "No media" text.
 */
const FALLBACK_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='675'>
      <rect width='100%' height='100%' fill='#f2f2f2'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
        font-family='Arial, Helvetica, sans-serif' font-size='24' fill='#999'>No media</text>
    </svg>`
  );

/**
 * Safe media renderer:
 * - If video fails, falls back to image once.
 * - If image fails, swaps to inline SVG once.
 * - No further state changes after fallback -> no loops.
 */
function SafeMedia({ url, type }) {
  const initialIsVideo = type === "video" || (typeof url === "string" && url.endsWith(".mp4"));
  const [mode, setMode] = useState(initialIsVideo ? "video" : "image");
  const [imgSrc, setImgSrc] = useState(mode === "image" ? (url || FALLBACK_IMG) : "");
  const [fellBack, setFellBack] = useState(false);

  useEffect(() => {
    // Reset when url/type changes
    const isVid = type === "video" || (typeof url === "string" && url.endsWith(".mp4"));
    setMode(isVid ? "video" : "image");
    setImgSrc(!isVid ? (url || FALLBACK_IMG) : "");
    setFellBack(false);
  }, [url, type]);

  if (mode === "video" && !fellBack) {
    return (
      <video
        controls
        className="carousel-media"
        onError={() => {
          // One-time fallback to image
          setMode("image");
          setImgSrc(FALLBACK_IMG);
          setFellBack(true);
        }}
      >
        <source src={url} type="video/mp4" />
      </video>
    );
  }

  return (
    <img
      src={imgSrc || FALLBACK_IMG}
      className="carousel-media"
      alt=""
      onError={(e) => {
        if (!fellBack) {
          setImgSrc(FALLBACK_IMG);
          setFellBack(true);
        }
      }}
    />
  );
}

export default function DemoPage() {
  const searchParams = useSearchParams();
  const contactUsParam = (searchParams?.get("contactUs") || "").toLowerCase();
  const api_url = process.env.NEXT_PUBLIC_API_URL;
  
  // Hardcoded demo provider slug
  const DEMO_PROVIDER_SLUG = "mayvk";

  const [user, setUser] = useState(null);
  const [provider, setProvider] = useState(null);
  const [stats, setStats] = useState({});
  const [posts, setPosts] = useState([]);
  const [services, setServices] = useState([]);
  const [servicesReady, setServicesReady] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showPanel, setShowPanel] = useState(false);
  const [mobile, setMobile] = useState(isMobile());
  const [tab, setTab] = useState("reviews");
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invoicePreviewData, setInvoicePreviewData] = useState({});
  const [showSlotsModal, setShowSlotsModal] = useState(false);
  const [slotsModalDate, setSlotsModalDate] = useState(null);
  const [slotsModalSlots, setSlotsModalSlots] = useState([]);
  const [slotsModalProducts, setSlotsModalProducts] = useState([]);
  const [slotsModalSelectedSlot, setSlotsModalSelectedSlot] = useState(null);
  const [showSidebar, setShowSidebar] = useState(!isMobile());
  const [loginAuthMode, setLoginAuthMode] = useState("signup");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginModalData, setLoginModalData] = useState({});
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successModalData, setSuccessModalData] = useState({});
  const { unreadCount = 0 } = useUnread();

  // mobile tabs (the 3 tabs rendered inside the mobile card)
  const [mobileSidebarTab, setMobileSidebarTab] = useState("about");

  const autoOpenedFromParam = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userVal = localStorage.getItem("user");
      setUser(userVal ? JSON.parse(userVal) : null);
    }
    const handleResize = () => {
      const m = isMobile();
      setMobile(m);
      setShowSidebar(!m);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchProviderData = useCallback(async () => {
    try {
      const pRes = await fetch(
        `${api_url}/api/shared/business-portal/by-slug/${DEMO_PROVIDER_SLUG}?t=${Date.now()}`
      );
      if (!pRes.ok) throw new Error("Demo provider not found");
      const pData = await pRes.json();
      setProvider(pData);

      let headers = { "Content-Type": "application/json" };
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (token) headers.Authorization = `Bearer ${token}`;
      const statRes = await fetch(`${api_url}/api/shared/stats/bulk`, {
        method: "POST",
        headers,
        body: JSON.stringify({ providerIds: [pData._id] }),
      });
      const { stats = [] } = await statRes.json();
      setStats(stats[0] || {});

      const postRes = await fetch(
        `${api_url}/api/customer/previewpost/latest-posts/${pData._id}`
      );
      let data = await postRes.json();
      if (!Array.isArray(data)) data = [];
      setPosts(data);
    } catch (err) {
      console.error("Demo provider data fetch failed:", err);
      setProvider(null);
      setPosts([]);
    }
  }, [api_url]);

  useEffect(() => {
    fetchProviderData();
  }, [fetchProviderData]);

  useEffect(() => {
    window.addEventListener("focus", fetchProviderData);
    return () => window.removeEventListener("focus", fetchProviderData);
  }, [fetchProviderData]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${api_url}/api/customer/services`);
        const svc = await res.json();
        setServices(Array.isArray(svc) ? svc : []);
        setServicesReady(true);
      } catch {
        setServices([]);
        setServicesReady(true);
      }
    })();
  }, [api_url]);

  const matchingServices = services.filter(
    (svc) =>
      svc.name?.toLowerCase() === provider?.businessCategory?.toLowerCase()
  );

  console.log("Demo page - All services:", services);
  console.log("Demo page - Provider businessCategory:", provider?.businessCategory);
  console.log("Demo page - Matching services:", matchingServices);

  const openPanel = (tabName) => {
    console.log("Demo page openPanel called with tabName:", tabName);
    console.log("Provider:", provider);
    console.log("Matching services:", matchingServices);
    const svc = matchingServices[0] || null;
    console.log("Selected service:", svc);
    setSelectedService(svc);
    setTab(tabName);
    setShowPanel(true);
    console.log("Panel should now be open");
  };

  useEffect(() => {
    if (autoOpenedFromParam.current) return;
    if (!provider) return;
    if (!servicesReady) return;
    if (!contactUsParam) return;

    const wantsMessages =
      contactUsParam === "message" ||
      contactUsParam === "messages" ||
      contactUsParam === "chat";

    if (wantsMessages) {
      autoOpenedFromParam.current = true;
      openPanel("messages");
    }
  }, [contactUsParam, provider, servicesReady]);

  const handleDeposit = async ({ method, amount }) => {
    setShowInvoiceModal(false);
    if (!user) {
      alert("Please log in to pay.");
      return;
    }
    try {
      const body = {
        userId: user._id,
        providerId: provider._id,
        serviceId: selectedService?._id,
        amount,
        payMethod: method,
        description: invoicePreviewData.description,
        service: invoicePreviewData.service,
        scheduledDate: invoicePreviewData.scheduledDate,
        duration: invoicePreviewData.duration,
        title:
          invoicePreviewData.title ||
          invoicePreviewData.service ||
          (selectedService && selectedService.name) ||
          "Service",
      };

      const res = await fetch(
        `${api_url}/api/customer/payment/web/checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(body),
        }
      );
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch {
      alert("Failed to start payment.");
    }
  };

  // ---- Slides (memoized) + guaranteed placeholder if nothing to show ----
  const slides = useMemo(() => {
    if (Array.isArray(posts) && posts.length) {
      const flat = posts
        .flatMap((post) =>
          post?.mediaUrls?.length
            ? post.mediaUrls.map((m) => ({ url: m.url, type: m.type }))
            : []
        )
        .filter((m) => m && m.url);
      if (flat.length) return flat;
    }
    // Single safe fallback — inline SVG via SafeMedia stops any error loops.
    return [
      {
        url:
          provider?.headerImageUrl ||
          provider?.businessLogoUrl ||
          "", // SafeMedia will render FALLBACK_IMG if empty
        type: "image",
      },
    ];
  }, [posts, provider?.headerImageUrl, provider?.businessLogoUrl]);

  if (!provider) return null;

  const nameColor =
    provider?.businessNameColor || provider?.iconColor || undefined;
  const nameWeight = provider?.businessNameWeight ?? "600";
  const nameFontFamily = provider?.businessNameFont || "inherit";

  return (
    <div
      className={`job-responses-layout${
        showSidebar ? " with-sidebar" : ""
      } business-portal-page`}
    >
      {/* Header */}
<BusinessPortalHeader
  providerLogoUrl={provider.businessLogoUrl}
  providerBusinessName={provider.businessName}
  headerBg={provider.headerBgColor}
  iconColor={provider.iconColor}
  headerIconColor={provider.headerIconColor}
  unreadCount={unreadCount}
  nameColor={nameColor}
  nameWeight={nameWeight}
  nameFontFamily={nameFontFamily}
  showHeaderIcons={false}
/>


      <div
        className="job-responses-content"
        style={{
          marginLeft: !mobile ? "40px" : "0px",
          transition: "margin-left 0.2s",
        }}
      >
        <div className="main-section">
          {/* Provider Card */}
          <div className="job-responses-list">
            <div className="job-responses-item">
              <div className="latest-posts-carousel">
                <Slider
                  dots
                  arrows={false}
                  speed={500}
                  slidesToShow={1}
                  slidesToScroll={1}
                  infinite={slides.length > 1}
                >
                  {slides.map(({ url, type }, i) => (
                    <div className="carousel-item" key={i}>
                      <SafeMedia url={url} type={type} />
                    </div>
                  ))}
                </Slider>
              </div>

              <div className="response-post-caption">
                <ProviderAvatar
                  name={provider.businessName || provider.name}
                  imageUrl={
                    provider.businessLogoUrl || provider.profileImageUrl
                  }
                  size={36}
                />
                <div className="post-buttons">
                  <button
                    className="try-it-free-btn"
                    style={{
                      marginTop: 8,
                      background: provider.iconColor || "#1A0C4F",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      padding: "12px 24px",
                      fontWeight: 600,
                      fontSize: 16,
                      cursor: "pointer",
                      boxShadow: "0 4px 12px rgba(26, 12, 79, 0.3)",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 6px 16px rgba(26, 12, 79, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 4px 12px rgba(26, 12, 79, 0.3)";
                    }}
                    onClick={() => setShowPlanModal(true)}
                  >
                    Try it for free
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* --- MOBILE: 3 tabs (same components), right under the carousel --- */}
          {mobile && (
            <div
              className="mobile-info-card"
              style={{
                border: "1px solid #eee",
                borderRadius: 12,
                background: "transparent",
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                padding: 16,
                marginTop: 12,
              }}
            >
                {/* Tabs header */}
              {/* Tabs header (matching JobRequestsPage style) */}
              <div className="tabs-container" style={{width: "100%"}}>
                {[
                      { id: "about", label: "About" },
                
                  { id: "products", label: "Products" },
                  { id: "tutorial", label: "Tutorial" },

                ].map((t) => (
                  <button
                    key={t.id}
                    className={`tab-button ${mobileSidebarTab === t.id ? "active" : ""}`}
                    onClick={() => setMobileSidebarTab(t.id)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>


              {/* Tabs content (reuse the same components as desktop sidebar) */}
              <div className="businessportal-left-content">
                {mobileSidebarTab === "tutorial" && (
                  <SidebarTutorials />
                )}
                {mobileSidebarTab === "products" && (
                  <SidebarProducts provider={provider} />
                )}
                {mobileSidebarTab === "about" && (
                  <SidebarAbout provider={provider} onMessageClick={() => openPanel("messages")} />
                )}
              </div>
            </div>
          )}

          {/* Overlay + Sliding Panel */}
          {showPanel && (
            <>
              {!mobile && (
                <ProviderProfileOverlay onClick={() => setShowPanel(false)} />
              )}
              <ProviderProfilePanel
                provider={provider}
                jobId={null}
                serviceId={selectedService ? selectedService._id : null}
                user={user}
                customerId={
                  user && user._id ? user._id : getOrCreateTempCustomerId()
                }
                jobCompleted={false}
                jobConfirmed={false}
                providerTab={tab}
                setProviderTab={setTab}
                closePanel={() => setShowPanel(false)}
                showReviewModal={false}
                setShowReviewModal={() => {}}
                showInvoiceModal={showInvoiceModal}
                setShowInvoiceModal={setShowInvoiceModal}
                setInvoicePreviewData={setInvoicePreviewData}
                showSlotsModal={showSlotsModal}
                setShowSlotsModal={setShowSlotsModal}
                slotsModalDate={slotsModalDate}
                setSlotsModalDate={setSlotsModalDate}
                slotsModalSlots={slotsModalSlots}
                setSlotsModalSlots={setSlotsModalSlots}
                slotsModalProducts={slotsModalProducts}
                setSlotsModalProducts={setSlotsModalProducts}
                slotsModalSelectedSlot={slotsModalSelectedSlot}
                setSlotsModalSelectedSlot={setSlotsModalSelectedSlot}
                isBusinessPortal={true}
                showLoginModal={showLoginModal}
                setShowLoginModal={setShowLoginModal}
                loginModalData={loginModalData}
                setLoginModalData={setLoginModalData}
              />
            </>
          )}
        </div>

        {/* --- DESKTOP ONLY: 3-tab sidebar on the right --- */}
        {!mobile && showSidebar && (
          <aside
            className="job-sidebar"
            style={{ minWidth: 0 }}
          >
            <div className="tabs-container">
              <button
                onClick={() => setMobileSidebarTab("about")}
                className={`tab-button ${mobileSidebarTab === "about" ? "active" : ""}`}
              >
                About
              </button>
              <button
                onClick={() => setMobileSidebarTab("products")}
                className={`tab-button ${mobileSidebarTab === "products" ? "active" : ""}`}
              >
                Products
              </button>
              <button
                onClick={() => setMobileSidebarTab("tutorial")}
                className={`tab-button ${mobileSidebarTab === "tutorial" ? "active" : ""}`}
              >
                Tutorial
              </button>
            </div>

            <div className="businessportal-left-content" style={{ width: "100%", minWidth: 0 }}>
              {mobileSidebarTab === "tutorial" && (
                <SidebarTutorials />
              )}
              {mobileSidebarTab === "products" && (
                <SidebarProducts provider={provider} />
              )}
              {mobileSidebarTab === "about" && (
                <SidebarAbout provider={provider} onMessageClick={() => openPanel("messages")} />
              )}
            </div>
          </aside>
        )}
      </div>

      <InvoiceModal
        isOpen={showInvoiceModal}
        invoiceData={invoicePreviewData}
        onClose={() => setShowInvoiceModal(false)}
        onConfirm={handleDeposit}
      />

      <AvailableSlotsModal
        open={showSlotsModal}
        onClose={() => setShowSlotsModal(false)}
        date={slotsModalDate}
        providerId={provider?._id}
        products={slotsModalProducts}
        selectedSlot={slotsModalSelectedSlot}
        onSlotSelect={setSlotsModalSelectedSlot}
        jobRequestId={null}
        serviceId={selectedService ? selectedService._id : null}
        serviceName={selectedService ? selectedService.name : ""}
        customerName={user?.name}
        providerName={provider?.name}
      />

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          setShowAuthModal={setShowLoginModal}
          authMode={loginAuthMode}
          setAuthMode={setLoginAuthMode}
          loginModalData={loginModalData}
          providerId={loginModalData.providerId}
          serviceId={loginModalData.serviceId}
          serviceName={loginModalData.serviceName}
          summaryDetails={loginModalData.summaryDetails}
        />
      )}

      <PlanModal
        isOpen={showPlanModal}
        onClose={() => setShowPlanModal(false)}
        allPlans={allPlans}
        onSignUp={(plan) => {
          console.log("Selected plan:", plan);
          setShowPlanModal(false);
          setShowSignupModal(true);
        }}
      />

      <DemoSignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSubmit={(result) => {
          setSuccessModalData({
            title: result.title,
            message: result.message,
            isError: !result.success
          });
          setShowSuccessModal(true);
        }}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title={successModalData.title}
        message={successModalData.message}
        isError={successModalData.isError}
      />

      <PoweredByMayvk />
    </div>
  );
}