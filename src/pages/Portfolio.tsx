import React from 'react';
import { Hero } from '../components/Portfolio/Hero';
import { About } from '../components/Portfolio/About';
import { Projects } from '../components/Portfolio/Projects';
import { Experience } from '../components/Portfolio/Experience';
import { Skills } from '../components/Portfolio/Skills';
import { Contact } from '../components/Portfolio/Contact';

export function Portfolio() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
    </main>
  );
}