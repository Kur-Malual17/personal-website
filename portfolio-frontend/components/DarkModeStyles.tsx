'use client';

import { useEffect } from 'react';

export default function DarkModeStyles() {
  useEffect(() => {
    const applyDarkModeStyles = () => {
      const isDark = document.body.classList.contains('dark');
      
      if (isDark) {
        // Apply dark mode styles via CSS only
        const style = document.createElement('style');
        style.id = 'dark-mode-override';
        style.innerHTML = `
          /* Main body text - white and bold */
          body.dark {
            color: #FFFFFF !important;
          }
          
          /* Headings - white and extra bold */
          body.dark h1, body.dark h2, body.dark h3, body.dark h4, body.dark h5, body.dark h6 {
            color: #FFFFFF !important;
            font-weight: 800 !important;
          }
          
          /* Paragraphs and text */
          body.dark p, body.dark span, body.dark div {
            color: #FFFFFF !important;
            font-weight: 600 !important;
          }
          
          /* Green accents - bright green */
          body.dark [style*="color: #1B4332"],
          body.dark [style*="color:#1B4332"] {
            color: #00FF88 !important;
            font-weight: 700 !important;
          }
          
          /* Links - bright green */
          body.dark a {
            color: #00FF88 !important;
            font-weight: 700 !important;
          }
          
          /* Buttons */
          body.dark button {
            font-weight: 700 !important;
          }
          
          /* Green backgrounds - bright green */
          body.dark [style*="backgroundColor: #1B4332"],
          body.dark [style*="background-color: #1B4332"] {
            background-color: #00FF88 !important;
          }
          
          /* Green borders - bright green */
          body.dark [style*="borderColor: #1B4332"],
          body.dark [style*="border-color: #1B4332"] {
            border-color: #00FF88 !important;
          }
        `;
        
        // Remove existing style if present
        const existing = document.getElementById('dark-mode-override');
        if (existing) {
          existing.remove();
        }
        
        document.head.appendChild(style);
      } else {
        // Remove dark mode styles
        const existing = document.getElementById('dark-mode-override');
        if (existing) {
          existing.remove();
        }
      }
    };

    // Apply on mount
    applyDarkModeStyles();

    // Watch for class changes on body
    const observer = new MutationObserver(applyDarkModeStyles);
    observer.observe(document.body, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
