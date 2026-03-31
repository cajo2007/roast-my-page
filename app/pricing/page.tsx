import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "One free roast to start. Pay-as-you-go credit packs for more — no subscriptions.",
};

// TODO: Replace with Stripe product/price data fetched at build time
// when implementing credit pack billing

const CREDIT_PACKS = [
  {
    name: "Starter",
    credits: 3,
    price: 3,
    perCredit: 1,
    description: "For founders testing copy ideas.",
    highlight: false,
  },
  {
    name: "Value Pack",
    credits: 10,
    price: 7,
    perCredit: 0.7,
    description: "For teams iterating fast on landing pages.",
    highlight: true,
  },
];

export default function PricingPage() {
  return (
    <div className="px-6 py-24 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-400 text-sm mb-6">
          Coming soon
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Simple pricing.
          <br />
          <span className="text-zinc-500 font-normal">No subscriptions.</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-xl mx-auto">
          Start with one free roast. When you need more, buy a credit pack.
          Credits never expire.
        </p>
      </div>

      {/* Free tier */}
      <div className="mb-8 p-6 rounded-xl border border-zinc-800 bg-zinc-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-zinc-100 text-lg">Free</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
              Available now
            </span>
          </div>
          <p className="text-zinc-400 text-sm">
            1 roast per page, no account required.
          </p>
        </div>
        <Link
          href="/roast"
          className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold rounded-lg transition-colors text-sm"
        >
          Get your free roast →
        </Link>
      </div>

      {/* Credit packs — coming soon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 max-w-2xl mx-auto">
        {CREDIT_PACKS.map((pack) => (
          <div
            key={pack.name}
            className={`relative p-6 rounded-xl border flex flex-col gap-4 ${
              pack.highlight
                ? "border-amber-500/40 bg-amber-500/5"
                : "border-zinc-800 bg-zinc-900"
            }`}
          >
            {pack.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="text-xs px-3 py-1 rounded-full bg-amber-500 text-zinc-950 font-semibold">
                  Best value
                </span>
              </div>
            )}

            <div>
              <p className="font-semibold text-zinc-100">{pack.name}</p>
              <p className="text-zinc-500 text-sm mt-1">{pack.description}</p>
            </div>

            <div>
              <span className="text-3xl font-bold text-zinc-100">
                £{pack.price}
              </span>
              <span className="text-zinc-500 text-sm ml-1">
                for {pack.credits} credits
              </span>
              <p className="text-zinc-600 text-xs mt-1">
                £{pack.perCredit} per roast
              </p>
            </div>

            <button
              disabled
              className="mt-auto w-full px-4 py-2.5 rounded-lg border border-zinc-700 text-zinc-500 text-sm cursor-not-allowed"
            >
              Coming soon
            </button>
          </div>
        ))}
      </div>

      {/* FAQ placeholder */}
      <div className="border-t border-zinc-900 pt-12">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Common questions
        </h2>
        <div className="space-y-6 max-w-2xl mx-auto">
          {[
            {
              q: "What counts as one credit?",
              a: "One roast of one page or paste. You can re-roast the same page after making changes.",
            },
            {
              q: "Do credits expire?",
              a: "No. Credits you purchase are yours to use whenever.",
            },
            {
              q: "Is there a subscription?",
              a: "No. We don't believe in recurring charges for a tool you use occasionally. Buy what you need.",
            },
            {
              q: "What's the difference between normal and brutal mode?",
              a: "Brutal mode removes the diplomatic padding. Same diagnosis, sharper delivery. Use it if you can handle the truth.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="flex flex-col gap-1.5">
              <p className="font-medium text-zinc-100 text-sm">{q}</p>
              <p className="text-zinc-400 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
