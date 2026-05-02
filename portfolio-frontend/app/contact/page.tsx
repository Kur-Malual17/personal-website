'use client';

import { Metadata } from 'next';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

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

  return (
    <main className="min-h-screen py-12 sm:py-16 lg:py-20" style={{ paddingTop: '80px', paddingLeft: 'clamp(24px, 5vw, 48px)', paddingRight: 'clamp(24px, 5vw, 48px)' }}>
      <div className="max-w-5xl mx-auto">
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
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
              GET IN TOUCH
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: '800', marginBottom: '1rem', color: '#000', letterSpacing: '-0.02em' }}>
            Contact Me
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', color: '#6B7280', maxWidth: '600px', margin: '0 auto' }}>
            Let's connect and discuss how we can work together
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <h2 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: '700', marginBottom: '1.5rem', color: '#000' }}>
              Contact Information
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                <div>
                  <p style={{ fontWeight: '600', color: '#000', marginBottom: '4px', fontSize: 'clamp(0.9375rem, 2vw, 1rem)' }}>Email</p>
                  <a href="mailto:kurmalual@gmail.com" style={{ color: '#0066CC', textDecoration: 'none', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
                    kurmalual@gmail.com
                  </a>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                <div>
                  <p style={{ fontWeight: '600', color: '#000', marginBottom: '4px', fontSize: 'clamp(0.9375rem, 2vw, 1rem)' }}>LinkedIn</p>
                  <a href="https://linkedin.com/in/kurmalual" target="_blank" rel="noopener noreferrer" style={{ color: '#0066CC', textDecoration: 'none', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
                    linkedin.com/in/kurmalual
                  </a>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                <div>
                  <p style={{ fontWeight: '600', color: '#000', marginBottom: '4px', fontSize: 'clamp(0.9375rem, 2vw, 1rem)' }}>GitHub</p>
                  <a href="https://github.com/kurmalual" target="_blank" rel="noopener noreferrer" style={{ color: '#0066CC', textDecoration: 'none', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
                    github.com/kurmalual
                  </a>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                <div>
                  <p style={{ fontWeight: '600', color: '#000', marginBottom: '4px', fontSize: 'clamp(0.9375rem, 2vw, 1rem)' }}>Location</p>
                  <p style={{ color: '#6B7280', fontSize: 'clamp(0.875rem, 2vw, 1rem)', lineHeight: '1.6' }}>
                    Accra, Ghana (Currently)<br />
                    South Sudan (Home)
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label htmlFor="name" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#000' }}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid #E5E5E5',
                    backgroundColor: '#FFFFFF',
                    color: '#000',
                  }}
                />
              </div>

              <div>
                <label htmlFor="email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#000' }}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid #E5E5E5',
                    backgroundColor: '#FFFFFF',
                    color: '#000',
                  }}
                />
              </div>

              <div>
                <label htmlFor="subject" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#000' }}>
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid #E5E5E5',
                    backgroundColor: '#FFFFFF',
                    color: '#000',
                  }}
                />
              </div>

              <div>
                <label htmlFor="message" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#000' }}>
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid #E5E5E5',
                    backgroundColor: '#FFFFFF',
                    color: '#000',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  width: '100%',
                  padding: 'clamp(12px, 2.5vw, 14px) clamp(24px, 5vw, 32px)',
                  background: 'linear-gradient(135deg, #0066CC 0%, #00A86B 100%)',
                  color: '#FFFFFF',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: 'clamp(0.9375rem, 2vw, 1rem)',
                  border: 'none',
                  cursor: 'pointer',
                  opacity: status === 'loading' ? 0.5 : 1,
                }}
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <p style={{ textAlign: 'center', color: '#10B981' }}>
                  Message sent successfully! I'll get back to you soon.
                </p>
              )}

              {status === 'error' && (
                <p style={{ textAlign: 'center', color: '#EF4444' }}>
                  Failed to send message. Please try again or email me directly.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
