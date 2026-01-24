import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';
import '../../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Nivas Constructions</h3>
            <p>Building dreams, creating realities. Your trusted partner in construction excellence.</p>
            <div className="social-links">
              <button type="button" aria-label="Facebook" onClick={() => console.log('Facebook link')} className="social-button"><FaFacebook /></button>
              <button type="button" aria-label="Instagram" onClick={() => console.log('Instagram link')} className="social-button"><FaInstagram /></button>
              <button type="button" aria-label="LinkedIn" onClick={() => console.log('LinkedIn link')} className="social-button"><FaLinkedin /></button>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <p><FaPhone /> +91 9976728000</p>
              <p><FaEnvelope /> palanisamyv1973@gmail.com</p>
              <p><FaMapMarkerAlt /> Namakkal, Tamil Nadu, India</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Nivas Constructions. All rights reserved.</p>
          <Link to="/admin/login" className="admin-link">Admin</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
