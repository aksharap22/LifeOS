import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { Login } from './components/auth/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateExperiment from './pages/CreateExperiment';
import DailyLogForm from './components/DailyLogForm';
import Results from './pages/Results';
import Manual from './pages/Manual';

const Navigation = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="sticky top-0 z-50 p-4 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-cyan-500/20 flex justify-between items-center text-sm">
      <Link to="/" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-500">
        LIFE_OS // COMMAND
      </Link>
      {user ? (
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-cyan-400">DASHBOARD</Link>
          <Link to="/manual" className="hover:text-cyan-400">MANUAL</Link>
          <div className="flex items-center gap-2 border-l border-white/10 pl-4">
            <span className="font-mono text-xs text-dim">{user.name}</span>
            <button onClick={logout} className="text-magenta-500 hover:text-white transition">EXIT</button>
          </div>
        </div>
      ) : (
        <Link to="/login" className="border border-cyan-500 text-cyan-400 px-4 py-1 rounded hover:bg-cyan-500/10 transition">LOGIN</Link>
      )}
    </nav>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#050505] text-white font-sans">
          <Navigation />
          <main className="p-4 max-w-[95%] mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/create-experiment" element={<CreateExperiment />} />
              <Route path="/logs/:id" element={<DailyLogForm />} />
              <Route path="/results/:id" element={<Results />} />
              <Route path="/manual" element={<Manual />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
