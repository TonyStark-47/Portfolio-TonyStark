import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, File, Trash2, ExternalLink } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

export function ResumeUpload() {
  const { data, updatePersonalInfo } = useData();
  const [dragActive, setDragActive] = useState(false);
  const [uploadUrl, setUploadUrl] = useState(data.personalInfo.resumeUrl || '');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    // In a real application, this would upload to a cloud service
    // For demo purposes, we'll create a mock URL
    const mockUrl = `https://example.com/resumes/${file.name}`;
    
    updatePersonalInfo({
      ...data.personalInfo,
      resumeUrl: mockUrl,
    });
    
    setUploadUrl(mockUrl);
    alert('Resume uploaded successfully! (Demo - file not actually uploaded)');
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updatePersonalInfo({
      ...data.personalInfo,
      resumeUrl: uploadUrl,
    });
    
    alert('Resume URL updated successfully!');
  };

  const handleRemoveResume = () => {
    if (confirm('Are you sure you want to remove the resume?')) {
      updatePersonalInfo({
        ...data.personalInfo,
        resumeUrl: undefined,
      });
      setUploadUrl('');
      alert('Resume removed successfully!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Upload className="text-yellow-400" size={24} />
        Resume Management
      </h2>

      <div className="space-y-8">
        {/* Current Resume */}
        {data.personalInfo.resumeUrl && (
          <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
            <h3 className="text-lg font-semibold text-white mb-4">Current Resume</h3>
            <div className="flex items-center justify-between p-4 bg-gray-600 rounded-lg">
              <div className="flex items-center space-x-3">
                <File className="text-yellow-400" size={24} />
                <div>
                  <p className="text-white font-medium">Resume File</p>
                  <p className="text-gray-300 text-sm">{data.personalInfo.resumeUrl}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <a
                  href={data.personalInfo.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-green-400 hover:text-green-300 transition-colors"
                  title="View Resume"
                >
                  <ExternalLink size={18} />
                </a>
                <button
                  onClick={handleRemoveResume}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors"
                  title="Remove Resume"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* File Upload */}
        <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
          <h3 className="text-lg font-semibold text-white mb-4">Upload New Resume</h3>
          
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? 'border-yellow-400 bg-yellow-400/10'
                : 'border-gray-500 hover:border-yellow-400/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-white font-medium mb-2">
              Drag and drop your resume here, or click to browse
            </p>
            <p className="text-gray-400 text-sm mb-4">
              Supported formats: PDF, DOC, DOCX (Max 10MB)
            </p>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileInput}
              className="hidden"
              id="resume-upload"
            />
            <label
              htmlFor="resume-upload"
              className="inline-block px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-semibold rounded cursor-pointer hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300"
            >
              Choose File
            </label>
          </div>
        </div>

        {/* URL Input */}
        <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
          <h3 className="text-lg font-semibold text-white mb-4">Or Enter Resume URL</h3>
          
          <form onSubmit={handleUrlSubmit} className="space-y-4">
            <div>
              <label className="block text-white font-medium mb-2">Resume URL</label>
              <input
                type="url"
                value={uploadUrl}
                onChange={(e) => setUploadUrl(e.target.value)}
                placeholder="https://example.com/your-resume.pdf"
                className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white focus:border-yellow-400 focus:outline-none transition-colors"
              />
            </div>
            
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300"
            >
              Update Resume URL
            </button>
          </form>
        </div>

        {/* Tips */}
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-400 mb-3">Tips for Your Resume</h3>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li>• Keep your resume updated with your latest experience and skills</li>
            <li>• Use a professional format that's easy to read</li>
            <li>• Ensure the file is accessible and can be viewed by potential employers</li>
            <li>• Consider hosting on Google Drive, Dropbox, or your personal website</li>
            <li>• Test the link regularly to ensure it's working properly</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}