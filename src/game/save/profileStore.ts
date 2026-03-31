import type { ProfileData } from "../types";

const STORAGE_KEY = "rush-hour-survivor/profile";

export const DEFAULT_PROFILE: ProfileData = {
  bestScore: 0,
  tutorialSeen: false,
  audioMuted: false
};

export function loadProfile(): ProfileData {
  if (typeof window === "undefined" || !window.localStorage) {
    return DEFAULT_PROFILE;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return DEFAULT_PROFILE;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<ProfileData>;
    return {
      bestScore: Number.isFinite(parsed.bestScore) ? parsed.bestScore ?? 0 : 0,
      tutorialSeen: Boolean(parsed.tutorialSeen),
      audioMuted: Boolean(parsed.audioMuted)
    };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(profile: ProfileData): void {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

