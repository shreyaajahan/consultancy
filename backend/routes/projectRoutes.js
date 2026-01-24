const express = require('express');
const router = express.Router();
const {
  getProjects,
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const authMiddleware = require('../middleware/auth');
const upload = require('../config/multer');

// Public routes
router.get('/', getProjects);

// Protected routes (admin only)
router.get('/admin/all', authMiddleware, getAllProjects);

// Public routes (specific by id)
router.get('/:id', getProjectById);

// Protected routes (admin only) - create, update, delete
router.post('/', authMiddleware, upload.single('image'), createProject);
router.put('/:id', authMiddleware, upload.single('image'), updateProject);
router.delete('/:id', authMiddleware, deleteProject);

module.exports = router;
