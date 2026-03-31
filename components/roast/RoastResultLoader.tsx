"use client";

import { useEffect, useState } from "react";
import { RoastResult } from "./RoastResult";
import type { RoastResult as RoastResultType } from "@/lib/types";

type Props = {
  publicSlug: string;
  brutalMode: boolean;
  // Server-provided fallback (mock or DB data).
  // Overridden by sessionStorage when the result came from a fresh roast.
  fallback: RoastResultType;
};

export function RoastResultLoader({ publicSlug, brutalMode, fallback }: Props) {
  const [result, setResult] = useState<RoastResultType>(fallback);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const cached = sessionStorage.getItem(`roast:${publicSlug}`);
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as RoastResultType;
        setResult(parsed);
      } catch {
        // Corrupt cache — fall back to server-provided data
      }
    }
    setReady(true);
  }, [publicSlug]);

  // Avoid a flash of fallback content before the sessionStorage check runs
  if (!ready) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <RoastResult result={result} publicSlug={publicSlug} brutalMode={brutalMode} />;
}
