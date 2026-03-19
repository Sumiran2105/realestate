import React from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheck, Clock3, ArrowRight } from 'lucide-react';

const KycStatusBar = ({
  kycStatus = 'not_started',
  kycCompleted = false,
  variant = 'default',
  className = '',
}) => {
  const normalizedStatus = (kycStatus || 'not_started').toLowerCase();
  const label = normalizedStatus.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  const isHeaderDark = variant === 'header-dark';

  const containerClasses = isHeaderDark
    ? kycCompleted
      ? 'border-emerald-300/30 bg-emerald-400/15 text-white'
      : 'border-white/20 bg-slate-950/15 text-white backdrop-blur'
    : kycCompleted
      ? 'border-emerald-200 bg-emerald-50/90 text-emerald-800'
      : 'border-amber-200 bg-amber-50/90 text-amber-800';

  const iconClasses = isHeaderDark
    ? kycCompleted
      ? 'bg-white/15 text-white'
      : 'bg-white/10 text-white'
    : kycCompleted
      ? 'bg-emerald-100 text-emerald-700'
      : 'bg-amber-100 text-amber-700';

  const buttonClasses = isHeaderDark
    ? 'bg-white text-slate-900 ring-1 ring-white/30 hover:bg-slate-100'
    : 'bg-white text-slate-900 ring-1 ring-black/5 hover:bg-slate-100';

  return (
    <div
      className={`mt-4 flex flex-col gap-3 rounded-2xl border px-4 py-3 sm:flex-row sm:items-center sm:justify-between ${containerClasses} ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className={`rounded-xl p-2 ${iconClasses}`}>
          {kycCompleted ? <BadgeCheck size={16} /> : <Clock3 size={16} />}
        </div>
        <div>
          <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${isHeaderDark ? 'text-white/70' : 'opacity-75'}`}>
            KYC Status
          </p>
          <p className="text-sm font-semibold">{label}</p>
        </div>
      </div>

      {!kycCompleted && (
        <Link
          to="/kyc"
          className={`inline-flex items-center gap-2 self-start rounded-full px-4 py-2 text-sm font-semibold transition sm:self-auto ${buttonClasses}`}
        >
          Complete KYC
          <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
};

export default KycStatusBar;
