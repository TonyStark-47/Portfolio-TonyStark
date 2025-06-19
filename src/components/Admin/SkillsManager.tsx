import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Award } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { Skill } from '../../types';

export function SkillsManager() {
  const { data, addSkill, updateSkill, deleteSkill } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    level: 80,
    category: '',
  });

  const skillCategories = [...new Set(data.skills.map(skill => skill.category))];

  const resetForm = () => {
    setFormData({
      name: '',
      level: 80,
      category: '',
    });
    setEditingSkill(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingSkill) {
      updateSkill(editingSkill.id, formData);
    } else {
      addSkill(formData);
    }

    resetForm();
    alert(`Skill ${editingSkill ? 'updated' : 'added'} successfully!`);
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      level: skill.level,
      category: skill.category,
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      deleteSkill(id);
      alert('Skill deleted successfully!');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'level' ? parseInt(value) : value,
    }));
  };

  const groupedSkills = data.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Award className="text-yellow-400" size={24} />
          Skills Manager
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 flex items-center gap-2"
        >
          <Plus size={18} />
          Add Skill
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
            {editingSkill ? 'Edit Skill' : 'Add New Skill'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Skill Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:border-yellow-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Category</label>
                <input
                  list="categories"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:border-yellow-400 focus:outline-none"
                  placeholder="e.g., Engineering, Technology, Management"
                />
                <datalist id="categories">
                  {skillCategories.map(category => (
                    <option key={category} value={category} />
                  ))}
                </datalist>
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">
                Proficiency Level: {formData.level}%
              </label>
              <input
                type="range"
                name="level"
                min="1"
                max="100"
                value={formData.level}
                onChange={handleChange}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition-colors"
              >
                {editingSkill ? 'Update' : 'Add'} Skill
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

      <div className="space-y-8">
        {Object.entries(groupedSkills).map(([category, skills]) => (
          <div key={category}>
            <h3 className="text-xl font-bold text-white mb-4">{category}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {skills.map((skill) => (
                <motion.div
                  key={skill.id}
                  layout
                  className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 hover:border-yellow-400/50 transition-all duration-300"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">{skill.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-400 font-semibold">{skill.level}%</span>
                      <button
                        onClick={() => handleEdit(skill)}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(skill.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}