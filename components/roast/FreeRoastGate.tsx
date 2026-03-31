"use client";

import { useEffect, useState } from "react";
import { useUser, SignUpButton, SignInButton } from "@clerk/nextjs";
import { RoastForm } from "./RoastForm";
import { Button } from "@/components/ui/Button";

const FREE_ROAST_KEY = "rmp_free_used";

export function FreeRoastGate() {
  const [used, setUsed] = useState<boolean | null>(null);
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    try {
      setUsed(localStorage.getItem(FREE_ROAST_KEY) === "1");
    } catch {
      // localStorage blocked (private browsing, etc.) — allow form to show
      setUsed(false);
    }
  }, []);

  // Avoid flash: render nothing until localStorage and Clerk are both ready
  if (used === null || !isLoaded) return null;

  if (used) {
    if (isSignedIn) {
      return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 flex flex-col gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-500 font-semibold mb-3">
              Free roast used
            </p>
            <h2 className="text-xl font-semibold text-zinc-100 mb-2">
              You're signed in.
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Credits and payments are the next step.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="primary" size="md" disabled>
              Buy credits — coming soon
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 flex flex-col gap-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-amber-500 font-semibold mb-3">
            Free roast used
          </p>
          <h2 className="text-xl font-semibold text-zinc-100 mb-2">
            Free roast used. Create an account to keep going.
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Sign up to save your roasts and get more credits.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <SignUpButton mode="modal">
            <Button variant="primary" size="md">
              Create account
            </Button>
          </SignUpButton>
          <SignInButton mode="modal">
            <Button variant="secondary" size="md">
              Sign in
            </Button>
          </SignInButton>
        </div>
      </div>
    );
  }

  return <RoastForm onSuccess={() => setUsed(true)} />;
}
