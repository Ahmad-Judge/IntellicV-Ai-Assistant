// models/Resume.js
const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true, 
    unique: true,
    index: true // Add index for faster queries
  },
  resumeData: { 
    type: Object, 
    required: true 
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Add some useful methods to the schema
resumeSchema.methods.toJSON = function() {
  const resume = this.toObject();
  return resume;
};

// Static method to find by user ID
resumeSchema.statics.findByUserId = function(userId) {
  return this.findOne({ userId: userId });
};

// Static method to create or update resume
resumeSchema.statics.createOrUpdate = async function(userId, resumeData) {
  const options = { 
    upsert: true, 
    new: true, 
    runValidators: true 
  };
  
  return this.findOneAndUpdate(
    { userId: userId },
    { userId: userId, resumeData: resumeData },
    options
  );
};

module.exports = mongoose.model("Resume", resumeSchema);