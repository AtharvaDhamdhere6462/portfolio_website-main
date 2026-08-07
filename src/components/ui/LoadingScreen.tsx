import React, { useState, useEffect } from 'react';
import profileData from '../../data/profile.json';
import { useTheme } from '../../context/ThemeContext';

interface LoadingScreenProps {
    onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [progress, setProgress] = useState(0);
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // Get initials from name
    const initials = profileData.name
        .split(' ')
        .map((n) => n[0])
        .join('');

    useEffect(() => {
        const duration = 2000;
        const interval = 50;
        const step = 100 / (duration / interval);

        const progressTimer = setInterval(() => {
            setProgress((prev) => {
                const next = prev + step;
                if (next >= 100) {
                    clearInterval(progressTimer);
                    return 100;
                }
                return next;
            });
        }, interval);

        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 500);
        }, duration);

        return () => {
            clearTimeout(timer);
            clearInterval(progressTimer);
        };
    }, [onComplete]);

    if (!isVisible) {
        return (
            <div
                className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500 opacity-0 pointer-events-none ${isDark ? 'bg-black' : 'bg-white'}`}
            />
        );
    }

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500 ${!isVisible ? 'opacity-0' : 'opacity-100'} ${isDark ? 'bg-black' : 'bg-white'}`}
        >
            {/* Content */}
            <div className="flex flex-col items-center gap-8">
                {/* Logo with initials */}
                <div className="text-5xl sm:text-6xl font-mono tracking-tight">
                    <span className={isDark ? 'text-white/20' : 'text-black/20'}>[</span>
                    <span className="text-[var(--accent)] font-black">{initials}</span>
                    <span className={isDark ? 'text-white/20' : 'text-black/20'}>]</span>
                </div>

                {/* Progress Bar */}
                <div className={`w-48 h-px relative overflow-hidden ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
                    <div
                        className="absolute left-0 top-0 h-full transition-all duration-100 bg-[var(--accent)]"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Percentage */}
                <div className={`text-sm font-mono uppercase tracking-widest ${isDark ? 'text-white/50' : 'text-black/50'}`}>
                    Loading {Math.round(progress)}%
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
