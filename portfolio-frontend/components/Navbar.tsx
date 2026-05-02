'use client';

import { useState } from 'react';
import Link from 'next/link';
import DarkModeToggle from './DarkModeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav style={{ 
      position: 'fixed !important' as any, 
      top: '0 !important' as any,
      left: '0 !important' as any,
      right: '0 !important' as any,
      zIndex: 9999, 
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid #E5E7EB',
      boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.05)',
      width: '100%',
      maxWidth: '100vw',
      overflowX: 'hidden'
    }}>
      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto',
        padding: '0 clamp(32px, 6vw, 80px)'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          height: '70px' 
        }}>
          {/* Logo */}
          <Link href="/" style={{ 
            fontSize: '22px', 
            fontWeight: '700',
            color: '#1A1A1A',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            height: '100%'
          }}>
            <span style={{ color: '#1A1A1A' }}>Kur</span>
            <span style={{ color: '#1B4332', marginLeft: '4px' }}> Malual.</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center" style={{ 
            gap: '32px',
            height: '100%'
          }}>
            <a href="/#home" style={{ 
              color: '#4A5568', 
              fontWeight: '500', 
              fontSize: '15px', 
              transition: 'color 0.2s', 
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              height: '100%'
            }}
              onMouseOver={(e) => e.currentTarget.style.color = '#1B4332'}
              onMouseOut={(e) => e.currentTarget.style.color = '#4A5568'}>
              Home
            </a>
            <a href="/#about" style={{ 
              color: '#4A5568', 
              fontWeight: '500', 
              fontSize: '15px', 
              transition: 'color 0.2s', 
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              height: '100%'
            }}
              onMouseOver={(e) => e.currentTarget.style.color = '#1B4332'}
              onMouseOut={(e) => e.currentTarget.style.color = '#4A5568'}>
              About
            </a>
            <a href="/#education" style={{ 
              color: '#4A5568', 
              fontWeight: '500', 
              fontSize: '15px', 
              transition: 'color 0.2s', 
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              height: '100%'
            }}
              onMouseOver={(e) => e.currentTarget.style.color = '#1B4332'}
              onMouseOut={(e) => e.currentTarget.style.color = '#4A5568'}>
              Education
            </a>
            <a href="/#skills" style={{ 
              color: '#4A5568', 
              fontWeight: '500', 
              fontSize: '15px', 
              transition: 'color 0.2s', 
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              height: '100%'
            }}
              onMouseOver={(e) => e.currentTarget.style.color = '#1B4332'}
              onMouseOut={(e) => e.currentTarget.style.color = '#4A5568'}>
              Skills
            </a>
            <a href="/#projects" style={{ 
              color: '#4A5568', 
              fontWeight: '500', 
              fontSize: '15px', 
              transition: 'color 0.2s', 
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              height: '100%'
            }}
              onMouseOver={(e) => e.currentTarget.style.color = '#1B4332'}
              onMouseOut={(e) => e.currentTarget.style.color = '#4A5568'}>
              Projects
            </a>
            <a 
              href="/#contact" 
              style={{
                padding: '10px 24px',
                backgroundColor: '#1B4332',
                color: '#FFFFFF',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '15px',
                border: 'none',
                transition: 'all 0.2s',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 2px 8px rgba(27, 67, 50, 0.3)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(27, 67, 50, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(27, 67, 50, 0.3)';
              }}
            >
              Contact
            </a>
            
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              height: '100%'
            }}>
              <DarkModeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center" style={{ gap: '12px' }}>
            <DarkModeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                padding: '8px',
                borderRadius: '6px',
                border: '1px solid #E5E7EB',
                backgroundColor: '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              type="button"
              aria-label="Toggle menu"
            >
              <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden" style={{ paddingBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a href="/#home" style={{ color: '#4A5568', fontWeight: '500', padding: '8px 0', textDecoration: 'none' }} onClick={() => setIsOpen(false)}>Home</a>
            <a href="/#about" style={{ color: '#4A5568', fontWeight: '500', padding: '8px 0', textDecoration: 'none' }} onClick={() => setIsOpen(false)}>About</a>
            <a href="/#education" style={{ color: '#4A5568', fontWeight: '500', padding: '8px 0', textDecoration: 'none' }} onClick={() => setIsOpen(false)}>Education</a>
            <a href="/#skills" style={{ color: '#4A5568', fontWeight: '500', padding: '8px 0', textDecoration: 'none' }} onClick={() => setIsOpen(false)}>Skills</a>
            <a href="/#projects" style={{ color: '#4A5568', fontWeight: '500', padding: '8px 0', textDecoration: 'none' }} onClick={() => setIsOpen(false)}>Projects</a>
            <a href="/#contact" style={{ color: '#4A5568', fontWeight: '500', padding: '8px 0', textDecoration: 'none' }} onClick={() => setIsOpen(false)}>Contact</a>
          </div>
        )}
      </div>
    </nav>
  );
}
