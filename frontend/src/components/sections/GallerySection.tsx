import React from 'react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';
import { CircleGallery } from '../ui/CircleGallery';
import { galleryItems } from '../../data/galleryData';

export const GallerySection: React.FC = () => {
  return (
    <Section id="gallery" variant="secondary" className="!pb-10">
      <SectionHeader
        badge="EVENT HIGHLIGHTS"
        title="HackNEX Moments"
        subtitle="Explore snapshots of innovation, camaraderie, and intense coding across the 24-hour journey."
      />

      <div className="w-full max-w-7xl mx-auto -mt-4 sm:-mt-2">
        <CircleGallery
          items={galleryItems}
          itemWidth={480}
          itemHeight={300}
          gap={30}
          radius={1500}
          sensitivity={0.65}
          scaleStrength={1.12}
          blurStrength={6}
          borderRadius={22}
          borderColor="rgba(255, 255, 255, 0.15)"
          borderWidth={1}
          shadowOpacity={0.7}
          shadowBlur={30}
          className="h-[400px] sm:h-[480px] lg:h-[540px]"
        />
      </div>
    </Section>
  );
};

export default GallerySection;
