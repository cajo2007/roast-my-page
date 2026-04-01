import type { Metadata } from "next";
import { FreeRoastGate } from "@/components/roast/FreeRoastGate";
import { PurchaseSuccessBanner } from "@/components/roast/PurchaseSuccessBanner";

export const metadata: Metadata = {
  title: "Roast My Page",
  description:
    "Submit your URL or paste your copy and get a sharp, specific, actionable roast.",
};

export default async function RoastPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const params = await searchParams;
  const purchaseSuccess = params.success === "true";

  return (
    <div className="px-6 py-16 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          Let's see what you've got.
        </h1>
        <p className="text-zinc-400 text-base leading-relaxed">
          Paste your URL or copy. We'll tell you exactly what's killing your
          conversions — and how to fix it.
        </p>
      </div>

      <PurchaseSuccessBanner show={purchaseSuccess} />
      <FreeRoastGate />
    </div>
  );
}
