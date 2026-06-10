import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-cyan-400">LOGIN</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-dim mb-1">EMAIL</label>
          <input
            type="email"
            className="w-full p-3 bg-black border border-white/10 rounded text-white focus:border-cyan-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm text-dim mb-1">PASSWORD</label>
          <input
            type="password"
            className="w-full p-3 bg-black border border-white/10 rounded text-white focus:border-cyan-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="w-full bg-cyan-500 text-black font-bold p-3 rounded hover:bg-cyan-400 transition">
          ACCESS SYSTEM
        </button>
        <p className="text-center text-dim text-sm mt-4">
          Need access? <Link to="/register" className="text-magenta-500 hover:underline">Register here</Link>
        </p>
      </form>
    </div>
  );
};
