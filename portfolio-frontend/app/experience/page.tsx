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

interface Experience {
  id: number;
  role: string;
  company: string;
  location: string;
  start_date: string;
  end_date: string | null;
  description: string;
  achievements: string;
  technologies: string;
  image: string | null;
  is_leadership: boolean;
  order: number;
}

export default function ExperiencePage() {
  const isDark = useDarkMode();
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadExperience() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/experience/`);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched experience:', data);
          setExperience(data);
        }
      } catch (error) {
        console.error('Failed to fetch experience:', error);
      } finally {
        setLoading(false);
      }
    }
    loadExperience();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen" style={{ paddingTop: 'clamp(80px, 10vw, 120px)', paddingBottom: 'clamp(40px, 6vw, 60px)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '1.125rem', color: '#6B7280' }}>Loading experience...</p>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen" style={{ paddingTop: 'clamp(80px, 10vw, 120px)', paddingBottom: 'clamp(40px, 6vw, 60px)', paddingLeft: 'clamp(24px, 5vw, 48px)', paddingRight: 'clamp(24px, 5vw, 48px)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(30px, 5vw, 50px)' }}>
          <div style={{
            display: 'inline-block',
            padding: '6px 16px',
            backgroundColor: '#E8F5E9',
            borderRadius: '30px',
            marginBottom: '16px',
            border: '1px solid #1B4332'
          }}>
            <span style={{ 
              fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', 
              fontWeight: isDark ? '800' : '600',
              color: '#1B4332',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Professional Journey
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
            Experience
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
            Professional work experience and leadership positions that define my career
          </p>
        </div>

        {/* Experience Timeline */}
        {experience.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '1.125rem', color: '#6B7280' }}>
              No experience records available.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {experience.map((exp) => {
              // Parse achievements and technologies
              const achievements = exp.achievements 
                ? exp.achievements.split(',').map(a => a.trim()).filter(a => a.length > 0)
                : [];
              const technologies = exp.technologies 
                ? exp.technologies.split(',').map(t => t.trim()).filter(t => t.length > 0)
                : [];
              
              // Format dates
              const startYear = new Date(exp.start_date).getFullYear();
              const endYear = exp.end_date ? new Date(exp.end_date).getFullYear() : 'Present';
              
              return (
                <div
                  key={exp.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: exp.image ? '1fr 400px' : '1fr',
                    gap: '32px',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    padding: '32px',
                    border: '2px solid rgba(229, 231, 235, 0.6)',
                    transition: 'all 0.3s ease',
                    alignItems: 'start'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#1B4332';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(27, 67, 50, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E5E7EB';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Left - Content */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                      <div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: isDark ? '#FFFFFF' : '#1A1A1A', marginBottom: '6px' }}>
                          {exp.role}
                        </h3>
                        <p style={{ fontSize: '1.0625rem', fontWeight: isDark ? '700' : '600', color: '#1B4332', marginBottom: '4px' }}>
                          {exp.company}
                        </p>
                        <p style={{ fontSize: '0.875rem', color: isDark ? '#FFFFFF' : '#6B7280', fontWeight: isDark ? '600' : '400' }}>
                          {exp.location}
                        </p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                        <span style={{ 
                          fontSize: '0.875rem', 
                          color: isDark ? '#FFFFFF' : '#6B7280', 
                          fontWeight: isDark ? '700' : '600',
                          padding: '6px 14px',
                          backgroundColor: '#F3F4F6',
                          borderRadius: '8px'
                        }}>
                          {startYear} — {endYear}
                        </span>
                        {exp.is_leadership && (
                          <span style={{
                            padding: '6px 12px',
                            backgroundColor: '#E8F5E9',
                            color: '#1B4332',
                            borderRadius: '8px',
                            fontSize: '0.75rem',
                            fontWeight: isDark ? '800' : '700',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            border: '1px solid #1B4332'
                          }}>
                            Leadership
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <p style={{ fontSize: '0.9375rem', color: isDark ? '#FFFFFF' : '#4A5568', lineHeight: '1.7', marginBottom: '16px', fontWeight: isDark ? '600' : '400' }}>
                      {exp.description}
                    </p>
                    
                    {achievements.length > 0 && (
                      <div style={{ marginBottom: '16px' }}>
                        <p style={{ fontSize: '0.8125rem', fontWeight: '700', color: isDark ? '#FFFFFF' : '#1A1A1A', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          Key Achievements
                        </p>
                        <ul style={{ 
                          listStyle: 'none', 
                          padding: 0,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px'
                        }}>
                          {achievements.map((achievement, idx) => (
                            <li key={idx} style={{ 
                              fontSize: '0.875rem', 
                              color: isDark ? '#FFFFFF' : '#6B7280',
                              paddingLeft: '20px',
                              position: 'relative',
                              lineHeight: '1.6',
                              fontWeight: isDark ? '600' : '400'
                            }}>
                              <span style={{
                                position: 'absolute',
                                left: '0',
                                color: '#1B4332',
                                fontWeight: isDark ? '800' : '700',
                                fontSize: '1.125rem'
                              }}>•</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {technologies.length > 0 && (
                      <div>
                        <p style={{ fontSize: '0.8125rem', fontWeight: '700', color: isDark ? '#FFFFFF' : '#1A1A1A', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          Technologies
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              style={{
                                padding: '6px 12px',
                                backgroundColor: '#E8F5E9',
                                color: '#1B4332',
                                borderRadius: '6px',
                                fontSize: '0.8125rem',
                                fontWeight: isDark ? '700' : '600',
                                border: '1px solid #1B433220'
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right - Image */}
                  {exp.image && (
                    <div style={{
                      width: '100%',
                      height: '500px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '3px solid #1B4332',
                      boxShadow: '0 8px 20px rgba(27, 67, 50, 0.15)',
                      flexShrink: 0
                    }}>
                      <img
                        src={exp.image}
                        alt={`${exp.role} at ${exp.company}`}
                        style={{ 
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center center'
                        }}
                        onError={(e) => {
                          console.error('Failed to load experience image:', exp.image);
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
