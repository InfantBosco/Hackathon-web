import React from 'react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MapPin, Navigation, Building, Bus } from 'lucide-react';
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
        {/* Karunya University Photo Placeholder */}
        <Card variant="default" className="flex flex-col justify-between p-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-6 h-6 text-[var(--color-accent-cyan)]" />
              <h3 className="text-xl font-heading font-bold text-white">{venueData.institution}</h3>
            </div>
            <div className="aspect-video w-full rounded-[var(--radius-md)] bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] flex flex-col items-center justify-center text-center p-6 mb-4">
              <Building className="w-12 h-12 text-[var(--color-text-muted)] mb-2" />
              <span className="text-xs font-mono text-[var(--color-text-muted)] uppercase">KARUNYA CAMPUS PHOTO PLACEHOLDER</span>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {venueData.auditorium}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[var(--color-border-subtle)] flex items-center gap-2 text-xs font-mono text-[var(--color-text-muted)]">
            <Bus className="w-4 h-4 text-[var(--color-accent-cyan)] shrink-0" />
            <span>{venueData.transportationNote}</span>
          </div>
        </Card>

        {/* Stylized Map Card */}
        <Card variant="hoverGlow" className="flex flex-col justify-between p-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-[var(--color-accent-purple)]" />
              <h3 className="text-xl font-heading font-bold text-white">Interactive Location Map</h3>
            </div>

            <div className="aspect-video w-full rounded-[var(--radius-md)] bg-[var(--color-bg-primary)] border border-[var(--color-border)] relative overflow-hidden flex flex-col items-center justify-center p-6 mb-4 text-center">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#172036_1px,transparent_1px),linear-gradient(to_bottom,#172036_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30" />
              <div className="relative z-10 flex flex-col items-center">
                <MapPin className="w-10 h-10 text-[var(--color-accent-purple)] animate-bounce mb-2" />
                <span className="font-heading font-bold text-white text-base">Karunya University, Coimbatore</span>
                <span className="text-xs font-mono text-[var(--color-text-muted)] mt-1">109° 53' E • 10° 56' N</span>
              </div>
            </div>

            <p className="text-xs text-[var(--color-text-secondary)]">
              Located amidst the scenic Western Ghats, 28km from Coimbatore Central Railway Station.
            </p>
          </div>

          <Button
            variant="secondary"
            className="w-full mt-6"
            leftIcon={<Navigation className="w-4 h-4 text-[var(--color-accent-cyan)]" />}
            onClick={() => window.open(venueData.googleMapsUrl, '_blank', 'noopener,noreferrer')}
          >
            Open in Google Maps
          </Button>
        </Card>
      </div>
    </Section>
  );
};
