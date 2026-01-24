import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../../components/public/Layout';
import { serviceService } from '../../services/apiServices';
import { FaTools } from 'react-icons/fa';
import '../../styles/Services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      const response = await serviceService.getAll(currentPage);
      setServices(response.data || []);
      setTotalPages(response.totalPages || 1);
      setError(null);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to load services. Please try again later.');
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      <div className="services-page">
        {/* Hero Section */}
        <section className="hero page-hero" style={{backgroundImage: `url('https://www.constructionworld.in/assets/uploads/13a98c40261296c534a4868124aecf91.jpg')`}}>
          <div className="hero-overlay">
            <div className="container">
              <div className="hero-grid">
                <div className="hero-left reveal slide-up" style={{animationDelay: '100ms'}}>
                  <div className="glass-panel">
                    <h1>Our Services</h1>
                    <p className="lead">Comprehensive Construction Solutions for Every Need — design, build and maintain with expertise.</p>
                    {/* <div className="hero-buttons">
                      <a href="#services" className="btn btn-secondary">Explore Services</a>
                    </div> */}
                  </div>
                </div>

                <div className="hero-right reveal zoom-in">
                  <div className="hero-image">
                    <img
                      alt="construction services"
                      src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="services-section">
          <div className="container">
            {loading ? (
              <div className="loading">Loading services...</div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : services.length === 0 ? (
              <div className="no-data">No services available at the moment.</div>
            ) : (
              <div className="services-grid">
                {services.map((service) => (
                  <div key={service._id} className="service-card">
                    <div className="service-icon">
                      <FaTools />
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                ))}
              </div>
            )}
            {!loading && !error && services.length > 0 && totalPages > 1 && (
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

        {/* Additional Info */}
        <section className="service-info">
          <div className="container">
            <h2>Why Choose Our Services?</h2>
            <div className="info-grid">
              <div className="info-card">
                <h3>Professional Team</h3>
                <p>Experienced professionals dedicated to your project's success</p>
              </div>
              <div className="info-card">
                <h3>Quality Materials</h3>
                <p>We use only the best materials for lasting results</p>
              </div>
              <div className="info-card">
                <h3>On-Time Delivery</h3>
                <p>Committed to meeting deadlines without compromising quality</p>
              </div>
              <div className="info-card">
                <h3>Competitive Pricing</h3>
                <p>Fair and transparent pricing for all our services</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Services;
