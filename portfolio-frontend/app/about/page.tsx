'use client';

export default function AboutPage() {
  return (
    <main className="min-h-screen" style={{ paddingTop: 'clamp(40px, 6vw, 60px)', paddingBottom: 'clamp(40px, 6vw, 60px)' }}>
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(30px, 5vw, 50px)', textAlign: 'center' }}>
          <div style={{
            display: 'inline-block',
            padding: '6px 16px',
            backgroundColor: '#E6F2FF',
            borderRadius: '30px',
            marginBottom: '16px'
          }}>
            <span style={{ 
              fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', 
              fontWeight: '600',
              color: '#0066CC',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Get to Know Me
            </span>
          </div>
          <h1 style={{ 
            fontSize: 'clamp(1.75rem, 5vw, 3rem)', 
            fontWeight: '800', 
            marginBottom: '16px',
            color: '#000000',
            letterSpacing: '-0.02em',
            lineHeight: '1.1'
          }}>
            About Me
          </h1>
          <p style={{ 
            fontSize: 'clamp(0.875rem, 2vw, 1rem)', 
            color: '#6B7280',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.7',
            padding: '0 16px'
          }}>
            Building impactful digital solutions for African institutions
          </p>
        </div>

        {/* Introduction */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: 'clamp(20px, 4vw, 32px)',
          marginBottom: 'clamp(16px, 3vw, 24px)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 40px rgba(0, 0, 0, 0.03)',
          border: '2px solid rgba(243, 244, 246, 0.6)'
        }}>
          <p style={{ 
            fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', 
            lineHeight: '1.8', 
            marginBottom: '1.5rem', 
            color: '#1A1A1A' 
          }}>
            I am a Software Engineering graduate from African Leadership University and a 
            Computer Science student at Ashesi University. I specialize in full-stack web 
            development, mobile applications, and educational technology.
          </p>
          
          <p style={{ 
            fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', 
            lineHeight: '1.8', 
            color: '#1A1A1A' 
          }}>
            My work focuses on building impactful digital systems used by real institutions 
            across South Sudan. My most significant achievement is the Digital School Management 
            System (DSMS), currently deployed in 3 secondary schools in Juba, improving 
            administrative efficiency by 40%.
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
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: 'clamp(28px, 6vw, 40px)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 40px rgba(0, 0, 0, 0.03)',
            border: '2px solid rgba(243, 244, 246, 0.6)',
            transition: 'all 0.3s ease'
          }}>
            <h2 style={{ 
              fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', 
              fontWeight: '800', 
              marginBottom: 'clamp(20px, 4vw, 28px)', 
              color: '#000000',
              letterSpacing: '-0.01em'
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
                  color: '#6B7280', 
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
                  color: '#6B7280',
                  fontSize: 'clamp(0.9375rem, 2vw, 1rem)'
                }}>
                  BSc Software Engineering (2025)
                </p>
              </div>
            </div>
          </div>

          {/* Languages Card */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: 'clamp(28px, 6vw, 40px)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 40px rgba(0, 0, 0, 0.03)',
            border: '2px solid rgba(243, 244, 246, 0.6)',
            transition: 'all 0.3s ease'
          }}>
            <h2 style={{ 
              fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', 
              fontWeight: '800', 
              marginBottom: 'clamp(20px, 4vw, 28px)', 
              color: '#000000',
              letterSpacing: '-0.01em'
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
                  color: '#1A1A1A',
                  fontSize: 'clamp(0.9375rem, 2vw, 1rem)',
                  fontWeight: '600'
                }}>
                  <span style={{ color: '#0066CC' }}>Dinka:</span> Native
                </p>
              </div>
              <div style={{
                padding: '16px',
                backgroundColor: '#F8FAFB',
                borderRadius: '10px',
                border: '1px solid #E5E7EB'
              }}>
                <p style={{ 
                  color: '#1A1A1A',
                  fontSize: 'clamp(0.9375rem, 2vw, 1rem)',
                  fontWeight: '600'
                }}>
                  <span style={{ color: '#0066CC' }}>English:</span> Expert
                </p>
              </div>
              <div style={{
                padding: '16px',
                backgroundColor: '#F8FAFB',
                borderRadius: '10px',
                border: '1px solid #E5E7EB'
              }}>
                <p style={{ 
                  color: '#1A1A1A',
                  fontSize: 'clamp(0.9375rem, 2vw, 1rem)',
                  fontWeight: '600'
                }}>
                  <span style={{ color: '#0066CC' }}>Arabic:</span> Intermediate
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Location Card */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: 'clamp(28px, 6vw, 40px)',
          marginBottom: 'clamp(16px, 3vw, 24px)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 40px rgba(0, 0, 0, 0.03)',
          border: '2px solid rgba(243, 244, 246, 0.6)'
        }}>
          <h2 style={{ 
            fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', 
            fontWeight: '800', 
            marginBottom: '20px', 
            color: '#000000',
            letterSpacing: '-0.01em'
          }}>
            Location
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ 
              fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', 
              color: '#1A1A1A',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ 
                fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                color: '#0066CC'
              }}>●</span>
              Currently studying in Accra, Ghana
            </p>
            <p style={{ 
              fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', 
              color: '#1A1A1A',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ 
                fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                color: '#00A86B'
              }}>●</span>
              Home: South Sudan
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div style={{ textAlign: 'center' }}>
          <a
            href="/resume.pdf"
            style={{
              display: 'inline-block',
              padding: 'clamp(14px, 3vw, 18px) clamp(32px, 6vw, 48px)',
              background: 'linear-gradient(135deg, #0066CC 0%, #00A86B 100%)',
              color: '#FFFFFF',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
              boxShadow: '0 10px 30px rgba(0, 102, 204, 0.25)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 102, 204, 0.35)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 102, 204, 0.25)';
            }}
          >
            Download Resume →
          </a>
        </div>
      </div>
    </main>
  );
}
