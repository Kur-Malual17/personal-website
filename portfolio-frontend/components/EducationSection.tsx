'use client';

import { motion } from 'framer-motion';

const education = [
  {
    institution: 'Ashesi University',
    degree: 'BSc Computer Science',
    period: '2024 – Expected 2027',
    location: 'Accra, Ghana',
    scholarship: 'Mastercard Foundation Scholar',
    relevant: ['Web Technologies', 'Algorithms', 'Systems'],
  },
  {
    institution: 'African Leadership University',
    degree: 'BSc Software Engineering',
    period: 'Sep 2022 – Aug 2025',
    location: 'Rwanda',
    relevant: ['Full Stack Development', 'Mobile App', 'Database Management', 'AI/ML', 'Git'],
  },
  {
    institution: 'Nimule Model Secondary School',
    degree: 'High School Diploma',
    period: 'Graduated 2020',
    location: 'South Sudan',
  },
];

export default function EducationSection() {
  return (
    <div className="space-y-8">
      {education.map((edu, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="card-bg p-8 rounded-xl border border-color"
        >
          <div className="flex flex-wrap items-start justify-between mb-4">
            <div>
              <h3 className="font-heading text-2xl font-bold mb-2">{edu.institution}</h3>
              <p className="text-lg font-medium accent-color">{edu.degree}</p>
            </div>
            <span className="text-sm text-muted">{edu.period}</span>
          </div>
          
          <p className="text-muted mb-4">📍 {edu.location}</p>
          
          {edu.scholarship && (
            <div className="mb-4">
              <span className="inline-block px-4 py-2 accent-bg text-white text-sm rounded-lg">
                🏆 {edu.scholarship}
              </span>
            </div>
          )}
          
          {edu.relevant && (
            <div>
              <p className="text-sm font-semibold mb-2">Relevant Coursework:</p>
              <div className="flex flex-wrap gap-2">
                {edu.relevant.map(course => (
                  <span
                    key={course}
                    className="px-3 py-1 text-sm rounded-full"
                    style={{ backgroundColor: 'var(--background)' }}
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
