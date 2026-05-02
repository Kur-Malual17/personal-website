'use client';

import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check localStorage on mount
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      document.body.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={handleClick}
      className="p-2 rounded-lg hover:opacity-80"
      style={{ 
        backgroundColor: 'var(--background)',
        cursor: 'pointer',
        border: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '40px',
        minHeight: '40px'
      }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      type="button"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span style={{ fontSize: '20px', lineHeight: 1 }}>
        {isDark ? '☀️' : '🌙'}
      </span>
    </button>
  );
}
