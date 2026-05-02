'use client';

import { motion } from 'framer-motion';

const stats = [
  { label: 'Projects', value: '7+' },
  { label: 'Schools Using DSMS', value: '3' },
  { label: 'Efficiency Gain', value: '40%' },
  { label: 'Degrees', value: '2' },
];

export default function StatsBar() {
  return (
    <section className="py-16 border-t border-color">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div 
                className="font-heading text-3xl sm:text-4xl font-bold mb-2"
                style={{ color: 'var(--accent)' }}
              >
                {stat.value}
              </div>
              <div 
                className="text-sm sm:text-base"
                style={{ color: 'var(--muted)' }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
