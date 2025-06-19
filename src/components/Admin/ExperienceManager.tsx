import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Briefcase, Calendar, Building } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { Experience } from '../../types';

export function ExperienceManager() {
  const { data, addExperience, updateExperience, deleteExperience } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    duration: '',
    description: '',
    technologies: '',
  });

  const resetForm = () => {
    setFormData({
      company: '',
      position: '',
      duration: '',
      description: '',
      technologies: '',
    });
    setEditingExperience(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const experienceData = {
      ...formData,
      technologies: formData.technologies.split(',').map(tech => tech.trim()),
    };

    if (editingExperience) {
      updateExperience(editingExperience.id, experienceData);
    } else {
      addExperience(experienceData);
    }

    resetForm();
    alert(`Experience ${editingExperience ? 'updated' : 'added'} successfully!`);
  };

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience);
    setFormData({
      company: experience.company,
      position: experience.position,
      duration: experience.duration,
      description: experience.description,
      technologies: experience.technologies.join(', '),
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      deleteExperience(id);
      alert('Experience deleted successfully!');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Briefcase className="text-yellow-400" size={24} />
          Experience Manager
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 flex items-center gap-2"
        >
          <Plus size={18} />
          Add Experience
        </button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="bg-gray-700/50 rounded-lg p-6 mb-8 border border-gray-600"
        >
          <h3 className="text-lg font-semibold text-white mb-4">
            {editingExperience ? 'Edit Experience' : 'Add New Experience'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:border-yellow-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Position</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:border-yellow-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                placeholder="e.g., 2020 - Present"
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:border-yellow-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:border-yellow-400 focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Technologies/Skills (comma-separated)</label>
              <input
                type="text"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                required
                placeholder="React, TypeScript, Leadership"
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:border-yellow-400 focus:outline-none"
              />
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition-colors"
              >
                {editingExperience ? 'Update' : 'Add'} Experience
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-gray-600 text-white font-semibold rounded hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="space-y-6">
        {data.experience.map((exp) => (
          <motion.div
            key={exp.id}
            layout
            className="bg-gray-700/50 rounded-lg p-6 border border-gray-600 hover:border-yellow-400/50 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Building className="text-yellow-400" size={20} />
                  {exp.position}
                </h3>
                <h4 className="text-yellow-400 font-semibold">{exp.company}</h4>
                <div className="flex items-center space-x-2 text-gray-300 mt-1">
                  <Calendar size={16} />
                  <span>{exp.duration}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(exp)}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>

            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-sm rounded-full border border-yellow-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}