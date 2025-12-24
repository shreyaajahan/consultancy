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
        <section className="hero parallax-hero" style={{backgroundImage: `url('https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80')`}}>
          <div className="hero-overlay">
            <div className="container">
              <div className="hero-grid">
                <div className="hero-left reveal slide-up" style={{animationDelay: '120ms'}}>
                  <div className="glass-panel">
                    <h1>Building Your Dreams Into Reality</h1>
                    <p className="lead">Design · Build · Deliver — Professional construction services with a focus on quality, safety and timely delivery.</p>

                    <div className="hero-buttons">
                      <Link to="/projects" className="btn btn-primary">View Projects</Link>
                      <Link to="/contact" className="btn btn-secondary">Request Quote</Link>
                    </div>
                  </div>
                </div>

                <div className="hero-right reveal zoom-in stagger-2">
                  <div className="hero-image">
                    <img alt="construction site" src="https://images.unsplash.com/photo-1517821365205-71c7b2a22b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80" />
                    <div className="brand-badge">
                      <h3>Nivas Constructions</h3>
                      <p>Quality • Safety • Trust</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 64" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 32c120 0 240-24 360-24s240 24 360 24 240-24 360-24 240 24 360 24v32H0z" fill="var(--white)"/></svg>
        </div>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-card reveal slide-up stagger-1">
                <div className="stat-icon"><FaBuilding /></div>
                <div>
                  <div className="stat-number">500+</div>
                  <div className="stat-meta">Projects Completed</div>
                </div>
              </div>

              <div className="stat-card reveal slide-up stagger-2">
                <div className="stat-icon"><FaUsers /></div>
                <div>
                  <div className="stat-number">1000+</div>
                  <div className="stat-meta">Happy Clients</div>
                </div>
              </div>

              <div className="stat-card reveal slide-up stagger-3">
                <div className="stat-icon"><FaHardHat /></div>
                <div>
                  <div className="stat-number">50+</div>
                  <div className="stat-meta">Expert Team</div>
                </div>
              </div>

              <div className="stat-card reveal slide-up stagger-4">
                <div className="stat-icon"><FaAward /></div>
                <div>
                  <div className="stat-number">25+</div>
                  <div className="stat-meta">Years Experience</div>
                </div>
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
              <div className="about-image reveal zoom-in stagger-2">
                <img alt="project preview" src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" />
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
        

        {/* Featured Projects */}
        <section className="featured-projects">
          <div className="container">
            <h2>Featured Projects</h2>
            <p className="sub">Selected projects showcasing our quality and attention to detail</p>
            <div className="projects-grid">
              <div className="project-card reveal slide-up stagger-1">
                <div className="project-media"><img alt="project 1" src="https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"/></div>
                <div className="project-body">
                  <h3>Modern Residential Complex</h3>
                  <p>High-quality finishes and modern amenities for comfortable living.</p>
                  <Link to="/projects" className="btn btn-secondary">View Project</Link>
                </div>
              </div>

              <div className="project-card reveal slide-up stagger-2">
                <div className="project-media"><img alt="project 2" src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"/></div>
                <div className="project-body">
                  <h3>Commercial Office Fitout</h3>
                  <p>Efficient layouts and durable materials tailored for businesses.</p>
                  <Link to="/projects" className="btn btn-secondary">View Project</Link>
                </div>
              </div>

              <div className="project-card reveal slide-up stagger-3">
                <div className="project-media"><img alt="project 3" src="https://images.unsplash.com/photo-1542444459-db3d60d7f4c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"/></div>
                <div className="project-body">
                  <h3>Industrial Warehouse</h3>
                  <p>Robust construction focused on efficiency and longevity.</p>
                  <Link to="/projects" className="btn btn-secondary">View Project</Link>
                </div>
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
