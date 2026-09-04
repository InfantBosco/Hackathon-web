import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { DataTable, Column } from '../../components/admin/DataTable';
import { adminService, AuditLogItem, PaginationMeta } from '../../services/adminService';
import { ShieldCheck, RefreshCw } from 'lucide-react';

export const AdminAuditLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>({ page: 1, limit: 25, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);

  const loadData = (page = pagination.page, limit = pagination.limit) => {
    setLoading(true);
    adminService
      .getAuditLogs({ page, limit })
      .then((res) => {
        setLogs(res.data);
        setPagination(res.pagination);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData(1, pagination.limit);
  }, []);

  const columns: Column<AuditLogItem>[] = [
    {
      header: 'Timestamp',
      cell: (row) => (
        <span className="font-mono text-slate-500 text-xs">
          {new Date(row.createdAt).toLocaleString()}
        </span>
      ),
    },
    {
      header: 'Admin User',
      cell: (row) => (
        <div className="flex flex-col">
          <span className="font-semibold text-slate-900">{row.adminName}</span>
          <span className="font-mono text-slate-500 text-[11px]">{row.adminEmail}</span>
        </div>
      ),
    },
    {
      header: 'Action',
      cell: (row) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-slate-100 text-slate-800 border border-slate-200">
          {row.action}
        </span>
      ),
    },
    {
      header: 'Target Entity',
      cell: (row) => (
        <span className="font-mono text-xs text-slate-700">
          {row.entityType} {row.entityId ? `(#${row.entityId.slice(0, 8)})` : ''}
        </span>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-heading font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-cyan-600" />
              Administrative Audit Logs
            </h1>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Read-only immutable trail of administrative actions and session events.
            </p>
          </div>

          <button
            onClick={() => loadData()}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </div>

        <DataTable
          columns={columns}
          data={logs}
          pagination={pagination}
          onPageChange={(p) => loadData(p, pagination.limit)}
          onLimitChange={(l) => loadData(1, l)}
          loading={loading}
          emptyMessage="No audit log records recorded yet."
        />
      </div>
    </AdminLayout>
  );
};
