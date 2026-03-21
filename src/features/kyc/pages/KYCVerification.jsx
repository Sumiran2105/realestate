import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowRight, BadgeCheck, CheckCircle2, FileBadge2, FileText, ShieldCheck, Upload, UserSquare2 } from 'lucide-react';
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
  const { error: showError, success } = useToast();
  const navigate = useNavigate();

  const [requirements, setRequirements] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formState, setFormState] = useState({});
  const [submittingDocumentId, setSubmittingDocumentId] = useState(null);
  const [isFinalSubmitting, setIsFinalSubmitting] = useState(false);

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

  const isDocumentPrepared = useCallback(
    (document) => {
      const current = formState[document.document_id];
      if (!current?.file) return false;

      const requiredFields = getDocumentFields(document);
      return requiredFields.every((field) => current?.fields?.[field]?.trim());
    },
    [formState]
  );

  const requiredDocuments = useMemo(
    () => documents.filter((document) => document.is_required !== false),
    [documents]
  );

  const completion = useMemo(() => {
    const total = documents.length;
    const completed = documents.filter((document) => isDocumentPrepared(document)).length;

    return {
      total,
      completed,
      percent: total ? Math.round((completed / total) * 100) : 0,
    };
  }, [documents, isDocumentPrepared]);

  const allRequiredDocumentsPrepared = requiredDocuments.every((document) => isDocumentPrepared(document));

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

  const uploadBasicDocument = async (document, current) => {
    if (document.document_id === 'aadhaar') {
      const aadhaarNumber = current.fields?.aadhaar_number?.trim();

      if (!aadhaarNumber) {
        throw new Error('Aadhaar number is required before final submission.');
      }

      if (!current.file) {
        throw new Error('Please choose the Aadhaar file before final submission.');
      }

      await kycApi.submitAadhaar({
        aadhaarNumber,
        file: current.file,
      });
      return {
        ...current,
        submitted: true,
      };
    }

    if (document.document_id === 'pan') {
      const panNumber = current.fields?.pan_number?.trim().toUpperCase();

      if (!panNumber) {
        throw new Error('PAN number is required before final submission.');
      }

      if (!current.file) {
        throw new Error('Please choose the PAN file before final submission.');
      }

      await kycApi.submitPan({
        panNumber,
        file: current.file,
      });
      return {
        ...current,
        submitted: true,
        fields: {
          ...(current.fields || {}),
          pan_number: panNumber,
        },
      };
    }

    return {
      ...current,
      submitted: true,
    };
  };

  const uploadProfessionalDocument = async (document, current) => {
    if (!current.file) {
      throw new Error(`Please choose the ${document.name} file before final submission.`);
    }

    if (document.document_id === 'rera') {
      const licenseNumber = current.fields?.license_number?.trim();
      const state = current.fields?.state?.trim();
      const expiryDate = current.fields?.expiry_date?.trim();

      if (!licenseNumber || !state || !expiryDate) {
        throw new Error('RERA license number, state, and expiry date are required before final submission.');
      }

      await kycApi.submitRera({
        licenseNumber,
        state,
        expiryDate,
        file: current.file,
      });
    }

    if (document.document_id === 'gst') {
      const gstNumber = current.fields?.gst_number?.trim();

      if (!gstNumber) {
        throw new Error('GST number is required before final submission.');
      }

      await kycApi.submitGst({
        gstNumber,
        file: current.file,
      });
    }

    if (document.document_id === 'company_reg') {
      const registrationNumber = current.fields?.registration_number?.trim();
      const companyName = current.fields?.company_name?.trim();

      if (!registrationNumber || !companyName) {
        throw new Error('Company registration number and company name are required before final submission.');
      }

      await kycApi.submitCompany({
        registrationNumber,
        companyName,
        file: current.file,
      });
    }

    return {
      ...current,
      submitted: true,
    };
  };

  const handleFinalSubmit = async () => {
    if (!allRequiredDocumentsPrepared) {
      showError('Please upload and complete all required fields before submitting KYC.', 'Incomplete KYC');
      return;
    }

    try {
      setIsFinalSubmitting(true);

      for (const document of requiredDocuments) {
        const current = formState[document.document_id] || { file: null, fields: {}, submitted: false };

        if (!current.submitted) {
          setSubmittingDocumentId(document.document_id);

          const nextState =
            document.document_id === 'aadhaar' || document.document_id === 'pan'
              ? await uploadBasicDocument(document, current)
              : await uploadProfessionalDocument(document, current);

          updateDocumentField(document.document_id, () => nextState);
        }
      }

      setSubmittingDocumentId(null);
      await kycApi.submitKyc();
      success('All required KYC files have been submitted successfully.', 'KYC Submitted');
    } catch (submitError) {
      showError(submitError.message || 'Failed to submit KYC.', 'Submission Failed');
    } finally {
      setSubmittingDocumentId(null);
      setIsFinalSubmitting(false);
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
    const isPrepared = isDocumentPrepared(document);

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

        <div className="mt-5 flex flex-wrap items-center gap-3">
          {isPrepared && (
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">
              <CheckCircle2 size={14} />
              Ready
            </span>
          )}
          {current.submitted && (
            <span className="rounded-full bg-sky-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-sky-700">
              Uploaded
            </span>
          )}
        </div>
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
                  To get verified, please enter and upload all the required documents listed below.
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

        <section className="space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Overview</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">KYC Preparation Summary</h2>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                  Complete all required fields and upload every required file. Once everything is ready, we’ll submit the full KYC request in one step.
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Go Back
              </button>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-4">
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
              <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-emerald-700">Progress</p>
                <p className="mt-3 text-lg font-semibold text-slate-900">{completion.completed} / {completion.total}</p>
                <p className="mt-2 text-sm text-slate-600">{completion.percent}% requirements prepared</p>
              </div>
            </div>
          </div>

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

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Final Submission</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Kindly review all your uploaded documents and details before submitting. 
                </p>
              </div>
              <button
                type="button"
                onClick={handleFinalSubmit}
                disabled={!allRequiredDocumentsPrepared || isFinalSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1F4B43] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#173730] disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {isFinalSubmitting
                  ? submittingDocumentId
                    ? `Uploading ${submittingDocumentId}...`
                    : 'Submitting KYC...'
                  : 'Submit KYC'}
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default KYCVerification;
