import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, User, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

export function PersonalInfoForm() {
  const { data, updatePersonalInfo } = useData();
  const [formData, setFormData] = useState(data.personalInfo);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    updatePersonalInfo(formData);
    setLoading(false);
    
    alert('Personal information updated successfully!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <User className="text-yellow-400" size={24} />
        Personal Information
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white font-semibold mb-2">
              <User size={16} className="inline mr-2 text-yellow-400" />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-400 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">
              Professional Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-400 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">
              <Mail size={16} className="inline mr-2 text-yellow-400" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-400 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">
              <Phone size={16} className="inline mr-2 text-yellow-400" />
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-400 focus:outline-none transition-colors"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-white font-semibold mb-2">
              <MapPin size={16} className="inline mr-2 text-yellow-400" />
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-400 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-white font-semibold mb-2">
            Bio / About
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-400 focus:outline-none transition-colors resize-none"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Globe className="text-yellow-400" size={20} />
            Social Links
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-300 font-medium mb-2">GitHub</label>
              <input
                type="url"
                name="socialLinks.github"
                value={formData.socialLinks.github || ''}
                onChange={handleChange}
                placeholder="https://github.com/username"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-400 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-gray-300 font-medium mb-2">LinkedIn</label>
              <input
                type="url"
                name="socialLinks.linkedin"
                value={formData.socialLinks.linkedin || ''}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-400 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-gray-300 font-medium mb-2">Twitter</label>
              <input
                type="url"
                name="socialLinks.twitter"
                value={formData.socialLinks.twitter || ''}
                onChange={handleChange}
                placeholder="https://twitter.com/username"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-400 focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center gap-2"
          >
            <Save size={18} />
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </motion.div>
  );
}