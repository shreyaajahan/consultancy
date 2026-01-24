const Project = require('../models/Project');

// @desc    Get all active projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const { status } = req.query;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 6;
    const skip = (page - 1) * limit;
    
    let query = { isActive: true };
    if (status && ['ongoing', 'completed'].includes(status)) {
      query.status = status;
    }

    const total = await Project.countDocuments(query);
    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    res.json({
      success: true,
      count: projects.length,
      total,
      page,
      totalPages: Math.ceil(total / limit) || 1,
      data: projects
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get all projects (admin)
// @route   GET /api/projects/admin
// @access  Private
const getAllProjects = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 6;
    const skip = (page - 1) * limit;

    const total = await Project.countDocuments();
    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    res.json({
      success: true,
      count: projects.length,
      total,
      page,
      totalPages: Math.ceil(total / limit) || 1,
      data: projects
    });
  } catch (error) {
    console.error('Get all projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res) => {
  try {
    const { title, description, location, status, startDate, endDate } = req.body;

    // Validation
    if (!title || !description || !location || !startDate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Get image URL from uploaded file
    const imageUrl = req.file ? req.file.path : null;

    const project = await Project.create({
      title,
      description,
      location,
      status: status || 'ongoing',
      startDate,
      endDate,
      imageUrl
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res) => {
  try {
    const { title, description, location, status, startDate, endDate, isActive } = req.body;

    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Get image URL from uploaded file if present
    const imageUrl = req.file ? req.file.path : undefined;

    // Update fields
    project.title = title || project.title;
    project.description = description || project.description;
    project.location = location || project.location;
    project.status = status || project.status;
    project.startDate = startDate || project.startDate;
    project.endDate = endDate || project.endDate;
    if (imageUrl !== undefined) {
      project.imageUrl = imageUrl;
    }
    if (typeof isActive !== 'undefined') {
      project.isActive = isActive;
    }

    await project.save();

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    await project.deleteOne();

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  getProjects,
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};
