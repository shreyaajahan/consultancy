import React from 'react';
import Layout from '../../components/public/Layout';
import { FaEye, FaBullseye, FaCheckCircle } from 'react-icons/fa';
import '../../styles/About.css';

const About = () => {
  return (
    <Layout>
      <div className="about-page">
        {/* Page Header */}
        <section className="page-header parallax-hero" style={{backgroundImage: `url('https://www.constructionworld.in/assets/uploads/13a98c40261296c534a4868124aecf91.jpg')`}}>
          <div className="container">
            <div className="page-header-content">
              <div className="page-header-text reveal slide-up" style={{animationDelay: '120ms'}}>
                <h1>Nivas Constructions</h1>
                <p>Building Excellence Since 2005</p>
              </div>
              <div className="page-header-image reveal zoom-in stagger-2">
                <img alt="About Nivas Constructions" src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" />
              </div>
            </div>
          </div>
        </section>

        {/* Company Overview */}
        <section className="company-overview">
          <div className="container">
            <div className="overview-content">
              <h2>Who We Are</h2>
              <div className="who-grid">
                <div className="who-text reveal slide-up stagger-1">
                  <p>
                    Nivas Constructions is a leading construction company based in Namakkal, Tamil Nadu, 
                    with over 20 years of experience in delivering exceptional construction projects. 
                    We specialize in residential, commercial, and industrial construction, offering 
                    end-to-end solutions from planning to completion.
                  </p>
                  <p>
                    Our commitment to quality, innovation, and customer satisfaction has made us one 
                    of the most trusted names in the construction industry. We have successfully 
                    completed over 60 projects, earning the trust of more than 300 satisfied clients.
                  </p>
                </div>
                <div className="who-image reveal zoom-in stagger-2">
                  <img alt="construction site" src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="vision-mission">
          <div className="container">
            <div className="vm-grid">
              <div className="vm-card">
                <FaEye className="vm-icon" />
                <h3>Our Vision</h3>
                <p>
                  To be the most trusted and preferred construction company, known for delivering 
                  projects that exceed expectations and stand the test of time.
                </p>
              </div>
              <div className="vm-card">
                <FaBullseye className="vm-icon" />
                <h3>Our Mission</h3>
                <p>
                  To provide innovative, sustainable, and high-quality construction solutions 
                  while maintaining the highest standards of safety and professionalism.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="core-values">
          <div className="container">
            <h2>Our Core Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <FaCheckCircle className="value-icon" />
                <h3>Integrity</h3>
                <p>We conduct our business with honesty and transparency</p>
              </div>
              <div className="value-card">
                <FaCheckCircle className="value-icon" />
                <h3>Quality</h3>
                <p>We never compromise on the quality of our work</p>
              </div>
              <div className="value-card">
                <FaCheckCircle className="value-icon" />
                <h3>Innovation</h3>
                <p>We embrace new technologies and construction methods</p>
              </div>
              <div className="value-card">
                <FaCheckCircle className="value-icon" />
                <h3>Safety</h3>
                <p>Safety is our top priority on every project site</p>
              </div>
              <div className="value-card">
                <FaCheckCircle className="value-icon" />
                <h3>Sustainability</h3>
                <p>We are committed to environmentally responsible construction</p>
              </div>
              <div className="value-card">
                <FaCheckCircle className="value-icon" />
                <h3>Customer Focus</h3>
                <p>Client satisfaction drives everything we do</p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="experience-section">
          <div className="container">
            <div className="experience-card">
              <h2>20+ Years of Excellence</h2>
              <p className="experience-text">
                Since our establishment in 2005, Nivas Constructions has grown from a small local 
                contractor to one of the most respected construction companies in Tamil Nadu. Our 
                journey has been marked by continuous growth, innovation, and an unwavering 
                commitment to excellence.
              </p>
            </div>
            <div className="timeline">
              <div className="timeline-item reveal stagger-1">
                <h4>2005</h4>
                <p>Company Founded</p>
              </div>
              <div className="timeline-item reveal stagger-2">
                <h4>2005</h4>
                <p>Expanded to Commercial Projects</p>
              </div>
              <div className="timeline-item reveal stagger-3">
                <h4>2015</h4>
                <p>50+ Projects Milestone</p>
              </div>
              <div className="timeline-item reveal stagger-4">
                <h4>2023</h4>
                <p>Industry Leadership Recognition</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
