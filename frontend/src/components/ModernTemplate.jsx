import React from 'react';
import { Download, User, Briefcase, GraduationCap, Award, Type, Mail, Phone, MapPin, Linkedin } from 'lucide-react';

  // Modern Template - Optimized for single page printing
  const ModernTemplate = ({ resumeData, getFontSizeClass, field1, field2,field3 }) => (
    <div
      className="bg-white mx-auto w-full max-w-[794px] shadow-2xl print:shadow-none print:w-[794px] print:h-[1123px] print:max-h-[1123px] overflow-hidden"
      style={getFontSizeClass()}
    >
      {/* Compact Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white p-4 print:p-3">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="font-bold mb-1" style={getFontSizeClass(1.8)}>
              {resumeData?.personalInfo?.name || 'Your Name'}
            </h1>
            <p className="text-slate-300" style={getFontSizeClass(1.1)}>
              {resumeData?.personalInfo?.title || 'Your Title'}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-3" style={getFontSizeClass(0.75)}>
          <div className="flex items-center gap-1">
            <Mail className="w-3 h-3" />
            <span className="truncate">{resumeData?.personalInfo?.email || 'email@example.com'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Phone className="w-3 h-3" />
            <span>{resumeData?.personalInfo?.phone || 'Phone'}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>{resumeData?.personalInfo?.location || 'Location'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Linkedin className="w-3 h-3" />
            <span className="truncate">{resumeData?.personalInfo?.linkedin || 'LinkedIn'}</span>
          </div>
        </div>
      </div>

      <div className="p-4 print:p-3 space-y-3">
        {/* Summary - Compact */}
        {resumeData?.summary && (
          <section>
            <div className="flex items-center gap-1 mb-2">
              <User className="w-4 h-4 text-slate-600" />
              <h2 className="font-bold text-slate-800" style={getFontSizeClass(1.1)}>
                Summary
              </h2>
            </div>
            <p className="text-slate-600 leading-tight text-justify" style={getFontSizeClass(0.85)}>
              {resumeData.summary}
            </p>
          </section>
        )}

        {/* Experience - More Compact */}
        <section>
          <div className="flex items-center gap-1 mb-2">
            <Briefcase className="w-4 h-4 text-slate-600" />
            <h2 className="font-bold text-slate-800" style={getFontSizeClass(1.1)}>
              {field1}
            </h2>
          </div>
          <div className="space-y-2">
            {(resumeData?.experience || []).map((exp) => (
              <div key={exp.id} className="border-l-2 border-blue-500 pl-2">
                <div className="flex justify-between items-start mb-1">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 leading-tight" style={getFontSizeClass(0.95)}>
                      {exp.title} • <span className="text-blue-600">{exp.company}</span>
                    </h3>
                  </div>
                  <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500 ml-2 flex-shrink-0" style={getFontSizeClass(0.7)}>
                    {exp.duration}
                  </span>
                </div>
                <p className="text-slate-600 leading-tight text-justify" style={getFontSizeClass(0.8)}>
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects - Streamlined */}
        <section>
          <div className="flex items-center gap-1 mb-2">
            <Award className="w-4 h-4 text-slate-600" />
            <h2 className="font-bold text-slate-800" style={getFontSizeClass(1.1)}>
              {field2}
            </h2>
          </div>
          <div className="space-y-2">
            {(resumeData?.projects || []).map((project) => (
              <div key={project.id} className="border-l-2 border-slate-400 pl-2">
                <h3 className="font-semibold text-slate-800 mb-1" style={getFontSizeClass(0.95)}>
                  {project.name}
                </h3>
                <p className="text-slate-600 mb-1 leading-tight text-justify" style={getFontSizeClass(0.8)}>
                  {project.description}
                </p>
                
                {/* Key Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <ul className="mb-1 space-y-0">
                    {project.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-1 text-slate-600" style={getFontSizeClass(0.75)}>
                        <span className="text-slate-400 mt-0.5 flex-shrink-0">•</span>
                        <span className="leading-tight">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div style={getFontSizeClass(0.75)}>
                  <span className="font-medium text-slate-700">Tech: </span>
                  <span className="text-slate-600">{(project.technologies || []).join(', ')}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Two-column layout for Education and Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Education */}
          <section>
            <div className="flex items-center gap-1 mb-2">
              <GraduationCap className="w-4 h-4 text-slate-600" />
              <h2 className="font-bold text-slate-800" style={getFontSizeClass(1.1)}>
                {field3}
              </h2>
            </div>
            <div className="space-y-2">
              {(resumeData?.education || []).map((edu) => (
                <div key={edu.id} className="border-l-2 border-green-500 pl-2">
                  <h3 className="font-semibold text-slate-800 leading-tight" style={getFontSizeClass(0.9)}>
                    {edu.degree}
                  </h3>
                  <p className="text-green-600 font-medium leading-tight" style={getFontSizeClass(0.85)}>
                    {edu.school}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500" style={getFontSizeClass(0.75)}>
                      {edu.year}
                    </span>
                    {edu.gpa && (
                      <span className="text-slate-500" style={getFontSizeClass(0.75)}>
                        GPA: {edu.gpa}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section>
            <div className="flex items-center gap-1 mb-2">
              <Award className="w-4 h-4 text-slate-600" />
              <h2 className="font-bold text-slate-800" style={getFontSizeClass(1.1)}>
                Skills
              </h2>
            </div>
            <div className="flex flex-wrap gap-1">
              {(resumeData?.skills || []).map((skill, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-0.5 rounded-full font-medium"
                  style={getFontSizeClass(0.7)}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
export default ModernTemplate;