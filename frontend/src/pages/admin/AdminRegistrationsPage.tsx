import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { DataTable, Column } from '../../components/admin/DataTable';
import { adminService, AdminRegistration, PaginationMeta } from '../../services/adminService';
import { Search, Filter, RefreshCw, Eye } from 'lucide-react';

export const AdminRegistrationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState<AdminRegistration[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>({ page: 1, limit: 25, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);

  // Search & Filter State
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const loadData = (page = pagination.page, limit = pagination.limit) => {
    setLoading(true);
    adminService
      .getRegistrations({
        page,
        limit,
        search: debouncedSearch || undefined,
        status: statusFilter || undefined,
      })
      .then((res) => {
        setRegistrations(res.data);
        setPagination(res.pagination);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData(1, pagination.limit);
  }, [debouncedSearch, statusFilter]);

  const handlePageChange = (newPage: number) => {
    loadData(newPage, pagination.limit);
  };

  const handleLimitChange = (newLimit: number) => {
    loadData(1, newLimit);
  };

  const columns: Column<AdminRegistration>[] = [
    {
      header: 'Registration ID',
      cell: (row) => (
        <span className="font-mono font-bold text-cyan-600">{row.registrationId}</span>
      ),
    },
    {
      header: 'Team Name',
      cell: (row) => <span className="font-semibold text-slate-800">{row.team.teamName}</span>,
    },
    {
      header: 'Captain Name',
      cell: (row) => <span className="font-medium text-slate-900">{row.team.captain?.name}</span>,
    },
    {
      header: 'Captain Email',
      cell: (row) => <span className="font-mono text-slate-500 text-xs">{row.team.captain?.email}</span>,
    },
    {
      header: 'Members',
      cell: (row) => (
        <span className="font-mono text-slate-700 font-semibold">
          {row.team._count?.participants || 4}
        </span>
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
      header: 'Actions',
      cell: (row) => (
        <button
          onClick={() => navigate(`/admin/registrations/${row.registrationId}`)}
          className="px-2.5 py-1 bg-slate-100 hover:bg-cyan-50 text-slate-700 hover:text-cyan-700 font-mono text-[11px] rounded border border-slate-200 flex items-center gap-1 transition-colors"
        >
          <Eye className="w-3.5 h-3.5" /> Inspect
        </button>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-heading font-bold text-slate-900">Registration Management</h1>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Read-only administrative inspection of hackathon team registrations.
            </p>
          </div>

          <button
            onClick={() => loadData()}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row items-center gap-4 shadow-xs">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Registration ID, Team Name, Captain Name or Email..."
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
              <option value="">All Statuses</option>
              <option value="CONFIRMED">CONFIRMED</option>
              <option value="PAYMENT_PENDING">PAYMENT PENDING</option>
              <option value="READY_FOR_PAYMENT">READY FOR PAYMENT</option>
              <option value="DRAFT">DRAFT</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={registrations}
          pagination={pagination}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
          loading={loading}
          emptyMessage="No registrations found matching your filter criteria."
        />
      </div>
    </AdminLayout>
  );
};
