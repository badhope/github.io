'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface Settings {
  showAnimations: boolean;
  showParticles: boolean;
  volume: number;
  reducedMotion: boolean;
  highContrast: boolean;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => void;
}

const defaultSettings: Settings = {
  showAnimations: true,
  showParticles: true,
  volume: 50,
  reducedMotion: false,
  highContrast: false,
};

const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  updateSettings: () => {},
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  // Load settings from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('starbase-settings');
      if (saved) {
        setSettings({ ...defaultSettings, ...JSON.parse(saved) });
      }
    } catch {
      // Use defaults
    }

    // Check system preference for reduced motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSettings((prev) => ({ ...prev, reducedMotion: true, showAnimations: false }));
    }
  }, []);

  // Save settings to localStorage
  const updateSettings = useCallback((updates: Partial<Settings>) => {
    setSettings((prev) => {
      const newSettings = { ...prev, ...updates };
      try {
        localStorage.setItem('starbase-settings', JSON.stringify(newSettings));
      } catch {
        // Storage full or unavailable
      }
      return newSettings;
    });
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
