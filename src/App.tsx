import React, { useEffect, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import LoadingScreen from './components/ui/LoadingScreen';
import TargetCursor from './components/ui/TargetCursor';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';
import SkillsSection from './components/sections/SkillsSection';
import JourneySection from './components/sections/JourneySection';
import EducationSection from './components/sections/EducationSection';
import ContactSection from './components/sections/ContactSection';
import CertificationsSection from './components/sections/CertificationsSection';
import Footer from './components/layout/Footer';
import Navigation from './components/layout/Navigation';
import MobileMenu from './components/layout/MobileMenu';

const AppContent: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Section animations are now handled within components via Framer Motion
  useEffect(() => {
    if (isLoading) return;
  }, [isLoading]);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <div className="noise-overlay" />
      {!isLoading && <TargetCursor spinDuration={2} hideDefaultCursor={true} parallaxOn={true} />}
      <Navigation mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <MobileMenu isOpen={mobileMenuOpen} setIsOpen={setMobileMenuOpen} />
      <HeroSection startAnimation={!isLoading} />
      <ProjectsSection />
      <AboutSection />
      <EducationSection />
      <JourneySection />
      <SkillsSection />
      <CertificationsSection />
      <ContactSection />
      <Footer />
    </>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
