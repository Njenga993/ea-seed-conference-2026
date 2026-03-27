// pages/AdminDashboard.tsx
import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../hooks/useAuth";
import "../styles/AdminDashboard.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://conference-backend-m5hq.onrender.com";

interface Stats {
  registrations: { total: number; paid: number; pending: number; failed: number; checkedIn: number };
  byType: Record<string, number>;
  totalRevenue: number;
}

interface Participant {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  dialCode: string;
  country: string;
  organization: string;
  position: string;
  category: string;
  registrationType: string;
  amount: number;
  paymentStatus: string;
  paymentReference: string;
  checkedIn: number;
  checkedInAt: string | null;
  checkedInBy: string | null;
  excursion: number;
  galaDinner: number;
  hearAbout: string;
  dietaryRestrictions: string;
  accommodation: string;
  specialNeeds: string;
  createdAt: string;
}

const TYPE_COLORS: Record<string, string> = {
  delegate: "#3182CE", 
  farmer: "#38A169",
  virtual: "#805AD5", 
  student: "#DD6B20",
  vip: "#C99A2E", 
  speaker: "#B7791F",
};

const AdminDashboard = () => {
  const { token, role, loading: authLoading, error: authError, login, logout, authFetch } = useAuth();

  const [passwordInput, setPasswordInput] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [stats, setStats] = useState<Stats | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [dataError, setDataError] = useState("");

  const [statusFilter, setStatusFilter] = useState("paid");
  const [typeFilter, setTypeFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [resendingId, setResendingId] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  };

  const loadData = useCallback(async () => {
    if (!token || role !== "admin") return;
    setDataLoading(true);
    setDataError("");
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set("status", statusFilter);
      if (typeFilter) params.set("type", typeFilter);

      const [statsRes, participantsRes] = await Promise.all([
        authFetch(`${BACKEND_URL}/admin/stats`),
        authFetch(`${BACKEND_URL}/admin/participants?${params}`),
      ]);

      if (!statsRes.ok || !participantsRes.ok) {
        setDataError("Failed to load data.");
        return;
      }

      const [statsData, participantsData] = await Promise.all([
        statsRes.json(), 
        participantsRes.json(),
      ]);

      setStats(statsData);
      setParticipants(participantsData);
    } catch {
      setDataError("Network error. Check your connection.");
    } finally {
      setDataLoading(false);
    }
  }, [token, role, statusFilter, typeFilter, authFetch]);

  useEffect(() => {
    if (token && role === "admin") loadData();
  }, [token, role, loadData]);

  const handleLogin = async () => {
    if (!passwordInput.trim()) return;
    setLoginLoading(true);
    const ok = await login(passwordInput);
    setLoginLoading(false);
    if (!ok) setPasswordInput("");
  };

  const handleResend = async (participantId: string) => {
    setResendingId(participantId);
    try {
      const res = await authFetch(`${BACKEND_URL}/admin/resend-ticket/${participantId}`, { method: "POST" });
      const data = await res.json();
      showToast(res.ok ? "✅ Ticket resent" : "❌ " + data.error);
    } catch { 
      showToast("❌ Network error"); 
    } finally { 
      setResendingId(null); 
    }
  };

  const handleUndoCheckin = async (participantId: string) => {
    try {
      const res = await authFetch(`${BACKEND_URL}/admin/undo-checkin/${participantId}`, { method: "PATCH" });
      const data = await res.json();
      if (res.ok) { 
        showToast("✅ Check-in reversed"); 
        loadData(); 
      } else {
        showToast("❌ " + data.error);
      }
    } catch { 
      showToast("❌ Network error"); 
    }
  };

  const handleExport = async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set("status", statusFilter);
      if (typeFilter) params.set("type", typeFilter);
      const res = await authFetch(`${BACKEND_URL}/admin/export?${params}`);
      if (!res.ok) { 
        showToast("❌ Export failed"); 
        return; 
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `participants-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      showToast("✅ CSV exported");
    } catch { 
      showToast("❌ Export failed"); 
    }
  };

  const filtered = participants.filter(p => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.fullName?.toLowerCase().includes(q) ||
      p.email?.toLowerCase().includes(q) ||
      p.country?.toLowerCase().includes(q) ||
      p.organization?.toLowerCase().includes(q) ||
      p.phone?.toLowerCase().includes(q)
    );
  });

  // ── LOADING ──────────────────────────────────────
  if (authLoading) {
    return (
      <div className="adm adm--center">
        <span className="adm__spinner" /> Checking session…
      </div>
    );
  }

  // ── LOGIN SCREEN ─────────────────────────────────
  if (!token) {
    return (
      <div className="adm adm--login">
        <div className="adm__login-card">
          <div className="adm__login-logo">
            <p className="adm__eyebrow">EA Indigenous Seed Conference 2026</p>
            <h1>Admin Panel</h1>
          </div>
          {authError && (
            <div className="adm__alert adm__alert--error">{authError}</div>
          )}
          <div className="adm__field">
            <label className="adm__label">Password</label>
            <input
              className="adm__input"
              type="password"
              placeholder="Enter your password"
              value={passwordInput}
              onChange={e => setPasswordInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              autoFocus
            />
          </div>
          <button
            className="adm__btn adm__btn--primary"
            onClick={handleLogin}
            disabled={loginLoading || !passwordInput.trim()}
          >
            {loginLoading ? (
              <><span className="adm__spinner adm__spinner--sm" /> Signing in…</>
            ) : (
              "Sign in"
            )}
          </button>
        </div>
      </div>
    );
  }

  // ── WRONG ROLE ───────────────────────────────────
  if (role !== "admin") {
    return (
      <div className="adm adm--center">
        <div className="adm__role-error">
          <h2>Access restricted</h2>
          <p>You are logged in as <strong>{role}</strong>. Admin dashboard requires an admin account.</p>
          <button className="adm__btn adm__btn--outline" onClick={logout}>Sign out</button>
        </div>
      </div>
    );
  }

  // ── DASHBOARD ────────────────────────────────────
  return (
    <div className="adm">
      {toast && <div className="adm__toast">{toast}</div>}

      {/* TOP BAR */}
      <div className="adm__topbar">
        <div className="adm__topbar-inner">
          <div>
            <p className="adm__eyebrow">Admin Panel</p>
            <h1 className="adm__heading">EA Seed Conference 2026</h1>
          </div>
          <div className="adm__topbar-actions">
            <span className="adm__role-pill">admin</span>
            <button className="adm__btn adm__btn--ghost" onClick={loadData} disabled={dataLoading}>
              {dataLoading ? "Loading…" : "↻ Refresh"}
            </button>
            <button className="adm__btn adm__btn--export" onClick={handleExport}>↓ CSV</button>
            <button className="adm__btn adm__btn--logout" onClick={logout}>Sign out</button>
          </div>
        </div>
      </div>

      <div className="adm__body">
        {dataError && <div className="adm__alert adm__alert--error">{dataError}</div>}

        {/* STAT CARDS */}
        {stats && (
          <div className="adm__stats">
            <div className="adm__stat adm__stat--primary">
              <span className="adm__stat-val">{stats.registrations.paid}</span>
              <span className="adm__stat-label">Paid registrations</span>
            </div>
            <div className="adm__stat adm__stat--green">
              <span className="adm__stat-val">{stats.registrations.checkedIn}</span>
              <span className="adm__stat-label">Checked in</span>
              <span className="adm__stat-sub">
                {stats.registrations.paid > 0
                  ? Math.round((stats.registrations.checkedIn / stats.registrations.paid) * 100) + "% arrived"
                  : "0% arrived"}
              </span>
            </div>
            <div className="adm__stat adm__stat--gold">
              <span className="adm__stat-val">${stats.totalRevenue.toLocaleString()}</span>
              <span className="adm__stat-label">Total revenue</span>
            </div>
            <div className="adm__stat">
              <span className="adm__stat-val">{stats.registrations.pending}</span>
              <span className="adm__stat-label">Pending payment</span>
            </div>
          </div>
        )}

        {/* TYPE BREAKDOWN */}
        {stats && Object.keys(stats.byType).length > 0 && (
          <div className="adm__breakdown">
            {Object.entries(stats.byType).map(([type, count]) => (
              <div key={type} className="adm__breakdown-item">
                <span className="adm__breakdown-dot" style={{ background: TYPE_COLORS[type] || "#888" }} />
                <span className="adm__breakdown-type">{type}</span>
                <span className="adm__breakdown-count">{count}</span>
              </div>
            ))}
          </div>
        )}

        {/* FILTERS */}
        <div className="adm__filters">
          <input
            className="adm__input adm__input--search"
            type="text"
            placeholder="Search name, email, country, phone…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <select 
            className="adm__select" 
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="">All statuses</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
          <select 
            className="adm__select" 
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
          >
            <option value="">All types</option>
            <option value="delegate">Delegate</option>
            <option value="farmer">Farmer</option>
            <option value="virtual">Virtual</option>
            <option value="student">Student</option>
          </select>
          <button className="adm__btn adm__btn--apply" onClick={loadData}>Apply</button>
        </div>

        {/* TABLE */}
        <div className="adm__table-wrap">
          {dataLoading ? (
            <div className="adm__loading"><span className="adm__spinner" /> Loading…</div>
          ) : filtered.length === 0 ? (
            <div className="adm__empty">No participants found.</div>
          ) : (
            <>
              <table className="adm__table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Country</th>
                    <th>Status</th>
                    <th>Check-in</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(p => (
                    <React.Fragment key={p.id}>
                      {/* MAIN ROW */}
                      <tr className={p.checkedIn ? "adm__row--checkedin" : ""}>
                        <td>
                          <button
                            className="adm__expand-btn"
                            onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}
                            title="Click to expand details"
                          >
                            {expandedId === p.id ? "▼" : "▶"}
                          </button>
                          <div className="adm__cell-name">{p.fullName}</div>
                          <div className="adm__cell-email">{p.email}</div>
                        </td>
                        <td>
                          <span className="adm__badge" style={{ background: TYPE_COLORS[p.registrationType] || "#888" }}>
                            {p.registrationType}
                          </span>
                        </td>
                        <td>
                          <div className="adm__cell-muted">{p.country}</div>
                          <div className="adm__cell-muted">{p.organization}</div>
                        </td>
                        <td>
                          <span className={`adm__status adm__status--${p.paymentStatus}`}>
                            {p.paymentStatus}
                          </span>
                        </td>
                        <td>
                          {p.checkedIn ? (
                            <div>
                              <span className="adm__status adm__status--checkedin">✓ In</span>
                              {p.checkedInAt && (
                                <div className="adm__cell-time">
                                  {new Date(p.checkedInAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                  {p.checkedInBy ? ` · ${p.checkedInBy}` : ""}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="adm__status adm__status--pending">Not yet</span>
                          )}
                        </td>
                        <td className="adm__cell-amount">${p.amount}</td>
                        <td>
                          <div className="adm__actions">
                            {p.paymentStatus === "paid" && (
                              <button 
                                className="adm__action-btn adm__action-btn--resend"
                                onClick={() => handleResend(p.id)} 
                                disabled={resendingId === p.id}
                              >
                                {resendingId === p.id ? "…" : "Resend"}
                              </button>
                            )}
                            {p.paymentStatus === "paid" && (
                              <a 
                                className="adm__action-btn adm__action-btn--view"
                                href={`${BACKEND_URL}/ticket/${p.id}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                              >
                                View
                              </a>
                            )}
                            {p.checkedIn ? (
                              <button 
                                className="adm__action-btn adm__action-btn--undo"
                                onClick={() => handleUndoCheckin(p.id)}
                              >
                                Undo
                              </button>
                            ) : null}
                          </div>
                        </td>
                      </tr>

                      {/* EXPANDED DETAILS ROW */}
                      {expandedId === p.id && (
                        <tr className="adm__expanded-row">
                          <td colSpan={7}>
                            <div className="adm__expanded-content">
                              <div className="adm__detail-grid">
                                {/* Column 1: Contact Info */}
                                <div className="adm__detail-col">
                                  <h4 className="adm__detail-heading">📱 Contact</h4>
                                  <div className="adm__detail-item">
                                    <span className="adm__detail-label">Phone</span>
                                    <span className="adm__detail-value">{p.dialCode || ""} {p.phone || "—"}</span>
                                  </div>
                                  <div className="adm__detail-item">
                                    <span className="adm__detail-label">Email</span>
                                    <span className="adm__detail-value">{p.email}</span>
                                  </div>
                                </div>

                                {/* Column 2: Professional Info */}
                                <div className="adm__detail-col">
                                  <h4 className="adm__detail-heading">💼 Professional</h4>
                                  <div className="adm__detail-item">
                                    <span className="adm__detail-label">Organization</span>
                                    <span className="adm__detail-value">{p.organization || "—"}</span>
                                  </div>
                                  <div className="adm__detail-item">
                                    <span className="adm__detail-label">Position</span>
                                    <span className="adm__detail-value">{p.position || "—"}</span>
                                  </div>
                                  <div className="adm__detail-item">
                                    <span className="adm__detail-label">Category</span>
                                    <span className="adm__detail-value">{p.category || "—"}</span>
                                  </div>
                                </div>

                                {/* Column 3: Preferences */}
                                <div className="adm__detail-col">
                                  <h4 className="adm__detail-heading">🎯 Preferences</h4>
                                  <div className="adm__detail-item">
                                    <span className="adm__detail-label">Heard about us</span>
                                    <span className="adm__detail-value">{p.hearAbout || "—"}</span>
                                  </div>
                                  <div className="adm__detail-item">
                                    <span className="adm__detail-label">Dietary restrictions</span>
                                    <span className="adm__detail-value">{p.dietaryRestrictions || "—"}</span>
                                  </div>
                                  <div className="adm__detail-item">
                                    <span className="adm__detail-label">Accommodation</span>
                                    <span className="adm__detail-value">{p.accommodation || "—"}</span>
                                  </div>
                                </div>

                                {/* Column 4: Payment & Registration */}
                                <div className="adm__detail-col">
                                  <h4 className="adm__detail-heading">💳 Payment</h4>
                                  <div className="adm__detail-item">
                                    <span className="adm__detail-label">Payment Status</span>
                                    <span className={`adm__detail-value adm__detail-status adm__detail-status--${p.paymentStatus}`}>
                                      {p.paymentStatus}
                                    </span>
                                  </div>
                                  <div className="adm__detail-item">
                                    <span className="adm__detail-label">Payment Ref</span>
                                    <span className="adm__detail-value adm__mono">{p.paymentReference || "—"}</span>
                                  </div>
                                  <div className="adm__detail-item">
                                    <span className="adm__detail-label">Registered</span>
                                    <span className="adm__detail-value">
                                      {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "—"}
                                    </span>
                                  </div>
                                </div>

                                {/* Column 5: Special Needs */}
                                <div className="adm__detail-col">
                                  <h4 className="adm__detail-heading">♿ Accessibility</h4>
                                  <div className="adm__detail-item">
                                    <span className="adm__detail-label">Special needs</span>
                                    <span className="adm__detail-value">{p.specialNeeds || "—"}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Add-ons Summary */}
                              {(p.excursion || p.galaDinner) && (
                                <div className="adm__addons-summary">
                                  <h4 className="adm__detail-heading">✨ Add-ons</h4>
                                  <div className="adm__addon-list">
                                    {p.excursion && <span className="adm__addon-tag">🌱 Field Excursion</span>}
                                    {p.galaDinner && <span className="adm__addon-tag">🍽️ Gala Dinner</span>}
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
              <p className="adm__count">Showing {filtered.length} of {participants.length} participants</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;