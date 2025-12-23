import React, { useState, useEffect } from 'react';
import Layout from '../../components/public/Layout';
import { serviceService } from '../../services/apiServices';
import { FaTools } from 'react-icons/fa';
import '../../styles/Services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await serviceService.getAll();
      setServices(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to load services. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="services-page">
        {/* Page Header */}
        <section className="page-header">
          <div className="container">
            <h1>Our Services</h1>
            <p>Comprehensive Construction Solutions for Every Need</p>
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
