import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './index.css';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { LanguageProvider, useLanguage } from './hooks/useLanguage';
import { Login } from './components/auth/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateExperiment from './pages/CreateExperiment';
import DailyLogForm from './components/DailyLogForm';
import Results from './pages/Results';
import ActivityLogs from './pages/ActivityLogs';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const { user, logout } = useAuth();
  const { t, setLanguage, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 p-4 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-cyan-500/30 flex justify-between items-center text-sm">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-2xl font-black tracking-tighter text-cyan-400 hover:text-white transition" style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', fontWeight: 900 }}>
          {t('appName')}
        </Link>
      </div>
      
      {/* Mobile Toggle */}
      <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Desktop Links */}
      <div className={`absolute md:static top-full left-0 w-full md:w-auto bg-[#0a0a0a] md:bg-transparent p-4 md:p-0 flex flex-col md:flex-row items-center gap-4 ${isOpen ? 'flex' : 'hidden md:flex'}`}>
        {user ? (
          <>
            <Link to="/" className="hover:text-cyan-400 uppercase tracking-widest" onClick={() => setIsOpen(false)}>{t('dashboard')}</Link>
            <Link to="/activity" className="hover:text-cyan-400 uppercase tracking-widest" onClick={() => setIsOpen(false)}>{t('activity')}</Link>
            <div className="flex items-center gap-2 border-l border-white/10 pl-3 sm:pl-4">
              <span className="font-mono text-xs text-slate-400">{user.name}</span>
              <button onClick={() => { logout(); setIsOpen(false); }} className="text-magenta-500 hover:text-white transition uppercase tracking-widest">EXIT</button>
            </div>
          </>
        ) : (
          <Link to="/login" className="border border-cyan-500 text-cyan-400 px-4 py-1 rounded hover:bg-cyan-500/10 transition uppercase tracking-widest">LOGIN</Link>
        )}
        <div className="flex gap-2 text-[10px] font-bold">
          {['en', 'hi', 'te'].map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang as any)}
              className={`px-2 py-1 border ${language === lang ? 'bg-cyan-500 text-black border-cyan-500' : 'border-white/10 text-slate-400'}`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="py-20 text-center text-sm uppercase tracking-widest text-slate-400">Loading LifeOS...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-[#050505] text-white font-sans">
            <Navigation />
            <main className="p-4 max-w-[95%] mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/accept/:templateId" element={<ProtectedRoute><CreateExperiment /></ProtectedRoute>} />
                <Route path="/logs/:id" element={<ProtectedRoute><DailyLogForm /></ProtectedRoute>} />
                <Route path="/results/:id" element={<ProtectedRoute><Results /></ProtectedRoute>} />
                <Route path="/activity" element={<ProtectedRoute><ActivityLogs /></ProtectedRoute>} />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
