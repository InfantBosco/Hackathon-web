import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { DataTable, Column } from '../../components/admin/DataTable';
import { adminService, AdminPayment, PaginationMeta } from '../../services/adminService';
import { Search, Filter, RefreshCw, Lock } from 'lucide-react';

export const AdminPaymentsPage: React.FC = () => {
  const [payments, setPayments] = useState<AdminPayment[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>({ page: 1, limit: 25, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  const loadData = (page = pagination.page, limit = pagination.limit) => {
    setLoading(true);
    adminService
      .getPayments({
        page,
        limit,
        search: debouncedSearch || undefined,
        status: statusFilter || undefined,
      })
      .then((res) => {
        setPayments(res.data);
        setPagination(res.pagination);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData(1, pagination.limit);
  }, [debouncedSearch, statusFilter]);

  const columns: Column<AdminPayment>[] = [
    {
      header: 'Registration ID',
      cell: (row) => (
        <span className="font-mono font-bold text-cyan-600">
          {row.registration?.registrationId || 'N/A'}
        </span>
      ),
    },
    {
      header: 'Team Name',
      cell: (row) => <span className="font-semibold text-slate-800">{row.registration?.team?.teamName || 'N/A'}</span>,
    },
    {
      header: 'Amount',
      cell: (row) => <span className="font-mono font-bold text-slate-900">₹{row.amount} INR</span>,
    },
    {
      header: 'Provider',
      cell: (row) => <span className="font-mono text-xs text-slate-600">{row.provider}</span>,
    },
    {
      header: 'Transaction ID',
      cell: (row) => (
        <span className="font-mono text-slate-700 text-xs">
          {row.transactionId || 'N/A'}
        </span>
      ),
    },
    {
      header: 'Payment Status',
      cell: (row) => {
        const isVerified = row.status === 'VERIFIED' || row.status === 'SUCCESS';
        return (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
              isVerified ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
            }`}
          >
            {row.status}
          </span>
        );
      },
    },
    {
      header: 'Timestamp',
      cell: (row) => (
        <span className="font-mono text-slate-500 text-[11px]">
          {new Date(row.createdAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-heading font-bold text-slate-900">Payment Monitoring</h1>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Read-only payment status tracking & transaction reference logs.
            </p>
          </div>

          <button
            onClick={() => loadData()}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </div>

        {/* Read-Only Safety Banner */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs font-mono text-blue-800 flex items-center gap-2">
          <Lock className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            Payment records are strictly read-only. Verification is triggered automatically via gateway transactions.
          </span>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row items-center gap-4 shadow-xs">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Transaction ID, Provider Reference, or Team Name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-cyan-500 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full md:w-auto px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-cyan-500"
            >
              <option value="">All Payment Statuses</option>
              <option value="VERIFIED">VERIFIED</option>
              <option value="INITIATED">INITIATED</option>
              <option value="PENDING">PENDING</option>
              <option value="FAILED">FAILED</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={payments}
          pagination={pagination}
          onPageChange={(p) => loadData(p, pagination.limit)}
          onLimitChange={(l) => loadData(1, l)}
          loading={loading}
          emptyMessage="No payment records found matching your filter criteria."
        />
      </div>
    </AdminLayout>
  );
};
