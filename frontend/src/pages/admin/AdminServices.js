import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { serviceService } from '../../services/apiServices';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import '../../styles/AdminServices.css';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'construction',
    isActive: true
  });

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      const response = await serviceService.getAllAdmin(currentPage);
      setServices(response.data || []);
      setTotalPages(response.totalPages || 1);
    } catch (err) {
      console.error('Error fetching services:', err);
      alert('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleOpenModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setFormData({
        title: service.title,
        description: service.description,
        icon: service.icon,
        isActive: service.isActive
      });
    } else {
      setEditingService(null);
      setFormData({
        title: '',
        description: '',
        icon: 'construction',
        isActive: true
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingService(null);
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingService) {
        await serviceService.update(editingService._id, formData);
      } else {
        await serviceService.create(formData);
      }
      handleCloseModal();
      fetchServices();
    } catch (err) {
      console.error('Error saving service:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await serviceService.delete(id);
      fetchServices();
    } catch (err) {
      console.error('Error deleting service:', err);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-services">
        <div className="services-container">
          <div className="services-header">
            <h1>Manage Services</h1>
            <button className="btn btn-primary" onClick={() => handleOpenModal()}>
              <FaPlus /> Add Service
            </button>
          </div>

          {loading ? (
            <div className="loading">Loading services...</div>
          ) : (
            <div className="services-content">
              {services.length === 0 ? (
                <div className="no-services">No services found</div>
              ) : (
                <div className="services-grid">
                  {services.map((service) => (
                    <div key={service._id} className="service-card">
                      <div className="service-card-header">
                        <h3>{service.title}</h3>
                        <div className="service-actions">
                          <button 
                            className="action-btn edit-btn" 
                            onClick={() => handleOpenModal(service)}
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            className="action-btn delete-btn" 
                            onClick={() => handleDelete(service._id)}
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                      <p className="service-description">{service.description}</p>
                    </div>
                  ))}
                </div>
              )}
                  {!loading && services.length > 0 && totalPages > 1 && (
                    <div className="pagination">
                      <button
                        className="page-btn"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Prev
                      </button>
                      {[...Array(totalPages)].map((_, idx) => {
                        const pageNumber = idx + 1;
                        return (
                          <button
                            key={pageNumber}
                            className={`page-btn ${currentPage === pageNumber ? 'active' : ''}`}
                            onClick={() => handlePageChange(pageNumber)}
                          >
                            {pageNumber}
                          </button>
                        );
                      })}
                      <button
                        className="page-btn"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </div>
                  )}
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{editingService ? 'Edit Service' : 'Add Service'}</h2>
                <button className="close-btn" onClick={handleCloseModal}>
                  <FaTimes />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    required
                  ></textarea>
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingService ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminServices;
