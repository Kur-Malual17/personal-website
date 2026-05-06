'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DarkModeToggle from './DarkModeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  // Determine active page
  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const navLinkStyle = (path: string) => ({
    color: isActive(path) ? '#0066CC' : '#4A5568',
    fontWeight: isActive(path) ? '700' : '500',
    fontSize: '15px',
    transition: 'all 0.2s',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    position: 'relative' as const,
    borderBottom: isActive(path) ? '3px solid #0066CC' : '3px solid transparent'
  });

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
            <span style={{ color: '#0066CC', marginLeft: '4px' }}> Malual.</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center" style={{ 
            gap: '32px',
            height: '100%'
          }}>
            <Link href="/" style={navLinkStyle('/')}
              onMouseOver={(e) => {
                if (!isActive('/')) {
                  e.currentTarget.style.color = '#0066CC';
                  e.currentTarget.style.borderBottom = '3px solid #0066CC50';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive('/')) {
                  e.currentTarget.style.color = '#4A5568';
                  e.currentTarget.style.borderBottom = '3px solid transparent';
                }
              }}>
              Home
            </Link>
            <Link href="/about" style={navLinkStyle('/about')}
              onMouseOver={(e) => {
                if (!isActive('/about')) {
                  e.currentTarget.style.color = '#0066CC';
                  e.currentTarget.style.borderBottom = '3px solid #0066CC50';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive('/about')) {
                  e.currentTarget.style.color = '#4A5568';
                  e.currentTarget.style.borderBottom = '3px solid transparent';
                }
              }}>
              About
            </Link>
            <Link href="/education" style={navLinkStyle('/education')}
              onMouseOver={(e) => {
                if (!isActive('/education')) {
                  e.currentTarget.style.color = '#0066CC';
                  e.currentTarget.style.borderBottom = '3px solid #0066CC50';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive('/education')) {
                  e.currentTarget.style.color = '#4A5568';
                  e.currentTarget.style.borderBottom = '3px solid transparent';
                }
              }}>
              Education
            </Link>
            <Link href="/skills" style={navLinkStyle('/skills')}
              onMouseOver={(e) => {
                if (!isActive('/skills')) {
                  e.currentTarget.style.color = '#0066CC';
                  e.currentTarget.style.borderBottom = '3px solid #0066CC50';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive('/skills')) {
                  e.currentTarget.style.color = '#4A5568';
                  e.currentTarget.style.borderBottom = '3px solid transparent';
                }
              }}>
              Skills
            </Link>
            <Link href="/projects" style={navLinkStyle('/projects')}
              onMouseOver={(e) => {
                if (!isActive('/projects')) {
                  e.currentTarget.style.color = '#0066CC';
                  e.currentTarget.style.borderBottom = '3px solid #0066CC50';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive('/projects')) {
                  e.currentTarget.style.color = '#4A5568';
                  e.currentTarget.style.borderBottom = '3px solid transparent';
                }
              }}>
              Projects
            </Link>
            <Link 
              href="/#contact" 
              style={{
                padding: '10px 24px',
                backgroundColor: '#0066CC',
                color: '#FFFFFF',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '15px',
                border: 'none',
                transition: 'all 0.2s',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 2px 8px rgba(0, 102, 204, 0.3)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 102, 204, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 102, 204, 0.3)';
              }}
            >
              Contact
            </Link>
            
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
                backgroundColor: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1A1A1A'
              }}
              type="button"
              aria-label="Toggle menu"
            >
              <svg style={{ width: '24px', height: '24px', stroke: '#1A1A1A' }} fill="none" strokeWidth={2} viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden" style={{ paddingBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link href="/" style={{ 
              color: isActive('/') ? '#0066CC' : '#4A5568', 
              fontWeight: isActive('/') ? '700' : '500', 
              padding: '8px 0', 
              textDecoration: 'none',
              borderLeft: isActive('/') ? '3px solid #0066CC' : 'none',
              paddingLeft: isActive('/') ? '12px' : '0'
            }} onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/about" style={{ 
              color: isActive('/about') ? '#0066CC' : '#4A5568', 
              fontWeight: isActive('/about') ? '700' : '500', 
              padding: '8px 0', 
              textDecoration: 'none',
              borderLeft: isActive('/about') ? '3px solid #0066CC' : 'none',
              paddingLeft: isActive('/about') ? '12px' : '0'
            }} onClick={() => setIsOpen(false)}>About</Link>
            <Link href="/education" style={{ 
              color: isActive('/education') ? '#0066CC' : '#4A5568', 
              fontWeight: isActive('/education') ? '700' : '500', 
              padding: '8px 0', 
              textDecoration: 'none',
              borderLeft: isActive('/education') ? '3px solid #0066CC' : 'none',
              paddingLeft: isActive('/education') ? '12px' : '0'
            }} onClick={() => setIsOpen(false)}>Education</Link>
            <Link href="/skills" style={{ 
              color: isActive('/skills') ? '#0066CC' : '#4A5568', 
              fontWeight: isActive('/skills') ? '700' : '500', 
              padding: '8px 0', 
              textDecoration: 'none',
              borderLeft: isActive('/skills') ? '3px solid #0066CC' : 'none',
              paddingLeft: isActive('/skills') ? '12px' : '0'
            }} onClick={() => setIsOpen(false)}>Skills</Link>
            <Link href="/projects" style={{ 
              color: isActive('/projects') ? '#0066CC' : '#4A5568', 
              fontWeight: isActive('/projects') ? '700' : '500', 
              padding: '8px 0', 
              textDecoration: 'none',
              borderLeft: isActive('/projects') ? '3px solid #0066CC' : 'none',
              paddingLeft: isActive('/projects') ? '12px' : '0'
            }} onClick={() => setIsOpen(false)}>Projects</Link>
            <Link href="/#contact" style={{ 
              color: isActive('/contact') ? '#0066CC' : '#4A5568', 
              fontWeight: isActive('/contact') ? '700' : '500', 
              padding: '8px 0', 
              textDecoration: 'none',
              borderLeft: isActive('/contact') ? '3px solid #0066CC' : 'none',
              paddingLeft: isActive('/contact') ? '12px' : '0'
            }} onClick={() => setIsOpen(false)}>Contact</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

