'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function BackButton() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 1) {
      router.back();
    } else {
      // If no history, go to home page
      router.push('/');
    }
  };

  return (
    <button
      onClick={handleBack}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'fixed',
        top: '90px', // Below navbar
        left: 'clamp(16px, 4vw, 32px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 20px',
        backgroundColor: isHovered ? '#0066CC' : '#FFFFFF',
        color: isHovered ? '#FFFFFF' : '#0066CC',
        border: '2px solid #0066CC',
        borderRadius: '50px',
        fontSize: '15px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: isHovered 
          ? '0 8px 20px rgba(0, 102, 204, 0.3)' 
          : '0 2px 8px rgba(0, 0, 0, 0.1)',
        transform: isHovered ? 'translateX(-4px)' : 'translateX(0)',
      }}
      aria-label="Go back"
    >
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      <span style={{ fontSize: '15px' }}>Back</span>
    </button>
  );
}
