import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, BadgeCheck, FileBadge2, FileText, ShieldCheck, Upload, UserSquare2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { kycApi } from '@/features/kyc/api/kycApi';
import { useToast } from '@/shared/hooks/useToast';

const resolveDocumentIcon = (documentId) => {
  switch (documentId) {
    case 'aadhaar':
      return UserSquare2;
    case 'pan':
      return FileText;
    case 'rera':
      return ShieldCheck;
    case 'gst':
      return BadgeCheck;
    default:
      return FileBadge2;
  }
};

const roleTitles = {
  buyer: 'Buyer KYC',
  seller: 'Seller KYC',
  builder: 'Builder KYC',
  agent: 'Agent KYC',
  admin: 'Admin Access',
};

const KYCVerification = () => {
  const { user } = useAuth();
  const { error: showError, info } = useToast();
  const navigate = useNavigate();

  const [requirements, setRequirements] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formState, setFormState] = useState({});
  const [submittingDocumentId, setSubmittingDocumentId] = useState(null);

  useEffect(() => {
    const loadRequirements = async () => {
      try {
        const response = await kycApi.getRequirements();
        setRequirements(response);
      } catch (loadError) {
        showError(loadError.message || 'Failed to load KYC requirements.', 'KYC Load Failed');
      } finally {
        setLoading(false);
      }
    };

    loadRequirements();
  }, [showError]);

  const documents = useMemo(() => {
    if (!requirements) return [];

    return [
      ...(requirements.basic_requirements || []).map((item) => ({ ...item, section: 'basic' })),
      ...((requirements.requires_professional ? requirements.professional_requirements : []) || []).map((item) => ({
        ...item,
        section: 'professional',
      })),
    ];
  }, [requirements]);

  const getDocumentFields = (document) => {
    if (document.document_id === 'aadhaar') {
      return ['aadhaar_number'];
    }

    if (document.document_id === 'pan') {
      return ['pan_number'];
    }

    return document.fields || [];
  };

  const completion = useMemo(() => {
    const total = documents.length;
    const completed = documents.filter((document) => {
      const current = formState[document.document_id];
      if (!current?.file) return false;

      const requiredFields = getDocumentFields(document);
      return requiredFields.every((field) => current?.fields?.[field]?.trim());
    }).length;

    return {
      total,
      completed,
      percent: total ? Math.round((completed / total) * 100) : 0,
    };
  }, [documents, formState]);

  const updateDocumentField = (documentId, updater) => {
    setFormState((currentState) => {
      const currentDocument = currentState[documentId] || { file: null, fields: {}, submitted: false };
      return {
        ...currentState,
        [documentId]: updater(currentDocument),
      };
    });
  };

  const handleFileChange = (documentId, file) => {
    updateDocumentField(documentId, (currentDocument) => ({
      ...currentDocument,
      file,
    }));
  };

  const handleTextFieldChange = (documentId, field, value) => {
    updateDocumentField(documentId, (currentDocument) => ({
      ...currentDocument,
      fields: {
        ...(currentDocument.fields || {}),
        [field]: value,
      },
    }));
  };

  const handleContinue = () => {
    info('KYC requirements are now loaded from the backend. Document submission endpoint is not wired yet.', 'Requirements Loaded');
  };

  const handleDocumentSubmit = async (document) => {
    const current = formState[document.document_id] || { file: null, fields: {}, submitted: false };

    if (document.document_id === 'aadhaar') {
      const aadhaarNumber = current.fields?.aadhaar_number?.trim();

      if (!aadhaarNumber) {
        showError('Aadhaar number is required before upload.', 'Aadhaar Missing');
        return;
      }

      if (!current.file) {
        showError('Please choose the Aadhaar file before submitting.', 'Aadhaar Missing');
        return;
      }

      try {
        setSubmittingDocumentId(document.document_id);
        await kycApi.submitAadhaar({
          aadhaarNumber,
          file: current.file,
        });
        updateDocumentField(document.document_id, (currentDocument) => ({
          ...currentDocument,
          submitted: true,
        }));
        info('Aadhaar submitted successfully.', 'Aadhaar Uploaded');
      } catch (submitError) {
        showError(submitError.message || 'Failed to submit Aadhaar.', 'Upload Failed');
      } finally {
        setSubmittingDocumentId(null);
      }
    }

    if (document.document_id === 'pan') {
      const panNumber = current.fields?.pan_number?.trim().toUpperCase();

      if (!panNumber) {
        showError('PAN number is required before upload.', 'PAN Missing');
        return;
      }

      if (!current.file) {
        showError('Please choose the PAN file before submitting.', 'PAN Missing');
        return;
      }

      try {
        setSubmittingDocumentId(document.document_id);
        await kycApi.submitPan({
          panNumber,
          file: current.file,
        });
        updateDocumentField(document.document_id, (currentDocument) => ({
          ...currentDocument,
          submitted: true,
          fields: {
            ...(currentDocument.fields || {}),
            pan_number: panNumber,
          },
        }));
        info('PAN submitted successfully.', 'PAN Uploaded');
      } catch (submitError) {
        showError(submitError.message || 'Failed to submit PAN.', 'Upload Failed');
      } finally {
        setSubmittingDocumentId(null);
      }
    }
  };

  const title = roleTitles[requirements?.user_type || user?.role] || 'KYC';
  const basicRequirements = requirements?.basic_requirements || [];
  const professionalRequirements = requirements?.professional_requirements || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,_#f6f7f3_0%,_#eef2f7_100%)] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-[32px] border border-slate-200 bg-white p-8 text-sm text-slate-600 shadow-sm">
          Loading KYC requirements...
        </div>
      </div>
    );
  }

  if (!requirements) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,_#f6f7f3_0%,_#eef2f7_100%)] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-[32px] border border-red-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">Unable to load KYC requirements</h1>
          <p className="mt-3 text-sm text-slate-600">
            The frontend could not load `/api/v1/requirements`. Check the backend response and try again.
          </p>
        </div>
      </div>
    );
  }

  if (requirements.user_type === 'admin') {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,_#f6f7f3_0%,_#eef2f7_100%)] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3 text-emerald-700">
            <BadgeCheck size={22} />
            <h1 className="text-2xl font-semibold text-slate-900">No KYC required for admin users</h1>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Your current user type does not require KYC onboarding.
          </p>
        </div>
      </div>
    );
  }

  const renderRequirementCard = (document) => {
    const Icon = resolveDocumentIcon(document.document_id);
    const current = formState[document.document_id] || { file: null, fields: {}, submitted: false };
    const documentFields = getDocumentFields(document);

    return (
      <div key={document.document_id} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-slate-100 p-3 text-slate-700 ring-1 ring-slate-200">
            <Icon size={20} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold text-slate-900">{document.name}</h3>
              {document.is_required && (
                <span className="rounded-full bg-rose-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-rose-700">
                  Required
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-slate-600">{document.description}</p>
            <p className="mt-3 text-sm leading-6 text-slate-500">{document.instructions}</p>
          </div>
        </div>

        {documentFields.length > 0 && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {documentFields.map((field) => (
              <div key={field} className={field === 'company_name' ? 'sm:col-span-2' : ''}>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {field.replace(/_/g, ' ')}
                </label>
                <input
                  type={field.includes('date') ? 'date' : 'text'}
                  value={current.fields?.[field] || ''}
                  onChange={(event) =>
                    handleTextFieldChange(
                      document.document_id,
                      field,
                      field === 'pan_number'
                        ? event.target.value.toUpperCase().slice(0, 10)
                        : field === 'aadhaar_number'
                          ? event.target.value.replace(/\D/g, '').slice(0, 12)
                          : event.target.value
                    )
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#1F4B43] focus:ring-4 focus:ring-[#1F4B43]/10"
                  placeholder={`Enter ${field.replace(/_/g, ' ')}`}
                  maxLength={field === 'aadhaar_number' ? 12 : field === 'pan_number' ? 10 : undefined}
                />
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-5">
          <label className="cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={(event) => handleFileChange(document.document_id, event.target.files?.[0] || null)}
            />
            <div className="flex flex-col items-center justify-center text-center">
              <div className="rounded-2xl bg-white p-3 text-slate-700 shadow-sm ring-1 ring-slate-200">
                <Upload size={20} />
              </div>
              <p className="mt-4 text-sm font-medium text-slate-900">
                {current.file ? current.file.name : `Upload ${document.name}`}
              </p>
              <p className="mt-2 text-xs text-slate-500">JPG, PNG, or PDF</p>
            </div>
          </label>
        </div>

        {(document.document_id === 'aadhaar' || document.document_id === 'pan') && (
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => handleDocumentSubmit(document)}
              disabled={submittingDocumentId === document.document_id}
              className="inline-flex items-center gap-2 rounded-full bg-[#1F4B43] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#173730] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submittingDocumentId === document.document_id
                ? 'Submitting...'
                : document.document_id === 'aadhaar'
                  ? 'Submit Aadhaar'
                  : 'Submit PAN'}
              <ArrowRight size={15} />
            </button>
            {current.submitted && (
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">
                Submitted
              </span>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_#f6f7f3_0%,_#eef2f7_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="overflow-hidden rounded-[32px] border border-white/70 bg-white/80 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="relative bg-[linear-gradient(135deg,_#0f172a_0%,_#0f766e_50%,_#22c55e_100%)] px-6 py-10 sm:px-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.22),_transparent_30%)]" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/70">KYC Requirements</p>
                <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{title}</h1>
                <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
                  This page is now driven by `/api/v1/requirements` and shows the exact basic and professional documents required for your account type.
                </p>
              </div>

              <div className="rounded-[28px] border border-white/20 bg-white/10 p-5 text-white backdrop-blur">
                <p className="text-xs uppercase tracking-[0.2em] text-white/70">Progress</p>
                <p className="mt-3 text-3xl font-semibold">{completion.percent}%</p>
                <p className="mt-2 text-sm text-white/80">
                  {completion.completed} of {completion.total} requirements prepared
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="space-y-6">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Overview</p>
              <div className="mt-5 space-y-4">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">User Type</p>
                  <p className="mt-3 text-lg font-semibold text-slate-900">
                    {(requirements.user_type || user?.role || 'user').replace(/^\w/, (char) => char.toUpperCase())}
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Basic Documents</p>
                  <p className="mt-3 text-lg font-semibold text-slate-900">{basicRequirements.length}</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Professional Documents</p>
                  <p className="mt-3 text-lg font-semibold text-slate-900">
                    {requirements.requires_professional ? professionalRequirements.length : 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Next Step</p>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Prepare all required documents here. Once the upload/submission backend endpoint is connected, this page can submit the same dynamic form directly.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleContinue}
                  className="inline-flex items-center gap-2 rounded-full bg-[#1F4B43] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#173730]"
                >
                  Continue
                  <ArrowRight size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-2xl bg-sky-50 p-3 text-sky-700 ring-1 ring-sky-100">
                  <UserSquare2 size={18} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Basic Requirements</p>
                </div>
              </div>
              <div className="grid gap-5">{basicRequirements.map(renderRequirementCard)}</div>
            </div>

            {requirements.requires_professional && (
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700 ring-1 ring-emerald-100">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                      Professional Requirements
                    </p>
                  </div>
                </div>
                <div className="grid gap-5">{professionalRequirements.map(renderRequirementCard)}</div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default KYCVerification;
