'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Profile {
  name: string;
  title: string;
  tagline: string;
  description: string;
  profile_image: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
}

// Data
const skillCategories = [
  { title: 'Frontend', skills: ['React.js', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'TypeScript'], color: '#0066CC' },
  { title: 'Backend', skills: ['Django', 'Node.js', 'Express.js', 'PHP', 'REST API Development'], color: '#00A86B' },
  { title: 'Mobile', skills: ['Flutter', 'Dart'], color: '#0066CC' },
  { title: 'Database', skills: ['PostgreSQL', 'MySQL', 'Firebase'], color: '#00A86B' },
  { title: 'AI/ML', skills: ['Python', 'scikit-learn', 'NLP', 'Machine Learning'], color: '#0066CC' },
  { title: 'Tools', skills: ['Git', 'GitHub', 'CI/CD', 'Redux', 'Context API', 'Paystack', 'WordPress', 'UI/UX Design'], color: '#00A86B' },
];

const projects = [
  {
    title: 'Digital School Management System (DSMS)',
    description: 'Enterprise school platform deployed in 3 secondary schools in Juba. Handles student registration, attendance, grading, fee management, teacher dashboards, and course registration.',
    technologies: ['Django', 'PostgreSQL', 'JavaScript', 'REST APIs'],
    featured: true,
    impact: 'Used by 3 schools | 40% efficiency improvement',
    githubUrl: 'https://github.com',
    liveUrl: 'https://dsms.suddtech.com'
  },
  {
    title: 'Resume Screening AI App',
    description: 'Intelligent hiring tool using NLP and ML to match resumes to job descriptions and rank candidates by relevance.',
    technologies: ['Python', 'Machine Learning', 'NLP', 'scikit-learn'],
    featured: false,
    githubUrl: 'https://github.com'
  },
  {
    title: 'SpeedyServe Food Delivery App',
    description: 'Mobile app for ordering food from local restaurants with real-time delivery tracking and integrated payments.',
    technologies: ['Flutter', 'Firebase', 'Dart'],
    featured: false,
    githubUrl: 'https://github.com'
  },
];

const experiences = [
  {
    role: 'Founder & CEO',
    company: 'SuddTech',
    location: 'South Sudan',
    period: 'Jan 2026 – Present',
    description: 'Built DSMS deployed in 3 schools. Leads software development and digital strategy.',
    isLeadership: true,
    color: '#0066CC'
  },
  {
    role: 'President',
    company: 'International Students Association, Ashesi University',
    location: 'Accra, Ghana',
    period: 'Jan 2026 – Present',
    description: 'Represents 100+ international students. Liaison between students and administration.',
    isLeadership: true,
    color: '#00A86B'
  },
  {
    role: 'Software Engineering Intern',
    company: 'African Foundations Network',
    location: 'Juba, South Sudan',
    period: 'Jun 2025 – Sep 2025',
    description: 'Built features for AFN website, contributed to agile development workflows.',
    isLeadership: false,
    color: '#00A86B'
  },
];

const education = [
  {
    institution: 'Ashesi University',
    degree: 'BSc Computer Science',
    period: '2024 – Expected 2027',
    location: 'Accra, Ghana',
    scholarship: 'Mastercard Foundation Scholar',
    relevant: ['Web Technologies', 'Algorithms', 'Systems'],
    color: '#0066CC'
  },
  {
    institution: 'African Leadership University',
    degree: 'BSc Software Engineering',
    period: 'Sep 2022 – Aug 2025',
    location: 'Rwanda',
    relevant: ['Full Stack Development', 'Mobile App', 'Database Management', 'AI/ML', 'Git'],
    color: '#00A86B'
  },
];

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/profile/me/`)
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error('Error fetching profile:', err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
    <main className="min-h-screen">
