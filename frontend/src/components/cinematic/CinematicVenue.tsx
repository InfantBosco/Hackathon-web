import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Navigation } from 'lucide-react';
import { venueData } from '../../data/venueData';

gsap.registerPlugin(ScrollTrigger);

export const CinematicVenue: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Coordinated, silky smooth entrance animation for the Venue section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'top 32%',
          scrub: 1.4,
        },
      });

      tl.fromTo(
        '.venue-header',
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', ease: 'power2.out', duration: 1 }
      ).fromTo(
        '.venue-card-wrapper',
        { opacity: 0, y: 55, scale: 0.96, filter: 'blur(10px)' },
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', ease: 'power2.out', duration: 1.2 },
        '-=0.6'
      );

      // Smooth subtle parallax on the venue image
      const img = sectionRef.current?.querySelector('.venue-image');
      if (img) {
        gsap.to(img, {
          y: -25,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="venue" className="relative py-28 sm:py-36 overflow-hidden z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="venue-header mb-10 will-change-transform">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-400/30 bg-amber-400/10 backdrop-blur-md mb-3">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-300 font-semibold">
              EVENT LOCATION
            </span>
          </div>
          <h2
            className="font-heading font-black tracking-tight text-white mb-2"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Hackathon Venue
          </h2>
          <p className="text-sm text-slate-300 max-w-lg">
            Experience 24 hours of innovation nestled right in the scenic foothills of the Western Ghats.
          </p>
        </div>

        {/* Venue Card with ambient halo */}
        <div className="relative group venue-card-wrapper will-change-transform">
          {/* Ambient glass halo glow */}
          <div className="absolute -inset-1 rounded-3xl bg-amber-500/15 blur-2xl opacity-40 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none" />

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 rounded-3xl border border-white/15 bg-[#030712]/75 backdrop-blur-2xl p-6 sm:p-10 shadow-[0_16px_50px_rgba(0,0,0,0.65)]">
            {/* Venue Image with parallax */}
            <div className="relative overflow-hidden rounded-2xl h-[280px] sm:h-[340px] border border-white/10 shadow-inner">
              {venueData.imageUrl && (
                <img
                  src={venueData.imageUrl}
                  alt="Karunya University Campus"
                  className="venue-image w-full h-[115%] object-cover"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 text-white">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-sm font-semibold">{venueData.institution}</span>
                </div>
              </div>
            </div>

            {/* Map + Info */}
            <div className="flex flex-col justify-between gap-6">
              {/* Google Maps Embed */}
              <div className="rounded-2xl border border-white/15 overflow-hidden h-[200px] bg-zinc-950 shadow-inner">
                <iframe
                  title="Karunya University Location"
                  src="https://maps.google.com/maps?q=Karunya%20Institute%20of%20Technology%20and%20Sciences,%20Coimbatore&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Location info */}
              <div className="space-y-4">
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {venueData.campus}
                </p>
                <button
                  onClick={() => window.open(venueData.googleMapsUrl, '_blank', 'noopener,noreferrer')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white border border-amber-400/40 bg-amber-400/10 rounded-xl hover:bg-amber-400/20 hover:border-amber-400/70 transition-all duration-300 shadow-md active:scale-95"
                >
                  <Navigation className="w-4 h-4 text-amber-400" />
                  GET DIRECTIONS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
