import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Project } from '../ui/ProjectCard';
import projectsData from '../../data/projects.json';
import socialData from '../../data/social.json';
import { useTheme } from '../../context/ThemeContext';

const PROJECTS: (Project & {
  githubUrl: string;
  liveUrl: string;
})[] = projectsData.projects;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
};

const infoVariants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 },
};

const ProjectsSection: React.FC = () => {
  const projects = PROJECTS;
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [[activeIndex, direction], setActiveIndex] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const githubProfile = socialData.links.find(link => link.name === 'GitHub');
  const githubProfileUrl = githubProfile?.url || '#';

  const currentProject = projects[activeIndex];

  const goTo = useCallback((index: number) => {
    const dir = index > activeIndex ? 1 : -1;
    setActiveIndex([index, dir]);
  }, [activeIndex]);

  const goNext = useCallback(() => {
    const next = (activeIndex + 1) % projects.length;
    setActiveIndex([next, 1]);
  }, [activeIndex, projects.length]);

  const goPrev = useCallback(() => {
    const prev = (activeIndex - 1 + projects.length) % projects.length;
    setActiveIndex([prev, -1]);
  }, [activeIndex, projects.length]);

  // Auto-advance every 4s
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(goNext, 4000);
    return () => clearInterval(timer);
  }, [goNext, isPaused]);

  return (
    <section
      id="projects"
      className={`py-32 px-4 md:px-8 relative transition-colors duration-700 ${isDark ? 'bg-black' : 'bg-white'}`}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between md:items-end mb-16 md:mb-24 gap-6"
        >
          <div>
            <p className={`mb-4 font-mono uppercase tracking-widest text-sm ${isDark ? 'text-white/50' : 'text-black/50'}`}>
              // Portfolio
            </p>
            <h2 className={`text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
              Featured <span className={isDark ? 'text-white/30' : 'text-black/30'}>Projects</span>
            </h2>
          </div>
          <a
            href={githubProfileUrl}
            target="_blank"
            rel="noreferrer"
            className={`cursor-target hidden md:flex items-center gap-3 font-mono uppercase tracking-widest text-sm transition-colors ${isDark ? 'text-white/50 hover:text-white' : 'text-black/50 hover:text-black'}`}
          >
            View GitHub
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>

        {/* Content: Left Info + Right Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left — Project Info (outside the card) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:sticky lg:top-32 space-y-8 order-2 lg:order-1"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  variants={infoVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6"
                >
                  {/* Category */}
                  <p className={`font-mono text-sm uppercase tracking-widest ${isDark ? 'text-white/50' : 'text-black/50'}`}>
                    {currentProject.category}
                  </p>

                  {/* Title */}
                  <h3 className={`text-4xl md:text-5xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
                    {currentProject.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-base leading-relaxed ${isDark ? 'text-white/50' : 'text-black/50'}`}>
                    {currentProject.description}
                  </p>

                  {/* Tags */}
                  <div className="flex gap-3 flex-wrap">
                    {currentProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-4 py-2 border text-sm font-mono uppercase tracking-wider transition-colors ${isDark
                          ? 'border-white/20 text-white/60 hover:border-white/40'
                          : 'border-black/20 text-black/60 hover:border-black/40'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Action Buttons (don't animate with content) */}
              <div className="flex gap-6 pt-4 flex-wrap">
                {currentProject.liveUrl ? (
                  <div className="n-btn-container">
                    <a
                      href={currentProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="n-btn cursor-target gap-3"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </a>
                    <div className="n-btn-shadow" />
                  </div>
                ) : (
                  <div className="n-btn-container opacity-50 grayscale cursor-not-allowed">
                    <span className="n-btn gap-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Coming Soon
                    </span>
                    <div className="n-btn-shadow" />
                  </div>
                )}

                <div className="n-btn-container">
                  <a
                    href={currentProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="n-btn cursor-target gap-3"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Source
                  </a>
                  <div className="n-btn-shadow" />
                </div>
              </div>
            </motion.div>

            {/* Right — Sliding Image Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="order-1 lg:order-2"
            >
              <div className="n-card-container cursor-target">
                <div className="n-card !p-0 overflow-hidden relative aspect-[4/3]">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={activeIndex}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: 'spring', stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                      }}
                      className="absolute inset-0"
                    >
                      {currentProject.image ? (
                        <img
                          src={currentProject.image}
                          alt={currentProject.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[var(--n-shadow-bg)]">
                          <span className={`text-[10rem] font-black opacity-10 select-none ${isDark ? 'text-white' : 'text-black'}`}>
                            {currentProject.number}
                          </span>
                        </div>
                      )}
                      {/* Status Badge */}
                      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 border-2 border-[var(--n-border)] bg-[var(--n-bg)]">
                        <div className={`w-2 h-2 ${currentProject.liveUrl ? 'bg-green-500' : 'bg-yellow-500'}`} />
                        <span className="text-[10px] font-mono uppercase tracking-widest font-black text-[var(--n-text)]">
                          {currentProject.liveUrl ? 'Live' : 'In Dev'}
                        </span>
                      </div>
                      {/* Number Watermark */}
                      <div className="absolute bottom-4 right-6 pointer-events-none">
                        <span className={`text-7xl md:text-9xl font-black font-mono opacity-[1] ${isDark ? 'text-white' : 'text-black'}`}>
                          {currentProject.number}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="n-shadow" />
              </div>
            </motion.div>
          </div>

          {/* Bottom Controls: Progress + Arrows */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-between mt-10 gap-6"
          >
            {/* Progress */}
            <div className="flex items-center gap-4 flex-1">
              <span className="font-mono text-xs font-black opacity-40">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <div className={`flex-1 h-[2px] ${isDark ? 'bg-white/10' : 'bg-black/10'} relative overflow-hidden`}>
                <motion.div
                  className={`absolute top-0 left-0 h-full ${isDark ? 'bg-white' : 'bg-black'}`}
                  initial={{ width: '0%' }}
                  animate={{ width: `${((activeIndex + 1) / projects.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <span className="font-mono text-xs font-black opacity-40">
                {String(projects.length).padStart(2, '0')}
              </span>
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-3">
              <button onClick={goPrev} className="cursor-target n-icon-wrapper">
                <span className="n-icon-container !w-12 !h-12">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </span>
                <span className="n-icon-shadow" />
              </button>
              <button onClick={goNext} className="cursor-target n-icon-wrapper">
                <span className="n-icon-container !w-12 !h-12">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
                <span className="n-icon-shadow" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;