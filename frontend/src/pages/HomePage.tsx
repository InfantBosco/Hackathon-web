import React from 'react';
import { Navbar } from '../components/navigation/Navbar';
import { HeroSection } from '../components/sections/HeroSection';
import { AboutSection } from '../components/sections/AboutSection';
import { DomainsSection } from '../components/sections/DomainsSection';
import { DetailsSection } from '../components/sections/DetailsSection';
import { ScheduleSection } from '../components/sections/ScheduleSection';
import { PrizesSection } from '../components/sections/PrizesSection';
import { SponsorsSection } from '../components/sections/SponsorsSection';
import { VenueSection } from '../components/sections/VenueSection';
import { ContactSection } from '../components/sections/ContactSection';
import { FAQSection } from '../components/sections/FAQSection';
import { FinalCTASection } from '../components/sections/FinalCTASection';
import { Footer } from '../components/navigation/Footer';
import { BackToTop } from '../components/ui/BackToTop';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full relative overflow-x-hidden">
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
        <ContactSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};
