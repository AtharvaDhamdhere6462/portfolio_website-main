import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import skillsData from '../../data/skills.json';
import { useTheme } from '../../context/ThemeContext';
import PixelTransition from '../ui/PixelTransition';

interface Tech {
  name: string;
  logo: string;
}

interface Category {
  id: string;
  name: string;
  proficiency: number;
  technologies: Tech[];
}

const SkillsSection: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const categories: Category[] = skillsData.categories;
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const
      }
    }
  };

  const SkillCard = ({ tech }: { tech: Tech }) => {
    return (
      <div className="n-card-container aspect-square group">
        <div className="n-card flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden">
          {/* Mobile: Static layout with logo + name always visible */}
          <div className="flex md:hidden flex-col items-center justify-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center">
              <img
                src={tech.logo}
                alt={tech.name}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${tech.name}&background=random`;
                }}
              />
            </div>
            <span className="font-mono text-[9px] uppercase font-black tracking-widest text-center leading-tight">
              {tech.name}
            </span>
          </div>

          {/* Desktop: Logo - visible by default, fades out on hover */}
          <div className="hidden md:flex absolute inset-0 flex-col items-center justify-center transition-all duration-300 group-hover:opacity-0 group-hover:scale-90">
            <div className="w-14 h-14 flex items-center justify-center">
              <img
                src={tech.logo}
                alt={tech.name}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${tech.name}&background=random`;
                }}
              />
            </div>
          </div>

          {/* Desktop: Name - hidden by default, fades in on hover */}
          <div className="hidden md:flex absolute inset-0 flex-col items-center justify-center bg-[var(--n-text)] transition-all duration-300 opacity-0 scale-110 group-hover:opacity-100 group-hover:scale-100">
            <span className="font-mono text-xs uppercase font-black tracking-widest text-center text-[var(--n-bg)] px-2">
              {tech.name}
            </span>
          </div>
        </div>
        <div className="n-shadow" />
      </div>
    );
  };

  return (
    <section
      id="skills"
      className={`py-24 px-4 md:px-8 relative transition-colors duration-700 ${isDark ? 'bg-black' : 'bg-white'}`}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-[1px] ${isDark ? 'bg-white/30' : 'bg-black/30'}`} />
            <p className={`font-mono uppercase tracking-[0.3em] text-xs font-bold ${isDark ? 'text-white/50' : 'text-black/50'}`}>
              Tech Stack
            </p>
          </div>
          <h2 className={`text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none ${isDark ? 'text-white' : 'text-black'}`}>
            My <span className={isDark ? 'text-white/30' : 'text-black/30'}>Skills</span>
          </h2>
        </motion.div>

        {/* Categorized Skills */}
        <div className="space-y-24">
          {categories.map((category) => (
            <div key={category.id} className="space-y-12">
              <div className="flex items-end justify-between border-b pb-6 mb-8">
                <h3 className={`text-3xl md:text-4xl font-black uppercase tracking-tighter ${isDark ? 'text-white' : 'text-black'}`}>
                  {category.name}
                </h3>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6"
              >
                {category.technologies.map((tech) => (
                  <motion.div
                    key={tech.name}
                    variants={itemVariants}
                    className="group relative cursor-target"
                  >
                    <div className={`absolute inset-0 border translate-x-1.5 translate-y-1.5 -z-10 transition-transform group-hover:translate-x-2 group-hover:translate-y-2 ${isDark ? 'border-white/40 bg-white/5' : 'border-black/40 bg-black/5'}`} />
                    <SkillCard tech={tech} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
