import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import profileData from '../../data/profile.json';
import { useTheme } from '../../context/ThemeContext';

interface NavigationProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const navItems = [
  { name: 'Home', href: '#' },
  { name: 'Projects', href: '#projects' },
  { name: 'About', href: '#about-us' },
  { name: 'Education', href: '#education' },
  { name: 'Journey', href: '#journey' },
  { name: 'Skills', href: '#skills' },
  { name: 'Certs', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

const Navigation: React.FC<NavigationProps> = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const [activeSection, setActiveSection] = useState('Home');
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      setScrolled(window.scrollY > 50);

      if (window.scrollY < 100) {
        setActiveSection('Home');
        return;
      }

      // If at the bottom of the page, activate the last nav item
      const atBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50;
      if (atBottom) {
        setActiveSection(navItems[navItems.length - 1].name);
        return;
      }

      // Iterate in reverse so the deepest visible section wins
      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        if (item.href === '#') continue;
        const sectionId = item.href.replace('#', '');
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop } = element;
          if (scrollPosition >= offsetTop) {
            setActiveSection(item.name);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get initials
  const initials = profileData.name.split(' ').map(n => n[0]).join('');

  // Theme-aware accent colors
  const accentColor = isDark ? 'text-white' : 'text-black';
  const textPrimary = isDark ? 'text-white' : 'text-black';
  const textSecondary = isDark ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black';
  const bgPrimary = isDark ? 'bg-black' : 'bg-white';
  const borderPrimary = isDark ? 'border-white' : 'border-black';

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-2 md:top-3 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] md:w-[95%] max-w-[1400px]"
    >
      <div className="relative w-full">
        {/* Soft Ambient Glow Layer */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[rgba(255,44,44,0.1)] to-transparent blur-md pointer-events-none" />

        {/* Main Navbar Content - Glassmorphic Sunset */}
        <div
          className="relative flex items-center justify-between w-full px-4 md:px-8 py-3.5 border border-[rgba(255,44,44,0.15)] dark:border-[rgba(255,44,44,0.15)] light:border-[rgba(255,44,44,0.15)] bg-[rgba(18,14,10,0.65)] dark:bg-[rgba(18,14,10,0.65)] light:bg-[rgba(250,248,245,0.8)] backdrop-blur-xl rounded-2xl transition-all duration-300 z-10 shadow-[0_10px_35px_rgba(0,0,0,0.3)]"
        >
          {/* Logo */}
          <a href="#" className="cursor-target flex items-center hover:opacity-80 transition-opacity">
            <span className="text-xl md:text-2xl font-black tracking-tighter font-mono uppercase text-[var(--n-text)]">
              [{initials}]
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`cursor-target relative font-mono text-sm font-black uppercase tracking-widest transition-all ${activeSection === item.name
                  ? 'text-[var(--n-text)]'
                  : 'text-[var(--n-text)]/50 hover:text-[var(--n-text)]'
                  }`}
              >
                {item.name}
                {activeSection === item.name && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-[var(--n-text)]"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="cursor-target p-2 transition-all duration-300 text-[var(--n-text)]/50 hover:text-[var(--n-text)]"
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Resume Button */}
            <div className="n-btn-container hidden lg:block">
              <a
                href={profileData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="n-btn px-4 md:px-6 py-2 md:py-2 cursor-target !text-xs md:!text-sm"
              >
                Resume
              </a>
              <div className="n-btn-shadow" />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 transition-colors ${textSecondary}`}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;