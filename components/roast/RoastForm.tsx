"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { InputType } from "@/lib/types";

type TabType = InputType;

export function RoastForm() {
  const router = useRouter();

  const [tab, setTab] = useState<TabType>("URL");
  const [url, setUrl] = useState("");
  const [pastedCopy, setPastedCopy] = useState("");
  const [brutalMode, setBrutalMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const input = tab === "URL" ? url : pastedCopy;
  const hasInput = input.trim().length > 0;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!hasInput) {
      setError(
        tab === "URL"
          ? "Please enter a URL."
          : "Please paste your landing page copy."
      );
      return;
    }

    if (tab === "URL") {
      try {
        new URL(url);
      } catch {
        setError("Please enter a valid URL including https://");
        return;
      }
    }

    setLoading(true);

    try {
      const res = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inputType: tab,
          input: input.trim(),
          brutalMode,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      const data = await res.json();
      // Cache result in sessionStorage so the result page renders without a DB round-trip.
      // Once DB persistence is wired, the result page will fall back to a DB fetch.
      if (data.result) {
        sessionStorage.setItem(`roast:${data.publicSlug}`, JSON.stringify(data.result));
      }
      router.push(`/roast/${data.publicSlug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Input type tabs */}
      <div className="flex rounded-lg border border-zinc-800 p-1 bg-zinc-900 w-fit">
        {(["URL", "PASTE"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => {
              setTab(t);
              setError(null);
            }}
            className={cn(
              "px-5 py-2 rounded-md text-sm font-medium transition-colors",
              tab === t
                ? "bg-zinc-800 text-zinc-100"
                : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            {t === "URL" ? "Page URL" : "Paste copy"}
          </button>
        ))}
      </div>

      {/* Input field */}
      {tab === "URL" ? (
        <div className="flex flex-col gap-1.5">
          <label htmlFor="url" className="text-sm text-zinc-400 font-medium">
            Landing page URL
          </label>
          <input
            id="url"
            type="url"
            placeholder="https://yoursite.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-colors text-sm"
          />
          <p className="text-xs text-zinc-600">
            We'll pull the content from your URL and analyze it.{" "}
            {/* TODO: remove note when URL extraction is implemented */}
            <span className="text-amber-600">
              URL extraction coming soon — paste your copy for now.
            </span>
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="paste-copy"
            className="text-sm text-zinc-400 font-medium"
          >
            Paste your landing page copy
          </label>
          <textarea
            id="paste-copy"
            placeholder="Paste all the text from your landing page here — headline, subhead, feature list, CTAs, social proof, everything."
            value={pastedCopy}
            onChange={(e) => setPastedCopy(e.target.value)}
            rows={10}
            className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-colors text-sm resize-y min-h-[160px]"
          />
          <p className="text-xs text-zinc-600">
            More copy = better roast. Include everything a visitor would read.
          </p>
        </div>
      )}

      {/* Brutal mode toggle */}
      <div className="flex items-start gap-3 p-4 rounded-lg border border-zinc-800 bg-zinc-900/50">
        <button
          type="button"
          role="switch"
          aria-checked={brutalMode}
          onClick={() => setBrutalMode((v) => !v)}
          className={cn(
            "relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors",
            brutalMode ? "bg-amber-500" : "bg-zinc-700"
          )}
        >
          <span
            className={cn(
              "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg transition-transform",
              brutalMode ? "translate-x-4" : "translate-x-0"
            )}
          />
        </button>
        <div>
          <p className="text-sm font-medium text-zinc-200">Brutal mode</p>
          <p className="text-xs text-zinc-500 mt-0.5">
            No diplomatic padding. Same analysis, sharper delivery. For founders
            who want the unfiltered truth.
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={loading}
        disabled={!hasInput}
        className="w-full sm:w-auto"
      >
        {loading ? "Roasting…" : brutalMode ? "Roast me (brutally) →" : "Roast my page →"}
      </Button>

      <p className="text-xs text-zinc-600">
        Your first roast is free. No account required.
        {/* TODO: show credit balance here when auth + billing are live */}
      </p>
    </form>
  );
}
