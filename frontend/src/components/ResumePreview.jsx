// ResumePreview.jsx
import React, { useRef, useState, useEffect } from 'react';
import { Pencil, X, Save, User, GraduationCap, Briefcase, Award, Loader } from "lucide-react";
import { Download, Type, Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import TemplateSelector from './templateSelector';
import ClassicTemplate from './classicTemplate';
import ModernTemplate from './ModernTemplate';
import CreativeTemplate from './CreativeTemplate';
import QuickEditOptions from './quickEditOptions'; 
import useAuthStore from "../store/useAuthStore";
import useResumeStore from '../store/chatstore';

const ResumePreview = () => {
  const { user, fetchUser, isLoading: authLoading } = useAuthStore();
  const resumeData = useResumeStore((state) => state.resumeData);
  const setResumeData = useResumeStore((state) => state.setResumeData);
  const { fetchResume, saveResume, isLoading, isSaving, error, clearError } = useResumeStore();

  const resumeRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const [Field1, setField1] = useState('Experience');
  const [Field2, setField2] = useState('Projects');
  const [Field3, setField3] = useState('Education');

  const [fontSize, setFontSize] = useState(12);
  const [selectedTemplate, setSelectedTemplate] = useState('classic');

  // Generate dynamic font size classes based on the fontSize state
  const getFontSizeClass = (multiplier = 1) => {
    const size = Math.round(fontSize * multiplier);
    return { fontSize: `${size}px` };
  };

  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: `${resumeData?.personalInfo?.name || 'My'}-Resume`,
  });

  // Initialize user on component mount
  useEffect(() => {
    console.log('🚀 Component mounting, fetching user...');
    fetchUser();
  }, [fetchUser]);

  // Watch for user changes and fetch resume when user becomes available
  useEffect(() => {
    console.log('👤 User effect triggered:', { 
      hasUser: !!user, 
      userId: user?.id, 
      isResumeLoading: isLoading,
      resumeName: resumeData?.personalInfo?.name 
    });

    if (user?.id && !isLoading) {
      console.log('📄 Fetching resume for user:', user.id);
      fetchResume(user.id);
    } else if (!user) {
      console.log('ℹ️ No user found, skipping resume fetch');
    } else if (isLoading) {
      console.log('⏳ Resume is already loading, skipping');
    }
  }, [user?.id, fetchResume]);

  // Separate effect to handle loading state without causing infinite loops
  useEffect(() => {
    console.log('🔄 State update:', { 
      authLoading: useAuthStore.getState().isLoading,
      resumeLoading: isLoading,
      hasUser: !!user,
      userId: user?.id,
      hasResume: !!resumeData?.personalInfo?.name
    });
  }, [user, isLoading, resumeData]);

  // Clear save message after 3 seconds
  useEffect(() => {
    if (saveMessage) {
      const timer = setTimeout(() => {
        setSaveMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [saveMessage]);

  // Handle save with better error handling and user feedback
  const handleSave = async () => {
    if (!user) {
      setSaveMessage('⚠️ Please log in to save your resume.');
      return;
    }

    try {
      clearError(); // Clear any previous errors
      await saveResume(user.id);
      setSaveMessage('✅ Resume saved successfully!');
    } catch (error) {
      console.error('Save error:', error);
      setSaveMessage('❌ Error saving resume. Please try again.');
    }
  };

  // Function to render the selected template
  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'modern':
        return <ModernTemplate resumeData={resumeData} getFontSizeClass={getFontSizeClass} field1={Field1} field2={Field2} field3={Field3}/>;
      case 'creative':
        return <CreativeTemplate  resumeData={resumeData} getFontSizeClass={getFontSizeClass} field1={Field1} field2={Field2} field3={Field3}/>;
      case 'classic':
      default:
        return <ClassicTemplate resumeData={resumeData} getFontSizeClass={getFontSizeClass} field1={Field1} field2={Field2} field3={Field3}/>;
    }
  };

  return (
    <div className="w-full lg:w-1/2 bg-slate-800/80 flex flex-col h-screen lg:h-screen">
      {/* Loading Overlay */}
      {(isLoading || authLoading) && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-40">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg flex items-center gap-3">
            <Loader className="w-5 h-5 animate-spin text-blue-500" />
            <span className="text-gray-700 dark:text-gray-300">
              {authLoading ? 'Loading user...' : 'Loading resume...'}
            </span>
          </div>
        </div>
      )}

      {/* Scrollable Content Section */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-6">
        {/* Error Display */}
        {error && (
          <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-red-600 dark:text-red-400">❌</span>
                <span className="text-red-700 dark:text-red-300 text-sm">{error}</span>
              </div>
              <button
                onClick={clearError}
                className="text-red-500 hover:text-red-700 dark:hover:text-red-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Save Message Display */}
        {saveMessage && (
          <div className={`mb-4 border rounded-lg p-4 ${
            saveMessage.includes('✅') 
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300'
              : saveMessage.includes('⚠️')
              ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300'
              : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-sm">{saveMessage}</span>
              <button
                onClick={() => setSaveMessage('')}
                className="opacity-50 hover:opacity-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Template Selector */}
        <div className="mb-6">
          <TemplateSelector 
            selectedTemplate={selectedTemplate} 
            setSelectedTemplate={setSelectedTemplate} 
          />
        </div>

        <QuickEditOptions
          resumeData={resumeData} 
          setResumeData={setResumeData}
        />

        {/* Font Size Control */}
        <div className="mb-4 bg-gray-50 dark:bg-slate-700 rounded-lg p-4 print:hidden">
          <div className="flex items-center gap-3">
            <Type className="w-5 h-5 text-gray-600 dark:text-slate-300" />
            <label className="text-sm font-medium text-gray-700 dark:text-slate-300">
              Print Font Size: {fontSize}px
            </label>
            <input
              type="range"
              min="10"
              max="18"
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <button
              onClick={() => setFontSize(14)}
              className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-gray-700 transition-colors"
            >
              Reset
            </button>
          </div>
          <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">
            Adjust font size for optimal printing. Preview shows approximate print size.
          </div>
        </div>

       {/* Action Buttons */}
<div className="
  flex flex-col sm:flex-row sm:flex-wrap 
  justify-center gap-3 sm:gap-4 mb-6 w-full
">
  {/* Refresh Button */}
  <button
    onClick={() => user?.id && fetchResume(user.id)}
    disabled={isLoading || !user}
    className={`flex items-center justify-center gap-2 
                w-full sm:w-auto px-4 lg:px-6 py-2 lg:py-3 rounded-xl 
                transition-all duration-200 font-medium text-sm lg:text-base
                ${isLoading || !user
                  ? 'bg-gray-400 cursor-not-allowed text-gray-700'
                  : 'bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700'
                }`}
  >
    {isLoading ? (
      <Loader className="w-4 h-4 lg:w-5 lg:h-5 animate-spin" />
    ) : (
      <Download className="w-4 h-4 lg:w-5 lg:h-5 rotate-180" />
    )}
    {isLoading ? 'Loading...' : 'Refresh'}
  </button>

  {/* Save Button */}
  <button
    onClick={handleSave}
    disabled={isSaving || !user}
    className={`flex items-center justify-center gap-2 
                w-full sm:w-auto px-4 lg:px-6 py-2 lg:py-3 rounded-xl 
                transition-all duration-200 font-medium text-sm lg:text-base
                ${isSaving || !user
                  ? 'bg-gray-400 cursor-not-allowed text-gray-700'
                  : 'bg-gradient-to-r from-green-500 to-blue-600 text-white hover:from-green-600 hover:to-blue-700'
                }`}
  >
    {isSaving ? (
      <Loader className="w-4 h-4 lg:w-5 lg:h-5 animate-spin" />
    ) : (
      <Save className="w-4 h-4 lg:w-5 lg:h-5" />
    )}
    {isSaving ? 'Saving...' : 'Save'}
  </button>

  {/* Download Button */}
  <button
    onClick={handlePrint}
    className="flex items-center justify-center gap-2 
               w-full sm:w-auto bg-gradient-to-r from-green-500 to-blue-600 text-white 
               px-4 lg:px-6 py-2 lg:py-3 rounded-xl hover:from-green-600 hover:to-blue-700 
               transition-all duration-200 font-medium text-sm lg:text-base"
  >
    <Download className="w-4 h-4 lg:w-5 lg:h-5" />
    Download PDF
  </button>

  {/* Edit Section Titles Button */}
  <button
    onClick={() => setIsModalOpen(true)}
    className="flex items-center justify-center gap-2 
               w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white 
               px-4 lg:px-6 py-2 lg:py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 
               transition-all duration-200 font-medium text-sm lg:text-base"
  >
    <Pencil className="w-4 h-4 lg:w-5 lg:h-5" />
    Edit Section Titles
  </button>
</div>

        {/* Resume Preview */}
        <div ref={resumeRef}>
          {renderTemplate()}
        </div>
      </div>

      {/* Modal for Editing Section Titles */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              Edit Section Titles
            </h2>

            <label className="block mb-2 text-gray-700 dark:text-gray-300">Field 1</label>
            <input
              type="text"
              value={Field1}
              onChange={(e) => setField1(e.target.value)}
              className="w-full mb-4 p-2 border rounded-lg dark:bg-slate-700 dark:text-white"
            />

            <label className="block mb-2 text-gray-700 dark:text-gray-300">Field 2</label>
            <input
              type="text"
              value={Field2}
              onChange={(e) => setField2(e.target.value)}
              className="w-full mb-4 p-2 border rounded-lg dark:bg-slate-700 dark:text-white"
            />

            <label className="block mb-2 text-gray-700 dark:text-gray-300">Field 3</label>
            <input
              type="text"
              value={Field3}
              onChange={(e) => setField3(e.target.value)}
              className="w-full mb-4 p-2 border rounded-lg dark:bg-slate-700 dark:text-white"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-600 text-white hover:from-green-600 hover:to-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;