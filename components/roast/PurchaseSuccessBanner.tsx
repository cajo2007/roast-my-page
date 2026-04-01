"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export function PurchaseSuccessBanner({ show }: { show: boolean }) {
  const { user } = useUser();

  // Reload Clerk user so updated credit count is reflected immediately
  useEffect(() => {
    if (show && user) {
      user.reload();
    }
  }, [show, user]);

  if (!show) return null;

  return (
    <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
      Payment successful — your credits have been added.
    </div>
  );
}
