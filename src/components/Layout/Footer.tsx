import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

export function Footer() {
  const { data } = useData();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-yellow-300 rounded-full animate-pulse"></div>
              </div>
              <span className="text-xl font-bold text-white font-orbitron">STARK</span>
            </div>
            <p className="text-gray-400">
              Innovation through technology. Building the future, one project at a time.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="#about" className="block text-gray-400 hover:text-yellow-400 transition-colors">About</a>
              <a href="#projects" className="block text-gray-400 hover:text-yellow-400 transition-colors">Projects</a>
              <a href="#experience" className="block text-gray-400 hover:text-yellow-400 transition-colors">Experience</a>
              <a href="#contact" className="block text-gray-400 hover:text-yellow-400 transition-colors">Contact</a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              {data.personalInfo.socialLinks.github && (
                <a
                  href={data.personalInfo.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  <Github size={20} />
                </a>
              )}
              {data.personalInfo.socialLinks.linkedin && (
                <a
                  href={data.personalInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  <Linkedin size={20} />
                </a>
              )}
              {data.personalInfo.socialLinks.twitter && (
                <a
                  href={data.personalInfo.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  <Twitter size={20} />
                </a>
              )}
              <a
                href={`mailto:${data.personalInfo.email}`}
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} {data.personalInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}