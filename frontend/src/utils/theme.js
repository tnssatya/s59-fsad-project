export const THEME_STORAGE_KEY = "task_profile_theme_v2";

export const THEME_COLORS = {
  blue: { hex: "#2563EB", rgb: "37 99 235" },
  green: { hex: "#10B981", rgb: "16 185 129" },
  purple: { hex: "#8B5CF6", rgb: "139 92 246" },
  orange: { hex: "#F97316", rgb: "249 115 22" },
  pink: { hex: "#EC4899", rgb: "236 72 153" },
  teal: { hex: "#14B8A6", rgb: "20 184 166" },
  gray: { hex: "#6B7280", rgb: "107 114 128" },
};

export const THEME_COLOR_KEYS = Object.keys(THEME_COLORS);

export function getSystemThemeMode() {
  return typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function getInitialThemeFromLocalStorage() {
  const fallbackMode = getSystemThemeMode();

  const fallback = {
    mode: fallbackMode,
    primaryColor: "blue",
  };

  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (!raw) return fallback;

    const parsed = JSON.parse(raw);
    const mode =
      parsed?.mode === "dark"
        ? "dark"
        : parsed?.mode === "light"
          ? "light"
          : fallback.mode;
    const primaryColor = THEME_COLOR_KEYS.includes(parsed?.primaryColor)
      ? parsed.primaryColor
      : fallback.primaryColor;

    return { mode, primaryColor };
  } catch {
    return fallback;
  }
}

export function saveThemeToLocalStorage(theme) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
}
