import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext(null);

const STORAGE_KEY = "taskflow_theme";

function getSystemPrefersDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(
    () => localStorage.getItem(STORAGE_KEY) || "system"
  );

  useEffect(() => {
    const root = document.documentElement;

    function applyTheme() {
      const resolved = theme === "system" ? (getSystemPrefersDark() ? "dark" : "light") : theme;
      root.classList.toggle("dark", resolved === "dark");
    }

    applyTheme();

    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      mq.addEventListener("change", applyTheme);
      return () => mq.removeEventListener("change", applyTheme);
    }
  }, [theme]);

  function setTheme(value) {
    localStorage.setItem(STORAGE_KEY, value);
    setThemeState(value);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}