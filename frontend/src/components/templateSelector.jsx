// TemplateSelector.jsx
import React from 'react';
import { Layout, Palette, FileText, Briefcase } from 'lucide-react';

const TemplateSelector = ({ selectedTemplate, setSelectedTemplate }) => {
  const templates = [
    {
      id: 'classic',
      name: 'Classic',
      description: 'Clean and professional design',
      icon: FileText,
      preview: 'Simple layout with blue accents'
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'Contemporary with gradient header',
      icon: Layout,
      preview: 'Dark header with colorful sections'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Bold and artistic design',
      icon: Palette,
      preview: 'Coming soon - Vibrant colors'
    },
    {
      id: 'executive',
      name: 'Executive',
      description: 'Minimal and sophisticated',
      icon: Briefcase,
      preview: 'Coming soon - Premium look'
    }
  ];

  return (
    <div className="mb-4 bg-gray-50 rounded-lg p-4 print:hidden">
      <div className="flex items-center gap-2 mb-3">
        <Layout className="w-5 h-5 text-gray-600" />
        <h3 className="text-sm font-medium text-gray-700">Resume Template</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {templates.map((template) => {
          const IconComponent = template.icon;
          const isAvailable = template.id === 'classic' || template.id === 'modern' || template.id === 'creative';
          const isSelected = selectedTemplate === template.id;
          
          return (
            <button
              key={template.id}
              onClick={() => isAvailable && setSelectedTemplate(template.id)}
              disabled={!isAvailable}
              className={`
                relative p-3 rounded-lg border-2 text-left transition-all duration-200
                ${isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-gray-300'
                }
                ${!isAvailable
                  ? 'opacity-50 cursor-not-allowed'
                  : 'cursor-pointer hover:shadow-sm'
                }
              `}
            >
              {/* Selected indicator */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full"></div>
              )}
              
              {/* Template icon */}
              <div className={`
                w-8 h-8 rounded-lg flex items-center justify-center mb-2
                ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}
              `}>
                <IconComponent className="w-4 h-4" />
              </div>
              
              {/* Template info */}
              <div>
                <h4 className={`
                  font-medium text-sm mb-1
                  ${isSelected ? 'text-blue-700' : 'text-gray-800'}
                `}>
                  {template.name}
                  {!isAvailable && (
                    <span className="ml-1 text-xs text-gray-400">(Soon)</span>
                  )}
                </h4>
                <p className="text-xs text-gray-500 leading-tight">
                  {template.description}
                </p>
              </div>
              
              {/* Preview hint */}
              <div className="mt-2 text-xs text-gray-400">
                {template.preview}
              </div>
            </button>
          );
        })}
      </div>
      
      <div className="mt-3 text-xs text-gray-500">
        💡 Select a template to change your resume design. More templates coming soon!
      </div>
    </div>
  );
};

export default TemplateSelector;