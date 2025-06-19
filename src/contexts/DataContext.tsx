import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioData, Project, Experience, Skill, PersonalInfo } from '../types';

interface DataContextType {
  data: PortfolioData;
  updatePersonalInfo: (info: PersonalInfo) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addExperience: (experience: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
}

const defaultData: PortfolioData = {
  personalInfo: {
    name: 'Tony Stark',
    title: 'Genius, Billionaire, Playboy, Philanthropist',
    bio: 'Innovative engineer and entrepreneur with expertise in advanced technology development, artificial intelligence, and sustainable energy solutions. Passionate about creating technology that makes the world a better place.',
    email: 'tony@starkindustries.com',
    phone: '+1 (555) 123-4567',
    location: 'Malibu, CA',
    socialLinks: {
      github: 'https://github.com/tonystark',
      linkedin: 'https://linkedin.com/in/tonystark',
      twitter: 'https://twitter.com/tonystark',
    },
  },
  projects: [
    {
      id: '1',
      title: 'Arc Reactor Technology',
      description: 'Revolutionary clean energy source using palladium core technology. Sustainable, efficient, and virtually unlimited power generation.',
      technologies: ['Palladium', 'Nuclear Physics', 'Energy Engineering'],
      imageUrl: 'https://images.pexels.com/photos/2085998/pexels-photo-2085998.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: true,
    },
    {
      id: '2',
      title: 'JARVIS AI Assistant',
      description: 'Advanced AI system for home automation, security, and personal assistance. Natural language processing with machine learning capabilities.',
      technologies: ['AI/ML', 'Natural Language Processing', 'Neural Networks'],
      imageUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: true,
    },
    {
      id: '3',
      title: 'Holographic Interface',
      description: 'Next-generation user interface using holographic projection technology. Intuitive gesture controls and 3D visualization.',
      technologies: ['Holography', 'Gesture Recognition', 'AR/VR'],
      imageUrl: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false,
    },
  ],
  experience: [
    {
      id: '1',
      company: 'Stark Industries',
      position: 'CEO & Chief Technology Officer',
      duration: '2008 - Present',
      description: 'Leading innovation in clean energy, artificial intelligence, and advanced manufacturing. Transformed company from weapons manufacturer to sustainable technology leader.',
      technologies: ['Leadership', 'Innovation', 'Clean Energy', 'AI'],
    },
    {
      id: '2',
      company: 'MIT',
      position: 'Guest Lecturer',
      duration: '2010 - 2015',
      description: 'Taught advanced engineering courses and mentored graduate students in sustainable technology development.',
      technologies: ['Education', 'Engineering', 'Research'],
    },
  ],
  skills: [
    { id: '1', name: 'Mechanical Engineering', level: 98, category: 'Engineering' },
    { id: '2', name: 'Artificial Intelligence', level: 95, category: 'Technology' },
    { id: '3', name: 'Physics', level: 92, category: 'Science' },
    { id: '4', name: 'Leadership', level: 88, category: 'Management' },
    { id: '5', name: 'Innovation', level: 99, category: 'Creative' },
  ],
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData>(defaultData);

  useEffect(() => {
    const savedData = localStorage.getItem('portfolio_data');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  const saveData = (newData: PortfolioData) => {
    setData(newData);
    localStorage.setItem('portfolio_data', JSON.stringify(newData));
  };

  const updatePersonalInfo = (info: PersonalInfo) => {
    const newData = { ...data, personalInfo: info };
    saveData(newData);
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: Date.now().toString() };
    const newData = { ...data, projects: [...data.projects, newProject] };
    saveData(newData);
  };

  const updateProject = (id: string, project: Partial<Project>) => {
    const newData = {
      ...data,
      projects: data.projects.map(p => p.id === id ? { ...p, ...project } : p),
    };
    saveData(newData);
  };

  const deleteProject = (id: string) => {
    const newData = {
      ...data,
      projects: data.projects.filter(p => p.id !== id),
    };
    saveData(newData);
  };

  const addExperience = (experience: Omit<Experience, 'id'>) => {
    const newExperience = { ...experience, id: Date.now().toString() };
    const newData = { ...data, experience: [...data.experience, newExperience] };
    saveData(newData);
  };

  const updateExperience = (id: string, experience: Partial<Experience>) => {
    const newData = {
      ...data,
      experience: data.experience.map(e => e.id === id ? { ...e, ...experience } : e),
    };
    saveData(newData);
  };

  const deleteExperience = (id: string) => {
    const newData = {
      ...data,
      experience: data.experience.filter(e => e.id !== id),
    };
    saveData(newData);
  };

  const addSkill = (skill: Omit<Skill, 'id'>) => {
    const newSkill = { ...skill, id: Date.now().toString() };
    const newData = { ...data, skills: [...data.skills, newSkill] };
    saveData(newData);
  };

  const updateSkill = (id: string, skill: Partial<Skill>) => {
    const newData = {
      ...data,
      skills: data.skills.map(s => s.id === id ? { ...s, ...skill } : s),
    };
    saveData(newData);
  };

  const deleteSkill = (id: string) => {
    const newData = {
      ...data,
      skills: data.skills.filter(s => s.id !== id),
    };
    saveData(newData);
  };

  const value = {
    data,
    updatePersonalInfo,
    addProject,
    updateProject,
    deleteProject,
    addExperience,
    updateExperience,
    deleteExperience,
    addSkill,
    updateSkill,
    deleteSkill,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}