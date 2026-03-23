// pages/CheckIn.tsx
import { useState, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useAuth } from "../hooks/useAuth";
import "../styles/CheckIn.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

interface Participant {
  id: string;
  fullName: string;
  email: string;
  country: string;
  organization: string;
  registrationType: string;
  excursion: boolean;
  galaDinner: boolean;
  amount: number;
  checkedIn: boolean;
  checkedInAt: string | null;
  checkedInBy: string | null;
}

type Stage = "idle" | "loading" | "found" | "checkedin" | "already" | "invalid" | "error";
type InputMode = "manual" | "camera";

const TYPE_COLORS: Record<string, string> = {
  delegate: "#3182CE", farmer: "#38A169",
  virtual: "#805AD5", student: "#DD6B20",
  vip: "#C99A2E", speaker: "#B7791F",
};

// Extract participant ID from either a plain UUID or a full URL
// e.g. "https://yoursite.com/checkin?id=abc-123" → "abc-123"
const extractId = (raw: string): string => {
  try {
    const url = new URL(raw);
    const id = url.searchParams.get("id");
    if (id) return id;
  } catch { /* not a URL — use raw value */ }
  return raw.trim();
};

const CheckIn = () => {
  const { token, role, loading: authLoading, error: authError, login, logout, authFetch } = useAuth();

  const [passwordInput, setPasswordInput] = useState("");
  const [staffName, setStaffName] = useState(() => localStorage.getItem("checkin_staff") || "");
  const [loginLoading, setLoginLoading] = useState(false);

  const [query, setQuery] = useState("");
  const [stage, setStage] = useState<Stage>("idle");
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [totalCheckedIn, setTotalCheckedIn] = useState<number | null>(null);

  // QR scanner state
  const [inputMode, setInputMode] = useState<InputMode>("camera");
  const [scannerActive, setScannerActive] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannerDivId = "qr-reader";

  // Auto-read ?id= from URL on mount (QR code link opened externally)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id && token) {
      setQuery(id);
      handleLookup(id);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchStats();
  }, [token]);

  // Start camera scanner
  useEffect(() => {
    if (!token || inputMode !== "camera" || scannerActive) return;

    const startScanner = async () => {
      setCameraError("");
      try {
        // Small delay to ensure the div is rendered
        await new Promise(r => setTimeout(r, 200));

        const scanner = new Html5Qrcode(scannerDivId);
        scannerRef.current = scanner;

        await scanner.start(
          { facingMode: "environment" }, // use rear camera on phones
          {
            fps: 10,
            qrbox: { width: 240, height: 240 },
            aspectRatio: 1.0,
          },
          (decodedText) => {
            // QR scanned successfully
            const id = extractId(decodedText);
            setQuery(id);
            stopScanner();
            handleLookup(id);
          },
          () => { /* scan failure — ignore, keep scanning */ }
        );

        setScannerActive(true);
      } catch (err: any) {
        const msg = err?.message || String(err);
        if (msg.includes("Permission") || msg.includes("NotAllowed")) {
          setCameraError("Camera permission denied. Please allow camera access or use manual entry.");
        } else if (msg.includes("NotFound") || msg.includes("no camera")) {
          setCameraError("No camera found on this device. Use manual entry below.");
        } else {
          setCameraError("Could not start camera. Use manual entry below.");
        }
        setInputMode("manual");
      }
    };

    startScanner();

    return () => { stopScanner(); };
  }, [token, inputMode]);

  // Stop scanner when a participant is found or on unmount
  useEffect(() => {
    if (stage !== "idle" && stage !== "loading") {
      stopScanner();
    }
  }, [stage]);

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        const state = scannerRef.current.getState();
        // state 2 = SCANNING
        if (state === 2) await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch { /* already stopped */ }
      scannerRef.current = null;
    }
    setScannerActive(false);
  };

  const restartScanner = async () => {
    await stopScanner();
    setInputMode("camera");
    reset();
  };

  const fetchStats = async () => {
    try {
      const res = await authFetch(`${BACKEND_URL}/admin/stats`);
      if (res.ok) {
        const data = await res.json();
        setTotalCheckedIn(data.registrations?.checkedIn ?? null);
      }
    } catch { /* optional */ }
  };

  const saveStaffName = (name: string) => {
    setStaffName(name);
    localStorage.setItem("checkin_staff", name);
  };

  const handleLogin = async () => {
    if (!passwordInput.trim()) return;
    setLoginLoading(true);
    await login(passwordInput);
    setLoginLoading(false);
    setPasswordInput("");
  };

  const handleLookup = async (id?: string) => {
    const lookupId = extractId(id || query);
    if (!lookupId) return;

    setStage("loading");
    setParticipant(null);
    setErrorMsg("");

    try {
      const res = await fetch(`${BACKEND_URL}/verify-ticket/${lookupId}`);
      const data = await res.json();

      if (!data.valid) {
        setErrorMsg(data.error || "Invalid ticket");
        setStage("invalid");
        return;
      }

      setParticipant(data.participant);
      setStage(data.participant.checkedIn ? "already" : "found");
    } catch {
      setErrorMsg("Network error. Check your connection.");
      setStage("error");
    }
  };

  const handleCheckIn = async () => {
    if (!participant) return;
    setStage("loading");

    try {
      const res = await authFetch(`${BACKEND_URL}/checkin/${participant.id}`, {
        method: "PATCH",
        body: JSON.stringify({ staffName: staffName || role || "staff" }),
      });
      const data = await res.json();

      if (res.status === 409 || data.alreadyCheckedIn) { setStage("already"); return; }
      if (!res.ok) { setErrorMsg(data.error || "Check-in failed"); setStage("error"); return; }

      setParticipant(prev => prev
        ? { ...prev, checkedIn: true, checkedInAt: new Date().toISOString(), checkedInBy: staffName }
        : null
      );
      setStage("checkedin");
      fetchStats();
    } catch {
      setErrorMsg("Network error during check-in.");
      setStage("error");
    }
  };

  const reset = () => {
    setQuery("");
    setParticipant(null);
    setStage("idle");
    setErrorMsg("");
    window.history.replaceState({}, "", window.location.pathname);
  };

  const accentColor = participant
    ? (TYPE_COLORS[participant.registrationType?.toLowerCase()] || "#1e4a6b")
    : "#1e4a6b";

  // ── LOADING ───────────────────────────────────────────
  if (authLoading) {
    return (
      <div className="ci ci--center">
        <span className="ci__spinner" /> Checking session…
      </div>
    );
  }

  // ── LOGIN SCREEN ──────────────────────────────────────
  if (!token) {
    return (
      <div className="ci ci--login">
        <div className="ci__login-card">
          <p className="ci__eyebrow-small">EA Indigenous Seed Conference 2026</p>
          <h1 className="ci__login-title">Staff Check-in</h1>
          <p className="ci__login-hint">Sign in with your staff or admin password to continue.</p>

          {authError && (
            <div className="ci__alert ci__alert--error">
              <span>{authError}</span>
            </div>
          )}

          <input
            className="ci__input"
            type="password"
            placeholder="Enter your password"
            value={passwordInput}
            onChange={e => setPasswordInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            autoFocus
          />
          <button
            className="ci__btn ci__btn--login"
            onClick={handleLogin}
            disabled={loginLoading || !passwordInput.trim()}
          >
            {loginLoading ? <><span className="ci__spinner" /> Signing in…</> : "Sign in"}
          </button>
        </div>
      </div>
    );
  }

  // ── MAIN CHECK-IN INTERFACE ───────────────────────────
  return (
    <div className="ci">

      {/* HEADER */}
      <div className="ci__header">
        <div className="ci__header-inner">
          <div>
            <p className="ci__eyebrow">1st EA Indigenous Seed Conference 2026</p>
            <h1 className="ci__title">Check-in</h1>
          </div>
          <div className="ci__header-right">
            {totalCheckedIn !== null && (
              <div className="ci__counter">
                <span className="ci__counter-num">{totalCheckedIn}</span>
                <span className="ci__counter-label">checked in</span>
              </div>
            )}
            <button className="ci__btn ci__btn--signout" onClick={() => { stopScanner(); logout(); }}>
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="ci__body">

        {/* STAFF NAME */}
        <div className="ci__staff-row">
          <label className="ci__label">Your name (recorded with each check-in)</label>
          <input
            className="ci__input ci__input--sm"
            type="text"
            value={staffName}
            onChange={e => saveStaffName(e.target.value)}
            placeholder="e.g. Jane Kamau"
          />
        </div>

        {/* RESULT CARD — shown above scanner when result is ready */}
        {participant && stage !== "idle" && stage !== "loading" && (
          <div className="ci__card" style={{ "--accent": accentColor } as React.CSSProperties}>
            <div className="ci__card-header">
              <div>
                <span className="ci__type-badge" style={{ background: accentColor }}>
                  {participant.registrationType?.toUpperCase()}
                </span>
                <h2 className="ci__name">{participant.fullName}</h2>
                <p className="ci__meta">
                  {participant.organization}{participant.country ? ` · ${participant.country}` : ""}
                </p>
              </div>
              {stage === "checkedin" && <div className="ci__status ci__status--success">✓ Checked in</div>}
              {stage === "already"   && <div className="ci__status ci__status--warn">Already in</div>}
            </div>

            <div className="ci__card-details">
              {participant.excursion  && <span className="ci__tag">🌱 Field Excursion</span>}
              {participant.galaDinner && <span className="ci__tag">🍽️ Gala Dinner</span>}
              <span className="ci__tag ci__tag--amount">${participant.amount}</span>
            </div>

            {stage === "already" && participant.checkedInAt && (
              <p className="ci__already-msg">
                Checked in at {new Date(participant.checkedInAt).toLocaleTimeString()}
                {participant.checkedInBy ? ` by ${participant.checkedInBy}` : ""}
              </p>
            )}

            <div className="ci__card-actions">
              {stage === "found" && (
                <button className="ci__btn ci__btn--confirm" onClick={handleCheckIn}>
                  ✓ Confirm Check-in
                </button>
              )}
              <button
                className="ci__btn ci__btn--reset"
                onClick={inputMode === "camera" ? restartScanner : reset}
              >
                {stage === "checkedin" || stage === "already" ? "Scan next" : "Try again"}
              </button>
            </div>
          </div>
        )}

        {/* ERROR STATE */}
        {(stage === "invalid" || stage === "error") && (
          <div className="ci__alert ci__alert--error">
            <span className="ci__alert-icon">✕</span>
            <div>
              <p className="ci__alert-title">{stage === "invalid" ? "Invalid ticket" : "Something went wrong"}</p>
              <p className="ci__alert-msg">{errorMsg}</p>
            </div>
            <button
              className="ci__btn ci__btn--reset"
              onClick={inputMode === "camera" ? restartScanner : reset}
            >
              Try again
            </button>
          </div>
        )}

        {/* LOADING STATE */}
        {stage === "loading" && (
          <div className="ci__loading-state">
            <span className="ci__spinner ci__spinner--lg" />
            <p>Looking up attendee…</p>
          </div>
        )}

        {/* QR SCANNER / MANUAL INPUT — only show when idle */}
        {(stage === "idle") && (
          <>
            {/* MODE TOGGLE */}
            <div className="ci__mode-tabs">
              <button
                className={`ci__mode-tab ${inputMode === "camera" ? "is-active" : ""}`}
                onClick={() => { reset(); setInputMode("camera"); }}
              >
                📷 Scan QR
              </button>
              <button
                className={`ci__mode-tab ${inputMode === "manual" ? "is-active" : ""}`}
                onClick={() => { stopScanner(); setInputMode("manual"); }}
              >
                ⌨️ Manual entry
              </button>
            </div>

            {/* CAMERA SCANNER */}
            {inputMode === "camera" && (
              <div className="ci__scanner-wrap">
                {cameraError ? (
                  <div className="ci__camera-error">
                    <p>{cameraError}</p>
                    <button className="ci__btn ci__btn--look" onClick={() => setInputMode("manual")}>
                      Switch to manual entry
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="ci__scanner-frame">
                      <div id={scannerDivId} className="ci__scanner-video" />
                      {!scannerActive && (
                        <div className="ci__scanner-starting">
                          <span className="ci__spinner ci__spinner--lg" />
                          <p>Starting camera…</p>
                        </div>
                      )}
                      {scannerActive && (
                        <div className="ci__scanner-overlay">
                          <div className="ci__scanner-corners">
                            <span /><span /><span /><span />
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="ci__scanner-hint">Point the camera at the QR code on the ticket</p>
                  </>
                )}
              </div>
            )}

            {/* MANUAL ENTRY */}
            {inputMode === "manual" && (
              <div className="ci__manual-wrap">
                <label className="ci__label">Participant ID or ticket URL</label>
                <div className="ci__search-row">
                  <input
                    className="ci__input"
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleLookup()}
                    placeholder="Paste the participant ID here…"
                    autoFocus
                  />
                  <button
                    className="ci__btn ci__btn--look"
                    onClick={() => handleLookup()}
                    disabled={!query.trim()}
                  >
                    Look up
                  </button>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};

export default CheckIn;