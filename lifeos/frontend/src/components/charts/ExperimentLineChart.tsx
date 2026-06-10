import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartProps {
  data: any[];
  metrics: { key: string; name: string; color: string }[];
}

export const ExperimentLineChart = ({ data, metrics }: ChartProps) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {metrics.map(m => (
            <Line
              key={m.key}
              type="monotone"
              dataKey={m.key}
              name={m.name}
              stroke={m.color}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
