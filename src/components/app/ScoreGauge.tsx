import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";
import { CHART_DIMENSIONS } from "../../styles/tokens";

interface ScoreGaugeProps {
  score: number;
}

export const ScoreGauge = ({ score }: ScoreGaugeProps) => {
  const data = [{ name: "Score", value: score, fill: "#10b981" }];

  return (
    <div className="relative mt-4" style={{ height: CHART_DIMENSIONS.gaugeHeight }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          data={data}
          cx="50%"
          cy="70%"
          innerRadius="70%"
          outerRadius="100%"
          startAngle={180}
          endAngle={0}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar dataKey="value" cornerRadius={16} background />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <p className="text-4xl font-semibold text-white">{score}</p>
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-300/70">Score</p>
      </div>
    </div>
  );
};
