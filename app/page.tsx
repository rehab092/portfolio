'use client';

import { useState } from 'react';
import { CVHero } from '@/components/cv-hero';
import { CVExperience } from '@/components/cv-experience';
import { CVSkills } from '@/components/cv-skills';
import { CVProjects } from '@/components/cv-projects';
import { CVEducation } from '@/components/cv-education';
import { CVFooter } from '@/components/cv-footer';
import { ContactModal } from '@/components/contact-modal';

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/20">
        <div className="container mx-auto px-4 py-4 md:py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg md:text-xl gradient-text">REHAB IMTIAZ</span>
          </div>
          <div className="hidden md:flex gap-6 items-center">
            {['Experience', 'Skills', 'Projects', 'Education'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-foreground hover:text-primary transition-colors text-sm font-medium"
              >
                {item}
              </a>
            ))}
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-4 py-2 rounded-lg bg-primary text-background hover:bg-accent transition-colors font-medium"
            >
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* Sections */}
      <div className="pt-16">
        <CVHero />

        <section id="experience">
          <CVExperience />
        </section>

        <section id="skills">
          <CVSkills />
        </section>

        <section id="projects">
          <CVProjects />
        </section>

        <section id="education">
          <CVEducation />
        </section>

        <CVFooter />
      </div>
    </main>
  );
}
