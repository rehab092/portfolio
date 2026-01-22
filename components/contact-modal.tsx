'use client';

import { useEffect, useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm animate-pulse-glow"
          onClick={onClose}
          style={{ animationDuration: '0.3s' }}
        />
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
          <div
            className="bg-background border border-primary/30 rounded-2xl p-8 max-w-md w-full shadow-2xl shadow-primary/20 animate-slide-up pointer-events-auto glass-effect-strong holographic"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold gradient-text">Get in Touch</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-6" />

            {/* Contact Info */}
            <div className="space-y-4">
              {/* Email */}
              <div className="group">
                <p className="text-sm text-muted-foreground mb-2 font-medium uppercase tracking-wider">Email</p>
                <a
                  href="mailto:rehabimtiaz092@gmail.com"
                  className="block px-4 py-3 rounded-lg bg-gradient-to-r from-primary/10 to-accent/5 border border-primary/20 hover:border-primary/50 text-primary hover:text-accent transition-all duration-300 font-medium"
                >
                  rehabimtiaz092@gmail.com
                </a>
              </div>

              {/* Phone */}
              <div className="group">
                <p className="text-sm text-muted-foreground mb-2 font-medium uppercase tracking-wider">Phone</p>
                <a
                  href="tel:+923150173624"
                  className="block px-4 py-3 rounded-lg bg-gradient-to-r from-primary/10 to-accent/5 border border-primary/20 hover:border-primary/50 text-primary hover:text-accent transition-all duration-300 font-medium"
                >
                  +92 315 0173624
                </a>
              </div>

              {/* LinkedIn */}
              <div className="group">
                <p className="text-sm text-muted-foreground mb-2 font-medium uppercase tracking-wider">LinkedIn</p>
                <a
                  href="https://linkedin.com/in/rehab-imtiaz-3978422a5/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 rounded-lg bg-gradient-to-r from-primary/10 to-accent/5 border border-primary/20 hover:border-primary/50 text-primary hover:text-accent transition-all duration-300 font-medium"
                >
                  linkedin.com/in/rehab-imtiaz-3978422a5/
                </a>
              </div>

              {/* GitHub */}
              <div className="group">
                <p className="text-sm text-muted-foreground mb-2 font-medium uppercase tracking-wider">GitHub</p>
                <a
                  href="https://github.com/rehab092"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 rounded-lg bg-gradient-to-r from-primary/10 to-accent/5 border border-primary/20 hover:border-primary/50 text-primary hover:text-accent transition-all duration-300 font-medium"
                >
                  github.com/rehab092
                </a>
              </div>
            </div>

            {/* Footer */}
            <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent my-6" />
            <button
              onClick={onClose}
              className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-primary/20 to-accent/10 border border-primary/30 text-primary hover:border-primary/60 hover:bg-primary/30 transition-all duration-300 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
