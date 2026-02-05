const express = require('express');
const router = express.Router();
const {
  getEnquiries,
  getEnquiryById,
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  sendReply,
  getReply,
  getStats
} = require('../controllers/enquiryController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.post('/', createEnquiry);
router.get('/reply/:email/:id', getReply);

// Protected routes (admin only)
router.get('/', authMiddleware, getEnquiries);
router.get('/stats', authMiddleware, getStats);
router.get('/:id', authMiddleware, getEnquiryById);
router.put('/:id', authMiddleware, updateEnquiry);
router.post('/:id/reply', authMiddleware, sendReply);
router.delete('/:id', authMiddleware, deleteEnquiry);

module.exports = router;
