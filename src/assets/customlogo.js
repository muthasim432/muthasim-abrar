"use client";
import React, { useEffect, useState } from "react";

export default function CustomIcon() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Only run in browser
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Set on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <svg
      width="50"
      height="53"
      viewBox="0 0 50 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        borderRadius: 8,
        marginTop: isMobile ? 0 : 0,
      }}
    >
      <rect width="50" height="53" fill="none" />
      <circle cx="25" cy="11" r="7" fill="#d1d1db" />
      <circle cx="10" cy="39" r="7" fill="#d1d1db" />
      <circle cx="40" cy="39" r="7" fill="#d1d1db" />
      {/* Left curve */}
      <path d="M18 16 Q7 27, 10 39" stroke="#d1d1db" strokeWidth="3" fill="none" />
      {/* Right curve */}
      <path d="M32 16 Q43 27, 40 39" stroke="#d1d1db" strokeWidth="3" fill="none" />
      {/* Top arc */}
      <path d="M18 16 Q25 22, 32 16" stroke="#d1d1db" strokeWidth="3" fill="none" />
      {/* Bottom arc */}
      <path d="M10 39 Q25 51, 40 39" stroke="#d1d1db" strokeWidth="3" fill="none" />
    </svg>
  );
}
