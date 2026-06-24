import { useState, useEffect } from 'react';
import api from '../services/api';

const Manual = () => {
  const [manual, setManual] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchManual = async () => {
      try {
        const { data } = await api.get('/manual');
        setManual(data);
      } catch (err) {
        console.error('Failed to fetch manual');
      } finally {
        setLoading(false);
      }
    };
    fetchManual();
  }, []);

  if (loading) return <div>Loading your manual...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">Personal Operating Manual</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">Summary</h3>
        <p className="text-gray-600 leading-relaxed">{manual?.summary}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Recommendations</h3>
        <ul className="space-y-4">
          {manual?.recommendations.length > 0 ? (
            manual.recommendations.map((rec: any, idx: number) => (
              <li key={idx} className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                {rec.text}
              </li>
            ))
          ) : (
            <p className="text-gray-500 italic">No recommendations yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Manual;
