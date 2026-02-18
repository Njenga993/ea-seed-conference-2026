import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  User, 
  Building, 
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Paperclip,
  X,
  Loader2,
  Award,
  HelpCircle,
  Zap,
  FileText,
  Download,
  ExternalLink
} from "lucide-react";
import "../styles/contactPage.css";

interface TeamMember {
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
  department: string;
  available: boolean;
}

interface FormData {
  fullName: string;
  email: string;
  institution: string;
  category: string;
  priority: string;
  subject: string;
  message: string;
  attachment: File | null;
  consent: boolean;
}

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    institution: "",
    category: "general",
    priority: "standard",
    subject: "",
    message: "",
    attachment: null,
    consent: false
  });
  
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [activeDepartment, setActiveDepartment] = useState("all");
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{text: string, sender: 'user' | 'bot'}>>([]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [charCount, setCharCount] = useState(0);

  const teamMembers: TeamMember[] = [
    {
      name: "Dr. Sarah Kimani",
      role: "Conference Chair",
      email: "chair@eaisc2026.org",
      phone: "+254 700 123 001",
      avatar: "SK",
      department: "leadership",
      available: true
    },
    {
      name: "Prof. Michael Ochieng",
      role: "Program Committee Chair",
      email: "program@eaisc2026.org",
      phone: "+254 700 123 002",
      avatar: "MO",
      department: "program",
      available: false
    },
    {
      name: "Grace Wanjiru",
      role: "Registration Manager",
      email: "registration@eaisc2026.org",
      phone: "+254 700 123 003",
      avatar: "GW",
      department: "registration",
      available: true
    },
    {
      name: "James Muriuki",
      role: "Sponsorship Coordinator",
      email: "sponsors@eaisc2026.org",
      phone: "+254 700 123 004",
      avatar: "JM",
      department: "sponsorship",
      available: true
    },
    {
      name: "Aisha Hassan",
      role: "Abstract Submission Lead",
      email: "abstracts@eaisc2026.org",
      phone: "+254 700 123 005",
      avatar: "AH",
      department: "abstracts",
      available: false
    },
    {
      name: "David Njoroge",
      role: "Technical Support",
      email: "support@eaisc2026.org",
      phone: "+254 700 123 006",
      avatar: "DN",
      department: "technical",
      available: true
    }
  ];

  const faqs: FAQ[] = [
    {
      question: "When is the abstract submission deadline?",
      answer: "The abstract submission deadline is March 15, 2026, at 23:59 UTC. Late submissions may be considered until March 22, 2026, with an additional fee.",
      category: "abstracts"
    },
    {
      question: "How do I modify my registration?",
      answer: "You can modify your registration by logging into your account on our portal. Go to 'My Registration' and click 'Edit Changes'. Modifications are free until May 1, 2026.",
      category: "registration"
    },
    {
      question: "Are travel grants available?",
      answer: "Yes, we offer limited travel grants for students and researchers from developing countries. Applications open January 15, 2026, and close February 28, 2026.",
      category: "general"
    },
    {
      question: "Will certificates be issued?",
      answer: "All registered participants will receive digital certificates of attendance. Presenters will receive additional presentation certificates. Certificates will be emailed within 7 days after the conference.",
      category: "general"
    },
    {
      question: "What is the cancellation policy?",
      answer: "Full refund available until April 30, 2026. 50% refund until May 31, 2026. No refunds after June 1, 2026. All refund requests must be submitted in writing.",
      category: "registration"
    },
    {
      question: "How can I become a sponsor?",
      answer: "Please review our sponsorship packages on the website or contact our sponsorship coordinator at sponsors@eaisc2026.org. We offer various tiers from $500 to $50,000.",
      category: "sponsorship"
    }
  ];

  const officeHours = {
    weekdays: "9:00 AM - 6:00 PM EAT",
    weekends: "10:00 AM - 2:00 PM EAT",
    holidays: "Closed"
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = "Name must be at least 3 characters";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    } else if (formData.message.length > 1000) {
      newErrors.message = "Message must not exceed 1000 characters";
    }
    if (!formData.consent) {
  newErrors.consent = "You must agree to the privacy policy" as any; // Quick fix
}
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitError("");
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitted(true);
    } catch (error) {
      setSubmitError("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Clear error for this field
      if (errors[name as keyof FormData]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
      }
      
      // Update character count for message
      if (name === 'message') {
        setCharCount(value.length);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setSubmitError("File size must be less than 5MB");
        return;
      }
      setFormData(prev => ({ ...prev, attachment: file }));
    }
  };

  const removeFile = () => {
    setFormData(prev => ({ ...prev, attachment: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const userMessage = chatInput.trim();
    setChatMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setChatInput("");
    setIsTyping(true);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "Thank you for your message. How can I help you today?",
        "I'm here to assist you with conference-related inquiries.",
        "For detailed information, please check our FAQ section or contact the relevant department.",
        "Our team typically responds within 24 hours. Is there anything specific I can help you with?"
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setChatMessages(prev => [...prev, { text: randomResponse, sender: 'bot' }]);
      setIsTyping(false);
    }, 1500);
  };

  const isOfficeHours = () => {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    
    // Weekend hours
    if (day === 0 || day === 6) {
      return hour >= 10 && hour < 14;
    }
    
    // Weekday hours
    return hour >= 9 && hour < 18;
  };

  const filteredTeam = activeDepartment === 'all' 
    ? teamMembers 
    : teamMembers.filter(member => member.department === activeDepartment);

  if (submitted) {
    return (
      <motion.div 
        className="contact-success"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="success-content">
          <div className="success-icon">
            <CheckCircle size={60} />
          </div>
          <h1>Message Sent Successfully!</h1>
          <p>Thank you for contacting EA-ISC 2026. Our team will respond within 24 hours.</p>
          <div className="success-details">
            <p><strong>Reference ID:</strong> #EAISC{Date.now()}</p>
            <p><strong>Response Time:</strong> Within 24 hours</p>
            <p><strong>Follow-up Email:</strong> {formData.email}</p>
          </div>
          <div className="success-actions">
            <button onClick={() => setSubmitted(false)} className="btn-secondary">
              Send Another Message
            </button>
            <button className="btn-primary">
              Return to Homepage
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="contact-page">
      {/* Compact Hero Section */}
      <section className="contact-hero">
        <div className="hero-container">
          <div className="hero-breadcrumb">
            <span>Home</span>
            <span>/</span>
            <span className="current">Contact Us</span>
          </div>
          <div className="hero-content">
            <div className="hero-left">
              <h1>Get in Touch</h1>
              <p className="hero-description">
                Have questions about registration, abstract submission, or sponsorship? 
                Our team is here to help you.
              </p>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-value">24/7</span>
                  <span className="stat-label">Support</span>
                </div>
                <div className="stat">
                  <span className="stat-value">2-4h</span>
                  <span className="stat-label">Response</span>
                </div>
                <div className="stat">
                  <span className="stat-value">6+</span>
                  <span className="stat-label">Departments</span>
                </div>
              </div>
            </div>
            <div className="hero-right">
              <div className="contact-badge">
                <Mail size={18} />
                <span>info@eaisc2026.org</span>
              </div>
              <div className={`contact-badge ${isOfficeHours() ? 'online' : 'offline'}`}>
                <div className={`status-dot ${isOfficeHours() ? 'online' : 'offline'}`}></div>
                <span>{isOfficeHours() ? 'Office Open' : 'Office Closed'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="quick-contact">
        <div className="container">
          <div className="quick-contact-grid">
            <div className="quick-card">
              <div className="card-icon">
                <Mail size={20} />
              </div>
              <div className="card-content">
                <h3>Email Us</h3>
                <p>info@eaisc2026.org</p>
                <span className="card-meta">2-4 hour response</span>
              </div>
            </div>

            <div className="quick-card">
              <div className="card-icon">
                <Phone size={20} />
              </div>
              <div className="card-content">
                <h3>Call Us</h3>
                <p>+254 700 123 456</p>
                <span className="card-meta">Mon-Fri, 9AM-6PM</span>
              </div>
            </div>

            <div className="quick-card">
              <div className="card-icon">
                <MapPin size={20} />
              </div>
              <div className="card-content">
                <h3>Visit Us</h3>
                <p>Nairobi, Kenya</p>
                <span className="card-meta">By appointment</span>
              </div>
            </div>

            <div className="quick-card chat-card" onClick={() => setShowChat(true)}>
              <div className="card-icon">
                <MessageSquare size={20} />
              </div>
              <div className="card-content">
                <h3>Live Chat</h3>
                <p>Start conversation</p>
                <span className="card-meta online">Online now</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Area */}
      <section className="contact-main">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-container">
              <div className="form-header">
                <h2>Send us a message</h2>
                <p>Fill out the form below and we'll get back to you as soon as possible.</p>
              </div>

              {submitError && (
                <div className="error-banner">
                  <AlertCircle size={18} />
                  <span>{submitError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <User size={16} />
                      Full Name *
                    </label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={errors.fullName ? 'error' : ''}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                  </div>

                  <div className="form-group">
                    <label>
                      <Mail size={16} />
                      Email *
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? 'error' : ''}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    <Building size={16} />
                    Institution/Organization
                  </label>
                  <input 
                    type="text" 
                    name="institution"
                    value={formData.institution}
                    onChange={handleInputChange}
                    placeholder="Your institution or organization"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <HelpCircle size={16} />
                      Category
                    </label>
                    <select 
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      <option value="general">General Inquiry</option>
                      <option value="registration">Registration</option>
                      <option value="abstracts">Abstract Submission</option>
                      <option value="sponsorship">Sponsorship</option>
                      <option value="program">Program & Schedule</option>
                      <option value="technical">Technical Support</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>
                      <Zap size={16} />
                      Priority
                    </label>
                    <select 
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                    >
                      <option value="standard">Standard</option>
                      <option value="high">High Priority</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    <MessageSquare size={16} />
                    Subject *
                  </label>
                  <input 
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={errors.subject ? 'error' : ''}
                    placeholder="Brief subject of your inquiry"
                  />
                  {errors.subject && <span className="error-text">{errors.subject}</span>}
                </div>

                <div className="form-group">
                  <label>
                    <MessageSquare size={16} />
                    Message *
                  </label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={errors.message ? 'error' : ''}
                    rows={5}
                    placeholder="Please provide detailed information about your inquiry..."
                  />
                  <div className="char-counter">
                    <span className={charCount > 900 ? 'warning' : ''}>
                      {charCount}/1000 characters
                    </span>
                  </div>
                  {errors.message && <span className="error-text">{errors.message}</span>}
                </div>

                <div className="form-group">
                  <label>
                    <Paperclip size={16} />
                    Attachment (Optional, max 5MB)
                  </label>
                  <div className="file-upload">
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.jpg,.png"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="file-upload-label">
                      <Paperclip size={18} />
                      <span>Choose file or drag and drop</span>
                    </label>
                    {formData.attachment && (
                      <div className="file-info">
                        <span>{formData.attachment.name}</span>
                        <button type="button" onClick={removeFile}>
                          <X size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group checkbox">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="consent"
                      checked={formData.consent}
                      onChange={handleInputChange}
                    />
                    <span className="checkbox-text">
                      I agree to the <a href="/privacy">Privacy Policy</a> and consent to processing of my personal data
                    </span>
                  </label>
                  {errors.consent && <span className="error-text">{errors.consent}</span>}
                </div>

                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="spinner" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Column - Location & Resources */}
            <div className="contact-info-container">
              {/* Location Card */}
              <div className="info-card location-card">
                <h3>Conference Secretariat</h3>
                <div className="map-placeholder">
                  <img 
                    src="https://images.unsplash.com/photo-1577086664693-894d8405334a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                    alt="Nairobi skyline"
                  />
                  <div className="map-overlay">
                    <MapPin size={24} />
                    <span>Nairobi, Kenya</span>
                  </div>
                </div>
                <div className="location-details">
                  <div className="detail-item">
                    <MapPin size={18} />
                    <div>
                      <h4>Address</h4>
                      <p>United Nations Avenue, Gigiri<br />Nairobi, Kenya</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <Clock size={18} />
                    <div>
                      <h4>Office Hours</h4>
                      <p>Weekdays: {officeHours.weekdays}</p>
                      <p>Weekends: {officeHours.weekends}</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <Phone size={18} />
                    <div>
                      <h4>Emergency Contact</h4>
                      <p>+254 700 999 000 (24/7)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Resources */}
              <div className="info-card resources-card">
                <h3>Quick Resources</h3>
                <div className="resources-list">
                  <a href="/conference-guide" className="resource-item">
                    <FileText size={18} />
                    <span>Conference Guide</span>
                    <Download size={14} className="resource-icon-right" />
                  </a>
                  <a href="/sponsorship-brochure" className="resource-item">
                    <Award size={18} />
                    <span>Sponsorship Brochure</span>
                    <Download size={14} className="resource-icon-right" />
                  </a>
                  <a href="/venue-info" className="resource-item">
                    <MapPin size={18} />
                    <span>Venue Information</span>
                    <ExternalLink size={14} className="resource-icon-right" />
                  </a>
                  <a href="/faq" className="resource-item">
                    <HelpCircle size={18} />
                    <span>FAQ</span>
                    <ExternalLink size={14} className="resource-icon-right" />
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="info-card social-card">
                <h3>Connect With Us</h3>
                <div className="social-links">
                  <a href="#" className="social-link">LinkedIn</a>
                  <a href="#" className="social-link">Twitter</a>
                  <a href="#" className="social-link">Facebook</a>
                  <a href="#" className="social-link">YouTube</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2>Meet Our Team</h2>
            <p>Connect with the right department for faster response</p>
          </div>
          
          <div className="department-filter">
            <button 
              className={`filter-btn ${activeDepartment === 'all' ? 'active' : ''}`}
              onClick={() => setActiveDepartment('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${activeDepartment === 'leadership' ? 'active' : ''}`}
              onClick={() => setActiveDepartment('leadership')}
            >
              Leadership
            </button>
            <button 
              className={`filter-btn ${activeDepartment === 'registration' ? 'active' : ''}`}
              onClick={() => setActiveDepartment('registration')}
            >
              Registration
            </button>
            <button 
              className={`filter-btn ${activeDepartment === 'program' ? 'active' : ''}`}
              onClick={() => setActiveDepartment('program')}
            >
              Program
            </button>
            <button 
              className={`filter-btn ${activeDepartment === 'sponsorship' ? 'active' : ''}`}
              onClick={() => setActiveDepartment('sponsorship')}
            >
              Sponsorship
            </button>
          </div>

          <div className="team-grid">
            {filteredTeam.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-avatar">
                  <span>{member.avatar}</span>
                  <div className={`availability-dot ${member.available ? 'available' : 'busy'}`}></div>
                </div>
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <div className="team-contact">
                  <a href={`mailto:${member.email}`}>
                    <Mail size={14} />
                    {member.email}
                  </a>
                  <a href={`tel:${member.phone}`}>
                    <Phone size={14} />
                    {member.phone}
                  </a>
                </div>
                <div className="team-status">
                  <span className={`status-badge ${member.available ? 'online' : 'offline'}`}>
                    {member.available ? 'Available' : 'In meeting'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Quick answers to common questions</p>
          </div>
          
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <div 
                  className="faq-question"
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                >
                  <h3>{faq.question}</h3>
                  <span className="faq-icon">
                    {expandedFAQ === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </span>
                </div>
                <AnimatePresence>
                  {expandedFAQ === index && (
                    <motion.div 
                      className="faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chat Widget */}
      <AnimatePresence>
        {showChat && (
          <motion.div 
            className="chat-widget"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="chat-header">
              <h3>Live Chat</h3>
              <button onClick={() => setShowChat(false)}>
                <X size={16} />
              </button>
            </div>
            
            <div className="chat-messages">
              {chatMessages.length === 0 && (
                <div className="welcome-message">
                  <p>Hello! How can we help you today?</p>
                </div>
              )}
              
              {chatMessages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  <p>{msg.text}</p>
                </div>
              ))}
              
              {isTyping && (
                <div className="message bot typing">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
            </div>
            
            <form onSubmit={handleChatSubmit} className="chat-input">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your message..."
              />
              <button type="submit">
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      <button 
        className="floating-chat-btn"
        onClick={() => setShowChat(true)}
      >
        <MessageSquare size={20} />
        <span className="chat-badge"></span>
      </button>
    </div>
  );
};

export default ContactPage;