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

interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  start_year: number;
  end_year: number | null;
  scholarship: string | null;
  location: string;
  logo: string | null;
  relevant_courses: string;
  order: number;
}

export default function EducationPage() {
  const isDark = useDarkMode();
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEducation() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/education/`);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched education:', data);
          setEducation(data);
        }
      } catch (error) {
        console.error('Failed to fetch education:', error);
      } finally {
        setLoading(false);
      }
    }
    loadEducation();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen" style={{ paddingTop: 'clamp(80px, 10vw, 120px)', paddingBottom: 'clamp(40px, 6vw, 60px)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '1.125rem', color: '#6B7280' }}>Loading education...</p>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen" style={{ paddingTop: 'clamp(80px, 10vw, 120px)', paddingBottom: 'clamp(40px, 6vw, 60px)', paddingLeft: 'clamp(24px, 5vw, 48px)', paddingRight: 'clamp(24px, 5vw, 48px)' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(30px, 5vw, 50px)' }}>
          <div style={{
            display: 'inline-block',
            padding: '6px 16px',
            backgroundColor: '#E8F5E9',
            borderRadius: '30px',
            marginBottom: '16px',
            border: '1px solid #0066CC'
          }}>
            <span style={{ 
              fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', 
              fontWeight: isDark ? '800' : '600',
              color: '#0066CC',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Academic Background
            </span>
          </div>
          <h1 style={{ 
            fontSize: 'clamp(1.75rem, 5vw, 3rem)', 
            fontWeight: '800', 
            marginBottom: '16px',
            color: isDark ? '#FFFFFF' : '#1A1A1A',
            letterSpacing: '-0.02em',
            lineHeight: '1.1'
          }}>
            Education
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
            My academic journey and qualifications that shaped my technical expertise
          </p>
        </div>

        {/* Education Timeline */}
        {education.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '1.125rem', color: '#6B7280' }}>
              No education records available.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px, 3vw, 24px)' }}>
            {education.map((edu) => {
              // Parse relevant courses
              const courses = edu.relevant_courses 
                ? edu.relevant_courses.split(',').map(c => c.trim()).filter(c => c.length > 0)
                : [];
              
              return (
              <div
                key={edu.id}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  padding: 'clamp(20px, 4vw, 28px)',
                  border: '2px solid rgba(229, 231, 235, 0.6)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '24px',
                  flexWrap: 'wrap'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#0066CC';
                  e.currentTarget.style.transform = 'translateX(8px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E5E7EB';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                {/* Left - Content */}
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <h3 style={{ fontSize: 'clamp(1.25rem, 3.5vw, 1.375rem)', fontWeight: '700', marginBottom: '6px', color: isDark ? '#FFFFFF' : '#1A1A1A' }}>
                    {edu.institution}
                  </h3>
                  <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.0625rem)', fontWeight: '700', color: '#0066CC', marginBottom: '6px' }}>
                    {edu.degree}
                  </p>
                  <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '8px' }}>
                    {edu.start_year} {edu.end_year ? `– ${edu.end_year}` : '– Present'} • {edu.location}
                  </p>
                  {edu.scholarship && (
                    <div style={{
                      display: 'inline-block',
                      padding: '6px 14px',
                      backgroundColor: '#E8F5E9',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#0066CC',
                      marginTop: '6px',
                      marginBottom: '12px'
                    }}>
                      {edu.scholarship}
                    </div>
                  )}
                  
                  {/* Relevant Courses */}
                  {courses.length > 0 && (
                    <div style={{ marginTop: '16px' }}>
                      <p style={{ 
                        fontSize: '0.75rem', 
                        fontWeight: '700', 
                        marginBottom: '10px',
                        color: '#0066CC',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        Relevant Coursework
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {courses.map((course, idx) => (
                          <span
                            key={idx}
                            style={{
                              padding: '6px 12px',
                              fontSize: '0.8125rem',
                              backgroundColor: '#E8F5E9',
                              color: '#0066CC',
                              borderRadius: '6px',
                              fontWeight: '600',
                              border: '1px solid #0066CC20'
                            }}
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right - Logo */}
                {edu.logo && (
                  <div style={{
                    flexShrink: 0,
                    width: '100px',
                    height: '100px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    backgroundColor: '#FFFFFF',
                    border: '2px solid #E5E7EB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '12px'
                  }}>
                    <img
                      src={edu.logo}
                      alt={`${edu.institution} logo`}
                      style={{ 
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain'
                      }}
                      onError={(e) => {
                        console.error('Failed to load education logo:', edu.logo);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

