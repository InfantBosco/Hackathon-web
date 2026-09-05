import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useRegistrationStore } from '../store/useRegistrationStore';
import { AuthNavbar } from '../components/navigation/AuthNavbar';
import { GridBackground } from '../components/backgrounds/GridBackground';
import { NeuralNoise } from '../components/backgrounds/NeuralNoise';
import { StatusTimeline } from '../components/registration/StatusTimeline';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  Users,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ArrowRight,
  Calendar,
  MapPin,
  Utensils,
} from 'lucide-react';

export const RegistrationStatusPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { activeRegistration, fetchUserRegistration, refreshRegistrationSummary, isSubmitting } =
    useRegistrationStore();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetchUserRegistration(user.id).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user?.id, fetchUserRegistration]);

  const handleRefresh = async () => {
    if (activeRegistration && user?.id) {
      setRefreshing(true);
      try {
        await refreshRegistrationSummary(activeRegistration.registrationId, user.id);
      } finally {
        setRefreshing(false);
      }
    }
  };

  if (loading) {
    return (
      <GridBackground className="min-h-screen flex flex-col justify-between relative overflow-hidden">
        <NeuralNoise opacity={0.25} />
        <AuthNavbar />
        <div className="flex-1 flex items-center justify-center p-8 relative z-10">
          <div className="flex flex-col items-center gap-3">
            <RefreshCw className="w-8 h-8 text-[var(--color-accent-cyan)] animate-spin" />
            <p className="text-xs font-mono text-[var(--color-text-secondary)]">Loading registration status...</p>
          </div>
        </div>
      </GridBackground>
    );
  }

  if (!activeRegistration) {
    return (
      <GridBackground className="min-h-screen flex flex-col justify-between relative overflow-hidden">
        <NeuralNoise opacity={0.25} />
        <AuthNavbar />
        <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-16 text-center relative z-10">
          <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-8 space-y-6">
            <AlertCircle className="w-12 h-12 text-amber-400 mx-auto" />
            <h2 className="text-2xl font-heading font-bold text-white">No Active Registration Found</h2>
            <p className="text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
              You have not registered a team for HackNEX 2026 yet. Start your registration now to reserve your spot!
            </p>
            <Button
              onClick={() => navigate('/register')}
              className="px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider bg-[var(--color-accent-cyan)] text-black"
            >
              Start Team Registration →
            </Button>
          </div>
        </main>
      </GridBackground>
    );
  }

  const isConfirmed = activeRegistration.status === 'CONFIRMED' || activeRegistration.status === 'PAYMENT_VERIFIED';
  const isPending = activeRegistration.status === 'PAYMENT_PENDING' || activeRegistration.status === 'READY_FOR_PAYMENT';

  return (
    <GridBackground className="min-h-screen flex flex-col justify-between relative overflow-hidden">
      <NeuralNoise opacity={0.25} />
      <AuthNavbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 md:py-12 space-y-8 relative z-10">
        {/* Page Title Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--color-border)] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent-cyan)] font-bold">
                HACKNEX 2026 REGISTRATION
              </span>
              <Badge variant={isConfirmed ? 'success' : 'warning'}>
                {isConfirmed ? 'CONFIRMED' : 'PAYMENT PENDING'}
              </Badge>
            </div>
            <h1 className="text-3xl font-heading font-bold text-white">
              Registration Status & Details
            </h1>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
            className="text-xs font-mono text-[var(--color-accent-cyan)] border border-[var(--color-border)] hover:bg-[var(--color-surface)] self-start md:self-auto flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh Status'}
          </Button>
        </div>

        {/* Timeline Component */}
        <StatusTimeline registrationStatus={activeRegistration.status} />

        {/* Registration Overview Card */}
        <div className="bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/20 rounded-[var(--radius-lg)] p-6 md:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--color-border)] pb-4 gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
                Registration ID
              </span>
              <p className="text-2xl font-mono font-bold text-[var(--color-accent-cyan)]">
                {activeRegistration.registrationId}
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
                Team Name
              </span>
              <p className="text-xl font-heading font-bold text-white">
                {activeRegistration.team.name}
              </p>
            </div>
          </div>

          {/* Event Quick Meta */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-xs">
            <div>
              <span className="text-[var(--color-text-muted)] font-mono block">Event Dates</span>
              <span className="text-white font-semibold flex items-center gap-1 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-[var(--color-accent-cyan)]" /> Oct 7–9, 2026
              </span>
            </div>
            <div>
              <span className="text-[var(--color-text-muted)] font-mono block">Venue</span>
              <span className="text-white font-semibold flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[var(--color-accent-cyan)]" /> KITS, Coimbatore
              </span>
            </div>
            <div>
              <span className="text-[var(--color-text-muted)] font-mono block">Team Size</span>
              <span className="text-white font-semibold flex items-center gap-1 mt-0.5">
                <Users className="w-3.5 h-3.5 text-[var(--color-accent-cyan)]" /> 4 Participants
              </span>
            </div>
          </div>

          {/* Read-Only Participant Roster */}
          <div>
            <h3 className="text-sm font-mono uppercase font-bold text-white tracking-wider mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-[var(--color-accent-cyan)]" />
              Registered Team Participants (Read-Only)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeRegistration.team.participants?.map((p, idx) => (
                <div
                  key={idx}
                  className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] p-4 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2 mb-2">
                    <span className="font-mono font-bold text-[var(--color-accent-cyan)] uppercase text-[11px]">
                      {p.isCaptain ? '★ Team Captain' : `Participant ${idx + 1}`}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase">
                      LOCKED
                    </span>
                  </div>
                  <p className="font-semibold text-white text-sm">{p.name}</p>
                  <p className="text-[var(--color-text-secondary)]">✉ {p.email}</p>
                  <p className="text-[var(--color-text-muted)]">📞 {p.phone}</p>
                  <p className="text-[var(--color-text-muted)]">🎓 {p.college}</p>
                  <p className="text-[var(--color-text-muted)]">
                    📚 {p.department} ({p.yearOfStudy})
                  </p>
                  <div className="pt-2 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[rgba(0,240,255,0.08)] text-[var(--color-accent-cyan)] border border-[rgba(0,240,255,0.2)]">
                      <Utensils className="w-3 h-3" />
                      {p.foodPreference === 'VEGETARIAN' || (p.foodPreference as any) === 'VEG'
                        ? 'Vegetarian'
                        : 'Non-Vegetarian'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Calculation Summary Card */}
          <div className="bg-gradient-to-r from-[rgba(0,240,255,0.05)] via-[rgba(59,130,246,0.05)] to-[rgba(0,240,255,0.05)] border border-[var(--color-accent-cyan)]/30 rounded-[var(--radius-md)] p-5 space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <CreditCard className="w-6 h-6 text-[var(--color-accent-cyan)] shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-mono uppercase font-bold text-white">Payment Summary</h4>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                    ₹600 / participant × 4 team members
                  </p>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs font-mono uppercase text-[var(--color-text-muted)] block">
                  Authoritative Total
                </span>
                <span className="text-2xl font-mono font-bold text-[var(--color-accent-cyan)]">
                  ₹{activeRegistration.feeSummary.totalAmount} INR
                </span>
              </div>
            </div>

            <div className="p-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-sm)] text-[11px] text-[var(--color-text-muted)] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>No Refund Policy:</strong> Registration fees are non-refundable under any circumstances once payment is verified.
              </span>
            </div>
          </div>

          {/* Dynamic State Action Buttons */}
          <div className="pt-4 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-end gap-4">
            {isPending && (
              <>
                <Button
                  variant="outline"
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="w-full sm:w-auto px-6 py-3 font-mono text-xs uppercase"
                >
                  Check Payment Status
                </Button>
                <Button
                  onClick={() => navigate(`/payment/${activeRegistration.registrationId}`)}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3 font-mono text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[var(--color-accent-cyan)] to-[var(--color-accent-blue)] text-black hover:opacity-90 flex items-center justify-center gap-2"
                >
                  Proceed to Payment <ArrowRight className="w-4 h-4" />
                </Button>
              </>
            )}

            {isConfirmed && (
              <Button
                onClick={() => navigate('/registration/confirmed')}
                className="w-full sm:w-auto px-8 py-3 font-mono text-xs font-bold uppercase tracking-wider bg-emerald-400 text-black hover:bg-emerald-300 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-black" />
                View Confirmed Ticket & Summary
              </Button>
            )}
          </div>
        </div>
      </main>
    </GridBackground>
  );
};
