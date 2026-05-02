'use client';

import { motion } from 'framer-motion';

const experiences = [
  {
    role: 'Founder & CEO',
    company: 'SuddTech',
    location: 'South Sudan',
    period: 'Jan 2026 – Present',
    description: 'Built DSMS deployed in 3 schools. Leads software development and digital strategy.',
    isLeadership: true,
  },
  {
    role: 'President',
    company: 'International Students Association, Ashesi University',
    location: 'Accra, Ghana',
    period: 'Jan 2026 – Present',
    description: 'Represents 100+ international students. Liaison between students and administration.',
    isLeadership: true,
  },
  {
    role: 'Communication & Digital Lead',
    company: 'EduPower Youth Foundation',
    location: 'Bor, South Sudan',
    period: 'May 2025 – Dec 2025',
    description: 'Maintained and developed education platforms and multimedia content.',
    isLeadership: false,
  },
  {
    role: 'Software Engineering Intern',
    company: 'African Foundations Network',
    location: 'Juba, South Sudan',
    period: 'Jun 2025 – Sep 2025',
    description: 'Built features for AFN website, contributed to agile development workflows.',
    isLeadership: false,
  },
  {
    role: 'Course Representative',
    company: 'Web Technologies, Ashesi University',
    location: 'Accra, Ghana',
    period: 'Sep 2025 – Dec 2025',
    description: 'Liaison between students and course instructor.',
    isLeadership: true,
  },
  {
    role: 'Member of Parliament',
    company: 'Ashesi Student Council',
    location: 'Accra, Ghana',
    period: 'Jan 2025 – Jan 2026',
    description: 'Advocated for student interests in university governance.',
    isLeadership: true,
  },
];

export default function ExperienceTimeline() {
  return (
    <div className="space-y-8">
      {experiences.map((exp, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="relative pl-8 border-l-2 border-[var(--accent)]"
        >
          <div className="absolute -left-2 top-0 w-4 h-4 rounded-full accent-bg"></div>
          
          <div className="card-bg p-6 rounded-xl border border-color">
            <div className="flex flex-wrap items-start justify-between mb-2">
              <h3 className="font-heading text-xl font-bold">{exp.role}</h3>
              {exp.isLeadership && (
                <span className="text-xs px-3 py-1 accent-bg text-white rounded-full">
                  Leadership
                </span>
              )}
            </div>
            <p className="font-medium accent-color mb-1">{exp.company}</p>
            <p className="text-sm text-muted mb-3">
              {exp.location} | {exp.period}
            </p>
            <p style={{ color: 'var(--foreground)' }}>{exp.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
