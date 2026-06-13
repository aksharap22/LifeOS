import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Plus } from 'lucide-react';
import api from '../services/api';
import { challengeTemplates, customChallengeTemplate } from '../data/challengeTemplates';

const CreateExperiment = () => {
  const { templateId } = useParams();
  const template = useMemo(
    () => [...challengeTemplates, customChallengeTemplate].find((t) => t.id === templateId) || customChallengeTemplate,
    [templateId]
  );

  const [title, setTitle] = useState(template.title);
  const [description, setDescription] = useState(template.description);
  const [hypothesis, setHypothesis] = useState(template.hypothesis);
  const [category, setCategory] = useState(template.category);
  const [duration, setDuration] = useState(template.duration);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await api.post('/experiments', {
        title,
        description,
        hypothesis,
        category,
        duration,
        metrics: template.metrics,
      });
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to accept challenge. Check your API connection.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Accept Challenge</h1>
        <p className="mt-2 text-sm text-slate-400">Configure your parameters before starting.</p>
      </div>

      <form onSubmit={handleSubmit} className="border border-white/10 bg-[#0a0a0a] p-6">
        {error && <div className="mb-5 border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>}

        <div className="space-y-6">
          <div>
            <label className="mb-1 block text-sm text-slate-300">Challenge title</label>
            <input type="text" className="w-full border border-white/10 bg-black p-3 text-white focus:border-cyan-500 focus:outline-none" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">Description</label>
            <textarea className="min-h-24 w-full border border-white/10 bg-black p-3 text-white focus:border-cyan-500 focus:outline-none" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">Hypothesis</label>
            <textarea className="min-h-24 w-full border border-white/10 bg-black p-3 text-white focus:border-cyan-500 focus:outline-none" value={hypothesis} onChange={(e) => setHypothesis(e.target.value)} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm text-slate-300">Category</label>
              <select className="w-full border border-white/10 bg-black p-3 text-white focus:border-cyan-500 focus:outline-none" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>Productivity</option><option>Health</option><option>Sleep</option><option>Social</option><option>Emotional</option><option>Attention</option><option>Growth</option><option>Custom</option><option>Lifestyle</option><option>Behavioral</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-300">Duration in days</label>
              <input type="number" className="w-full border border-white/10 bg-black p-3 text-white focus:border-cyan-500 focus:outline-none" value={duration} onChange={(e) => setDuration(Number(e.target.value))} min="1" max="90" required />
            </div>
          </div>
        </div>

        <button disabled={submitting} className="mt-8 flex w-full items-center justify-center gap-2 bg-cyan-500 p-4 font-bold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60">
          <Plus size={18} />
          {submitting ? 'ACCEPTING...' : 'ACCEPT CHALLENGE'}
        </button>
      </form>
    </div>
  );
};

export default CreateExperiment;
