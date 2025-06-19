import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

export function About() {
  const { data } = useData();

  return (
    <section id="about" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-orbitron">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-yellow-400/20 to-blue-500/20 rounded-lg overflow-hidden">
                <img
                  src="/tony_image.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 border-2 border-yellow-400/30 rounded-lg transform rotate-3"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-gray-300 text-lg leading-relaxed">
              {data.personalInfo.bio}
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="text-yellow-400" size={20} />
                <span className="text-gray-300">{data.personalInfo.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-yellow-400" size={20} />
                <span className="text-gray-300">{data.personalInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="text-yellow-400" size={20} />
                <span className="text-gray-300">{data.personalInfo.location}</span>
              </div>
            </div>

            <div className="pt-6">
              <h3 className="text-xl font-semibold text-white mb-4">What I Do</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-700/50 rounded-lg border border-yellow-500/20">
                  <h4 className="text-yellow-400 font-semibold mb-2">Innovation</h4>
                  <p className="text-gray-300 text-sm">Creating breakthrough technologies</p>
                </div>
                <div className="p-4 bg-gray-700/50 rounded-lg border border-yellow-500/20">
                  <h4 className="text-yellow-400 font-semibold mb-2">Leadership</h4>
                  <p className="text-gray-300 text-sm">Guiding teams to success</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
