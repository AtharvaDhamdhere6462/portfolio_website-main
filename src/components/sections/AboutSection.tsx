import React from 'react';
import { motion } from 'framer-motion';
import aboutData from '../../data/about.json';
import profileData from '../../data/profile.json';
import { useTheme } from '../../context/ThemeContext';

const AboutSection: React.FC = () => {
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
            id="about-us"
            className={`py-32 px-4 relative min-h-screen flex flex-col justify-center transition-colors duration-700 ${isDark ? 'bg-black' : 'bg-white'}`}
        >
            <div className="max-w-[1400px] mx-auto w-full">

                {/* Header - Reference Style: Outline + Solid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 md:mb-24"
                >
                    <h2 className="text-[10vw] md:text-[8rem] font-black leading-[0.8] tracking-tighter uppercase whitespace-nowrap">
                        <span
                            className={`inline-block mr-4 ${isDark ? 'text-white' : 'text-black'}`}
                        >
                            About
                        </span>
                        <span
                            className={`inline-block ${isDark ? 'text-white/30' : 'text-black/30'}`}
                        >
                            Me
                        </span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                    {/* Left Column: Narrative */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-8 space-y-8"
                    >
                        <h3 className={`text-2xl md:text-3xl font-bold uppercase tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
                            A glimpse into my world
                        </h3>
                        <div className={`space-y-6 text-lg leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                            {aboutData.description.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>

                        {/* Download Resume Button (Offset Style) */}
                        <div className="n-btn-container">
                            <a
                                href={profileData.resumeUrl || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="n-btn cursor-target"
                            >
                                <span className="flex items-center gap-2">
                                    Download Resume
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                </span>
                            </a>
                            <div className="n-btn-shadow" />
                        </div>
                    </motion.div>

                    {/* Right Column: Stats Grid (Offset Style - Rectangular) */}
                    <div className="lg:col-span-4">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-2 gap-8"
                        >
                            {aboutData.stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="n-card-container aspect-square"
                                >
                                    <div className="n-card flex flex-col justify-center items-center text-center p-4">
                                        <div className="text-4xl md:text-5xl font-black text-inherit">
                                            {stat.value}
                                        </div>
                                        <div className="font-mono text-[10px] uppercase tracking-widest opacity-60 font-bold mt-2">
                                            {stat.label}
                                        </div>
                                    </div>
                                    <div className="n-shadow" />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutSection;
