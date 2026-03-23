// hooks/useAuth.ts
// Shared auth hook used by both AdminDashboard and CheckIn pages.
// Stores the JWT token in sessionStorage so it's automatically
// cleared when the browser tab or window is closed.

import { useState, useEffect, useCallback } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://conference-backend-m5hq.onrender.com";
const TOKEN_KEY = "ea_conf_token";
const ROLE_KEY  = "ea_conf_role";

export type Role = "admin" | "staff" | null;

export interface AuthState {
  token: string | null;
  role: Role;
  loading: boolean;         // true while verifying token on mount
  error: string;
}

export interface UseAuthReturn extends AuthState {
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  authFetch: (url: string, options?: RequestInit) => Promise<Response>;
}

export function useAuth(): UseAuthReturn {
  const [token, setToken] = useState<string | null>(
    () => sessionStorage.getItem(TOKEN_KEY)
  );
  const [role, setRole] = useState<Role>(
    () => sessionStorage.getItem(ROLE_KEY) as Role
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // On mount, verify the stored token is still valid
  useEffect(() => {
    const verify = async () => {
      const stored = sessionStorage.getItem(TOKEN_KEY);
      if (!stored) { setLoading(false); return; }

      try {
        const res = await fetch(`${BACKEND_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${stored}` },
        });
        if (res.ok) {
          const data = await res.json();
          setToken(stored);
          setRole(data.role);
        } else {
          // Token expired or invalid — clear it
          sessionStorage.removeItem(TOKEN_KEY);
          sessionStorage.removeItem(ROLE_KEY);
          setToken(null);
          setRole(null);
        }
      } catch {
        // Network error — keep token, try again later
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, []);

  const login = useCallback(async (password: string): Promise<boolean> => {
    setError("");
    try {
      const res = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed.");
        return false;
      }

      sessionStorage.setItem(TOKEN_KEY, data.token);
      sessionStorage.setItem(ROLE_KEY, data.role);
      setToken(data.token);
      setRole(data.role);
      return true;

    } catch {
      setError("Network error. Check your connection.");
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(ROLE_KEY);
    setToken(null);
    setRole(null);
  }, []);

  // Authenticated fetch — automatically attaches the token
  // and handles 401 (session expired) gracefully
  const authFetch = useCallback(async (url: string, options?: RequestInit): Promise<Response> => {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 401) {
      const data = await res.clone().json().catch(() => ({}));
      if (data.expired) {
        // Auto-logout on expiry
        sessionStorage.removeItem(TOKEN_KEY);
        sessionStorage.removeItem(ROLE_KEY);
        setToken(null);
        setRole(null);
      }
    }

    return res;
  }, [token]);

  return { token, role, loading, error, login, logout, authFetch };
}