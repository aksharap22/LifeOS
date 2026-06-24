import { useState, useEffect } from 'react';
import api from '../services/api';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const ActivityLogs = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const { data } = await api.get('/logs'); 
        setLogs(data);
      } catch (err) {
        console.error('Failed to fetch activity logs');
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  if (loading) {
    return <div className="py-20 text-center text-sm uppercase tracking-widest text-slate-400">Loading your history...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6">
      <div>
        <h1 className="text-3xl font-black text-white">ACTIVITY LOGS</h1>
        <p className="text-slate-400 mt-2">A complete history of your reflections and data points.</p>
      </div>

      <div className="grid gap-4">
        {logs.length === 0 ? (
          <div className="border border-white/10 bg-[#0a0a0a] p-10 text-center text-slate-400">
            No logs found. Start an experiment and log your first day to see it here.
          </div>
        ) : (
          logs.map((log) => (
            <div key={log._id} className="border border-white/10 bg-[#0a0a0a] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Calendar size={20} />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                    {new Date(log.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1">{log.experimentId?.title || 'Experiment'}</h3>
                  <p className="text-sm text-slate-300 mt-2 line-clamp-2 italic">"{log.notes}"</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Link 
                  to={`/logs/${log.experimentId?._id || log.experimentId}`} 
                  className="text-xs font-bold border border-white/10 px-3 py-2 hover:bg-white/5 transition"
                >
                  VIEW CHALLENGE
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityLogs;
