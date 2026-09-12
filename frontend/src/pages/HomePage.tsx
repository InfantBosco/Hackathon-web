import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
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
import { ParallaxSection } from '../components/ui/ParallaxSection';
import { RegistrationModal } from '../components/modals/RegistrationModal';

export const HomePage: React.FC = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  const sections = [
    { id: 'home', component: <HeroSection onRegisterClick={openRegisterModal} /> },
    { id: 'about', component: <AboutSection /> },
    { id: 'domains', component: <DomainsSection /> },
    { id: 'details', component: <DetailsSection /> },
    { id: 'schedule', component: <ScheduleSection /> },
    { id: 'prizes', component: <PrizesSection /> },
    { id: 'sponsors', component: <SponsorsSection /> },
    { id: 'venue', component: <VenueSection /> },
    { id: 'contact', component: <ContactSection /> },
    { id: 'faq', component: <FAQSection /> },
    { id: 'cta', component: <FinalCTASection onRegisterClick={openRegisterModal} /> },
  ];

  return (
    <div className="w-full relative bg-transparent text-white">
      <Navbar />
      <main className="relative w-full">
        {sections.map((sec) => (
          <ParallaxSection key={sec.id}>
            {sec.component}
          </ParallaxSection>
        ))}
      </main>
      <div className="relative z-[300] bg-black">
        <Footer />
      </div>
      <BackToTop />
      <RegistrationModal isOpen={isRegisterModalOpen} onClose={closeRegisterModal} />
    </div>
  );
};

