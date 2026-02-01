'use client';

interface StatCardProps {
  number: string;
  label: string;
  delay?: string;
}

export function StatCard({ number, label, delay = '0s' }: StatCardProps) {
  return (
    <div
      className={`p-6 rounded-xl border border-blue-500/30 bg-gradient-to-br from-slate-900/50 to-black/50 backdrop-blur-md hover:border-blue-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 animate-fade-in`}
      style={{ animationDelay: delay }}
    >
      <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 mb-2 animate-gradient">
        {number}
      </div>
      <p className="text-sm text-gray-400 font-medium">{label}</p>
    </div>
  );
}
