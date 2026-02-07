import { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarClock,
  Gauge,
  Sparkles,
  Target,
  Timer,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PageHeader } from "../../components/common/PageHeader";
import { Button } from "../../components/common/Button";
import { Skeleton } from "../../components/common/Skeleton";
import { ChartCard } from "../../components/app/ChartCard";
import { ComparisonChart } from "../../components/app/ComparisonChart";
import { DataCompletenessCard } from "../../components/app/DataCompletenessCard";
import { MetricCard } from "../../components/app/MetricCard";
import { NewsPanel } from "../../components/app/NewsPanel";
import { PremiumLockCard } from "../../components/app/PremiumLockCard";
import { RecommendationsList } from "../../components/app/RecommendationsList";
import { ScoreGauge } from "../../components/app/ScoreGauge";
import { SmartAuditCard } from "../../components/app/SmartAuditCard";
import { TrendChart } from "../../components/app/TrendChart";
import { PricingModal } from "../../components/app/PricingModal";
import { DEFAULT_FORM_DATA } from "../../data/defaults";
import { useAppState } from "../../hooks/useAppState";
import { useDelayedLoading } from "../../hooks/useDelayedLoading";
import { useNews } from "../../hooks/useNews";
import { calculateOptimized, calculateSustainability } from "../../utils/calc";
import { formatCurrency, formatDateTime, formatRelativeDays } from "../../utils/format";
import { getFreshnessStatus } from "../../utils/metrics";
import { buildRecommendations } from "../../utils/recommendations";
import { getCompletionPercent } from "../../utils/validation";
import { LOADING_DELAY_MS } from "../../styles/tokens";

const TREND_DECAY_RATE = 0.04;
const METRIC_SKELETON_COUNT = 4;

const getTrendData = (baseline: number) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  return months.map((label, index) => ({
    name: label,
    value: Math.max(0, Math.round(baseline * (1 - index * TREND_DECAY_RATE))),
  }));
};

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { state } = useAppState();
  const [searchParams] = useSearchParams();
  const [showPricing, setShowPricing] = useState(false);
  const isDemo = searchParams.get("demo") === "true";
  const isLoading = useDelayedLoading(LOADING_DELAY_MS);
  const news = useNews();

  const data = isDemo ? DEFAULT_FORM_DATA : state.formData;
  const scores = useMemo(() => calculateSustainability(data), [data]);
  const optimized = useMemo(() => calculateOptimized(data), [data]);
  const recommendations = useMemo(() => buildRecommendations(scores, data), [scores, data]);
  const completeness = getCompletionPercent(data);
  const freshness = getFreshnessStatus(state.updatedAt);

  const comparisonData = [
    {
      name: "Score",
      current: scores.sustainabilityScore,
      optimized: optimized.sustainabilityScore,
    },
    { name: "Energy", current: scores.energyScore, optimized: optimized.energyScore },
    { name: "Waste", current: scores.wasteScore, optimized: optimized.wasteScore },
    { name: "Material", current: scores.materialScore, optimized: optimized.materialScore },
  ];

  if (!state.completed && !isDemo) {
    return (
      <div className="space-y-6">
        <PageHeader
          eyebrow="Dashboard"
          title="No data yet"
          subtitle="Complete onboarding to unlock the full sustainability dashboard."
          breadcrumbs={[
            { label: "App", to: "/app" },
            { label: "Dashboard" },
          ]}
        />
        <div className="card flex flex-col gap-4 p-8">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-emerald-300" />
            <p className="text-lg font-semibold text-white">Start with onboarding</p>
          </div>
          <p className="text-sm text-slate-400">
            Capture your operational inputs to generate a verified sustainability score and
            audit-ready recommendations.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="primary"
              onClick={() => navigate("/app/onboarding")}
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Start onboarding
            </Button>
            <Button variant="secondary" onClick={() => navigate("/app/dashboard?demo=true")}>
              View demo data
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Dashboard"
        title="Sustainability decision center"
        subtitle="Track your readiness score, prioritize actions, and monitor regulatory context."
        breadcrumbs={[
          { label: "App", to: "/app" },
          { label: "Dashboard" },
        ]}
        actions={
          <Button
            variant="secondary"
            onClick={() => setShowPricing(true)}
            icon={<ArrowRight className="h-4 w-4" />}
          >
            Download report
          </Button>
        }
      />

      <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
        <div>Last updated: {formatDateTime(state.updatedAt)}</div>
        <div className={`flex items-center gap-2 ${freshness.tone}`}>
          <Timer className="h-4 w-4" />
          {freshness.label} · {formatRelativeDays(state.updatedAt)}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {isLoading ? (
          Array.from({ length: METRIC_SKELETON_COUNT }).map((_, index) => (
            <Skeleton key={`metric-${index}`} className="h-36" />
          ))
        ) : (
          <>
            <MetricCard
              label="Sustainability score"
              value={`${scores.sustainabilityScore}/100`}
              helper="Weighted readiness signal"
              icon={<Gauge className="h-4 w-4" />}
            />
            <MetricCard
              label="Tax offset estimate"
              value={formatCurrency(scores.estimatedTaxOffset)}
              helper="Projected incentives"
              icon={<Target className="h-4 w-4" />}
              tone="sky"
            />
            <MetricCard
              label="Next audit timing"
              value="Q2 2026"
              helper="Recommended review window"
              icon={<CalendarClock className="h-4 w-4" />}
              tone="amber"
            />
            <DataCompletenessCard percent={completeness} />
          </>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <RecommendationsList items={recommendations} />
        <div className="flex flex-col gap-6">
          <NewsPanel items={news.items} isLoading={news.isLoading} error={news.error} />
          <SmartAuditCard
            formData={data}
            score={scores.sustainabilityScore}
            offset={scores.estimatedTaxOffset}
          />
          <PremiumLockCard onUnlock={() => setShowPricing(true)} />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Sustainability score">
          <ScoreGauge score={scores.sustainabilityScore} />
        </ChartCard>
        <ChartCard title="Current vs optimized" subtitle="Projected score lift">
          <ComparisonChart data={comparisonData} />
        </ChartCard>
        <ChartCard title="Energy trend" subtitle="Simulated 6-month runway">
          <TrendChart data={getTrendData(data.monthlyKwh)} color="#38bdf8" />
        </ChartCard>
      </div>

      <PricingModal open={showPricing} onClose={() => setShowPricing(false)} />
    </div>
  );
};
