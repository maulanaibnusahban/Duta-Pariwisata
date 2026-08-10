export const TOKEN_KEY = "dpi_auth_token";
export const VOTER_KEY = "dpi_auth_voter";

// ─── Token ───────────────────────────────────────────────────────────────────

export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

export const setToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

export const removeToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
  }
};

// ─── Voter (untuk persistensi antar refresh) ─────────────────────────────────

export const getStoredVoter = <T>(): T | null => {
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(VOTER_KEY);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  }
  return null;
};

export const setStoredVoter = <T>(voter: T): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(VOTER_KEY, JSON.stringify(voter));
  }
};

export const removeStoredVoter = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(VOTER_KEY);
  }
};
