import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, GraduationCap, User, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contacts = [
  {
    role: 'Faculty Coordinator',
    name: 'Dr. Eben Sophia',
    icon: GraduationCap,
    email: 'ebensophia@karunya.edu',
  },
  {
    role: 'NEXUS — President',
    name: 'Mr. Jason Balamurugan',
    icon: User,
    phone: '94421 29572',
    email: 'jasonb@karunya.edu.in',
  },
  {
    role: 'NEXUS — Vice President',
    name: 'Ms. Sancia',
    icon: Award,
    phone: '72005 74137',
    email: 'sancias@karunya.edu.in',
  },
];

export const CinematicContact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.contact-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.1, y: 35 },
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              end: 'top 65%',
              scrub: 1.2,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative py-24 sm:py-32 overflow-hidden z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="contact-reveal text-center mb-12">
          <span className="block text-xs font-mono uppercase tracking-[0.3em] text-amber-400 font-semibold mb-3">
            GET IN TOUCH
          </span>
          <h2
            className="font-heading font-black tracking-tight text-white mb-2"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Organizing Committee
          </h2>
          <p className="text-sm text-slate-300 max-w-md mx-auto mt-2">
            Reach out to our faculty and student coordinators for assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contacts.map((contact, i) => {
            const Icon = contact.icon;
            return (
              <div
                key={i}
                className="contact-reveal p-6 rounded-3xl border border-white/10 bg-[#030712]/75 backdrop-blur-xl shadow-2xl hover:border-amber-400/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  {contact.role}
                </span>
                <h3 className="font-heading font-bold text-base text-white mb-4">
                  {contact.name}
                </h3>
                <div className="space-y-2 text-xs">
                  {contact.phone && (
                    <a
                      href={`tel:${contact.phone.replace(/\s/g, '')}`}
                      className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{contact.phone}</span>
                    </a>
                  )}
                  {contact.email && (
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{contact.email}</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
