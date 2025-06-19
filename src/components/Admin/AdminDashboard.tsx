import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, Code, Award, Upload } from 'lucide-react';
import { PersonalInfoForm } from './PersonalInfoForm';
import { ProjectsManager } from './ProjectsManager';
import { ExperienceManager } from './ExperienceManager';
import { SkillsManager } from './SkillsManager';
import { ResumeUpload } from './ResumeUpload';

type TabType = 'personal' | 'projects' | 'experience' | 'skills' | 'resume';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('personal');

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'resume', label: 'Resume', icon: Upload },
  ] as const;

  const renderContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfoForm />;
      case 'projects':
        return <ProjectsManager />;
      case 'experience':
        return <ExperienceManager />;
      case 'skills':
        return <SkillsManager />;
      case 'resume':
        return <ResumeUpload />;
      default:
        return <PersonalInfoForm />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl font-bold text-white mb-8 font-orbitron">Admin Dashboard</h1>

          <div className="bg-gray-800 rounded-lg border border-yellow-500/20 overflow-hidden">
            {/* Tab Navigation */}
            <div className="border-b border-gray-700">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-yellow-400 text-yellow-400'
                          : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
                      }`}
                    >
                      <Icon size={18} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {renderContent()}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}