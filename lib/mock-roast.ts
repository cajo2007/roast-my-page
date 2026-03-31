import type { RoastResult } from "./types";

// Mock roast output — this mirrors exactly what the LLM will return.
// Replace this with real LLM generation in lib/llm/generate-roast.ts
// TODO: wire up real LLM generation — see /api/roast/route.ts

export const MOCK_ROAST: RoastResult = {
  score: {
    overall: 38,
    clarity: 42,
    cta: 25,
    messaging: 35,
    trust: 48,
  },
  headline:
    "This page reads like a startup pitch deck that got lost on the way to a landing page.",
  aboveTheFold: {
    rating: "critical",
    summary:
      "A visitor has 5 seconds to understand what you do and why they should care. Yours spends that time being impressively vague.",
    issues: [
      {
        severity: "critical",
        text: "The headline mentions what you built, not what it does for the customer. 'AI-powered workflow optimization' means nothing to someone in pain right now.",
      },
      {
        severity: "critical",
        text: "There is no visible CTA above the fold on mobile. The button lives 900px down the page.",
      },
      {
        severity: "warning",
        text: "The subheadline repeats the headline in different words. You've used two sentences to say the same nothing.",
      },
      {
        severity: "warning",
        text: "The hero image is a 3D abstract render that communicates nothing about the product. Stock art for a product no one can visualize.",
      },
    ],
  },
  conversionKillers: {
    items: [
      {
        severity: "critical",
        text: "No social proof anywhere on the page. Not a logo, not a quote, not a number. Why should anyone trust you?",
      },
      {
        severity: "critical",
        text: "Your pricing section is hidden behind a 'Contact Sales' button. This kills self-serve conversions instantly.",
      },
      {
        severity: "warning",
        text: "The feature list has 11 items. Visitors don't read feature lists — they read benefits. Rewrite these as outcomes.",
      },
      {
        severity: "warning",
        text: "Three different CTAs with three different labels: 'Get Started', 'Try Free', 'Sign Up'. Pick one and commit.",
      },
      {
        severity: "minor",
        text: "Footer is cluttered with 28 links. It's screaming 'we didn't finish the website' energy.",
      },
    ],
  },
  rewrites: [
    {
      label: "Headline",
      original: "AI-Powered Workflow Optimization for Modern Teams",
      rewrite: "Ship projects 40% faster — without the status meetings.",
      why: "Lead with the outcome, not the mechanism. 'Modern teams' is not a person. '40% faster' is.",
    },
    {
      label: "Subheadline",
      original:
        "Our platform leverages cutting-edge artificial intelligence to streamline your team's existing processes and workflows.",
      rewrite:
        "Connect your tools, automate the handoffs, and watch your backlog actually move.",
      why: "Concrete > Abstract. Show the motion, not the technology.",
    },
    {
      label: "Primary CTA",
      original: "Get Started",
      rewrite: "Start your free trial — no credit card",
      why: "Remove the friction mentally. 'Get Started' is the most forgettable button label on the internet.",
    },
    {
      label: "Feature → Benefit",
      original: "Advanced reporting and analytics dashboard",
      rewrite: "Know exactly where projects get stuck — before they blow up",
      why: "A feature is what it is. A benefit is what it does for them at 11pm when the deadline slips.",
    },
  ],
  finalVerdict: {
    summary:
      "This page is doing a lot of work to avoid saying anything specific. The foundation is there — you clearly have a real product — but every conversion decision is wrong. No proof, no urgency, no clarity, buried CTA.",
    topPriorities: [
      "Rewrite the headline to lead with a concrete customer outcome",
      "Add a single, visible CTA above the fold with no friction copy",
      "Add at least 3 logos or one compelling customer quote near the top",
      "Kill 8 of your 11 feature bullets — keep the 3 that hurt the most to not have",
    ],
    wouldConvert: false,
    verdict:
      "Right now? No. With one focused afternoon of rewrites? Maybe. You're not far — you're just too afraid to say what you do out loud.",
  },
};
