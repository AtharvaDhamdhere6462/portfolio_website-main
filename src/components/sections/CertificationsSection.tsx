import React from 'react';
import { motion } from 'framer-motion';
import certData from '../../data/certifications.json';
import { useTheme } from '../../context/ThemeContext';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  skills: string[];
  status: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any },
  },
};

const CertificationsSection: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const certifications: Certification[] = certData.certifications;

  return (
    <section
      id="certifications"
      className={`py-32 px-4 md:px-8 relative transition-colors duration-700 ${isDark ? 'bg-black' : 'bg-white'}`}
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
              Credentials
            </p>
          </div>
          <h2 className={`text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none ${isDark ? 'text-white' : 'text-black'}`}>
            Certifi<span className={isDark ? 'text-white/30' : 'text-black/30'}>cations</span>
          </h2>
        </motion.div>

        {/* Certification Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                variants={itemVariants}
                className="cursor-target"
              >
                <div className="n-card-container group">
                  <div className="n-card !p-0 overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      {/* Left — Number Block */}
                      <div className="flex items-center justify-center px-6 py-5 md:px-8 md:py-0 border-b-2 md:border-b-0 md:border-r-2 border-[var(--n-border)] bg-[var(--n-text)]">
                        <span className="text-3xl md:text-4xl font-black font-mono text-[var(--n-bg)]">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Right — Content */}
                      <div className="flex-1 p-6 md:p-8 space-y-4">
                        {/* Top Row: Title + Date */}
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight leading-tight">
                              {cert.title}
                            </h3>
                            <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold opacity-40">
                              {cert.issuer}
                            </p>
                          </div>
                          <span className={`shrink-0 px-3 py-1.5 border-2 border-[var(--n-border)] font-mono text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                            {cert.date}
                          </span>
                        </div>

                        {/* Skills Tags */}
                        <div className="flex gap-2 flex-wrap">
                          {cert.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2.5 py-1 border-2 border-[var(--n-border)] text-[9px] font-black uppercase tracking-widest bg-[var(--n-text)] text-[var(--n-bg)]"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* Status */}
                        <div className="flex items-center gap-2 pt-2">
                          <div className={`w-2 h-2 ${cert.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                          <span className="font-mono text-[10px] uppercase tracking-widest font-black opacity-50">
                            {cert.status === 'completed' ? 'Verified' : 'In Progress'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Certificate Action Panel — Always visible */}
                    <div className="px-6 md:px-8 py-5 border-t-2 border-[var(--n-border)] flex items-center justify-between gap-4">
                      <p className={`font-mono text-xs opacity-50 ${isDark ? 'text-white' : 'text-black'}`}>
                        {cert.credentialUrl ? 'Click below to view the original certificate' : 'Certificate link coming soon'}
                      </p>
                      {cert.credentialUrl ? (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-target"
                        >
                          <div className="n-btn-container">
                            <span className="n-btn gap-3 !text-xs">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              View Certificate
                            </span>
                            <div className="n-btn-shadow" />
                          </div>
                        </a>
                      ) : (
                        <div className="n-btn-container opacity-40 cursor-not-allowed">
                          <span className="n-btn gap-3 !text-xs">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m0 0v2m0-2h2m-2 0H10m9.374-7.424A9 9 0 1112 3a9 9 0 017.374 11.576z" />
                            </svg>
                            Coming Soon
                          </span>
                          <div className="n-btn-shadow" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="n-shadow" />
                </div>
              </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;
