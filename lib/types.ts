// Shared TypeScript types for Roast My Landing Page
// These types mirror the structure of Roast.resultJson in the DB schema

export type InputType = "URL" | "PASTE";

export type SeverityLevel = "critical" | "warning" | "minor";
export type RatingLevel = "critical" | "poor" | "decent" | "good";

// Individual issue item within a roast section
export type RoastIssue = {
  severity: SeverityLevel;
  text: string;
};

// A suggested copy rewrite with context
export type RoastRewrite = {
  label: string;      // e.g. "Headline", "CTA Button", "Subheadline"
  original: string;   // What they wrote
  rewrite: string;    // What it should be
  why: string;        // Brief explanation
};

// Breakdown scores by category (0–100)
export type RoastScore = {
  overall: number;
  clarity: number;
  cta: number;
  messaging: number;
  trust: number;
};

// Above-the-fold analysis section
export type AboveTheFoldSection = {
  rating: RatingLevel;
  summary: string;
  issues: RoastIssue[];
};

// Conversion killers section
export type ConversionKillersSection = {
  items: RoastIssue[];
};

// Final verdict section
export type FinalVerdictSection = {
  summary: string;
  topPriorities: string[];
  wouldConvert: boolean;
  verdict: string; // One punchy closing line
};

// The full structured roast output — this is what gets stored in resultJson
export type RoastResult = {
  score: RoastScore;
  headline: string;               // One-liner roast (witty, punchy)
  aboveTheFold: AboveTheFoldSection;
  conversionKillers: ConversionKillersSection;
  rewrites: RoastRewrite[];
  finalVerdict: FinalVerdictSection;
};

// ------------------------------------------------------------
// LLM contract — the exact JSON the model must return.
// Stored in Roast.resultJson. Transformed to RoastResult for the UI.
// ------------------------------------------------------------

// Sub-scores returned alongside the overall score
export type LLMSubScores = {
  clarity: number;   // How clearly the value prop is communicated (0–100)
  cta: number;       // Strength and placement of calls-to-action (0–100)
  messaging: number; // How well the copy speaks to the target customer (0–100)
  trust: number;     // Social proof, credibility signals (0–100)
};

// One above-the-fold issue
export type LLMAboveTheFoldIssue = {
  issue: string;       // What is wrong, referencing specific copy
  why_it_hurts: string; // How it damages conversion
  fix: string;         // Concrete fix, not vague advice
};

// A single rewrite item returned by the LLM — structured, not pipe-delimited
export type LLMRewrite = {
  label: string;    // What element this rewrites (e.g. "Headline", "CTA")
  original: string; // Exact copy from the page
  rewrite: string;  // The replacement copy
  why: string;      // One sentence: what was missing, what the rewrite does instead
};

// The raw output returned by the LLM — do not mutate this shape
export type LLMRoastOutput = {
  score: number;                          // 0–100 overall conversion score
  sub_scores: LLMSubScores;
  headline_roast: {
    problem: string;                      // What's wrong with the current headline
    why_it_hurts: string;                 // Conversion impact, specific
    rewrite: string;                      // The actual rewritten headline
  };
  above_the_fold: LLMAboveTheFoldIssue[]; // 1–6 issues, most critical first
  conversion_killers: string[];           // 1–8 specific conversion problems
  rewrites: LLMRewrite[];                 // Structured rewrite objects
  final_verdict: string;                  // Sharp closing judgment, 2–4 sentences
};

// API request/response types
export type RoastRequest = {
  inputType: InputType;
  input: string;       // URL or pasted copy
  brutalMode: boolean;
};

export type RoastApiResponse = {
  id: string;
  publicSlug: string;
};

export type ExtractRequest = {
  url: string;
};

export type ExtractApiResponse = {
  content: string;
};
