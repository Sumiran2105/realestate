import React from 'react';
import { Mail, Phone, UserRound, WalletCards } from 'lucide-react';
import KycStatusBar from '@/features/profile/components/KycStatusBar';
import ProfileSettings from '@/features/profile/components/ProfileSettings';
import VerificationBadge from '@/features/profile/components/VerificationBadge';
import { useCurrentProfile } from '@/features/profile/hooks/useCurrentProfile';

const BuyerProfile = () => {
  const { profile: profileUser, isLoading } = useCurrentProfile();

  const displayName = profileUser?.name || 'Buyer User';
  const initials =
    displayName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('') || 'BU';

  const accountStatus = profileUser?.accountStatus || 'pending';

  const identityCards = [
    {
      label: 'Email Address',
      value: profileUser?.email || 'buyer@example.com',
      icon: Mail,
      verified: profileUser?.emailVerified,
      tone: 'from-sky-500/15 to-cyan-400/10',
      iconTone: 'text-sky-700',
    },
    {
      label: 'Phone Number',
      value: profileUser?.phone || 'Not available',
      icon: Phone,
      verified: profileUser?.phoneVerified,
      tone: 'from-emerald-500/15 to-lime-400/10',
      iconTone: 'text-emerald-700',
    },
    {
      label: 'User Type',
      value: (profileUser?.role || 'buyer').replace(/^\w/, (char) => char.toUpperCase()),
      icon: UserRound,
      tone: 'from-violet-500/15 to-fuchsia-400/10',
      iconTone: 'text-violet-700',
    },
    {
      label: 'Account Status',
      value: accountStatus.replace(/^\w/, (char) => char.toUpperCase()),
      icon: WalletCards,
      tone: 'from-amber-500/15 to-orange-400/10',
      iconTone: 'text-amber-700',
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.12),_transparent_32%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)]">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-[28px] border border-white/70 bg-white/80 p-8 text-sm text-slate-600 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
            Loading profile...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.12),_transparent_32%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-10 lg:px-8">
        <section className="overflow-hidden rounded-[32px] border border-white/70 bg-white/80 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="relative border-b border-slate-200/70 bg-[linear-gradient(135deg,_#0f172a_0%,_#0f766e_50%,_#22c55e_100%)] px-4 py-7 sm:px-8 sm:py-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.22),_transparent_30%)]" />
            <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[24px] border border-white/30 bg-white/15 text-xl font-semibold tracking-wide text-white shadow-lg sm:h-24 sm:w-24 sm:rounded-3xl sm:text-3xl">
                  {initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-[0.28em] text-white/70">Your Account</p>
                  <h1 className="mt-2 break-words text-2xl font-semibold text-white sm:text-4xl">{displayName}</h1>
                  <KycStatusBar
                    kycStatus={profileUser?.kycStatus}
                    kycCompleted={Boolean(profileUser?.kycCompleted)}
                    variant="header-dark"
                    className="w-full max-w-2xl"
                  />
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
                    This is your profile page where you can view your account details and manage your information.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 lg:justify-end">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/25">
                  <UserRound size={16} />
                  {(profileUser?.role || 'buyer').replace(/^\w/, (char) => char.toUpperCase())}
                </span>
              </div>
            </div>
          </div>

          <div className="px-4 py-6 sm:px-8 sm:py-8">
            <div className="space-y-5 sm:space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Live Fields</p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {identityCards.map((card) => {
                    const FieldIcon = card.icon;

                    return (
                      <div
                        key={card.label}
                        className={`rounded-[24px] border border-slate-200 bg-gradient-to-br ${card.tone} p-4 shadow-sm sm:rounded-3xl sm:p-6`}
                      >
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className={`rounded-xl bg-white p-2.5 shadow-sm ring-1 ring-white/80 sm:rounded-2xl sm:p-3 ${card.iconTone}`}>
                            <FieldIcon size={18} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{card.label}</p>
                              {typeof card.verified === 'boolean' && <VerificationBadge verified={card.verified} />}
                            </div>
                            <p className="mt-2 break-words text-sm font-semibold leading-6 text-slate-900 sm:mt-3 sm:text-lg">{card.value}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <ProfileSettings />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BuyerProfile;
