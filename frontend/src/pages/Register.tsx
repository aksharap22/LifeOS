import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed - check backend connection');
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="mx-auto mt-8 max-w-md border border-cyan-500/30 bg-[#0a0a0a] p-6 shadow-2xl">
      <h2 className="text-3xl font-bold text-cyan-400">REGISTER</h2>
      <p className="mt-2 text-sm text-slate-400">Create a free LifeOS account stored in your MongoDB database.</p>
      {error && <p className="mt-5 border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 mt-6 block text-sm text-slate-300">NAME</label>
          <input
            type="text"
            className="w-full border border-slate-700 bg-black p-3 text-white focus:border-cyan-500 focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-slate-300">EMAIL</label>
          <input
            type="email"
            className="w-full border border-slate-700 bg-black p-3 text-white focus:border-cyan-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-slate-300">PASSWORD</label>
          <input
            type="password"
            className="w-full border border-slate-700 bg-black p-3 text-white focus:border-cyan-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            minLength={6}
            required
          />
        </div>
        <button 
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 bg-cyan-500 p-3 font-bold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <UserPlus size={18} />
          {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
        </button>
        <p className="text-center text-sm text-slate-400">
          Already registered? <Link to="/login" className="text-fuchsia-400 hover:underline">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
