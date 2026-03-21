import React, { useState } from 'react';
import { ArrowRight, Building2, Mail, Phone, ShieldCheck, Sparkles, UserPlus, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useToast } from '@/shared/hooks/useToast';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'buyer' // Default role
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const { success, error: showError } = useToast();
  const navigate = useNavigate();

  const roles = [
    { value: 'buyer', label: 'Buyer' },
    { value: 'agent', label: 'Agent' },
    { value: 'seller', label: 'Seller' },
    { value: 'builder', label: 'Builder' },
  ];

  const passwordRequirements = [
    { test: (value) => value.length >= 8, message: 'Password must be at least 8 characters long' },
    { test: (value) => value.length <= 72, message: 'Password must be 72 characters or fewer' },
    { test: (value) => /[A-Z]/.test(value), message: 'Password must contain at least one uppercase letter' },
    { test: (value) => /[a-z]/.test(value), message: 'Password must contain at least one lowercase letter' },
    { test: (value) => /\d/.test(value), message: 'Password must contain at least one digit' },
    { test: (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), message: 'Password must contain at least one special character' },
    { test: (value) => !/\s/.test(value), message: 'Password cannot contain spaces' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const failedRequirement = passwordRequirements.find(({ test }) => !test(formData.password));
      if (failedRequirement) {
        newErrors.password = failedRequirement.message;
      }
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.role) newErrors.role = 'Please select a role';
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await register(formData);
      if (result.success) {
        success('OTP sent to your email and phone number.', 'Registration Successful');
        // Navigate to OTP verification with email and phone
        navigate('/verify-otp', { 
          state: { 
            email: formData.email,
            phone: formData.phone,
            toastMessage: 'OTP sent to your email and phone number.',
          } 
        });
      }
    } catch (error) {
      const message = error?.message || 'Registration failed. Please try again.';
      setErrors({ submit: message });
      showError(message, 'Registration Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(31,75,67,0.18),_transparent_28%),linear-gradient(180deg,_#f5f7f4_0%,_#e8efe8_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl overflow-hidden rounded-[32px] border border-white/70 bg-white/80 shadow-[0_30px_100px_rgba(15,23,42,0.10)] backdrop-blur lg:grid-cols-[1.02fr_0.98fr]">
        <section className="relative flex flex-col overflow-hidden bg-[linear-gradient(160deg,_#16352f_0%,_#1F4B43_50%,_#2b6a5f_100%)] p-8 text-white sm:p-10 lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.16),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.10),_transparent_26%)]" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur">
              <Sparkles size={16} />
              Start Your Verified Journey
            </div>

            <div className="mt-8 max-w-lg">
              <p className="text-xs uppercase tracking-[0.28em] text-white/65">Account Creation</p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
                Create your account and move into OTP verification.
              </h1>
              <p className="mt-5 max-w-md text-sm leading-7 text-white/78 sm:text-base">
                Set up your buyer, seller, builder, or agent account with the same verified onboarding flow that powers the live platform.
              </p>
            </div>
          </div>

          <div className="relative mt-8">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
              Why Register Here
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="aspect-square rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                <div className="inline-flex rounded-xl border border-white/20 bg-white/10 p-3 text-white/90">
                  <ShieldCheck size={20} />
                </div>
                <p className="mt-4 text-sm font-medium text-white">Dual OTP Verification</p>
                <p className="mt-2 text-xs leading-6 text-white/70">
                  Email and phone verification are both required before access, so every account starts with a trusted identity.
                </p>
              </div>
              <div className="aspect-square rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                <div className="inline-flex rounded-xl border border-white/20 bg-white/10 p-3 text-white/90">
                  <Building2 size={20} />
                </div>
                <p className="mt-4 text-sm font-medium text-white">Role-Based Dashboard</p>
                <p className="mt-2 text-xs leading-6 text-white/70">
                  Choose buyer, seller, builder, or agent during signup and get routed into the correct dashboard after login.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center px-5 py-8 sm:px-8 lg:px-10">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1F4B43]/10 text-[#1F4B43] ring-1 ring-[#1F4B43]/10">
                <UserPlus size={22} />
              </div>
              <h2 className="mt-5 text-3xl font-semibold text-slate-900">Create account</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Register with your name, email, phone, and role to start the verification flow.
              </p>
            </div>

            {errors.submit && (
              <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errors.submit}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  I am a <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={`w-full appearance-none rounded-2xl border bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-[#1F4B43] focus:ring-4 focus:ring-[#1F4B43]/10 ${
                      errors.role ? 'border-red-500' : 'border-slate-200'
                    }`}
                  >
                    {roles.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                  <Users size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
                {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full rounded-2xl border bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-[#1F4B43] focus:ring-4 focus:ring-[#1F4B43]/10 ${
                    errors.name ? 'border-red-500' : 'border-slate-200'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full rounded-2xl border bg-white px-4 py-3.5 pr-11 text-slate-900 outline-none transition focus:border-[#1F4B43] focus:ring-4 focus:ring-[#1F4B43]/10 ${
                        errors.email ? 'border-red-500' : 'border-slate-200'
                      }`}
                      placeholder="you@example.com"
                    />
                    <Mail size={17} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full rounded-2xl border bg-white px-4 py-3.5 pr-11 text-slate-900 outline-none transition focus:border-[#1F4B43] focus:ring-4 focus:ring-[#1F4B43]/10 ${
                        errors.phone ? 'border-red-500' : 'border-slate-200'
                      }`}
                      placeholder="9876543210"
                    />
                    <Phone size={17} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  maxLength={72}
                  className={`w-full rounded-2xl border bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-[#1F4B43] focus:ring-4 focus:ring-[#1F4B43]/10 ${
                    errors.password ? 'border-red-500' : 'border-slate-200'
                  }`}
                  placeholder="Create a strong password"
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                {!errors.password && (
                  <p className="mt-1 text-xs text-slate-500">
                    Use 8-72 characters with uppercase, lowercase, number, and special character.
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  maxLength={72}
                  className={`w-full rounded-2xl border bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-[#1F4B43] focus:ring-4 focus:ring-[#1F4B43]/10 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-slate-200'
                  }`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>

              <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#1F4B43] focus:ring-[#1F4B43]"
                  required
                />
                <span>
                  I agree to the{' '}
                  <Link to="/terms" className="font-medium text-[#1F4B43] hover:text-[#173730]">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="font-medium text-[#1F4B43] hover:text-[#173730]">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-sm font-semibold text-white transition ${
                  loading
                    ? 'bg-[#4d6f69] cursor-not-allowed'
                    : 'bg-[#1F4B43] hover:bg-[#173730] focus:outline-none focus:ring-2 focus:ring-[#1F4B43] focus:ring-offset-2'
                }`}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
                {!loading && <ArrowRight size={16} />}
              </button>
            </form>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Already registered?</p>
              <p className="mt-2 text-sm text-slate-600">
                Sign in with your existing account to continue into your dashboard or verification flow.
              </p>
              <Link
                to="/login"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#1F4B43] hover:text-[#173730]"
              >
                Go to sign in
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Register;
