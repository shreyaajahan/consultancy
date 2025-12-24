import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="contact-small">Call us: +91 1234567890 • info@nivasconstructions.com</div>
          <div>
            <Link to="/contact" className="btn top-cta">Request Quote</Link>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <h1>Nivas Constructions</h1>
            <div className="tagline">Quality. Safety. Trust.</div>
          </Link>

          <button className="menu-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link>
            <Link to="/projects" onClick={() => setIsMenuOpen(false)}>Projects</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
