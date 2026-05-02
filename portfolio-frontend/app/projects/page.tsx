'use client';

import { useEffect, useState } from 'react';
import { fetchProjects, getImageUrl } from '@/lib/api';
import { Project } from '@/types/project';

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

// Helper function to parse technologies
function parseTechnologies(tech: string | string[]): string[] {
  if (Array.isArray(tech)) {
    return tech;
  }
  
  // If it's a string, try to parse it
  try {
    // Remove brackets and split by comma
    const cleaned = tech.replace(/[\[\]"']/g, '');
    return cleaned.split(',').map(t => t.trim()).filter(t => t.length > 0);
  } catch {
    return [];
  }
}

export default function ProjectsPage() {
  const isDark = useDarkMode();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      const data = await fetchProjects();
      setProjects(data);
      setLoading(false);
    }
    loadProjects();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen" style={{ paddingTop: 'clamp(80px, 10vw, 120px)', paddingBottom: 'clamp(40px, 6vw, 60px)' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '1.125rem', color: '#6B7280' }}>Loading projects...</p>
          </div>
        </div>
      </main>
    );
  }

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
              Portfolio
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
            My Projects
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
            Real-world systems deployed and used by actual organizations and users
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '1.125rem', color: '#6B7280' }}>
              No projects available at the moment. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => {
              const technologies = parseTechnologies(project.technologies);
              const githubUrl = project.github_url || project.githubUrl;
              const liveUrl = project.live_url || project.liveUrl;
              
              return (
                <div
                  key={project.id || project.slug}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 40px rgba(0, 0, 0, 0.03)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    border: '2px solid rgba(243, 244, 246, 0.6)',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-12px)';
                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 102, 204, 0.15)';
                    e.currentTarget.style.borderColor = project.featured ? '#0066CC' : '#E5E7EB';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 40px rgba(0, 0, 0, 0.03)';
                    e.currentTarget.style.borderColor = '#F3F4F6';
                  }}
                >
                  {/* Project Image - Always show image area */}
                  <div style={{ 
                    position: 'relative', 
                    width: '100%', 
                    height: '200px',
                    overflow: 'hidden',
                    background: project.image 
                      ? '#F3F4F6' 
                      : project.featured 
                        ? 'linear-gradient(135deg, #0066CC 0%, #00A86B 100%)'
                        : 'linear-gradient(135deg, #E6F2FF 0%, #F0F9FF 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {project.image ? (
                      <img
                        src={getImageUrl(project.image)}
                        alt={project.title}
                        style={{ 
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                        onError={(e) => {
                          console.error('Failed to load image:', project.image);
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      // Placeholder icon when no image
                      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="80" height="80" rx="12" fill={project.featured ? 'rgba(255,255,255,0.2)' : 'rgba(0,102,204,0.1)'} />
                        <path d="M40 25C31.7157 25 25 31.7157 25 40C25 48.2843 31.7157 55 40 55C48.2843 55 55 48.2843 55 40C55 31.7157 48.2843 25 40 25ZM40 30C42.7614 30 45 32.2386 45 35C45 37.7614 42.7614 40 40 40C37.2386 40 35 37.7614 35 35C35 32.2386 37.2386 30 40 30ZM40 51C35.8333 51 32.2083 48.9583 30 45.8333C30.0417 42.6667 36.6667 40.9167 40 40.9167C43.3333 40.9167 49.9583 42.6667 50 45.8333C47.7917 48.9583 44.1667 51 40 51Z" fill={project.featured ? 'rgba(255,255,255,0.8)' : 'rgba(0,102,204,0.4)'} />
                      </svg>
                    )}
                    
                    {/* Featured Badge */}
                    {project.featured && (
                      <div style={{ 
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        padding: '6px 14px',
                        backgroundColor: project.image ? 'rgba(0, 102, 204, 0.95)' : 'rgba(255, 255, 255, 0.25)',
                        borderRadius: '8px',
                        fontSize: 'clamp(0.6875rem, 1.5vw, 0.75rem)',
                        fontWeight: '700',
                        color: '#FFFFFF',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        backdropFilter: 'blur(10px)'
                      }}>
                        FEATURED
                      </div>
                    )}
                  </div>
                  
                  {/* Card Body */}
                  <div style={{ padding: 'clamp(20px, 4vw, 28px)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ 
                      fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', 
                      fontWeight: '800', 
                      marginBottom: '12px',
                      color: isDark ? '#FFFFFF' : '#000000',
                      lineHeight: '1.3',
                      letterSpacing: '-0.01em'
                    }}>
                      {project.title}
                    </h3>
                    
                    <p style={{ 
                      fontSize: 'clamp(0.875rem, 2vw, 0.9375rem)', 
                      color: isDark ? '#FFFFFF' : '#6B7280',
                      marginBottom: '16px',
                      lineHeight: '1.7',
                      flex: 1,
                      fontWeight: isDark ? '600' : '400'
                    }}>
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    {technologies.length > 0 && (
                      <div style={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: '8px', 
                        marginBottom: '20px' 
                      }}>
                        {technologies.map(tech => (
                          <span
                            key={tech}
                            style={{
                              fontSize: '0.8125rem',
                              padding: '6px 14px',
                              backgroundColor: '#E6F2FF',
                              color: '#0066CC',
                              borderRadius: '8px',
                              fontWeight: '600',
                              border: '1px solid #0066CC20'
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* Impact */}
                    {project.impact && (
                      <div style={{ 
                        padding: 'clamp(12px, 2.5vw, 14px) clamp(14px, 3vw, 16px)',
                        backgroundColor: '#F0FDF4',
                        borderRadius: '10px',
                        marginBottom: '16px',
                        border: '1px solid #00A86B30'
                      }}>
                        <p style={{ 
                          fontSize: 'clamp(0.8125rem, 2vw, 0.9375rem)', 
                          color: '#00A86B',
                          fontWeight: '700',
                          margin: 0
                        }}>
                          {project.impact}
                        </p>
                      </div>
                    )}
                    
                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
                      {githubUrl && (
                        <a
                          href={githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            flex: 1,
                            padding: '12px 20px',
                            textAlign: 'center',
                            border: '2px solid #0066CC',
                            color: '#0066CC',
                            borderRadius: '10px',
                            fontSize: '0.9375rem',
                            fontWeight: '700',
                            transition: 'all 0.3s ease',
                            textDecoration: 'none'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#0066CC';
                            e.currentTarget.style.color = '#FFFFFF';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#0066CC';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                        >
                          GitHub
                        </a>
                      )}
                      {liveUrl && (
                        <a
                          href={liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            flex: 1,
                            padding: '12px 20px',
                            textAlign: 'center',
                            background: 'linear-gradient(135deg, #0066CC 0%, #00A86B 100%)',
                            color: '#FFFFFF',
                            borderRadius: '10px',
                            fontSize: '0.9375rem',
                            fontWeight: '700',
                            border: 'none',
                            transition: 'all 0.3s ease',
                            textDecoration: 'none',
                            boxShadow: '0 4px 12px rgba(0, 102, 204, 0.25)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 102, 204, 0.35)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 102, 204, 0.25)';
                          }}
                        >
                          Live Demo →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
