// components/RegistrationForm.tsx
import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import "../styles/RegistrationForm.css";

// Import hero background image
import heroBackground from "../assets/form.webp";

// EmailJS Configuration - TWO SEPARATE ACCOUNTS

// Account 1: Gmail (for admin notifications)
const GMAIL_PUBLIC_KEY = "tILAy3Y5MQ-2eEa0_"; // From Gmail EmailJS account
const GMAIL_SERVICE_ID = "service_p8vs3dj"; // Gmail service ID
const ADMIN_TEMPLATE_ID = "template_a4hphj7"; // Admin template

// Account 2: cPanel SMTP (for user acknowledgments)
const CPANEL_PUBLIC_KEY = "naajLvb7zBaRmLrbS"; // From cPanel EmailJS account
const CPANEL_SERVICE_ID = "service_y14b2vq"; // cPanel service ID
const ACK_TEMPLATE_ID = "template_grrn4po"; // Acknowledgment template

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  organization: string;
  position: string;
  category: string;
  registrationType: "delegate" | "farmer" | "virtual" | "student" | "";
  excursion: boolean;
  galaDinner: boolean;
  hearAbout: string;
  consent: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  country?: string;
  registrationType?: string;
  consent?: string;
  [key: string]: string | undefined;
}

interface Pricing {
  delegate: number;
  farmer: number;
  virtual: number;
  student: number;
  excursion: number;
  galaDinner: number;
}

const RegistrationForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  // DON'T use emailjs.init() - we'll pass keys with each send

  const PRICING: Pricing = {
    delegate: 200,
    farmer: 150,
    virtual: 100,
    student: 80,
    excursion: 50,
    galaDinner: 100,
  };

  const getInitialType = (): "" | "delegate" | "farmer" | "virtual" | "student" => {
    const state = location.state as { type: string } | null;
    if (!state?.type) return "";
    const type = state.type.toLowerCase();
    if (type.includes("delegate")) return "delegate";
    if (type.includes("farmer")) return "farmer";
    if (type.includes("virtual")) return "virtual";
    if (type.includes("student")) return "student";
    return "";
  };

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    organization: "",
    position: "",
    category: "",
    registrationType: getInitialType(),
    excursion: false,
    galaDinner: false,
    hearAbout: "",
    consent: false,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const calculateTotal = (): number => {
    let total = 0;
    if (formData.registrationType) {
      total += PRICING[formData.registrationType as keyof Pricing] || 0;
    }
    if (formData.excursion) total += PRICING.excursion;
    if (formData.galaDinner) total += PRICING.galaDinner;
    return total;
  };

  const formatCurrency = (amount: number): string => {
    return `$${amount}`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!formData.country.trim()) newErrors.country = "Country is required";
    }
    if (step === 2) {
      if (!formData.registrationType) newErrors.registrationType = "Please select a registration type";
    }
    if (step === 3) {
      if (!formData.consent) newErrors.consent = "You must agree to the terms and conditions to continue";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitMessage("");

    try {
      const totalAmount = calculateTotal();
      const registrationDate = new Date().toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      // Params for ADMIN notification (sent via GMAIL account)
      const adminParams = {
        to_email: "registration@eaindigenousseedconference.org",
        to_name: "Conference Team",
        from_name: formData.fullName,
        reply_to: formData.email,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        organization: formData.organization || "Not provided",
        position: formData.position || "Not provided",
        category: formData.category || "Not specified",
        registrationType: formData.registrationType || "Not selected",
        registrationFee: formatCurrency(PRICING[formData.registrationType as keyof Pricing] || 0),
        excursion: formData.excursion ? "Yes (+$50)" : "No",
        galaDinner: formData.galaDinner ? "Yes (+$100)" : "No",
        hearAbout: formData.hearAbout || "Not specified",
        totalAmount: formatCurrency(totalAmount),
        registrationDate: registrationDate,
        message: `New registration from ${formData.fullName}`,
      };

      // Params for USER acknowledgment (sent via CPANEL account)
      const userParams = {
        to_email: formData.email,
        to_name: formData.fullName,
        from_name: "Eastern Africa Indigenous Seed Conference",
        reply_to: "registration@eaindigenousseedconference.org",
        fullName: formData.fullName,
        email: formData.email,
        registrationType: formData.registrationType || "Not selected",
        registrationFee: formatCurrency(PRICING[formData.registrationType as keyof Pricing] || 0),
        excursion: formData.excursion ? "Yes (+$50)" : "No",
        galaDinner: formData.galaDinner ? "Yes (+$100)" : "No",
        totalAmount: formatCurrency(totalAmount),
        registrationDate: registrationDate,
      };

      // STEP 1: Send admin notification using GMAIL account
      console.log("Sending admin notification via Gmail account...");
      const adminResult = await emailjs.send(
        GMAIL_SERVICE_ID,
        ADMIN_TEMPLATE_ID,
        adminParams,
        GMAIL_PUBLIC_KEY // Pass Gmail account public key
      );
      console.log("✅ Admin notification sent:", adminResult.status);

      // STEP 2: Send user acknowledgment using CPANEL account
      console.log("Sending acknowledgment via cPanel account...");
      const userResult = await emailjs.send(
        CPANEL_SERVICE_ID,
        ACK_TEMPLATE_ID,
        userParams,
        CPANEL_PUBLIC_KEY // Pass cPanel account public key
      );
      console.log("✅ Acknowledgment sent:", userResult.status);

      setSubmitStatus("success");
      setSubmitMessage(
        "Registration successful! A confirmation email has been sent to your email address."
      );

      setTimeout(() => {
        navigate("/registration-success", {
          state: {
            name: formData.fullName,
            email: formData.email,
            total: formatCurrency(totalAmount),
            registrationType: formData.registrationType,
          },
        });
      }, 3000);

    } catch (error: any) {
      console.error("Error:", error);
      setSubmitStatus("error");
      setSubmitMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <motion.div
      className="registration-form-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="registration-container">
        <div
          className="registration-header"
          style={{ backgroundImage: `url(${heroBackground})` }}
        >
          <div className="header-overlay"></div>
          <div className="header-pattern" aria-hidden="true"></div>
          <div className="header-content">
            <h1>Conference Registration</h1>
            <p>
              Complete your registration for the Eastern Africa Indigenous Seed
              Conference 2026
            </p>

            <div className="registration-progress">
              <div className={`progress-step ${currentStep >= 1 ? "active" : ""} ${currentStep > 1 ? "completed" : ""}`}>
                <span className="step-number">1</span>
                <span className="step-label">Personal Info</span>
              </div>
              <div className={`progress-line ${currentStep >= 2 ? "active" : ""}`}></div>
              <div className={`progress-step ${currentStep >= 2 ? "active" : ""} ${currentStep > 2 ? "completed" : ""}`}>
                <span className="step-number">2</span>
                <span className="step-label">Registration</span>
              </div>
              <div className={`progress-line ${currentStep >= 3 ? "active" : ""}`}></div>
              <div className={`progress-step ${currentStep >= 3 ? "active" : ""}`}>
                <span className="step-number">3</span>
                <span className="step-label">Review</span>
              </div>
            </div>
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="registration-form">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div key="step1" className="form-step" variants={stepVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }}>
                <h2>Personal Information</h2>

                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className={errors.fullName ? "error" : ""} placeholder="Enter your full name" />
                  {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={errors.email ? "error" : ""} placeholder="your@email.com" />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={errors.phone ? "error" : ""} placeholder="+254 XXX XXX XXX" />
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="country">Country *</label>
                  <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} className={errors.country ? "error" : ""} placeholder="Your country" />
                  {errors.country && <span className="error-text">{errors.country}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="organization">Organization/Institution</label>
                    <input type="text" id="organization" name="organization" value={formData.organization} onChange={handleChange} placeholder="Where do you work/study?" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="position">Position/Title</label>
                    <input type="text" id="position" name="position" value={formData.position} onChange={handleChange} placeholder="Your role" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select id="category" name="category" value={formData.category} onChange={handleChange}>
                    <option value="">Select your category</option>
                    <option value="researcher">Researcher/Academic</option>
                    <option value="farmer">Farmer</option>
                    <option value="student">Student</option>
                    <option value="ngo">NGO Representative</option>
                    <option value="government">Government Official</option>
                    <option value="private">Private Sector</option>
                    <option value="media">Media</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-navigation">
                  <button type="button" className="btn-next" onClick={handleNext}>Next Step →</button>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div key="step2" className="form-step" variants={stepVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }}>
                <h2>Select Registration Type</h2>

                <div className="registration-options">
                  <label className={`registration-option ${formData.registrationType === "delegate" ? "selected" : ""}`}>
                    <input type="radio" name="registrationType" value="delegate" checked={formData.registrationType === "delegate"} onChange={handleChange} />
                    <div className="option-content">
                      <h3>Delegate</h3>
                      <p className="option-price">{formatCurrency(PRICING.delegate)}</p>
                      <ul>
                        <li>Access to all conference sessions</li>
                        <li>Conference materials & resources</li>
                        <li>Lunch & refreshments</li>
                        <li>Certificate of participation</li>
                      </ul>
                    </div>
                  </label>

                  <label className={`registration-option ${formData.registrationType === "farmer" ? "selected" : ""}`}>
                    <input type="radio" name="registrationType" value="farmer" checked={formData.registrationType === "farmer"} onChange={handleChange} />
                    <div className="option-content">
                      <h3>Farmer</h3>
                      <p className="option-price">{formatCurrency(PRICING.farmer)}</p>
                      <ul>
                        <li>Access to all conference sessions</li>
                        <li>Farm-focused workshops</li>
                        <li>Conference materials</li>
                        <li>Lunch & refreshments</li>
                      </ul>
                    </div>
                  </label>

                  <label className={`registration-option ${formData.registrationType === "virtual" ? "selected" : ""}`}>
                    <input type="radio" name="registrationType" value="virtual" checked={formData.registrationType === "virtual"} onChange={handleChange} />
                    <div className="option-content">
                      <h3>Virtual Participant</h3>
                      <p className="option-price">{formatCurrency(PRICING.virtual)}</p>
                      <ul>
                        <li>Live streaming of all sessions</li>
                        <li>Virtual networking rooms</li>
                        <li>Digital conference materials</li>
                        <li>Digital certificate</li>
                      </ul>
                    </div>
                  </label>
                </div>

                {errors.registrationType && <span className="error-text">{errors.registrationType}</span>}

                <h2 style={{ marginTop: "40px" }}>Optional Add-ons</h2>
                <div className="addons-grid">
                  <label className={`addon-card ${formData.excursion ? "selected" : ""}`}>
                    <input type="checkbox" name="excursion" checked={formData.excursion} onChange={handleChange} />
                    <div className="addon-content">
                      <h3>Field Excursion</h3>
                      <p className="addon-price">{formatCurrency(PRICING.excursion)}</p>
                      <p className="addon-description">Visit local agricultural projects and indigenous seed banks. Includes transportation and lunch.</p>
                    </div>
                  </label>

                  <label className={`addon-card ${formData.galaDinner ? "selected" : ""}`}>
                    <input type="checkbox" name="galaDinner" checked={formData.galaDinner} onChange={handleChange} />
                    <div className="addon-content">
                      <h3>Gala Dinner</h3>
                      <p className="addon-price">{formatCurrency(PRICING.galaDinner)}</p>
                      <p className="addon-description">Formal networking dinner with speakers and delegates. Includes dinner and drinks.</p>
                    </div>
                  </label>
                </div>

                <div className="price-summary">
                  <h3>Registration Summary</h3>
                  <div className="summary-item">
                    <span>Registration Fee:</span>
                    <span>{formatCurrency(PRICING[formData.registrationType as keyof Pricing] || 0)}</span>
                  </div>
                  {formData.excursion && (
                    <div className="summary-item">
                      <span>Field Excursion:</span>
                      <span>{formatCurrency(PRICING.excursion)}</span>
                    </div>
                  )}
                  {formData.galaDinner && (
                    <div className="summary-item">
                      <span>Gala Dinner:</span>
                      <span>{formatCurrency(PRICING.galaDinner)}</span>
                    </div>
                  )}
                  <div className="summary-total">
                    <span>Total Amount:</span>
                    <span className="total-price">{formatCurrency(calculateTotal())}</span>
                  </div>
                </div>

                <div className="form-navigation">
                  <button type="button" className="btn-prev" onClick={handlePrev}>← Previous</button>
                  <button type="button" className="btn-next" onClick={handleNext}>Next Step →</button>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div key="step3" className="form-step" variants={stepVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }}>
                <h2>Additional Information</h2>

                <div className="form-group">
                  <label htmlFor="hearAbout">How did you hear about this conference?</label>
                  <select id="hearAbout" name="hearAbout" value={formData.hearAbout} onChange={handleChange}>
                    <option value="">Please select</option>
                    <option value="website">Conference Website</option>
                    <option value="social">Social Media</option>
                    <option value="email">Email Newsletter</option>
                    <option value="colleague">Colleague/Peer</option>
                    <option value="organization">My Organization</option>
                    <option value="previous">Previous Attendee</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="price-summary final">
                  <h3>Registration Summary</h3>
                  <div className="summary-item">
                    <span>Registration Type:</span>
                    <span className="capitalize">{formData.registrationType || "Not selected"}</span>
                  </div>
                  <div className="summary-item">
                    <span>Base Fee:</span>
                    <span>{formatCurrency(PRICING[formData.registrationType as keyof Pricing] || 0)}</span>
                  </div>
                  {formData.excursion && (
                    <div className="summary-item">
                      <span>+ Field Excursion:</span>
                      <span>{formatCurrency(PRICING.excursion)}</span>
                    </div>
                  )}
                  {formData.galaDinner && (
                    <div className="summary-item">
                      <span>+ Gala Dinner:</span>
                      <span>{formatCurrency(PRICING.galaDinner)}</span>
                    </div>
                  )}
                  <div className="summary-total">
                    <span>Total to Pay:</span>
                    <span className="total-price">{formatCurrency(calculateTotal())}</span>
                  </div>
                </div>

                <div className="form-group checkbox">
                  <label className="checkbox-label">
                    <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} />
                    <span className="checkbox-text">
                      I confirm that the information provided is accurate and I agree to the{" "}
                      <a href="/terms">Terms & Conditions</a> and{" "}
                      <a href="/privacy">Privacy Policy</a>.
                    </span>
                  </label>
                  {errors.consent && <span className="error-text">{errors.consent}</span>}
                </div>

                {submitStatus === "error" && (
                  <div className="submit-message error">
                    <span>⚠️</span>
                    <span>{submitMessage}</span>
                  </div>
                )}

                {submitStatus === "success" && (
                  <div className="submit-message success">
                    <span>✅</span>
                    <span>{submitMessage}</span>
                  </div>
                )}

                <div className="form-navigation">
                  <button type="button" className="btn-prev" onClick={handlePrev} disabled={isSubmitting}>← Previous</button>
                  <button type="submit" className="btn-submit" disabled={isSubmitting}>
                    {isSubmitting ? <><span className="spinner"></span> Processing...</> : "Complete Registration"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </motion.div>
  );
};

export default RegistrationForm;