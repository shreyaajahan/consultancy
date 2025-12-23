import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { serviceService } from '../../services/apiServices';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import '../../styles/AdminServices.css';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'construction',
    isActive: true
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await serviceService.getAllAdmin();
      setServices(response.data);
    } catch (err) {
      console.error('Error fetching services:', err);
      alert('Failed to fetch services');
    } finally {
      setLoading(false);
    }
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
        alert('Service updated successfully');
      } else {
        await serviceService.create(formData);
        alert('Service created successfully');
      }
      handleCloseModal();
      fetchServices();
    } catch (err) {
      console.error('Error saving service:', err);
      alert(err.response?.data?.message || 'Failed to save service');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await serviceService.delete(id);
        alert('Service deleted successfully');
        fetchServices();
      } catch (err) {
        console.error('Error deleting service:', err);
        alert('Failed to delete service');
      }
    }
  };

  return (
    <AdminLayout>
      <div className="admin-services">
        <div className="page-header">
          <h1>Manage Services</h1>
          <button className="btn btn-primary" onClick={() => handleOpenModal()}>
            <FaPlus /> Add Service
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading services...</div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="no-data">No services found</td>
                  </tr>
                ) : (
                  services.map((service) => (
                    <tr key={service._id}>
                      <td>{service.title}</td>
                      <td className="description-cell">{service.description}</td>
                      <td>
                        <span className={`status-badge ${service.isActive ? 'active' : 'inactive'}`}>
                          {service.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn btn-edit" 
                            onClick={() => handleOpenModal(service)}
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            className="btn btn-delete" 
                            onClick={() => handleDelete(service._id)}
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

                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleChange}
                    />
                    {' '}Active
                  </label>
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
