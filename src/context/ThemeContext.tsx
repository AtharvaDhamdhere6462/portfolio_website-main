import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        // Check localStorage for saved theme
        const saved = localStorage.getItem('theme') as Theme;
        return saved || 'dark';
    });

    useEffect(() => {
        // Save to localStorage
        localStorage.setItem('theme', theme);

        // Apply theme class to document
        document.documentElement.classList.remove('dark', 'light');
        document.documentElement.classList.add(theme);

        // Update body background
        document.body.style.backgroundColor = theme === 'dark' ? '#0a0806' : '#faf8f5';
        document.body.style.color = theme === 'dark' ? '#f5ebe0' : '#1c140e';
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
