"use client";

import { useEffect, useState } from "react";
import { RoastForm } from "./RoastForm";
import { Button } from "@/components/ui/Button";

const FREE_ROAST_KEY = "rmp_free_used";

export function FreeRoastGate() {
  const [used, setUsed] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      setUsed(localStorage.getItem(FREE_ROAST_KEY) === "1");
    } catch {
      // localStorage blocked (private browsing, etc.) — allow form to show
      setUsed(false);
    }
  }, []);

  // Avoid flash: render nothing until we've checked localStorage
  if (used === null) return null;

  if (used) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 flex flex-col gap-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-amber-500 font-semibold mb-3">
            Free roast used
          </p>
          <h2 className="text-xl font-semibold text-zinc-100 mb-2">
            You've used your free roast.
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Create an account or buy credits to roast more pages.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="primary" size="md" disabled>
            Create account — coming soon
          </Button>
          <Button variant="secondary" size="md" disabled>
            Buy credits — coming soon
          </Button>
        </div>

        <p className="text-xs text-zinc-600">
          Billing and accounts are coming shortly. Check back soon.
        </p>
      </div>
    );
  }

  return <RoastForm onSuccess={() => setUsed(true)} />;
}
