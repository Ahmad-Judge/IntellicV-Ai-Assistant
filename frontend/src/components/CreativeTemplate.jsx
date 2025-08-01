import React from 'react';
import { Download, User, Briefcase, GraduationCap, Award, Type, Mail, Phone, MapPin, Linkedin } from 'lucide-react';


  // Creative Template - Inspired by the provided design
  const CreativeTemplate = ({ resumeData, getFontSizeClass,field1, field2,field3  }) => (
    <div
      className="bg-white mx-auto w-full max-w-[794px] shadow-2xl print:shadow-none print:w-[794px] print:h-[1123px] print:max-h-[1123px] overflow-hidden"
      style={getFontSizeClass()}
    >
      {/* Dark Header Section */}
      <div className="bg-slate-700 text-white text-center py-8 print:py-6 relative">
       
        
        {/* Name and Title */}
        <h1 className="font-bold text-white mb-2" style={getFontSizeClass(2.5)}>
          {resumeData?.personalInfo?.name || 'Your Name'}
        </h1>
        <p className="text-slate-300" style={getFontSizeClass(1.3)}>
          {resumeData?.personalInfo?.title || 'Your Title'}
        </p>
        
        {/* Decorative bottom border */}
        <div className=""></div>
      </div>

      {/* Main Content Area - Two Column Layout */}
      <div className="flex min-h-[800px]">
        {/* Left Sidebar - Contact, Education, Skills */}
        <div className="w-1/3 bg-slate-200 p-6 print:p-4">
          
          {/* Contact Details */}
          <section className="mb-6">
            <h2 className="font-bold text-slate-800 mb-4 text-lg" style={getFontSizeClass(1.2)}>
              Contact Details
            </h2>
            <div className="space-y-3" style={getFontSizeClass(0.85)}>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-3 h-3 text-white" />
                </div>
                <span className="text-slate-700 break-all leading-relaxed underline">
                  {resumeData?.personalInfo?.email || 'email@example.com'}
                </span>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-3 h-3 text-white" />
                </div>
                <span className="text-slate-700 leading-relaxed">
                  {resumeData?.personalInfo?.phone || 'Phone'}
                </span>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-3 h-3 text-white" />
                </div>
                <span className="text-slate-700 leading-relaxed">
                  {resumeData?.personalInfo?.location || 'Location'}
                </span>
              </div>
            </div>
          </section>

          {/* Education */}
          <section className="mb-6">
            <h2 className="font-bold text-slate-800 mb-4 text-lg" style={getFontSizeClass(1.2)}>
              {field3}
            </h2>
            <div className="space-y-4">
              {(resumeData?.education || []).map((edu) => (
                <div key={edu.id} className="border-l-4 border-slate-600 pl-4">
                  <div className="w-3 h-3 bg-slate-600 rounded-full -ml-6 mt-1 relative z-10"></div>
                  <h3 className="font-bold text-slate-800 leading-tight" style={getFontSizeClass(0.95)}>
                    {edu.degree}
                  </h3>
                  <p className="text-slate-700 font-medium" style={getFontSizeClass(0.85)}>
                    {edu.school}
                  </p>
                  <p className="text-slate-600" style={getFontSizeClass(0.8)}>
                    {edu.year}
                  </p>
                  {edu.gpa && (
                    <p className="text-slate-600" style={getFontSizeClass(0.8)}>
                      GPA: {edu.gpa}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section>
            <h2 className="font-bold text-slate-800 mb-4 text-lg" style={getFontSizeClass(1.2)}>
              Skills
            </h2>
            <div className="space-y-2">
              {(resumeData?.skills || []).map((skill, index) => (
                <div key={index} className="text-slate-700" style={getFontSizeClass(0.85)}>
                  <span className="font-medium">{skill}</span> - <span className="text-slate-600">Expert</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Main Content - Summary, Experience, Projects */}
        <div className="flex-1 bg-white p-6 print:p-4">
          
          {/* Summary */}
          {/* {resumeData?.summary && (
            <section className="mb-6">
              <h2 className="font-bold text-slate-800 mb-3 pb-2 border-b-2 border-slate-800" style={getFontSizeClass(1.3)}>
                Summary
              </h2>
              <p className="text-slate-700 leading-relaxed" style={getFontSizeClass(0.9)}>
                {resumeData.summary}
              </p>
            </section>
          )} */}

          {/* Work Experience */}
          <section className="mb-6">
            <h2 className="font-bold text-slate-800 mb-4 pb-2 border-b-2 border-slate-800" style={getFontSizeClass(1.3)}>
              {field1}
            </h2>
            <div className="space-y-5">
              {(resumeData?.experience || []).map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-slate-800" style={getFontSizeClass(1.0)}>
                        {exp.title}, {exp.company}
                      </h3>
                    </div>
                    <span className="text-slate-600 font-medium text-right flex-shrink-0 ml-4" style={getFontSizeClass(0.85)}>
                      {exp.duration}
                    </span>
                  </div>
                  
                  {/* Description as bullet points if it contains multiple sentences */}
                  <div className="text-slate-700" style={getFontSizeClass(0.85)}>
                    {exp.description && (
                      <ul className="space-y-1">
                        {exp.description.split('. ').filter(sentence => sentence.trim()).map((sentence, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-slate-600 rounded-full mt-2 flex-shrink-0"></span>
                            <span className="leading-relaxed">
                              {sentence.trim()}{sentence.trim() && !sentence.trim().endsWith('.') ? '.' : ''}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          {resumeData?.projects && resumeData.projects.length > 0 && (
            <section className="mb-6">
              <h2 className="font-bold text-slate-800 mb-4 pb-2 border-b-2 border-slate-800" style={getFontSizeClass(1.3)}>
                {field2}
              </h2>
              <div className="space-y-4">
                {resumeData.projects.map((project) => (
                  <div key={project.id}>
                    <h3 className="font-bold text-slate-800 mb-2" style={getFontSizeClass(1.0)}>
                      {project.name}
                    </h3>
                    <p className="text-slate-700 mb-2 leading-relaxed" style={getFontSizeClass(0.85)}>
                      {project.description}
                    </p>
                    
                    {project.highlights && project.highlights.length > 0 && (
                      <ul className="mb-2 space-y-1">
                        {project.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-2 text-slate-700" style={getFontSizeClass(0.8)}>
                            <span className="w-1.5 h-1.5 bg-slate-600 rounded-full mt-2 flex-shrink-0"></span>
                            <span className="leading-relaxed">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {project.technologies && project.technologies.length > 0 && (
                      <p className="text-slate-600" style={getFontSizeClass(0.8)}>
                        <span className="font-medium">Technologies:</span> {project.technologies.join(', ')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* References */}
          {/* <section>
            <h2 className="font-bold text-slate-800 mb-3 pb-2 border-b-2 border-slate-800" style={getFontSizeClass(1.3)}>
              References
            </h2>
            <p className="text-slate-700" style={getFontSizeClass(0.9)}>
              References available upon request
            </p>
          </section> */}
        </div>
      </div>
    </div>
  );
export default CreativeTemplate;