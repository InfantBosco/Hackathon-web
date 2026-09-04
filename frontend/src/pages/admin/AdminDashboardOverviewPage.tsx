import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { DataTable, Column } from '../../components/admin/DataTable';
import { adminService, DashboardMetrics, AdminRegistration } from '../../services/adminService';
import { Users, ClipboardList, CheckCircle2, Clock, CreditCard, ArrowRight, IndianRupee } from 'lucide-react';

export const AdminDashboardOverviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [recentRegistrations, setRecentRegistrations] = useState<AdminRegistration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      adminService.getDashboardMetrics(),
      adminService.getRegistrations({ page: 1, limit: 5 }),
    ])
      .then(([metricsRes, regRes]) => {
        setMetrics(metricsRes.metrics);
        setRecentRegistrations(regRes.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const columns: Column<AdminRegistration>[] = [
    {
      header: 'Registration ID',
      accessorKey: 'registrationId',
      cell: (row) => (
        <span className="font-mono font-bold text-cyan-600">{row.registrationId}</span>
      ),
    },
    {
      header: 'Team Name',
      cell: (row) => <span className="font-semibold text-slate-800">{row.team.teamName}</span>,
    },
    {
      header: 'Captain',
      cell: (row) => (
        <div className="flex flex-col text-xs">
          <span className="font-medium text-slate-900">{row.team.captain?.name}</span>
          <span className="text-slate-500 font-mono text-[11px]">{row.team.captain?.email}</span>
        </div>
      ),
    },
    {
      header: 'Registration Status',
      cell: (row) => {
        const isConfirmed = row.status === 'CONFIRMED' || row.status === 'PAYMENT_VERIFIED';
        return (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
              isConfirmed ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
            }`}
          >
            {row.status}
          </span>
        );
      },
    },
    {
      header: 'Submitted At',
      cell: (row) => (
        <span className="font-mono text-slate-500 text-[11px]">
          {row.submittedAt ? new Date(row.submittedAt).toLocaleDateString() : 'N/A'}
        </span>
      ),
    },
    {
      header: 'Action',
      cell: (row) => (
        <button
          onClick={() => navigate(`/admin/registrations/${row.registrationId}`)}
          className="text-xs font-mono text-cyan-600 hover:text-cyan-800 font-semibold hover:underline"
        >
          Inspect →
        </button>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Operational metrics and real-time registration status for HackNEX 2026.
          </p>
        </div>

        {/* Metrics Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block">Total Teams</span>
              <span className="text-2xl font-mono font-bold text-slate-900 mt-1 block">
                {loading ? '...' : metrics?.totalTeams || 0}
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <ClipboardList className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block">Confirmed Teams</span>
              <span className="text-2xl font-mono font-bold text-emerald-600 mt-1 block">
                {loading ? '...' : metrics?.confirmedTeams || 0}
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block">Total Participants</span>
              <span className="text-2xl font-mono font-bold text-purple-600 mt-1 block">
                {loading ? '...' : metrics?.totalParticipants || 0}
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block">Verified Revenue</span>
              <span className="text-2xl font-mono font-bold text-cyan-600 mt-1 block">
                ₹{loading ? '...' : (metrics?.totalRevenueINR || 0).toLocaleString()} INR
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Secondary Stats Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-amber-50/60 border border-amber-200 rounded-lg p-4 flex items-center gap-3">
            <Clock className="w-5 h-5 text-amber-600 shrink-0" />
            <div className="text-xs">
              <span className="font-mono uppercase text-slate-600 text-[10px] block">Pending Registrations</span>
              <span className="font-bold text-amber-900 text-base">{metrics?.pendingRegistrations || 0}</span>
            </div>
          </div>

          <div className="bg-emerald-50/60 border border-emerald-200 rounded-lg p-4 flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="text-xs">
              <span className="font-mono uppercase text-slate-600 text-[10px] block">Successful Payments</span>
              <span className="font-bold text-emerald-900 text-base">{metrics?.successfulPayments || 0}</span>
            </div>
          </div>

          <div className="bg-blue-50/60 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
            <Users className="w-5 h-5 text-blue-600 shrink-0" />
            <div className="text-xs">
              <span className="font-mono uppercase text-slate-600 text-[10px] block">Total Platform Users</span>
              <span className="font-bold text-blue-900 text-base">{metrics?.totalUsers || 0}</span>
            </div>
          </div>
        </div>

        {/* Recent Registrations Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-heading font-bold text-slate-900">Recent Registrations</h3>
            <button
              onClick={() => navigate('/admin/registrations')}
              className="text-xs font-mono font-bold text-cyan-600 hover:text-cyan-800 flex items-center gap-1"
            >
              View All Registrations <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <DataTable
            columns={columns}
            data={recentRegistrations}
            loading={loading}
          />
        </div>
      </div>
    </AdminLayout>
  );
};
