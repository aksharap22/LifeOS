import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const CreateExperiment = () => {
  const [title, setTitle] = useState('');
  const [hypothesis, setHypothesis] = useState('');
  const [category, setCategory] = useState('Productivity');
  const [duration, setDuration] = useState(7);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/experiments', {
        title,
        hypothesis,
        category,
        duration,
        metrics: [{ name: 'Mood', type: 'Rating Scale' }, { name: 'Energy', type: 'Rating Scale' }]
      });
      navigate('/');
    } catch (err) {
      alert('Failed to create experiment');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create New Experiment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. 8 Hours Sleep Challenge"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Hypothesis</label>
          <textarea
            className="w-full p-2 border rounded"
            value={hypothesis}
            onChange={(e) => setHypothesis(e.target.value)}
            placeholder="What do you expect to happen?"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700">Category</label>
            <select
              className="w-full p-2 border rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Productivity</option>
              <option>Health</option>
              <option>Sleep</option>
              <option>Social</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Duration (Days)</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min="1"
            />
          </div>
        </div>
        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Start Experiment
        </button>
      </form>
    </div>
  );
};

export default CreateExperiment;
