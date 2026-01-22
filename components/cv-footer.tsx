'use client';

import { useEffect, useState } from 'react';

export function CVFooter() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const socialLinks = [
    { name: 'GitHub', icon: '🐙', href: 'https://github.com/rehab092' },
    { name: 'LinkedIn', icon: '💼', href: 'https://linkedin.com/in/rehab-imtiaz-3978422a5/' },
  ];

  return (
    <footer className="bg-gradient-to-t from-background via-background/80 to-background border-t border-primary/20 py-16 px-4 md:px-6 relative overflow-hidden">
      <div className="absolute inset-0 ai-grid opacity-5" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* About */}
          <div className={`space-y-4 ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`}>
            <h3 className="text-xl font-bold gradient-text">About</h3>
            <p className="text-muted-foreground/90 leading-relaxed">
              AI Full Stack Engineer passionate about building intelligent systems that solve real-world problems. Specializing in LLMs, neural networks, and scalable architecture.
            </p>
          </div>

          {/* Quick Links */}
          <div className={`space-y-4 ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
            <h3 className="text-xl font-bold gradient-text">Quick Links</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#experience" className="hover:text-primary hover:translate-x-1 transition-all duration-300 inline-block">
                  Experience
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-primary hover:translate-x-1 transition-all duration-300 inline-block">
                  Skills
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-primary hover:translate-x-1 transition-all duration-300 inline-block">
                  Projects
                </a>
              </li>
              <li>
                <a href="#education" className="hover:text-primary hover:translate-x-1 transition-all duration-300 inline-block">
                  Education
                </a>
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div className={`space-y-4 ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-bold gradient-text">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'Node.js', 'Python', 'ML', 'MongoDB', 'TypeScript'].map(
                (tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded text-xs font-medium bg-gradient-to-r from-primary/20 to-accent/10 text-primary border border-primary/30 hover:border-primary/60 transition-all hover:glow animate-slide-up"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className={`flex justify-center gap-4 mb-8 flex-wrap ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
          {socialLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="skill-badge px-4 py-2 rounded-lg hover:scale-125 transition-all duration-300 flex items-center gap-2 group"
              title={link.name}
            >
              <span className="animate-float group-hover:animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                {link.icon}
              </span>
              <span className="hidden sm:inline text-sm group-hover:text-accent transition-colors">{link.name}</span>
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="bg-gradient-to-r from-transparent via-primary/30 to-transparent h-px my-8" />

        {/* Bottom */}
        <div className="text-center text-muted-foreground text-sm space-y-2">
          <p className="animate-slide-up">
            <span className="gradient-text font-bold">Rehab Imtiaz</span> • AI Full Stack Engineer
          </p>
          <p className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            📧 rehabimtiaz092@gmail.com • 📱 +92 315 0173624
          </p>
          <p className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Built with <span className="text-accent animate-pulse-glow">♥</span> • Powered by React & Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
