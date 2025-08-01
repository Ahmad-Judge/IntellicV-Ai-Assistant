import React, { useRef, useState } from 'react';
import { Pencil, X, Save, User, GraduationCap, Briefcase, Award } from "lucide-react";
import { Download, Type, Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import useResumeStore from '../store/chatstore'; // Fixed import path

const QuickEditOptions = () => {
  const resumeData = useResumeStore((state) => state.resumeData);
  const setResumeData = useResumeStore((state) => state.setResumeData);
  const [showQuickEdit, setShowQuickEdit] = useState(false);
  const [quickEditType, setQuickEditType] = useState('');
  const [editForm, setEditForm] = useState({});

  // Quick Edit Functions
  const openQuickEdit = (type) => {
    setQuickEditType(type);
    if (type === 'personal') {
      setEditForm({ ...resumeData.personalInfo });
    } else if (type === 'education') {
      setEditForm({ ...resumeData.education[0] });
    } else if (type === 'skills') {
      setEditForm({ skills: resumeData.skills ? resumeData.skills.join(', ') : '' });
    }
    setShowQuickEdit(true);
  };

  const saveQuickEdit = () => {
    // Fixed: Create new complete state object instead of using callback
    if (quickEditType === 'personal') {
      const newResumeData = {
        ...resumeData,
        personalInfo: { ...editForm }
      };
      setResumeData(newResumeData);
    } else if (quickEditType === 'education') {
      const newResumeData = {
        ...resumeData,
        education: [{ ...editForm, id: resumeData.education[0]?.id || 1 }]
      };
      setResumeData(newResumeData);
    } else if (quickEditType === 'skills') {
      const skillsArray = editForm.skills ? 
        editForm.skills.split(',').map(skill => skill.trim()).filter(skill => skill) : [];
      const newResumeData = {
        ...resumeData,
        skills: skillsArray
      };
      setResumeData(newResumeData);
    }
    
    setShowQuickEdit(false);
    setEditForm({});
  };

  const cancelQuickEdit = () => {
    setShowQuickEdit(false);
    setEditForm({});
  };

  const handleFormChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      {/* Quick Edit Modal */}
      {showQuickEdit && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 lg:p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {quickEditType === 'personal' && 'Edit Personal Info'}
                {quickEditType === 'education' && 'Edit Education'}
                {quickEditType === 'skills' && 'Edit Skills'}
              </h3>
              <button
                onClick={cancelQuickEdit}
                className="text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              {quickEditType === 'personal' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Name</label>
                    <input
                      type="text"
                      value={editForm.name || ''}
                      onChange={(e) => handleFormChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Title</label>
                    <input
                      type="text"
                      value={editForm.title || ''}
                      onChange={(e) => handleFormChange('title', e.target.value)}
                      placeholder="e.g., Software Engineer, Data Scientist"
                      className="w-full bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Email</label>
                    <input
                      type="email"
                      value={editForm.email || ''}
                      onChange={(e) => handleFormChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={editForm.phone || ''}
                      onChange={(e) => handleFormChange('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="w-full bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Location</label>
                    <input
                      type="text"
                      value={editForm.location || ''}
                      onChange={(e) => handleFormChange('location', e.target.value)}
                      placeholder="City, State/Country"
                      className="w-full bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">LinkedIn</label>
                    <input
                      type="url"
                      value={editForm.linkedin || ''}
                      onChange={(e) => handleFormChange('linkedin', e.target.value)}
                      placeholder="linkedin.com/in/yourprofile"
                      className="w-full bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">GitHub</label>
                    <input
                      type="url"
                      value={editForm.github || ''}
                      onChange={(e) => handleFormChange('github', e.target.value)}
                      placeholder="github.com/yourusername"
                      className="w-full bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}

              {quickEditType === 'education' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Degree</label>
                    <input
                      type="text"
                      value={editForm.degree || ''}
                      onChange={(e) => handleFormChange('degree', e.target.value)}
                      placeholder="e.g., Bachelor of Computer Science"
                      className="w-full bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">School/University</label>
                    <input
                      type="text"
                      value={editForm.school || ''}
                      onChange={(e) => handleFormChange('school', e.target.value)}
                      placeholder="e.g., University of Technology"
                      className="w-full bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Graduation Year</label>
                    <input
                      type="text"
                      value={editForm.year || ''}
                      onChange={(e) => handleFormChange('year', e.target.value)}
                      placeholder="e.g., 2021 or 2020-2024"
                      className="w-full bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">GPA (Optional)</label>
                    <input
                      type="text"
                      value={editForm.gpa || ''}
                      onChange={(e) => handleFormChange('gpa', e.target.value)}
                      placeholder="e.g., 3.8/4.0"
                      className="w-full bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}

              {quickEditType === 'skills' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Skills (comma-separated)</label>
                  <textarea
                    value={editForm.skills || ''}
                    onChange={(e) => handleFormChange('skills', e.target.value)}
                    placeholder="e.g., JavaScript, React, Node.js, Python, SQL"
                    rows={4}
                    className="w-full bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                    Separate each skill with a comma
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={cancelQuickEdit}
                className="flex-1 bg-gray-300 dark:bg-slate-600 text-gray-900 dark:text-white py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-slate-500 transition-colors flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              <button
                onClick={saveQuickEdit}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Edit Buttons */}
      <div className="mb-4 bg-gray-50 dark:bg-slate-700 rounded-lg p-4 print:hidden">
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium text-gray-700 dark:text-slate-300">Quick Edit Options:</h3>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => openQuickEdit('personal')}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
            >
              <User className="w-4 h-4" />
              Personal Info
            </button>
            <button
              onClick={() => openQuickEdit('education')}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
            >
              <GraduationCap className="w-4 h-4" />
              Education
            </button>
            <button
              onClick={() => openQuickEdit('skills')}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
            >
              <Award className="w-4 h-4" />
              Skills
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickEditOptions;