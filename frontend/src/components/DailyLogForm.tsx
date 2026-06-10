import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const DailyLogForm = () => {
  const { id: experimentId } = useParams();
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [metrics, setMetrics] = useState<any[]>([]);
  const [entries, setEntries] = useState<any>({});
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, fetch metrics for this experiment
    setMetrics([
      { name: 'Mood', _id: 'm1' },
      { name: 'Energy', _id: 'm2' }
    ]);
  }, [experimentId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const entryList = Object.keys(entries).map(metricId => ({
        metricId,
        value: entries[metricId]
      }));
      await api.post('/logs', {
        experimentId,
        date,
        notes,
        entries: entryList
      });
      navigate('/');
    } catch (err) {
      alert('Failed to save log');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Log Daily Metrics</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        {metrics.map(m => (
          <div key={m._id} className="mb-4">
            <label className="block text-gray-700">{m.name}</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              placeholder="1-10"
              onChange={(e) => setEntries({ ...entries, [m._id]: e.target.value })}
            />
          </div>
        ))}
        <div className="mb-4">
          <label className="block text-gray-700">Notes</label>
          <textarea
            className="w-full p-2 border rounded"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Save Log
        </button>
      </form>
    </div>
  );
};

export default DailyLogForm;
