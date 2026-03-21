import React, { useMemo, useState } from 'react';
import {
  BadgeCheck,
  Building2,
  Camera,
  Clock3,
  Eye,
  House,
  Mail,
  MapPin,
  MessageSquareMore,
  Phone,
  Pencil,
  Save,
  ShieldCheck,
  Star,
  UserRound,
} from 'lucide-react';
import DashboardLayout from '@/shared/layouts/DashboardLayout';
import { useAuth } from '@/features/auth/hooks/useAuth';
import KycStatusBar from '@/features/profile/components/KycStatusBar';
import ProfileSettings from '@/features/profile/components/ProfileSettings';
import VerificationBadge from '@/features/profile/components/VerificationBadge';
import { useCurrentProfile } from '@/features/profile/hooks/useCurrentProfile';
import { useToast } from '@/shared/hooks/useToast';
import { getPropertyManagerLabel } from '@/shared/utils/dashboard';

const SellerProfile = () => {
  const { user, updateUser } = useAuth();
  const { profile, isLoading: isProfileLoading } = useCurrentProfile();
  const { success, info } = useToast();
  const roleLabel = getPropertyManagerLabel(user?.role);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileEdits, setProfileEdits] = useState({});
  const baseProfileData = useMemo(() => ({
    company: `${profile?.name || roleLabel} Properties`,
    gstNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    panNumber: '',
    aadhaarNumber: '',
    experience: '',
    specialization: [],
    about: '',
    website: '',
    socialMedia: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: ''
    },
    name: profile?.name || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
  }), [profile?.email, profile?.name, profile?.phone, roleLabel]);
  const profileData = useMemo(() => ({
    ...baseProfileData,
    ...profileEdits,
    socialMedia: {
      ...baseProfileData.socialMedia,
      ...(profileEdits.socialMedia || {}),
    },
  }), [baseProfileData, profileEdits]);

  const stats = {
    totalProperties: 24,
    activeListings: 18,
    soldProperties: 6,
    totalViews: 3456,
    totalInquiries: 89,
    avgResponseTime: '2.5 hours',
    rating: 4.8,
    reviews: 42,
    memberSince: profile?.createdAt
      ? new Date(profile.createdAt).toLocaleDateString('en-IN', {
          month: 'short',
          year: 'numeric',
        })
      : 'Jan 2024'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfileEdits((current) => ({
        ...current,
        [parent]: {
          ...(current[parent] || profileData[parent]),
          [child]: value
        }
      }));
    } else {
      setProfileEdits((current) => ({
        ...current,
        [name]: value
      }));
    }
  };

  const handleSave = () => {
    setLoading(true);

    setTimeout(() => {
      updateUser({
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
      });
      setLoading(false);
      setIsEditing(false);
      setProfileEdits({});
      info('Basic profile details are loaded from the backend. Save is still local until an update-profile API is connected.', 'Local Save Only');
      success('Profile details updated locally.', 'Profile Updated');
    }, 1500);
  };

  const handleImageUpload = (e) => {
    // Handle profile image upload
    console.log('Uploading image:', e.target.files[0]);
  };

  const isKycVerified = user?.accountStatus === 'active';
  const verificationLabel = isKycVerified ? 'KYC Verified' : 'Verification Pending';
  const displayName = profileData.name || `${roleLabel} User`;
  const initials =
    displayName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('') || 'SU';

  const summaryCards = [
    {
      label: 'Total Properties',
      value: stats.totalProperties,
      icon: House,
      tone: 'from-sky-500/15 to-cyan-400/10',
      iconTone: 'text-sky-700',
    },
    {
      label: 'Active Listings',
      value: stats.activeListings,
      icon: BadgeCheck,
      tone: 'from-emerald-500/15 to-lime-400/10',
      iconTone: 'text-emerald-700',
    },
    {
      label: 'Total Views',
      value: stats.totalViews,
      icon: Eye,
      tone: 'from-violet-500/15 to-fuchsia-400/10',
      iconTone: 'text-violet-700',
    },
    {
      label: 'Inquiries',
      value: stats.totalInquiries,
      icon: MessageSquareMore,
      tone: 'from-amber-500/15 to-orange-400/10',
      iconTone: 'text-amber-700',
    },
  ];

  const personalFields = [
    {
      label: 'Full Name',
      name: 'name',
      type: 'text',
      icon: UserRound,
      tone: 'from-sky-500/15 to-cyan-400/10',
      iconTone: 'text-sky-700',
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      verificationKey: 'emailVerified',
      icon: Mail,
      tone: 'from-emerald-500/15 to-lime-400/10',
      iconTone: 'text-emerald-700',
    },
    {
      label: 'Phone',
      name: 'phone',
      type: 'tel',
      verificationKey: 'phoneVerified',
      icon: Phone,
      tone: 'from-violet-500/15 to-fuchsia-400/10',
      iconTone: 'text-violet-700',
    },
    {
      label: 'Experience',
      name: 'experience',
      type: 'select',
      icon: Clock3,
      tone: 'from-amber-500/15 to-orange-400/10',
      iconTone: 'text-amber-700',
    },
  ];

  const businessFields = [
    { label: 'Company Name', name: 'company' },
    { label: 'GST Number', name: 'gstNumber' },
    { label: 'PAN Number', name: 'panNumber' },
    { label: 'Aadhaar Number', name: 'aadhaarNumber' },
  ];

  const addressFields = [
    { label: 'Street Address', name: 'address', fullWidth: true },
    { label: 'City', name: 'city' },
    { label: 'State', name: 'state' },
    { label: 'Pincode', name: 'pincode' },
    { label: 'Website', name: 'website' },
  ];

  const renderField = (field) => {
    const verified =
      field.verificationKey === 'emailVerified'
        ? profile?.emailVerified
        : field.verificationKey === 'phoneVerified'
          ? profile?.phoneVerified
          : null;

    if (field.type === 'select') {
      return isEditing ? (
        <select
          name={field.name}
          value={profileData[field.name]}
          onChange={handleChange}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
        >
          <option>1-2 years</option>
          <option>3-5 years</option>
          <option>5-10 years</option>
          <option>10+ years</option>
        </select>
      ) : (
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <p className="break-words text-base font-semibold text-slate-900 sm:text-lg">{profileData[field.name]}</p>
          {typeof verified === 'boolean' && <VerificationBadge verified={verified} />}
        </div>
      );
    }

    return isEditing ? (
      <input
        type={field.type || 'text'}
        name={field.name}
        value={profileData[field.name]}
        onChange={handleChange}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
      />
    ) : (
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <p className="min-w-0 break-all text-base font-semibold text-slate-900 sm:text-lg">{profileData[field.name]}</p>
        {typeof verified === 'boolean' && <VerificationBadge verified={verified} />}
      </div>
    );
  };

  if (isProfileLoading) {
    return (
      <DashboardLayout title={`${roleLabel} Profile`}>
        <div className="rounded-[28px] border border-white/70 bg-white/80 p-8 text-sm text-slate-600 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
          Loading profile...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title={`${roleLabel} Profile`}>
      <div className="space-y-6 sm:space-y-8">
        <section className="overflow-hidden rounded-[32px] border border-white/70 bg-white/80 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="relative border-b border-slate-200/70 bg-[linear-gradient(135deg,_#0f172a_0%,_#0f766e_50%,_#22c55e_100%)] px-4 py-7 sm:px-8 sm:py-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.22),_transparent_30%)]" />
            <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-[24px] border border-white/30 bg-white/15 text-xl font-semibold tracking-wide text-white shadow-lg sm:h-24 sm:w-24 sm:rounded-3xl sm:text-3xl">
                    <img
                      src={`https://ui-avatars.com/api/?name=${displayName}&size=96&background=2563eb&color=fff`}
                      alt={displayName}
                      className="h-full w-full object-cover"
                    />
                    <span className="sr-only">{initials}</span>
                  </div>
                  {isEditing && (
                    <label className="absolute -bottom-2 -right-2 cursor-pointer rounded-2xl border border-white/20 bg-slate-950/80 p-2 text-white shadow-lg backdrop-blur transition hover:bg-slate-900">
                      <Camera size={16} />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-[0.28em] text-white/70">{roleLabel} Account</p>
                  <h1 className="mt-2 break-words text-2xl font-semibold text-white sm:text-4xl">{displayName}</h1>
                  <KycStatusBar
                    kycStatus={profile?.kycStatus}
                    kycCompleted={Boolean(profile?.kycCompleted)}
                    variant="header-dark"
                    className="w-full max-w-2xl"
                  />
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
                    Manage your {roleLabel.toLowerCase()} business identity, profile information, and listing presence from one place.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 lg:justify-end">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/25">
                  <Building2 size={16} />
                  {roleLabel}
                </span>
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
                    isKycVerified ? 'bg-white text-emerald-700' : 'bg-white/15 text-white ring-1 ring-white/25'
                  }`}
                >
                  {isKycVerified ? <ShieldCheck size={16} /> : <Clock3 size={16} />}
                  {verificationLabel}
                </span>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
                  >
                    <Pencil size={16} />
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/25 transition hover:bg-white/20"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <Save size={16} />
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6 px-4 py-6 sm:space-y-8 sm:px-8 sm:py-8">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {summaryCards.map((card) => {
                const SummaryIcon = card.icon;

                return (
                  <div
                    key={card.label}
                    className={`rounded-[24px] border border-slate-200 bg-gradient-to-br ${card.tone} p-4 shadow-sm sm:rounded-3xl sm:p-6`}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className={`rounded-xl bg-white p-2.5 shadow-sm ring-1 ring-white/80 sm:rounded-2xl sm:p-3 ${card.iconTone}`}>
                        <SummaryIcon size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{card.label}</p>
                        <p className="mt-2 break-words text-sm font-semibold text-slate-900 sm:mt-3 sm:text-lg">{card.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="space-y-6">
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-2xl bg-sky-50 p-3 text-sky-700 ring-1 ring-sky-100">
                    <UserRound size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Personal Information</p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {personalFields.map((field) => {
                    const FieldIcon = field.icon;

                    return (
                      <div
                        key={field.name}
                        className={`rounded-[24px] border border-slate-200 bg-gradient-to-br ${field.tone} p-4 shadow-sm sm:rounded-3xl sm:p-5`}
                      >
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className={`rounded-xl bg-white p-2.5 shadow-sm ring-1 ring-white/80 sm:rounded-2xl sm:p-3 ${field.iconTone}`}>
                            <FieldIcon size={18} />
                          </div>
                          <div className="min-w-0 flex-1 overflow-hidden">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{field.label}</p>
                            {renderField(field)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700 ring-1 ring-emerald-100">
                    <Building2 size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Business Information</p>
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  {businessFields.map((field) => (
                    <div key={field.name}>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{field.label}</p>
                      {renderField(field)}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-2xl bg-rose-50 p-3 text-rose-700 ring-1 ring-rose-100">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Address</p>
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  {addressFields.map((field) => (
                    <div key={field.name} className={field.fullWidth ? 'sm:col-span-2' : ''}>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{field.label}</p>
                      {renderField(field)}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="rounded-2xl bg-violet-50 p-3 text-violet-700 ring-1 ring-violet-100">
                      <MessageSquareMore size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">About</p>
                    </div>
                  </div>
                  {isEditing ? (
                    <textarea
                      name="about"
                      value={profileData.about}
                      onChange={handleChange}
                      rows="6"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                    />
                  ) : (
                    <p className="leading-7 text-slate-700">{profileData.about}</p>
                  )}
                </div>

                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="rounded-2xl bg-amber-50 p-3 text-amber-700 ring-1 ring-amber-100">
                      <Star size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{roleLabel} Overview</p>
                    </div>
                  </div>
                  <div className="space-y-4 text-sm text-slate-600">
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Rating</p>
                      <div className="mt-3 flex items-center gap-2">
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            size={16}
                            className={index < Math.floor(stats.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}
                          />
                        ))}
                        <span className="font-semibold text-slate-900">
                          {stats.rating} ({stats.reviews} reviews)
                        </span>
                      </div>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Member Since</p>
                      <p className="mt-3 text-base font-semibold text-slate-900">{stats.memberSince}</p>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Specializations</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {profileData.specialization.map((spec, index) => (
                          <span key={index} className="rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ProfileSettings />
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default SellerProfile;
