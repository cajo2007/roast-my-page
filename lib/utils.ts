import { randomBytes } from "crypto";
import type { RatingLevel, SeverityLevel } from "./types";

// Generate a short, URL-safe public slug for roast result pages
export function generatePublicSlug(): string {
  return randomBytes(6).toString("hex"); // 12-char hex string, e.g. "a3f2c1b4d5e6"
}

// Merge Tailwind class names — keeps conditional classes clean
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

// Map a 0–100 score to a label
export function scoreToLabel(score: number): string {
  if (score >= 80) return "Converting";
  if (score >= 60) return "Needs Work";
  if (score >= 40) return "Struggling";
  return "Broken";
}

// Map a 0–100 score to a Tailwind color class
export function scoreToColor(score: number): string {
  if (score >= 80) return "text-green-400";
  if (score >= 60) return "text-amber-400";
  if (score >= 40) return "text-orange-400";
  return "text-red-400";
}

// Map rating level to a display badge color
export function ratingToColor(rating: RatingLevel): string {
  const map: Record<RatingLevel, string> = {
    critical: "bg-red-500/10 text-red-400 border-red-500/20",
    poor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    decent: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    good: "bg-green-500/10 text-green-400 border-green-500/20",
  };
  return map[rating];
}

// Map severity level to a display color
export function severityToColor(severity: SeverityLevel): string {
  const map: Record<SeverityLevel, string> = {
    critical: "text-red-400",
    warning: "text-amber-400",
    minor: "text-zinc-400",
  };
  return map[severity];
}

// Map severity to a bullet/icon prefix
export function severityToIcon(severity: SeverityLevel): string {
  const map: Record<SeverityLevel, string> = {
    critical: "●",
    warning: "◆",
    minor: "○",
  };
  return map[severity];
}

// Truncate long strings for display
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + "…";
}

// Format a date for display
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}
