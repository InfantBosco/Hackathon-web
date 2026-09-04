import React, { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { adminService } from '../../services/adminService';
import { Download, ShieldCheck, FileSpreadsheet, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const AdminExportsPage: React.FC = () => {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleExportCsv = async () => {
    setDownloading(true);
    setDownloadSuccess(false);

    try {
      const blob = await adminService.exportRegistrationsCsv();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `hacknex_registrations_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('CSV Export failed:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-3xl mx-auto">
        <div className="border-b border-slate-200 pb-4">
          <h1 className="text-2xl font-heading font-bold text-slate-900 flex items-center gap-2">
            <Download className="w-6 h-6 text-cyan-600" />
            Registration Data Exports
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Export complete hackathon registration dataset as comma-separated values (CSV).
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 space-y-6 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center shrink-0">
              <FileSpreadsheet className="w-6 h-6 text-cyan-600" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-heading font-bold text-slate-900">
                Full Registration & Participant Dataset (.csv)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Contains complete records for all teams: Registration ID, Team Name, Registration Status, Captain Details, Members 2–4 Profile Details, College, Department, Food Preferences, and Payment Transaction References.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-600 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Export Authorization & Security Notice</span>
            </div>
            <p className="text-[11px] text-slate-500">
              All 15 administrators are authorized to generate and download CSV exports. To preserve participant privacy and audit integrity, every export event is recorded in the administrative audit log.
            </p>
          </div>

          {downloadSuccess && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>CSV File generated and downloaded successfully!</span>
            </div>
          )}

          <div className="pt-2">
            <Button
              onClick={handleExportCsv}
              disabled={downloading}
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              {downloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Generating CSV Export...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" /> Download Complete Registrations CSV
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
