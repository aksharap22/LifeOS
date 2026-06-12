import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ClipboardList, Plus } from 'lucide-react';
import api from '../services/api';
import { challengeTemplates, customChallengeTemplate } from '../data/challengeTemplates';

const templates = [...challengeTemplates, customChallengeTemplate];

const CreateExperiment = () => {
  const [selectedTemplateId, setSelectedTemplateId] = useState(templates[0].id);
  const selectedTemplate = useMemo(
    () => templates.find((template) => template.id === selectedTemplateId) || templates[0],
    [selectedTemplateId]
  );
  const [title, setTitle] = useState(selectedTemplate.title);
  const [description, setDescription] = useState(selectedTemplate.description);
  const [hypothesis, setHypothesis] = useState(selectedTemplate.hypothesis);
  const [category, setCategory] = useState(selectedTemplate.category);
  const [duration, setDuration] = useState(selectedTemplate.duration);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const applyTemplate = (templateId: string) => {
    const template = templates.find((item) => item.id === templateId) || templates[0];
    setSelectedTemplateId(template.id);
    setTitle(template.title);
    setDescription(template.description);
    setHypothesis(template.hypothesis);
    setCategory(template.category);
    setDuration(template.duration);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await api.post('/experiments', {
        title: selectedTemplate.title, // Fixed: use template title
        description,
        hypothesis,
        category,
        duration,
        metrics: selectedTemplate.metrics,
      });
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to accept challenge. Check your API connection.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 py-6 lg:grid-cols-[360px_1fr]">
      <aside className="space-y-3">
        <div className="mb-5">
          <h1 className="text-2xl font-black text-white">Accept a Challenge</h1>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Start from a proven template, then adjust the challenge before you commit.
          </p>
        </div>
        {templates.map((template) => (
          <button
            key={template.id}
            type="button"
            onClick={() => applyTemplate(template.id)}
            className={`w-full border p-4 text-left transition ${
              selectedTemplateId === template.id
                ? 'border-cyan-400 bg-cyan-500/10'
                : 'border-white/10 bg-[#0a0a0a] hover:border-white/25'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-bold text-white">{template.title}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-fuchsia-300">{template.badge}</div>
              </div>
              {selectedTemplateId === template.id && <Check size={18} className="text-cyan-300" />}
            </div>
            <div className="mt-3 text-xs text-slate-400">{template.duration} days · {template.category}</div>
          </button>
        ))}
      </aside>

      <form onSubmit={handleSubmit} className="border border-white/10 bg-[#0a0a0a] p-6">
        <div className="mb-6 flex items-center gap-3">
          <ClipboardList className="text-cyan-300" />
          <div>
            <h2 className="text-xl font-bold text-white">Challenge Setup</h2>
            <p className="text-sm text-slate-400">This becomes your active experiment once saved.</p>
          </div>
        </div>

        {error && <div className="mb-5 border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm text-slate-300">Challenge title</label>
            <input
              type="text"
              className="w-full border border-white/10 bg-black p-3 text-white focus:border-cyan-500 focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm text-slate-300">Description</label>
            <textarea
              className="min-h-24 w-full border border-white/10 bg-black p-3 text-white focus:border-cyan-500 focus:outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm text-slate-300">Hypothesis</label>
            <textarea
              className="min-h-24 w-full border border-white/10 bg-black p-3 text-white focus:border-cyan-500 focus:outline-none"
              value={hypothesis}
              onChange={(e) => setHypothesis(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">Category</label>
            <select
              className="w-full border border-white/10 bg-black p-3 text-white focus:border-cyan-500 focus:outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Productivity</option>
              <option>Health</option>
              <option>Sleep</option>
              <option>Social</option>
              <option>Emotional</option>
              <option>Attention</option>
              <option>Growth</option>
              <option>Custom</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">Duration in days</label>
            <input
              type="number"
              className="w-full border border-white/10 bg-black p-3 text-white focus:border-cyan-500 focus:outline-none"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min="1"
              max="90"
              required
            />
          </div>
        </div>

        <div className="mt-6 border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Daily metrics</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedTemplate.metrics.map((metric) => (
              <span key={metric.name} className="border border-cyan-500/20 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-100">
                {metric.name} · {metric.type}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Reflection prompts</div>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
            {selectedTemplate.prompts.map((prompt) => (
              <li key={prompt}>- {prompt}</li>
            ))}
          </ul>
        </div>

        <button
          disabled={submitting}
          className="mt-6 flex w-full items-center justify-center gap-2 bg-cyan-500 p-3 font-bold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Plus size={18} />
          {submitting ? 'ACCEPTING...' : 'ACCEPT CHALLENGE'}
        </button>
      </form>
    </div>
  );
};

export default CreateExperiment;
