// components/HomeContact.tsx
import { useState } from "react";
import "../styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
    alert("Thank you for your message. We'll get back to you soon.");
  };

  return (
    <section className="home-contact">
      <div className="home-contact-container">
        <div className="home-contact-header">
          <span className="home-contact-tag">Get in Touch</span>
          <h2 className="home-contact-title">Contact Us</h2>
          <p className="home-contact-intro">
            For inquiries, partnerships, or general information,
            please reach out using the form below.
          </p>
        </div>

        <div className="home-contact-grid">
          {/* Form Side */}
          <div className="home-contact-form-wrapper">
            <form onSubmit={handleSubmit} className="home-contact-form">
              <div className="home-form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="home-form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="home-form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this regarding?"
                  required
                />
              </div>

              <div className="home-form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  rows={5}
                  required
                />
              </div>

              <button type="submit" className="home-contact-btn">
                Send Message
              </button>
            </form>

            <div className="home-contact-info">
              <div className="home-info-item">
                <span className="home-info-icon"></span>
                <div>
                  <span className="home-info-label">Email</span>
                  <a href="mailto:info@eaisc2026.org">info@eaisc2026.org</a>
                </div>
              </div>
              <div className="home-info-item">
                <span className="home-info-icon"></span>
                <div>
                  <span className="home-info-label">Phone</span>
                  <a href="tel:+256700123456">+256 700 123 456</a>
                </div>
              </div>
              <div className="home-info-item">
                <span className="home-info-icon"></span>
                <div>
                  <span className="home-info-label">Address</span>
                  <span>Kampala, Uganda</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map Side */}
          <div className="home-contact-map-wrapper">
            <div className="home-map-card">
              <iframe
                title="Conference Location"
                src="https://www.google.com/maps?q=Kampala,Uganda&output=embed"
                loading="lazy"
                className="home-map-iframe"
              ></iframe>
              <div className="home-map-caption">
                <span className="home-map-marker"></span>
                <span> Conference Venue</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;