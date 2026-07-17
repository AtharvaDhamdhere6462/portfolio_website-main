import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import profileData from '../../data/profile.json';
import { useTheme } from '../../context/ThemeContext';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpen }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Get initials
  const initials = profileData.name.split(' ').map(n => n[0]).join('');

  const menuItems = [
    { name: 'Home', href: '#' },
    { name: 'Projects', href: '#projects' },
    { name: 'About Us', href: '#about-us' },
    { name: 'Journey', href: '#journey' },
    { name: 'Skills', href: '#skills' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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
        ease: [0.16, 1, 0.3, 1] as any
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as any }}
          className={`fixed inset-0 z-40 flex flex-col ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
          style={{
            paddingTop: 'env(safe-area-inset-top)',
            paddingLeft: 'env(safe-area-inset-left)',
            paddingRight: 'env(safe-area-inset-right)',
          }}
        >
          <div className="flex items-center justify-between px-8 py-6">
            <span className="text-xl font-bold font-mono uppercase tracking-tight">
              [{initials}]
            </span>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation menu"
              className={`p-2 transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 flex flex-col items-center justify-center space-y-6 md:space-y-8 px-8 pb-10"
          >
            {menuItems.map((item) => (
              <motion.a
                key={item.name}
                variants={itemVariants}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`cursor-target font-mono text-2xl md:text-3xl font-black uppercase tracking-widest transition-colors ${isDark ? 'hover:text-white/60' : 'hover:text-black/60'}`}
              >
                {item.name}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
