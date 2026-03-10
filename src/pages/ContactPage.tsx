// pages/ContactPage.tsx
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
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
  Paperclip,
  X,
  Loader2
} from "lucide-react";
import emailjs from "@emailjs/browser";
import Venue from "../components/Venue";
import "../styles/contactPage.css";

// Import background images and textures
import heroBackground from "../assets/contact.webp"; // Your hero background image


// Declare global gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

interface FormData {
  fullName: string;
  email: string;
  institution: string;
  category: string;
  subject: string;
  message: string;
  attachment: File | null;
  consent: boolean;
}

const ContactPage = () => {
  // EmailJS configuration
  const SERVICE_ID = "service_co7ixti";
  const TEMPLATE_ADMIN = "template_xy3vj5d";
  const TEMPLATE_AUTOREPLY = "template_r8zhnrs";
  const PUBLIC_KEY = "DkwMskdWx5M6v7hfY";

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    institution: "",
    category: "general",
    subject: "",
    message: "",
    attachment: null,
    consent: false
  });
  
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [charCount, setCharCount] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  // Generate FAQ structured data for contact page
  const contactFaqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How can I contact the Eastern Africa Indigenous Seed Conference organizers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can contact the EA-ISC 2026 team via email at info@eaindigenousseedsconference.org, phone at +254 712 451 777, or by filling out the contact form on this page. Our office is located in Nairobi, Kenya, and we respond to inquiries within 2-4 hours during business hours."
        }
      },
      {
        "@type": "Question",
        "name": "What are the office hours for the conference secretariat?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our office is open weekdays from 9:00 AM to 6:00 PM EAT, and weekends from 10:00 AM to 2:00 PM EAT. We are closed on public holidays. Emergency contact is available 24/7 at +254 712 451 777."
        }
      },
      {
        "@type": "Question",
        "name": "How quickly can I expect a response to my inquiry?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We aim to respond to all inquiries within 2-4 hours during office hours. For urgent matters, please call our emergency contact number available 24/7."
        }
      },
      {
        "@type": "Question",
        "name": "Where is the conference venue located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The 1st Eastern Africa Indigenous Seed Conference 2026 will be held in Nairobi, Kenya. The exact venue address will be announced soon and shared with registered participants."
        }
      },
      {
        "@type": "Question",
        "name": "Can I submit an attachment with my inquiry?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can attach files up to 5MB in size. Accepted formats include PDF, Word documents, JPEG, and PNG images. This is useful for submitting supporting documents or preliminary inquiries about abstract submissions."
        }
      },
      {
        "@type": "Question",
        "name": "What categories of inquiries can I submit through the contact form?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can submit inquiries related to General Information, Registration, Abstract Submission, Sponsorship, Program & Schedule, and Technical Support. Select the appropriate category to ensure your query reaches the right team member."
        }
      }
    ]
  };

  // ContactPage structured data
  const contactPageData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact EA-ISC 2026 | Eastern Africa Indigenous Seed Conference",
    "description": "Get in touch with the organizers of the 1st Eastern Africa Indigenous Seed Conference. Contact us for registration inquiries, abstract submission questions, sponsorship opportunities, or general information.",
    "url": "https://eaindigenousseedsconference.org/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "Eastern Africa Indigenous Seed Council",
      "url": "https://eaindigenousseedsconference.org",
      "logo": "https://eaindigenousseedsconference.org/logo.png",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+254-712-451-777",
          "contactType": "customer service",
          "email": "info@eaindigenousseedsconference.org",
          "availableLanguage": ["English", "Swahili"],
          "hoursAvailable": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "09:00",
              "closes": "18:00"
            },
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Saturday", "Sunday"],
              "opens": "10:00",
              "closes": "14:00"
            }
          ]
        },
        {
          "@type": "ContactPoint",
          "telephone": "+254-712-451-777",
          "contactType": "emergency",
          "availableLanguage": "English"
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Nairobi",
        "addressCountry": "KE"
      }
    }
  };

  // Breadcrumb structured data
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://eaindigenousseedsconference.org"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Contact",
        "item": "https://eaindigenousseedsconference.org/contact"
      }
    ]
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
    
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (!formRef.current) return;
    
    setIsSubmitting(true);
    setSubmitError("");
    setFormMessage("");
    
    try {
      // Prepare template parameters for EmailJS
      const templateParams = {
        name: formData.fullName,
        email: formData.email,
        institution: formData.institution || "Not provided",
        category: formData.category,
        subject: formData.subject,
        message: formData.message,
        phone: "Not provided" // Adding phone field as it might be in your template
      };

      // Send message to admin
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ADMIN,
        templateParams,
        PUBLIC_KEY
      );

      // Send auto reply to sender
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_AUTOREPLY,
        templateParams,
        PUBLIC_KEY
      );

      setSubmitted(true);
      setFormMessage("Thank you for contacting us. A confirmation email has been sent.");
      
      // Safely track form submission in analytics if gtag exists
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'form_submission', {
          'event_category': 'contact',
          'event_label': formData.category
        });
      }
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitError("Failed to send message. Please try again.");
      setFormMessage("Something went wrong while sending your message. Please try again.");
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
      
      if (errors[name as keyof FormData]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
      }
      
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

  const isOfficeHours = () => {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    
    if (day === 0 || day === 6) {
      return hour >= 10 && hour < 14;
    }
    
    return hour >= 9 && hour < 18;
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      fullName: "",
      email: "",
      institution: "",
      category: "general",
      subject: "",
      message: "",
      attachment: null,
      consent: false
    });
    setCharCount(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (submitted) {
    return (
      <motion.div 
        className="contact-success"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Helmet>
          <title>Message Sent | EA-ISC 2026 Contact</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="success-content">
          <div className="success-icon">
            <CheckCircle size={60} />
          </div>
          <h1>Message Sent Successfully!</h1>
          <p>{formMessage || "Thank you for contacting EA-ISC 2026. Our team will respond within 24 hours."}</p>
          <div className="success-details">
            <p><strong>Reference ID:</strong> #EAISC{Date.now()}</p>
            <p><strong>Response Time:</strong> Within 24 hours</p>
            <p><strong>Follow-up Email:</strong> {formData.email}</p>
          </div>
          <div className="success-actions">
            <button onClick={resetForm} className="btn-secondary">
              Send Another Message
            </button>
            <button className="btn-primary" onClick={() => window.location.href = '/'}>
              Return to Homepage
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Contact Us | EA-ISC 2026 | Eastern Africa Indigenous Seed Conference</title>
        <meta name="description" content="Contact the organizers of the 1st Eastern Africa Indigenous Seed Conference 2026. Get answers to your questions about registration, abstract submission, sponsorship, and venue information. Our team responds within 2-4 hours." />
        <meta name="keywords" content="contact EA-ISC 2026, conference organizers contact, seed conference email, Eastern Africa conference contact, Nairobi conference contact, registration support, abstract submission help, sponsorship inquiries" />
        <meta name="author" content="Eastern Africa Indigenous Seed Council" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://eaindigenousseedsconference.org/contact" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://eaindigenousseedsconference.org/contact" />
        <meta property="og:title" content="Contact EA-ISC 2026 | Eastern Africa Indigenous Seed Conference" />
        <meta property="og:description" content="Get in touch with the conference organizers. We're here to help with registration, abstract submission, sponsorship, and general inquiries. Response within 2-4 hours." />
        <meta property="og:image" content="https://eaindigenousseedsconference.org/images/contact-og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Contact Eastern Africa Indigenous Seed Conference 2026" />
        <meta property="og:site_name" content="EA-ISC 2026" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@EAISC2026" />
        <meta name="twitter:creator" content="@EAISC2026" />
        <meta name="twitter:title" content="Contact EA-ISC 2026 | Eastern Africa Indigenous Seed Conference" />
        <meta name="twitter:description" content="Questions about registration, abstracts, or sponsorship? Contact our team for quick assistance. Response within 2-4 hours." />
        <meta name="twitter:image" content="https://eaindigenousseedsconference.org/images/contact-twitter-card.jpg" />
        <meta name="twitter:image:alt" content="Contact Eastern Africa Indigenous Seed Conference" />

        {/* Mobile Specific */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#1e4a6b" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="geo.region" content="KE" />
        <meta name="geo.placename" content="Nairobi" />

        {/* Additional SEO */}
        <meta name="contact" content="info@eaindigenousseedsconference.org" />
        <link rel="help" href="https://eaindigenousseedsconference.org/faq" />
      </Helmet>

      {/* JSON-LD Structured Data */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(contactPageData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(contactFaqData)}
        </script>
      </Helmet>

      <div className="contact-page" itemScope itemType="https://schema.org/ContactPage">
        <meta itemProp="name" content="Contact EA-ISC 2026 - Eastern Africa Indigenous Seed Conference" />
        <meta itemProp="description" content="Contact the organizers of the 1st Eastern Africa Indigenous Seed Conference for inquiries about registration, abstract submission, sponsorship, and venue information." />
        
        {/* Hero Section with Background Image */}
        <section 
          className="contact-hero" 
          aria-label="Contact Hero Section"
          style={{ backgroundImage: `url(${heroBackground})` }}
        >
          <div className="hero-overlay"></div>
          <div className="hero-pattern" aria-hidden="true"></div>
          <div className="hero-container">
            <nav className="hero-breadcrumb" aria-label="Breadcrumb" itemScope itemType="https://schema.org/BreadcrumbList">
              <span itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <a href="/" itemProp="item" className="breadcrumb-link">
                  <span itemProp="name">Home</span>
                </a>
                <meta itemProp="position" content="1" />
              </span>
              <span aria-hidden="true">/</span>
              <span className="current" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span itemProp="name">Contact Us</span>
                <meta itemProp="position" content="2" />
              </span>
            </nav>
            <div className="hero-content">
              <div className="hero-left">
                <h1 itemProp="headline">Get in Touch</h1>
                <p className="hero-description" itemProp="description">
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
                </div>
              </div>
              <div className="hero-right" itemProp="contactPoint" itemScope itemType="https://schema.org/ContactPoint">
                <div className="contact-badge">
                  <Mail size={18} aria-hidden="true" />
                  <span itemProp="email">info@eaindigenousseedsconference.org</span>
                </div>
                <div className={`contact-badge ${isOfficeHours() ? 'online' : 'offline'}`}>
                  <div className={`status-dot ${isOfficeHours() ? 'online' : 'offline'}`} aria-hidden="true"></div>
                  <span>{isOfficeHours() ? 'Office Open' : 'Office Closed'}</span>
                </div>
                <meta itemProp="telephone" content="+254712451777" />
                <meta itemProp="contactType" content="customer service" />
                <meta itemProp="availableLanguage" content="English" />
                <meta itemProp="availableLanguage" content="Swahili" />
              </div>
            </div>
          </div>
        </section>

        {/* Venue Component with Paper Texture */}
        <div className="venue-wrapper paper-texture">
          <Venue />
        </div>

        {/* Quick Contact Cards with Dot Pattern */}
        <section className="quick-contact pattern-dots" aria-label="Quick Contact Options">
          <div className="container">
            <div className="quick-contact-grid">
              <div className="quick-card" itemProp="contactPoint" itemScope itemType="https://schema.org/ContactPoint">
                <div className="card-icon" aria-hidden="true">
                  <Mail size={20} />
                </div>
                <div className="card-content">
                  <h3>Email Us</h3>
                  <p itemProp="email">info@eaindigenousseedsconference.org</p>
                  <span className="card-meta">2-4 hour response</span>
                  <meta itemProp="contactType" content="email support" />
                </div>
              </div>

              <div className="quick-card" itemProp="contactPoint" itemScope itemType="https://schema.org/ContactPoint">
                <div className="card-icon" aria-hidden="true">
                  <Phone size={20} />
                </div>
                <div className="card-content">
                  <h3>Call Us</h3>
                  <p itemProp="telephone">+254 712 451 777</p>
                  <span className="card-meta">Mon-Fri, 9AM-6PM</span>
                  <meta itemProp="contactType" content="customer service" />
                </div>
              </div>

              <div className="quick-card">
                <div className="card-icon" aria-hidden="true">
                  <MapPin size={20} />
                </div>
                <div className="card-content">
                  <h3>Visit Us</h3>
                  <p>Seed Savers Network, Kenya</p>
                </div>
              </div>

              <div className="quick-card">
                <div className="card-icon" aria-hidden="true">
                  <MessageSquare size={20} />
                </div>
                <div className="card-content">
                  <h3>Contact Form</h3>
                  <p>Send a message</p>
                  <span className="card-meta">Quick response</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Contact Area with Line Pattern */}
        <section className="contact-main pattern-lines" aria-labelledby="contact-form-heading">
          <div className="container">
            <div className="contact-grid">
              {/* Contact Form */}
              <div className="contact-form-container">
                <div className="form-header">
                  <h2 id="contact-form-heading">Send us a message</h2>
                  <p>Fill out the form below and we'll get back to you as soon as possible.</p>
                </div>

                {submitError && (
                  <div className="error-banner" role="alert">
                    <AlertCircle size={18} aria-hidden="true" />
                    <span>{submitError}</span>
                  </div>
                )}

                <form ref={formRef} onSubmit={handleSubmit} className="contact-form" aria-label="Contact form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="fullName">
                        <User size={16} aria-hidden="true" />
                        Full Name *
                      </label>
                      <input 
                        type="text" 
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={errors.fullName ? 'error' : ''}
                        placeholder="Enter your full name"
                        aria-required="true"
                        aria-invalid={!!errors.fullName}
                        aria-describedby={errors.fullName ? "fullName-error" : undefined}
                      />
                      {errors.fullName && <span id="fullName-error" className="error-text" role="alert">{errors.fullName}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">
                        <Mail size={16} aria-hidden="true" />
                        Email *
                      </label>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={errors.email ? 'error' : ''}
                        placeholder="your.email@example.com"
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email && <span id="email-error" className="error-text" role="alert">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="institution">
                      <Building size={16} aria-hidden="true" />
                      Institution/Organization
                    </label>
                    <input 
                      type="text" 
                      id="institution"
                      name="institution"
                      value={formData.institution}
                      onChange={handleInputChange}
                      placeholder="Your institution or organization"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="category">
                      <MessageSquare size={16} aria-hidden="true" />
                      Category
                    </label>
                    <select 
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      aria-label="Select inquiry category"
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
                    <label htmlFor="subject">
                      <MessageSquare size={16} aria-hidden="true" />
                      Subject *
                    </label>
                    <input 
                      type="text" 
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={errors.subject ? 'error' : ''}
                      placeholder="Brief subject of your inquiry"
                      aria-required="true"
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                    />
                    {errors.subject && <span id="subject-error" className="error-text" role="alert">{errors.subject}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">
                      <MessageSquare size={16} aria-hidden="true" />
                      Message *
                    </label>
                    <textarea 
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className={errors.message ? 'error' : ''}
                      rows={5}
                      placeholder="Please provide detailed information about your inquiry..."
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : "message-counter"}
                    />
                    <div id="message-counter" className="char-counter">
                      <span className={charCount > 900 ? 'warning' : ''}>
                        {charCount}/1000 characters
                      </span>
                    </div>
                    {errors.message && <span id="message-error" className="error-text" role="alert">{errors.message}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="file-upload">
                      <Paperclip size={16} aria-hidden="true" />
                      Attachment (Optional, max 5MB)
                    </label>
                    <div className="file-upload">
                      <input 
                        type="file" 
                        id="file-upload"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.jpg,.png"
                        aria-label="Upload attachment"
                      />
                      <label htmlFor="file-upload" className="file-upload-label">
                        <Paperclip size={18} aria-hidden="true" />
                        <span>Choose file or drag and drop</span>
                      </label>
                      {formData.attachment && (
                        <div className="file-info">
                          <span>{formData.attachment.name}</span>
                          <button type="button" onClick={removeFile} aria-label="Remove attachment">
                            <X size={14} aria-hidden="true" />
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
                        aria-required="true"
                      />
                      <span className="checkbox-text">
                        I agree to the <a href="/privacy">Privacy Policy</a> and consent to processing of my personal data
                      </span>
                    </label>
                    {errors.consent && <span className="error-text" role="alert">{errors.consent}</span>}
                  </div>

                  <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={isSubmitting}
                    aria-label={isSubmitting ? "Sending message..." : "Send message"}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="spinner" aria-hidden="true" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} aria-hidden="true" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Right Column - Location & Resources */}
              <div className="contact-info-container">
                {/* Location Card */}
                <div className="info-card location-card" itemScope itemType="https://schema.org/Place">
                  <h3><span itemProp="name">Conference Secretariat</span></h3>
                  <div className="map-placeholder">
                    <div className="map-overlay">
                      <MapPin size={24} aria-hidden="true" />
                      <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                        <span itemProp="addressLocality">Seed Savers Network</span>, <span itemProp="addressCountry">Kenya</span>
                      </span>
                    </div>
                  </div>
                  <div className="location-details">
                    <div className="detail-item">
                      <MapPin size={18} aria-hidden="true" />
                      <div>
                        <h4>Address</h4>
                        <p itemProp="address">Seed Savers Network, Kenya</p>
                      </div>
                    </div>
                    <div className="detail-item" itemProp="openingHoursSpecification" itemScope itemType="https://schema.org/OpeningHoursSpecification">
                      <Clock size={18} aria-hidden="true" />
                      <div>
                        <h4>Office Hours</h4>
                        <p>Weekdays: <time itemProp="opens" content="09:00">9:00 AM</time> - <time itemProp="closes" content="18:00">6:00 PM</time> EAT</p>
                        <meta itemProp="dayOfWeek" content="https://schema.org/Monday" />
                        <meta itemProp="dayOfWeek" content="https://schema.org/Tuesday" />
                        <meta itemProp="dayOfWeek" content="https://schema.org/Wednesday" />
                        <meta itemProp="dayOfWeek" content="https://schema.org/Thursday" />
                        <meta itemProp="dayOfWeek" content="https://schema.org/Friday" />
                      </div>
                    </div>
                    <div className="detail-item">
                      <Phone size={18} aria-hidden="true" />
                      <div>
                        <h4>Emergency Contact</h4>
                        <p itemProp="telephone">+254 712 451 777 (24/7)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;