'use client';

import { useMemo } from 'react';
import { StatCard } from './stat-card';

// Pre-generate deterministic particle positions to avoid hydration issues
const generateParticles = () => {
  const particles = [];
  const seed = 12345; // Fixed seed for consistency
  let random = seed;
  
  const seededRandom = () => {
    random = (random * 9301 + 49297) % 233280;
    return random / 233280;
  };

  for (let i = 0; i < 20; i++) {
    particles.push({
      id: i,
      left: seededRandom() * 100,
      top: seededRandom() * 100,
      delay: i * 0.15,
      duration: 6 + seededRandom() * 4,
    });
  }
  return particles;
};

export function CVHero() {
  const particles = useMemo(() => generateParticles(), []);

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center bg-black">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Enhanced gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-black to-slate-950" />
        
        {/* Animated radial gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-cyan-500/20 to-transparent blur-3xl opacity-60 animate-blob" />
        <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-pink-500/20 to-transparent blur-3xl opacity-60 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-gradient-to-br from-purple-500/20 to-transparent blur-3xl opacity-60 animate-blob animation-delay-4000" />

        {/* Grid pattern overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-5" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#00d9ff" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Neural network visualization */}
        <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="xMidYMid slice">
          <defs>
            <filter id="glow-cyan">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-pink">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Animated neural connections */}
          <line x1="10%" y1="20%" x2="50%" y2="50%" stroke="#00d9ff" strokeWidth="1" opacity="0.4" className="animate-pulse" style={{ animationDuration: '3s' }} />
          <line x1="50%" y1="50%" x2="80%" y2="30%" stroke="#ff006e" strokeWidth="1" opacity="0.4" className="animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
          <line x1="80%" y1="30%" x2="30%" y2="80%" stroke="#00d9ff" strokeWidth="1" opacity="0.4" className="animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '1s' }} />
          <line x1="30%" y1="80%" x2="70%" y2="70%" stroke="#ff006e" strokeWidth="1" opacity="0.4" className="animate-pulse" style={{ animationDuration: '4s', animationDelay: '1.5s' }} />
          <line x1="70%" y1="70%" x2="20%" y2="50%" stroke="#00d9ff" strokeWidth="1" opacity="0.4" className="animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '2s' }} />
          
          {/* Animated nodes */}
          <circle cx="10%" cy="20%" r="6" fill="none" stroke="#00d9ff" strokeWidth="2" filter="url(#glow-cyan)" className="animate-ping" style={{ animationDuration: '2s' }} />
          <circle cx="50%" cy="50%" r="6" fill="none" stroke="#ff006e" strokeWidth="2" filter="url(#glow-pink)" className="animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
          <circle cx="80%" cy="30%" r="6" fill="none" stroke="#00d9ff" strokeWidth="2" filter="url(#glow-cyan)" className="animate-ping" style={{ animationDuration: '2s', animationDelay: '1s' }} />
          <circle cx="30%" cy="80%" r="6" fill="none" stroke="#ff006e" strokeWidth="2" filter="url(#glow-pink)" className="animate-ping" style={{ animationDuration: '2.5s', animationDelay: '1.5s' }} />
          <circle cx="70%" cy="70%" r="6" fill="none" stroke="#00d9ff" strokeWidth="2" filter="url(#glow-cyan)" className="animate-ping" style={{ animationDuration: '2s', animationDelay: '2s' }} />
        </svg>
        
        {/* Floating particles */}
        <div className="absolute inset-0 opacity-40">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-0.5 h-0.5 rounded-full bg-gradient-to-br from-cyan-400 to-pink-400 animate-float"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
                boxShadow: '0 0 10px rgba(0, 217, 255, 0.6)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Name and Title */}
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-2 text-balance tracking-tighter">
                <span className="text-white">REHAB</span>
                <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent animate-gradient">IMTIAZ</span>
              </h1>
              <div className="h-1.5 w-32 bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400 rounded-full mt-4 animate-pulse-glow" />
            </div>

            <div className="space-y-4">
              <p className="text-2xl md:text-3xl font-bold text-white">
                AI Full Stack Engineer
              </p>
              <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
                Building intelligent systems that merge advanced AI/ML with robust full-stack development. Specialized in LLMs, neural networks, and scalable backend architectures.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 pt-4">
              <p className="text-sm text-gray-400">
                <span className="text-cyan-400 font-semibold">Email:</span> rehabimtiaz092@gmail.com
              </p>
              <p className="text-sm text-gray-400">
                <span className="text-cyan-400 font-semibold">Phone:</span> +92 315 0173624
              </p>
            </div>
          </div>

          {/* Right side - Stats */}
          <div className="space-y-6 animate-fade-in animation-delay-100">
            <div className="grid grid-cols-2 gap-4">
              <StatCard number="2" label="Full Stack Internships" delay="0.3s" />
              <StatCard number="1" label="ML Projects" delay="0.4s" />
              <StatCard number="8+" label="Tech Stack" delay="0.5s" />
              <StatCard number="100%" label="AI Focused" delay="0.6s" />
            </div>

            {/* Quick Skills */}
            <div className="glass-effect-strong holographic p-6 rounded-xl">
              <p className="text-sm text-muted-foreground mb-3 uppercase tracking-wider font-semibold">Core Stack</p>
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'React', 'Node.js', 'Python', 'ML'].map((skill, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-accent/10 text-primary text-sm font-medium border border-primary/30 hover:border-primary/60 transition-all duration-300 hover:glow">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
