"use client";

import { useCookieConsent } from "@/components/cookies/CookieConsentProvider";

type CookiePreferencesButtonProps = {
  className?: string;
};

export function CookiePreferencesButton({ className }: CookiePreferencesButtonProps) {
  const { openPreferences } = useCookieConsent();

  return (
    <button type="button" onClick={openPreferences} className={className}>
      Cookie Preferences
    </button>
  );
}
