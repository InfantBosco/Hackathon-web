import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/navigation/Navbar';
import { HeroSection } from '../components/sections/HeroSection';
import { AboutSection } from '../components/sections/AboutSection';
import { DomainsSection } from '../components/sections/DomainsSection';
import { DetailsSection } from '../components/sections/DetailsSection';
import { ScheduleSection } from '../components/sections/ScheduleSection';
import { PrizesSection } from '../components/sections/PrizesSection';
import { SponsorsSection } from '../components/sections/SponsorsSection';
import { VenueSection } from '../components/sections/VenueSection';
import { FAQSection } from '../components/sections/FAQSection';
import { FinalCTASection } from '../components/sections/FinalCTASection';
import { Footer } from '../components/navigation/Footer';
import { BackToTop } from '../components/ui/BackToTop';
import { LoadingScreen } from '../components/loading/LoadingScreen';

export const HomePage: React.FC = () => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] relative">
      {showLoading && (
        <LoadingScreen
          videoSrc="/assets/loadingscreen.mp4"
          isLoading={showLoading}
          onComplete={() => setShowLoading(false)}
        />
      )}
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <DomainsSection />
        <DetailsSection />
        <ScheduleSection />
        <PrizesSection />
        <SponsorsSection />
        <VenueSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};
