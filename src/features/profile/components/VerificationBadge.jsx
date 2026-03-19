import React from 'react';
import { BadgeCheck, Clock3 } from 'lucide-react';

const VerificationBadge = ({ verified = false, className = '' }) => (
  <span
    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${
      verified
        ? 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200'
        : 'bg-amber-100 text-amber-700 ring-1 ring-amber-200'
    } ${className}`}
  >
    {verified ? <BadgeCheck size={12} /> : <Clock3 size={12} />}
    {verified ? 'Verified' : 'Pending'}
  </span>
);

export default VerificationBadge;
