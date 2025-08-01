// import React, { useState } from 'react';
// import Chatbot from './components/chatbot';
// import ResumePreview from './components/ResumePreview';

// const AIResumeBuilder = () => {
//   const [resumeData, setResumeData] = useState({
//     personalInfo: {
//       name: "John Doe",
//       title: "Software Engineer",
//       email: "john.doe@email.com",
//       phone: "+1 (555) 123-4567",
//       location: "San Francisco, CA",
//       linkedin: "linkedin.com/in/johndoe",
//       github: "github.com/johndoe"
//     },
//     summary: "Passionate software engineer with 3+ years of experience building scalable web applications using modern technologies like React, Node.js, and Python.",
//     experience: [
//       {
//         id: 1,
//         title: "Senior Frontend Developer",
//         company: "Tech Corp",
//         duration: "2022 - Present",
//         description: "Led development of responsive web applications using React and TypeScript, improving user engagement by 40%."
//       },
//       {
//         id: 2,
//         title: "Full Stack Developer",
//         company: "StartupXYZ",
//         duration: "2021 - 2022",
//         description: "Built and maintained full-stack applications using MERN stack, collaborated with cross-functional teams."
//       }
//     ],
//     education: [
//       {
//         id: 1,
//         degree: "Bachelor of Computer Science",
//         school: "University of Technology",
//         year: "2021",
//         gpa: "3.8/4.0"
//       }
//     ],
//     skills: ["React", "Node.js", "Python", "JavaScript", "TypeScript", "MongoDB", "PostgreSQL", "AWS"],
//     projects: [
//       {
//         id: 1,
//         name: "E-commerce Platform",
//         description: "Full-stack e-commerce solution with user authentication, payment processing, and admin dashboard. Implemented shopping cart functionality, order management, and real-time inventory tracking.",
//         technologies: ["React", "Node.js", "MongoDB", "Stripe API", "JWT"],
//         github: "github.com/johndoe/ecommerce-platform",
//         demo: "ecommerce-demo.vercel.app",
//         highlights: ["Increased conversion rate by 25%", "Handles 1000+ concurrent users", "Integrated multiple payment gateways"]
//       },
//       {
//         id: 2,
//         name: "Task Management App",
//         description: "Collaborative project management tool with real-time updates, team collaboration features, and advanced filtering. Built with modern React patterns and responsive design.",
//         technologies: ["React", "Firebase", "Material-UI", "Socket.io"],
//         github: "github.com/johndoe/task-manager",
//         demo: "taskflow-app.netlify.app",
//         highlights: ["Real-time collaboration", "Drag & drop interface", "Advanced analytics dashboard"]
//       },
//       {
//         id: 3,
//         name: "Weather Analytics Dashboard",
//         description: "Interactive weather data visualization platform with historical data analysis, forecasting, and location-based insights. Features responsive charts and mobile-optimized interface.",
//         technologies: ["Vue.js", "D3.js", "Python", "FastAPI", "PostgreSQL"],
//         github: "github.com/johndoe/weather-dashboard",
//         demo: "weather-insights.herokuapp.com",
//         highlights: ["Processes 10M+ data points", "Interactive data visualization", "RESTful API with 99.9% uptime"]
//       }
//     ]
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col lg:flex-row">
//       <Chatbot 
//         resumeData={resumeData} 
//         setResumeData={setResumeData} 
//       />
      
//       <ResumePreview 
//         resumeData={resumeData} 
//       />
//     </div>
//   );
// };

// export default AIResumeBuilder;
import React from 'react';
import Chatbot from './components/chatbot';
import ResumePreview from './components/ResumePreview';
import useResumeStore from './store/chatstore'; // Adjust path as needed

const AIResumeBuilder = () => {
  // Access resume data and actions from the store
  const resumeData = useResumeStore((state) => state.resumeData);
  const setResumeData = useResumeStore((state) => state.setResumeData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col lg:flex-row">
      <Chatbot 
        resumeData={resumeData}
        setResumeData={setResumeData}
      />
      
      <ResumePreview 
        resumeData={resumeData}
      />
    </div>
  );
};

export default AIResumeBuilder;