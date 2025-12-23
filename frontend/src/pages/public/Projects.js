import React, { useState, useEffect } from 'react';
import Layout from '../../components/public/Layout';
import { projectService } from '../../services/apiServices';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import '../../styles/Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, [filter]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const status = filter === 'all' ? null : filter;
      const response = await projectService.getAll(status);
      setProjects(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <Layout>
      <div className="projects-page">
        {/* Page Header */}
        <section className="page-header">
          <div className="container">
            <h1>Our Projects</h1>
            <p>Showcasing Our Construction Excellence</p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="filter-section">
          <div className="container">
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All Projects
              </button>
              <button 
                className={`filter-btn ${filter === 'ongoing' ? 'active' : ''}`}
                onClick={() => setFilter('ongoing')}
              >
                Ongoing
              </button>
              <button 
                className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                onClick={() => setFilter('completed')}
              >
                Completed
              </button>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="projects-section">
          <div className="container">
            {loading ? (
              <div className="loading">Loading projects...</div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : projects.length === 0 ? (
              <div className="no-data">No projects available in this category.</div>
            ) : (
              <div className="projects-grid">
                {projects.map((project) => (
                  <div key={project._id} className="project-card">
                    <div className="project-image">
                      {project.imageUrl ? (
                        <img src={project.imageUrl} alt={project.title} />
                      ) : (
                        <div className="image-placeholder">No Image</div>
                      )}
                      <span className={`status-badge ${project.status}`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="project-content">
                      <h3>{project.title}</h3>
                      <p className="project-description">{project.description}</p>
                      <div className="project-details">
                        <p><FaMapMarkerAlt /> {project.location}</p>
                        <p><FaCalendarAlt /> {formatDate(project.startDate)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Projects;
