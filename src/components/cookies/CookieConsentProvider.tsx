"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  allCookiePreferences,
  defaultCookiePreferences,
  readCookieConsent,
  writeCookieConsent,
  type CookieConsentRecord,
  type CookiePreferences,
} from "@/lib/cookies/consent";

type CookieConsentContextValue = {
  consent: CookieConsentRecord | null;
  showBanner: boolean;
  showPreferences: boolean;
  draftPreferences: CookiePreferences;
  acceptAll: () => void;
  declineAll: () => void;
  openPreferences: () => void;
  closePreferences: () => void;
  setDraftPreference: (key: keyof CookiePreferences, value: boolean) => void;
  savePreferences: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

function persistConsent(choice: CookieConsentRecord["choice"], preferences: CookiePreferences) {
  const record: CookieConsentRecord = {
    choice,
    preferences,
    updatedAt: new Date().toISOString(),
  };

  writeCookieConsent(record);
  return record;
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsentRecord | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [draftPreferences, setDraftPreferences] =
    useState<CookiePreferences>(defaultCookiePreferences);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readCookieConsent();
    setConsent(stored);
    setDraftPreferences(stored?.preferences ?? defaultCookiePreferences);
    setShowBanner(!stored);
    setReady(true);
  }, []);

  const acceptAll = useCallback(() => {
    const record = persistConsent("accepted", allCookiePreferences);
    setConsent(record);
    setDraftPreferences(allCookiePreferences);
    setShowBanner(false);
    setShowPreferences(false);
  }, []);

  const declineAll = useCallback(() => {
    const record = persistConsent("declined", defaultCookiePreferences);
    setConsent(record);
    setDraftPreferences(defaultCookiePreferences);
    setShowBanner(false);
    setShowPreferences(false);
  }, []);

  const openPreferences = useCallback(() => {
    setDraftPreferences(consent?.preferences ?? defaultCookiePreferences);
    setShowPreferences(true);
  }, [consent]);

  const closePreferences = useCallback(() => {
    setShowPreferences(false);
  }, []);

  const setDraftPreference = useCallback((key: keyof CookiePreferences, value: boolean) => {
    setDraftPreferences((current) => ({ ...current, [key]: value }));
  }, []);

  const savePreferences = useCallback(() => {
    const hasAnyOptional = draftPreferences.experience || draftPreferences.analytics;
    const choice = hasAnyOptional ? "custom" : "declined";
    const record = persistConsent(choice, draftPreferences);
    setConsent(record);
    setShowBanner(false);
    setShowPreferences(false);
  }, [draftPreferences]);

  const value = useMemo(
    () => ({
      consent: ready ? consent : null,
      showBanner: ready && showBanner,
      showPreferences,
      draftPreferences,
      acceptAll,
      declineAll,
      openPreferences,
      closePreferences,
      setDraftPreference,
      savePreferences,
    }),
    [
      ready,
      consent,
      showBanner,
      showPreferences,
      draftPreferences,
      acceptAll,
      declineAll,
      openPreferences,
      closePreferences,
      setDraftPreference,
      savePreferences,
    ],
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return context;
}
