import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { adminService, AdminRegistration } from '../../services/adminService';
import {
  ArrowLeft,
  Users,
  CreditCard,
  Lock,
  Utensils,
  Loader2,
} from 'lucide-react';

export const AdminRegistrationDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { registrationId } = useParams<{ registrationId: string }>();
  const [registration, setRegistration] = useState<AdminRegistration | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (registrationId) {
      adminService
        .getRegistrationById(registrationId)
        .then((res) => setRegistration(res.registration))
        .catch((err) => setError(err.message || 'Failed to load registration details.'))
        .finally(() => setLoading(false));
    }
  }, [registrationId]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 text-cyan-600 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  if (error || !registration) {
    return (
      <AdminLayout>
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center space-y-4">
          <p className="text-red-600 font-mono text-xs">{error || 'Registration not found.'}</p>
          <button
            onClick={() => navigate('/admin/registrations')}
            className="px-4 py-2 bg-slate-900 text-white rounded font-mono text-xs"
          >
            ← Return to Registrations List
          </button>
        </div>
      </AdminLayout>
    );
  }

  const isConfirmed = registration.status === 'CONFIRMED' || registration.status === 'PAYMENT_VERIFIED';
  const latestPayment = registration.payments && registration.payments.length > 0 ? registration.payments[0] : null;

  return (
    <AdminLayout>
      <div className="space-y-8">
        <button
          onClick={() => navigate('/admin/registrations')}
          className="text-xs font-mono text-slate-500 hover:text-slate-900 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Registrations List
        </button>

        {/* Read-Only Banner Notice */}
        <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-lg text-xs font-mono text-blue-800 flex items-center gap-2.5">
          <Lock className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            <strong>Read-Only Notice:</strong> Administrative views are strictly operational & read-only. Participant profiles and payment transaction data cannot be modified.
          </span>
        </div>

        {/* Team Overview Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                Registration ID
              </span>
              <p className="text-2xl font-mono font-bold text-cyan-600">
                {registration.registrationId}
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                Team Name
              </span>
              <p className="text-xl font-heading font-bold text-slate-900">
                {registration.team.teamName}
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
                Status
              </span>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold uppercase mt-0.5 ${
                  isConfirmed ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}
              >
                {registration.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-slate-600">
            <div>
              <span className="text-slate-400 block">Submitted At</span>
              <span className="font-semibold text-slate-800">
                {registration.submittedAt ? new Date(registration.submittedAt).toLocaleString() : 'N/A'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">Confirmed At</span>
              <span className="font-semibold text-slate-800">
                {registration.confirmedAt ? new Date(registration.confirmedAt).toLocaleString() : 'N/A'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">Total Members</span>
              <span className="font-semibold text-slate-800">
                {registration.team.participants?.length || 4} Participants
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">Captain</span>
              <span className="font-semibold text-slate-800">
                {registration.team.captain?.name}
              </span>
            </div>
          </div>
        </div>

        {/* 4-Member Roster Inspection */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-600" />
            Registered 4-Member Team Roster
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {registration.team.participants?.map((p, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 space-y-2 text-xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
                  <span className="font-mono font-bold text-cyan-600 uppercase text-[11px]">
                    {p.isCaptain ? '★ Team Captain' : `Member ${idx + 1}`}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">
                    READ-ONLY
                  </span>
                </div>
                <p className="font-semibold text-slate-900 text-sm">{p.name}</p>
                <p className="text-slate-600 font-mono">✉ {p.email}</p>
                <p className="text-slate-600 font-mono">📞 {p.phone}</p>
                <p className="text-slate-700">🎓 {p.college}</p>
                <p className="text-slate-700">
                  📚 {p.department} ({p.yearOfStudy})
                </p>
                {p.linkedinUrl && (
                  <p className="text-cyan-600 font-mono truncate">🔗 {p.linkedinUrl}</p>
                )}
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-100 text-slate-700 border border-slate-200">
                    <Utensils className="w-3 h-3 text-cyan-600" />
                    {p.foodPreference === 'VEGETARIAN' || (p.foodPreference as any) === 'VEG' ? 'Vegetarian' : 'Non-Vegetarian'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Transaction Inspection */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs">
          <h3 className="text-base font-mono uppercase font-bold text-slate-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-cyan-600" />
            Payment Transaction Summary
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-slate-400 block text-[10px] uppercase">Payment Status</span>
              <span className="font-bold text-slate-900 text-sm">
                {latestPayment ? latestPayment.status : 'PENDING'}
              </span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-slate-400 block text-[10px] uppercase">Authoritative Amount</span>
              <span className="font-bold text-cyan-600 text-sm">
                ₹{latestPayment ? latestPayment.amount : 2400} INR
              </span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-slate-400 block text-[10px] uppercase">Transaction ID</span>
              <span className="font-bold text-slate-900 truncate block">
                {latestPayment?.transactionId || 'N/A'}
              </span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-slate-400 block text-[10px] uppercase">Provider Reference</span>
              <span className="font-bold text-slate-900 truncate block">
                {latestPayment?.providerReference || 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
