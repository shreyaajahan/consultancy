const express = require('express');
const router = express.Router();
const {
  getServices,
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} = require('../controllers/serviceController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.get('/', getServices);

// Protected routes (admin only)
router.get('/admin/all', authMiddleware, getAllServices);

// Public routes (specific by id)
router.get('/:id', getServiceById);

// Protected routes (admin only) - create, update, delete
router.post('/', authMiddleware, createService);
router.put('/:id', authMiddleware, updateService);
router.delete('/:id', authMiddleware, deleteService);

module.exports = router;
