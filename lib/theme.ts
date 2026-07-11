"use client";

import { useEffect, useState } from "react";
import { lockedTheme, themeIds, type ThemeId } from "./direction-lock";

export { themeIds, type ThemeId } from "./direction-lock";

export const THEME_STORAGE_KEY = "bridge-theme";
const THEME_EVENT = "bridge-theme";

export function applyTheme(id: ThemeId) {
  if (lockedTheme) return; // staging builds are pinned to one direction
  document.documentElement.setAttribute("data-theme", id);
  window.localStorage.setItem(THEME_STORAGE_KEY, id);
  window.dispatchEvent(new CustomEvent<ThemeId>(THEME_EVENT, { detail: id }));
}

function isThemeId(value: string | null): value is ThemeId {
  return value !== null && (themeIds as readonly string[]).includes(value);
}

// Reflects the active provisional direction; stays "current" until mounted so
// server and client markup match. Locked builds always report the pinned id.
export function useTheme(): ThemeId {
  const [theme, setTheme] = useState<ThemeId>(lockedTheme ?? "current");

  useEffect(() => {
    if (lockedTheme) return;
    const syncFromDocument = () => {
      const active = document.documentElement.getAttribute("data-theme");
      if (isThemeId(active)) setTheme(active);
    };
    const frame = window.requestAnimationFrame(syncFromDocument);
    const syncFromEvent = (event: Event) => {
      const next = (event as CustomEvent<ThemeId>).detail;
      if (isThemeId(next)) setTheme(next);
    };
    window.addEventListener(THEME_EVENT, syncFromEvent);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener(THEME_EVENT, syncFromEvent);
    };
  }, []);

  return theme;
}
