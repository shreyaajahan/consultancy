import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../../components/public/Layout';
import { projectService } from '../../services/apiServices';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import '../../styles/Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const status = filter === 'all' ? null : filter;
      const response = await projectService.getAll(status, currentPage);
      setProjects(response.data || []);
      setTotalPages(response.totalPages || 1);
      setError(null);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [filter, currentPage]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleFilterChange = (value) => {
    setFilter(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <Layout>
      <div className="projects-page">
        {/* Hero Section */}
        <section className="hero page-hero" style={{backgroundImage: `url('https://www.constructionworld.in/assets/uploads/13a98c40261296c534a4868124aecf91.jpg')`}}>
          <div className="hero-overlay">
            <div className="container">
              <div className="hero-grid">
                <div className="hero-left reveal slide-up" style={{animationDelay: '100ms'}}>
                  <div className="glass-panel">
                    <h1>Our Projects</h1>
                    <p className="lead">Showcasing Our construction excellence across residential, commercial and industrial projects.</p>
                    {/* <div className="hero-buttons">
                      <a href="#projects" className="btn btn-secondary">Browse Projects</a>
                    </div> */}
                  </div>
                </div>

                <div className="hero-right reveal zoom-in">
                  <div className="hero-image">
                  <img
                    alt="construction projects"
                    src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="filter-section">
          <div className="container">
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => handleFilterChange('all')}
              >
                All Projects
              </button>
              <button 
                className={`filter-btn ${filter === 'ongoing' ? 'active' : ''}`}
                onClick={() => handleFilterChange('ongoing')}
              >
                Ongoing
              </button>
              <button 
                className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                onClick={() => handleFilterChange('completed')}
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
                        <p><FaCalendarAlt /> {formatDate(project.startDate)} – {formatDate(project.endDate)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {!loading && !error && projects.length > 0 && totalPages > 1 && (
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
        </section>
      </div>
    </Layout>
  );
};

export default Projects;
