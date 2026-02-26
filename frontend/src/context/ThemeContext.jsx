import { createContext, useEffect, useMemo, useState } from "react";
import {
  THEME_COLORS,
  getInitialThemeFromLocalStorage,
  getSystemThemeMode,
  saveThemeToLocalStorage,
} from "../utils/theme";

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(
    () => getInitialThemeFromLocalStorage().mode,
  );
  const [primaryColor, setPrimaryColor] = useState(
    () => getInitialThemeFromLocalStorage().primaryColor,
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", mode === "dark");

    const color = THEME_COLORS[primaryColor] || THEME_COLORS.blue;
    root.style.setProperty("--color-primary", color.hex);
    root.style.setProperty("--color-primary-rgb", color.rgb);
    root.style.setProperty(
      "--color-public-bg",
      mode === "dark" ? `rgb(${color.rgb} / 0.18)` : `rgb(${color.rgb} / 0.12)`,
    );
  }, [mode, primaryColor]);

  useEffect(() => {
    saveThemeToLocalStorage({ mode, primaryColor });
  }, [mode, primaryColor]);

  const value = useMemo(
    () => ({
      mode,
      primaryColor,
      setMode,
      setPrimaryColor,
      resetTheme: () => {
        setMode(getSystemThemeMode());
        setPrimaryColor("blue");
      },
      theme: mode,
      toggleTheme: () =>
        setMode((prev) => (prev === "dark" ? "light" : "dark")),
    }),
    [mode, primaryColor],
  );

  return (
    <ThemeContext.Provider value={value}>
      <div className={mode === "dark" ? "dark" : ""}>{children}</div>
    </ThemeContext.Provider>
  );
}
