// pages/HowToSubmitAbstractPage.tsx
import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import "../styles/HowToSubmitAbstractPage.css";

import heroBackground from "../assets/_MG_0937.webp";

// Must match the backend's validateAbstractData() exactly.
// Required: prefix, firstName, lastName, email, organization,
//           country, title, theme, presentationFormat,
//           keywords, abstractText (50–500 words)
// Optional: phone, coAuthors, isStudent

interface AbstractFormData {
  prefix: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  country: string;
  isStudent: boolean;
  title: string;
  theme: string;
  presentationFormat: string;
  abstractText: string;
  keywords: string;
  coAuthors: string;
  agreeToTerms: boolean;
}

interface FarmerFormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  farmingExperience: string;
  seedTypes: string;
  presentationFormat: string;      // NEW
  videoLink: string;                // NEW — only shown when presentationFormat === "Video"
  topic: string;
  description: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const themes = [
  "Farmer-Managed Seed Systems in Practice",
  "Seeds, Climate Change and Resilience",
  "Gender Equity and Social Inclusion",
  "Market Innovations",
  "Data Sovereignty and Trends",
  "Policy Solutions for Seed Sovereignty",
];

const presentationFormats = [
  "Oral Presentation",
  "Poster Presentation",
  "Panel Session",
  "Creative Arts/Exhibition",
];

// New — farmer presentation formats
const farmerPresentationFormats = [
  "Oral Storytelling / Talk",
  "Photo Posters",
  "Drama / Skit",
  "Exhibition / Demo Table",
  "Songs / Poetry",
  "Video",
];

const API_BASE = "https://api.eaindigenousseedconference.org";

const countWords = (text: string): number =>
  text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

const HowToSubmitAbstractPage = () => {
  // Which form to show
  const [formType, setFormType] = useState<"none" | "academia" | "farmer">("none");

  // ── Academia form states ──
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [abstractId, setAbstractId] = useState("");
  const [studentIdFile, setStudentIdFile] = useState<File | null>(null);
  const studentIdInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<AbstractFormData>({
    prefix: "", firstName: "", lastName: "", email: "", phone: "",
    organization: "", country: "", isStudent: false, title: "", theme: "",
    presentationFormat: "", abstractText: "", keywords: "", coAuthors: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // ── Farmer form states ──
  const [isFarmerSubmitting, setIsFarmerSubmitting] = useState(false);
  const [farmerSubmitSuccess, setFarmerSubmitSuccess] = useState(false);
  const [farmerSubmitError, setFarmerSubmitError] = useState("");
  const [farmerAbstractId, setFarmerAbstractId] = useState("");

  const [farmerFormData, setFarmerFormData] = useState<FarmerFormData>({
    fullName: "", email: "", phone: "", country: "",
    farmingExperience: "", seedTypes: "",
    presentationFormat: "",           // NEW
    videoLink: "",                    // NEW
    topic: "", description: "",
    agreeToTerms: false,
  });

  const [farmerErrors, setFarmerErrors] = useState<FormErrors>({});

  // ============================================================
  // ACADEMIA FORM — VALIDATION & HANDLERS
  // ============================================================
  const validateAcademiaForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.prefix) newErrors.prefix = "Prefix is required";
    if (!formData.firstName || formData.firstName.trim().length < 2)
      newErrors.firstName = "First name is required (minimum 2 characters)";
    if (!formData.lastName || formData.lastName.trim().length < 2)
      newErrors.lastName = "Last name is required (minimum 2 characters)";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.organization) newErrors.organization = "Organization is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.title || formData.title.trim().length === 0)
      newErrors.title = "Abstract title is required";
    if (formData.title.length > 200)
      newErrors.title = "Title must be 200 characters or fewer";
    if (!formData.theme) newErrors.theme = "Please select a conference theme";
    if (!formData.presentationFormat) newErrors.presentationFormat = "Please select a presentation format";

    const wordCount = countWords(formData.abstractText);
    if (!formData.abstractText.trim()) {
      newErrors.abstractText = "Abstract body is required";
    } else if (wordCount < 50) {
      newErrors.abstractText = `Abstract is too short (${wordCount} words). Minimum 50 words required.`;
    } else if (wordCount > 500) {
      newErrors.abstractText = `Abstract is too long (${wordCount} words). Maximum 500 words allowed.`;
    }

    if (!formData.keywords) {
      newErrors.keywords = "Keywords are required";
    } else {
      const kw = formData.keywords.split(",").filter((k) => k.trim());
      if (kw.length < 3) newErrors.keywords = "Minimum 3 keywords required";
      else if (kw.length > 5) newErrors.keywords = "Maximum 5 keywords allowed";
    }

    if (formData.isStudent && !studentIdFile) {
      newErrors.studentId = "Please upload your student ID for verification.";
    }

    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must confirm before submitting";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) {
      setErrors((prev) => { const next = { ...prev }; delete next[name]; return next; });
    }
  };

  const handleStudentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
    if (!allowed.includes(file.type)) {
      setErrors((prev) => ({ ...prev, studentId: "Please upload a PDF or image (JPG, PNG)" }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, studentId: "File must be smaller than 5 MB" }));
      return;
    }
    setStudentIdFile(file);
    setErrors((prev) => { const next = { ...prev }; delete next.studentId; return next; });
  };

  const removeStudentId = () => {
    setStudentIdFile(null);
    if (studentIdInputRef.current) studentIdInputRef.current.value = "";
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleAcademiaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAcademiaForm()) {
      const firstError = document.querySelector(".input-error");
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const payload = {
        prefix: formData.prefix,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        organization: formData.organization.trim(),
        country: formData.country.trim(),
        isStudent: formData.isStudent,
        title: formData.title.trim(),
        theme: formData.theme,
        presentationFormat: formData.presentationFormat,
        abstractText: formData.abstractText.trim(),
        keywords: formData.keywords.trim(),
        coAuthors: formData.coAuthors.trim(),
        formType: "academia",
      };

      const response = await fetch(`${API_BASE}/submit-abstract`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Submission failed. Please try again.");
      }

      const result = await response.json();
      setAbstractId(result.abstractId || "");
      setSubmitSuccess(true);
      setFormData({
        prefix: "", firstName: "", lastName: "", email: "", phone: "",
        organization: "", country: "", isStudent: false, title: "", theme: "",
        presentationFormat: "", abstractText: "", keywords: "", coAuthors: "",
        agreeToTerms: false,
      });
      setStudentIdFile(null);
      setErrors({});
      if (studentIdInputRef.current) studentIdInputRef.current.value = "";
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================================
  // FARMER FORM — VALIDATION & HANDLERS
  // ============================================================
  const validateFarmerForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!farmerFormData.fullName || farmerFormData.fullName.trim().length < 2)
      newErrors.fullName = "Full name is required";
    if (!farmerFormData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(farmerFormData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!farmerFormData.phone) newErrors.phone = "Phone number is required";
    if (!farmerFormData.country) newErrors.country = "Country is required";
    if (!farmerFormData.farmingExperience) newErrors.farmingExperience = "Please select your experience";
    if (!farmerFormData.seedTypes) newErrors.seedTypes = "Please describe your seed types";
    
    // NEW — presentation format validation
    if (!farmerFormData.presentationFormat) newErrors.presentationFormat = "Please select how you'd like to present";
    
    // NEW — video link validation (only if Video is selected)
    if (farmerFormData.presentationFormat === "Video") {
      if (!farmerFormData.videoLink) {
        newErrors.videoLink = "Please provide a link to your video";
      } else if (!/^https?:\/\/.+\..+/.test(farmerFormData.videoLink)) {
        newErrors.videoLink = "Please enter a valid URL (e.g., https://youtube.com/...)";
      }
    }
    
    if (!farmerFormData.topic || farmerFormData.topic.trim().length === 0)
      newErrors.topic = "Topic is required";
    if (farmerFormData.topic.length > 200)
      newErrors.topic = "Topic must be 200 characters or fewer";
    if (!farmerFormData.description || farmerFormData.description.trim().length < 100)
      newErrors.description = "Please provide a description (minimum 100 characters)";
    if (!farmerFormData.agreeToTerms) newErrors.agreeToTerms = "You must confirm before submitting";

    setFarmerErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFarmerInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setFarmerFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (farmerErrors[name]) {
      setFarmerErrors((prev) => { const next = { ...prev }; delete next[name]; return next; });
    }
  };

  const handleFarmerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFarmerForm()) {
      const firstError = document.querySelector(".input-error");
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsFarmerSubmitting(true);
    setFarmerSubmitError("");

    try {
      const payload = {
        ...farmerFormData,
        formType: "farmer",
      };

      const response = await fetch(`${API_BASE}/submit-abstract`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Submission failed. Please try again.");
      }

      const result = await response.json();
      setFarmerAbstractId(result.abstractId || "");
      setFarmerSubmitSuccess(true);
      setFarmerFormData({
        fullName: "", email: "", phone: "", country: "",
        farmingExperience: "", seedTypes: "",
        presentationFormat: "", videoLink: "",
        topic: "", description: "",
        agreeToTerms: false,
      });
      setFarmerErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setFarmerSubmitError(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setIsFarmerSubmitting(false);
    }
  };

  // Word count for academia form
  const wordCount = countWords(formData.abstractText);
  const wordCountClass =
    wordCount === 0 ? "word-count-neutral"
    : wordCount < 50 ? "word-count-low"
    : wordCount > 500 ? "word-count-high"
    : "word-count-ok";

  // SEO structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Submit an Abstract for the 1st Eastern Africa Indigenous Seed Conference 2026",
    description: "Step-by-step guide for submitting abstracts, papers, and presentations to the EA-ISC 2026 conference.",
    totalTime: "PT20M",
  };

  return (
    <>
      <Helmet>
        <title>Submit an Abstract | EA-ISC 2026</title>
        <meta name="description" content="Submit your abstract for the 1st Eastern Africa Indigenous Seed Conference 2026." />
        <link rel="canonical" href="https://eaindigenousseedsconference.org/how-to-submit-an-abstract" />
        <meta property="og:title" content="Submit an Abstract | EA-ISC 2026" />
        <meta property="og:description" content="Submit your abstract to EA-ISC 2026." />
        <meta property="og:url" content="https://eaindigenousseedsconference.org/how-to-submit-an-abstract" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="submit-abstract-page">
        {/* ── Hero ── */}
        <section className="submit-hero" style={{ backgroundImage: `url(${heroBackground})` }}>
          <div className="hero-overlay" />
          <div className="hero-container">
            <nav className="hero-breadcrumb" aria-label="Breadcrumb">
              <a href="/" className="breadcrumb-link">Home</a>
              <span aria-hidden="true">/</span>
              <span className="current">Submit an Abstract</span>
            </nav>
            <div className="hero-content">
              <h1>Submit Your Abstract</h1>
              <p className="hero-description">
                Choose your submission path below. We welcome contributions from academia, researchers, practitioners, and farmers.
              </p>
              <div className="hero-meta">
                <span className="deadline-badge">
                  Abstract Deadline: <strong>October 31, 2026</strong>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Selection Cards ── */}
        {formType === "none" && (
          <section className="content-section">
            <div className="container narrow">
              <h2 className="text-center">Select Your Submission Type</h2>
              <p className="section-subtitle text-center">
                Choose the option that best describes you to begin your submission.
              </p>

              <div className="selection-cards">
                <div
                  className="selection-card"
                  onClick={() => { setFormType("academia"); window.scrollTo({ top: 400, behavior: "smooth" }); }}
                >
                  <div className="selection-card-icon"></div>
                  <h3>Academia, Students, Practitioners & Researchers</h3>
                  <p>For researchers, academics, students, and practitioners submitting formal abstracts aligned with conference themes.</p>
                  <span className="selection-card-badge">Academia Submission</span>
                </div>

                <div
                  className="selection-card"
                  onClick={() => { setFormType("farmer"); window.scrollTo({ top: 400, behavior: "smooth" }); }}
                >
                  <div className="selection-card-icon"></div>
                  <h3>Farmers & Seed Custodians</h3>
                  <p>For farmers and seed keepers sharing practical experiences, traditional knowledge, and on-the-ground insights.</p>
                  <span className="selection-card-badge farmer-badge">Farmers Submission</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* ACADEMIA FORM — unchanged from your existing code */}
        {/* ============================================================ */}
        {formType === "academia" && (
          <section className="content-section" id="submit-form">
            <div className="container narrow">
              <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "10px" }}>
                <button onClick={() => setFormType("none")} className="btn-back" style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem", color: "var(--primary)" }}>← Back</button>
                <h2 style={{ margin: 0 }}>Academia, Students, Practitioners & Researchers</h2>
              </div>
              <p className="lead-text">Complete the form below. You will receive a confirmation email immediately upon submission with your reference number.</p>

              {submitSuccess ? (
                <div className="submission-success">
                  <div className="success-icon">✓</div>
                  <h3>Abstract Submitted Successfully!</h3>
                  <p>A confirmation email has been sent to your email address.</p>
                  {abstractId && (
                    <div className="abstract-reference">
                      <p>Your Reference Number</p>
                      <strong>{abstractId}</strong>
                      <p className="ref-note">Please quote this reference in any correspondence</p>
                    </div>
                  )}
                  <div className="success-next-steps">
                    <h4>What happens next?</h4>
                    <ul>
                      <li>Check your inbox — the confirmation email is on its way</li>
                      <li>Check your spam folder if it doesn't arrive within 5 minutes</li>
                      <li>The scientific committee will review your abstract</li>
                      <li>Notification of acceptance: September 30th, 2026</li>
                    </ul>
                  </div>
                  <button onClick={() => { setSubmitSuccess(false); setAbstractId(""); setFormType("none"); }} className="btn btn-primary" style={{ marginTop: "20px" }}>Submit Another Abstract</button>
                </div>
              ) : (
                <>
                  {submitError && <div className="form-error-banner"><span>⚠</span> {submitError}</div>}
                  <form onSubmit={handleAcademiaSubmit} className="abstract-form" noValidate>
                    {/* Presenter Information */}
                    <div className="form-section">
                      <h3>Presenter Information</h3>
                      <div className="form-row three-col">
                        <div className="form-group">
                          <label htmlFor="prefix">Prefix *</label>
                          <select id="prefix" name="prefix" value={formData.prefix} onChange={handleInputChange} className={errors.prefix ? "input-error" : ""}>
                            <option value="">Select</option>
                            <option value="Dr.">Dr.</option>
                            <option value="Prof.">Prof.</option>
                            <option value="Mr.">Mr.</option>
                            <option value="Mrs.">Mrs.</option>
                            <option value="Ms.">Ms.</option>
                          </select>
                          {errors.prefix && <span className="error-message">{errors.prefix}</span>}
                        </div>
                        <div className="form-group"><label htmlFor="firstName">First Name *</label><input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} className={errors.firstName ? "input-error" : ""} placeholder="First name" />{errors.firstName && <span className="error-message">{errors.firstName}</span>}</div>
                        <div className="form-group"><label htmlFor="lastName">Last Name *</label><input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} className={errors.lastName ? "input-error" : ""} placeholder="Last name" />{errors.lastName && <span className="error-message">{errors.lastName}</span>}</div>
                      </div>
                      <div className="form-row">
                        <div className="form-group"><label htmlFor="email">Email Address *</label><input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className={errors.email ? "input-error" : ""} placeholder="your.email@example.com" />{errors.email && <span className="error-message">{errors.email}</span>}</div>
                        <div className="form-group"><label htmlFor="phone">Phone Number <span className="optional-label">(optional)</span></label><input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+254 700 000 000" /></div>
                      </div>
                      <div className="form-row">
                        <div className="form-group"><label htmlFor="organization">Organization / Institution *</label><input type="text" id="organization" name="organization" value={formData.organization} onChange={handleInputChange} className={errors.organization ? "input-error" : ""} placeholder="Your organization name" />{errors.organization && <span className="error-message">{errors.organization}</span>}</div>
                        <div className="form-group"><label htmlFor="country">Country *</label><input type="text" id="country" name="country" value={formData.country} onChange={handleInputChange} className={errors.country ? "input-error" : ""} placeholder="Your country" />{errors.country && <span className="error-message">{errors.country}</span>}</div>
                      </div>
                      {formData.isStudent && (
                        <div className="form-group">
                          <label htmlFor="studentId">Upload Student ID *</label>
                          <div className="file-upload-area">
                            <input type="file" id="studentId" name="studentId" ref={studentIdInputRef} onChange={handleStudentIdChange} accept=".pdf,.jpg,.jpeg,.png" className="file-input" />
                            {!studentIdFile ? (
                              <div className="file-upload-placeholder"><div className="file-upload-icon">🪪</div><p>Click to select your Student ID</p><span className="form-hint">PDF, JPG, PNG — max 5 MB</span></div>
                            ) : (
                              <div className="file-uploaded"><div className="file-info"><span className="file-icon">📎</span><div className="file-details"><span className="file-name">{studentIdFile.name}</span><span className="file-size">{formatFileSize(studentIdFile.size)}</span></div></div><button type="button" className="file-remove-btn" onClick={removeStudentId}>✕</button></div>
                            )}
                          </div>
                          {errors.studentId && <span className="error-message">{errors.studentId}</span>}
                        </div>
                      )}
                    </div>
                    {/* Abstract Details */}
                    <div className="form-section">
                      <h3>Abstract Details</h3>
                      <div className="form-group"><label htmlFor="title">Abstract Title *</label><input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} className={errors.title ? "input-error" : ""} placeholder="Enter your abstract title (maximum 200 characters)" maxLength={200} /><span className="char-count">{formData.title.length}/200 characters</span>{errors.title && <span className="error-message">{errors.title}</span>}</div>
                      <div className="form-row">
                        <div className="form-group"><label htmlFor="theme">Conference Theme *</label><select id="theme" name="theme" value={formData.theme} onChange={handleInputChange} className={errors.theme ? "input-error" : ""}><option value="">Select a theme</option>{themes.map((t) => <option key={t} value={t}>{t}</option>)}</select>{errors.theme && <span className="error-message">{errors.theme}</span>}</div>
                        <div className="form-group"><label htmlFor="presentationFormat">Preferred Format *</label><select id="presentationFormat" name="presentationFormat" value={formData.presentationFormat} onChange={handleInputChange} className={errors.presentationFormat ? "input-error" : ""}><option value="">Select format</option>{presentationFormats.map((f) => <option key={f} value={f}>{f}</option>)}</select>{errors.presentationFormat && <span className="error-message">{errors.presentationFormat}</span>}</div>
                      </div>
                      <div className="form-group"><label htmlFor="abstractText">Abstract Body *</label><textarea id="abstractText" name="abstractText" value={formData.abstractText} onChange={handleInputChange} className={errors.abstractText ? "input-error abstract-textarea" : "abstract-textarea"} placeholder="Paste or type your abstract here (50–500 words)" rows={12} /><div className="abstract-counter-row"><span className={`word-count ${wordCountClass}`}>{wordCount} / 500 words</span><span className="form-hint">Minimum 50 words · Maximum 500 words</span></div>{errors.abstractText && <span className="error-message">{errors.abstractText}</span>}</div>
                      <div className="form-group"><label htmlFor="keywords">Keywords *</label><input type="text" id="keywords" name="keywords" value={formData.keywords} onChange={handleInputChange} className={errors.keywords ? "input-error" : ""} placeholder="e.g. seed sovereignty, climate resilience, indigenous knowledge" /><span className="form-hint">3 to 5 keywords, separated by commas</span>{errors.keywords && <span className="error-message">{errors.keywords}</span>}</div>
                      <div className="form-group"><label htmlFor="coAuthors">Co-Authors <span className="optional-label">(optional)</span></label><input type="text" id="coAuthors" name="coAuthors" value={formData.coAuthors} onChange={handleInputChange} placeholder="Jane Doe (Univ. of Nairobi), John Smith (KALRO)" /></div>
                    </div>
                    {/* Declaration */}
                    <div className="form-section">
                      <div className="form-group checkbox-group"><label className="checkbox-label"><input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleInputChange} /><span>I confirm that the information provided is accurate. *</span></label>{errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}</div>
                      <div className="form-submit"><button type="submit" className="btn btn-primary btn-large" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit Abstract"}</button><p className="submit-notice">You will receive an immediate confirmation email.</p></div>
                    </div>
                  </form>
                </>
              )}
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* FARMER FORM — UPDATED WITH PRESENTATION FORMAT + VIDEO LINK */}
        {/* ============================================================ */}
        {formType === "farmer" && (
          <section className="content-section" id="farmer-form">
            <div className="container narrow">
              <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "10px" }}>
                <button onClick={() => setFormType("none")} className="btn-back" style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem", color: "var(--primary)" }}>← Back</button>
                <h2 style={{ margin: 0 }}>Farmers & Seed Custodians</h2>
              </div>
              <p className="lead-text">Share your practical experience with seeds and farming. This form is simple and accessible.</p>

              {farmerSubmitSuccess ? (
                <div className="submission-success">
                  <div className="success-icon">✓</div>
                  <h3>Submission Received!</h3>
                  <p>A confirmation email has been sent to your email address.</p>
                  {farmerAbstractId && (
                    <div className="abstract-reference"><p>Your Reference Number</p><strong>{farmerAbstractId}</strong><p className="ref-note">Please quote this reference in any correspondence</p></div>
                  )}
                  <button onClick={() => { setFarmerSubmitSuccess(false); setFarmerAbstractId(""); setFormType("none"); }} className="btn btn-primary" style={{ marginTop: "20px" }}>Submit Another</button>
                </div>
              ) : (
                <>
                  {farmerSubmitError && <div className="form-error-banner"><span>⚠</span> {farmerSubmitError}</div>}
                  <form onSubmit={handleFarmerSubmit} className="abstract-form">
                    {/* Your Information */}
                    <div className="form-section">
                      <h3>Your Information</h3>
                      <div className="form-group"><label htmlFor="fullName">Full Name *</label><input type="text" id="fullName" name="fullName" value={farmerFormData.fullName} onChange={handleFarmerInputChange} className={farmerErrors.fullName ? "input-error" : ""} placeholder="Enter your full name" />{farmerErrors.fullName && <span className="error-message">{farmerErrors.fullName}</span>}</div>
                      <div className="form-row">
                        <div className="form-group"><label htmlFor="farmerEmail">Email Address *</label><input type="email" id="farmerEmail" name="email" value={farmerFormData.email} onChange={handleFarmerInputChange} className={farmerErrors.email ? "input-error" : ""} placeholder="your.email@example.com" />{farmerErrors.email && <span className="error-message">{farmerErrors.email}</span>}</div>
                        <div className="form-group"><label htmlFor="farmerPhone">Phone Number *</label><input type="tel" id="farmerPhone" name="phone" value={farmerFormData.phone} onChange={handleFarmerInputChange} className={farmerErrors.phone ? "input-error" : ""} placeholder="+254 123 456 789" />{farmerErrors.phone && <span className="error-message">{farmerErrors.phone}</span>}</div>
                      </div>
                      <div className="form-group"><label htmlFor="farmerCountry">Country *</label><input type="text" id="farmerCountry" name="country" value={farmerFormData.country} onChange={handleFarmerInputChange} className={farmerErrors.country ? "input-error" : ""} placeholder="Your country" />{farmerErrors.country && <span className="error-message">{farmerErrors.country}</span>}</div>
                      <div className="form-group"><label htmlFor="farmingExperience">Years of Farming Experience *</label><select id="farmingExperience" name="farmingExperience" value={farmerFormData.farmingExperience} onChange={handleFarmerInputChange} className={farmerErrors.farmingExperience ? "input-error" : ""}><option value="">Select experience</option><option value="1-5">1-5 years</option><option value="6-10">6-10 years</option><option value="11-20">11-20 years</option><option value="20+">20+ years</option></select>{farmerErrors.farmingExperience && <span className="error-message">{farmerErrors.farmingExperience}</span>}</div>
                      <div className="form-group"><label htmlFor="seedTypes">What types of seeds do you work with? *</label><textarea id="seedTypes" name="seedTypes" value={farmerFormData.seedTypes} onChange={handleFarmerInputChange} className={farmerErrors.seedTypes ? "input-error" : ""} rows={2} placeholder="e.g., maize, sorghum, millet, indigenous vegetables" />{farmerErrors.seedTypes && <span className="error-message">{farmerErrors.seedTypes}</span>}</div>
                    </div>

                    {/* Your Story */}
                    <div className="form-section">
                      <h3>Your Story</h3>
                      <div className="form-group"><label htmlFor="topic">What would you like to share? *</label><input type="text" id="topic" name="topic" value={farmerFormData.topic} onChange={handleFarmerInputChange} className={farmerErrors.topic ? "input-error" : ""} placeholder="e.g., How I preserve indigenous seeds in my community" maxLength={200} /><span className="char-count">{farmerFormData.topic.length}/200 characters</span>{farmerErrors.topic && <span className="error-message">{farmerErrors.topic}</span>}</div>
                      
                      {/* ── NEW: Presentation Format Dropdown ── */}
                      <div className="form-group">
                        <label htmlFor="farmerPresentationFormat">How would you like to present? *</label>
                        <select id="farmerPresentationFormat" name="presentationFormat" value={farmerFormData.presentationFormat} onChange={handleFarmerInputChange} className={farmerErrors.presentationFormat ? "input-error" : ""}>
                          <option value="">Select a format</option>
                          {farmerPresentationFormats.map((f) => <option key={f} value={f}>{f}</option>)}
                        </select>
                        {farmerErrors.presentationFormat && <span className="error-message">{farmerErrors.presentationFormat}</span>}
                      </div>

                      {/* ── NEW: Video Link — only shows when "Video" is selected ── */}
                      {farmerFormData.presentationFormat === "Video" && (
                        <div className="form-group video-link-group">
                          <label htmlFor="videoLink">Video Link *</label>
                          <input type="url" id="videoLink" name="videoLink" value={farmerFormData.videoLink} onChange={handleFarmerInputChange} className={farmerErrors.videoLink ? "input-error" : ""} placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..." />
                          <span className="form-hint">Provide a link to your video (YouTube, Vimeo, Google Drive, etc.)</span>
                          {farmerErrors.videoLink && <span className="error-message">{farmerErrors.videoLink}</span>}
                        </div>
                      )}

                      <div className="form-group"><label htmlFor="description">Tell us your story / experience / Innovation *</label><textarea id="description" name="description" value={farmerFormData.description} onChange={handleFarmerInputChange} className={farmerErrors.description ? "input-error" : ""} rows={8} placeholder="Share your experience with seeds and farming. What practices do you use? What challenges do you face? What knowledge would you like to share with others?" /><span className="char-count">{farmerFormData.description.length} characters (minimum 100)</span>{farmerErrors.description && <span className="error-message">{farmerErrors.description}</span>}</div>
                    </div>

                    {/* Declaration */}
                    <div className="form-section">
                      <div className="form-group checkbox-group"><label className="checkbox-label"><input type="checkbox" name="agreeToTerms" checked={farmerFormData.agreeToTerms} onChange={handleFarmerInputChange} /><span>I confirm that the information provided is accurate. *</span></label>{farmerErrors.agreeToTerms && <span className="error-message">{farmerErrors.agreeToTerms}</span>}</div>
                      <div className="form-submit"><button type="submit" className="btn btn-primary btn-large farmer-btn" disabled={isFarmerSubmitting}>{isFarmerSubmitting ? "Submitting..." : "Share My Experience"}</button><p className="submit-notice">You will receive an immediate confirmation email.</p></div>
                    </div>
                  </form>
                </>
              )}
            </div>
          </section>
        )}

        {/* ── Requirements ── */}
        <section className="content-section bg-light">
          <div className="container">
            <h2 className="text-center">Abstract Requirements</h2>
            <div className="requirements-grid">
              <div className="requirement-card"><h3>Structure</h3><ul><li>Title (maximum 200 characters)</li><li>Background and objectives</li><li>Methods</li><li>Results and findings</li><li>Conclusions and recommendations</li><li>Keywords (3–5)</li></ul></div>
              <div className="requirement-card"><h3>Word Count</h3><ul><li>Minimum: 50 words</li><li>Maximum: 500 words</li><li>Recommended: 300–400 words</li><li>Title: separate field (max 200 characters)</li><li>Co-authors listed separately</li></ul></div>
              <div className="requirement-card"><h3>Selection Criteria</h3><ul><li>Relevance to conference themes</li><li>Originality and significance</li><li>Methodological rigor</li><li>Clarity of presentation</li><li>Contribution to seed sovereignty</li></ul></div>
            </div>
          </div>
        </section>

        {/* ── Themes ── */}
        <section className="content-section">
          <div className="container">
            <h2 className="text-center">Conference Themes</h2>
            <p className="section-subtitle text-center">Select the theme that best aligns with your submission:</p>
            <div className="themes-reference">
              {[
                { n: "01", title: "Farmer-Managed Seed Systems in Practice", desc: "Indigenous practices, community seed banking, participatory research, and livestock conservation" },
                { n: "02", title: "Seeds, Climate Change and Resilience", desc: "Climate adaptation, emergency seed response, and resilient livelihoods" },
                { n: "03", title: "Gender Equity and Social Inclusion", desc: "Women and youth leadership, intergenerational knowledge, and seed literacy" },
                { n: "04", title: "Market Innovations", desc: "Seed enterprises, local markets, indigenous foods, and value addition" },
                { n: "05", title: "Data Sovereignty and Trends", desc: "Digital rights, traditional knowledge protection, and biopiracy prevention" },
                { n: "06", title: "Policy Solutions for Seed Sovereignty", desc: "Farmers' rights, policy frameworks, and regional advocacy" },
              ].map(({ n, title, desc }) => (
                <div className="theme-ref-item" key={n}><span className="theme-ref-number">{n}</span><div className="theme-ref-content"><h4>{title}</h4><p>{desc}</p></div></div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Dates ── */}
        <section className="content-section bg-light">
          <div className="container narrow">
            <div className="dates-box">
              <h2 className="text-center">Important Dates</h2>
              <div className="dates-list">
                {[
                  ["Abstract Submission Deadline:", "August 31st, 2026"],
                  ["Notification of Acceptance:", "September 30th, 2026"],
                  ["Early Registration Deadline:", "September 30th, 2026"],
                  ["Conference Dates:", "November 17–20, 2026"],
                ].map(([label, value]) => (
                  <div className="date-item" key={label}><span className="date-label">{label}</span><span className="date-value">{value}</span></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Help CTA ── */}
        <section className="cta-section">
          <div className="cta-pattern-overlay" />
          <div className="container">
            <h2>Need Assistance?</h2>
            <p className="cta-text">If you have questions about the submission process, please contact our abstracts team.</p>
            <div className="cta-buttons">
              <a href="mailto:abstracts@eaindigenousseedconference.org" className="btn btn-primary">Email the Abstracts Team</a>
              <a href="#submit-form" className="btn btn-secondary">Back to Form</a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HowToSubmitAbstractPage;