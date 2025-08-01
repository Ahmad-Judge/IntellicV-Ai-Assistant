
// // routes/user.js - Add these routes to your existing user routes
// const express = require('express');
// const router = express.Router();
// const { authenticateToken } = require('../middleware/auth');

// // Get user download status
// router.get('/download-status/:userId', authenticateToken, async (req, res) => {
//   try {
//     const { userId } = req.params;
    
//     // Ensure user can only access their own data
//     if (req.user.id !== userId) {
//       return res.status(403).json({ error: 'Access denied' });
//     }

//     // Get user data from database
//     // This is a placeholder - implement based on your database
//     const userData = await getUserById(userId);
    
//     res.json({
//       downloadCount: userData.downloadCount || 0,
//       hasUnlimitedDownloads: userData.hasUnlimitedDownloads || false
//     });

//   } catch (error) {
//     console.error('Error getting download status:', error);
//     res.status(500).json({ error: 'Failed to get download status' });
//   }
// });

// // Increment download counter
// router.post('/increment-download/:userId', authenticateToken, async (req, res) => {
//   try {
//     const { userId } = req.params;
    
//     // Ensure user can only access their own data
//     if (req.user.id !== userId) {
//       return res.status(403).json({ error: 'Access denied' });
//     }

//     // Update download count in database
//     // This is a placeholder - implement based on your database
//     const updatedUser = await incrementUserDownloadCount(userId);
    
//     res.json({
//       downloadCount: updatedUser.downloadCount
//     });

//   } catch (error) {
//     console.error('Error incrementing download count:', error);
//     res.status(500).json({ error: 'Failed to update download count' });
//   }
// });

// // Update payment status (called after successful payment)
// router.post('/update-payment-status/:userId', authenticateToken, async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { hasUnlimitedDownloads, paymentData } = req.body;
    
//     // Ensure user can only update their own data
//     if (req.user.id !== userId) {
//       return res.status(403).json({ error: 'Access denied' });
//     }

//     // Update user payment status in database
//     await updateUserPaymentStatus(userId, {
//       hasUnlimitedDownloads,
//       ...paymentData
//     });
    
//     res.json({ success: true });

//   } catch (error) {
//     console.error('Error updating payment status:', error);
//     res.status(500).json({ error: 'Failed to update payment status' });
//   }
// });

// // Database helper functions (implement based on your database)
// async function getUserById(userId) {
//   // Implement based on your database
//   // Return user object with downloadCount and hasUnlimitedDownloads
// }

// async function incrementUserDownloadCount(userId) {
//   // Implement based on your database
//   // Increment downloadCount by 1 and return updated user
// }

// module.exports = router;