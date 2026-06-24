import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save } from 'lucide-react';
import api from '../services/api';
import { challengeTemplates, customChallengeTemplate } from '../data/challengeTemplates';
import { useLanguage } from '../hooks/useLanguage';

type Metric = {
  _id: string;
  name: string;
  type: string;
  unit?: string;
};

type Experiment = {
  _id: string;
  title: string;
  description?: string;
  hypothesis: string;
  duration: number;
  status: string;
};

const DailyLogForm = () => {
  const { id: experimentId } = useParams();
  const [experiment, setExperiment] = useState<Experiment | null>(null);
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [entries, setEntries] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showEmpathy, setShowEmpathy] = useState(false);
  const [empathyMessage, setEmpathyMessage] = useState('');
  
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const fetchExperiment = async () => {
      setLoading(true);
      setError('');

      try {
        const { data } = await api.get(`/experiments/${experimentId}`);
        setExperiment(data.experiment);
        setMetrics(data.metrics);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load challenge metrics.');
      } finally {
        setLoading(false);
      }
    };

    if (experimentId) {
      fetchExperiment();
    }
  }, [experimentId]);

  const promptTemplate = useMemo(() => {
    if (!experiment) {
      return customChallengeTemplate;
    }

    return challengeTemplates.find((template) => template.title === experiment.title) || customChallengeTemplate;
  }, [experiment]);

  const getEmpathyMessage = (text: string) => {
    const sadKeywords = ['sad', 'depressed', 'bad', 'heavy', 'tired', 'fail', 'hard', 'upset', 'दुखी', 'परेशान', 'కష్టం', 'బాధ'];
    const lowerText = text.toLowerCase();
    if (sadKeywords.some(keyword => lowerText.includes(keyword))) {
      return t('empathySad');
    }
    return t('empathyDefault');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const entryList = Object.keys(entries)
        .filter((metricId) => entries[metricId] !== '')
        .map((metricId) => ({
          metricId,
          value: entries[metricId],
        }));

      await api.post('/logs', {
        experimentId,
        date,
        notes,
        entries: entryList,
      });
      
      setEmpathyMessage(getEmpathyMessage(notes));
      setShowEmpathy(true);
      
      setTimeout(() => {
        navigate('/activity');
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save log.');
      setSubmitting(false);
    }
  };

  const renderMetricInput = (metric: Metric) => {
    if (metric.type === 'Boolean') {
      return (
        <select
          className="w-full border border-white/10 bg-black p-3 text-white focus:border-cyan-500 focus:outline-none"
          value={entries[metric._id] || ''}
          onChange={(e) => setEntries({ ...entries, [metric._id]: e.target.value })}
          required
        >
          <option value="">Choose</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      );
    }

    if (metric.type === 'Text') {
      return (
        <textarea
          className="min-h-20 w-full border border-white/10 bg-black p-3 text-white focus:border-cyan-500 focus:outline-none"
          value={entries[metric._id] || ''}
          onChange={(e) => setEntries({ ...entries, [metric._id]: e.target.value })}
          required
        />
      );
    }

    return (
      <input
        type="number"
        className="w-full border border-white/10 bg-black p-3 text-white focus:border-cyan-500 focus:outline-none"
        placeholder={metric.type === 'Rating Scale' ? '1-10' : metric.unit || 'Number'}
        min={metric.type === 'Rating Scale' ? 1 : undefined}
        max={metric.type === 'Rating Scale' ? 10 : undefined}
        value={entries[metric._id] || ''}
        onChange={(e) => setEntries({ ...entries, [metric._id]: e.target.value })}
        required
      />
    );
  };

  if (loading) {
    return <div className="py-20 text-center text-sm uppercase tracking-widest text-slate-400">Loading challenge...</div>;
  }

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-6 lg:grid-cols-[1fr_360px]">
      {showEmpathy ? (
        <div className="col-span-full border border-cyan-500/30 bg-cyan-500/10 p-12 text-center animate-in zoom-in duration-500">
          <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-widest">Logged Successfully</h2>
          <p className="text-xl text-cyan-200 leading-relaxed italic">"{empathyMessage}"</p>
          <p className="mt-8 text-xs text-slate-500 uppercase tracking-widest">Redirecting to Activity Logs...</p>
        </div>
      ) : (
        <>
        <form onSubmit={handleSubmit} className="border border-white/10 bg-[#0a0a0a] p-6">
          <h1 className="text-2xl font-black text-white uppercase">{experiment?.title}</h1>
          <p className="mt-2 text-sm leading-6 text-slate-400">{experiment?.description}</p>

          {error && <div className="mt-5 border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>}

          <div className="mt-6">
            <label className="mb-1 block text-sm text-slate-300">Date</label>
            <input
              type="date"
              className="w-full border border-white/10 bg-black p-3 text-white focus:border-cyan-500 focus:outline-none"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {metrics.map((metric) => (
              <div key={metric._id}>
                <label className="mb-1 block text-sm text-slate-300">{metric.name}</label>
                {renderMetricInput(metric)}
              </div>
            ))}
          </div>

          <div className="mt-6">
            <label className="mb-1 block text-sm text-slate-300">Daily reflection</label>
            <textarea
              className="min-h-36 w-full border border-white/10 bg-black p-3 text-white focus:border-cyan-500 focus:outline-none"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What happened today? What felt hard? What changed after doing the challenge?"
              required
            />
          </div>

          <button
            disabled={submitting}
            className="mt-6 flex w-full items-center justify-center gap-2 bg-cyan-500 p-3 font-bold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={18} />
            {submitting ? 'SAVING...' : 'SAVE DAILY LOG'}
          </button>
        </form>

        <aside className="border border-white/10 bg-white/[0.03] p-5">
          <div className="text-xs font-bold uppercase tracking-widest text-fuchsia-300">Reflection prompts</div>
          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-300">
            {promptTemplate.prompts.map((prompt) => (
              <p key={prompt}>{prompt}</p>
            ))}
          </div>
          <div className="mt-6 border-t border-white/10 pt-5">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Hypothesis</div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{experiment?.hypothesis}</p>
          </div>
        </aside>
        </>
      )}
    </div>
  );
};

export default DailyLogForm;
