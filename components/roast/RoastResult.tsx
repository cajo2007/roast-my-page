"use client";

import { useState } from "react";
import Link from "next/link";
import { ScoreDisplay } from "./ScoreDisplay";
import {
  AboveTheFoldCard,
  ConversionKillersCard,
  RewritesCard,
  FinalVerdictCard,
} from "./RoastSection";
import { Button } from "@/components/ui/Button";
import type { RoastResult as RoastResultType } from "@/lib/types";

type RoastResultProps = {
  result: RoastResultType;
  publicSlug: string;
  brutalMode: boolean;
};

export function RoastResult({ result, publicSlug, brutalMode }: RoastResultProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/roast/${publicSlug}`
      : `/roast/${publicSlug}`;

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for browsers that block clipboard in non-HTTPS
    }
  }

  async function handleCopyRoast() {
    // TODO: Format and copy full roast text to clipboard
    // Build a clean text representation of the roast for sharing
    const text = formatRoastAsText(result);
    await navigator.clipboard.writeText(text).catch(() => {});
  }

  return (
    <div className="animate-fade-in">
      {/* Headline roast */}
      <div className="mb-10 p-6 rounded-xl border border-zinc-800 bg-zinc-900">
        {brutalMode && (
          <span className="inline-block text-xs font-semibold text-amber-500 uppercase tracking-wider mb-3">
            Brutal mode
          </span>
        )}
        <p className="text-xl sm:text-2xl font-semibold text-zinc-100 leading-snug">
          "{result.headline}"
        </p>
      </div>

      {/* Score */}
      <div className="mb-8 p-6 rounded-xl border border-zinc-800 bg-zinc-900">
        <p className="text-xs uppercase tracking-widest text-zinc-500 mb-5">
          Conversion Score
        </p>
        <ScoreDisplay score={result.score} />
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-5">
        <AboveTheFoldCard data={result.aboveTheFold} />
        <ConversionKillersCard data={result.conversionKillers} />
        <RewritesCard rewrites={result.rewrites} />
        <FinalVerdictCard data={result.finalVerdict} />
      </div>

      {/* Action bar */}
      <div className="mt-10 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row gap-3">
        <Button variant="secondary" size="md" onClick={handleCopyLink}>
          {copied ? "Copied!" : "Copy share link"}
        </Button>
        <Button variant="ghost" size="md" onClick={handleCopyRoast}>
          Copy roast as text
        </Button>
        <Link href="/roast" className="sm:ml-auto">
          <Button variant="primary" size="md">
            Roast another version →
          </Button>
        </Link>
      </div>

      {/* TODO: Add Twitter/X share button with pre-filled tweet */}
      {/* TODO: Add OG image generation so share cards render roast score */}
    </div>
  );
}

// Formats the roast as plain text for clipboard sharing
function formatRoastAsText(result: RoastResultType): string {
  const lines: string[] = [
    `🔥 Roast My Page — Conversion Audit`,
    ``,
    `Score: ${result.score.overall}/100`,
    `"${result.headline}"`,
    ``,
    `ABOVE THE FOLD`,
    result.aboveTheFold.issues.map((i) => `• ${i.text}`).join("\n"),
    ``,
    `CONVERSION KILLERS`,
    result.conversionKillers.items.map((i) => `• ${i.text}`).join("\n"),
    ``,
    `FINAL VERDICT`,
    result.finalVerdict.summary,
    ``,
    `TOP PRIORITIES`,
    result.finalVerdict.topPriorities.map((p, i) => `${i + 1}. ${p}`).join("\n"),
    ``,
    `Get your own roast at roastmypage.com`,
  ];

  return lines.join("\n");
}
