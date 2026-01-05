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
        <section className="hero parallax-hero" style={{backgroundImage: `url('https://www.constructionworld.in/assets/uploads/13a98c40261296c534a4868124aecf91.jpg')`}}>
          <div className="hero-overlay">
            <div className="container">
              <div className="hero-grid">
                <div className="hero-left reveal slide-up" style={{animationDelay: '120ms'}}>
                  <div className="glass-panel">
                    <h1><b>Building Your Dreams Into Reality</b></h1>
                    <p className="lead"><b>Design · Build · Deliver — Professional construction services with a focus on quality, safety and timely delivery.</b></p>

                    {/* <div className="hero-buttons">
                      <Link to="/projects" className="btn btn-primary">View Projects</Link>
                      <Link to="/contact" className="btn btn-secondary">Request Quote</Link>
                    </div> */}
                  </div>
                </div>

                <div className="hero-right reveal zoom-in stagger-2">
                  <div className="hero-image">
                    <img
                      alt="construction site"
                      src="https://www.constructionworld.in/assets/uploads/13a98c40261296c534a4868124aecf91.jpg"
                    />
                    <div className="brand-badge">
                      <h3>Nivas Constructions</h3>
                      <p><b>Quality • Safety • Trust</b></p>
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
                  <div className="stat-number">50+</div>
                  <div className="stat-meta">Projects Completed</div>
                </div>
              </div>

              <div className="stat-card reveal slide-up stagger-2">
                <div className="stat-icon"><FaUsers /></div>
                <div>
                  <div className="stat-number">300+</div>
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
                  <div className="stat-number">20+</div>
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
                  With over 20 years of experience in the construction industry, Nivas Constructions 
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
                <div className="project-media"><img alt="project 1" src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"/></div>
                <div className="project-body">
                  <h3>Road Construction</h3>
                  <p>Professional road infrastructure with superior materials and engineering.</p>
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
                <div className="project-media"><img alt="project 3" src="https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"/></div>
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
