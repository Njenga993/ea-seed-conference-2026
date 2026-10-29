// components/Countdown.tsx
import { useEffect, useState, useRef, useCallback } from "react";

import "../styles/countdown.css";

// ── Update these two before shipping ──────────────────────────────────────
import posterImage from "../assets/campaign.jpg"; // swap in the real poster asset
const SIDE_EVENT_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdUDLfN291bFxb4ybfMqzb1Lqvz0ywEpvO43rPr8ZbVGdHqiA/viewform";
// ────────────────────────────────────────────────────────────────────────

const REGISTER_URL = "https://api.eaindigenousseedconference.org/";
const SESSION_DISMISS_KEY = "eaisc_popup_dismissed";

const Countdown = () => {
  const eventDate = new Date("2026-11-17T09:00:00").getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = eventDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Tick the countdown every second, only while the popup is open.
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  // Show once per browser session, after a brief delay so it doesn't
  // slam the visitor the instant the page paints.
  useEffect(() => {
    const alreadyDismissed = sessionStorage.getItem(SESSION_DISMISS_KEY);
    if (alreadyDismissed) return;

    const showTimer = setTimeout(() => setIsOpen(true), 700);
    return () => clearTimeout(showTimer);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    sessionStorage.setItem(SESSION_DISMISS_KEY, "true");
  }, []);

  // Close on Escape, and move focus to the close button on open.
  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    // Prevent background scroll while the popup is open.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, handleClose]);

  const formatNumber = (num: number): string => (num < 10 ? `0${num}` : num.toString());
  const eventHasStarted = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  if (!isOpen) return null;

  return (
    <div
      className="eaisc-popup-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className="eaisc-popup-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="eaisc-popup-title"
      >
        <button
          ref={closeButtonRef}
          className="eaisc-popup-close"
          onClick={handleClose}
          aria-label="Close popup"
        >
          ✕
        </button>

        <div className="eaisc-popup-poster">
          <img src={posterImage} alt="EA-ISC 2026 official conference poster" />
        </div>

        <div className="eaisc-popup-content">
          <p className="eaisc-popup-eyebrow">1st Eastern Africa Indigenous Seed Conference</p>
          <h2 id="eaisc-popup-title" className="eaisc-popup-title">
            {eventHasStarted ? "Happening Now!" : "Conference Begins In"}
          </h2>
          <p className="eaisc-popup-subtitle">
            17–20 November 2026 · Catholic University of Eastern Africa, Nairobi
          </p>

          {!eventHasStarted && (
            <div className="eaisc-popup-timer" aria-live="polite">
              <div className="eaisc-popup-timer-unit">
                <span className="eaisc-popup-timer-value">{formatNumber(timeLeft.days)}</span>
                <span className="eaisc-popup-timer-label">Days</span>
              </div>
              <span className="eaisc-popup-timer-sep">:</span>
              <div className="eaisc-popup-timer-unit">
                <span className="eaisc-popup-timer-value">{formatNumber(timeLeft.hours)}</span>
                <span className="eaisc-popup-timer-label">Hrs</span>
              </div>
              <span className="eaisc-popup-timer-sep">:</span>
              <div className="eaisc-popup-timer-unit">
                <span className="eaisc-popup-timer-value">{formatNumber(timeLeft.minutes)}</span>
                <span className="eaisc-popup-timer-label">Min</span>
              </div>
              <span className="eaisc-popup-timer-sep">:</span>
              <div className="eaisc-popup-timer-unit">
                <span className="eaisc-popup-timer-value">{formatNumber(timeLeft.seconds)}</span>
                <span className="eaisc-popup-timer-label">Sec</span>
              </div>
            </div>
          )}

          <a href={REGISTER_URL} className="eaisc-popup-register-btn">
            Register Now
            <span aria-hidden="true">→</span>
          </a>

          <a
            href={SIDE_EVENT_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="eaisc-popup-side-link"
          >
            Apply for a Side Event
          </a>

          <p className="eaisc-popup-abstract-notice">
            Abstract submissions are now closed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Countdown;