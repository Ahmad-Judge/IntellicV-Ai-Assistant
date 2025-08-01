// store/chatstore.js
import { create } from 'zustand';
import axios from 'axios';

// Get API base URL from .env
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useResumeStore = create((set, get) => ({
  resumeData: {
    personalInfo: {
      name: "John Doe",
      title: "Software Engineer",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/johndoe",
      github: "github.com/johndoe"
    },
    summary: "Passionate software engineer with 3+ years of experience building scalable web applications using modern technologies like React, Node.js, and Python.",
    experience: [
      {
        id: 1,
        title: "Senior Frontend Developer",
        company: "Tech Corp",
        duration: "2022 - Present",
        description: "Led development of responsive web applications using React and TypeScript, improving user engagement by 40%."
      },
      {
        id: 2,
        title: "Full Stack Developer",
        company: "StartupXYZ",
        duration: "2021 - 2022",
        description: "Built and maintained full-stack applications using MERN stack, collaborated with cross-functional teams."
      }
    ],
    education: [
      {
        id: 1,
        degree: "Bachelor of Computer Science",
        school: "University of Technology",
        year: "2021",
        gpa: "3.8/4.0"
      }
    ],
    skills: ["React", "Node.js", "Python", "JavaScript", "TypeScript", "MongoDB", "PostgreSQL", "AWS"],
    projects: [
      {
        id: 1,
        name: "E-commerce Platform",
        description: "Full-stack e-commerce solution with user authentication, payment processing, and admin dashboard.",
        technologies: ["React", "Node.js", "MongoDB", "Stripe API", "JWT"],
        github: "github.com/johndoe/ecommerce-platform",
        demo: "ecommerce-demo.vercel.app",
        highlights: ["Increased conversion rate by 25%", "Handles 1000+ concurrent users", "Integrated multiple payment gateways"]
      }
    ]
  },

  // Loading states
  isLoading: false,
  isSaving: false,
  error: null,

  // Actions
  setResumeData: (newResumeData) => set({ resumeData: newResumeData }),

  getResumeData: () => get().resumeData,

  // Fetch resume from API
  fetchResume: async (supabaseUserId) => {
    if (!supabaseUserId) {
      console.error('No user ID provided');
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(`${API_BASE_URL}/api/resume/${supabaseUserId}`);

      if (response.data.success && response.data.resume) {
        set({
          resumeData: response.data.resume.resumeData,
          isLoading: false,
          error: null
        });
        console.log('Resume loaded successfully');
        return response.data.resume.resumeData;
      } else {
        console.log('No existing resume found for user');
        set({ isLoading: false, error: null });
        return null;
      }
    } catch (error) {
      console.error('Error fetching resume:', error);
      const errorMessage = error.response?.data?.message || 'Failed to load resume';
      set({
        isLoading: false,
        error: errorMessage
      });
      return null;
    }
  },

  // Save resume to API
  saveResume: async (supabaseUserId) => {
    if (!supabaseUserId) {
      throw new Error('No user ID provided');
    }

    const { resumeData } = get();
    set({ isSaving: true, error: null });

    try {
      const response = await axios.post(`${API_BASE_URL}/api/resume/save`, {
        userId: supabaseUserId,
        resumeData: resumeData
      });

      if (response.data.success) {
        set({ isSaving: false, error: null });
        console.log('Resume saved successfully');
        return true;
      } else {
        throw new Error(response.data.message || 'Failed to save resume');
      }
    } catch (error) {
      console.error('Error saving resume:', error);
      const errorMessage = error.response?.data?.message || 'Failed to save resume';
      set({
        isSaving: false,
        error: errorMessage
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),

  resetResume: () => set({
    resumeData: get().resumeData,
    error: null
  })
}));

export default useResumeStore;
