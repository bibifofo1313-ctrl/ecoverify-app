import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FileCheck,
  Leaf,
  LineChart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { ButtonLink } from "../components/common/ButtonLink";
import { Card } from "../components/common/Card";
import { MarketingNav } from "../components/marketing/MarketingNav";

const steps = [
  {
    title: "Capture your baseline",
    description: "Answer three short prompts to anchor your sustainability profile.",
    icon: ShieldCheck,
  },
  {
    title: "Model the score",
    description: "EcoVerify calculates readiness using 2026 EU/US benchmarks.",
    icon: BarChart3,
  },
  {
    title: "Take action",
    description: "Get targeted actions and audit-ready summaries in minutes.",
    icon: Sparkles,
  },
] as const;

const features = [
  {
    title: "Weighted sustainability score",
    description: "Energy, waste, and material sourcing weighted to 2026 standards.",
  },
  {
    title: "Tax offset modeling",
    description: "Instant incentives forecast aligned with your bracket and revenue.",
  },
  {
    title: "Audit-ready export",
    description: "Generate compliance summaries designed for regulators.",
  },
  {
    title: "Operational recommendations",
    description: "See the fastest levers for measurable score improvement.",
  },
  {
    title: "Regulatory pulse",
    description: "Curated news feed keeps your team aligned with market shifts.",
  },
  {
    title: "Executive summaries",
    description: "Gemini-style briefings translate data into leadership action.",
  },
] as const;

const useCases = [
  {
    title: "Urban micro-retail",
    description: "Cut energy waste and prepare for local emissions disclosures.",
  },
  {
    title: "Regional logistics",
    description: "Benchmark fleet impact and secure cleaner routing incentives.",
  },
  {
    title: "Boutique manufacturing",
    description: "Prove sourcing integrity and stay ahead of import regulation.",
  },
] as const;

const faqs = [
  {
    question: "Is EcoVerify meant for small operators?",
    answer:
      "Yes. The scoring model is calibrated for micro and small teams that need clarity without enterprise overhead.",
  },
  {
    question: "How is the sustainability score calculated?",
    answer:
      "EcoVerify applies weighted benchmarks across energy, waste, and material sourcing, aligned with 2026 EU/US guidance.",
  },
  {
    question: "Do I need sensors or integrations?",
    answer:
      "No integrations required. You can start with estimates and refine as you collect better data.",
  },
  {
    question: "Can I export the results?",
    answer:
      "Yes. Premium plans unlock official certification PDFs and audit-ready evidence packs.",
  },
  {
    question: "Is the regulatory news curated?",
    answer:
      "Yes. We normalize key sustainability headlines so you can act quickly without the noise.",
  },
] as const;

export const MarketingPage = () => (
  <div className="app-shell min-h-screen">
    <MarketingNav />

    <section className="section bg-aurora">
      <div className="app-container grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <p className="eyebrow">Sustainability intelligence</p>
          <h1 className="heading-1 text-balance">
            Sustainability clarity for micro operators in under 10 minutes.
          </h1>
          <p className="body max-w-2xl">
            EcoVerify 2026 transforms operational inputs into a verified readiness score,
            tax offset forecasts, and a clear action plan for regulators and investors.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink to="/app/onboarding" variant="primary" icon={<ArrowRight className="h-4 w-4" />}>
              Start free
            </ButtonLink>
            <ButtonLink to="/app/dashboard?demo=true" variant="secondary">
              View demo
            </ButtonLink>
          </div>
        </div>
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-2">
                <Leaf className="h-5 w-5 text-emerald-300" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-300/70">
                  Trusted signal
                </p>
                <p className="text-lg font-semibold text-white">
                  Stay aligned with 2026 standards
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-400">
              Built for operators who need defensible sustainability answers without hiring a
              full ESG team.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Score</p>
                <p className="mt-2 text-2xl font-semibold text-emerald-200">78/100</p>
              </div>
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Offset</p>
                <p className="mt-2 text-2xl font-semibold text-emerald-200">$42,000</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>

    <section id="how" className="section">
      <div className="app-container">
        <div className="max-w-2xl">
          <p className="eyebrow">How it works</p>
          <h2 className="heading-2">Three steps to verified clarity</h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <Card key={step.title} className="p-6">
                <Icon className="h-5 w-5 text-emerald-300" />
                <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{step.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>

    <section id="value" className="section bg-slate-950/40">
      <div className="app-container grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="eyebrow">Core value</p>
          <h2 className="heading-2">What the sustainability score means</h2>
          <p className="body mt-4">
            The EcoVerify score is a 0-100 indicator of how prepared your operation is for
            2026 regulatory expectations. It blends energy efficiency, waste management, and
            material sourcing into one signal that leadership, regulators, and investors can
            trust.
          </p>
        </div>
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-300" />
              <div>
                <p className="text-sm font-semibold text-white">Verified readiness</p>
                <p className="text-xs text-slate-400">
                  Interpretable benchmarks for micro operators.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LineChart className="h-5 w-5 text-emerald-300" />
              <div>
                <p className="text-sm font-semibold text-white">Actionable signals</p>
                <p className="text-xs text-slate-400">
                  Highlights the fastest path to improvement.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FileCheck className="h-5 w-5 text-emerald-300" />
              <div>
                <p className="text-sm font-semibold text-white">Audit-ready evidence</p>
                <p className="text-xs text-slate-400">Exports that match compliance needs.</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>

    <section id="features" className="section">
      <div className="app-container">
        <div className="max-w-2xl">
          <p className="eyebrow">Features</p>
          <h2 className="heading-2">Everything needed for micro ESG execution</h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="p-5">
              <h3 className="text-base font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>

    <section id="use-cases" className="section bg-slate-950/40">
      <div className="app-container">
        <div className="max-w-2xl">
          <p className="eyebrow">Use cases</p>
          <h2 className="heading-2">Built for small operators who need leverage</h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {useCases.map((useCase) => (
            <Card key={useCase.title} className="p-6">
              <h3 className="text-base font-semibold text-white">{useCase.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{useCase.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>

    <section id="pricing" className="section">
      <div className="app-container">
        <div className="max-w-2xl">
          <p className="eyebrow">Pricing</p>
          <h2 className="heading-2">Simple plans for fast execution</h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <p className="text-sm text-slate-400">Starter</p>
            <p className="mt-2 text-3xl font-semibold text-white">$199</p>
            <p className="text-xs text-slate-500">per report</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                Score + tax offset summary
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                Standard compliance checklist
              </li>
            </ul>
          </Card>
          <Card className="p-6 shadow-glow">
            <p className="text-sm text-slate-400">Growth</p>
            <p className="mt-2 text-3xl font-semibold text-white">$399</p>
            <p className="text-xs text-slate-500">per report</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                Official certification PDF
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                AI executive summary
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                Priority email support
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </section>

    <section id="faq" className="section bg-slate-950/40">
      <div className="app-container">
        <div className="max-w-2xl">
          <p className="eyebrow">FAQ</p>
          <h2 className="heading-2">Questions we hear most often</h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <Card key={faq.question} className="p-5">
              <p className="text-sm font-semibold text-white">{faq.question}</p>
              <p className="mt-2 text-sm text-slate-400">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>

    <footer className="border-t border-slate-900/80 bg-slate-950/80 py-10">
      <div className="app-container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">EcoVerify 2026</p>
          <p className="text-xs text-slate-500">Sustainability intelligence for micro SaaS.</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-400">
          <a href="#" className="hover:text-emerald-200">Privacy</a>
          <a href="#" className="hover:text-emerald-200">Terms</a>
          <a href="#" className="hover:text-emerald-200">Security</a>
          <a href="mailto:hello@ecoverify.ai" className="hover:text-emerald-200">Contact</a>
        </div>
      </div>
    </footer>
  </div>
);
