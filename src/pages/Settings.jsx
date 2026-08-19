import { useState, useEffect } from "react";
import { useTheme } from "../hooks/useTheme";

const PREFS_KEY = "taskflow_preferences";

const defaultPrefs = {
  notifications: { taskReminders: true, projectUpdates: true, teamActivity: false },
  language: "Français",
  timezone: "GMT+0 (Abidjan)",
  dateFormat: "JJ/MM/AAAA",
};

function loadPrefs() {
  const stored = localStorage.getItem(PREFS_KEY);
  return stored ? JSON.parse(stored) : defaultPrefs;
}

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [prefs, setPrefs] = useState(loadPrefs);

  useEffect(() => {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  }, [prefs]);

  function toggleNotification(key) {
    setPrefs((p) => ({
      ...p,
      notifications: { ...p.notifications, [key]: !p.notifications[key] },
    }));
  }

  function updatePref(key, value) {
    setPrefs((p) => ({ ...p, [key]: value }));
  }

  const selectClass =
    "w-full px-4 py-3 rounded-lg border border-border text-base text-ink bg-paper focus:outline-none focus:ring-2 focus:ring-amber";

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="font-display text-3xl font-bold text-ink">Settings</h1>

      {/* Apparence */}
      <div className="bg-surface rounded-2xl border border-border p-6">
        <h2 className="font-display text-lg font-semibold text-ink mb-4">Appearance</h2>
        <div className="space-y-2">
          {[
            { value: "light", label: "Light" },
            { value: "dark", label: "Dark" },
            { value: "system", label: "System" },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border cursor-pointer hover:bg-paper transition-colors"
            >
              <input
                type="radio"
                name="theme"
                checked={theme === option.value}
                onChange={() => setTheme(option.value)}
                className="accent-amber w-4 h-4"
              />
              <span className="text-base text-ink">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-surface rounded-2xl border border-border p-6">
        <h2 className="font-display text-lg font-semibold text-ink mb-4">Notifications</h2>
        <div className="space-y-3">
          {[
            { key: "taskReminders", label: "Task reminders" },
            { key: "projectUpdates", label: "Project updates" },
            { key: "teamActivity", label: "Team activity" },
          ].map((item) => (
            <label key={item.key} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={prefs.notifications[item.key]}
                onChange={() => toggleNotification(item.key)}
                className="accent-amber w-4 h-4"
              />
              <span className="text-base text-ink">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Préférences */}
      <div className="bg-surface rounded-2xl border border-border p-6">
        <h2 className="font-display text-lg font-semibold text-ink mb-4">Préférences</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-base font-medium text-ink mb-1.5">Language</label>
            <select
              value={prefs.language}
              onChange={(e) => updatePref("language", e.target.value)}
              className={selectClass}
            >
              <option>Français</option>
              <option>English</option>
            </select>
          </div>
          <div>
            <label className="block text-base font-medium text-ink mb-1.5">Timezone</label>
            <select
              value={prefs.timezone}
              onChange={(e) => updatePref("timezone", e.target.value)}
              className={selectClass}
            >
              <option>GMT+0 (Abidjan)</option>
              <option>GMT+1 (Paris)</option>
              <option>GMT-5 (New York)</option>
            </select>
          </div>
          <div>
            <label className="block text-base font-medium text-ink mb-1.5">Date format</label>
            <select
              value={prefs.dateFormat}
              onChange={(e) => updatePref("dateFormat", e.target.value)}
              className={selectClass}
            >
              <option>JJ/MM/AAAA</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}