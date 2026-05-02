'use client';

import { useState } from 'react';

export default function TestDarkMode() {
  const [isDark, setIsDark] = useState(false);

  const toggleDark = () => {
    const newValue = !isDark;
    setIsDark(newValue);
    
    if (newValue) {
      document.body.classList.add('dark');
      alert('Dark mode ON - body should have dark class');
    } else {
      document.body.classList.remove('dark');
      alert('Dark mode OFF - body should NOT have dark class');
    }
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>Dark Mode Test Page</h1>
      
      <button
        onClick={toggleDark}
        style={{
          padding: '20px 40px',
          fontSize: '20px',
          cursor: 'pointer',
          backgroundColor: '#1B4332',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          marginBottom: '20px'
        }}
      >
        Click Me to Toggle Dark Mode
      </button>

      <p style={{ fontSize: '18px', marginTop: '20px' }}>
        Current state: {isDark ? 'DARK' : 'LIGHT'}
      </p>

      <p style={{ fontSize: '16px', marginTop: '20px', color: 'var(--muted)' }}>
        Background should be: {isDark ? '#0E0E0D (dark gray)' : '#FAFAF9 (light beige)'}
      </p>

      <div style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Manual Test:</h2>
        <p>Open browser console (F12) and type:</p>
        <code style={{ 
          display: 'block', 
          padding: '10px', 
          backgroundColor: 'var(--card-bg)',
          border: '1px solid var(--border)',
          borderRadius: '4px',
          marginTop: '10px'
        }}>
          document.body.classList.toggle('dark')
        </code>
      </div>
    </div>
  );
}
