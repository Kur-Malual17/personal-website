'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="card-bg rounded-xl overflow-hidden border border-color hover:border-[var(--accent)] transition"
    >
      {project.featured && (
        <div className="accent-bg text-white text-xs font-bold px-3 py-1 inline-block">
          ⭐ FEATURED
        </div>
      )}
      
      <div className="p-6">
        <h3 className="font-heading text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-sm text-muted mb-4">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map(tech => (
            <span 
              key={tech}
              className="text-xs px-3 py-1 rounded-full"
              style={{ backgroundColor: 'var(--background)' }}
            >
              {tech}
            </span>
          ))}
        </div>
        
        {project.impact && (
          <p className="text-sm accent-color font-medium mb-4">
            💡 {project.impact}
          </p>
        )}
        
        <div className="flex gap-3">
          {project.githubUrl && (
            <a 
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-4 py-2 border rounded-lg hover:border-[var(--accent)] transition"
              style={{ borderColor: 'var(--border)' }}
            >
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a 
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-4 py-2 accent-bg text-white rounded-lg hover:opacity-90 transition"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
