import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { LockKeyhole, LogIn } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { GoogleLogin } from '@react-oauth/google';
import api from '../../services/api';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const { data } = await api.post('/auth/google', { token: credentialResponse.credential });
      localStorage.setItem('token', data.token);
      window.location.href = '/'; 
    } catch (err) {
      setError('Google login failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Could not sign in. Check your email, password, and API URL.');
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-8 lg:grid-cols-[1fr_420px]">
      <section className="flex flex-col justify-center">
        <div className="mb-5 inline-flex w-fit items-center gap-2 border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-200">
          <LockKeyhole size={14} />
          Auth System
        </div>
        <h1 className="max-w-3xl text-4xl font-black leading-tight text-white md:text-5xl">
          Sign in to track challenges, evidence, and behavior shifts.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
          LifeOS uses your own Express API, MongoDB Atlas free tier, and JSON Web Tokens.
        </p>
      </section>

      <div className="border border-white/10 bg-[#0a0a0a] p-6 shadow-2xl">
        <h2 className="text-2xl font-bold text-cyan-400">LOGIN</h2>
        
        <div className="mt-6 mb-6">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError('Google login failed')}
          />
        </div>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#0a0a0a] px-2 text-slate-400">Or continue with</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>}
          <div>
            <label className="mb-1 block text-sm text-slate-300">EMAIL</label>
            <input type="email" className="w-full border border-white/10 bg-black p-3 text-white focus:border-cyan-500 focus:outline-none" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
          </div>
          <div>
            <label className="mb-1 mt-4 block text-sm text-slate-300">PASSWORD</label>
            <input type="password" className="w-full border border-white/10 bg-black p-3 text-white focus:border-cyan-500 focus:outline-none" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
          </div>
          <button disabled={loading} className="mt-6 flex w-full items-center justify-center gap-2 bg-cyan-500 p-3 font-bold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60">
            <LogIn size={18} />
            {loading ? 'SIGNING IN...' : 'ACCESS SYSTEM'}
          </button>
          <p className="mt-4 text-center text-sm text-slate-400">
            Need access? <Link to="/register" className="text-fuchsia-400 hover:underline">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
