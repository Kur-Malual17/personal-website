'use client';

import { useState } from 'react';
import ProjectCard from './ProjectCard';
import { projects } from '@/lib/data';

const categories = ['All', 'Systems', 'Web', 'Mobile', 'AI'];

export default function ProjectsGrid() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div>
      {/* Category Filters */}
      <div className="flex flex-wrap gap-4 mb-12">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              activeCategory === category
                ? 'accent-bg text-white'
                : 'border-2 hover:border-[var(--accent)]'
            }`}
            style={activeCategory !== category ? { borderColor: 'var(--border)' } : {}}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map(project => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
