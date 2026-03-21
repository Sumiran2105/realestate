import React, { useEffect, useState } from 'react';
import { ArrowRight, BadgeIndianRupee, SearchCheck, ShieldCheck, Sparkles, UserRound, UsersRound } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useToast } from '@/shared/hooks/useToast';
import { getDashboardPath } from '@/shared/utils/dashboard';

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const { success, error: showError } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    if (location.state?.message) {
      success(location.state.message, 'Welcome Back');
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.pathname, location.state, navigate, success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(formData.identifier, formData.password);
      if (result.success) {
        navigate(getDashboardPath(result.user.role));
      }
    } catch (err) {
      const message = err?.message || 'Login failed. Please try again.';
      setError(message);
      showError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(31,75,67,0.18),_transparent_28%),linear-gradient(180deg,_#f5f7f4_0%,_#e8efe8_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl overflow-hidden rounded-[32px] border border-white/70 bg-white/80 shadow-[0_30px_100px_rgba(15,23,42,0.10)] backdrop-blur lg:grid-cols-[1.02fr_0.98fr]">
        <section className="relative flex flex-col justify-between overflow-hidden bg-[linear-gradient(160deg,_#16352f_0%,_#1F4B43_50%,_#2b6a5f_100%)] p-8 text-white sm:p-10 lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.16),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.10),_transparent_26%)]" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur">
              <Sparkles size={16} />
              Verified Real Estate Platform
            </div>

            <div className="mt-10 max-w-lg">
              <p className="text-xs uppercase tracking-[0.28em] text-white/65">Account Access</p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
                Sign in to manage your properties and profile.
              </h1>
              <p className="mt-5 max-w-md text-sm leading-7 text-white/78 sm:text-base">
                Access buyer, seller, builder, agent, or admin tools from a single secure login connected to your backend account.
              </p>
            </div>
          </div>

          <div className="relative mt-10">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
              How We Deliver Trust
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="aspect-square rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                <div className="inline-flex rounded-xl border border-white/20 bg-white/10 p-3 text-white/90">
                  <SearchCheck size={22} />
                </div>
                <p className="mt-4 text-sm font-medium text-white">Automated Legal Verification</p>
                <p className="mt-2 text-xs leading-6 text-white/70">
                  Instant checks aligned with verified property records, compliance steps, and onboarding safeguards.
                </p>
              </div>
              <div className="aspect-square rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                <div className="inline-flex rounded-xl border border-white/20 bg-white/10 p-3 text-white/90">
                  <BadgeIndianRupee size={22} />
                </div>
                <p className="mt-4 text-sm font-medium text-white">AI Price Intelligence</p>
                <p className="mt-2 text-xs leading-6 text-white/70">
                  Market-aware pricing signals and valuation context to support buyers, sellers, and agents.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center px-5 py-8 sm:px-8 lg:px-10">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1F4B43]/10 text-[#1F4B43] ring-1 ring-[#1F4B43]/10">
                <UserRound size={22} />
              </div>
              <h2 className="mt-5 text-3xl font-semibold text-slate-900">Welcome back</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Use your email address or phone number to access your account.
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Email Address or Phone Number
                </label>
                <input
                  type="text"
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-[#1F4B43] focus:ring-4 focus:ring-[#1F4B43]/10"
                  placeholder="you@example.com or 9876543210"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-[#1F4B43] focus:ring-4 focus:ring-[#1F4B43]/10"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <label className="flex items-center gap-3 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-[#1F4B43] focus:ring-[#1F4B43]"
                  />
                  Remember me
                </label>
                <Link to="/forgot-password" className="text-sm font-medium text-[#1F4B43] hover:text-[#173730]">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-sm font-semibold text-white transition ${
                  loading
                    ? 'bg-[#4d6f69] cursor-not-allowed'
                    : 'bg-[#1F4B43] hover:bg-[#173730] focus:outline-none focus:ring-2 focus:ring-[#1F4B43] focus:ring-offset-2'
                }`}
              >
                {loading ? 'Signing in...' : 'Sign In'}
                {!loading && <ArrowRight size={16} />}
              </button>
            </form>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">New here?</p>
              <p className="mt-2 text-sm text-slate-600">
                Create an account to access verified property workflows and your role-based dashboard.
              </p>
              <Link
                to="/register"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#1F4B43] hover:text-[#173730]"
              >
                Create an account
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
