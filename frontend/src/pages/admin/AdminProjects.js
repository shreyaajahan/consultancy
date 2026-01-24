import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { projectService } from '../../services/apiServices';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import '../../styles/AdminProjects.css';

const AdminProjects = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const [confirmDelete, setConfirmDelete] = useState({ show: false, projectId: null });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    status: 'ongoing',
    startDate: '',
    endDate: '',
    image: null,
    imagePreview: null,
    isActive: true
  });

  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3500);
  }, []);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const response = await projectService.getAllAdmin();
      setAllProjects(response.data || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
      showNotification('Failed to fetch projects', 'error');
    } finally {
      setLoading(false);
    }
  }, [showNotification]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Calculate pagination
  const totalPages = Math.ceil(allProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const projects = allProjects.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        location: project.location,
        status: project.status,
        startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '',
        endDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : '',
        image: null,
        imagePreview: project.imageUrl || null,
        isActive: project.isActive
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        description: '',
        location: '',
        status: 'ongoing',
        startDate: '',
        endDate: '',
        image: null,
        imagePreview: null,
        isActive: true
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProject(null);
  };

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      const file = e.target.files[0];
      if (file) {
        setFormData({
          ...formData,
          image: file,
          imagePreview: URL.createObjectURL(file)
        });
      }
    } else {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      setFormData({
        ...formData,
        [e.target.name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.title || !formData.description || !formData.location || !formData.startDate) {
      showNotification('Please fill in all required fields (Title, Description, Location, Start Date)', 'error');
      return;
    }
    
    try {
      const submitFormData = new FormData();
      submitFormData.append('title', formData.title);
      submitFormData.append('description', formData.description);
      submitFormData.append('location', formData.location);
      submitFormData.append('status', formData.status);
      submitFormData.append('startDate', formData.startDate);
      if (formData.endDate) submitFormData.append('endDate', formData.endDate);
      submitFormData.append('isActive', formData.isActive);
      
      if (formData.image) {
        submitFormData.append('image', formData.image);
      }

      if (editingProject) {
        await projectService.update(editingProject._id, submitFormData);
        showNotification('Project updated successfully', 'success');
      } else {
        await projectService.create(submitFormData);
        showNotification('Project created successfully', 'success');
      }
      handleCloseModal();
      fetchProjects();
    } catch (err) {
      console.error('Error saving project:', err);
      showNotification(err.response?.data?.message || 'Failed to save project', 'error');
    }
  };

  const handleDeleteClick = (id) => {
    setConfirmDelete({ show: true, projectId: id });
  };

  const handleConfirmDelete = async () => {
    try {
      await projectService.delete(confirmDelete.projectId);
      showNotification('Project deleted successfully', 'success');
      setConfirmDelete({ show: false, projectId: null });
      fetchProjects();
    } catch (err) {
      console.error('Error deleting project:', err);
      showNotification('Failed to delete project', 'error');
      setConfirmDelete({ show: false, projectId: null });
    }
  };

  const handleCancelDelete = () => {
    setConfirmDelete({ show: false, projectId: null });
  };

  return (
    <AdminLayout>
      <div className="admin-projects">
        <div className="projects-container">
          <div className="projects-header">
            <h1>Manage Projects</h1>
            <button className="btn-primary" onClick={() => handleOpenModal()}>
              <FaPlus /> Add Project
            </button>
          </div>

          <div className="projects-content">
            {loading ? (
              <div className="loading">Loading projects...</div>
            ) : projects.length === 0 ? (
              <div className="no-projects">No projects found</div>
            ) : (
              <div className="projects-grid">
                {projects.map((project) => (
                  <div key={project._id} className="project-card">
                    <div className="project-card-header">
                      <h3>{project.title}</h3>
                      <div className="project-actions">
                        <button 
                          className="action-btn edit-btn" 
                          onClick={() => handleOpenModal(project)}
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          className="action-btn delete-btn" 
                          onClick={() => handleDeleteClick(project._id)}
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    <p className="project-description">{project.description}</p>
                  </div>
                ))}
              </div>
            )}
            {!loading && projects.length > 0 && totalPages > 1 && (
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
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
                <button className="close-btn" onClick={handleCloseModal}>
                  <FaTimes />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-row">
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
                    <label>Location *</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>
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

                <div className="form-row">
                  <div className="form-group">
                    <label>Status *</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      required
                    >
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Start Date *</label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Project Image</label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    accept="image/*"
                  />
                  {formData.imagePreview && (
                    <div className="image-preview">
                      <img src={formData.imagePreview} alt="Preview" />
                    </div>
                  )}
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingProject ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {confirmDelete.show && (
          <div className="modal-overlay" onClick={handleCancelDelete}>
            <div className="modal-content modal-confirm" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Delete Project</h2>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this project? This action cannot be undone.</p>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={handleCancelDelete}>
                  Cancel
                </button>
                <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notification */}
        {notification.show && (
          <div className={`notification notification-${notification.type}`}>
            <p>{notification.message}</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminProjects;
