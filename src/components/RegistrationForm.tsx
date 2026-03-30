// components/RegistrationForm.tsx - Complete with Multi-Currency Support
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/RegistrationForm.css";
import heroBackground from "../assets/form.webp";

// ─────────────────────────────────────────────
// COUNTRY LIST  (ISO 3166-1 alpha-2 + dial codes)
// ─────────────────────────────────────────────
const COUNTRIES = [
  { name: "Afghanistan", code: "AF", dial: "+93" },
  { name: "Albania", code: "AL", dial: "+355" },
  { name: "Algeria", code: "DZ", dial: "+213" },
  { name: "Angola", code: "AO", dial: "+244" },
  { name: "Argentina", code: "AR", dial: "+54" },
  { name: "Australia", code: "AU", dial: "+61" },
  { name: "Austria", code: "AT", dial: "+43" },
  { name: "Bangladesh", code: "BD", dial: "+880" },
  { name: "Belgium", code: "BE", dial: "+32" },
  { name: "Benin", code: "BJ", dial: "+229" },
  { name: "Botswana", code: "BW", dial: "+267" },
  { name: "Brazil", code: "BR", dial: "+55" },
  { name: "Burkina Faso", code: "BF", dial: "+226" },
  { name: "Burundi", code: "BI", dial: "+257" },
  { name: "Cameroon", code: "CM", dial: "+237" },
  { name: "Canada", code: "CA", dial: "+1" },
  { name: "Central African Republic", code: "CF", dial: "+236" },
  { name: "Chad", code: "TD", dial: "+235" },
  { name: "China", code: "CN", dial: "+86" },
  { name: "Colombia", code: "CO", dial: "+57" },
  { name: "Comoros", code: "KM", dial: "+269" },
  { name: "Congo (DRC)", code: "CD", dial: "+243" },
  { name: "Congo (Republic)", code: "CG", dial: "+242" },
  { name: "Côte d'Ivoire", code: "CI", dial: "+225" },
  { name: "Denmark", code: "DK", dial: "+45" },
  { name: "Djibouti", code: "DJ", dial: "+253" },
  { name: "Egypt", code: "EG", dial: "+20" },
  { name: "Eritrea", code: "ER", dial: "+291" },
  { name: "Eswatini", code: "SZ", dial: "+268" },
  { name: "Ethiopia", code: "ET", dial: "+251" },
  { name: "Finland", code: "FI", dial: "+358" },
  { name: "France", code: "FR", dial: "+33" },
  { name: "Gabon", code: "GA", dial: "+241" },
  { name: "Gambia", code: "GM", dial: "+220" },
  { name: "Germany", code: "DE", dial: "+49" },
  { name: "Ghana", code: "GH", dial: "+233" },
  { name: "Guinea", code: "GN", dial: "+224" },
  { name: "Guinea-Bissau", code: "GW", dial: "+245" },
  { name: "India", code: "IN", dial: "+91" },
  { name: "Indonesia", code: "ID", dial: "+62" },
  { name: "Iran", code: "IR", dial: "+98" },
  { name: "Iraq", code: "IQ", dial: "+964" },
  { name: "Ireland", code: "IE", dial: "+353" },
  { name: "Israel", code: "IL", dial: "+972" },
  { name: "Italy", code: "IT", dial: "+39" },
  { name: "Japan", code: "JP", dial: "+81" },
  { name: "Jordan", code: "JO", dial: "+962" },
  { name: "Kenya", code: "KE", dial: "+254" },
  { name: "Lesotho", code: "LS", dial: "+266" },
  { name: "Liberia", code: "LR", dial: "+231" },
  { name: "Libya", code: "LY", dial: "+218" },
  { name: "Madagascar", code: "MG", dial: "+261" },
  { name: "Malawi", code: "MW", dial: "+265" },
  { name: "Mali", code: "ML", dial: "+223" },
  { name: "Mauritania", code: "MR", dial: "+222" },
  { name: "Mauritius", code: "MU", dial: "+230" },
  { name: "Mexico", code: "MX", dial: "+52" },
  { name: "Morocco", code: "MA", dial: "+212" },
  { name: "Mozambique", code: "MZ", dial: "+258" },
  { name: "Namibia", code: "NA", dial: "+264" },
  { name: "Netherlands", code: "NL", dial: "+31" },
  { name: "New Zealand", code: "NZ", dial: "+64" },
  { name: "Niger", code: "NE", dial: "+227" },
  { name: "Nigeria", code: "NG", dial: "+234" },
  { name: "Norway", code: "NO", dial: "+47" },
  { name: "Pakistan", code: "PK", dial: "+92" },
  { name: "Philippines", code: "PH", dial: "+63" },
  { name: "Poland", code: "PL", dial: "+48" },
  { name: "Portugal", code: "PT", dial: "+351" },
  { name: "Rwanda", code: "RW", dial: "+250" },
  { name: "Saudi Arabia", code: "SA", dial: "+966" },
  { name: "Senegal", code: "SN", dial: "+221" },
  { name: "Sierra Leone", code: "SL", dial: "+232" },
  { name: "Somalia", code: "SO", dial: "+252" },
  { name: "South Africa", code: "ZA", dial: "+27" },
  { name: "South Korea", code: "KR", dial: "+82" },
  { name: "South Sudan", code: "SS", dial: "+211" },
  { name: "Spain", code: "ES", dial: "+34" },
  { name: "Sudan", code: "SD", dial: "+249" },
  { name: "Sweden", code: "SE", dial: "+46" },
  { name: "Switzerland", code: "CH", dial: "+41" },
  { name: "Tanzania", code: "TZ", dial: "+255" },
  { name: "Togo", code: "TG", dial: "+228" },
  { name: "Tunisia", code: "TN", dial: "+216" },
  { name: "Turkey", code: "TR", dial: "+90" },
  { name: "UAE", code: "AE", dial: "+971" },
  { name: "Uganda", code: "UG", dial: "+256" },
  { name: "United Kingdom", code: "GB", dial: "+44" },
  { name: "United States", code: "US", dial: "+1" },
  { name: "Zambia", code: "ZM", dial: "+260" },
  { name: "Zimbabwe", code: "ZW", dial: "+263" },
];

// ─────────────────────────────────────────────
// 🌍 CURRENCIES - COMPLETE GLOBAL LIST
// ─────────────────────────────────────────────
const POPULAR_CURRENCIES = [
  // MAJOR WORLDWIDE
  { code: 'USD', name: 'US Dollar', region: 'World' },
  { code: 'EUR', name: 'Euro', region: 'Europe' },
  { code: 'GBP', name: 'British Pound', region: 'Europe' },
  { code: 'JPY', name: 'Japanese Yen', region: 'Asia' },
  { code: 'CNY', name: 'Chinese Yuan', region: 'Asia' },
  { code: 'INR', name: 'Indian Rupee', region: 'Asia' },
  { code: 'AUD', name: 'Australian Dollar', region: 'Oceania' },
  { code: 'CAD', name: 'Canadian Dollar', region: 'Americas' },
  
  // AFRICA
  { code: 'KES', name: 'Kenyan Shilling', region: 'East Africa' },
  { code: 'UGX', name: 'Ugandan Shilling', region: 'East Africa' },
  { code: 'TZS', name: 'Tanzanian Shilling', region: 'East Africa' },
  { code: 'RWF', name: 'Rwandan Franc', region: 'East Africa' },
  { code: 'ETB', name: 'Ethiopian Birr', region: 'East Africa' },
  { code: 'ZAR', name: 'South African Rand', region: 'Africa' },
  { code: 'GHS', name: 'Ghanaian Cedi', region: 'West Africa' },
  { code: 'NGN', name: 'Nigerian Naira', region: 'West Africa' },
  { code: 'EGP', name: 'Egyptian Pound', region: 'Africa' },
  
  // ASIA
  { code: 'AED', name: 'UAE Dirham', region: 'Middle East' },
  { code: 'SAR', name: 'Saudi Riyal', region: 'Middle East' },
  { code: 'PKR', name: 'Pakistani Rupee', region: 'Asia' },
  { code: 'BDT', name: 'Bangladeshi Taka', region: 'Asia' },
  { code: 'IDR', name: 'Indonesian Rupiah', region: 'Asia' },
  { code: 'PHP', name: 'Philippine Peso', region: 'Asia' },
  { code: 'THB', name: 'Thai Baht', region: 'Asia' },
  { code: 'VND', name: 'Vietnamese Dong', region: 'Asia' },
  { code: 'MYR', name: 'Malaysian Ringgit', region: 'Asia' },
  { code: 'SGD', name: 'Singapore Dollar', region: 'Asia' },
  { code: 'HKD', name: 'Hong Kong Dollar', region: 'Asia' },
  { code: 'TWD', name: 'Taiwan Dollar', region: 'Asia' },
  
  // AMERICAS
  { code: 'MXN', name: 'Mexican Peso', region: 'Americas' },
  { code: 'BRL', name: 'Brazilian Real', region: 'Americas' },
  { code: 'ARS', name: 'Argentine Peso', region: 'Americas' },
  { code: 'CLP', name: 'Chilean Peso', region: 'Americas' },
  { code: 'COP', name: 'Colombian Peso', region: 'Americas' },
  { code: 'PEN', name: 'Peruvian Sol', region: 'Americas' },
  { code: 'JMD', name: 'Jamaican Dollar', region: 'Caribbean' },
  
  // EUROPE
  { code: 'CHF', name: 'Swiss Franc', region: 'Europe' },
  { code: 'SEK', name: 'Swedish Krona', region: 'Europe' },
  { code: 'NOK', name: 'Norwegian Krone', region: 'Europe' },
  { code: 'DKK', name: 'Danish Krone', region: 'Europe' },
  { code: 'PLN', name: 'Polish Zloty', region: 'Europe' },
  { code: 'CZK', name: 'Czech Koruna', region: 'Europe' },
  { code: 'HUF', name: 'Hungarian Forint', region: 'Europe' },
  { code: 'RON', name: 'Romanian Leu', region: 'Europe' },
  { code: 'RUB', name: 'Russian Ruble', region: 'Europe' },
  { code: 'TRY', name: 'Turkish Lira', region: 'Europe' },
];

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
interface FormData {
  fullName: string;
  email: string;
  dialCode: string;        // ✅ NEW: dial code stored separately
  phone: string;           // just the number, no prefix
  country: string;
  organization: string;
  position: string;
  category: string;
  registrationType: 'delegate' | 'farmer' | 'virtual' | 'student' | '';
  excursion: boolean;
  galaDinner: boolean;
  hearAbout: string;
  dietaryRestrictions: string;
  accommodation: string;
  specialNeeds: string;
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

// ─────────────────────────────────────────────
// LOCAL STORAGE KEY
// ─────────────────────────────────────────────
const STORAGE_KEY = "ea_seed_reg_form";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://conference-backend-m5hq.onrender.com";

// ─────────────────────────────────────────────
// COUNTRY SEARCH DROPDOWN COMPONENT
// ─────────────────────────────────────────────
interface CountryDropdownProps {
  value: string;
  onChange: (country: string) => void;
  onDialCodeChange: (dial: string) => void;
  hasError?: boolean;
}

const CountryDropdown = ({ value, onChange, onDialCodeChange, hasError }: CountryDropdownProps) => {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = query.trim()
    ? COUNTRIES.filter(c => c.name.toLowerCase().includes(query.toLowerCase()))
    : COUNTRIES;

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Sync query when value changes externally (e.g. on restore from localStorage)
  useEffect(() => { setQuery(value); }, [value]);

  const select = (country: typeof COUNTRIES[0]) => {
    setQuery(country.name);
    onChange(country.name);
    onDialCodeChange(country.dial);
    setOpen(false);
  };

  return (
    <div className="rfp__country-wrap" ref={ref}>
      <input
        type="text"
        value={query}
        className={hasError ? 'has-error' : ''}
        placeholder="Search your country…"
        autoComplete="off"
        onChange={e => { setQuery(e.target.value); setOpen(true); onChange(''); }}
        onFocus={() => setOpen(true)}
      />
      {open && filtered.length > 0 && (
        <ul className="rfp__country-list">
          {filtered.slice(0, 60).map(c => (
            <li key={c.code} onMouseDown={() => select(c)}>
              <span className="rfp__country-name">{c.name}</span>
              <span className="rfp__country-dial">{c.dial}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
const RegistrationForm = () => {
  const location = useLocation();

  const PRICING: Pricing = {
    delegate: 200, farmer: 150, virtual: 100,
    student: 80, excursion: 50, galaDinner: 100,
  };

  const getInitialType = (): '' | 'delegate' | 'farmer' | 'virtual' | 'student' => {
    const state = location.state as { type: string } | null;
    if (!state?.type) return '';
    const type = state.type.toLowerCase();
    if (type.includes('delegate')) return 'delegate';
    if (type.includes('farmer')) return 'farmer';
    if (type.includes('virtual')) return 'virtual';
    
    return '';
  };

  // ✅ CHANGE 1: Restore from localStorage on mount, fall back to blank form
  const getInitialFormData = (): FormData => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Always reset consent on restore — must re-tick every session
        return { ...parsed, consent: false };
      }
    } catch { /* ignore corrupt storage */ }
    return {
      fullName: '', email: '', dialCode: '+254', phone: '', country: '',
      organization: '', position: '', category: '',
      registrationType: getInitialType(),
      excursion: false, galaDinner: false,
      hearAbout: '', dietaryRestrictions: '',
      accommodation: '', specialNeeds: '', consent: false,
    };
  };

  const [formData, setFormData] = useState<FormData>(getInitialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState('');

  // ✅ CHANGE 1: Auto-save to localStorage whenever formData changes
  // Excludes consent (must re-tick each session)
  useEffect(() => {
    try {
      const { consent: _consent, ...rest } = formData;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
    } catch { /* quota exceeded — fail silently */ }
  }, [formData]);

  const clearSavedForm = () => {
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  };

  const calculateTotal = (): number => {
    let total = 0;
    if (formData.registrationType) total += PRICING[formData.registrationType as keyof Pricing] || 0;
    if (formData.excursion) total += PRICING.excursion;
    if (formData.galaDinner) total += PRICING.galaDinner;
    return total;
  };

  const formatUSD = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);

  const formatConverted = (amount: number, code: string) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: code, minimumFractionDigits: 0 }).format(amount);

  // ✅ Fetch live exchange rates using frankfurter.app (free, no API key)
  const fetchExchangeRate = async (toCurrency: string, amount: number) => {
    if (toCurrency === 'USD') {
      setConvertedAmount(amount);
      setExchangeRate(1);
      setLastUpdated(new Date().toLocaleTimeString());
      return;
    }
    setIsConverting(true);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?from=USD&to=${toCurrency}`
      );
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      const rate = data.rates?.[toCurrency];
      if (!rate) throw new Error("Rate not found");
      setConvertedAmount(amount * rate);
      setExchangeRate(rate);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch {
      // Hardcoded fallback rates (update these periodically)
      const fallback: Record<string, number> = {
        EUR: 0.92, GBP: 0.79, JPY: 150.5, CNY: 7.19, INR: 83.5, AUD: 1.52,
        KES: 140.5, UGX: 3850, TZS: 2600, RWF: 1300, ETB: 57,
        ZAR: 18.8, GHS: 13.2, NGN: 1500, EGP: 47.5, CAD: 1.35,
        AED: 3.67, SAR: 3.75, PKR: 277, BDT: 110, IDR: 16000,
        PHP: 56, THB: 36, VND: 24000, MYR: 4.85, SGD: 1.36,
        HKD: 7.85, TWD: 32, MXN: 17, BRL: 5.05, ARS: 900,
        CLP: 910, COP: 4100, PEN: 3.85, CHF: 0.88, SEK: 10.2,
        NOK: 10.7, DKK: 6.85, PLN: 4.0, CZK: 24, HUF: 370,
        RON: 4.6, RUB: 98, TRY: 32, JMD: 154,
      };
      const rate = fallback[toCurrency] || 1;
      setConvertedAmount(amount * rate);
      setExchangeRate(rate);
      setLastUpdated(new Date().toLocaleTimeString() + ' (est.)');
    } finally {
      setIsConverting(false);
    }
  };

  useEffect(() => {
    if (calculateTotal() > 0) fetchExchangeRate(selectedCurrency, calculateTotal());
  }, [formData.registrationType, formData.excursion, formData.galaDinner, selectedCurrency]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.country.trim()) newErrors.country = 'Please select your country';
    }
    if (step === 2 && !formData.registrationType) newErrors.registrationType = 'Please select a registration type';
    if (step === 4 && !formData.consent) newErrors.consent = 'You must agree to continue';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(p => p + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setCurrentStep(p => p - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;
    setIsSubmitting(true);
    try {
      // ✅ Combine dial code + phone number before sending to backend
      const fullPhone = formData.dialCode
        ? formData.dialCode + " " + formData.phone.replace(/^0+/, "")
        : formData.phone;

      const res = await fetch(`${BACKEND_URL}/initialize-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          name: formData.fullName,
          amount: calculateTotal(),
          metadata: {
            phone: fullPhone,
            country: formData.country,
            organization: formData.organization,
            registrationType: formData.registrationType,
            category: formData.category,
            position: formData.position,
            excursion: formData.excursion,
            galaDinner: formData.galaDinner,
            hearAbout: formData.hearAbout,
            dietaryRestrictions: formData.dietaryRestrictions,
            accommodation: formData.accommodation,
            specialNeeds: formData.specialNeeds,
            currency: selectedCurrency,  // ✅ SEND CURRENCY TO BACKEND
            dialCode: formData.dialCode,
          },
        }),
      });
      const data = await res.json();

      // ✅ Handle duplicate registration error from server
      if (res.status === 409) {
        setSubmitStatus("error");
        setSubmitMessage("A registration already exists for this email and registration type. Please contact support if you believe this is an error.");
        setIsSubmitting(false);
        return;
      }

      if (data.authorization_url) {
        clearSavedForm(); // ✅ Clear localStorage once redirecting to payment
        window.location.href = data.authorization_url;
      } else {
        throw new Error("No authorization URL returned");
      }
    } catch (err) {
      setSubmitStatus("error");
      setSubmitMessage("Payment initialization failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepLabels = ['Personal Info', 'Registration', 'Add-ons', 'Review'];

  const stepVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
    exit: { opacity: 0, x: -40, transition: { duration: 0.2 } },
  };

  return (
    <motion.div className="rfp" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="rfp__container">

        {/* ── HEADER ─────────────────────────────────────── */}
        <div className="rfp__hero" style={{ backgroundImage: `url(${heroBackground})` }}>
          <div className="rfp__hero-overlay" />
          <div className="rfp__hero-content">
            <p className="rfp__hero-eyebrow">1st Eastern Africa</p>
            <h1 className="rfp__hero-title">Indigenous Seed<br />Conference 2026</h1>
            <p className="rfp__hero-sub">17–20 November · Nairobi, Kenya</p>

            <div className="rfp__progress">
              {stepLabels.map((label, idx) => {
                const n = idx + 1;
                const done = currentStep > n;
                const active = currentStep === n;
                return (
                  <div key={n} className="rfp__progress-item">
                    <div className={`rfp__step-dot ${active ? 'is-active' : ''} ${done ? 'is-done' : ''}`}>
                      {done ? '✓' : n}
                    </div>
                    <span className={`rfp__step-label ${active || done ? 'is-visible' : ''}`}>{label}</span>
                    {n < 4 && <div className={`rfp__progress-line ${currentStep > n ? 'is-filled' : ''}`} />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── FORM BODY ───────────────────────────────────── */}
        <form onSubmit={handleSubmit} className="rfp__body">
          <AnimatePresence mode="wait">

            {/* ── STEP 1 ── */}
            {currentStep === 1 && (
              <motion.div key="s1" className="rfp__step" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                <div className="rfp__step-header">
                  <span className="rfp__step-num">01</span>
                  <h2>Personal Information</h2>
                </div>

                {/* Restore banner */}
                {(() => {
                  try {
                    const saved = localStorage.getItem(STORAGE_KEY);
                    if (saved && JSON.parse(saved).fullName) {
                      return (
                        <div className="rfp__restore-banner">
                          <span>✦ Your previous progress has been restored.</span>
                          <button type="button" onClick={() => {
                            clearSavedForm();
                            setFormData({
                              fullName: '', email: '', dialCode: '+254', phone: '', country: '',
                              organization: '', position: '', category: '',
                              registrationType: getInitialType(),
                              excursion: false, galaDinner: false,
                              hearAbout: '', dietaryRestrictions: '',
                              accommodation: '', specialNeeds: '', consent: false,
                            });
                          }}>Start fresh</button>
                        </div>
                      );
                    }
                  } catch { /* ignore */ }
                  return null;
                })()}

                <div className="rfp__field">
                  <label htmlFor="fullName">Full Name <span className="req">*</span></label>
                  <input id="fullName" name="fullName" type="text" value={formData.fullName}
                    onChange={handleChange} className={errors.fullName ? 'has-error' : ''}
                    placeholder="Your full name as it should appear on the ticket" />
                  {errors.fullName && <span className="rfp__error">{errors.fullName}</span>}
                </div>

                <div className="rfp__row">
                  <div className="rfp__field">
                    <label htmlFor="email">Email Address <span className="req">*</span></label>
                    <input id="email" name="email" type="email" value={formData.email}
                      onChange={handleChange} className={errors.email ? 'has-error' : ''}
                      placeholder="your@email.com" />
                    {errors.email && <span className="rfp__error">{errors.email}</span>}
                  </div>

                  {/* ✅ CHANGE 4: Phone with dial code selector */}
                  <div className="rfp__field">
                    <label>Phone Number <span className="req">*</span></label>
                    <div className={`rfp__phone-wrap ${errors.phone ? 'has-error' : ''}`}>
                      <select
                        className="rfp__dial-select"
                        value={formData.dialCode}
                        onChange={e => setFormData(prev => ({ ...prev, dialCode: e.target.value }))}
                      >
                        {COUNTRIES.map(c => (
                          <option key={c.code} value={c.dial}>
                            {c.code} {c.dial}
                          </option>
                        ))}
                      </select>
                      <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="700 000 000"
                        className="rfp__phone-input"
                      />
                    </div>
                    {errors.phone && <span className="rfp__error">{errors.phone}</span>}
                  </div>
                </div>

                <div className="rfp__row">
                  {/* ✅ CHANGE 2: Country searchable dropdown */}
                  <div className="rfp__field">
                    <label>Country <span className="req">*</span></label>
                    <CountryDropdown
                      value={formData.country}
                      hasError={!!errors.country}
                      onChange={country => {
                        setFormData(prev => ({ ...prev, country }));
                        if (errors.country) setErrors(prev => ({ ...prev, country: undefined }));
                      }}
                      onDialCodeChange={dial =>
                        setFormData(prev => ({ ...prev, dialCode: dial }))
                      }
                    />
                    {errors.country && <span className="rfp__error">{errors.country}</span>}
                  </div>

                  <div className="rfp__field">
                    <label htmlFor="category">Category</label>
                    <select id="category" name="category" value={formData.category} onChange={handleChange}>
                      <option value="">Select your category</option>
                      <option value="researcher">Researcher / Academic</option>
                      <option value="farmer">Farmer</option>
                      <option value="student">Student</option>
                      <option value="ngo">NGO Representative</option>
                      <option value="government">Government Official</option>
                      <option value="private">Private Sector</option>
                      <option value="media">Media</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="rfp__row">
                  <div className="rfp__field">
                    <label htmlFor="organization">Organisation / Institution</label>
                    <input id="organization" name="organization" type="text" value={formData.organization}
                      onChange={handleChange} placeholder="Where do you work or study?" />
                  </div>
                  <div className="rfp__field">
                    <label htmlFor="position">Position / Title</label>
                    <input id="position" name="position" type="text" value={formData.position}
                      onChange={handleChange} placeholder="Your role or title" />
                  </div>
                </div>

                <div className="rfp__nav">
                  <button type="button" className="rfp__btn rfp__btn--next" onClick={handleNext}>
                    Continue <span>→</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2 ── */}
            {currentStep === 2 && (
              <motion.div key="s2" className="rfp__step" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                <div className="rfp__step-header">
                  <span className="rfp__step-num">02</span>
                  <h2>Select Registration Type</h2>
                </div>

                <div className="rfp__reg-grid">
                  {([
                    { value: 'delegate', label: 'Delegate', price: PRICING.delegate, perks: ['All conference sessions', 'Conference materials', 'Lunch & refreshments', 'Certificate of participation'] },
                    { value: 'farmer', label: 'Farmer', price: PRICING.farmer, perks: ['All conference sessions', 'Farm-focused workshops', 'Conference materials', 'Lunch & refreshments'] },
                    { value: 'virtual', label: 'Virtual Participant', price: PRICING.virtual, perks: ['Live streaming of all sessions', 'Virtual networking rooms', 'Digital conference materials', 'Digital certificate'] },
      
                  ] as const).map(opt => (
                    <label key={opt.value} className={`rfp__reg-card ${formData.registrationType === opt.value ? 'is-selected' : ''}`}>
                      <input type="radio" name="registrationType" value={opt.value}
                        checked={formData.registrationType === opt.value} onChange={handleChange} />
                      <div className="rfp__reg-card-inner">
                        <div className="rfp__reg-check">{formData.registrationType === opt.value ? '✓' : ''}</div>
                        <h3>{opt.label}</h3>
                        <p className="rfp__reg-price">{formatUSD(opt.price)}<span>/person</span></p>
                        <ul>{opt.perks.map(p => <li key={p}>{p}</li>)}</ul>
                      </div>
                    </label>
                  ))}
                </div>

                {errors.registrationType && <span className="rfp__error rfp__error--center">{errors.registrationType}</span>}

                <div className="rfp__nav rfp__nav--split">
                  <button type="button" className="rfp__btn rfp__btn--back" onClick={handlePrev}>← Back</button>
                  <button type="button" className="rfp__btn rfp__btn--next" onClick={handleNext}>Continue →</button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 3 ── */}
            {currentStep === 3 && (
              <motion.div key="s3" className="rfp__step" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                <div className="rfp__step-header">
                  <span className="rfp__step-num">03</span>
                  <h2>Optional Add-ons</h2>
                </div>

                <div className="rfp__addons">
                  {([
                    { name: 'excursion', label: 'Field Excursion', price: PRICING.excursion, desc: 'Visit local agricultural projects and indigenous seed banks. Includes guided transportation and lunch.', icon: '' },
                    { name: 'galaDinner', label: 'Gala Dinner', price: PRICING.galaDinner, desc: 'Formal networking dinner with keynote speakers and delegates. Includes dinner and welcome drinks.', icon: '' },
                  ] as const).map(addon => (
                    <label key={addon.name} className={`rfp__addon-card ${formData[addon.name] ? 'is-selected' : ''}`}>
                      <input type="checkbox" name={addon.name} checked={formData[addon.name]} onChange={handleChange} />
                      <div className="rfp__addon-inner">
                        <div className="rfp__addon-icon">{addon.icon}</div>
                        <div className="rfp__addon-body">
                          <div className="rfp__addon-top">
                            <h3>{addon.label}</h3>
                            <p className="rfp__addon-price">{formatUSD(addon.price)}</p>
                          </div>
                          <p className="rfp__addon-desc">{addon.desc}</p>
                        </div>
                        <div className={`rfp__addon-check ${formData[addon.name] ? 'is-checked' : ''}`}>✓</div>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="rfp__summary">
                  <h3>Registration Summary</h3>
                  <div className="rfp__summary-rows">
                    <div className="rfp__summary-row">
                      <span>{formData.registrationType ? formData.registrationType.charAt(0).toUpperCase() + formData.registrationType.slice(1) : 'No type selected'} Registration</span>
                      <span>{formatUSD(PRICING[formData.registrationType as keyof Pricing] || 0)}</span>
                    </div>
                    {formData.excursion && <div className="rfp__summary-row"><span>Field Excursion</span><span>{formatUSD(PRICING.excursion)}</span></div>}
                    {formData.galaDinner && <div className="rfp__summary-row"><span>Gala Dinner</span><span>{formatUSD(PRICING.galaDinner)}</span></div>}
                  </div>
                  <div className="rfp__summary-total">
                    <span>Total</span>
                    <span className="rfp__total-val">{formatUSD(calculateTotal())}</span>
                  </div>
                </div>

                <div className="rfp__nav rfp__nav--split">
                  <button type="button" className="rfp__btn rfp__btn--back" onClick={handlePrev}>← Back</button>
                  <button type="button" className="rfp__btn rfp__btn--next" onClick={handleNext}>Continue →</button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 4 ── */}
            {currentStep === 4 && (
              <motion.div key="s4" className="rfp__step" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                <div className="rfp__step-header">
                  <span className="rfp__step-num">04</span>
                  <h2>Additional Information & Payment</h2>
                </div>

                <div className="rfp__row">
                  <div className="rfp__field">
                    <label htmlFor="hearAbout">How did you hear about this conference?</label>
                    <select id="hearAbout" name="hearAbout" value={formData.hearAbout} onChange={handleChange}>
                      <option value="">Please select</option>
                      <option value="website">Conference Website</option>
                      <option value="social">Social Media</option>
                      <option value="email">Email Newsletter</option>
                      <option value="colleague">Colleague / Peer</option>
                      <option value="organization">My Organisation</option>
                      <option value="previous">Previous Attendee</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="rfp__field">
                    <label htmlFor="accommodation">Accommodation assistance?</label>
                    <select id="accommodation" name="accommodation" value={formData.accommodation} onChange={handleChange}>
                      <option value="">Please select</option>
                      <option value="yes">Yes, I need accommodation</option>
                      <option value="no">No, I will arrange my own</option>
                      <option value="info">Just need information</option>
                    </select>
                  </div>
                </div>

                <div className="rfp__field">
                  <label htmlFor="dietaryRestrictions">Dietary restrictions or allergies</label>
                  <input id="dietaryRestrictions" name="dietaryRestrictions" type="text"
                    value={formData.dietaryRestrictions} onChange={handleChange}
                    placeholder="e.g. Vegetarian, Halal, nut allergy..." />
                </div>

                <div className="rfp__field">
                  <label htmlFor="specialNeeds">Special needs or accessibility requirements</label>
                  <textarea id="specialNeeds" name="specialNeeds" rows={3}
                    value={formData.specialNeeds} onChange={handleChange}
                    placeholder="Please let us know so we can make arrangements for you." />
                </div>

                {/* ✅ 🌍 MULTI-CURRENCY CONVERTER - ALL MAJOR WORLD CURRENCIES */}
                <div className="rfp__currency">
                  <div className="rfp__currency-header">
                    <span className="rfp__currency-globe">🌍</span>
                    <div>
                      <h3>See total in your local currency</h3>
                      <p>For reference only — payment will be processed in Kenyan Shillings (KES)</p>
                    </div>
                  </div>
                  <select className="rfp__currency-select" value={selectedCurrency}
                    onChange={e => setSelectedCurrency(e.target.value)} disabled={calculateTotal() === 0}>
                    {POPULAR_CURRENCIES.map(c => (
                      <option key={c.code} value={c.code}>{c.code} — {c.name} ({c.region})</option>
                    ))}
                  </select>
                  {isConverting && (
                    <div className="rfp__currency-loading">
                      <span className="rfp__spinner" /> Fetching live rate…
                    </div>
                  )}
                  {!isConverting && convertedAmount !== null && selectedCurrency !== 'USD' && (
                    <div className="rfp__currency-result">
                      <div className="rfp__currency-meta">
                        {exchangeRate && <span>1 USD = {exchangeRate.toFixed(2)} {selectedCurrency}</span>}
                        {lastUpdated && <span>Updated {lastUpdated}</span>}
                      </div>
                      <div className="rfp__currency-amount">
                        ≈ <strong>{formatConverted(convertedAmount, selectedCurrency)}</strong>
                      </div>
                    </div>
                  )}
                </div>

                {/* FINAL SUMMARY */}
                <div className="rfp__summary rfp__summary--final">
                  <h3>Order Summary</h3>
                  <div className="rfp__summary-rows">
                    <div className="rfp__summary-row">
                      <span>{formData.registrationType || 'No type'} registration</span>
                      <span>{formatUSD(PRICING[formData.registrationType as keyof Pricing] || 0)}</span>
                    </div>
                    {formData.excursion && <div className="rfp__summary-row"><span>Field excursion</span><span>{formatUSD(PRICING.excursion)}</span></div>}
                    {formData.galaDinner && <div className="rfp__summary-row"><span>Gala dinner</span><span>{formatUSD(PRICING.galaDinner)}</span></div>}
                  </div>
                  <div className="rfp__summary-total">
                    <span>Total (USD)</span>
                    <span className="rfp__total-val">{formatUSD(calculateTotal())}</span>
                  </div>
                  {convertedAmount !== null && selectedCurrency !== 'USD' && (
                    <div className="rfp__summary-converted">
                      <span>≈ {formatConverted(convertedAmount, selectedCurrency)}</span>
                    </div>
                  )}
                </div>

                <label className={`rfp__consent ${errors.consent ? 'has-error' : ''}`}>
                  <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} />
                  <span>
                    I confirm the information provided is accurate and I agree to the{' '}
                    <a href="/terms">Terms & Conditions</a> and <a href="/privacy">Privacy Policy</a>.
                  </span>
                </label>
                {errors.consent && <span className="rfp__error">{errors.consent}</span>}

                {submitStatus === 'error' && (
                  <div className="rfp__alert rfp__alert--error">⚠️ {submitMessage}</div>
                )}

                <div className="rfp__nav rfp__nav--split">
                  <button type="button" className="rfp__btn rfp__btn--back" onClick={handlePrev}>← Back</button>
                  <button type="submit" className="rfp__btn rfp__btn--submit" disabled={isSubmitting}>
                    {isSubmitting ? <><span className="rfp__spinner rfp__spinner--white" /> Processing…</> : 'Pay & Register →'}
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