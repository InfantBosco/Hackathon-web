import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { BarChart } from '../../components/admin/charts/BarChart';
import { DonutChart } from '../../components/admin/charts/DonutChart';
import { adminService, AdminAnalytics } from '../../services/adminService';
import { BarChart3, RefreshCw } from 'lucide-react';

export const AdminAnalyticsPage: React.FC = () => {
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  const loadAnalytics = () => {
    setLoading(true);
    adminService
      .getAnalytics()
      .then((data) => setAnalytics(data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  const collegeBarData = analytics?.topColleges?.map((c) => ({ label: c.college, value: c.count })) || [];
  const deptBarData = analytics?.topDepartments?.map((d) => ({ label: d.department, value: d.count })) || [];

  const foodDonutData = analytics?.foodPreferenceDistribution?.map((f) => ({
    label: f.foodPreference === 'VEGETARIAN' || (f.foodPreference as any) === 'VEG' ? 'Vegetarian' : 'Non-Vegetarian',
    value: f.count,
    color: f.foodPreference === 'VEGETARIAN' || (f.foodPreference as any) === 'VEG' ? '#10b981' : '#f59e0b',
  })) || [];

  const paymentDonutData = analytics?.paymentStatusDistribution?.map((p) => ({
    label: p.status,
    value: p.count,
    color: p.status === 'VERIFIED' ? '#10b981' : p.status === 'INITIATED' ? '#3b82f6' : '#ef4444',
  })) || [];

  const registrationDonutData = analytics?.registrationStatusDistribution?.map((r) => ({
    label: r.status,
    value: r.count,
    color: r.status === 'CONFIRMED' ? '#10b981' : r.status === 'PAYMENT_PENDING' ? '#f59e0b' : '#06b6d4',
  })) || [];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-heading font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-cyan-600" />
              Analytics & Operational Breakdown
            </h1>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Server-aggregated metrics on colleges, departments, food preferences, and payment trends.
            </p>
          </div>

          <button
            onClick={loadAnalytics}
            disabled={loading}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh Analytics
          </button>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BarChart data={collegeBarData} title="Top Colleges Distribution" barColor="bg-cyan-500" />
          <BarChart data={deptBarData} title="Top Departments Distribution" barColor="bg-purple-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DonutChart data={foodDonutData} title="Food Preference Breakdown" />
          <DonutChart data={paymentDonutData} title="Payment Status Breakdown" />
          <DonutChart data={registrationDonutData} title="Registration Status Breakdown" />
        </div>
      </div>
    </AdminLayout>
  );
};
