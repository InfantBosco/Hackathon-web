import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useRegistrationStore } from '../store/useRegistrationStore';
import { AuthNavbar } from '../components/navigation/AuthNavbar';
import { GridBackground } from '../components/backgrounds/GridBackground';
import { NeuralNoise } from '../components/backgrounds/NeuralNoise';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  CheckCircle2,
  ShieldCheck,
  Calendar,
  MapPin,
  Mail,
  ArrowLeft,
  Users,
  Award,
  Sparkles,
} from 'lucide-react';

export const RegistrationConfirmedPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { activeRegistration, fetchUserRegistration } = useRegistrationStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchUserRegistration(user.id).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user?.id, fetchUserRegistration]);

  if (loading) {
    return (
      <GridBackground className="min-h-screen flex flex-col justify-between relative overflow-hidden">
        <NeuralNoise opacity={0.25} />
        <AuthNavbar />
        <div className="flex-1 flex items-center justify-center p-8 relative z-10">
          <span className="text-xs font-mono text-[var(--color-text-secondary)]">Loading ticket...</span>
        </div>
      </GridBackground>
    );
  }

  const registration = activeRegistration;

  return (
    <GridBackground className="min-h-screen flex flex-col justify-between relative overflow-hidden">
      <NeuralNoise opacity={0.25} />
      <AuthNavbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8 md:py-12 space-y-8 text-center relative z-10">
        {/* Animated Celebration Icon */}
        <div className="relative inline-block my-4">
          <div className="absolute inset-0 rounded-full bg-[var(--color-accent-cyan)]/25 blur-2xl animate-pulse" />
          <div className="relative w-24 h-24 mx-auto rounded-full bg-emerald-950/60 border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_30px_rgba(52,211,153,0.4)]">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 stroke-[2.5]" />
          </div>
        </div>

        <div>
          <Badge variant="success" className="font-mono text-xs tracking-widest uppercase mb-3">
            ✓ REGISTRATION OFFICIALLY CONFIRMED
          </Badge>
          <h1 className="text-4xl font-heading font-bold text-white tracking-tight">
            Congratulations, Team Captain!
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-2 max-w-md mx-auto">
            Your team registration and payment for <strong className="text-white">HackNEX 2026</strong> have been fully verified.
          </p>
        </div>

        {/* Confirmed Pass Ticket Card */}
        {registration && (
          <div className="bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/20 rounded-[var(--radius-lg)] p-6 md:p-8 text-left space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
              <Award className="w-32 h-32 text-[var(--color-accent-cyan)]" />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[var(--color-border)] pb-4 gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
                  OFFICIAL TICKET REFERENCE
                </span>
                <p className="text-2xl font-mono font-bold text-[var(--color-accent-cyan)]">
                  {registration.registrationId}
                </p>
              </div>
              <div className="sm:text-right">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)] block">
                  PAYMENT VERIFIED
                </span>
                <Badge variant="success" className="font-mono text-xs mt-0.5">
                  CONFIRMED & READY
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-sm)]">
                <span className="text-[var(--color-text-muted)] font-mono block">Registered Team</span>
                <span className="text-white font-bold text-sm">{registration.team.name}</span>
              </div>
              <div className="p-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-sm)]">
                <span className="text-[var(--color-text-muted)] font-mono block">Confirmed Members</span>
                <span className="text-white font-semibold">{registration.participantCount} Participants (1 Captain + 3 Members)</span>
              </div>
              <div className="p-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-sm)]">
                <span className="text-[var(--color-text-muted)] font-mono block">Event Dates</span>
                <span className="text-white font-semibold flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-[var(--color-accent-cyan)]" /> October 7–9, 2026
                </span>
              </div>
              <div className="p-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-sm)]">
                <span className="text-[var(--color-text-muted)] font-mono block">Venue</span>
                <span className="text-white font-semibold flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[var(--color-accent-cyan)]" /> KITS Campus, Coimbatore
                </span>
              </div>
            </div>

            {/* Confirmed Roster List */}
            <div>
              <h4 className="text-xs font-mono uppercase font-bold text-white tracking-wider mb-3 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[var(--color-accent-cyan)]" />
                Confirmed Team Roster
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {registration.team.participants?.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-sm)] flex items-center justify-between"
                  >
                    <span className="font-medium text-white truncate">{p.name}</span>
                    <span className="text-[10px] font-mono text-[var(--color-accent-cyan)] shrink-0 ml-2">
                      {p.isCaptain ? 'Captain' : 'Member'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Email Dispatch Confirmation Alert */}
            <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-[var(--radius-md)] text-xs text-emerald-300 flex items-start gap-3">
              <Mail className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
              <div>
                <p className="font-bold text-white mb-0.5">Confirmation Email Sent!</p>
                <p className="text-[11px] text-emerald-300/90 leading-relaxed">
                  A receipt and final confirmation email has been dispatched to your captain email address (<strong>{user?.email}</strong>). Please keep your Registration ID for check-in on event day.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={() => navigate('/registration/status')}
            className="w-full sm:w-auto px-6 py-3 font-mono text-xs uppercase bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-white hover:text-[var(--color-accent-cyan)] flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> View Full Registration Status
          </Button>
          <Button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-8 py-3 font-mono text-xs font-bold uppercase tracking-wider bg-[var(--color-accent-cyan)] text-black hover:opacity-90 flex items-center justify-center gap-2"
          >
            Return to HackNEX Home <Sparkles className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-[var(--color-text-muted)] pt-4">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="flex items-center gap-1">
            <span className="inline-flex items-center gap-1 font-semibold text-white">
              <img src="/logomain_svg.png" alt="NEXUS Logo" className="h-3.5 w-auto shrink-0 inline-block align-middle" />
              NEXUS
            </span>
            <span>Club, Karunya Institute of Technology and Sciences</span>
          </span>
        </div>
      </main>
    </GridBackground>
  );
};
