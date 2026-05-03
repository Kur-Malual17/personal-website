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

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['React.js', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'TypeScript'],
    color: '#0066CC'
  },
  {
    title: 'Backend',
    skills: ['Django', 'Node.js', 'Express.js', 'PHP', 'REST API Development'],
    color: '#00A86B'
  },
  {
    title: 'Mobile',
    skills: ['Flutter', 'Dart'],
    color: '#0066CC'
  },
  {
    title: 'Database',
    skills: ['PostgreSQL', 'MySQL', 'Firebase'],
    color: '#00A86B'
  },
  {
    title: 'AI/ML',
    skills: ['Python', 'scikit-learn', 'NLP', 'Machine Learning'],
    color: '#0066CC'
  },
  {
    title: 'Tools',
    skills: ['Git', 'GitHub', 'CI/CD', 'Redux', 'Context API', 'Paystack', 'WordPress', 'UI/UX Design'],
    color: '#00A86B'
  },
];

export default function SkillsPage() {
  const isDark = useDarkMode();
  
  return (
    <main className="min-h-screen" style={{ paddingTop: 'clamp(80px, 10vw, 120px)', paddingBottom: 'clamp(40px, 6vw, 60px)', paddingLeft: 'clamp(24px, 5vw, 48px)', paddingRight: 'clamp(24px, 5vw, 48px)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(30px, 5vw, 50px)' }}>
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
              Technical Expertise
            </span>
          </div>
          <h1 style={{ 
            fontSize: 'clamp(1.75rem, 5vw, 3rem)', 
            fontWeight: '800', 
            marginBottom: '16px',
            color: isDark ? '#FFFFFF' : '#000000',
            letterSpacing: '-0.02em',
            lineHeight: '1.1'
          }}>
            Skills & Technologies
          </h1>
          <p style={{ 
            fontSize: 'clamp(0.875rem, 2vw, 1rem)', 
            color: isDark ? '#FFFFFF' : '#6B7280',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.7',
            padding: '0 16px',
            fontWeight: isDark ? '600' : '400'
          }}>
            A comprehensive toolkit for building modern, scalable, and user-centric digital solutions
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                padding: 'clamp(24px, 5vw, 40px) clamp(20px, 4vw, 32px)',
                boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 40px rgba(0, 0, 0, 0.03)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                border: isDark ? '2px solid rgba(200, 200, 200, 0.3)' : '2px solid rgba(243, 244, 246, 0.6)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 102, 204, 0.12)';
                e.currentTarget.style.borderColor = category.color;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 40px rgba(0, 0, 0, 0.03)';
                e.currentTarget.style.borderColor = isDark ? 'rgba(200, 200, 200, 0.3)' : '#F3F4F6';
              }}
            >
              {/* Decorative gradient bar */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: `linear-gradient(90deg, ${category.color} 0%, ${category.color === '#0066CC' ? '#00A86B' : '#0066CC'} 100%)`
              }} />
              
              {/* Title */}
              <h3 style={{ 
                fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', 
                fontWeight: '700', 
                marginBottom: 'clamp(16px, 3vw, 24px)',
                color: '#000000',
                letterSpacing: '-0.01em',
                marginTop: '8px'
              }}>
                {category.title}
              </h3>
              
              {/* Skills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {category.skills.map(skill => (
                  <span
                    key={skill}
                    style={{
                      padding: '8px 16px',
                      fontSize: '0.875rem',
                      backgroundColor: '#F8FAFB',
                      color: '#1A1A1A',
                      borderRadius: '8px',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      border: '1px solid #E5E7EB'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = category.color;
                      e.currentTarget.style.color = '#FFFFFF';
                      e.currentTarget.style.borderColor = category.color;
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = '#F8FAFB';
                      e.currentTarget.style.color = '#1A1A1A';
                      e.currentTarget.style.borderColor = '#E5E7EB';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: 'clamp(60px, 10vw, 100px)',
          padding: 'clamp(40px, 8vw, 80px) clamp(20px, 5vw, 40px)',
          background: 'linear-gradient(135deg, rgba(0, 102, 204, 0.95) 0%, rgba(0, 168, 107, 0.95) 100%)',
          backdropFilter: 'blur(10px)',
          borderRadius: 'clamp(16px, 3vw, 24px)',
          color: '#FFFFFF',
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
          <div style={{
            position: 'absolute',
            bottom: '-50px',
            left: '-50px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            filter: 'blur(60px)',
            pointerEvents: 'none'
          }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ 
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', 
              fontWeight: '800', 
              marginBottom: '16px',
              letterSpacing: '-0.01em'
            }}>
              Let's Build Something Amazing Together
            </h2>
            <p style={{ 
              fontSize: 'clamp(0.875rem, 2vw, 1rem)', 
              marginBottom: 'clamp(16px, 3vw, 24px)',
              opacity: 0.95,
              maxWidth: '600px',
              margin: '0 auto 16px',
              padding: '0 16px'
            }}>
              Have a project in mind? Let's discuss how I can help bring your ideas to life.
            </p>
            <a
              href="/contact"
              style={{
                display: 'inline-block',
                padding: 'clamp(14px, 3vw, 18px) clamp(28px, 6vw, 40px)',
                backgroundColor: '#FFFFFF',
                color: '#0066CC',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                textDecoration: 'none'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.25)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
              }}
            >
              Get In Touch →
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

