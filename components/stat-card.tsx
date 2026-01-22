'use client';

interface StatCardProps {
  number: string;
  label: string;
  delay?: string;
}

export function StatCard({ number, label, delay = '0s' }: StatCardProps) {
  return (
    <div
      className="p-6 rounded-xl border border-cyan-500/30 bg-gradient-to-br from-slate-900/50 to-black/50 backdrop-blur-md hover:border-cyan-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 animate-fade-in"
      style={{ animationDelay: delay }}
    >
      <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400 mb-2 animate-gradient">
        {number}
      </div>
      <p className="text-sm text-gray-400 font-medium">{label}</p>
    </div>
  );
}
