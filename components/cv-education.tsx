'use client';

const education = [
  {
    degree: "Bachelor of Software Engineering",
    school: "National University of Computer and Emerging Sciences (FAST)",
    location: "H-11/4 Islamabad",
    period: "August 2022 - Present",
    achievements: [
      "Dean's List of Honors",
      "Strong focus on AI and Machine Learning",
      "Cumulative coursework in full-stack development",
    ],
  },
  {
    degree: "Intermediate in Pre-Engineering",
    school: "Army Public School and College System",
    location: "Humayun Road",
    period: "August 2019 - July 2021",
    achievements: ["Strong foundation in mathematics and sciences"],
  },
];

const certifications = [
  {
    title: "Process Mining: Data Science in Action",
    issuer: "Coursera",
    period: "August 2024 - January 2025",
    description: "Comprehensive course on process mining and data science applications",
  },
];

export function CVEducation() {
  return (
    <section className="py-24 px-4 md:px-6 bg-background relative overflow-hidden">
      <div className="absolute inset-0 ai-grid opacity-5" />
      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Education */}
        <div className="mb-16">
          <div className="mb-12 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="gradient-text">Education</span>
            </h2>
            <div className="h-1.5 w-20 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse-glow" />
          </div>

          <div className="space-y-6">
            {education.map((edu, index) => (
              <EducationCard key={index} education={edu} delay={`${0.1 * index}s`} />
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <div className="mb-12 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="gradient-text">Certifications</span>
            </h2>
            <div className="h-1.5 w-20 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse-glow" />
          </div>

          <div className="space-y-6">
            {certifications.map((cert, index) => (
              <CertificationCard key={index} certification={cert} delay={`${0.1 * index + 0.3}s`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EducationCard({
  education: edu,
  delay,
}: {
  education: (typeof education)[0];
  delay: string;
}) {
  return (
    <div className="animate-slide-up group" style={{ animationDelay: delay }}>
      <div className="glass-effect-strong holographic p-6 rounded-xl hover:scale-105 transition-all duration-300 border border-primary/20 hover:border-primary/50 hover:neon-border">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl font-bold gradient-text mb-2 group-hover:animate-code-highlight">{edu.degree}</h3>
            <p className="text-primary font-semibold">{edu.school}</p>
            <p className="text-sm text-muted-foreground">{edu.location}</p>
          </div>
          <div className="text-sm text-muted-foreground whitespace-nowrap px-3 py-1 rounded-full bg-primary/10 font-mono">{edu.period}</div>
        </div>

        <ul className="space-y-2 mt-4">
          {edu.achievements.map((achievement, i) => (
            <li key={i} className="flex gap-3 text-foreground/90 animate-slide-left" style={{ animationDelay: `${i * 0.1}s` }}>
              <span className="text-accent flex-shrink-0 animate-pulse-glow">★</span>
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CertificationCard({
  certification: cert,
  delay,
}: {
  certification: (typeof certifications)[0];
  delay: string;
}) {
  return (
    <div className="animate-slide-up group" style={{ animationDelay: delay }}>
      <div className="glass-effect-strong holographic p-6 rounded-xl border-l-4 border-l-primary hover:border-l-accent transition-all duration-300 hover:scale-105 hover:neon-border">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <h3 className="text-xl font-bold gradient-text group-hover:animate-code-highlight">{cert.title}</h3>
            <p className="text-primary font-semibold">{cert.issuer}</p>
          </div>
          <span className="text-sm text-muted-foreground whitespace-nowrap px-3 py-1 rounded-full bg-primary/10 font-mono">{cert.period}</span>
        </div>
        <p className="text-foreground/90 mt-2 leading-relaxed">{cert.description}</p>
      </div>
    </div>
  );
}
