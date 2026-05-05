// pages/HowToSubmitAbstractPage.tsx
import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import "../styles/HowToSubmitAbstractPage.css";

import heroBackground from "../assets/_MG_0937.webp";

// ============================================================
// Must match the backend's validateAbstractData() exactly.
// Required: prefix, firstName, lastName, email, organization,
//           country, title, theme, presentationFormat,
//           keywords, abstractText (50–500 words)
// Optional: phone, coAuthors, isStudent
// NOT sent to backend: agreeToTerms, studentIdFile
// ============================================================

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
  abstractText: string;   // ← replaces file upload; validated 50–500 words server-side
  keywords: string;
  coAuthors: string;
  agreeToTerms: boolean;  // client-side only — not sent to backend
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

const API_BASE = "https://api.eaindigenousseedconference.org";

// ── word-count helper ────────────────────────────────────────
const countWords = (text: string): number =>
  text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

const HowToSubmitAbstractPage = () => {
  const [isSubmitting, setIsSubmitting]   = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError]     = useState("");
  const [abstractId, setAbstractId]       = useState("");

  // Student ID file — stored client-side only (shown in UI, NOT sent to JSON endpoint)
  const [studentIdFile, setStudentIdFile] = useState<File | null>(null);
  const studentIdInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<AbstractFormData>({
    prefix: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    country: "",
    isStudent: false,
    title: "",
    theme: "",
    presentationFormat: "",
    abstractText: "",
    keywords: "",
    coAuthors: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // ── validation — mirrors backend validateAbstractData() ───
  const validateForm = (): boolean => {
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
    if (!formData.country)      newErrors.country = "Country is required";
    if (!formData.title || formData.title.trim().length === 0)
      newErrors.title = "Abstract title is required";
    if (formData.title.length > 200)
      newErrors.title = "Title must be 200 characters or fewer";
    if (!formData.theme)              newErrors.theme = "Please select a conference theme";
    if (!formData.presentationFormat) newErrors.presentationFormat = "Please select a presentation format";

    // ── abstractText — matches backend word-count validation ──
    const wordCount = countWords(formData.abstractText);
    if (!formData.abstractText.trim()) {
      newErrors.abstractText = "Abstract body is required";
    } else if (wordCount < 50) {
      newErrors.abstractText = `Abstract is too short (${wordCount} words). Minimum 50 words required.`;
    } else if (wordCount > 500) {
      newErrors.abstractText = `Abstract is too long (${wordCount} words). Maximum 500 words allowed.`;
    }

    // ── keywords — matches backend ────────────────────────────
    if (!formData.keywords) {
      newErrors.keywords = "Keywords are required";
    } else {
      const kw = formData.keywords.split(",").filter((k) => k.trim());
      if (kw.length < 3) newErrors.keywords = "Minimum 3 keywords required";
      else if (kw.length > 5) newErrors.keywords = "Maximum 5 keywords allowed";
    }

    // ── student ID — client-side check only ───────────────────
    if (formData.isStudent && !studentIdFile) {
      newErrors.studentId =
        "Please upload your student ID for verification. It will be reviewed separately.";
    }

    if (!formData.agreeToTerms)
      newErrors.agreeToTerms = "You must confirm before submitting";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── generic change handler ────────────────────────────────
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // ── student ID file handler (client-side only) ────────────
  const handleStudentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
    if (!allowed.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        studentId: "Please upload a PDF or image (JPG, PNG)",
      }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        studentId: "File must be smaller than 5 MB",
      }));
      return;
    }

    setStudentIdFile(file);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.studentId;
      return next;
    });
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

  // ── submit ────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstError = document.querySelector(".input-error");
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Build the payload that matches the backend exactly.
      // agreeToTerms and studentIdFile are client-side only — omit them.
      const payload = {
        prefix:             formData.prefix,
        firstName:          formData.firstName.trim(),
        lastName:           formData.lastName.trim(),
        email:              formData.email.trim(),
        phone:              formData.phone.trim(),
        organization:       formData.organization.trim(),
        country:            formData.country.trim(),
        isStudent:          formData.isStudent,
        title:              formData.title.trim(),
        theme:              formData.theme,
        presentationFormat: formData.presentationFormat,
        abstractText:       formData.abstractText.trim(),
        keywords:           formData.keywords.trim(),
        coAuthors:          formData.coAuthors.trim(),
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

      // Reset
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
      setSubmitError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── word count for live feedback ──────────────────────────
  const wordCount = countWords(formData.abstractText);
  const wordCountClass =
    wordCount === 0
      ? "word-count-neutral"
      : wordCount < 50
      ? "word-count-low"
      : wordCount > 500
      ? "word-count-high"
      : "word-count-ok";

  // ── SEO structured data ───────────────────────────────────
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Submit an Abstract for the 1st Eastern Africa Indigenous Seed Conference 2026",
    description:
      "Step-by-step guide for submitting abstracts, papers, and presentations to the EA-ISC 2026 conference.",
    totalTime: "PT20M",
  };

  return (
    <>
      <Helmet>
        <title>How to Submit an Abstract | EA-ISC 2026</title>
        <meta
          name="description"
          content="Step-by-step guide for submitting your abstract, paper, or presentation to the 1st Eastern Africa Indigenous Seed Conference 2026."
        />
        <meta
          name="keywords"
          content="submit abstract, conference submission, seed conference abstract, EA-ISC 2026 submission, call for papers"
        />
        <link rel="canonical" href="https://eaindigenousseedsconference.org/how-to-submit-an-abstract" />
        <meta property="og:title" content="How to Submit an Abstract | EA-ISC 2026" />
        <meta property="og:description" content="Submit your abstract to the 1st East African Indigenous Seed Conference 2026." />
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
              <span className="current">How to Submit an Abstract</span>
            </nav>
            <div className="hero-content">
              <h1>How to Submit an Abstract</h1>
              <p className="hero-description">
                A comprehensive guide to submitting your abstract, paper, or presentation
                for the 1st Eastern Africa Indigenous Seed Conference 2026.
              </p>
              <div className="hero-meta">
                <span className="deadline-badge">
                  Abstract Deadline: <strong>October 31, 2026</strong>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Submission Form ── */}
        <section className="content-section" id="submit-form">
          <div className="container narrow">
            <h2>Submit Your Abstract</h2>
            <p className="lead-text">
              Complete the form below. You will receive a confirmation email immediately
              upon submission with your reference number.
            </p>

            {submitSuccess ? (
              <div className="submission-success">
                <div className="success-icon">✓</div>
                <h3>Abstract Submitted Successfully!</h3>
                <p>
                  Thank you for your submission. A confirmation email has been sent to
                  your email address with a full summary of your abstract.
                </p>
                {abstractId && (
                  <div className="abstract-reference">
                    <p>Your Reference Number</p>
                    <strong>{abstractId}</strong>
                    <p className="ref-note">
                      Please quote this reference in any correspondence with the abstracts team
                    </p>
                  </div>
                )}
                <div className="success-next-steps">
                  <h4>What happens next?</h4>
                  <ul>
                    <li>Check your inbox — the confirmation email is on its way</li>
                    <li>Check your spam folder if it doesn't arrive within 5 minutes</li>
                    <li>The scientific committee will review your abstract</li>
                    <li>Notification of acceptance: November 15, 2026</li>
                  </ul>
                </div>
                <button
                  onClick={() => { setSubmitSuccess(false); setAbstractId(""); }}
                  className="btn btn-primary"
                  style={{ marginTop: "20px" }}
                >
                  Submit Another Abstract
                </button>
              </div>
            ) : (
              <>
                {submitError && (
                  <div className="form-error-banner">
                    <span>⚠</span> {submitError}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="abstract-form" noValidate>

                  {/* ── Section 1: Presenter Information ── */}
                  <div className="form-section">
                    <h3>Presenter Information</h3>

                    <div className="form-row three-col">
                      <div className="form-group">
                        <label htmlFor="prefix">Prefix *</label>
                        <select
                          id="prefix" name="prefix"
                          value={formData.prefix} onChange={handleInputChange}
                          className={errors.prefix ? "input-error" : ""}
                        >
                          <option value="">Select</option>
                          <option value="Dr.">Dr.</option>
                          <option value="Prof.">Prof.</option>
                          <option value="Mr.">Mr.</option>
                          <option value="Mrs.">Mrs.</option>
                          <option value="Ms.">Ms.</option>
                        </select>
                        {errors.prefix && <span className="error-message">{errors.prefix}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="firstName">First Name *</label>
                        <input
                          type="text" id="firstName" name="firstName"
                          value={formData.firstName} onChange={handleInputChange}
                          className={errors.firstName ? "input-error" : ""}
                          placeholder="First name"
                          autoComplete="given-name"
                        />
                        {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="lastName">Last Name *</label>
                        <input
                          type="text" id="lastName" name="lastName"
                          value={formData.lastName} onChange={handleInputChange}
                          className={errors.lastName ? "input-error" : ""}
                          placeholder="Last name"
                          autoComplete="family-name"
                        />
                        {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="email">Email Address *</label>
                        <input
                          type="email" id="email" name="email"
                          value={formData.email} onChange={handleInputChange}
                          className={errors.email ? "input-error" : ""}
                          placeholder="your.email@example.com"
                          autoComplete="email"
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="phone">Phone Number <span className="optional-label">(optional)</span></label>
                        <input
                          type="tel" id="phone" name="phone"
                          value={formData.phone} onChange={handleInputChange}
                          placeholder="+254 700 000 000"
                          autoComplete="tel"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="organization">Organization / Institution *</label>
                        <input
                          type="text" id="organization" name="organization"
                          value={formData.organization} onChange={handleInputChange}
                          className={errors.organization ? "input-error" : ""}
                          placeholder="Your organization name"
                        />
                        {errors.organization && <span className="error-message">{errors.organization}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="country">Country *</label>
                        <input
                          type="text" id="country" name="country"
                          value={formData.country} onChange={handleInputChange}
                          className={errors.country ? "input-error" : ""}
                          placeholder="Your country"
                        />
                        {errors.country && <span className="error-message">{errors.country}</span>}
                      </div>
                    </div>

                    {/* Student checkbox */}
                    <div className="form-group checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox" name="isStudent"
                          checked={formData.isStudent} onChange={handleInputChange}
                        />
                        <span>I am a student presenter</span>
                      </label>
                    </div>

                    {/* Student ID — stored client-side only for in-person verification */}
                    {formData.isStudent && (
                      <div className="form-group">
                        <label htmlFor="studentId">
                          Upload Student ID *
                          <span className="optional-label"> — for in-person verification at registration</span>
                        </label>
                        <div className="student-id-notice">
                          📌 Your student ID is stored on your device and will be presented at
                          conference registration. It is not transmitted online.
                        </div>
                        <div className="file-upload-area">
                          <input
                            type="file" id="studentId" name="studentId"
                            ref={studentIdInputRef}
                            onChange={handleStudentIdChange}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="file-input"
                          />
                          {!studentIdFile ? (
                            <div className="file-upload-placeholder">
                              <div className="file-upload-icon">🪪</div>
                              <p>Click to select your Student ID</p>
                              <span className="form-hint">PDF, JPG, PNG — max 5 MB</span>
                            </div>
                          ) : (
                            <div className="file-uploaded">
                              <div className="file-info">
                                <span className="file-icon">📎</span>
                                <div className="file-details">
                                  <span className="file-name">{studentIdFile.name}</span>
                                  <span className="file-size">{formatFileSize(studentIdFile.size)}</span>
                                </div>
                              </div>
                              <button
                                type="button" className="file-remove-btn"
                                onClick={removeStudentId} aria-label="Remove student ID"
                              >✕</button>
                            </div>
                          )}
                        </div>
                        {errors.studentId && <span className="error-message">{errors.studentId}</span>}
                      </div>
                    )}
                  </div>

                  {/* ── Section 2: Abstract Details ── */}
                  <div className="form-section">
                    <h3>Abstract Details</h3>

                    <div className="form-group">
                      <label htmlFor="title">Abstract Title *</label>
                      <input
                        type="text" id="title" name="title"
                        value={formData.title} onChange={handleInputChange}
                        className={errors.title ? "input-error" : ""}
                        placeholder="Enter your abstract title (maximum 200 characters)"
                        maxLength={200}
                      />
                      <span className={`char-count ${formData.title.length > 180 ? "char-count-warn" : ""}`}>
                        {formData.title.length}/200 characters
                      </span>
                      {errors.title && <span className="error-message">{errors.title}</span>}
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="theme">Conference Theme *</label>
                        <select
                          id="theme" name="theme"
                          value={formData.theme} onChange={handleInputChange}
                          className={errors.theme ? "input-error" : ""}
                        >
                          <option value="">Select a theme</option>
                          {themes.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                        {errors.theme && <span className="error-message">{errors.theme}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="presentationFormat">Preferred Format *</label>
                        <select
                          id="presentationFormat" name="presentationFormat"
                          value={formData.presentationFormat} onChange={handleInputChange}
                          className={errors.presentationFormat ? "input-error" : ""}
                        >
                          <option value="">Select format</option>
                          {presentationFormats.map((f) => (
                            <option key={f} value={f}>{f}</option>
                          ))}
                        </select>
                        {errors.presentationFormat && (
                          <span className="error-message">{errors.presentationFormat}</span>
                        )}
                      </div>
                    </div>

                    {/* ── Abstract Text — the core field sent to backend ── */}
                    <div className="form-group">
                      <label htmlFor="abstractText">Abstract Body *</label>
                      <textarea
                        id="abstractText" name="abstractText"
                        value={formData.abstractText} onChange={handleInputChange}
                        className={errors.abstractText ? "input-error abstract-textarea" : "abstract-textarea"}
                        placeholder="Paste or type your abstract here (50–500 words). Include background, objectives, methods, results, and conclusions."
                        rows={12}
                        spellCheck
                      />
                      <div className="abstract-counter-row">
                        <span className={`word-count ${wordCountClass}`}>
                          {wordCount} / 500 words
                          {wordCount >= 50 && wordCount <= 500 && (
                            <span className="word-count-ok-tick"> ✓</span>
                          )}
                        </span>
                        <span className="form-hint">Minimum 50 words · Maximum 500 words</span>
                      </div>
                      {errors.abstractText && (
                        <span className="error-message">{errors.abstractText}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="keywords">Keywords *</label>
                      <input
                        type="text" id="keywords" name="keywords"
                        value={formData.keywords} onChange={handleInputChange}
                        className={errors.keywords ? "input-error" : ""}
                        placeholder="e.g. seed sovereignty, climate resilience, indigenous knowledge"
                      />
                      <span className="form-hint">
                        3 to 5 keywords, separated by commas
                        {formData.keywords && (
                          <span className={
                            formData.keywords.split(",").filter((k) => k.trim()).length >= 3 &&
                            formData.keywords.split(",").filter((k) => k.trim()).length <= 5
                              ? " kw-ok"
                              : " kw-warn"
                          }>
                            {" "}({formData.keywords.split(",").filter((k) => k.trim()).length} entered)
                          </span>
                        )}
                      </span>
                      {errors.keywords && <span className="error-message">{errors.keywords}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="coAuthors">
                        Co-Authors <span className="optional-label">(optional)</span>
                      </label>
                      <input
                        type="text" id="coAuthors" name="coAuthors"
                        value={formData.coAuthors} onChange={handleInputChange}
                        placeholder="Jane Doe (Univ. of Nairobi), John Smith (KALRO)"
                      />
                      <span className="form-hint">
                        List co-authors with their affiliations, separated by commas
                      </span>
                    </div>
                  </div>

                  {/* ── Section 3: Declaration & Submit ── */}
                  <div className="form-section">
                    <div className="form-group checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox" name="agreeToTerms"
                          checked={formData.agreeToTerms} onChange={handleInputChange}
                        />
                        <span>
                          I confirm that the information provided is accurate and that this
                          abstract has not been submitted to another conference. I understand
                          that the scientific committee's decision is final and I will be
                          notified by email. *
                        </span>
                      </label>
                      {errors.agreeToTerms && (
                        <span className="error-message">{errors.agreeToTerms}</span>
                      )}
                    </div>

                    <div className="form-submit">
                      <button
                        type="submit"
                        className="btn btn-primary btn-large"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="btn-loading">
                            <span className="btn-spinner" />
                            Submitting…
                          </span>
                        ) : (
                          "Submit Abstract"
                        )}
                      </button>
                      <p className="submit-notice">
                        You will receive an immediate confirmation email. If it doesn't
                        arrive within 5 minutes, please check your spam folder.
                      </p>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        </section>

        {/* ── Requirements ── */}
        <section className="content-section bg-light">
          <div className="container">
            <h2 className="text-center">Abstract Requirements</h2>
            <div className="requirements-grid">
              <div className="requirement-card">
                <h3>Structure</h3>
                <ul>
                  <li>Title (maximum 200 characters)</li>
                  <li>Background and objectives</li>
                  <li>Methods</li>
                  <li>Results and findings</li>
                  <li>Conclusions and recommendations</li>
                  <li>Keywords (3–5)</li>
                </ul>
              </div>
              <div className="requirement-card">
                <h3>Word Count</h3>
                <ul>
                  <li>Minimum: 50 words</li>
                  <li>Maximum: 500 words</li>
                  <li>Recommended: 300–400 words</li>
                  <li>Title: separate field (max 200 characters)</li>
                  <li>Co-authors listed separately</li>
                </ul>
              </div>
              <div className="requirement-card">
                <h3>Selection Criteria</h3>
                <ul>
                  <li>Relevance to conference themes</li>
                  <li>Originality and significance</li>
                  <li>Methodological rigor</li>
                  <li>Clarity of presentation</li>
                  <li>Contribution to seed sovereignty</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Themes ── */}
        <section className="content-section">
          <div className="container">
            <h2 className="text-center">Conference Themes</h2>
            <p className="section-subtitle text-center">
              Select the theme that best aligns with your submission:
            </p>
            <div className="themes-reference">
              {[
                { n: "01", title: "Farmer-Managed Seed Systems in Practice",
                  desc: "Indigenous practices, community seed banking, participatory research, and livestock conservation" },
                { n: "02", title: "Seeds, Climate Change and Resilience",
                  desc: "Climate adaptation, emergency seed response, and resilient livelihoods" },
                { n: "03", title: "Gender Equity and Social Inclusion",
                  desc: "Women and youth leadership, intergenerational knowledge, and seed literacy" },
                { n: "04", title: "Market Innovations",
                  desc: "Seed enterprises, local markets, indigenous foods, and value addition" },
                { n: "05", title: "Data Sovereignty and Trends",
                  desc: "Digital rights, traditional knowledge protection, and biopiracy prevention" },
                { n: "06", title: "Policy Solutions for Seed Sovereignty",
                  desc: "Farmers' rights, policy frameworks, and regional advocacy" },
              ].map(({ n, title, desc }) => (
                <div className="theme-ref-item" key={n}>
                  <span className="theme-ref-number">{n}</span>
                  <div className="theme-ref-content">
                    <h4>{title}</h4>
                    <p>{desc}</p>
                  </div>
                </div>
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
                  ["Abstract Submission Deadline:", "October 31, 2026"],
                  ["Notification of Acceptance:", "November 15, 2026"],
                  ["Early Registration Deadline:", "October 31, 2026"],
                  ["Conference Dates:", "November 17–20, 2026"],
                ].map(([label, value]) => (
                  <div className="date-item" key={label}>
                    <span className="date-label">{label}</span>
                    <span className="date-value">{value}</span>
                  </div>
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
            <p className="cta-text">
              If you have questions about the submission process or technical support,
              please contact our abstracts team.
            </p>
            <div className="cta-buttons">
              <a href="mailto:abstracts@eaindigenousseedconference.org" className="btn btn-primary">
                Email the Abstracts Team
              </a>
              <a href="#submit-form" className="btn btn-secondary">
                Back to Form
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HowToSubmitAbstractPage;