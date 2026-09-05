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
        <Card variant="default" className="flex flex-col justify-between p-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-6 h-6 text-[var(--color-accent-cyan)]" />
              <h3 className="text-xl font-heading font-bold text-white">{venueData.institution}</h3>
            </div>

            {venueData.imageUrl ? (
              <img
                src={venueData.imageUrl}
                alt="Karunya University Campus & Auditorium"
                className="w-full h-64 sm:h-72 rounded-[var(--radius-md)] object-cover border border-[var(--color-border-subtle)] mb-4 shadow-xl"
              />
            ) : (
              <div className="w-full h-64 sm:h-72 rounded-[var(--radius-md)] bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] flex flex-col items-center justify-center text-center p-6 mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0b0f19] via-transparent to-[#ff1e42]/10 opacity-60" />
                <Building className="w-12 h-12 text-[var(--color-accent-cyan)] mb-2 relative z-10" />
                <span className="text-xs font-mono text-[var(--color-text-secondary)] uppercase relative z-10 font-semibold">
                  KARUNYA MAIN CAMPUS & AUDITORIUM
                </span>
                <span className="text-[10px] font-mono text-[var(--color-text-muted)] mt-1 relative z-10">
                  Coimbatore, Tamil Nadu 641114
                </span>
              </div>
            )}

            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {venueData.auditorium}
            </p>
          </div>
        </Card>

        {/* Real Embedded Google Maps Location Card */}
        <Card variant="hoverGlow" className="flex flex-col justify-between p-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-[var(--color-accent-cyan)]" />
              <h3 className="text-xl font-heading font-bold text-white">Google Maps Location</h3>
            </div>

            {/* Embedded Live Google Map iframe */}
            <div className="w-full h-64 sm:h-72 rounded-[var(--radius-md)] border border-[var(--color-border)] overflow-hidden mb-4 shadow-xl bg-[#080d1a]">
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
            leftIcon={<Navigation className="w-4 h-4 text-white" />}
            onClick={() => window.open(venueData.googleMapsUrl, '_blank', 'noopener,noreferrer')}
          >
            Open Location in Google Maps
          </Button>
        </Card>
      </div>
    </Section>
  );
};
