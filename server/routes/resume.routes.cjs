// routes/resume.js or in your main server file
const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume.cjs'); // Your existing Resume model

// GET /api/resume/:userId - Fetch resume by Supabase user ID
router.get('/api/resume/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    // Find resume by Supabase user ID
    const resume = await Resume.findOne({ userId: userId });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
        resume: null
      });
    }

    res.status(200).json({
      success: true,
      message: 'Resume retrieved successfully',
      resume: resume
    });

  } catch (error) {
    console.error('Error fetching resume:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// POST /api/resume/save - Save or update resume
router.post('/api/resume/save', async (req, res) => {
  try {
    const { userId, resumeData } = req.body;

    // Validation
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    if (!resumeData) {
      return res.status(400).json({
        success: false,
        message: 'Resume data is required'
      });
    }

    // Check if resume already exists for this user
    const existingResume = await Resume.findOne({ userId: userId });

    if (existingResume) {
      // Update existing resume
      existingResume.resumeData = resumeData;
      existingResume.updatedAt = new Date();
      
      const updatedResume = await existingResume.save();
      
      res.status(200).json({
        success: true,
        message: 'Resume updated successfully',
        resume: updatedResume
      });
    } else {
      // Create new resume
      const newResume = new Resume({
        userId: userId,
        resumeData: resumeData
      });

      const savedResume = await newResume.save();
      
      res.status(201).json({
        success: true,
        message: 'Resume created successfully',
        resume: savedResume
      });
    }

  } catch (error) {
    console.error('Error saving resume:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Resume already exists for this user'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// DELETE /api/resume/:userId - Delete resume
router.delete('/api/resume/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    const deletedResume = await Resume.findOneAndDelete({ userId: userId });

    if (!deletedResume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Resume deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting resume:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// GET /api/resume/user/:userId/exists - Check if resume exists
router.get('/api/resume/user/:userId/exists', async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    const resume = await Resume.findOne({ userId: userId }).select('_id');
    
    res.status(200).json({
      success: true,
      exists: !!resume,
      message: resume ? 'Resume exists' : 'Resume not found'
    });

  } catch (error) {
    console.error('Error checking resume existence:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

module.exports = router;

// If you're not using routes, here's how to add these to your main server file:
/*
// In your server.js or app.js file, add these routes:

// Fetch resume
app.get('/api/resume/:userId', async (req, res) => {
  // ... copy the GET route logic here
});

// Save resume  
app.post('/api/resume/save', async (req, res) => {
  // ... copy the POST route logic here
});

// Delete resume
app.delete('/api/resume/:userId', async (req, res) => {
  // ... copy the DELETE route logic here
});

// Check if resume exists
app.get('/api/resume/user/:userId/exists', async (req, res) => {
  // ... copy the EXISTS route logic here
});
*/