const express = require('express');
const router = express.Router();
const {
  getEnquiries,
  getEnquiryById,
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getStats
} = require('../controllers/enquiryController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.post('/', createEnquiry);

// Protected routes (admin only)
router.get('/', authMiddleware, getEnquiries);
router.get('/stats', authMiddleware, getStats);
router.get('/:id', authMiddleware, getEnquiryById);
router.put('/:id', authMiddleware, updateEnquiry);
router.delete('/:id', authMiddleware, deleteEnquiry);

module.exports = router;
