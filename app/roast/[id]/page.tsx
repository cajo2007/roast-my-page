import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { RoastResultLoader } from "@/components/roast/RoastResultLoader";
import { MOCK_ROAST } from "@/lib/mock-roast";
import { formatDate } from "@/lib/utils";
import type { RoastResult as RoastResultType } from "@/lib/types";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Roast #${id.slice(0, 6)}`,
    description: "Read the full landing page roast and conversion audit.",
    // TODO: Add dynamic OG image showing score + headline when sharing
  };
}

async function getRoast(slug: string): Promise<{
  result: RoastResultType;
  brutalMode: boolean;
  createdAt: Date;
  inputType: string;
} | null> {
  // "example" slug always returns mock data — useful for the homepage demo link
  if (slug === "example") {
    return {
      result: MOCK_ROAST,
      brutalMode: false,
      createdAt: new Date(),
      inputType: "PASTE",
    };
  }

  // TODO: Fetch from DB once DATABASE_URL is configured and Prisma is migrated:
  //
  // try {
  //   const roast = await prisma.roast.findUnique({
  //     where: { publicSlug: slug },
  //   });
  //
  //   if (!roast || !roast.isPublic) return null;
  //
  //   return {
  //     result: roast.resultJson as RoastResultType,
  //     brutalMode: roast.brutalMode,
  //     createdAt: roast.createdAt,
  //     inputType: roast.inputType,
  //   };
  // } catch (err) {
  //   console.error("[/roast/[id]] DB fetch error:", err);
  //   return null;
  // }

  // TEMP: Return mock data for any slug while DB is not wired up
  // Remove this once the DB TODO above is implemented
  return {
    result: MOCK_ROAST,
    brutalMode: false,
    createdAt: new Date(),
    inputType: "PASTE",
  };
}

export default async function RoastResultPage({ params }: Props) {
  const { id } = await params;
  const roast = await getRoast(id);

  if (!roast) notFound();

  const { result, brutalMode, createdAt, inputType } = roast;

  return (
    <div className="px-6 py-12 max-w-3xl mx-auto">
      {/* Page header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
          <span>{inputType === "URL" ? "URL analysis" : "Copy analysis"}</span>
          <span>·</span>
          <span>{formatDate(createdAt)}</span>
          {brutalMode && (
            <>
              <span>·</span>
              <span className="text-amber-500">Brutal mode</span>
            </>
          )}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold">Your roast is ready.</h1>
      </div>

      <RoastResultLoader fallback={result} publicSlug={id} brutalMode={brutalMode} />
    </div>
  );
}
