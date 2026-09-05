import React from 'react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MapPin, Navigation, Building } from 'lucide-react';
import { venueData } from '../../data/venueData';

export const VenueSection: React.FC = () => {
  return (
    <Section id="venue" variant="secondary">
      <SectionHeader
        badge="EVENT LOCATION"
        title="Hackathon Venue"
        subtitle="Karunya Nagar, Coimbatore, Tamil Nadu 641114"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Karunya University Overview & Photo Card */}
        <Card variant="default" className="flex flex-col justify-between p-6 border-red-500/25 shadow-[0_0_20px_rgba(255,30,66,0.25)] hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(255,30,66,0.4)] transition-all duration-300">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-6 h-6 text-white" />
              <h3 className="text-xl font-heading font-bold text-white">{venueData.institution}</h3>
            </div>

            {venueData.imageUrl && (
              <img
                src={venueData.imageUrl}
                alt="Karunya University Campus"
                className="w-full h-64 sm:h-72 rounded-[var(--radius-md)] object-cover border border-white/10 mb-4 shadow-xl"
              />
            )}

            {venueData.auditorium && (
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {venueData.auditorium}
              </p>
            )}
          </div>
        </Card>

        {/* Real Embedded Google Maps Location Card */}
        <Card variant="hoverGlow" className="flex flex-col justify-between p-6 border-red-500/25 shadow-[0_0_20px_rgba(255,30,66,0.25)] hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(255,30,66,0.4)] transition-all duration-300">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-white" />
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
            className="w-full mt-2 py-3 text-xs font-mono font-bold tracking-wider uppercase"
            leftIcon={<Navigation className="w-4 h-4 text-black" />}
            onClick={() => window.open(venueData.googleMapsUrl, '_blank', 'noopener,noreferrer')}
          >
            Open Location in Google Maps
          </Button>
        </Card>
      </div>
    </Section>
  );
};
