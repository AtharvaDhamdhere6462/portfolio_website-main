import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

// Animated number digit that rolls like an odometer
const AnimatedDigit: React.FC<{ digit: number; delay: number; isDark: boolean }> = ({ digit, delay, isDark }) => {
  const spring = useSpring(0, { stiffness: 80, damping: 20 });
  const display = useTransform(spring, (v) => Math.round(v));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      spring.set(digit);
    }, delay);
    return () => clearTimeout(timeout);
  }, [digit, delay, spring]);

  useEffect(() => {
    const unsubscribe = display.on('change', (v) => {
      setDisplayValue(v);
    });
    return unsubscribe;
  }, [display]);

  return (
    <span
      className={`inline-block w-[1.1ch] text-center font-mono font-black text-lg md:text-xl tabular-nums ${
        isDark ? 'text-white' : 'text-black'
      }`}
    >
      {displayValue}
    </span>
  );
};

const VisitorCounter: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [count, setCount] = useState<number | null>(null);
  const [isLive, setIsLive] = useState(false);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchCount = async () => {
      try {
        // Using Abacus counting API - free, no signup needed
        const response = await fetch(
          'https://abacus.jasoncameron.dev/hit/atharva-dhamdhere-portfolio/visits'
        );
        if (response.ok) {
          const data = await response.json();
          setCount(data.value);
          setIsLive(true);
        } else {
          // Fallback: use localStorage-based counting
          fallbackCount();
        }
      } catch {
        // Fallback if API is unreachable
        fallbackCount();
      }
    };

    const fallbackCount = () => {
      const stored = localStorage.getItem('ad_visit_count');
      const current = stored ? parseInt(stored, 10) + 1 : 1;
      localStorage.setItem('ad_visit_count', current.toString());
      setCount(current);
      setIsLive(true);
    };

    fetchCount();
  }, []);

  // Convert count to digits array
  const digits = count !== null
    ? ('00' + count.toString()).split('').map(Number)
    : [0, 0, 0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="flex flex-col items-center gap-2"
    >
      {/* Label */}
      <div className="flex items-center gap-2">
        {/* Live pulse indicator */}
        <span className="relative flex h-2.5 w-2.5">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isLive ? 'bg-emerald-400' : 'bg-gray-400'
            }`}
          />
          <span
            className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
              isLive ? 'bg-emerald-500' : 'bg-gray-500'
            }`}
          />
        </span>
        <span
          className={`text-[10px] font-mono font-bold uppercase tracking-[0.2em] ${
            isDark ? 'text-white/40' : 'text-black/40'
          }`}
        >
          Total Visits
        </span>
      </div>

      {/* Counter Display - Neubrutalist card style */}
      <div className="n-card-container">
        <div
          className="n-card !p-0 flex items-center overflow-hidden"
          style={{ padding: 0 }}
        >
          <div className="flex items-center px-3 py-2 gap-[1px]">
            {digits.map((digit, i) => (
              <React.Fragment key={i}>
                <AnimatedDigit
                  digit={digit}
                  delay={200 + i * 120}
                  isDark={isDark}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="n-shadow" />
      </div>
    </motion.div>
  );
};

export default VisitorCounter;
