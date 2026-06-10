import { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { Activity, Plus, BarChart3 } from 'lucide-react';

const Dashboard = () => {
  const [experiments, setExperiments] = useState<any[]>([]);

  useEffect(() => {
    const fetchExperiments = async () => {
      try {
        const { data } = await api.get('/experiments');
        setExperiments(data);
      } catch (err) {
        console.error('Failed to fetch experiments');
      }
    };
    fetchExperiments();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Column 1: Experiments */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold uppercase tracking-widest text-cyan-400">Active Experiments</h2>
          <Link to="/create-experiment" className="flex items-center gap-2 bg-cyan-500/20 border border-cyan-500 text-cyan-300 px-3 py-1 text-sm rounded hover:bg-cyan-500/30 transition">
            <Plus size={16} /> NEW
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {experiments.map((exp) => (
            <div key={exp._id} className="p-4 bg-[#0a0a0a] border border-white/5 rounded-lg hover:border-cyan-500/50 transition duration-300">
              <h3 className="text-lg font-mono font-bold text-white">{exp.title}</h3>
              <p className="text-dim mt-2 text-sm">{exp.hypothesis}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs font-mono text-cyan-400 uppercase">{exp.status}</span>
                <Link to={`/logs/${exp._id}`} className="text-magenta-500 hover:text-white text-sm">LOG</Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Column 2: Stats/Action Panel */}
      <div className="bg-[#0a0a0a] border border-white/5 rounded-lg p-6">
        <h2 className="text-xl font-bold uppercase tracking-widest text-magenta-500 mb-6">Tactical Stats</h2>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Activity className="text-cyan-400" />
            <div>
              <div className="text-2xl font-mono">{experiments.length}</div>
              <div className="text-xs text-dim">ACTIVE EXPERIMENTS</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <BarChart3 className="text-plasma-purple" />
            <div>
              <div className="text-2xl font-mono">12</div>
              <div className="text-xs text-dim">VALIDATED INSIGHTS</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
