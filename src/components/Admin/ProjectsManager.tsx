import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Star, Code, ExternalLink } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { Project } from '../../types';

export function ProjectsManager() {
  const { data, addProject, updateProject, deleteProject } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    imageUrl: '',
    demoUrl: '',
    githubUrl: '',
    featured: false,
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      technologies: '',
      imageUrl: '',
      demoUrl: '',
      githubUrl: '',
      featured: false,
    });
    setEditingProject(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const projectData = {
      ...formData,
      technologies: formData.technologies.split(',').map(tech => tech.trim()),
    };

    if (editingProject) {
      updateProject(editingProject.id, projectData);
    } else {
      addProject(projectData);
    }

    resetForm();
    alert(`Project ${editingProject ? 'updated' : 'added'} successfully!`);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(', '),
      imageUrl: project.imageUrl,
      demoUrl: project.demoUrl || '',
      githubUrl: project.githubUrl || '',
      featured: project.featured,
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
      alert('Project deleted successfully!');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
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
          <Code className="text-yellow-400" size={24} />
          Projects Manager
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 flex items-center gap-2"
        >
          <Plus size={18} />
          Add Project
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
            {editingProject ? 'Edit Project' : 'Add New Project'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:border-yellow-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Image URL</label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:border-yellow-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:border-yellow-400 focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Technologies (comma-separated)</label>
              <input
                type="text"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                required
                placeholder="React, TypeScript, Node.js"
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:border-yellow-400 focus:outline-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Demo URL (optional)</label>
                <input
                  type="url"
                  name="demoUrl"
                  value={formData.demoUrl}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:border-yellow-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">GitHub URL (optional)</label>
                <input
                  type="url"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:border-yellow-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4 text-yellow-400 bg-gray-600 border-gray-500 rounded focus:ring-yellow-400"
              />
              <label htmlFor="featured" className="text-white font-medium">Featured Project</label>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition-colors"
              >
                {editingProject ? 'Update' : 'Add'} Project
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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.projects.map((project) => (
          <motion.div
            key={project.id}
            layout
            className="bg-gray-700/50 rounded-lg overflow-hidden border border-gray-600 hover:border-yellow-400/50 transition-all duration-300"
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  {project.title}
                  {project.featured && <Star className="text-yellow-400" size={16} />}
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-3 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex space-x-3">
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-green-400">
                    <ExternalLink size={14} />
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400">
                    <Code size={14} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}