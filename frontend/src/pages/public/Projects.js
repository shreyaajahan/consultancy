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

    fetchProjects();
  }, [filter]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <Layout>
      <div className="projects-page">
        {/* Hero Section */}
        <section className="hero page-hero" style={{backgroundImage: `url('https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80')`}}>
          <div className="hero-overlay">
            <div className="container">
              <div className="hero-grid">
                <div className="hero-left reveal slide-up" style={{animationDelay: '100ms'}}>
                  <div className="glass-panel">
                    <h1>Our Projects</h1>
                    <p className="lead">Showcasing Our construction excellence across residential, commercial and industrial projects.</p>
                    <div className="hero-buttons">
                      <a href="#projects" className="btn btn-secondary">Browse Projects</a>
                    </div>
                  </div>
                </div>

                <div className="hero-right reveal zoom-in">
                  <div className="hero-image">
                    <img alt="projects" src="data:image/jpeg;base64,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" />
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
