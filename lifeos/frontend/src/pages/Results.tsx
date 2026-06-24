import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { ExperimentLineChart } from '../components/charts/ExperimentLineChart';

const Results = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const { data } = await api.get(`/experiments/${id}/results`);
        setData(data);
      } catch (err) {
        console.error('Failed to fetch results');
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [id]);

  if (loading) return <div>Loading results...</div>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Experiment Results</h2>
      <ExperimentLineChart
        data={data}
        metrics={[
          { key: 'm1', name: 'Mood', color: '#8884d8' },
          { key: 'm2', name: 'Energy', color: '#82ca9d' }
        ]}
      />
    </div>
  );
};

export default Results;
