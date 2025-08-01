import React from 'react';

import { Briefcase, Award, GraduationCap } from 'lucide-react';

const ClassicTemplate = ({ resumeData, getFontSizeClass,field1, field2,field3  }) => (
  <div
    className="bg-white mx-auto w-full max-w-[794px] h-auto p-6 lg:p-10 text-black shadow-2xl print:shadow-none print:p-10 print:w-[794px] print:h-auto"
    style={getFontSizeClass()}
  >
    <div className="text-center border-b pb-3 lg:pb-4 mb-4">
      <h1 className="font-bold text-gray-900 mb-1" style={getFontSizeClass(2.2)}>
        {resumeData?.personalInfo?.name || 'Your Name'}
      </h1>
      <p className="text-gray-600 mb-2" style={getFontSizeClass(1.3)}>
        {resumeData?.personalInfo?.title || 'Your Title'}
      </p>
      <p className="text-gray-500 mb-1" style={getFontSizeClass(0.85)}>
        {resumeData?.personalInfo?.email || 'email@example.com'} | {resumeData?.personalInfo?.phone || 'Phone'} | {resumeData?.personalInfo?.location || 'Location'}
      </p>
      <p className="text-gray-500" style={getFontSizeClass(0.85)}>
        {resumeData?.personalInfo?.linkedin || 'LinkedIn'} | {resumeData?.personalInfo?.github || 'GitHub'}
      </p>
    </div>

    {/* Experience */}
    <section className="mb-4">
      <h2 className="font-semibold text-blue-800 mb-2 flex items-center gap-2" style={getFontSizeClass(1.4)}>
        <Briefcase className="w-4 h-4" /> {field1}
      </h2>
      {(resumeData?.experience || []).map((exp) => (
        <div key={exp.id} className="mb-3">
          <h3 className="font-bold text-gray-800 mb-1" style={getFontSizeClass(1.1)}>
            {exp.title} - <span className="text-blue-600">{exp.company}</span>
          </h3>
          <p className="text-gray-500 mb-1" style={getFontSizeClass(0.85)}>
            {exp.duration}
          </p>
          <p className="text-gray-700" style={getFontSizeClass()}>
            {exp.description}
          </p>
        </div>
      ))}
    </section>

    {/* Projects */}
    <section className="mb-4">
      <h2 className="font-semibold text-blue-800 mb-2 flex items-center gap-2" style={getFontSizeClass(1.4)}>
        <Award className="w-4 h-4" /> {field2}
      </h2>
      {(resumeData?.projects || []).map((project) => (
        <div key={project.id} className="mb-3">
          <h3 className="font-bold text-gray-800 mb-1" style={getFontSizeClass(1.1)}>
            {project.name}
          </h3>
          <p className="text-gray-700 mb-1" style={getFontSizeClass()}>
            {project.description}
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-1" style={getFontSizeClass(0.9)}>
            {(project.highlights || []).map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
          <p className="text-gray-500" style={getFontSizeClass(0.85)}>
            Technologies: {(project.technologies || []).join(', ')}
          </p>
        </div>
      ))}
    </section>

    {/* Education */}
    <section className="mb-4">
      <h2 className="font-semibold text-blue-800 mb-2 flex items-center gap-2" style={getFontSizeClass(1.4)}>
        <GraduationCap className="w-4 h-4" /> {field3}
      </h2>
      {(resumeData?.education || []).map((edu) => (
        <div key={edu.id} className="mb-2">
          <h3 className="font-bold text-gray-800" style={getFontSizeClass(1.1)}>
            {edu.degree}
          </h3>
          <p className="text-gray-600" style={getFontSizeClass()}>
            {edu.school} ({edu.year})
          </p>
          {edu.gpa && (
            <p className="text-gray-500" style={getFontSizeClass(0.85)}>
              GPA: {edu.gpa}
            </p>
          )}
        </div>
      ))}
    </section>

    {/* Skills */}
    <section className="mb-4">
      <h2 className="font-semibold text-blue-800 mb-2 flex items-center gap-2" style={getFontSizeClass(1.4)}>
        <Award className="w-4 h-4" /> Skills
      </h2>
      <div className="flex flex-wrap gap-2">
        {(resumeData?.skills || []).map((skill, idx) => (
          <span 
            key={idx} 
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
            style={getFontSizeClass(0.9)}
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  </div>
);

export default ClassicTemplate;
