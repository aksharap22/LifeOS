import { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { Activity, Plus, Flame, Timer, TrendingUp, Clipboard, Trash2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';
import { challengeTemplates } from '../data/challengeTemplates';
import Testimonials from '../components/Testimonials';

const Dashboard = () => {
  const [experiments, setExperiments] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'library' | 'experiments' | 'stats'>('library');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { user } = useAuth();
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchExperiments = async () => {
      if (!user) {
        setExperiments([]);
        return;
      }
      try {
        const { data } = await api.get('/experiments');
        setExperiments(data);
      } catch (err) {
        console.error('Failed to fetch experiments');
      }
    };
    fetchExperiments();
  }, [user]);

  const deleteExperiment = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this challenge?')) return;
    try {
      await api.delete(`/experiments/${id}`);
      setExperiments(experiments.filter((exp) => exp._id !== id));
    } catch (err) {
      console.error('Failed to delete experiment');
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll('.card-glow');
    cards.forEach((card: any) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  };

  const activeCount = experiments.filter((exp) => exp.status === 'Active').length;

  return (
    <div className="space-y-12 pb-20">
      <section className="py-16 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-600/10 blur-[120px] rounded-full -mr-48 -mt-24"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/10 blur-[100px] rounded-full -ml-32 -mb-16"></div>
        
        <div className="max-w-4xl relative z-10">
          <div className="mb-8 inline-flex items-center gap-2 border border-fuchsia-500/30 bg-fuchsia-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-fuchsia-300">
            <Flame size={14} />
            LIFESTYLE LAB
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-black leading-tight text-white tracking-tight uppercase">{t('heroLine1')}</h1>
            <h1 className="text-3xl md:text-5xl font-black leading-tight text-white/90 tracking-tight uppercase">{t('heroLine2')}</h1>
            <h1 className="text-3xl md:text-5xl font-black leading-tight text-cyan-400 tracking-tight uppercase">{t('heroLine3')}</h1>
          </div>
          <div className="mt-12">
            <Link to={user ? '/create-experiment' : '/register'} className="inline-flex items-center gap-3 bg-white px-10 py-4 font-black text-black transition-all hover:bg-cyan-400 uppercase text-lg">
              <Plus size={22} /> {user ? t('acceptChallenge') : t('startNow')}
            </Link>
          </div>
        </div>
      </section>

      <section onMouseMove={handleMouseMove} ref={containerRef}>
        <div className="flex border-b border-white/10 mb-10 overflow-x-auto no-scrollbar scroll-smooth">
          <button onClick={() => setActiveTab('library')} className={`px-8 py-5 font-black uppercase tracking-widest text-sm transition-all whitespace-nowrap relative ${activeTab === 'library' ? 'text-cyan-400' : 'text-slate-500 hover:text-white'}`}>
            {t('library')} {activeTab === 'library' && <div className="absolute bottom-0 left-0 w-full h-1 bg-cyan-400"></div>}
          </button>
          <button onClick={() => setActiveTab('experiments')} className={`px-8 py-5 font-black uppercase tracking-widest text-sm transition-all whitespace-nowrap relative ${activeTab === 'experiments' ? 'text-fuchsia-400' : 'text-slate-500 hover:text-white'}`}>
            {t('activeChallenges')} {activeTab === 'experiments' && <div className="absolute bottom-0 left-0 w-full h-1 bg-fuchsia-400"></div>}
          </button>
          <button onClick={() => setActiveTab('stats')} className={`px-8 py-5 font-black uppercase tracking-widest text-sm transition-all whitespace-nowrap relative ${activeTab === 'stats' ? 'text-violet-400' : 'text-slate-500 hover:text-white'}`}>
            {t('tacticalStats')} {activeTab === 'stats' && <div className="absolute bottom-0 left-0 w-full h-1 bg-violet-400"></div>}
          </button>
        </div>

        <div className="min-h-[400px]">
          {activeTab === 'library' && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {challengeTemplates.map((challenge) => (
                <div 
                  key={challenge.id} 
                  onMouseEnter={() => setHoveredId(challenge.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`card-glow group relative border p-6 transition-all duration-300 overflow-hidden ${hoveredId === challenge.id ? 'bg-white/5 border-cyan-500/40 shadow-[0_0_20px_rgba(34,211,238,0.05)] translate-y-[-4px]' : 'border-white/10 bg-[#0a0a0a]'}`}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: 'radial-gradient(200px circle at var(--mouse-x) var(--mouse-y), rgba(34,211,238,0.1), transparent 80%)' }} />
                  <div className="relative z-10">
                    <div className="mb-5 flex items-start justify-between gap-3">
                      <span className="border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-slate-400">{challenge.badge}</span>
                      <span className="text-[10px] font-black font-mono text-cyan-400 uppercase tracking-widest">{challenge.duration}D</span>
                    </div>
                    <h3 className="text-lg font-black text-white uppercase tracking-tight leading-tight mb-3 group-hover:text-cyan-400 transition-colors">{challenge.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-400 line-clamp-3 mb-6">{challenge.description}</p>
                    <Link to="/create-experiment" className="text-[10px] font-black uppercase tracking-widest text-cyan-400 group-hover:underline">START →</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'experiments' && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {experiments.length === 0 ? (
                <div className="col-span-full border border-dashed border-white/10 py-24 flex flex-col items-center justify-center text-slate-500">
                  <Clipboard className="mb-4 opacity-20" size={48} />
                  <p className="font-black uppercase tracking-widest">No active experiments</p>
                  <button onClick={() => setActiveTab('library')} className="mt-4 text-xs font-black text-cyan-400 hover:underline uppercase">Browse Library</button>
                </div>
              ) : (
                experiments.map((exp) => (
                  <div key={exp._id} className="border border-white/10 bg-[#0a0a0a] p-6 border-l-4 border-l-fuchsia-500 flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-5">
                      <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/20">
                        {exp.status}
                      </span>
                      <button onClick={() => deleteExperiment(exp._id)} className="text-slate-500 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <h3 className="text-xl font-black text-white uppercase leading-tight">{exp.title}</h3>
                    <p className="mt-4 text-sm text-slate-400 line-clamp-2 leading-relaxed italic opacity-80">{exp.hypothesis}</p>
                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Status: Monitoring</div>
                      <Link to={`/logs/${exp._id}`} className="bg-fuchsia-600 text-white px-5 py-2.5 text-xs font-black uppercase hover:bg-white hover:text-black transition-all">Log Entry</Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
          {activeTab === 'stats' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="border border-white/10 bg-[#0a0a0a] p-10 hover:border-cyan-500/30 transition-all group">
                <Timer className="mb-8 text-cyan-400 group-hover:scale-110 transition-transform" size={40} />
                <div className="text-6xl font-black text-white tracking-tighter">{activeCount}</div>
                <div className="text-xs font-black uppercase tracking-widest text-slate-500 mt-4">Active Lab Trials</div>
              </div>
              <div className="border border-white/10 bg-[#0a0a0a] p-10 hover:border-fuchsia-500/30 transition-all group">
                <TrendingUp className="mb-8 text-fuchsia-400 group-hover:scale-110 transition-transform" size={40} />
                <div className="text-6xl font-black text-white tracking-tighter">DAILY</div>
                <div className="text-xs font-black uppercase tracking-widest text-slate-500 mt-4">Reflection Velocity</div>
              </div>
              <div className="border border-white/10 bg-[#0a0a0a] p-10 hover:border-violet-500/30 transition-all group">
                <Activity className="mb-8 text-violet-400 group-hover:scale-110 transition-transform" size={40} />
                <div className="text-6xl font-black text-white tracking-tighter">{challengeTemplates.length}</div>
                <div className="text-xs font-black uppercase tracking-widest text-slate-500 mt-4">System Protocols</div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Testimonials />
    </div>
  );
};

export default Dashboard;
