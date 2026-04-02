// components/PaymentSuccess.tsx
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/PaymentSuccess.css";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL ||
  "https://api.eaindigenousseedconference.org";

type Stage = "verifying" | "success" | "error";

interface ParticipantInfo {
  participantId: string;
  alreadyProcessed?: boolean;
}

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");

  const [stage, setStage] = useState<Stage>("verifying");
  const [info, setInfo] = useState<ParticipantInfo | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const verify = async () => {
      if (!reference) {
        setErrorMsg(
          "No payment reference found. Please contact support if you completed a payment.",
        );
        setStage("error");
        return;
      }

      try {
        const res = await fetch(`${BACKEND_URL}/verify-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference }),
        });

        const data = await res.json();

        if (data.status === "success") {
          setInfo({
            participantId: data.participantId,
            alreadyProcessed: data.alreadyProcessed,
          });
          setStage("success");
        } else {
          setErrorMsg(
            "Payment verification failed. Please contact our support team with your payment reference.",
          );
          setStage("error");
        }
      } catch {
        setErrorMsg(
          "A network error occurred while verifying your payment. Please try again or contact support.",
        );
        setStage("error");
      }
    };

    verify();
  }, [reference]);

  const ticketUrl = info ? `${BACKEND_URL}/ticket/${info.participantId}` : "";
  const downloadUrl = info
    ? `${BACKEND_URL}/ticket-download/${info.participantId}`
    : "";

  return (
    <div className="psp">
      <div className="psp__bg" aria-hidden="true">
        <div className="psp__bg-circle psp__bg-circle--1" />
        <div className="psp__bg-circle psp__bg-circle--2" />
      </div>

      <AnimatePresence mode="wait">
        {/* VERIFYING */}
        {stage === "verifying" && (
          <motion.div
            key="verifying"
            className="psp__card"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="psp__verify-icon">
              <span className="psp__ring" />
            </div>
            <h1>Verifying Payment</h1>
            <p className="psp__sub">
              Please wait while we confirm your transaction…
            </p>
            <div className="psp__progress-bar">
              <div className="psp__progress-fill" />
            </div>
          </motion.div>
        )}

        {/* SUCCESS */}
        {stage === "success" && info && (
          <motion.div
            key="success"
            className="psp__card psp__card--success"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Check icon */}
            <motion.div
              className="psp__check"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.15,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              <svg viewBox="0 0 52 52" fill="none">
                <circle
                  cx="26"
                  cy="26"
                  r="25"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <motion.path
                  d="M14 27l8 8 16-16"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.35, duration: 0.45, ease: "easeOut" }}
                />
              </svg>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <p className="psp__eyebrow">Payment confirmed</p>
              <h1>You're registered!</h1>
              <p className="psp__sub">
                Your ticket has been generated and emailed to you.
                {info.alreadyProcessed &&
                  " (This payment was already processed — your ticket is unchanged.)"}
              </p>

              {reference && (
                <div className="psp__ref-badge">
                  <span className="psp__ref-label">Reference</span>
                  <span className="psp__ref-value">{reference}</span>
                </div>
              )}

              {/* ACTION BUTTONS */}
              <div className="psp__actions">
                <a href={downloadUrl} className="psp__btn psp__btn--primary">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download Ticket PDF
                </a>
                <a
                  href={ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="psp__btn psp__btn--secondary"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  Preview Ticket
                </a>
              </div>

              {/* TICKET IFRAME */}
              <div className="psp__ticket-frame">
                <div className="psp__ticket-frame-label">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 9a3 3 0 010-6h20a3 3 0 010 6" />
                    <path d="M2 15a3 3 0 000 6h20a3 3 0 000-6" />
                    <line x1="12" y1="9" x2="12" y2="15" />
                  </svg>
                  Your Conference Ticket
                </div>
                <iframe src={ticketUrl} title="Conference Ticket Preview" />
                <p className="psp__frame-hint">
                  A copy has also been sent to your email address.
                </p>
              </div>

              <div className="psp__footer-nav">
                <Link to="/" className="psp__btn psp__btn--ghost">
                  ← Return to Homepage
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ERROR */}
        {stage === "error" && (
          <motion.div
            key="error"
            className="psp__card psp__card--error"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="psp__error-icon">
              <svg viewBox="0 0 52 52" fill="none">
                <circle
                  cx="26"
                  cy="26"
                  r="25"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M18 18l16 16M34 18L18 34"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h1>Verification Failed</h1>
            <p className="psp__sub">{errorMsg}</p>

            {reference && (
              <div className="psp__ref-badge psp__ref-badge--error">
                <span className="psp__ref-label">Reference</span>
                <span className="psp__ref-value">{reference}</span>
              </div>
            )}

            <div className="psp__contact-box">
              <p>
                Please contact our support team and provide the reference above:
              </p>
              <a href="mailto:registration@eaindigenousseedconference.org">
                registration@eaindigenousseedconference.org
              </a>
            </div>

            <div className="psp__footer-nav">
              <Link to="/register" className="psp__btn psp__btn--primary">
                Try Again
              </Link>
              <Link to="/" className="psp__btn psp__btn--ghost">
                ← Homepage
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentSuccess;
