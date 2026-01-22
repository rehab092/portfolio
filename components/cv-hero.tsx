'use client';


import { StatCard } from './stat-card';
import { AIBackground } from './ui/ai-background';

// Pre-generate deterministic particle positions to avoid hydration issues
export function CVHero() {
  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center bg-black">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Enhanced gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-black to-slate-950" />

        {/* New AI Background Animation */}
        <AIBackground />

        {/* Overlay Gradients for depth (optional, keeping some subtle ones) */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-emerald-500/10 to-transparent blur-3xl opacity-40 animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-lime-500/10 to-transparent blur-3xl opacity-40 animate-blob animation-delay-2000" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Name and Title */}
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-2 text-balance tracking-tighter">
                <span className="text-white">Rehab</span>
                <span className="block mt-2 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-400 bg-clip-text text-transparent animate-gradient">Imtiaz</span>
              </h1>
              <div className="h-1.5 w-32 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-400 rounded-full mt-4 animate-pulse-glow" />
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
                <span className="text-emerald-400 font-semibold">Email:</span> rehabimtiaz092@gmail.com
              </p>
              <p className="text-sm text-gray-400">
                <span className="text-emerald-400 font-semibold">Phone:</span> +92 315 0173624
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
