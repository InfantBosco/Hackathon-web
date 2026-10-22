import React from 'react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MapPin, Building } from 'lucide-react';
import { venueData } from '../../data/venueData';

export const VenueSection: React.FC = () => {
  return (
    <Section id="venue" variant="secondary">
      <SectionHeader
        badge="EVENT LOCATION"
        title="Hackathon Venue"
        subtitle="Karunya University, Coimbatore, Tamil Nadu 641114"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
        {/* Karunya University Overview & Photo Card */}
        <Card variant="default" className="flex flex-col justify-between h-full p-6 border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:border-white/60 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300">
          <div className="flex flex-col h-full flex-1">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-6 h-6 text-white shrink-0" />
              <h3 className="text-xl font-heading font-bold text-white">{venueData.institution}</h3>
            </div>

            {venueData.imageUrl && (
              <div className="relative w-full flex-1 min-h-[256px] sm:min-h-[288px] rounded-[var(--radius-md)] overflow-hidden border border-white/10 shadow-xl">
                <img
                  src={venueData.imageUrl}
                  alt="Karunya University Campus"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {venueData.auditorium && (
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mt-4">
                {venueData.auditorium}
              </p>
            )}
          </div>
        </Card>

        {/* Real Embedded Google Maps Location Card */}
        <Card variant="hoverGlow" className="flex flex-col justify-between h-full p-6 border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:border-white/60 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300">
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-white shrink-0" />
              <h3 className="text-xl font-heading font-bold text-white">Google Maps Location</h3>
            </div>

            {/* Embedded Live Google Map iframe */}
            <div className="w-full h-64 sm:h-72 rounded-[var(--radius-md)] border border-white/15 overflow-hidden mb-4 shadow-xl bg-zinc-950">
              <iframe
                title="Karunya University Google Maps Location"
                src="https://maps.google.com/maps?q=Karunya%20Institute%20of%20Technology%20and%20Sciences,%20Coimbatore&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <Button
            variant="primary"
            className="w-full mt-2 py-3 text-xs sm:text-sm font-royal font-bold tracking-[0.18em] uppercase"
            onClick={() => window.open(venueData.googleMapsUrl, '_blank', 'noopener,noreferrer')}
          >
            Open Location in Google Maps
          </Button>
        </Card>
      </div>
    </Section>
  );
};
