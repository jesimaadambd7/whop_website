export const COOKIE_CONSENT_STORAGE_KEY = "ugcviss-cookie-consent";

export type CookieConsentChoice = "accepted" | "declined" | "custom";

export type CookiePreferences = {
  experience: boolean;
  analytics: boolean;
};

export type CookieConsentRecord = {
  choice: CookieConsentChoice;
  preferences: CookiePreferences;
  updatedAt: string;
};

export const defaultCookiePreferences: CookiePreferences = {
  experience: false,
  analytics: false,
};

export const allCookiePreferences: CookiePreferences = {
  experience: true,
  analytics: true,
};

export function readCookieConsent(): CookieConsentRecord | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as CookieConsentRecord;
    if (!parsed?.choice || !parsed?.preferences) return null;

    return parsed;
  } catch {
    return null;
  }
}

export function writeCookieConsent(record: CookieConsentRecord) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(record));
  window.dispatchEvent(new CustomEvent("ugcviss:cookie-consent", { detail: record }));
}
