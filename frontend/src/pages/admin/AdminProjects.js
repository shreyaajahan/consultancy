import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { projectService } from '../../services/apiServices';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import '../../styles/AdminProjects.css';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    status: 'ongoing',
    startDate: '',
    endDate: '',
    imageUrl: '',
    isActive: true
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectService.getAllAdmin();
      setProjects(response.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
      alert('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
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
        imageUrl: project.imageUrl || '',
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
        imageUrl: '',
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
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const submitData = {
        ...formData,
        endDate: formData.endDate || undefined
      };

      if (editingProject) {
        await projectService.update(editingProject._id, submitData);
        alert('Project updated successfully');
      } else {
        await projectService.create(submitData);
        alert('Project created successfully');
      }
      handleCloseModal();
      fetchProjects();
    } catch (err) {
      console.error('Error saving project:', err);
      alert(err.response?.data?.message || 'Failed to save project');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectService.delete(id);
        alert('Project deleted successfully');
        fetchProjects();
      } catch (err) {
        console.error('Error deleting project:', err);
        alert('Failed to delete project');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US');
  };

  return (
    <AdminLayout>
      <div className="admin-projects">
        <div className="page-header">
          <h1>Manage Projects</h1>
          <button className="btn btn-primary" onClick={() => handleOpenModal()}>
            <FaPlus /> Add Project
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading projects...</div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Start Date</th>
                  <th>Active</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="no-data">No projects found</td>
                  </tr>
                ) : (
                  projects.map((project) => (
                    <tr key={project._id}>
                      <td>{project.title}</td>
                      <td>{project.location}</td>
                      <td>
                        <span className={`status-badge ${project.status}`}>
                          {project.status}
                        </span>
                      </td>
                      <td>{formatDate(project.startDate)}</td>
                      <td>
                        <span className={`status-badge ${project.isActive ? 'active' : 'inactive'}`}>
                          {project.isActive ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn btn-edit" 
                            onClick={() => handleOpenModal(project)}
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            className="btn btn-delete" 
                            onClick={() => handleDelete(project._id)}
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
            <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{editingProject ? 'Edit Project' : 'Add Project'}</h2>
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
                  <label>Image URL</label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                  />
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
                    {editingProject ? 'Update' : 'Create'}
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

export default AdminProjects;
