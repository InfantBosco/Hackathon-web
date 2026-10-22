import React from 'react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';
import { PhotoGrid } from '../ui/PhotoGrid';
import { galleryItems } from '../../data/galleryData';

export const GallerySection: React.FC = () => {
  return (
    <Section id="gallery" variant="secondary" className="!pb-16 pt-8 md:pt-12">
      <SectionHeader
        badge="EVENT HIGHLIGHTS"
        title="HackNEX Moments"
        subtitle="Explore snapshots of innovation, camaraderie, and intense coding across the 24-hour journey."
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 mt-4">
        <PhotoGrid items={galleryItems} />
      </div>
    </Section>
  );
};

export default GallerySection;
