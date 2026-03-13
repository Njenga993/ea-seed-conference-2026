// components/RegistrationForm.tsx
import { useState, useEffect } from "react";
import { useLocation,  } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
//import emailjs from "@emailjs/browser";
import "../styles/RegistrationForm.css";

// Import hero background image
import heroBackground from "../assets/form.webp"; // Add your hero image to assets

// EmailJS Configuration
//const REGISTRATION_SERVICE_ID = "service_p8vs3dj";
//const REGISTRATION_TEMPLATE_ADMIN = "template_a4hphj7"; // Admin notification
//const REGISTRATION_TEMPLATE_CONFIRMATION = "template_a5iz32i"; // Auto-reply
//const REGISTRATION_PUBLIC_KEY = "tILAy3Y5MQ-2eEa0_";

interface FormData {
  // Personal Information
  fullName: string;
  email: string;
  phone: string;
  country: string;
  
  // Professional Information
  organization: string;
  position: string;
  category: string;
  
  // Registration Type
  registrationType: 'delegate' | 'farmer' | 'virtual' | 'student' | '';
  
  // Add-ons
  excursion: boolean;
  galaDinner: boolean;
  
  // Simple Questions
  hearAbout: string;
  dietaryRestrictions: string;
  accommodation: string;
  specialNeeds: string;
  
  // Consent
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

// Popular currencies for international users
const POPULAR_CURRENCIES = [
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'AUD', name: 'Australian Dollar' },
  { code: 'CHF', name: 'Swiss Franc' },
  { code: 'CNY', name: 'Chinese Yuan' },
  { code: 'INR', name: 'Indian Rupee' },
  { code: 'BRL', name: 'Brazilian Real' },
  { code: 'ZAR', name: 'South African Rand' },
  { code: 'NGN', name: 'Nigerian Naira' },
  { code: 'KES', name: 'Kenyan Shilling' },
  { code: 'EGP', name: 'Egyptian Pound' },
  { code: 'GHS', name: 'Ghanaian Cedi' },
  { code: 'TZS', name: 'Tanzanian Shilling' },
  { code: 'UGX', name: 'Ugandan Shilling' },
  { code: 'RWF', name: 'Rwandan Franc' },
  { code: 'MXN', name: 'Mexican Peso' },
  { code: 'SGD', name: 'Singapore Dollar' },
  { code: 'HKD', name: 'Hong Kong Dollar' },
  { code: 'NZD', name: 'New Zealand Dollar' },
  { code: 'KRW', name: 'South Korean Won' },
  { code: 'RUB', name: 'Russian Ruble' },
  { code: 'TRY', name: 'Turkish Lira' },
  { code: 'AED', name: 'UAE Dirham' },
  { code: 'SAR', name: 'Saudi Riyal' }
];

const RegistrationForm = () => {
  const location = useLocation();
  //const navigate = useNavigate();
  
  // Pricing configuration
  const PRICING: Pricing = {
    delegate: 200,
    farmer: 150,
    virtual: 100,
    student: 80,
    excursion: 50,
    galaDinner: 100
  };

  // Get registration type from navigation state
  const getInitialType = (): '' | 'delegate' | 'farmer' | 'virtual' | 'student' => {
    const state = location.state as { type: string } | null;
    if (!state?.type) return '';
    
    const type = state.type.toLowerCase();
    if (type.includes('delegate')) return 'delegate';
    if (type.includes('farmer')) return 'farmer';
    if (type.includes('virtual')) return 'virtual';
    return '';
  };

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    organization: '',
    position: '',
    category: '',
    registrationType: getInitialType(),
    excursion: false,
    galaDinner: false,
    hearAbout: '',
    dietaryRestrictions: '',
    accommodation: '',
    specialNeeds: '',
    consent: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  
  // Currency converter states
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState('');

  // Calculate total
  const calculateTotal = (): number => {
    let total = 0;
    
    // Add registration fee
    if (formData.registrationType) {
      total += PRICING[formData.registrationType as keyof Pricing] || 0;
    }
    
    // Add add-ons
    if (formData.excursion) total += PRICING.excursion;
    if (formData.galaDinner) total += PRICING.galaDinner;
    
    return total;
  };

  // Format USD currency
  const formatUSD = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format converted currency
  const formatConverted = (amount: number, currencyCode: string): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Fetch exchange rate from API
  const fetchExchangeRate = async (fromCurrency: string, toCurrency: string, amount: number) => {
    if (toCurrency === 'USD') {
      setConvertedAmount(amount);
      setExchangeRate(1);
      setLastUpdated(new Date().toLocaleTimeString());
      return;
    }

    setIsConverting(true);
    try {
      // Using free exchangerate.host API (no key required)
      const response = await fetch(
        `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
      );
      
      if (!response.ok) {
        throw new Error('Conversion failed');
      }
      
      const data = await response.json();
      
      if (data.result) {
        setConvertedAmount(data.result);
        setExchangeRate(data.info?.rate || null);
        setLastUpdated(new Date().toLocaleTimeString());
      } else {
        throw new Error('Invalid response');
      }
    } catch (error) {
      console.error('Currency conversion error:', error);
      // Fallback to approximate rates
      const fallbackRates: { [key: string]: number } = {
        'EUR': 0.92, 'GBP': 0.79, 'JPY': 150.5, 'CAD': 1.35, 
        'AUD': 1.52, 'CHF': 0.88, 'CNY': 7.19, 'INR': 83.5,
        'BRL': 5.05, 'ZAR': 18.8, 'NGN': 1500, 'KES': 140.5,
        'EGP': 47.5, 'GHS': 13.2, 'TZS': 2600, 'UGX': 3850,
        'RWF': 1300, 'MXN': 17.1, 'SGD': 1.35, 'HKD': 7.82,
        'NZD': 1.65, 'KRW': 1350, 'RUB': 92.5, 'TRY': 32.2,
        'AED': 3.67, 'SAR': 3.75
      };
      
      const rate = fallbackRates[toCurrency] || 1;
      setConvertedAmount(amount * rate);
      setExchangeRate(rate);
      setLastUpdated(new Date().toLocaleTimeString() + ' (estimated)');
    } finally {
      setIsConverting(false);
    }
  };

  // Handle currency change
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCurrency = e.target.value;
    setSelectedCurrency(newCurrency);
    if (calculateTotal() > 0) {
      fetchExchangeRate('USD', newCurrency, calculateTotal());
    }
  };

  // Update conversion when total changes
  useEffect(() => {
    if (selectedCurrency !== 'USD' && calculateTotal() > 0) {
      fetchExchangeRate('USD', selectedCurrency, calculateTotal());
    }
  }, [formData.registrationType, formData.excursion, formData.galaDinner]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Validate current step
  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};
    
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Valid email is required';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.country.trim()) newErrors.country = 'Country is required';
    }
    
    if (step === 2) {
      if (!formData.registrationType) newErrors.registrationType = 'Please select a registration type';
    }
    
    if (step === 4) {
      if (!formData.consent) newErrors.consent = 'You must agree to continue';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next step
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle previous step
  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateStep(4)) return;

  setIsSubmitting(true);

  try {

    const totalAmount = calculateTotal();

    const paymentData = {
      email: formData.email,
      name: formData.fullName,
      amount: totalAmount,
      metadata: {
        phone: formData.phone,
        country: formData.country,
        organization: formData.organization,
        registrationType: formData.registrationType,
        excursion: formData.excursion,
        galaDinner: formData.galaDinner
      }
    };

    const response = await fetch("http://localhost:5000/initialize-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(paymentData)
    });

    const data = await response.json();

    if (data.authorization_url) {

      window.location.href = data.authorization_url;

    } else {

      throw new Error("Payment initialization failed");

    }

  } catch (error) {

    console.error(error);

    setSubmitStatus("error");
    setSubmitMessage("Payment initialization failed. Please try again.");

  } finally {

    setIsSubmitting(false);

  }
};

  // Animation variants
  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  return (
    <motion.div 
      className="registration-form-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="registration-container">
        {/* Header with Background Image */}
        <div 
          className="registration-header"
          style={{ backgroundImage: `url(${heroBackground})` }}
        >
          <div className="header-overlay"></div>
          <div className="header-pattern" aria-hidden="true"></div>
          <div className="header-content">
            <h1>Conference Registration</h1>
            <p>Complete your registration for the Eastern Africa Indigenous Seed Conference 2026</p>
            
            {/* Progress Steps */}
            <div className="registration-progress">
              <div className={`progress-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
                <span className="step-number">1</span>
                <span className="step-label">Personal Info</span>
              </div>
              <div className={`progress-line ${currentStep >= 2 ? 'active' : ''}`}></div>
              <div className={`progress-step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
                <span className="step-number">2</span>
                <span className="step-label">Registration</span>
              </div>
              <div className={`progress-line ${currentStep >= 3 ? 'active' : ''}`}></div>
              <div className={`progress-step ${currentStep >= 3 ? 'active' : ''} ${currentStep > 3 ? 'completed' : ''}`}>
                <span className="step-number">3</span>
                <span className="step-label">Add-ons</span>
              </div>
              <div className={`progress-line ${currentStep >= 4 ? 'active' : ''}`}></div>
              <div className={`progress-step ${currentStep >= 4 ? 'active' : ''}`}>
                <span className="step-number">4</span>
                <span className="step-label">Questions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="registration-form">
          <AnimatePresence mode="wait">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                className="form-step"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2>Personal Information</h2>
                
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={errors.fullName ? 'error' : ''}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                      placeholder="your@email.com"
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? 'error' : ''}
                      placeholder="+254 XXX XXX XXX"
                    />
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="country">Country *</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={errors.country ? 'error' : ''}
                    placeholder="Your country"
                  />
                  {errors.country && <span className="error-text">{errors.country}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="organization">Organization/Institution</label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="Where do you work/study?"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="position">Position/Title</label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      placeholder="Your role"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
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
                  <button type="button" className="btn-next" onClick={handleNext}>
                    Next Step →
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Registration Type */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                className="form-step"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2>Select Registration Type</h2>
                
                <div className="registration-options">
                  <label className={`registration-option ${formData.registrationType === 'delegate' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="registrationType"
                      value="delegate"
                      checked={formData.registrationType === 'delegate'}
                      onChange={handleChange}
                    />
                    <div className="option-content">
                      <h3>Delegate</h3>
                      <p className="option-price">{formatUSD(PRICING.delegate)}</p>
                      <ul>
                        <li>Access to all conference sessions</li>
                        <li>Conference materials & resources</li>
                        <li>Lunch & refreshments</li>
                        <li>Certificate of participation</li>
                      </ul>
                    </div>
                  </label>

                  <label className={`registration-option ${formData.registrationType === 'farmer' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="registrationType"
                      value="farmer"
                      checked={formData.registrationType === 'farmer'}
                      onChange={handleChange}
                    />
                    <div className="option-content">
                      <h3>Farmer</h3>
                      <p className="option-price">{formatUSD(PRICING.farmer)}</p>
                      <ul>
                        <li>Access to all conference sessions</li>
                        <li>Farm-focused workshops</li>
                        <li>Conference materials</li>
                        <li>Lunch & refreshments</li>
                      </ul>
                    </div>
                  </label>

                  <label className={`registration-option ${formData.registrationType === 'virtual' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="registrationType"
                      value="virtual"
                      checked={formData.registrationType === 'virtual'}
                      onChange={handleChange}
                    />
                    <div className="option-content">
                      <h3>Virtual Participant</h3>
                      <p className="option-price">{formatUSD(PRICING.virtual)}</p>
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

                <div className="form-navigation">
                  <button type="button" className="btn-prev" onClick={handlePrev}>
                    ← Previous
                  </button>
                  <button type="button" className="btn-next" onClick={handleNext}>
                    Next Step →
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Add-ons */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                className="form-step"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2>Optional Add-ons</h2>
                
                <div className="addons-grid">
                  <label className={`addon-card ${formData.excursion ? 'selected' : ''}`}>
                    <input
                      type="checkbox"
                      name="excursion"
                      checked={formData.excursion}
                      onChange={handleChange}
                    />
                    <div className="addon-content">
                      <h3>Field Excursion</h3>
                      <p className="addon-price">{formatUSD(PRICING.excursion)}</p>
                      <p className="addon-description">
                        Visit local agricultural projects and indigenous seed banks. 
                        Includes transportation and lunch.
                      </p>
                    </div>
                  </label>

                  <label className={`addon-card ${formData.galaDinner ? 'selected' : ''}`}>
                    <input
                      type="checkbox"
                      name="galaDinner"
                      checked={formData.galaDinner}
                      onChange={handleChange}
                    />
                    <div className="addon-content">
                      <h3>Gala Dinner</h3>
                      <p className="addon-price">{formatUSD(PRICING.galaDinner)}</p>
                      <p className="addon-description">
                        Formal networking dinner with speakers and delegates. 
                        Includes dinner and drinks.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Price Summary */}
                <div className="price-summary">
                  <h3>Registration Summary</h3>
                  <div className="summary-item">
                    <span>Registration Fee:</span>
                    <span>{formatUSD(PRICING[formData.registrationType as keyof Pricing] || 0)}</span>
                  </div>
                  {formData.excursion && (
                    <div className="summary-item">
                      <span>Field Excursion:</span>
                      <span>{formatUSD(PRICING.excursion)}</span>
                    </div>
                  )}
                  {formData.galaDinner && (
                    <div className="summary-item">
                      <span>Gala Dinner:</span>
                      <span>{formatUSD(PRICING.galaDinner)}</span>
                    </div>
                  )}
                  <div className="summary-total">
                    <span>Total Amount:</span>
                    <span className="total-price">{formatUSD(calculateTotal())}</span>
                  </div>
                </div>

                <div className="form-navigation">
                  <button type="button" className="btn-prev" onClick={handlePrev}>
                    ← Previous
                  </button>
                  <button type="button" className="btn-next" onClick={handleNext}>
                    Next Step →
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Questions, Currency Converter & Submit */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                className="form-step"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2>Additional Information</h2>
                
                <div className="form-group">
                  <label htmlFor="hearAbout">How did you hear about this conference?</label>
                  <select
                    id="hearAbout"
                    name="hearAbout"
                    value={formData.hearAbout}
                    onChange={handleChange}
                  >
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

                <div className="form-group">
                  <label htmlFor="dietaryRestrictions">Do you have any dietary restrictions?</label>
                  <input
                    type="text"
                    id="dietaryRestrictions"
                    name="dietaryRestrictions"
                    value={formData.dietaryRestrictions}
                    onChange={handleChange}
                    placeholder="e.g., Vegetarian, Halal, Allergies, etc."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="accommodation">Do you need accommodation assistance?</label>
                  <select
                    id="accommodation"
                    name="accommodation"
                    value={formData.accommodation}
                    onChange={handleChange}
                  >
                    <option value="">Please select</option>
                    <option value="yes">Yes, I need accommodation</option>
                    <option value="no">No, I will arrange my own</option>
                    <option value="info">Just need information</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="specialNeeds">Any special needs or accessibility requirements?</label>
                  <textarea
                    id="specialNeeds"
                    name="specialNeeds"
                    value={formData.specialNeeds}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Please let us know if you have any specific requirements"
                  />
                </div>

                {/* Currency Converter Section */}
                <div className="currency-converter-section">
                  <h3>🌍 See the Total in Your Local Currency</h3>
                  
                  <div className="converter-controls">
                    <select 
                      value={selectedCurrency} 
                      onChange={handleCurrencyChange}
                      className="currency-select"
                      disabled={calculateTotal() === 0}
                    >
                      {POPULAR_CURRENCIES.map(currency => (
                        <option key={currency.code} value={currency.code}>
                          {currency.code} - {currency.name}
                        </option>
                      ))}
                    </select>
                    
                    {isConverting && (
                      <div className="conversion-status">
                        <span className="rate-spinner"></span>
                        <span>Getting latest exchange rate...</span>
                      </div>
                    )}
                  </div>
                  
                  {convertedAmount !== null && selectedCurrency !== 'USD' && !isConverting && (
                    <div className="converted-amount-display">
                      <div className="conversion-rate-info">
                        {exchangeRate && (
                          <span className="rate-info">
                            1 USD = {exchangeRate.toFixed(4)} {selectedCurrency}
                          </span>
                        )}
                        {lastUpdated && (
                          <span className="last-updated">Updated: {lastUpdated}</span>
                        )}
                      </div>
                      
                      <div className="converted-amount">
                        <span className="approx-label">≈</span>
                        <span className="converted-price">
                          {formatConverted(convertedAmount, selectedCurrency)}
                        </span>
                      </div>
                      
                      <p className="conversion-note">
                        * Exchange rates are for reference only. Final payment will be in USD.
                      </p>
                    </div>
                  )}
                  
                  {selectedCurrency === 'USD' && (
                    <div className="usd-note">
                      <p>Showing prices in USD (default currency)</p>
                    </div>
                  )}
                </div>

                {/* Final Price Summary */}
                <div className="price-summary final">
                  <h3>Registration Summary</h3>
                  <div className="summary-item">
                    <span>Registration Type:</span>
                    <span className="capitalize">{formData.registrationType || 'Not selected'}</span>
                  </div>
                  <div className="summary-item">
                    <span>Base Fee (USD):</span>
                    <span>{formatUSD(PRICING[formData.registrationType as keyof Pricing] || 0)}</span>
                  </div>
                  {formData.excursion && (
                    <div className="summary-item">
                      <span>+ Field Excursion:</span>
                      <span>{formatUSD(PRICING.excursion)}</span>
                    </div>
                  )}
                  {formData.galaDinner && (
                    <div className="summary-item">
                      <span>+ Gala Dinner:</span>
                      <span>{formatUSD(PRICING.galaDinner)}</span>
                    </div>
                  )}
                  <div className="summary-total">
                    <span>Total in USD:</span>
                    <span className="total-price">{formatUSD(calculateTotal())}</span>
                  </div>
                  
                  {convertedAmount !== null && selectedCurrency !== 'USD' && (
                    <div className="summary-converted">
                      <span>Approx. in {selectedCurrency}:</span>
                      <span className="converted-total">
                        {formatConverted(convertedAmount, selectedCurrency)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="form-group checkbox">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                    />
                    <span className="checkbox-text">
                      I confirm that the information provided is accurate and I agree to the 
                      <a href="/terms"> Terms & Conditions</a> and 
                      <a href="/privacy"> Privacy Policy</a>.
                    </span>
                  </label>
                  {errors.consent && <span className="error-text">{errors.consent}</span>}
                </div>

                {submitStatus === 'error' && (
                  <div className="submit-message error">
                    <span>⚠️</span>
                    <span>{submitMessage}</span>
                  </div>
                )}

                {submitStatus === 'success' && (
                  <div className="submit-message success">
                    <span>✅</span>
                    <span>{submitMessage}</span>
                  </div>
                )}

                <div className="form-navigation">
                  <button type="button" className="btn-prev" onClick={handlePrev}>
                    ← Previous
                  </button>
                  <button 
                    type="submit" 
                    className="btn-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner"></span>
                        Processing...
                      </>
                    ) : (
                      'Complete Registration'
                    )}
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