'use client';

import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['React.js', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'TypeScript'],
  },
  {
    title: 'Backend',
    skills: ['Django', 'Node.js', 'Express.js', 'PHP', 'REST API Development'],
  },
  {
    title: 'Mobile',
    skills: ['Flutter', 'Dart'],
  },
  {
    title: 'Database',
    skills: ['PostgreSQL', 'MySQL', 'Firebase'],
  },
  {
    title: 'AI/ML',
    skills: ['Python', 'scikit-learn', 'NLP', 'Machine Learning'],
  },
  {
    title: 'Tools',
    skills: ['Git', 'GitHub', 'CI/CD', 'Redux', 'Context API', 'Paystack', 'WordPress', 'UI/UX Design'],
  },
];

export default function SkillsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {skillCategories.map((category, index) => (
        <motion.div
          key={category.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="card-bg p-6 rounded-xl border border-color"
        >
          <h3 className="font-heading text-xl font-bold mb-4 accent-color">{category.title}</h3>
          <div className="flex flex-wrap gap-2">
            {category.skills.map(skill => (
              <span
                key={skill}
                className="px-3 py-1 text-sm rounded-full"
                style={{ backgroundColor: 'var(--background)' }}
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
