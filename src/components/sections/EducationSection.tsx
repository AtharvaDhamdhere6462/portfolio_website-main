import React from 'react';
import { motion } from 'framer-motion';
import educationData from '../../data/education.json';
import { useTheme } from '../../context/ThemeContext';

const EducationSection: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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

  return (
    <section
      id="education"
      className={`py-20 px-4 md:px-8 relative transition-colors duration-700 ${isDark ? 'bg-black' : 'bg-white'}`}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className={`mb-4 font-mono uppercase tracking-widest text-sm ${isDark ? 'text-white/50' : 'text-black/50'}`}>
            // Background
          </p>
          <h2 className={`text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
            My <span className={isDark ? 'text-white/30' : 'text-black/30'}>Education</span>
          </h2>
        </motion.div>

        {/* Education Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          {educationData.education.map((edu, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="n-card-container h-full"
            >
              <div className="n-card h-full flex flex-col justify-between p-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-2xl font-black uppercase tracking-tight leading-tight">
                      {edu.title}
                    </h3>
                    <div className="text-right">
                      <p className="text-3xl font-black font-mono">
                        {edu.grade}
                      </p>
                      <p className="text-[10px] uppercase tracking-widest font-mono opacity-50 font-bold">
                        {edu.gradeLabel}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-mono font-bold uppercase tracking-wider opacity-60">
                      {edu.institution}
                    </p>
                    <p className="text-xs font-mono uppercase tracking-widest opacity-40">
                      {edu.location}
                    </p>
                  </div>

                  {edu.specialization && (
                    <div className="pt-2 border-t-2 border-[var(--n-border)] opacity-20">
                      <p className="text-xs font-bold uppercase tracking-widest">
                        {edu.specialization}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-4 border-t-2 border-[var(--n-border)] flex justify-between items-center">
                  <span className="font-mono text-xs font-black uppercase tracking-widest bg-[var(--n-text)] text-[var(--n-bg)] px-2 py-1">
                    Term
                  </span>
                  <p className="text-sm font-mono uppercase tracking-wider font-bold">
                    {edu.date}
                  </p>
                </div>
              </div>
              <div className="n-shadow" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
