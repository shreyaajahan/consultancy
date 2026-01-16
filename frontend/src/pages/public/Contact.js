import React, { useState } from 'react';
import Layout from '../../components/public/Layout';
import { enquiryService } from '../../services/apiServices';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import '../../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      await enquiryService.create(formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      console.error('Error submitting enquiry:', err);
      setError(err.response?.data?.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="contact-page">
        {/* Hero Section */}
        <section className="page-header parallax-hero" style={{backgroundImage: `url('https://www.constructionworld.in/assets/uploads/13a98c40261296c534a4868124aecf91.jpg')`}}>
            <div className="container">
              <div className="page-header-content">
                <div className="page-header-text reveal slide-up" style={{animationDelay: '120ms'}}>
                  <h1>Contact Us</h1>
                  <p>Get in touch for consultations, quotes and project enquiries — we're here to help.</p>
                </div>
                <div className="page-header-image reveal zoom-in stagger-2">
                  <img
                    alt="Contact Nivas Constructions"
                    src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" />
                </div>
              </div>
            </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section">
          <div className="container">
            <div className="contact-grid">
              {/* Contact Info */}
              <div className="contact-info-section">
                <h2>Get In Touch</h2>
                <p>
                  Have a question or want to discuss your construction project? 
                  Feel free to reach out to us.
                </p>

                <div className="contact-details">
                  <div className="contact-detail">
                    <FaPhone className="contact-icon" />
                    <div>
                      <h4>Phone</h4>
                      <p>+91 9976728000</p>
                    </div>
                  </div>

                  <div className="contact-detail">
                    <FaEnvelope className="contact-icon" />
                    <div>
                      <h4>Email</h4>
                      <p>palanisamyv1973@gmail.com</p>
                    </div>
                  </div>

                  <div className="contact-detail">
                    <FaMapMarkerAlt className="contact-icon" />
                    <div>
                      <h4>Address</h4>
                      <p>30,Pallipatti Belukkurichi (p.o)</p>
                      <p>Namakkal, Tamil Nadu 637402</p>
                    </div>
                  </div>

                  <div className="contact-detail">
                    <FaClock className="contact-icon" />
                    <div>
                      <h4>Working Hours</h4>
                      <p>Mon - Sat: 9:00 AM - 6:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="contact-form-section">
                <h2>Send Us a Message</h2>
                
                {success && (
                  <div className="success-message">
                    Thank you for contacting us! We will get back to you soon.
                  </div>
                )}

                {error && (
                  <div className="error-message">
                    {error}
                  </div>
                )}

                <form id="form" onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email *"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your Phone *"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject *"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <textarea
                      name="message"
                      placeholder="Your Message *"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Contact;
