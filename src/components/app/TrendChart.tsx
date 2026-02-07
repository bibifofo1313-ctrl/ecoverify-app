import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CHART_DIMENSIONS } from "../../styles/tokens";

interface TrendDatum {
  name: string;
  value: number;
}

interface TrendChartProps {
  data: TrendDatum[];
  color?: string;
}

export const TrendChart = ({ data, color = "#10b981" }: TrendChartProps) => (
  <div className="mt-4" style={{ height: CHART_DIMENSIONS.trendHeight }}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 12, left: -10, bottom: 0 }}>
        <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
        <YAxis stroke="#94a3b8" fontSize={12} />
        <Tooltip
          cursor={{ stroke: "#1e293b" }}
          contentStyle={{
            background: "#0f172a",
            border: "1px solid rgba(148,163,184,0.2)",
            borderRadius: "12px",
            color: "#e2e8f0",
          }}
        />
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);
