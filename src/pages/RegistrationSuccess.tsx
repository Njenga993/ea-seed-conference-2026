// pages/RegistrationSuccess.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import "../styles/RegistrationSuccess.css";

const RegistrationSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, email, total } = location.state || {};

  return (
    <motion.div 
      className="registration-success"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="success-card">
        <div className="success-icon">
          <CheckCircle size={80} />
        </div>
        
        <h1>Registration Successful!</h1>
        
        <p className="success-message">
          Thank you for registering for the Eastern Africa Indigenous Seed Conference 2026.
        </p>
        
        <div className="success-details">
          <p><strong>Name:</strong> {name || 'Attendee'}</p>
          <p><strong>Email:</strong> {email || 'Provided'}</p>
          <p><strong>Registration Total:</strong> {total || '$0'}</p>
        </div>
        
        <p className="info-text">
          A confirmation email has been sent to your email address with all the details.
          Our team will contact you within 2-3 days with further information.
        </p>
        
        <div className="next-steps">
          <h3>What's Next?</h3>
          <ul>
            <li>✓ Check your email for confirmation</li>
            <li>✓ Save the conference dates</li>
            <li>✓ Prepare any presentation materials</li>
            <li>✓ Book your travel and accommodation</li>
          </ul>
        </div>
        
        <div className="success-actions">
          <button onClick={() => navigate('/')} className="btn-home">
            Return to Homepage
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default RegistrationSuccess;