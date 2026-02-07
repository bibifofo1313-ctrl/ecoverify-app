import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CHART_DIMENSIONS } from "../../styles/tokens";

interface ComparisonDatum {
  name: string;
  current: number;
  optimized: number;
}

interface ComparisonChartProps {
  data: ComparisonDatum[];
}

export const ComparisonChart = ({ data }: ComparisonChartProps) => (
  <div className="mt-4" style={{ height: CHART_DIMENSIONS.barHeight }}>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
        <YAxis stroke="#94a3b8" fontSize={12} />
        <Tooltip
          cursor={{ fill: "rgba(15, 23, 42, 0.5)" }}
          contentStyle={{
            background: "#0f172a",
            border: "1px solid rgba(148,163,184,0.2)",
            borderRadius: "12px",
            color: "#e2e8f0",
          }}
        />
        <Legend wrapperStyle={{ color: "#cbd5f5", fontSize: "12px" }} />
        <Bar dataKey="current" fill="#38bdf8" radius={[8, 8, 0, 0]} />
        <Bar dataKey="optimized" fill="#10b981" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);
