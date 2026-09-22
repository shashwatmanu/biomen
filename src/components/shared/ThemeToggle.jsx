import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage or default to 'light' (marketing request)
    return localStorage.getItem('biomen-theme') || 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('biomen-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-biomen-bg-secondary text-biomen-text-secondary hover:text-biomen-text-primary transition-all border border-biomen-text-primary/10 shadow-sm"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon size={18} className="animate-in spin-in-90 fade-in duration-300" />
      ) : (
        <Sun size={18} className="animate-in spin-in-90 fade-in duration-300 text-yellow-400" />
      )}
    </button>
  );
};

export default ThemeToggle;
