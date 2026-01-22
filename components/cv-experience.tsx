'use client';

import { useState } from 'react';

const experiences = [
  {
    title: 'Intern - Web Development',
    company: 'Prodigy InfoTech',
    period: 'Current',
    location: 'Remote',
    type: 'Internship',
    description: 'Web development and UI/UX implementation',
    highlights: [
      'Developing responsive web applications',
      'Implementing modern frontend technologies',
      'Collaborating on full-stack projects',
    ],
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Responsive Design'],
  },
  {
    title: 'Frontend Developer & Web Design Intern',
    company: 'Software Productivity Strategists (SPS)',
    period: 'Aug 2025 - Sep 2025',
    location: 'Remote',
    type: 'Internship',
    description: 'Built responsive web pages and improved UI consistency',
    highlights: [
      'Built and updated responsive web pages using HTML and CSS, matching provided layouts',
      'Improved UI consistency across screen sizes and browsers through layout fixes and testing',
      'Assisted with basic front-end enhancements and content updates making pages clean and user-friendly',
    ],
    skills: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'UI/UX'],
  },
  {
    title: 'QA Assurance Intern',
    company: 'Software Productivity Strategists (SPS)',
    period: 'Aug 2025 - Sep 2025',
    location: 'Remote',
    type: 'Internship',
    description: 'Quality assurance testing and bug tracking for web features',
    highlights: [
      'Created and executed manual test cases for web features based on requirements and expected behavior',
      'Reported bugs with clear reproduction steps and screenshots/details to help developers resolve issues faster',
      'Performed smoke and regression testing after fixes to ensure stability and reduce repeat issues',
    ],
    skills: ['Manual Testing', 'QA', 'Bug Tracking', 'Test Cases'],
  },
  {
    title: 'Developer (Internship)',
    company: 'National Disaster Management Authority (NDMA) Pakistan',
    period: 'Jul 2025 - Aug 2025',
    location: 'Islamabad, Pakistan',
    type: 'Internship',
    description: 'Front-end UI development with focus on clean and visual layouts',
    highlights: [
      'Developed front-end UI screens using HTML, CSS, and JavaScript with a focus on clean, visual layouts',
      'Improved website responsiveness and visual consistency across different screen sizes',
      'Assisted in implementing and updating web components based on internal requirements and feedback',
      'Worked with the team to test UI changes and ensure smooth user experience before submission',
    ],
    skills: ['HTML/CSS', 'JavaScript', 'UI Components', 'Responsive Design'],
  },
  {
    title: 'Machine Learning Intern (Internship)',
    company: 'Trendial Tech',
    period: 'Jun 2025 - Jul 2025',
    location: 'Remote',
    type: 'Internship',
    description: 'Supervised learning workflows and ML model development',
    highlights: [
      'Worked on supervised learning workflows including data preparation, training, and evaluation',
      'Supported fine-tuning and model improvement by testing parameters and comparing performance results',
      'Implemented basic ML pipelines and documented experiments for reproducibility and clarity',
    ],
    skills: ['Python', 'Machine Learning', 'Data Science', 'Model Training', 'TensorFlow'],
  },
];

export function CVExperience() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 px-4 md:px-6 bg-gradient-ai relative overflow-hidden">
      <div className="absolute inset-0 ai-grid opacity-5" />
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="mb-12 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="gradient-text">Experience</span>
          </h2>
          <div className="h-1.5 w-20 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse-glow" />
        </div>

        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={index}
              experience={exp}
              isActive={activeIndex === index}
              onClick={() => setActiveIndex(index)}
              delay={`${0.1 * index}s`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  experience,
  isActive,
  onClick,
  delay,
}: {
  experience: (typeof experiences)[0];
  isActive: boolean;
  onClick: () => void;
  delay: string;
}) {
  return (
    <div
      className={`animate-slide-up transition-all duration-300 cursor-pointer group ${isActive ? 'scale-100' : 'hover:scale-[1.02]'}`}
      style={{ animationDelay: delay }}
      onClick={onClick}
    >
      <div
        className={`glass-effect holographic p-6 rounded-xl transition-all duration-300 ${
          isActive
            ? 'neon-border shadow-lg shadow-primary/30 bg-gradient-to-br from-primary/10 to-accent/5'
            : 'border border-primary/20 hover:border-primary/50 hover:bg-primary/5'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl font-bold gradient-text mb-1 group-hover:animate-code-highlight">{experience.title}</h3>
            <p className="text-primary font-semibold">{experience.company}</p>
            <p className="text-sm text-muted-foreground">
              {experience.location} • {experience.type}
            </p>
          </div>
          <div className="text-sm text-muted-foreground whitespace-nowrap px-3 py-1 rounded-full bg-primary/10 font-mono">
            {experience.period}
          </div>
        </div>

        {isActive && (
          <div className="space-y-4 animate-slide-up">
            <div className="h-px bg-gradient-to-r from-primary/50 via-accent/30 to-transparent" />
            <p className="text-foreground leading-relaxed">{experience.description}</p>

            <ul className="space-y-2">
              {experience.highlights.map((highlight, i) => (
                <li key={i} className="flex gap-3 text-foreground/90 text-sm animate-slide-left" style={{ animationDelay: `${i * 0.1}s` }}>
                  <span className="text-primary flex-shrink-0 mt-0.5 font-bold animate-pulse">→</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 pt-4">
              {experience.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-accent/10 text-primary text-xs font-medium border border-primary/30 hover:border-primary/60 transition-all hover:glow animate-slide-up"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
