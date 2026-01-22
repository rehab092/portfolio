'use client';

import { useEffect, useRef } from 'react';

const skillCategories = [
  {
    category: 'Frontend',
    icon: '⚛️',
    skills: [
      { name: 'JavaScript', level: 85 },
      { name: 'React', level: 80 },
      { name: 'HTML/CSS', level: 85 },
      { name: 'Tailwind CSS', level: 90 },
    ],
  },
  {
    category: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', level: 80 },
      { name: 'Express', level: 78 },
      { name: 'REST APIs', level: 85 },
      { name: 'Authentication', level: 75 },
    ],
  },
  {
    category: 'AI/ML',
    icon: '🤖',
    skills: [
      { name: 'Python', level: 75 },
      { name: 'Machine Learning', level: 70 },
      { name: 'Data Science', level: 72 },
      { name: 'Model Training', level: 68 },
    ],
  },
  {
    category: 'Databases',
    icon: '💾',
    skills: [
      { name: 'MongoDB', level: 80 },
      { name: 'MySQL', level: 82 },
      { name: 'SQL Server', level: 78 },
      { name: 'Data Modeling', level: 80 },
    ],
  },
  {
    category: 'Languages',
    icon: '🗣️',
    skills: [
      { name: 'JavaScript', level: 85 },
      { name: 'C++', level: 70 },
      { name: 'C#', level: 72 },
      { name: 'Java', level: 68 },
    ],
  },
  {
    category: 'Testing',
    icon: '✅',
    skills: [
      { name: 'Manual Testing', level: 85 },
      { name: 'QA', level: 80 },
      { name: 'Regression Testing', level: 78 },
      { name: 'Test Cases', level: 82 },
    ],
  },
];

export function CVSkills() {
  return (
    <section className="py-24 px-4 md:px-6 bg-background relative overflow-hidden">
      <div className="absolute inset-0 ai-grid opacity-5" />
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="gradient-text">Technical Skills</span>
          </h2>
          <div className="h-1.5 w-20 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse-glow" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCategoryCard key={index} category={category} delay={`${0.1 * index}s`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCategoryCard({
  category,
  delay,
}: {
  category: (typeof skillCategories)[0];
  delay: string;
}) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    refs.current.forEach((ref, index) => {
      if (!ref) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            ref.style.animation = `slideInUp 0.6s ease-out ${0.05 * index}s forwards`;
            observer.unobserve(ref);
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(ref);
    });
  }, []);

  return (
    <div className="animate-slide-up group" style={{ animationDelay: delay }}>
      <div className="glass-effect-strong holographic p-6 rounded-xl h-full hover:scale-105 transition-all duration-300 border border-primary/20 hover:border-primary/50 relative overflow-hidden">
        {/* AI Neural Pulse Background */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 animate-ai-pulse-ring" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl animate-float group-hover:animate-quantum-spin" style={{ animationDelay: `${0.2 * parseFloat(delay)}s` }}>
              {category.icon}
            </span>
            <h3 className="text-xl font-bold gradient-text group-hover:animate-ai-blink">{category.category}</h3>
          </div>

          <div className="space-y-2.5">
            {category.skills.map((skill, index) => (
              <div
                key={index}
                ref={(el) => (refs.current[index] = el)}
                className="group/skill cursor-default animate-slide-up relative"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative px-3 py-2 rounded-lg bg-gradient-to-r from-primary/10 to-accent/5 border border-primary/20 hover:border-primary/40 transition-all duration-300 group-hover/skill:bg-primary/15 group-hover/skill:shadow-lg group-hover/skill:shadow-primary/25 overflow-hidden">
                  {/* Neural Flow Effect on Hover */}
                  <div className="absolute inset-0 opacity-0 group-hover/skill:opacity-15 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent animate-neural-flow" />
                  </div>
                  <span className="relative text-foreground font-medium text-sm group-hover/skill:text-primary transition-colors">
                    {skill.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
