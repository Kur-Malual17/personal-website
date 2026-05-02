'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ 
      backgroundColor: '#0A1929', 
      color: '#FFFFFF',
      padding: 'clamp(30px, 5vw, 40px) 0 clamp(16px, 3vw, 20px)',
      width: '100%',
      maxWidth: '100vw',
      overflowX: 'hidden'
    }}>
      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto',
        padding: '0 clamp(32px, 6vw, 80px)'
      }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mb-6 lg:mb-8">
          {/* Brand Column */}
          <div>
            <h3 style={{ 
              fontSize: 'clamp(1.125rem, 2.5vw, 1.375rem)', 
              fontWeight: '700', 
              marginBottom: '10px',
              background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Kur Malual
            </h3>
            <p style={{ color: '#B0BEC5', fontSize: 'clamp(0.8125rem, 2vw, 0.875rem)', lineHeight: '1.6' }}>
              Full-Stack Software Engineer building scalable digital systems for education, agriculture, and commerce.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 style={{ 
              fontSize: 'clamp(0.875rem, 1.75vw, 0.9375rem)', 
              fontWeight: '600', 
              marginBottom: '10px',
              color: '#FFFFFF'
            }}>
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a 
                href="/#about" 
                style={{ 
                  color: '#B0BEC5', 
                  fontSize: 'clamp(0.8125rem, 2vw, 0.875rem)',
                  transition: 'color 0.3s',
                  textDecoration: 'none'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#2D6A4F'}
                onMouseOut={(e) => e.currentTarget.style.color = '#B0BEC5'}
              >
                About
              </a>
              <a 
                href="/#experience" 
                style={{ 
                  color: '#B0BEC5', 
                  fontSize: 'clamp(0.8125rem, 2vw, 0.875rem)',
                  transition: 'color 0.3s',
                  textDecoration: 'none'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#2D6A4F'}
                onMouseOut={(e) => e.currentTarget.style.color = '#B0BEC5'}
              >
                Experience
              </a>
              <a 
                href="/#projects" 
                style={{ 
                  color: '#B0BEC5', 
                  fontSize: 'clamp(0.8125rem, 2vw, 0.875rem)',
                  transition: 'color 0.3s',
                  textDecoration: 'none'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#2D6A4F'}
                onMouseOut={(e) => e.currentTarget.style.color = '#B0BEC5'}
              >
                Projects
              </a>
              <a 
                href="/#skills" 
                style={{ 
                  color: '#B0BEC5', 
                  fontSize: 'clamp(0.8125rem, 2vw, 0.875rem)',
                  transition: 'color 0.3s',
                  textDecoration: 'none'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#2D6A4F'}
                onMouseOut={(e) => e.currentTarget.style.color = '#B0BEC5'}
              >
                Skills
              </a>
              <a 
                href="/#education" 
                style={{ 
                  color: '#B0BEC5', 
                  fontSize: 'clamp(0.8125rem, 2vw, 0.875rem)',
                  transition: 'color 0.3s',
                  textDecoration: 'none'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#2D6A4F'}
                onMouseOut={(e) => e.currentTarget.style.color = '#B0BEC5'}
              >
                Education
              </a>
              <a 
                href="/#contact" 
                style={{ 
                  color: '#B0BEC5', 
                  fontSize: 'clamp(0.8125rem, 2vw, 0.875rem)',
                  transition: 'color 0.3s',
                  textDecoration: 'none'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#2D6A4F'}
                onMouseOut={(e) => e.currentTarget.style.color = '#B0BEC5'}
              >
                Contact
              </a>
            </div>
          </div>
          
          {/* Connect */}
          <div>
            <h4 style={{ 
              fontSize: 'clamp(0.875rem, 1.75vw, 0.9375rem)', 
              fontWeight: '600', 
              marginBottom: '10px',
              color: '#FFFFFF'
            }}>
              Connect
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ 
                  color: '#B0BEC5', 
                  fontSize: 'clamp(0.8125rem, 2vw, 0.875rem)',
                  transition: 'color 0.3s'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#2D6A4F'}
                onMouseOut={(e) => e.currentTarget.style.color = '#B0BEC5'}
              >
                GitHub
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ 
                  color: '#B0BEC5', 
                  fontSize: 'clamp(0.8125rem, 2vw, 0.875rem)',
                  transition: 'color 0.3s'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#2D6A4F'}
                onMouseOut={(e) => e.currentTarget.style.color = '#B0BEC5'}
              >
                LinkedIn
              </a>
              <a 
                href="mailto:kurmalual@gmail.com" 
                style={{ 
                  color: '#B0BEC5', 
                  fontSize: 'clamp(0.8125rem, 2vw, 0.875rem)',
                  transition: 'color 0.3s'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#2D6A4F'}
                onMouseOut={(e) => e.currentTarget.style.color = '#B0BEC5'}
              >
                Email
              </a>
            </div>
          </div>
          
          {/* Location */}
          <div>
            <h4 style={{ 
              fontSize: 'clamp(0.875rem, 1.75vw, 0.9375rem)', 
              fontWeight: '600', 
              marginBottom: '10px',
              color: '#FFFFFF'
            }}>
              Location
            </h4>
            <p style={{ color: '#B0BEC5', fontSize: 'clamp(0.8125rem, 2vw, 0.875rem)', lineHeight: '1.6' }}>
              Accra, Ghana<br />
              South Sudan
            </p>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div style={{ 
          paddingTop: 'clamp(16px, 3vw, 24px)', 
          borderTop: '1px solid #1E3A5F',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '8px',
          textAlign: 'center'
        }}>
          <p style={{ color: '#B0BEC5', fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', margin: 0 }}>
            © {new Date().getFullYear()} Kur Malual. All rights reserved.
          </p>
          <p style={{ color: '#B0BEC5', fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', margin: 0 }}>
            Built with Next.js & Django
          </p>
        </div>
      </div>
    </footer>
  );
}
