'use client';

import { useEffect, useState } from 'react';

export function CVFooter() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);



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
        <div className={`flex justify-center gap-6 mb-8 flex-wrap ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
          {/* GitHub */}
          <a
            href="https://github.com/rehab092"
            target="_blank"
            rel="noopener noreferrer"
            className="skill-badge px-6 py-3 rounded-lg hover:scale-110 transition-all duration-300 flex items-center gap-3 group"
            title="GitHub"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 animate-float group-hover:text-foreground"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <span className="text-sm font-medium group-hover:text-foreground transition-colors">GitHub</span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/rehab-imtiaz-3978422a5/"
            target="_blank"
            rel="noopener noreferrer"
            className="skill-badge px-6 py-3 rounded-lg hover:scale-110 transition-all duration-300 flex items-center gap-3 group"
            title="LinkedIn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 animate-float group-hover:text-foreground"
              style={{ animationDelay: '0.1s' }}
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            <span className="text-sm font-medium group-hover:text-foreground transition-colors">LinkedIn</span>
          </a>
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
