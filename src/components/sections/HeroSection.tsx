import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import profileData from '../../data/profile.json';
import { useTheme } from '../../context/ThemeContext';
import MagicRings from '../ui/MagicRings';
import VisitorCounter from '../ui/VisitorCounter';

interface HeroSectionProps {
  startAnimation?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ startAnimation = false }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Parallax mouse effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX - innerWidth / 2) / (innerWidth / 2));
    mouseY.set((clientY - innerHeight / 2) / (innerHeight / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Parallax shifts for title and description
  const titleX = useTransform(springX, [-1, 1], [-25, 25]);
  const titleY = useTransform(springY, [-1, 1], [-15, 15]);
  const contentX = useTransform(springX, [-1, 1], [-10, 10]);
  const contentY = useTransform(springY, [-1, 1], [-5, 5]);

  // Split name
  const nameParts = profileData.name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ') || firstName;

  const marqueeText = "ARTIFICIAL INTELLIGENCE • FULL-STACK DEVELOPMENT • MACHINE LEARNING • REACT.JS • PYTHON • NODE.JS • MONGODB • DATA STRUCTURES • OOP • ";

  return (
    <section
      id="about"
      className={`pt-28 pb-16 md:py-20 px-4 md:px-8 relative min-h-screen flex flex-col justify-center transition-colors duration-700 ${isDark ? 'bg-black' : 'bg-white'} overflow-hidden`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Interactive WebGL Magic Rings Background */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <MagicRings
          color="#FF2C2C"
          colorTwo="#8a0303"
          ringCount={6}
          speed={1}
          attenuation={10}
          lineThickness={2}
          baseRadius={0.35}
          radiusStep={0.1}
          scaleRate={0.1}
          opacity={1}
          blur={0}
          noiseAmount={0.1}
          rotation={0}
          ringGap={1.5}
          fadeIn={0.7}
          fadeOut={0.5}
          followMouse={true}
          mouseInfluence={0.2}
          hoverScale={1.2}
          parallax={0.05}
          clickBurst={true}
        />
      </div>


      {/* =============================================
         KINETIC TYPOGRAPHY BACKGROUND
         Two opposing giant marquee banners
         ============================================= */}
      <div className="absolute inset-0 flex flex-col justify-center gap-16 md:gap-24 opacity-75 z-0 pointer-events-none select-none">
        {/* Row 1: Scrolling Left */}
        <div className="w-full overflow-hidden flex whitespace-nowrap">
          <div className="marquee font-heading text-[clamp(4.5rem,10vw,11rem)] font-black uppercase text-transparent tracking-tighter"
               style={{ WebkitTextStroke: isDark ? '1px rgba(255,107,53,0.06)' : '1px rgba(28,20,14,0.05)' }}>
            {marqueeText} {marqueeText}
          </div>
        </div>

        {/* Row 2: Scrolling Right */}
        <div className="w-full overflow-hidden flex whitespace-nowrap">
          <div className="marquee-reverse font-heading text-[clamp(4.5rem,10vw,11rem)] font-black uppercase text-transparent tracking-tighter"
               style={{ WebkitTextStroke: isDark ? '1px rgba(255,107,53,0.06)' : '1px rgba(28,20,14,0.05)' }}>
            {marqueeText} {marqueeText}
          </div>
        </div>
      </div>

      {/* Foreground Content Container */}
      <div className="relative z-20 w-full max-w-[1300px] mx-auto flex flex-col items-center justify-center text-center">
        
        {/* Massive kinetic title */}
        <motion.div
          style={{ x: titleX, y: titleY }}
          className="cursor-default select-none relative mb-6"
        >
          <h1 className="font-black leading-[0.8] uppercase flex flex-col items-center tracking-[-0.04em]">
            <motion.span
              initial={{ opacity: 0, y: 80 }}
              animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="block text-[clamp(3rem,9vw,5.5rem)] text-[var(--accent)]"
            >
              {firstName}
            </motion.span>
            
            <motion.span
              initial={{ opacity: 0, y: 80 }}
              animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
              transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`block text-[clamp(3rem,9vw,5.5rem)] ${isDark ? 'text-white drop-shadow-[0_0_30px_rgba(255,107,53,0.12)]' : 'text-black'}`}
            >
              {lastName}
            </motion.span>
          </h1>
        </motion.div>

        {/* Supporting description panel */}
        <motion.div
          style={{ x: contentX, y: contentY }}
          className="space-y-8 max-w-2xl flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-4"
          >
            <p className={`text-sm md:text-base leading-relaxed ${isDark ? 'text-[var(--text-secondary)]' : 'text-black/70'}`}>
              Developing modular interfaces and AIML processing scripts at KIT. Focusing on fluid kinetic visual systems and robust web application foundations.
            </p>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <div className="n-btn-container">
              <a href="#projects" className="n-btn cursor-target px-8 py-4">
                View Projects
              </a>
              <div className="n-btn-shadow" />
            </div>

            <div className="n-btn-container">
              <a
                href="#contact"
                className="n-btn cursor-target"
              >
                Start Project
              </a>
              <div className="n-btn-shadow" />
            </div>
          </motion.div>

          {/* Visitor stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={startAnimation ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="pt-4"
          >
            <VisitorCounter />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={startAnimation ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 pointer-events-none z-20"
      >
        <span className={`text-[10px] font-mono font-bold uppercase tracking-[0.2em] ${isDark ? 'text-white/40' : 'text-black/40'}`}>
          Scroll
        </span>
        <div className={`w-[20px] h-[32px] border-2 rounded-full flex justify-center p-1 ${isDark ? 'border-white/20' : 'border-black/20'}`}>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className={`w-1 h-1.5 rounded-full ${isDark ? 'bg-white' : 'bg-black'}`}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
