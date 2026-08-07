import React from 'react';
import { motion } from 'framer-motion';
import journeyData from '../../data/journey.json';
import { useTheme } from '../../context/ThemeContext';

const JourneySection: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: 'easeOut' as const
            }
        }
    };

    return (
        <section
            id="journey"
            className={`py-32 px-2 relative overflow-hidden transition-colors duration-700 ${isDark ? 'bg-black' : 'bg-white'}`}
        >
            {/* Large background text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <span
                    className="text-[20vw] md:text-[15vw] font-black text-transparent tracking-wider uppercase"
                    style={{
                        WebkitTextStroke: isDark ? '1px rgba(255, 255, 255, 0.03)' : '1px rgba(0, 0, 0, 0.03)',
                    }}
                >
                    JOURNEY
                </span>
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-20"
                >
                    <p className={`mb-4 font-mono uppercase tracking-widest text-sm ${isDark ? 'text-white/50' : 'text-black/50'}`}>
                        // My Journey
                    </p>
                    <h2 className={`text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
                        The <span className={isDark ? 'text-white/30' : 'text-black/30'}>Journey</span>
                    </h2>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Center line */}
                    <div
                        className={`absolute left-1/2 top-0 bottom-0 w-px hidden md:block ${isDark ? 'bg-white/10' : 'bg-black/10'}`}
                    />

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="space-y-16 md:space-y-24"
                    >
                        {journeyData.milestones.map((milestone, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className={`flex flex-col md:block items-center relative
                  ${index % 2 === 0 ? 'md:pr-[52%]' : 'md:pl-[52%]'}
                `}
                            >
                                {/* Year badge - Positioned on the line or near title */}
                                <div
                                    className={`hidden md:block absolute top-8 font-mono font-black text-5xl opacity-20 pointer-events-none select-none z-0 ${index % 2 === 0 ? 'right-[53%] text-right' : 'left-[53%] text-left'} ${isDark ? 'text-white' : 'text-black'}`}
                                >
                                    {milestone.year}
                                </div>

                                {/* Content Card */}
                                <div className={`relative group w-full md:max-w-md ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                                    {/* Mobile Year display */}
                                    <div className={`md:hidden mb-4 text-4xl font-black font-mono opacity-20 ${isDark ? 'text-white' : 'text-black'}`}>
                                        {milestone.year}
                                    </div>

                                    <div className="n-card-container">
                                        <div className="n-card p-6">
                                            <h3 className="text-xl font-black mb-2 uppercase tracking-tight">
                                                {milestone.title}
                                            </h3>
                                            <p className="text-sm leading-relaxed opacity-70 font-bold">
                                                {milestone.description}
                                            </p>
                                        </div>
                                        <div className="n-shadow" />
                                    </div>
                                </div>

                                {/* Center Square marker (desktop only) */}
                                <div
                                    className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 border-2 border-[var(--n-border)] transition-colors duration-300 z-20 bg-[var(--n-bg)]"
                                    style={{
                                        top: '2rem',
                                    }}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section >
    );
};

export default JourneySection;
