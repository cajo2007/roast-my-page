"use client";

import { useEffect, useState } from "react";
import { useUser, SignUpButton, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { RoastForm } from "./RoastForm";
import { Button } from "@/components/ui/Button";

const FREE_ROAST_KEY = "rmp_free_used";

export function FreeRoastGate() {
  const [used, setUsed] = useState<boolean | null>(null);
  const { user, isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    try {
      setUsed(localStorage.getItem(FREE_ROAST_KEY) === "1");
    } catch {
      setUsed(false);
    }
  }, []);

  if (!isLoaded) return null;

  // Signed-in users bypass the localStorage gate — credits are managed server-side
  if (isSignedIn) {
    const credits =
      typeof user?.publicMetadata?.credits === "number"
        ? user.publicMetadata.credits
        : 3;

    if (credits <= 0) {
      return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 flex flex-col gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-500 font-semibold mb-3">
              Out of credits
            </p>
            <h2 className="text-xl font-semibold text-zinc-100 mb-2">
              You're out of credits.
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Pick up a credit pack to keep roasting. No subscription — buy what you need.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="primary" size="md" disabled>
              3 credits — £3 (coming soon)
            </Button>
            <Button variant="secondary" size="md" disabled>
              10 credits — £7 (coming soon)
            </Button>
          </div>

          <Link
            href="/pricing"
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            See full pricing →
          </Link>
        </div>
      );
    }

    return <RoastForm />;
  }

  // Signed-out path: enforce the one-free-roast localStorage gate
  if (used === null) return null;

  if (used) {
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
