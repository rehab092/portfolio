'use client';

import { useState } from 'react';

const projects = [
  {
    title: 'Weather Application',
    description: 'Interactive weather dashboard with real-time data display and conversion',
    tech: ['HTML', 'CSS', 'JavaScript'],
    highlights: [
      'Real-time weather data fetching',
      'Interactive dashboard with sorting',
      'Data conversion and formatting',
    ],
    link: 'https://rehab092.github.io/Weather-Application/',
    category: 'Frontend',
  },
  {
    title: 'Car Rental and Sale System',
    description: 'Full-stack MERN application for vehicle management',
    tech: ['MongoDB', 'Express', 'React', 'Node.js'],
    highlights: [
      'Complete CRUD operations',
      'User authentication',
      'Rental and sales management',
    ],
    category: 'Full Stack',
  },
  {
    title: 'Café Management System',
    description: 'Enterprise application with role-based portals',
    tech: ['C#', 'SQL', 'SSMS'],
    highlights: [
      'Role-based access control',
      'Database optimization',
      'Business logic implementation',
    ],
    category: 'Backend',
  },
  {
    title: 'Maze Game',
    description: 'Console-based maze generation and solving algorithm',
    tech: ['C++'],
    highlights: [
      'Pathfinding algorithms',
      'Game logic implementation',
      'Console UI design',
    ],
    category: 'Algorithms',
  },
];

export function CVProjects() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredProjects = activeCategory
    ? projects.filter((p) => p.category === activeCategory)
    : projects;

  const categories = ['Frontend', 'Backend', 'Full Stack', 'Algorithms'];

  return (
    <section className="py-24 px-4 md:px-6 bg-gradient-ai relative overflow-hidden">
      <div className="absolute inset-0 ai-grid opacity-5" />
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="mb-12 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="gradient-text">Projects</span>
          </h2>
          <div className="h-1.5 w-20 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse-glow" />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              activeCategory === null
                ? 'bg-gradient-to-r from-primary to-accent text-background font-bold shadow-lg shadow-primary/30'
                : 'skill-badge hover:scale-110'
            }`}
          >
            All Projects
          </button>
          {categories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-primary to-accent text-background font-bold shadow-lg shadow-primary/30'
                  : 'skill-badge hover:scale-110'
              }`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} delay={`${0.1 * index}s`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  delay,
}: {
  project: (typeof projects)[0];
  delay: string;
}) {
  return (
    <div className="animate-slide-up" style={{ animationDelay: delay }}>
      <div className="glass-effect-strong holographic p-6 rounded-xl h-full flex flex-col hover:scale-105 hover:neon-border transition-all duration-300 group">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-accent/30 to-accent/10 text-accent text-xs font-semibold mb-3 border border-accent/30 group-hover:border-accent/60">
            {project.category}
          </span>
          <h3 className="text-xl font-bold gradient-text group-hover:animate-code-highlight">
            {project.title}
          </h3>
        </div>

        <p className="text-muted-foreground mb-4 flex-grow leading-relaxed">{project.description}</p>

        {/* Highlights */}
        <ul className="space-y-2 mb-6">
          {project.highlights.map((highlight, i) => (
            <li key={i} className="flex gap-2 text-sm text-foreground/90 animate-slide-left" style={{ animationDelay: `${i * 0.1}s` }}>
              <span className="text-primary font-bold animate-pulse-glow">✓</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-md bg-gradient-to-r from-primary/20 to-accent/10 text-primary text-xs font-medium border border-primary/30 hover:border-primary/60 transition-all group-hover:glow animate-slide-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Link */}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-accent transition-all font-semibold mt-auto group-hover:gap-3"
          >
            View Project <span className="group-hover:animate-slide-right">→</span>
          </a>
        )}
      </div>
    </div>
  );
}
