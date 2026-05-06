'use client';

// Updated: Network background applied to all sections
import { useState, useEffect } from 'react';
import { fetchProjects } from '@/lib/api';
import { Project } from '@/types/project';

// Typewriter animation component
function TypewriterText() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const roles = [
    'Junior Software Engineer',
    'Full-Stack Developer',
    'Mobile App Developer',
    'UI/UX Designer'
  ];

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, roles]);

  return (
    <span>
      {text}
      <span style={{ 
        animation: 'blink 1s infinite',
        marginLeft: '2px'
      }}>|</span>
    </span>
  );
}

// Custom hook to detect dark mode
function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      const darkMode = document.body.classList.contains('dark');
      console.log('Dark mode detected:', darkMode); // Debug log
      setIsDark(darkMode);
    };
    
    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  return isDark;
}

interface Profile {
  id: number;
  name: string;
  title: string;
  bio: string;
  profile_image?: string;
  about_image?: string;
  journey_image?: string;
  email: string;
  phone?: string;
  location?: string;
  github_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
}

export default function HomePage() {
  const isDark = useDarkMode();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [projects, setProjects] = useState<Project[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [education, setEducation] = useState<any[]>([]);
  const [experience, setExperience] = useState<any[]>([]);
  
  // Animated counter states
  const [projectsCount, setProjectsCount] = useState(0);
  const [schoolsCount, setSchoolsCount] = useState(0);
  const [efficiencyCount, setEfficiencyCount] = useState(0);
  const [degreesCount, setDegreesCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    async function loadData() {
      // Fetch projects
      const projectsData = await fetchProjects();
      console.log('Fetched projects:', projectsData);
      setProjects(projectsData.slice(0, 6)); // Show first 6 projects
      
      // Fetch profile
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/`);
        if (response.ok) {
          const profileData = await response.json();
          console.log('Fetched profile:', profileData);
          // API returns array, get first profile
          if (Array.isArray(profileData) && profileData.length > 0) {
            setProfile(profileData[0]);
          }
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }

      // Fetch education
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/education/`);
        if (response.ok) {
          const educationData = await response.json();
          console.log('Fetched education:', educationData);
          setEducation(educationData);
        }
      } catch (error) {
        console.error('Failed to fetch education:', error);
      }

      // Fetch experience
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/experience/`);
        if (response.ok) {
          const experienceData = await response.json();
          console.log('Fetched experience:', experienceData);
          setExperience(experienceData);
        }
      } catch (error) {
        console.error('Failed to fetch experience:', error);
      }
    }
    loadData();
  }, []);

  // Animated counter effect
  useEffect(() => {
    if (hasAnimated) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    const targets = {
      projects: 7,
      schools: 3,
      efficiency: 40,
      degrees: 2
    };

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setProjectsCount(Math.floor(targets.projects * progress));
      setSchoolsCount(Math.floor(targets.schools * progress));
      setEfficiencyCount(Math.floor(targets.efficiency * progress));
      setDegreesCount(Math.floor(targets.degrees * progress));

      if (currentStep >= steps) {
        setProjectsCount(targets.projects);
        setSchoolsCount(targets.schools);
        setEfficiencyCount(targets.efficiency);
        setDegreesCount(targets.degrees);
        setHasAnimated(true);
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [hasAnimated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section id="home" style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'flex-start',
        paddingTop: '120px',
        paddingLeft: 'clamp(24px, 5vw, 48px)',
        paddingRight: 'clamp(24px, 5vw, 48px)',
        paddingBottom: '40px'
      }}>
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left Content */}
            <div>
              <h1 style={{ 
                fontSize: 'clamp(2rem, 6vw, 3.5rem)', 
                fontWeight: '900', 
                marginBottom: '8px',
                color: isDark ? '#FFFFFF' : '#1A1A1A',
                lineHeight: '1.1',
                letterSpacing: '-0.02em',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                Hi, I'm <span style={{ color: '#00D9FF' }}>Kur Malual</span>
              </h1>
              
              <div style={{ 
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', 
                fontWeight: '700', 
                marginBottom: '24px',
                color: '#00D9FF',
                lineHeight: '1.2',
                letterSpacing: '-0.01em',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                minHeight: 'clamp(2.5rem, 5vw, 3.5rem)'
              }}>
                <TypewriterText />
              </div>
              
              <h2 style={{ 
                fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', 
                fontWeight: '700', 
                marginBottom: '24px',
                color: isDark ? '#FFFFFF' : '#1A1A1A',
                lineHeight: '1.4',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                I build <span style={{ color: '#00D9FF' }}>scalable web</span> and <span style={{ color: '#00D9FF' }}>mobile systems</span> with clean design and strong engineering.
              </h2>
              
              <p style={{ 
                fontSize: 'clamp(1rem, 2vw, 1.125rem)', 
                fontWeight: '400', 
                marginBottom: '32px',
                color: isDark ? '#E5E7EB' : '#6B7280',
                lineHeight: '1.7',
                maxWidth: '600px'
              }}>
                Detail-oriented <strong style={{ color: '#0066CC', fontWeight: '700' }}>Junior Software Engineer</strong> with over <strong style={{ color: '#0066CC', fontWeight: '700' }}>2 years</strong> of hands-on experience in <strong style={{ color: '#0066CC', fontWeight: '700' }}>full-stack development</strong>, <strong style={{ color: '#0066CC', fontWeight: '700' }}>UX/UI design</strong>, and <strong style={{ color: '#0066CC', fontWeight: '700' }}>mobile applications</strong>. I turn complex ideas into high-performance systems that last.
              </p>
              
              {/* Stats */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(4, 1fr)', 
                gap: '16px',
                marginBottom: '28px',
                maxWidth: '560px'
              }}>
                <div>
                  <div style={{ 
                    fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', 
                    fontWeight: '800', 
                    color: '#0066CC',
                    marginBottom: '4px'
                  }}>
                    {projectsCount}+
                  </div>
                  <div style={{ fontSize: '0.75rem', color: isDark ? '#FFFFFF' : '#6B7280', fontWeight: isDark ? '700' : '600', lineHeight: '1.3' }}>
                    Projects
                  </div>
                </div>
                <div>
                  <div style={{ 
                    fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', 
                    fontWeight: '800', 
                    color: '#0066CC',
                    marginBottom: '4px'
                  }}>
                    {schoolsCount}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: isDark ? '#FFFFFF' : '#6B7280', fontWeight: isDark ? '700' : '600', lineHeight: '1.3' }}>
                    Schools
                  </div>
                </div>
                <div>
                  <div style={{ 
                    fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', 
                    fontWeight: '800', 
                    color: '#0066CC',
                    marginBottom: '4px'
                  }}>
                    {efficiencyCount}%
                  </div>
                  <div style={{ fontSize: '0.75rem', color: isDark ? '#FFFFFF' : '#6B7280', fontWeight: isDark ? '700' : '600', lineHeight: '1.3' }}>
                    Efficiency
                  </div>
                </div>
                <div>
                  <div style={{ 
                    fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', 
                    fontWeight: '800', 
                    color: '#0066CC',
                    marginBottom: '4px'
                  }}>
                    {degreesCount}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: isDark ? '#FFFFFF' : '#6B7280', fontWeight: isDark ? '700' : '600', lineHeight: '1.3' }}>
                    Degrees
                  </div>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="cta-buttons-container">
                <a
                  href="mailto:kurmalual@gmail.com"
                  style={{
                    padding: 'clamp(12px, 2.5vw, 14px) clamp(20px, 4vw, 32px)',
                    background: 'linear-gradient(135deg, #00D9FF 0%, #00A8E8 100%)',
                    color: '#FFFFFF',
                    borderRadius: '50px',
                    fontWeight: '700',
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 30px rgba(0, 217, 255, 0.3)',
                    textDecoration: 'none',
                    display: 'inline-block',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 217, 255, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 217, 255, 0.3)';
                  }}
                >
                  Hire Me
                </a>
                <a
                  href="#contact"
                  style={{
                    padding: 'clamp(12px, 2.5vw, 14px) clamp(20px, 4vw, 32px)',
                    backgroundColor: 'transparent',
                    color: '#00A8E8',
                    borderRadius: '50px',
                    fontWeight: '700',
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                    border: '3px solid #00A8E8',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                    display: 'inline-block',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 168, 232, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Let's Talk
                </a>
                <a
                  href="/resume.pdf"
                  style={{
                    padding: 'clamp(12px, 2.5vw, 14px) clamp(20px, 4vw, 32px)',
                    background: 'linear-gradient(135deg, #0066CC 0%, #0052A3 100%)',
                    color: '#FFFFFF',
                    borderRadius: '50px',
                    fontWeight: '700',
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 30px rgba(0, 102, 204, 0.3)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 102, 204, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 102, 204, 0.3)';
                  }}
                >
                  <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}>⬇</span> Resume
                </a>
              </div>

              {/* Social Media Icons */}
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    border: '3px solid #00A8E8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#00A8E8',
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
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    border: '3px solid #00A8E8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#00A8E8',
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
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    border: '3px solid #00A8E8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#00A8E8',
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
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    border: '3px solid #00A8E8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#00A8E8',
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
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Right Content - Profile Image */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}>
              {/* Decorative Circular Rings Background */}
              <div style={{
                position: 'absolute',
                width: 'clamp(340px, 44vw, 500px)',
                height: 'clamp(340px, 44vw, 500px)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 0
              }}>
                {/* Outer ring */}
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  border: '15px solid rgba(0, 102, 204, 0.15)',
                  top: '0',
                  left: '0'
                }} />
                {/* Middle ring */}
                <div style={{
                  position: 'absolute',
                  width: '90%',
                  height: '90%',
                  borderRadius: '50%',
                  border: '15px solid rgba(0, 102, 204, 0.25)',
                  top: '5%',
                  left: '5%'
                }} />
              </div>

              {/* Profile Image - Circular */}
              <div style={{
                position: 'relative',
                width: 'clamp(280px, 38vw, 420px)',
                height: 'clamp(280px, 38vw, 420px)',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '5px solid #0066CC',
                boxShadow: '0 12px 40px rgba(0, 102, 204, 0.2)',
                zIndex: 1
              }}>
                {profile?.profile_image ? (
                  <img
                    src={profile.profile_image}
                    alt={profile.name || 'Profile'}
                    style={{ 
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center 20%'
                    }}
                    onError={(e) => {
                      console.error('Failed to load profile image:', profile.profile_image);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #0066CC 0%, #0052A3 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'clamp(4rem, 10vw, 8rem)',
                    color: '#FFFFFF',
                    fontWeight: '800'
                  }}>
                    KM
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Behind The Code - Personal Statement */}
      <section id="behind-the-code" style={{
        padding: '80px clamp(32px, 6vw, 80px)'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ 
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', 
              fontWeight: '800', 
              color: isDark ? '#FFFFFF' : '#1A1A1A',
              marginBottom: '16px'
            }}>
              Behind The Code
            </h2>
            <p style={{ 
              fontSize: '1rem', 
              color: '#0066CC',
              fontWeight: isDark ? '800' : '700',
              letterSpacing: '0.5px'
            }}>
              Engineering with Purpose & Precision
            </p>
          </div>

          <div style={{ 
            fontSize: 'clamp(1rem, 2vw, 1.125rem)', 
            color: isDark ? '#FFFFFF' : '#4A5568',
            lineHeight: '1.8',
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
            fontWeight: isDark ? '600' : '400'
          }}>
            <p style={{ marginBottom: '24px' }}>
              I'm a software engineer focused on building <strong style={{ color: '#0066CC', fontWeight: '700' }}>scalable web and mobile systems</strong> that solve real-world problems. My work spans educational technology, agricultural platforms, and enterprise management systems.
            </p>
            <p style={{ marginBottom: '24px' }}>
              Beyond coding, I lead technical initiatives and work on projects aimed at <strong style={{ color: '#0066CC', fontWeight: '700' }}>improving access to technology</strong>, particularly in underserved communities across South Sudan and Ghana.
            </p>
            <p>
              I'm driven by building solutions that are not just functional, but <strong style={{ color: '#0066CC', fontWeight: '700' }}>meaningful and long-lasting</strong>.
            </p>
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <a
              href="#projects"
              style={{
                padding: '12px 28px',
                backgroundColor: '#0066CC',
                color: '#FFFFFF',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '0.9375rem',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.3s ease',
                boxShadow: '0 3px 12px rgba(0, 102, 204, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 5px 18px rgba(0, 102, 204, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 3px 12px rgba(0, 102, 204, 0.3)';
              }}
            >
              View My Work
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{
        padding: '80px clamp(32px, 6vw, 80px)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ 
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', 
              fontWeight: '800', 
              color: isDark ? '#FFFFFF' : '#1A1A1A',
              marginBottom: '12px'
            }}>
              About Me
            </h2>
            <p style={{ 
              fontSize: '1rem', 
              color: '#0066CC',
              fontWeight: isDark ? '800' : '700',
              letterSpacing: '0.5px'
            }}>
              Junior Software Engineer | Full Stack Developer
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '480px',
                aspectRatio: '3/4',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0, 102, 204, 0.15)'
              }}>
                {profile?.about_image ? (
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <img
                      src={profile.about_image}
                      alt={profile.name || 'Kur Malual'}
                      style={{ 
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        console.error('Failed to load about profile image:', profile.about_image);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    {/* Name Overlay */}
                    <div style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      right: '0',
                      padding: '24px',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)'
                    }}>
                      <h3 style={{
                        fontSize: '1.75rem',
                        fontWeight: '700',
                        color: '#FFFFFF',
                        marginBottom: '4px'
                      }}>
                        {profile.name || 'Kur Malual'}
                      </h3>
                      <p style={{
                        fontSize: '1rem',
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontWeight: '500'
                      }}>
                        {profile.title || 'Software Engineer'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #0066CC 0%, #0052A3 100%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    padding: '24px'
                  }}>
                    <div>
                      <h3 style={{
                        fontSize: '1.75rem',
                        fontWeight: '700',
                        color: '#FFFFFF',
                        marginBottom: '4px'
                      }}>
                        Kur Malual
                      </h3>
                      <p style={{
                        fontSize: '1rem',
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontWeight: '500'
                      }}>
                        Software Engineer
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right - Text Content */}
            <div>
              <div style={{ 
                fontSize: 'clamp(1rem, 2vw, 1.0625rem)', 
                color: isDark ? '#FFFFFF' : '#4A5568',
                lineHeight: '1.8',
                marginBottom: '32px',
                fontWeight: isDark ? '600' : '400'
              }}>
                <p style={{ marginBottom: '20px' }}>
                  Hello! I'm <strong style={{ color: '#0066CC', fontWeight: '700' }}>Kur Malual</strong>, a detail-oriented <strong style={{ color: '#0066CC', fontWeight: '700' }}>Junior Software Engineer</strong> with over <strong style={{ color: '#0066CC', fontWeight: '700' }}>2 years</strong> of hands-on
                  experience in <strong style={{ color: '#0066CC', fontWeight: '700' }}>full-stack development</strong>, <strong style={{ color: '#0066CC', fontWeight: '700' }}>UX/UI design</strong>, and <strong style={{ color: '#0066CC', fontWeight: '700' }}>mobile applications</strong>. I'm
                  proficient in building secure, scalable, and user-friendly software solutions.
                </p>
                <p style={{ marginBottom: '20px' }}>
                  I graduated with <strong style={{ color: '#0066CC', fontWeight: '700' }}>First Class Honors</strong> in Software Engineering from <strong style={{ color: '#0066CC', fontWeight: '700' }}>African Leadership University</strong>.
                  My technical expertise spans the <strong style={{ color: '#0066CC', fontWeight: '700' }}>MERN stack</strong> (MongoDB, Express.js, React, Node.js), <strong style={{ color: '#0066CC', fontWeight: '700' }}>React Native</strong> for mobile
                  development, Django, PostgreSQL, and modern DevOps practices.
                </p>
                <p>
                  Beyond technical skills, I'm deeply committed to <strong style={{ color: '#0066CC', fontWeight: '700' }}>leadership</strong> and <strong style={{ color: '#0066CC', fontWeight: '700' }}>community service</strong>. I'm eager to join 
                  innovative tech teams where I can apply my skills in development, product design, and emerging technologies.
                </p>
              </div>

              <div>
                <a
                  href="#contact"
                  style={{
                    padding: '12px 28px',
                    backgroundColor: '#0066CC',
                    color: '#FFFFFF',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '0.9375rem',
                    textDecoration: 'none',
                    display: 'inline-block',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 3px 12px rgba(0, 102, 204, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 5px 18px rgba(0, 102, 204, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 3px 12px rgba(0, 102, 204, 0.3)';
                  }}
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects, Skills, Experience, Education, and Contact sections will continue... */}
      {/* For now, adding a simple contact section */}
      
      <section id="projects" style={{
        padding: '80px clamp(32px, 6vw, 80px)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '800', color: isDark ? '#FFFFFF' : '#1A1A1A', marginBottom: '12px' }}>
              Selected Work
            </h2>
            <p style={{ fontSize: '1rem', color: '#0066CC', fontWeight: isDark ? '800' : '700', letterSpacing: '0.5px' }}>
              Featured Projects
            </p>
            <p style={{ fontSize: '0.9375rem', color: isDark ? '#FFFFFF' : '#6B7280', marginTop: '12px', fontWeight: isDark ? '600' : '400' }}>
              Real-world systems deployed and used by actual organizations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id || index}
                style={{
                  backgroundColor: isDark ? 'rgba(26, 26, 26, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: isDark ? '1px solid rgba(51, 51, 51, 0.6)' : '1px solid rgba(229, 231, 235, 0.6)',
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 102, 204, 0.2)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) {
                    (img as HTMLElement).style.transform = 'scale(1.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) {
                    (img as HTMLElement).style.transform = 'scale(1)';
                  }
                }}
              >
                <div style={{
                  height: '200px',
                  position: 'relative',
                  background: project.featured 
                    ? 'linear-gradient(135deg, #0066CC 0%, #0052A3 100%)'
                    : 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}>
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      style={{ 
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      onError={(e) => {
                        console.error('Failed to load project image:', project.image);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div style={{
                      fontSize: '3rem',
                      color: project.featured ? '#FFFFFF' : '#0066CC',
                      fontWeight: '800'
                    }}>
                      {project.title.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                  {project.featured && (
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      padding: '4px 12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      color: '#0066CC',
                      zIndex: 1,
                      animation: 'pulse 2s ease-in-out infinite'
                    }}>
                      FEATURED
                    </div>
                  )}
                </div>
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px', color: isDark ? '#FFFFFF' : '#1A1A1A' }}>
                    {project.title}
                  </h3>
                  <p style={{ fontSize: '0.9375rem', color: isDark ? '#E5E7EB' : '#6B7280', marginBottom: '16px', lineHeight: '1.6', fontWeight: isDark ? '600' : '400' }}>
                    {project.description.length > 100 
                      ? `${project.description.slice(0, 100)}...` 
                      : project.description}
                  </p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {project.category && (
                      <span style={{
                        padding: '4px 12px',
                        backgroundColor: '#E8F5E9',
                        color: '#0066CC',
                        borderRadius: '6px',
                        fontSize: '0.8125rem',
                        fontWeight: '600'
                      }}>
                        {project.category}
                      </span>
                    )}
                  </div>
                  <a
                    href="/projects"
                    style={{
                      display: 'inline-block',
                      padding: '10px 20px',
                      backgroundColor: '#0066CC',
                      color: '#FFFFFF',
                      borderRadius: '8px',
                      fontSize: '0.9375rem',
                      fontWeight: '600',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#0052A3';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#0066CC';
                    }}
                  >
                    View Details →
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <a href="/projects" style={{
              padding: '16px 32px',
              backgroundColor: 'transparent',
              color: '#0066CC',
              borderRadius: '12px',
              fontWeight: '700',
              textDecoration: 'none',
              display: 'inline-block',
              border: '2px solid #0066CC',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0066CC';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#0066CC';
            }}>
              View All Projects
            </a>
          </div>
        </div>
      </section>

      <section id="skills" style={{
        padding: '80px clamp(32px, 6vw, 80px)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '800', color: isDark ? '#FFFFFF' : '#1A1A1A', marginBottom: '12px' }}>
              Capabilities
            </h2>
            <p style={{ fontSize: '1rem', color: '#0066CC', fontWeight: isDark ? '800' : '700', letterSpacing: '0.5px' }}>
              Technical Arsenal
            </p>
            <p style={{ fontSize: '0.9375rem', color: isDark ? '#FFFFFF' : '#6B7280', marginTop: '12px', maxWidth: '700px', margin: '12px auto 0', fontWeight: isDark ? '600' : '400' }}>
              A carefully curated set of technologies that allow me to architect, build, and deploy complete systems.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: 'Frontend', 
                description: 'Building responsive, beautiful, and interactive user interfaces.',
                skills: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Bootstrap'] 
              },
              { 
                title: 'Backend', 
                description: 'Architecting robust APIs and scalable server-side solutions.',
                skills: ['Django', 'Node.js', 'Express.js', 'REST API', 'Django REST Framework'] 
              },
              { 
                title: 'Mobile Development', 
                description: 'Creating seamless cross-platform mobile experiences.',
                skills: ['Flutter', 'Dart', 'React Native', 'Expo'] 
              },
              { 
                title: 'Database', 
                description: 'Designing efficient schemas and optimizing data retrieval.',
                skills: ['PostgreSQL', 'MySQL', 'Firebase', 'Database Management'] 
              },
              { 
                title: 'AI & Machine Learning', 
                description: 'Developing intelligent models for predictive computing.',
                skills: ['Python', 'Machine Learning', 'NLP', 'scikit-learn'] 
              },
              { 
                title: 'Tools & DevOps', 
                description: 'Streamlining development and deployment workflows.',
                skills: ['Git', 'GitHub', 'CI/CD', 'Figma', 'UI/UX Design'] 
              }
            ].map((category, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: isDark ? 'rgba(26, 26, 26, 0.8)' : 'rgba(250, 250, 249, 0.8)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '12px',
                  padding: '28px 24px',
                  border: isDark ? '1px solid rgba(51, 51, 51, 0.6)' : '1px solid rgba(229, 231, 235, 0.6)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#0066CC';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 102, 204, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = isDark ? '#333333' : '#E5E7EB';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: isDark ? '#FFFFFF' : '#1A1A1A' }}>
                  {category.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: isDark ? '#E5E7EB' : '#6B7280', marginBottom: '16px', lineHeight: '1.5', fontWeight: isDark ? '600' : '400' }}>
                  {category.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {category.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: isDark ? '#1A1A1A' : '#FFFFFF',
                        color: isDark ? '#FFFFFF' : '#4A5568',
                        borderRadius: '6px',
                        fontSize: '0.8125rem',
                        fontWeight: isDark ? '700' : '600',
                        border: isDark ? '1px solid #333333' : '1px solid #E5E7EB'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <a href="/skills" style={{
              padding: '12px 28px',
              backgroundColor: 'transparent',
              color: '#0066CC',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '0.9375rem',
              textDecoration: 'none',
              display: 'inline-block',
              border: '2px solid #0066CC',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0066CC';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#0066CC';
            }}>
              View All Skills
            </a>
          </div>
        </div>
      </section>

      <section id="experience" style={{
        padding: '80px clamp(32px, 6vw, 80px)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '800', color: isDark ? '#FFFFFF' : '#1A1A1A', marginBottom: '12px' }}>
              My Journey
            </h2>
            <p style={{ fontSize: '1rem', color: '#0066CC', fontWeight: isDark ? '800' : '700', letterSpacing: '0.5px' }}>
              Professional Path
            </p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {experience.length > 0 ? (
              experience.map((exp, index) => {
                // Parse achievements and technologies
                const achievements = exp.achievements 
                  ? exp.achievements.split(',').map((a: string) => a.trim()).filter((a: string) => a.length > 0)
                  : [];
                const technologies = exp.technologies 
                  ? exp.technologies.split(',').map((t: string) => t.trim()).filter((t: string) => t.length > 0)
                  : [];
                
                // Format dates
                const startYear = new Date(exp.start_date).getFullYear();
                const endYear = exp.end_date ? new Date(exp.end_date).getFullYear() : 'Present';
                
                return (
                  <div
                    key={exp.id || index}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '16px',
                      padding: 'clamp(20px, 4vw, 32px)',
                      border: '2px solid rgba(229, 231, 235, 0.6)',
                      transition: 'all 0.3s ease',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#0066CC';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 102, 204, 0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#E5E7EB';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr',
                      gap: '24px'
                    }}
                    className="experience-card-layout">
                      {/* Image - First on desktop (left side) */}
                      {exp.image && (
                        <div style={{
                          width: '100%',
                          height: 'clamp(300px, 40vw, 500px)',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          border: '3px solid #0066CC',
                          boxShadow: '0 8px 20px rgba(0, 102, 204, 0.15)'
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

                      {/* Content - Second on desktop (right side) */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                          <div style={{ flex: '1', minWidth: '200px' }}>
                            <h3 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: '700', color: '#000000', marginBottom: '6px' }}>
                              {exp.role}
                            </h3>
                            <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.0625rem)', fontWeight: '700', color: '#0066CC', marginBottom: '4px' }}>
                              {exp.company}
                            </p>
                            <p style={{ fontSize: 'clamp(0.8125rem, 2vw, 0.875rem)', color: '#6B7280', fontWeight: '400' }}>
                              {exp.location}
                            </p>
                          </div>
                          <span style={{ 
                            fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', 
                            color: '#1A1A1A', 
                            fontWeight: '600',
                            padding: '6px 14px',
                            backgroundColor: '#F3F4F6',
                            borderRadius: '8px',
                            whiteSpace: 'nowrap'
                          }}>
                            {startYear} — {endYear}
                          </span>
                        </div>
                        
                        <p style={{ fontSize: 'clamp(0.875rem, 2vw, 0.9375rem)', color: '#4A5568', lineHeight: '1.7', marginBottom: '16px', fontWeight: '400' }}>
                          {exp.description}
                        </p>
                        
                        {achievements.length > 0 && (
                          <div style={{ marginBottom: '16px' }}>
                            <p style={{ fontSize: 'clamp(0.75rem, 2vw, 0.8125rem)', fontWeight: '700', color: '#0066CC', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                              Key Achievements
                            </p>
                            <ul style={{ 
                              listStyle: 'none', 
                              padding: 0,
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '8px'
                            }}>
                              {achievements.map((achievement: string, idx: number) => (
                                <li key={idx} style={{ 
                                  fontSize: 'clamp(0.8125rem, 2vw, 0.875rem)', 
                                  color: '#6B7280',
                                  paddingLeft: '20px',
                                  position: 'relative',
                                  lineHeight: '1.6',
                                  fontWeight: '400'
                                }}>
                                  <span style={{
                                    position: 'absolute',
                                    left: '0',
                                    color: '#0066CC',
                                    fontWeight: '700',
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
                            <p style={{ fontSize: 'clamp(0.75rem, 2vw, 0.8125rem)', fontWeight: '700', color: '#0066CC', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                              Technologies
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                              {technologies.map((tech: string, idx: number) => (
                                <span
                                  key={idx}
                                  style={{
                                    padding: '6px 12px',
                                    backgroundColor: '#E8F5E9',
                                    color: '#0066CC',
                                    borderRadius: '6px',
                                    fontSize: 'clamp(0.75rem, 2vw, 0.8125rem)',
                                    fontWeight: '600',
                                    border: '1px solid #0066CC20'
                                  }}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              // Fallback to hardcoded data if API fails
              [
                {
                  role: 'Founder & CEO',
                  company: 'SuddTech',
                  period: '2026 — Present',
                  description: 'Leading software development and digital strategy. Built DSMS deployed in 3 secondary schools in Juba, handling student registration, attendance, grading, and fee management. Achieved 40% improvement in administrative efficiency.',
                  achievements: [
                    'Deployed enterprise school platform used by 3 schools',
                    'Reduced admin workload by 40% through automation',
                    'Led team of developers in building scalable solutions'
                  ],
                  tech: ['Django', 'PostgreSQL', 'JavaScript', 'REST APIs']
                },
                {
                  role: 'President',
                  company: 'International Students Association, Ashesi University',
                  period: '2026 — Present',
                  description: 'Representing 100+ international students as liaison between students and administration. Leading initiatives to improve campus integration and student experience.',
                  achievements: [
                    'Represent 100+ international students',
                    'Coordinate cross-cultural events and programs',
                    'Advocate for student interests in university governance'
                  ],
                  tech: []
                },
                {
                  role: 'Software Engineering Intern',
                  company: 'African Foundations Network',
                  period: 'Jun 2025 — Sep 2025',
                  description: 'Built features for AFN website and contributed to agile development workflows. Collaborated with cross-functional teams to deliver high-quality software solutions.',
                  achievements: [
                    'Developed new features for production website',
                    'Participated in agile sprint planning and reviews',
                    'Improved code quality through peer reviews'
                  ],
                  tech: ['React', 'Node.js', 'Git']
                }
              ].map((exp, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '12px',
                    padding: '28px',
                    marginBottom: '20px',
                    border: '1px solid rgba(229, 231, 235, 0.6)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#0066CC';
                    e.currentTarget.style.transform = 'translateX(8px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 102, 204, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E5E7EB';
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: isDark ? '#FFFFFF' : '#1A1A1A', marginBottom: '4px' }}>
                        {exp.role}
                      </h3>
                      <p style={{ fontSize: '0.9375rem', fontWeight: isDark ? '700' : '600', color: '#0066CC' }}>
                        {exp.company}
                      </p>
                    </div>
                    <span style={{ 
                      fontSize: '0.8125rem', 
                      color: '#6B7280', 
                      fontWeight: '600',
                      padding: '4px 10px',
                      backgroundColor: '#F3F4F6',
                      borderRadius: '6px'
                    }}>
                      {exp.period}
                    </span>
                  </div>
                  
                  <p style={{ fontSize: '0.875rem', color: '#4A5568', lineHeight: '1.6', marginBottom: '12px' }}>
                    {exp.description}
                  </p>
                  
                  {exp.achievements.length > 0 && (
                    <ul style={{ 
                      listStyle: 'none', 
                      padding: 0, 
                      marginBottom: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px'
                    }}>
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} style={{ 
                          fontSize: '0.8125rem', 
                          color: '#6B7280',
                          paddingLeft: '16px',
                          position: 'relative'
                        }}>
                          <span style={{
                            position: 'absolute',
                            left: '0',
                            color: '#0066CC',
                            fontWeight: '700'
                          }}>•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {exp.tech.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {exp.tech.map((tech, idx) => (
                        <span
                          key={idx}
                          style={{
                            padding: '3px 8px',
                            backgroundColor: '#E8F5E9',
                            color: '#0066CC',
                            borderRadius: '4px',
                            fontSize: '0.6875rem',
                            fontWeight: '600'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <a href="/experience" style={{
              padding: '12px 28px',
              backgroundColor: 'transparent',
              color: '#0066CC',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '0.9375rem',
              textDecoration: 'none',
              display: 'inline-block',
              border: '2px solid #0066CC',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0066CC';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#0066CC';
            }}>
              View Full Experience
            </a>
          </div>
        </div>
      </section>

      <section id="education" style={{
        padding: '80px clamp(32px, 6vw, 80px)'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '800', color: isDark ? '#FFFFFF' : '#1A1A1A', marginBottom: '12px' }}>
              Education
            </h2>
            <p style={{ fontSize: '1rem', color: '#0066CC', fontWeight: isDark ? '800' : '700', letterSpacing: '0.5px' }}>
              Academic Background
            </p>
          </div>
          
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            {education.map((edu, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: 'rgba(250, 250, 249, 0.8)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  padding: '28px',
                  marginBottom: '20px',
                  border: '2px solid rgba(229, 231, 235, 0.6)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '24px'
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
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.375rem', fontWeight: '700', marginBottom: '6px', color: isDark ? '#FFFFFF' : '#1A1A1A' }}>
                    {edu.institution}
                  </h3>
                  <p style={{ fontSize: '1.0625rem', fontWeight: isDark ? '700' : '600', color: '#0066CC', marginBottom: '6px' }}>
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
                      marginTop: '6px'
                    }}>
                      {edu.scholarship}
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
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <a href="/education" style={{
              padding: '12px 28px',
              backgroundColor: '#0066CC',
              color: '#FFFFFF',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '0.9375rem',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'all 0.3s ease',
              boxShadow: '0 3px 12px rgba(0, 102, 204, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 5px 18px rgba(0, 102, 204, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 3px 12px rgba(0, 102, 204, 0.3)';
            }}>
              View Full Education
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" style={{
        padding: '80px clamp(32px, 6vw, 80px)'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '800', color: isDark ? '#FFFFFF' : '#1A1A1A', marginBottom: '12px' }}>
              Testimonials
            </h2>
            <p style={{ fontSize: '1rem', color: '#0066CC', fontWeight: isDark ? '800' : '700', letterSpacing: '0.5px' }}>
              What People Say
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: "Kur's ability to deliver complex systems on time is exceptional. The DSMS platform he built has transformed how we manage our school operations. He's a truly talented developer.",
                author: "School Administrator",
                role: "Secondary School, Juba",
                company: "South Sudan"
              },
              {
                quote: "Working with Kur was a great experience. His technical skills and dedication to quality are outstanding. He consistently delivers solutions that exceed expectations.",
                author: "Project Manager",
                role: "African Foundations Network",
                company: "Tech Organization"
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: 'rgba(250, 250, 249, 0.8)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '12px',
                  padding: '32px',
                  border: '1px solid rgba(229, 231, 235, 0.6)',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#0066CC';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 102, 204, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E5E7EB';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  fontSize: '3rem',
                  color: '#0066CC',
                  opacity: 0.2,
                  lineHeight: '1',
                  marginBottom: '16px'
                }}>
                  "
                </div>
                <p style={{
                  fontSize: '1rem',
                  color: '#4A5568',
                  lineHeight: '1.7',
                  marginBottom: '24px',
                  fontStyle: 'italic'
                }}>
                  {testimonial.quote}
                </p>
                <div>
                  <p style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: isDark ? '#FFFFFF' : '#1A1A1A',
                    marginBottom: '4px'
                  }}>
                    {testimonial.author}
                  </p>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#6B7280'
                  }}>
                    {testimonial.role} · {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{
        padding: '80px clamp(24px, 5vw, 48px)'
      }}>
        <div className="max-w-5xl mx-auto">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ 
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', 
              fontWeight: '800', 
              color: isDark ? '#FFFFFF' : '#1A1A1A',
              marginBottom: '12px'
            }}>
              Let's Work Together
            </h2>
            <p style={{ fontSize: '1rem', color: '#0066CC', fontWeight: isDark ? '800' : '700', letterSpacing: '0.5px' }}>
              Get In Touch
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '24px', color: isDark ? '#FFFFFF' : '#1A1A1A' }}>
                Contact Information
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <p style={{ fontWeight: '600', color: isDark ? '#FFFFFF' : '#1A1A1A', marginBottom: '8px' }}>Email</p>
                  <a href="mailto:kurmalual@gmail.com" style={{ color: '#0066CC', textDecoration: 'none', fontSize: '1rem', fontWeight: isDark ? '800' : '400' }}>
                    kurmalual@gmail.com
                  </a>
                </div>
                <div>
                  <p style={{ fontWeight: '600', color: isDark ? '#FFFFFF' : '#1A1A1A', marginBottom: '8px' }}>LinkedIn</p>
                  <a href="https://linkedin.com/in/kurmalual" target="_blank" rel="noopener noreferrer" style={{ color: '#0066CC', textDecoration: 'none', fontSize: '1rem', fontWeight: isDark ? '800' : '400' }}>
                    linkedin.com/in/kurmalual
                  </a>
                </div>
                <div>
                  <p style={{ fontWeight: '600', color: isDark ? '#FFFFFF' : '#1A1A1A', marginBottom: '8px' }}>GitHub</p>
                  <a href="https://github.com/kurmalual" target="_blank" rel="noopener noreferrer" style={{ color: '#0066CC', textDecoration: 'none', fontSize: '1rem', fontWeight: isDark ? '800' : '400' }}>
                    github.com/kurmalual
                  </a>
                </div>
                <div>
                  <p style={{ fontWeight: '600', color: isDark ? '#FFFFFF' : '#1A1A1A', marginBottom: '8px' }}>Location</p>
                  <p style={{ color: isDark ? '#FFFFFF' : '#6B7280', fontSize: '1rem', lineHeight: '1.6', fontWeight: isDark ? '600' : '400' }}>
                    Accra, Ghana (Currently)<br />
                    South Sudan (Home)
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: '12px',
                      border: '2px solid #E5E7EB',
                      backgroundColor: '#FFFFFF',
                      color: '#1A1A1A',
                      fontSize: '1rem',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#0066CC'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: '12px',
                      border: '2px solid #E5E7EB',
                      backgroundColor: '#FFFFFF',
                      color: '#1A1A1A',
                      fontSize: '1rem',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#0066CC'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
                  />
                </div>

                <input
                  type="text"
                  placeholder="Email Subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    borderRadius: '12px',
                    border: '2px solid #E5E7EB',
                    backgroundColor: '#FFFFFF',
                    color: '#1A1A1A',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#0066CC'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
                />

                <textarea
                  placeholder="Your Message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    borderRadius: '12px',
                    border: '2px solid #E5E7EB',
                    backgroundColor: '#FFFFFF',
                    color: '#1A1A1A',
                    fontSize: '1rem',
                    resize: 'vertical',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#0066CC'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
                />

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{
                    width: '100%',
                    padding: '16px 32px',
                    backgroundColor: '#0066CC',
                    color: '#FFFFFF',
                    borderRadius: '12px',
                    fontWeight: '700',
                    fontSize: '1rem',
                    border: 'none',
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    opacity: status === 'loading' ? 0.6 : 1,
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 14px rgba(0, 102, 204, 0.4)'
                  }}
                  onMouseEnter={(e) => {
                    if (status !== 'loading') {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 102, 204, 0.5)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 102, 204, 0.4)';
                  }}
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>

                {status === 'success' && (
                  <p style={{ textAlign: 'center', color: '#10B981', fontWeight: '600' }}>
                    ✓ Message sent successfully! I'll get back to you soon.
                  </p>
                )}

                {status === 'error' && (
                  <p style={{ textAlign: 'center', color: '#EF4444', fontWeight: '600' }}>
                    ✗ Failed to send message. Please try again or email me directly.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#0066CC',
          color: '#FFFFFF',
          border: 'none',
          cursor: 'pointer',
          fontSize: '24px',
          boxShadow: '0 4px 14px rgba(0, 102, 204, 0.4)',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 102, 204, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 102, 204, 0.4)';
        }}
      >
        ↑
      </button>
    </div>
  );
}

