import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roast My Landing Page — Honest Feedback for SaaS Founders",
};

const WHAT_YOU_GET = [
  {
    label: "Conversion Score",
    description: "Overall score across clarity, CTA, messaging, and trust signals.",
  },
  {
    label: "Above-the-Fold Audit",
    description: "What a visitor sees in the first 5 seconds — and what makes them leave.",
  },
  {
    label: "Conversion Killers",
    description: "The specific things stopping visitors from becoming customers.",
  },
  {
    label: "Rewritten Copy",
    description: "Actual rewrites of your headline, subhead, and CTA — not vague suggestions.",
  },
  {
    label: "Final Verdict",
    description: "A prioritized list of exactly what to fix first and why.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Submit your page",
    description: "Paste your URL or drop in your copy directly.",
  },
  {
    step: "02",
    title: "We analyze it",
    description: "Our model reviews clarity, messaging, CTAs, trust signals, and conversion fundamentals.",
  },
  {
    step: "03",
    title: "Get your roast",
    description: "Receive a structured, specific, actionable report in seconds — not a vague list of complaints.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="px-6 pt-24 pb-20 text-center max-w-4xl mx-auto w-full">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 text-sm mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          Free to try — no account required
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
          Your landing page is{" "}
          <span className="text-gradient-brand">losing you customers.</span>
        </h1>

        <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Submit your URL or paste your copy. Get a sharp, specific, actionable
          roast from an AI trained on conversion fundamentals — not generic
          advice.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/roast"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold rounded-lg transition-colors text-base"
          >
            Roast my page
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/roast/example"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 font-medium rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors text-base"
          >
            See an example roast
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-20 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-zinc-500 text-center mb-12">
            How it works
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="flex flex-col gap-3">
                <span className="text-4xl font-bold text-gradient-brand font-mono">
                  {item.step}
                </span>
                <h3 className="text-lg font-semibold text-zinc-100">
                  {item.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="px-6 py-20 border-t border-zinc-900 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-zinc-500 text-center mb-3">
            What you get
          </p>
          <h2 className="text-3xl font-bold text-center mb-12">
            Not a generic checklist.
            <br />
            <span className="text-zinc-400 font-normal">A diagnosis.</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHAT_YOU_GET.map((item) => (
              <div
                key={item.label}
                className="p-5 rounded-xl border border-zinc-800 bg-zinc-900 flex flex-col gap-2"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span className="font-semibold text-zinc-100 text-sm">
                    {item.label}
                  </span>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target audience callout */}
      <section className="px-6 py-20 border-t border-zinc-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Built for founders who already know{" "}
            <span className="text-zinc-500">something is wrong.</span>
          </h2>
          <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
            You have traffic. You have a product. But the page just{" "}
            <em>isn't converting</em>. We'll tell you exactly why — and what to
            rewrite to fix it.
          </p>
          <Link
            href="/roast"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold rounded-lg transition-colors text-base"
          >
            Get my free roast
            <span aria-hidden>→</span>
          </Link>
          <p className="text-zinc-600 text-sm mt-4">
            No account. No credit card. One free roast per page.
          </p>
        </div>
      </section>
    </div>
  );
}
