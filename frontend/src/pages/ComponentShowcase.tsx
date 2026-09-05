import React, { useState } from 'react';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { SectionHeader } from '../components/layout/SectionHeader';
import { Logo } from '../components/branding/Logo';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { GlassCard } from '../components/ui/GlassCard';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { Checkbox } from '../components/ui/Checkbox';
import { RadioGroup } from '../components/ui/Radio';
import { Switch } from '../components/ui/Switch';
import { Modal } from '../components/ui/Modal';
import { ToastContainer, ToastMessage } from '../components/ui/Toast';
import { Accordion } from '../components/ui/Accordion';
import { Timeline } from '../components/ui/Timeline';
import { Counter } from '../components/ui/Counter';
import { BentoGrid, BentoCard } from '../components/ui/BentoGrid';
import { Image } from '../components/ui/Image';
import { Skeleton } from '../components/ui/Skeleton';
import { BackToTop } from '../components/ui/BackToTop';
import { GridBackground } from '../components/backgrounds/GridBackground';
import { NeuralNoise } from '../components/backgrounds/NeuralNoise';
import { ShieldCheck, Zap, Code, Terminal, Sparkles } from 'lucide-react';

export const ComponentShowcase: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(true);
  const [radioSelected, setRadioSelected] = useState('veg');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'warning' | 'info') => {
    const id = Date.now().toString();
    const newToast: ToastMessage = {
      id,
      type,
      title: `Sample ${type.toUpperCase()} Notification`,
      description: 'This is a live notification trigger from the design showcase.',
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <GridBackground className="min-h-screen pb-24">
      <NeuralNoise opacity={0.2} />

      <Container className="pt-12 pb-8">
        <header className="flex flex-col md:flex-row items-center justify-between border-b border-[var(--color-border)] pb-8 gap-4">
          <Logo variant="combined" size="lg" />
          <Badge variant="cyan">PHASE 8 FRONTEND COMPONENT SHOWCASE</Badge>
        </header>
      </Container>

      {/* 1. Typography & Colors */}
      <Section variant="primary">
        <SectionHeader
          badge="DESIGN TOKENS"
          title="Typography & Color Palette"
          subtitle="HackNEX 2026 dark futuristic design tokens with high contrast readability."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <h3 className="text-xl font-heading font-bold text-white mb-4 border-b border-[var(--color-border)] pb-2">
              Typography Scale
            </h3>
            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono text-[var(--color-text-muted)]">Display / Heading (Outfit)</span>
                <p className="text-4xl font-heading font-black text-white tracking-tight">DISPLAY HEADING 48PX</p>
              </div>
              <div>
                <span className="text-xs font-mono text-[var(--color-text-muted)]">H2 Section Title (Outfit)</span>
                <h2 className="text-2xl font-heading font-bold text-[var(--color-accent-cyan)]">Section Header 24PX</h2>
              </div>
              <div>
                <span className="text-xs font-mono text-[var(--color-text-muted)]">Body Text (Inter)</span>
                <p className="text-sm text-[var(--color-text-secondary)] flex items-center gap-1 flex-wrap">
                  <span>HackNEX is Karunya's flagship 3-day hackathon powered by</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-white">
                    <img src="/logomain_svg.png" alt="NEXUS Logo" className="h-3.5 w-auto shrink-0 inline-block align-middle" />
                    NEXUS
                  </span>
                  <span>Club, expected to host 1,500+ participants.</span>
                </p>
              </div>
              <div>
                <span className="text-xs font-mono text-[var(--color-text-muted)] font-mono">Code / Technical (JetBrains Mono)</span>
                <p className="font-mono text-xs text-[var(--color-accent-purple)]">const TEAM_SIZE = 4; // 1 Captain + 3 Members</p>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-heading font-bold text-white mb-4 border-b border-[var(--color-border)] pb-2">
              Color Tokens
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-md bg-[#00f0ff] text-slate-950 font-bold text-xs">Cyan Accent (#00f0ff)</div>
              <div className="p-3 rounded-md bg-[#9d4edd] text-white font-bold text-xs">Purple Accent (#9d4edd)</div>
              <div className="p-3 rounded-md bg-[#05070f] border border-[var(--color-border)] text-white text-xs">BG Primary (#05070f)</div>
              <div className="p-3 rounded-md bg-[#111628] border border-[var(--color-border)] text-white text-xs">Surface (#111628)</div>
              <div className="p-3 rounded-md bg-emerald-900/50 text-emerald-400 border border-emerald-700 text-xs">Success State</div>
              <div className="p-3 rounded-md bg-red-900/50 text-red-400 border border-red-700 text-xs">Error State</div>
            </div>
          </Card>
        </div>
      </Section>

      {/* 2. Buttons & Badges */}
      <Section variant="secondary">
        <SectionHeader
          badge="INTERACTION"
          title="Buttons, CTAs & Badges"
          subtitle="Accessible buttons with hover scale, icon support, loading states, and category badges."
        />

        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <Button variant="primary">
            REGISTER NOW
          </Button>
          <Button variant="secondary" leftIcon={<Terminal className="w-4 h-4" />}>
            Explore Domains
          </Button>
          <Button variant="outline" rightIcon={<Sparkles className="w-4 h-4" />}>
            View Schedule
          </Button>
          <Button variant="ghost">Ghost Action</Button>
          <Button variant="primary" isLoading>
            Processing
          </Button>
          <Button variant="secondary" disabled>
            Disabled Button
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Badge variant="cyan">Registration Open</Badge>
          <Badge variant="purple">AI / Cybersecurity</Badge>
          <Badge variant="success">Payment Verified</Badge>
          <Badge variant="warning">Action Pending</Badge>
          <Badge variant="error">Registration Failed</Badge>
          <Badge variant="outline">₹600 Fee / Team</Badge>
        </div>
      </Section>

      {/* 3. Cards, Glassmorphism & Bento Grid */}
      <Section variant="primary">
        <SectionHeader
          badge="CARDS & LAYOUTS"
          title="Glassmorphism & Bento Grid"
          subtitle="High-density technical content layout primitives."
        />

        <BentoGrid className="mb-12">
          <BentoCard colSpan={2} rowSpan={1}>
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-6 h-6 text-[var(--color-accent-cyan)]" />
              <h3 className="text-xl font-heading font-bold text-white">1,500+ Expected Participants</h3>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Join teams from across India competing in a 24-hour continuous offline innovation sprint at Karunya Institute of Technology and Sciences.
            </p>
          </BentoCard>

          <BentoCard colSpan={1} rowSpan={1}>
            <ShieldCheck className="w-6 h-6 text-[var(--color-accent-purple)] mb-2" />
            <h3 className="text-lg font-heading font-bold text-white">₹1,500,000+ Prizes</h3>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">Huge prize pool across track winners & special domain awards.</p>
          </BentoCard>
        </BentoGrid>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard glowColor="cyan">
            <h4 className="text-lg font-heading font-bold text-white mb-2">Glassmorphism Surface (Cyan Glow)</h4>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Backdrop blur panel (`glass-panel`) with hover cyan border glow effect.
            </p>
          </GlassCard>

          <GlassCard glowColor="purple">
            <h4 className="text-lg font-heading font-bold text-white mb-2">Glassmorphism Surface (Purple Glow)</h4>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Backdrop blur panel (`glass-panel`) with hover purple border glow effect.
            </p>
          </GlassCard>
        </div>
      </Section>

      {/* 4. Form Components */}
      <Section variant="secondary">
        <SectionHeader
          badge="FORMS"
          title="Accessible Form Primitives"
          subtitle="Prepared for upcoming captain and participant registration flows."
        />

        <div className="max-w-2xl mx-auto space-y-6">
          <Input label="Team Name" placeholder="Enter your unique team name" leftIcon={<Code className="w-4 h-4" />} />
          <Input label="Captain Email" placeholder="captain@karunya.edu" error="Must be a valid email address" />
          <Textarea label="Project Pitch / Abstract" placeholder="Briefly describe your project idea..." />
          <Select
            label="Year of Study"
            options={[
              { value: '1', label: '1st Year' },
              { value: '2', label: '2nd Year' },
              { value: '3', label: '3rd Year' },
              { value: '4', label: '4th Year' },
            ]}
          />
          <RadioGroup
            name="foodPreference"
            label="Captain Food Preference"
            selectedValue={radioSelected}
            onChange={setRadioSelected}
            options={[
              { value: 'veg', label: 'Vegetarian', description: 'Standard vegetarian meal provided' },
              { value: 'non_veg', label: 'Non-Vegetarian', description: 'Standard non-vegetarian meal provided' },
            ]}
          />
          <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border-subtle)]">
            <Checkbox label="I agree to the HackNEX Code of Conduct" />
            <Switch label="Enable SMS Alerts" checked={switchChecked} onChange={setSwitchChecked} />
          </div>
        </div>
      </Section>

      {/* 5. Widgets, Accordion, Timeline, Counter & Toast */}
      <Section variant="primary">
        <SectionHeader
          badge="WIDGETS"
          title="Interactive Visual Components"
          subtitle="Accordions, Counters, Timelines, Modals, and Notifications."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Counter end={1500} suffix="+" label="Hackers" />
          <Counter end={375} suffix="+" label="Teams" />
          <Counter end={3} label="Days (Oct 7-9)" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-heading font-bold text-white mb-4">Event Timeline Component</h3>
            <Timeline
              items={[
                { id: '1', date: 'OCTOBER 7, 2026', time: '09:00 AM', title: 'Grand Opening & Keynote', description: 'HackNEX official inauguration at Karunya Auditorium.', status: 'completed' },
                { id: '2', date: 'OCTOBER 7, 2026', time: '11:00 AM', title: 'Hacking Begins', description: '36-hour continuous coding sprint begins.', status: 'current' },
                { id: '3', date: 'OCTOBER 9, 2026', time: '04:00 PM', title: 'Winner Announcement', description: 'Final judging demo and prize distribution ceremony.', status: 'upcoming' },
              ]}
            />
          </div>

          <div>
            <h3 className="text-xl font-heading font-bold text-white mb-4">Accordion FAQ Component</h3>
            <Accordion
              items={[
                { id: 'faq-1', title: 'What is the team size requirement for HackNEX?', content: 'Every team must consist of exactly 4 participants (1 Team Captain + 3 Team Members).' },
                { id: 'faq-2', title: 'Can members be from different colleges?', content: 'Yes! Cross-college and cross-department teams are fully supported.' },
                { id: 'faq-3', title: 'What is the registration fee?', content: 'The registration fee is ₹600 per team of 4.' },
              ]}
            />
          </div>
        </div>

        {/* Modal & Toast Triggers */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-[var(--color-border-subtle)]">
          <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
            Open Sample Modal
          </Button>
          <Button variant="outline" onClick={() => addToast('success')}>
            Trigger Toast Notification
          </Button>
        </div>

        {/* Skeletons & Image Fallbacks */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <span className="text-xs font-mono text-[var(--color-text-muted)] mb-2 block">Skeleton Loading Primitive</span>
            <div className="space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>

          <div>
            <span className="text-xs font-mono text-[var(--color-text-muted)] mb-2 block">Optimized Image Fallback</span>
            <Image src="/invalid-image-path.jpg" alt="Missing image showcase" aspectRatio="video" />
          </div>
        </div>
      </Section>

      {/* Modal Dialog */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="HackNEX Design System Modal"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={() => setIsModalOpen(false)}>
              Confirm Action
            </Button>
          </>
        }
      >
        <p>This is a reusable, accessible modal dialog with backdrop blur, focus management, and keyboard ESC escape handler.</p>
      </Modal>

      {/* Toast Notifications Overlay */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      <BackToTop />
    </GridBackground>
  );
};
