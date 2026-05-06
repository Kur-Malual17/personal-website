'use client';

import { useState, useEffect } from 'react';

// Custom hook to detect dark mode
function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.body.classList.contains('dark'));
    };
    
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  return isDark;
}

export default function AboutPage() {
  const isDark = useDarkMode();
  
  return (
    <main className="min-h-screen" style={{ paddingTop: 'clamp(100px, 12vw, 140px)', paddingBottom: 'clamp(40px, 6vw, 60px)', paddingLeft: 'clamp(24px, 5vw, 48px)', paddingRight: 'clamp(24px, 5vw, 48px)' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 60px)' }}>
          <h1 style={{ 
            fontSize: 'clamp(2rem, 6vw, 3.5rem)', 
            fontWeight: '900', 
            marginBottom: '24px',
            color: isDark ? '#FFFFFF' : '#1A1A1A',
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            About <span style={{ color: '#00D9FF' }}>Me</span>
          </h1>
          <p style={{ 
            fontSize: 'clamp(1.125rem, 2.5vw, 1.375rem)', 
            color: isDark ? '#E5E7EB' : '#6B7280',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.7',
            fontWeight: isDark ? '600' : '400'
          }}>
            Building impactful digital solutions for real-world problems
          </p>
        </div>

        {/* Introduction */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: 'clamp(28px, 5vw, 40px)',
          marginBottom: 'clamp(24px, 4vw, 32px)',
          boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 40px rgba(0, 0, 0, 0.03)',
          border: isDark ? '2px solid rgba(200, 200, 200, 0.3)' : '2px solid rgba(243, 244, 246, 0.6)'
        }}>
          <p style={{ 
            fontSize: 'clamp(1.0625rem, 2.5vw, 1.25rem)', 
            lineHeight: '1.8', 
            marginBottom: '1.5rem', 
            color: '#000000',
            fontWeight: '400'
          }}>
            Hello! I'm <strong style={{ color: '#0066CC', fontWeight: '700' }}>Kur Malual</strong>, a detail-oriented <strong style={{ color: '#0066CC', fontWeight: '700' }}>Junior Software Engineer</strong> with over <strong style={{ color: '#0066CC', fontWeight: '700' }}>2 years</strong> of hands-on experience in <strong style={{ color: '#0066CC', fontWeight: '700' }}>full-stack development</strong>, <strong style={{ color: '#0066CC', fontWeight: '700' }}>UX/UI design</strong>, and <strong style={{ color: '#0066CC', fontWeight: '700' }}>mobile applications</strong>. I'm proficient in building secure, scalable, and user-friendly software solutions.
          </p>
          
          <p style={{ 
            fontSize: 'clamp(1.0625rem, 2.5vw, 1.25rem)', 
            lineHeight: '1.8', 
            color: '#000000',
            fontWeight: '400',
            marginBottom: '1.5rem'
          }}>
            I graduated with <strong style={{ color: '#0066CC', fontWeight: '700' }}>First Class Honors</strong> in Software Engineering from <strong style={{ color: '#0066CC', fontWeight: '700' }}>African Leadership University</strong>. My technical expertise spans the <strong style={{ color: '#0066CC', fontWeight: '700' }}>MERN stack</strong> (MongoDB, Express.js, React, Node.js), <strong style={{ color: '#0066CC', fontWeight: '700' }}>React Native</strong> for mobile development, Django, PostgreSQL, and modern DevOps practices.
          </p>

          <p style={{ 
            fontSize: 'clamp(1.0625rem, 2.5vw, 1.25rem)', 
            lineHeight: '1.8', 
            color: '#000000',
            fontWeight: '400'
          }}>
            Beyond technical skills, I'm deeply committed to <strong style={{ color: '#0066CC', fontWeight: '700' }}>leadership</strong> and <strong style={{ color: '#0066CC', fontWeight: '700' }}>community service</strong>. I'm eager to join innovative tech teams where I can apply my skills in development, product design, and emerging technologies.
          </p>
        </div>

        {/* Mission Card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(0, 102, 204, 0.95) 0%, rgba(0, 168, 107, 0.95) 100%)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: 'clamp(32px, 6vw, 48px)',
          marginBottom: 'clamp(16px, 3vw, 24px)',
          boxShadow: '0 20px 60px rgba(0, 102, 204, 0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative circles */}
          <div style={{
            position: 'absolute',
            top: '-30px',
            right: '-30px',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            filter: 'blur(40px)',
            pointerEvents: 'none'
          }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ 
              fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', 
              fontWeight: '800', 
              marginBottom: '16px', 
              color: '#FFFFFF',
              letterSpacing: '-0.01em'
            }}>
              Mission
            </h2>
            <p style={{ 
              fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', 
              color: '#FFFFFF',
              lineHeight: '1.7',
              opacity: 0.95
            }}>
              To build scalable, accessible digital infrastructure for African institutions 
              and communities.
            </p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8" style={{ marginBottom: 'clamp(16px, 3vw, 24px)' }}>
          {/* Education Card */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: 'clamp(28px, 6vw, 40px)',
            boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 40px rgba(0, 0, 0, 0.03)',
            border: isDark ? '2px solid rgba(200, 200, 200, 0.3)' : '2px solid rgba(243, 244, 246, 0.6)',
            transition: 'all 0.3s ease'
          }}>
            <h2 style={{ 
              fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', 
              fontWeight: '800', 
              marginBottom: 'clamp(20px, 4vw, 28px)', 
              color: '#000000',
              letterSpacing: '-0.01em',
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              Education
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 4vw, 28px)' }}>
              <div>
                <h3 style={{ 
                  fontSize: 'clamp(1.0625rem, 2.5vw, 1.25rem)', 
                  fontWeight: '700', 
                  color: '#000000',
                  marginBottom: '8px'
                }}>
                  Ashesi University
                </h3>
                <p style={{ 
                  color: '#4A5568', 
                  marginBottom: '6px',
                  fontSize: 'clamp(0.9375rem, 2vw, 1rem)'
                }}>
                  BSc Computer Science (Expected 2027)
                </p>
                <span style={{
                  display: 'inline-block',
                  padding: '6px 12px',
                  background: 'linear-gradient(135deg, #0066CC 0%, #00A86B 100%)',
                  color: '#FFFFFF',
                  fontSize: 'clamp(0.75rem, 1.5vw, 0.8125rem)',
                  borderRadius: '8px',
                  fontWeight: '700'
                }}>
                  Mastercard Foundation Scholar
                </span>
              </div>
              <div>
                <h3 style={{ 
                  fontSize: 'clamp(1.0625rem, 2.5vw, 1.25rem)', 
                  fontWeight: '700', 
                  color: '#000000',
                  marginBottom: '8px'
                }}>
                  African Leadership University
                </h3>
                <p style={{ 
                  color: '#4A5568',
                  fontSize: 'clamp(0.9375rem, 2vw, 1rem)'
                }}>
                  BSc Software Engineering (2025)
                </p>
              </div>
            </div>
          </div>

          {/* Languages Card */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: 'clamp(28px, 6vw, 40px)',
            boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 40px rgba(0, 0, 0, 0.03)',
            border: isDark ? '2px solid rgba(200, 200, 200, 0.3)' : '2px solid rgba(243, 244, 246, 0.6)',
            transition: 'all 0.3s ease'
          }}>
            <h2 style={{ 
              fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', 
              fontWeight: '800', 
              marginBottom: 'clamp(20px, 4vw, 28px)', 
              color: '#000000',
              letterSpacing: '-0.01em',
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              Languages
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{
                padding: '16px',
                backgroundColor: '#F8FAFB',
                borderRadius: '10px',
                border: '1px solid #E5E7EB'
              }}>
                <p style={{ 
                  color: '#000000',
                  fontSize: 'clamp(0.9375rem, 2vw, 1rem)',
                  fontWeight: '600'
                }}>
                  <span style={{ color: '#0066CC', fontWeight: '700' }}>Dinka:</span> Native
                </p>
              </div>
              <div style={{
                padding: '16px',
                backgroundColor: '#F8FAFB',
                borderRadius: '10px',
                border: '1px solid #E5E7EB'
              }}>
                <p style={{ 
                  color: '#000000',
                  fontSize: 'clamp(0.9375rem, 2vw, 1rem)',
                  fontWeight: '600'
                }}>
                  <span style={{ color: '#0066CC', fontWeight: '700' }}>English:</span> Expert
                </p>
              </div>
              <div style={{
                padding: '16px',
                backgroundColor: '#F8FAFB',
                borderRadius: '10px',
                border: '1px solid #E5E7EB'
              }}>
                <p style={{ 
                  color: '#000000',
                  fontSize: 'clamp(0.9375rem, 2vw, 1rem)',
                  fontWeight: '600'
                }}>
                  <span style={{ color: '#0066CC', fontWeight: '700' }}>Arabic:</span> Intermediate
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Location Card */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: 'clamp(28px, 6vw, 40px)',
          marginBottom: 'clamp(16px, 3vw, 24px)',
          boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 40px rgba(0, 0, 0, 0.03)',
          border: isDark ? '2px solid rgba(200, 200, 200, 0.3)' : '2px solid rgba(243, 244, 246, 0.6)'
        }}>
          <h2 style={{ 
            fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', 
            fontWeight: '800', 
            marginBottom: '20px', 
            color: '#000000',
            letterSpacing: '-0.01em',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            Location
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ 
              fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', 
              color: '#000000',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontWeight: '600'
            }}>
              <span style={{ 
                fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                color: '#0066CC'
              }}>●</span>
              Currently studying in Accra, Ghana
            </p>
            <p style={{ 
              fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', 
              color: '#000000',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontWeight: '600'
            }}>
              <span style={{ 
                fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                color: '#00A86B'
              }}>●</span>
              Home: South Sudan
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          gap: '16px', 
          justifyContent: 'center',
          marginBottom: 'clamp(24px, 4vw, 32px)'
        }}>
          <a
            href="mailto:kurmalual@gmail.com"
            style={{
              display: 'inline-block',
              padding: 'clamp(14px, 3vw, 18px) clamp(32px, 6vw, 48px)',
              background: 'linear-gradient(135deg, #00D9FF 0%, #00A8E8 100%)',
              color: '#FFFFFF',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
              boxShadow: '0 10px 30px rgba(0, 217, 255, 0.3)',
              transition: 'all 0.3s ease',
              border: 'none'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 217, 255, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 217, 255, 0.3)';
            }}
          >
            Hire Me
          </a>
          
          <a
            href="/contact"
            style={{
              display: 'inline-block',
              padding: 'clamp(14px, 3vw, 18px) clamp(32px, 6vw, 48px)',
              background: 'transparent',
              color: '#00A8E8',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
              border: '3px solid #00A8E8',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(0, 168, 232, 0.1)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Let's Talk
          </a>
          
          <a
            href="https://personal-website-production-643f.up.railway.app/media/resume/Kur_Malual_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: 'clamp(14px, 3vw, 18px) clamp(32px, 6vw, 48px)',
              background: 'linear-gradient(135deg, #0066CC 0%, #0052A3 100%)',
              color: '#FFFFFF',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
              boxShadow: '0 10px 30px rgba(0, 102, 204, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 102, 204, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 102, 204, 0.3)';
            }}
          >
            <span style={{ fontSize: '1.25rem' }}>⬇</span> Resume
          </a>
        </div>

        {/* Social Media Icons */}
        <div style={{ 
          display: 'flex', 
          gap: '20px', 
          justifyContent: 'center',
          marginBottom: 'clamp(16px, 3vw, 24px)'
        }}>
          <a
            href="https://www.facebook.com/share/18YGpXFrFy/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              border: '3px solid #00A8E8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#00A8E8',
              fontSize: '1.5rem',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              backgroundColor: 'transparent'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#00A8E8';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#00A8E8';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          
          <a
            href="https://x.com/majokdit5"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              border: '3px solid #00A8E8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#00A8E8',
              fontSize: '1.5rem',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              backgroundColor: 'transparent'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#00A8E8';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#00A8E8';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>
          
          <a
            href="https://www.linkedin.com/in/k-malual"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              border: '3px solid #00A8E8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#00A8E8',
              fontSize: '1.5rem',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              backgroundColor: 'transparent'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#00A8E8';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#00A8E8';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          
          <a
            href="https://github.com/Kur-Malual17"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              border: '3px solid #00A8E8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#00A8E8',
              fontSize: '1.5rem',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              backgroundColor: 'transparent'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#00A8E8';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#00A8E8';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
      </div>
    </main>
  );
}

