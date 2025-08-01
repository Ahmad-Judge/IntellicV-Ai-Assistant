// utils/mergeResumeData.js

// Since GPT now returns the complete modified JSON, we just need to replace the data
export function replaceResumeData(currentData, newData) {
  // Validate that newData is a proper object
  if (!newData || typeof newData !== 'object') {
    console.error('Invalid new data provided');
    return currentData;
  }

  // Ensure all arrays exist and are properly formatted
  const processedData = { ...newData };
  
  // Ensure array fields are arrays
  const arrayFields = ['skills', 'education', 'experience', 'projects', 'achievements', 'certifications', 'languages'];
  arrayFields.forEach(field => {
    if (processedData[field] && !Array.isArray(processedData[field])) {
      processedData[field] = [];
    } else if (!processedData[field]) {
      processedData[field] = currentData[field] || [];
    }
  });

  // Ensure string fields are strings
  const stringFields = ['name', 'email', 'phone', 'address', 'linkedin', 'summary', 'objective'];
  stringFields.forEach(field => {
    if (processedData[field] && typeof processedData[field] !== 'string') {
      processedData[field] = String(processedData[field]);
    } else if (!processedData[field] && currentData[field]) {
      processedData[field] = currentData[field];
    }
  });

  return processedData;
}

// Keep the old deepMerge function as a fallback
export function deepMerge(target = {}, source = {}) {
  // This is now mainly used as a fallback or for other merge operations
  return replaceResumeData(target, source);
}

// Enhanced validation function
export function validateResumeData(data) {
  const errors = [];
  const warnings = [];
  
  // Check for valid structure
  if (typeof data !== 'object' || data === null) {
    errors.push('Resume data must be an object');
    return { isValid: false, errors, warnings };
  }
  
  // Validate array fields
  const arrayFields = ['skills', 'education', 'experience', 'projects', 'achievements', 'certifications', 'languages'];
  for (const field of arrayFields) {
    if (data[field] && !Array.isArray(data[field])) {
      errors.push(`${field} must be an array`);
    }
  }
  
  // Validate string fields
  const stringFields = ['name', 'email', 'phone', 'address', 'linkedin', 'summary', 'objective'];
  for (const field of stringFields) {
    if (data[field] && typeof data[field] !== 'string') {
      warnings.push(`${field} should be a string`);
    }
  }
  
  // Validate education objects
  if (data.education && Array.isArray(data.education)) {
    data.education.forEach((edu, index) => {
      if (typeof edu !== 'object') {
        errors.push(`Education item ${index + 1} must be an object`);
      } else if (edu) {
        // Check for required fields
        if (!edu.degree && !edu.institution) {
          warnings.push(`Education item ${index + 1} missing degree and institution`);
        }
        if (edu.coursework && !Array.isArray(edu.coursework)) {
          warnings.push(`Education item ${index + 1} coursework should be an array`);
        }
      }
    });
  }
  
  // Validate experience objects
  if (data.experience && Array.isArray(data.experience)) {
    data.experience.forEach((exp, index) => {
      if (typeof exp !== 'object') {
        errors.push(`Experience item ${index + 1} must be an object`);
      } else if (exp) {
        if (!exp.title && !exp.company) {
          warnings.push(`Experience item ${index + 1} missing title and company`);
        }
        if (exp.description && !Array.isArray(exp.description)) {
          warnings.push(`Experience item ${index + 1} description should be an array`);
        }
      }
    });
  }
  
  // Validate project objects
  if (data.projects && Array.isArray(data.projects)) {
    data.projects.forEach((proj, index) => {
      if (typeof proj !== 'object') {
        errors.push(`Project item ${index + 1} must be an object`);
      } else if (proj) {
        if (!proj.title) {
          warnings.push(`Project item ${index + 1} missing title`);
        }
        if (proj.description && !Array.isArray(proj.description)) {
          warnings.push(`Project item ${index + 1} description should be an array`);
        }
      }
    });
  }
  
  // Validate email format (basic)
  if (data.email && typeof data.email === 'string') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      warnings.push('Email format appears to be invalid');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

// Helper function to compare resume data and detect changes
export function detectChanges(oldData, newData) {
  const changes = [];
  
  // Check personal info changes
  const personalFields = ['name', 'email', 'phone', 'address', 'linkedin'];
  personalFields.forEach(field => {
    if (oldData[field] !== newData[field]) {
      changes.push(`Changed ${field} from "${oldData[field] || 'empty'}" to "${newData[field] || 'empty'}"`);
    }
  });
  
  // Check array field changes
  const arrayFields = ['skills', 'achievements', 'certifications', 'languages'];
  arrayFields.forEach(field => {
    const oldArray = oldData[field] || [];
    const newArray = newData[field] || [];
    
    if (JSON.stringify(oldArray) !== JSON.stringify(newArray)) {
      const added = newArray.filter(item => !oldArray.includes(item));
      const removed = oldArray.filter(item => !newArray.includes(item));
      
      if (added.length > 0) {
        changes.push(`Added to ${field}: ${added.join(', ')}`);
      }
      if (removed.length > 0) {
        changes.push(`Removed from ${field}: ${removed.join(', ')}`);
      }
    }
  });
  
  // Check object array changes (simplified)
  const objectArrayFields = ['education', 'experience', 'projects'];
  objectArrayFields.forEach(field => {
    const oldArray = oldData[field] || [];
    const newArray = newData[field] || [];
    
    if (oldArray.length !== newArray.length) {
      if (newArray.length > oldArray.length) {
        changes.push(`Added ${newArray.length - oldArray.length} item(s) to ${field}`);
      } else {
        changes.push(`Removed ${oldArray.length - newArray.length} item(s) from ${field}`);
      }
    } else if (JSON.stringify(oldArray) !== JSON.stringify(newArray)) {
      changes.push(`Modified ${field} content`);
    }
  });
  
  return changes;
}

// Helper function to get field suggestions
export function getFieldSuggestions() {
  return {
    personal: ['name', 'email', 'phone', 'address', 'linkedin'],
    content: ['summary', 'objective'],
    arrays: ['skills', 'achievements', 'certifications', 'languages'],
    sections: ['education', 'experience', 'projects']
  };
}