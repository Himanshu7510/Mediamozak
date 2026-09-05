import React, { useState } from 'react';
import { Activity, CheckCircle2, AlertTriangle, XCircle, ArrowRight, RefreshCw, ShieldCheck } from 'lucide-react';
import { auditSeoHealth } from '../services/storage';

interface AdminSeoHealthProps {
  onFixTarget?: (type: string, id: string) => void;
}

export const AdminSeoHealth: React.FC<AdminSeoHealthProps> = ({ onFixTarget }) => {
  const [audit, setAudit] = useState(auditSeoHealth());
  const [isScanning, setIsScanning] = useState(false);

  const handleRescan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setAudit(auditSeoHealth());
      setIsScanning(false);
    }, 400);
  };

  const criticalIssues = audit.issues.filter((i) => i.severity === 'critical');
  const warningIssues = audit.issues.filter((i) => i.severity === 'warning');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <Activity className="w-7 h-7 text-indigo-400" />
            <span>Automated SEO Health & Technical Audit</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Algorithmic scan of all pages, service landing pages, and blog posts for on-page compliance.
          </p>
        </div>

        <button
          onClick={handleRescan}
          disabled={isScanning}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2 transition-colors self-start sm:self-auto shadow-lg shadow-indigo-950/50"
        >
          <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
          <span>{isScanning ? 'Auditing DOM...' : 'Re-Run Health Audit'}</span>
        </button>
      </div>

      {/* Health Score Banner */}
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4" />
            <span>Search Engine Crawl Readiness</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Overall On-Page Health: {audit.score}%
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Your website exhibits strong technical indexing fundamentals. Structured data JSON-LD, canonical tags, and OpenGraph fallbacks are properly configured across all 7 core marketing services.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-center p-4 bg-slate-950/80 rounded-2xl border border-slate-800 min-w-[110px]">
            <span className="text-2xl font-extrabold text-rose-400 block">{criticalIssues.length}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Critical</span>
          </div>

          <div className="text-center p-4 bg-slate-950/80 rounded-2xl border border-slate-800 min-w-[110px]">
            <span className="text-2xl font-extrabold text-amber-400 block">{warningIssues.length}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Warnings</span>
          </div>

          <div className="text-center p-4 bg-slate-950/80 rounded-2xl border border-slate-800 min-w-[110px]">
            <span className="text-2xl font-extrabold text-emerald-400 block">{audit.passedChecks}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Passed</span>
          </div>
        </div>
      </div>

      {/* Audit Checklist & Issues Breakdown */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white">Audit Notes & Recommendations</h3>

        {audit.issues.length === 0 ? (
          <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 shrink-0" />
            <div>
              <strong className="block font-bold">Flawless Compliance!</strong>
              <span>No critical SEO defects or meta tag length warnings detected across the entire site.</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {audit.issues.map((issue, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  {issue.severity === 'critical' ? (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{issue.targetTitle}</span>
                      <span className="text-xs font-mono text-indigo-400">({issue.targetPath})</span>
                    </div>
                    <p className="text-xs text-slate-300">{issue.issue}</p>
                    <p className="text-[11px] text-slate-500 pt-0.5">Recommendation: {issue.recommendation}</p>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0 ${
                    issue.severity === 'critical'
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {issue.severity}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
