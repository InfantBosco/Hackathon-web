import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { DataTable, Column } from '../../components/admin/DataTable';
import { adminService, AdminParticipant, PaginationMeta } from '../../services/adminService';
import { Search, Filter, RefreshCw, Utensils } from 'lucide-react';

export const AdminParticipantsPage: React.FC = () => {
  const [participants, setParticipants] = useState<AdminParticipant[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>({ page: 1, limit: 25, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [foodFilter, setFoodFilter] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  const loadData = (page = pagination.page, limit = pagination.limit) => {
    setLoading(true);
    adminService
      .getParticipants({
        page,
        limit,
        search: debouncedSearch || undefined,
        foodPreference: foodFilter || undefined,
      })
      .then((res) => {
        setParticipants(res.data);
        setPagination(res.pagination);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData(1, pagination.limit);
  }, [debouncedSearch, foodFilter]);

  const columns: Column<AdminParticipant>[] = [
    {
      header: 'Participant Name',
      cell: (row) => (
        <div className="flex flex-col">
          <span className="font-semibold text-slate-900">{row.name}</span>
          {row.isCaptain && (
            <span className="text-[10px] font-mono text-cyan-600 font-bold uppercase">★ Team Captain</span>
          )}
        </div>
      ),
    },
    {
      header: 'Email',
      cell: (row) => <span className="font-mono text-slate-600 text-xs">{row.email}</span>,
    },
    {
      header: 'Phone',
      cell: (row) => <span className="font-mono text-slate-600 text-xs">{row.phone}</span>,
    },
    {
      header: 'College',
      cell: (row) => <span className="text-slate-800 truncate max-w-[180px] font-medium">{row.college}</span>,
    },
    {
      header: 'Department',
      cell: (row) => <span className="text-slate-600">{row.department} ({row.yearOfStudy})</span>,
    },
    {
      header: 'Food Pref',
      cell: (row) => (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-100 text-slate-700 border border-slate-200">
          <Utensils className="w-3 h-3 text-cyan-600" />
          {row.foodPreference === 'VEGETARIAN' || (row.foodPreference as any) === 'VEG' ? 'Veg' : 'Non-Veg'}
        </span>
      ),
    },
    {
      header: 'Team Name',
      cell: (row) => <span className="font-mono font-semibold text-slate-900">{row.team?.teamName || 'N/A'}</span>,
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-heading font-bold text-slate-900">Participant Visibility Directory</h1>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Read-only participant records across all registered hackathon teams (Expected 1,500+ scale).
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
              placeholder="Search participants by Name, Email, Phone, or College..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-cyan-500 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={foodFilter}
              onChange={(e) => setFoodFilter(e.target.value)}
              className="w-full md:w-auto px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-cyan-500"
            >
              <option value="">All Food Preferences</option>
              <option value="VEGETARIAN">Vegetarian</option>
              <option value="NON_VEGETARIAN">Non-Vegetarian</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={participants}
          pagination={pagination}
          onPageChange={(p) => loadData(p, pagination.limit)}
          onLimitChange={(l) => loadData(1, l)}
          loading={loading}
          emptyMessage="No participants found matching your query."
        />
      </div>
    </AdminLayout>
  );
};
