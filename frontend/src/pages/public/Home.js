import React from 'react';
import Layout from '../../components/public/Layout';
import { Link } from 'react-router-dom';
import { FaHardHat, FaBuilding, FaUsers, FaAward } from 'react-icons/fa';
import '../../styles/Home.css';

const Home = () => {
  return (
    <Layout>
      <div className="home">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-overlay">
            <div className="container">
              <div className="hero-content">
                <h1>Building Your Dreams Into Reality</h1>
                <p>Professional Construction Services with Excellence and Integrity</p>
                <div className="hero-buttons">
                  <Link to="/projects" className="btn btn-primary">Our Projects</Link>
                  <Link to="/contact" className="btn btn-secondary">Get Quote</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-card">
                <FaBuilding className="stat-icon" />
                <h3>500+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat-card">
                <FaUsers className="stat-icon" />
                <h3>1000+</h3>
                <p>Happy Clients</p>
              </div>
              <div className="stat-card">
                <FaHardHat className="stat-icon" />
                <h3>50+</h3>
                <p>Expert Team</p>
              </div>
              <div className="stat-card">
                <FaAward className="stat-icon" />
                <h3>25+</h3>
                <p>Years Experience</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Preview */}
        <section className="about-preview">
          <div className="container">
            <div className="about-preview-content">
              <div className="about-text">
                <h2>About Nivas Constructions</h2>
                <p>
                  With over 25 years of experience in the construction industry, Nivas Constructions 
                  has established itself as a trusted name in building residential, commercial, and 
                  industrial projects.
                </p>
                <p>
                  We are committed to delivering high-quality construction services with a focus on 
                  innovation, sustainability, and customer satisfaction.
                </p>
                <Link to="/about" className="btn btn-primary">Learn More</Link>
              </div>
              <div className="about-image">
                <div className="image-placeholder">
                  <FaBuilding size={100} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="why-choose">
          <div className="container">
            <h2>Why Choose Us</h2>
            <div className="features-grid">
              <div className="feature-card">
                <h3>Quality Assurance</h3>
                <p>We maintain the highest standards of quality in every project we undertake.</p>
              </div>
              <div className="feature-card">
                <h3>Timely Delivery</h3>
                <p>We respect deadlines and ensure projects are completed on time.</p>
              </div>
              <div className="feature-card">
                <h3>Expert Team</h3>
                <p>Our experienced professionals bring expertise to every project.</p>
              </div>
              <div className="feature-card">
                <h3>Competitive Pricing</h3>
                <p>Quality construction services at affordable and transparent prices.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <h2>Ready to Start Your Project?</h2>
            <p>Contact us today for a free consultation and quote</p>
            <Link to="/contact" className="btn btn-primary">Contact Us</Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
