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

// Public routes
router.get('/', getProjects);
router.get('/:id', getProjectById);

// Protected routes (admin only)
router.get('/admin/all', authMiddleware, getAllProjects);
router.post('/', authMiddleware, createProject);
router.put('/:id', authMiddleware, updateProject);
router.delete('/:id', authMiddleware, deleteProject);

module.exports = router;
