'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          style={{ color: 'var(--foreground)' }}
        >
          Building Digital Systems That Work in the{' '}
          <span className="accent-color">Real World</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto"
          style={{ color: 'var(--muted)' }}
        >
          Software Engineer & CS student. I build scalable platforms for schools, farms, 
          and commerce — with real users from day one.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link 
            href="/projects"
            className="px-8 py-3 accent-bg text-white rounded-lg hover:opacity-90 transition font-medium"
          >
            View Projects
          </Link>
          <Link 
            href="/resume.pdf"
            className="px-8 py-3 border-2 rounded-lg hover:border-[var(--accent)] hover:accent-color transition font-medium"
            style={{ borderColor: 'var(--accent)', color: 'var(--foreground)' }}
          >
            Download Resume
          </Link>
          <Link 
            href="/contact"
            className="px-8 py-3 border-2 rounded-lg hover:border-[var(--accent)] hover:accent-color transition font-medium"
            style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
          >
            Contact Me
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
