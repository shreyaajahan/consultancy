const Enquiry = require('../models/Enquiry');

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Private
const getEnquiries = async (req, res) => {
  try {
    const { status } = req.query;
    
    let query = {};
    if (status && ['new', 'in-progress', 'resolved'].includes(status)) {
      query.status = status;
    }

    const enquiries = await Enquiry.find(query).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: enquiries.length,
      data: enquiries
    });
  } catch (error) {
    console.error('Get enquiries error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single enquiry
// @route   GET /api/enquiries/:id
// @access  Private
const getEnquiryById = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    // Mark as read
    if (!enquiry.isRead) {
      enquiry.isRead = true;
      await enquiry.save();
    }
    
    res.json({
      success: true,
      data: enquiry
    });
  } catch (error) {
    console.error('Get enquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create enquiry
// @route   POST /api/enquiries
// @access  Public
const createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      subject,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully. We will contact you soon!',
      data: enquiry
    });
  } catch (error) {
    console.error('Create enquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update enquiry status
// @route   PUT /api/enquiries/:id
// @access  Private
const updateEnquiry = async (req, res) => {
  try {
    const { status, isRead } = req.body;

    let enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    // Update fields
    if (status && ['new', 'in-progress', 'resolved'].includes(status)) {
      enquiry.status = status;
    }
    if (typeof isRead !== 'undefined') {
      enquiry.isRead = isRead;
    }

    await enquiry.save();

    res.json({
      success: true,
      message: 'Enquiry updated successfully',
      data: enquiry
    });
  } catch (error) {
    console.error('Update enquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private
const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    await enquiry.deleteOne();

    res.json({
      success: true,
      message: 'Enquiry deleted successfully'
    });
  } catch (error) {
    console.error('Delete enquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get dashboard statistics
// @route   GET /api/enquiries/stats
// @access  Private
const getStats = async (req, res) => {
  try {
    const totalEnquiries = await Enquiry.countDocuments();
    const newEnquiries = await Enquiry.countDocuments({ status: 'new' });
    const inProgressEnquiries = await Enquiry.countDocuments({ status: 'in-progress' });
    const resolvedEnquiries = await Enquiry.countDocuments({ status: 'resolved' });
    const unreadEnquiries = await Enquiry.countDocuments({ isRead: false });

    res.json({
      success: true,
      data: {
        total: totalEnquiries,
        new: newEnquiries,
        inProgress: inProgressEnquiries,
        resolved: resolvedEnquiries,
        unread: unreadEnquiries
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  getEnquiries,
  getEnquiryById,
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getStats
};
