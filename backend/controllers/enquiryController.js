const Enquiry = require('../models/Enquiry');
const { sendEmail } = require('../config/email');

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

// @desc    Send reply to enquiry
// @route   POST /api/enquiries/:id/reply
// @access  Private (Admin only)
const sendReply = async (req, res) => {
  try {
    const { reply } = req.body;

    if (!reply || reply.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Reply message cannot be empty'
      });
    }

    let enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    enquiry.reply = reply;
    enquiry.repliedAt = new Date();
    enquiry.status = 'resolved';

    await enquiry.save();

    // Send email to customer
    try {
      const emailHTML = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f0f8ff; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
            <h2 style="color: #333; margin: 0;">We have replied to your enquiry!</h2>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #333;">Hi ${enquiry.name},</h3>
            <p style="color: #666; line-height: 1.6;">Thank you for contacting us. We have reviewed your enquiry and have the following response:</p>
          </div>

          <div style="background-color: #f5f5f5; padding: 20px; border-left: 4px solid #ff9933; margin-bottom: 20px; border-radius: 5px;">
            <h4 style="color: #333; margin-top: 0;">Your Enquiry:</h4>
            <p style="color: #666; margin: 0;"><strong>Subject:</strong> ${enquiry.subject}</p>
            <p style="color: #666; margin: 10px 0 0 0;"><strong>Your Message:</strong></p>
            <p style="color: #666; margin: 10px 0;">${enquiry.message}</p>
          </div>

          <div style="background-color: #e8f5e9; padding: 20px; border-left: 4px solid #4caf50; margin-bottom: 20px; border-radius: 5px;">
            <h4 style="color: #2e7d32; margin-top: 0;">Our Reply:</h4>
            <p style="color: #555; line-height: 1.6;">${reply}</p>
          </div>

          <div style="margin-bottom: 20px;">
            <p style="color: #666;">If you have any further questions, please feel free to contact us.</p>
          </div>

          <div style="border-top: 1px solid #ddd; padding-top: 20px; color: #999; font-size: 12px;">
            <p style="margin: 0;">Best regards,</p>
            <p style="margin: 5px 0;">Nivas Constructions</p>
            <p style="margin: 5px 0;">© 2026 All rights reserved.</p>
          </div>
        </div>
      `;

      await sendEmail(
        enquiry.email,
        `Reply to Your Enquiry: ${enquiry.subject}`,
        emailHTML
      );
    } catch (emailError) {
      console.error('Error sending reply email:', emailError);
      // Don't fail the API call if email fails
    }

    res.json({
      success: true,
      message: 'Reply sent successfully',
      data: enquiry
    });
  } catch (error) {
    console.error('Send reply error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get reply for customer (public endpoint)
// @route   GET /api/enquiries/reply/:email/:id
// @access  Public
const getReply = async (req, res) => {
  try {
    const { email, id } = req.params;

    const enquiry = await Enquiry.findOne({
      _id: id,
      email: email.toLowerCase()
    });

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    // Mark reply as read
    if (enquiry.reply && !enquiry.replyRead) {
      enquiry.replyRead = true;
      await enquiry.save();
    }

    res.json({
      success: true,
      data: {
        id: enquiry._id,
        name: enquiry.name,
        email: enquiry.email,
        subject: enquiry.subject,
        message: enquiry.message,
        reply: enquiry.reply,
        repliedAt: enquiry.repliedAt,
        status: enquiry.status,
        createdAt: enquiry.createdAt
      }
    });
  } catch (error) {
    console.error('Get reply error:', error);
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
  sendReply,
  getReply,
  getStats
};
