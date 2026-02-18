import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import "../styles/registrationAbstract.css";

const ABSTRACT_DEADLINE = new Date("2026-03-15T23:59:59");

const RegistrationAbstractPage = () => {
  const [mode, setMode] = useState<"attend" | "submit">("attend");
  const [submitted, setSubmitted] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    institution: "",
    country: "",
    participationType: "in-person",
    paperTitle: "",
    abstract: "",
    track: "",
    termsAccepted: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const calculateDaysLeft = () => {
    const diff = ABSTRACT_DEADLINE.getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const daysLeft = calculateDaysLeft();
  const isUrgent = daysLeft <= 7;

  const handleAbstractChange = (text: string) => {
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    setWordCount(words);
    setFormData(prev => ({ ...prev, abstract: text }));
    
    if (errors.abstract) {
      setErrors(prev => ({ ...prev, abstract: "" }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      setSelectedFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.institution.trim()) newErrors.institution = "Institution is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    
    if (mode === "submit") {
      if (!formData.paperTitle.trim()) newErrors.paperTitle = "Paper title is required";
      if (!formData.abstract.trim()) newErrors.abstract = "Abstract is required";
      else if (wordCount > 300) newErrors.abstract = "Abstract must not exceed 300 words";
      if (!formData.track) newErrors.track = "Please select a track";
    }
    
    if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept the terms and conditions";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="success-screen">
        <div className="success-content">
          <div className="success-icon">✓</div>
          <h1>Submission Received</h1>
          <p>
            Thank you for registering for EA-ISC 2026.
            A confirmation email will be sent to {formData.email} shortly.
          </p>
          <div className="success-actions">
            <button 
              onClick={() => setSubmitted(false)}
              className="btn btn-secondary"
            >
              Submit Another
            </button>
            <a href="/" className="btn btn-primary">
              Return Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="registration-page">

      {/* Hero Section */}
      <section className="reg-hero">
        <div className="hero-container">
          <div className="hero-breadcrumb">
            <span>Home</span>
            <span>/</span>
            <span className="current">Registration</span>
          </div>
          <div className="hero-content">
            <div className="hero-left">
              <h1>Register & Submit Your Abstract</h1>
              <p className="hero-description">
                Join leading researchers, policymakers, and innovators shaping
                sustainable development in Africa.
              </p>
            </div>
            <div className="hero-right">
              <div className={`deadline-badge ${isUrgent ? "urgent" : ""}`}>
                <span className="deadline-label">Abstract Deadline</span>
                <span className="deadline-days">{daysLeft} days</span>
                <span className="deadline-date">March 15, 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mode Toggle */}
      <section className="mode-section">
        <div className="container">
          <div className="mode-toggle">
            <button
              className={`mode-btn ${mode === "attend" ? "active" : ""}`}
              onClick={() => setMode("attend")}
            >
              <span className="mode-icon"></span>
              <span className="mode-label">Attend Only</span>
            </button>
            <button
              className={`mode-btn ${mode === "submit" ? "active" : ""}`}
              onClick={() => setMode("submit")}
            >
              <span className="mode-icon"></span>
              <span className="mode-label">Submit Abstract & Attend</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Form */}
      <section className="form-section">
        <div className="container narrow">
          <form onSubmit={handleSubmit} className="registration-form">
            
            {/* Personal Information */}
            <div className="form-card">
              <h2 className="form-section-title">
                <span className="section-number">1</span>
                Personal Information
              </h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label>
                    Full Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={errors.fullName ? "error" : ""}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label>
                    Email Address <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? "error" : ""}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    Institution/Organization <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleInputChange}
                    className={errors.institution ? "error" : ""}
                    placeholder="Your institution"
                  />
                  {errors.institution && <span className="error-text">{errors.institution}</span>}
                </div>

                <div className="form-group">
                  <label>
                    Country <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={errors.country ? "error" : ""}
                    placeholder="Your country"
                  />
                  {errors.country && <span className="error-text">{errors.country}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>Participation Type</label>
                <select
                  name="participationType"
                  value={formData.participationType}
                  onChange={handleInputChange}
                >
                  <option value="in-person">In-Person</option>
                  <option value="virtual">Virtual</option>
                </select>
              </div>
            </div>

            {/* Abstract Section - Conditional */}
            <AnimatePresence>
              {mode === "submit" && (
                <div className="form-card abstract-card">
                  <h2 className="form-section-title">
                    <span className="section-number">2</span>
                    Abstract Submission
                  </h2>

                  <div className="form-group">
                    <label>
                      Paper Title <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="paperTitle"
                      value={formData.paperTitle}
                      onChange={handleInputChange}
                      className={errors.paperTitle ? "error" : ""}
                      placeholder="Enter your paper title"
                    />
                    {errors.paperTitle && <span className="error-text">{errors.paperTitle}</span>}
                  </div>

                  <div className="form-group">
                    <label>
                      Abstract <span className="required">*</span>
                    </label>
                    <textarea
                      name="abstract"
                      value={formData.abstract}
                      onChange={(e) => handleAbstractChange(e.target.value)}
                      className={errors.abstract ? "error" : ""}
                      rows={6}
                      placeholder="Enter your abstract (max 300 words)"
                    />
                    <div className="word-counter">
                      <span className={wordCount > 300 ? "error" : ""}>
                        {wordCount} / 300 words
                      </span>
                    </div>
                    {errors.abstract && <span className="error-text">{errors.abstract}</span>}
                  </div>

                  <div className="form-group">
                    <label>Upload Full Paper (Optional)</label>
                    <div className="file-upload">
                      <input
                        type="file"
                        id="file-upload"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                      />
                      <label htmlFor="file-upload" className="file-upload-label">
                        <span className="upload-icon">📎</span>
                        <span className="upload-text">
                          {selectedFile ? selectedFile.name : "Choose file or drag and drop"}
                        </span>
                        <span className="upload-hint">PDF, DOC up to 5MB</span>
                      </label>
                      {selectedFile && (
                        <div className="file-info">
                          <span className="file-name">{selectedFile.name}</span>
                          <button type="button" onClick={removeFile} className="file-remove">
                            ✕
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      Track / Focus Area <span className="required">*</span>
                    </label>
                    <select
                      name="track"
                      value={formData.track}
                      onChange={handleInputChange}
                      className={errors.track ? "error" : ""}
                    >
                      <option value="">Select a track</option>
                      <option value="climate">Climate & Sustainability</option>
                      <option value="ai">Artificial Intelligence</option>
                      <option value="energy">Renewable Energy</option>
                      <option value="policy">Policy & Governance</option>
                    </select>
                    {errors.track && <span className="error-text">{errors.track}</span>}
                  </div>
                </div>
              )}
            </AnimatePresence>

            {/* Terms and Submit */}
            <div className="form-footer">
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                  />
                  <span className="checkbox-text">
                    I agree to the <a href="/terms">terms and conditions</a> and confirm that the information provided is accurate
                  </span>
                </label>
                {errors.termsAccepted && <span className="error-text">{errors.termsAccepted}</span>}
              </div>

              <button type="submit" className="submit-btn">
                Complete Registration
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Guidelines */}
      <section className="guidelines-section">
        <div className="container narrow">
          <h2 className="section-title">Submission Guidelines</h2>
          <div className="guidelines-grid">
            <div className="guideline-item">
              <span className="guideline-icon"></span>
              <h3>Abstract Format</h3>
              <p>Abstracts must not exceed 300 words and should clearly state the research objectives, methodology, and key findings.</p>
            </div>
            <div className="guideline-item">
              <span className="guideline-icon">✓</span>
              <h3>Peer Review</h3>
              <p>All submissions will undergo double-blind peer review by our international scientific committee.</p>
            </div>
            <div className="guideline-item">
              <span className="guideline-icon"></span>
              <h3>Publication</h3>
              <p>Selected papers may be published in the conference proceedings with ISBN and submitted to major databases.</p>
            </div>
            <div className="guideline-item">
              <span className="guideline-icon"></span>
              <h3>Notification</h3>
              <p>Notifications of acceptance will be sent via email within 3-4 weeks after the submission deadline.</p>
            </div>
          </div>

          <div className="important-dates">
            <h3>Important Dates</h3>
            <div className="dates-list">
              <div className="date-item">
                <span className="date-label">Abstract Submission Deadline</span>
                <span className="date-value">March 15, 2026</span>
              </div>
              <div className="date-item">
                <span className="date-label">Notification of Acceptance</span>
                <span className="date-value">April 15, 2026</span>
              </div>
              <div className="date-item">
                <span className="date-label">Early Bird Registration</span>
                <span className="date-value">Until March 31, 2026</span>
              </div>
              <div className="date-item">
                <span className="date-label">Conference Dates</span>
                <span className="date-value">June 15-18, 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="support-section">
        <div className="container text-center">
          <h2>Need Help?</h2>
          <p>Contact our registration support team for assistance</p>
          <div className="support-links">
            <a href="mailto:registration@eaisc2026.org" className="support-link">
              <span className="support-icon"></span>
              registration@eaisc2026.org
            </a>
            <a href="tel:+254700123456" className="support-link">
              <span className="support-icon"></span>
              +254 700 123 456
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegistrationAbstractPage;