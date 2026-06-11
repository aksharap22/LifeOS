import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
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

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-[#121212] border border-cyan-500/30 rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold mb-6 text-cyan-400">REGISTER</h2>
      {error && <p className="text-red-400 mb-4 bg-red-950/20 p-2 rounded">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-slate-300 mb-1">NAME</label>
          <input
            type="text"
            className="w-full p-3 bg-black border border-slate-700 rounded text-white focus:border-cyan-500 focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">EMAIL</label>
          <input
            type="email"
            className="w-full p-3 bg-black border border-slate-700 rounded text-white focus:border-cyan-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">PASSWORD</label>
          <input
            type="password"
            className="w-full p-3 bg-black border border-slate-700 rounded text-white focus:border-cyan-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button 
          disabled={loading}
          className="w-full bg-cyan-600 text-white font-bold p-3 rounded hover:bg-cyan-500 transition disabled:opacity-50"
        >
          {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
        </button>
      </form>
    </div>
  );
};

export default Register;
