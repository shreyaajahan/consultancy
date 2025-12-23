import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { enquiryService } from '../../services/apiServices';
import { FaEye, FaTrash, FaTimes, FaEnvelope, FaPhone, FaUser } from 'react-icons/fa';
import '../../styles/AdminEnquiries.css';

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchEnquiries();
  }, [filterStatus]);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const status = filterStatus === 'all' ? null : filterStatus;
      const response = await enquiryService.getAll(status);
      setEnquiries(response.data);
    } catch (err) {
      console.error('Error fetching enquiries:', err);
      alert('Failed to fetch enquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleViewEnquiry = async (enquiry) => {
    setSelectedEnquiry(enquiry);
    setShowModal(true);

    // Mark as read
    if (!enquiry.isRead) {
      try {
        await enquiryService.update(enquiry._id, { isRead: true });
        fetchEnquiries();
      } catch (err) {
        console.error('Error marking enquiry as read:', err);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEnquiry(null);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await enquiryService.update(id, { status: newStatus });
      alert('Status updated successfully');
      fetchEnquiries();
      if (selectedEnquiry && selectedEnquiry._id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      try {
        await enquiryService.delete(id);
        alert('Enquiry deleted successfully');
        fetchEnquiries();
        if (showModal) {
          handleCloseModal();
        }
      } catch (err) {
        console.error('Error deleting enquiry:', err);
        alert('Failed to delete enquiry');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AdminLayout>
      <div className="admin-enquiries">
        <div className="page-header">
          <h1>Manage Enquiries</h1>
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
              onClick={() => setFilterStatus('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${filterStatus === 'new' ? 'active' : ''}`}
              onClick={() => setFilterStatus('new')}
            >
              New
            </button>
            <button 
              className={`filter-btn ${filterStatus === 'in-progress' ? 'active' : ''}`}
              onClick={() => setFilterStatus('in-progress')}
            >
              In Progress
            </button>
            <button 
              className={`filter-btn ${filterStatus === 'resolved' ? 'active' : ''}`}
              onClick={() => setFilterStatus('resolved')}
            >
              Resolved
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading enquiries...</div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="no-data">No enquiries found</td>
                  </tr>
                ) : (
                  enquiries.map((enquiry) => (
                    <tr key={enquiry._id} className={!enquiry.isRead ? 'unread' : ''}>
                      <td>{enquiry.name}</td>
                      <td>{enquiry.email}</td>
                      <td>{enquiry.phone}</td>
                      <td>{enquiry.subject}</td>
                      <td>
                        <span className={`status-badge ${enquiry.status}`}>
                          {enquiry.status}
                        </span>
                      </td>
                      <td>{formatDate(enquiry.createdAt)}</td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn btn-view" 
                            onClick={() => handleViewEnquiry(enquiry)}
                            title="View"
                          >
                            <FaEye />
                          </button>
                          <button 
                            className="btn btn-delete" 
                            onClick={() => handleDelete(enquiry._id)}
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {showModal && selectedEnquiry && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Enquiry Details</h2>
                <button className="close-btn" onClick={handleCloseModal}>
                  <FaTimes />
                </button>
              </div>
              
              <div className="enquiry-details">
                <div className="detail-row">
                  <div className="detail-item">
                    <FaUser className="detail-icon" />
                    <div>
                      <label>Name</label>
                      <p>{selectedEnquiry.name}</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <FaEnvelope className="detail-icon" />
                    <div>
                      <label>Email</label>
                      <p>{selectedEnquiry.email}</p>
                    </div>
                  </div>
                </div>

                <div className="detail-row">
                  <div className="detail-item">
                    <FaPhone className="detail-icon" />
                    <div>
                      <label>Phone</label>
                      <p>{selectedEnquiry.phone}</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <div>
                      <label>Date</label>
                      <p>{formatDate(selectedEnquiry.createdAt)}</p>
                    </div>
                  </div>
                </div>

                <div className="detail-full">
                  <label>Subject</label>
                  <p>{selectedEnquiry.subject}</p>
                </div>

                <div className="detail-full">
                  <label>Message</label>
                  <p className="message-text">{selectedEnquiry.message}</p>
                </div>

                <div className="detail-full">
                  <label>Status</label>
                  <select
                    value={selectedEnquiry.status}
                    onChange={(e) => handleStatusChange(selectedEnquiry._id, e.target.value)}
                    className="status-select"
                  >
                    <option value="new">New</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>

                <div className="modal-actions">
                  <button 
                    className="btn btn-delete" 
                    onClick={() => handleDelete(selectedEnquiry._id)}
                  >
                    Delete Enquiry
                  </button>
                  <button className="btn btn-secondary" onClick={handleCloseModal}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminEnquiries;
