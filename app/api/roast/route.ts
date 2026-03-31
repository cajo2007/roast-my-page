export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { generatePublicSlug } from "@/lib/utils";
import { generateRoast, transformToRoastResult } from "@/lib/llm/generate-roast";

const roastRequestSchema = z.object({
  inputType: z.enum(["URL", "PASTE"]),
  input: z.string().min(1, "Input is required").max(50000),
  brutalMode: z.boolean().default(false),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = roastRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { inputType, input, brutalMode } = parsed.data;

    // Resolve the content to analyze.
    // For URL input, the client should have already called /api/extract and
    // passed the extracted content. If it comes through as a raw URL, fall back
    // gracefully with a clear error rather than silently sending a bare URL to the LLM.
    const content = input.trim();

    if (inputType === "URL" && content.startsWith("http")) {
      // URL extraction is not yet implemented — client should send extracted text.
      // TODO: Once /api/extract is implemented, call it here server-side instead.
      return NextResponse.json(
        {
          error:
            "URL extraction is not yet implemented. Please paste your landing page copy directly.",
        },
        { status: 422 }
      );
    }

    if (content.split(/\s+/).length < 20) {
      return NextResponse.json(
        {
          error:
            "Not enough content to roast. Paste more copy — include your headline, subhead, features, and CTA at minimum.",
        },
        { status: 422 }
      );
    }

    // TODO: Check credit balance before generating (after auth + billing are wired)
    // If user has no credits and has already used their free roast, return 402

    // Generate the roast via LLM
    let llmOutput;
    try {
      llmOutput = await generateRoast(content, brutalMode);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Roast generation failed.";
      const isConfigError = message.includes("OPENAI_API_KEY");

      return NextResponse.json(
        { error: isConfigError ? message : "Roast generation failed. Please try again." },
        { status: isConfigError ? 500 : 502 }
      );
    }

    // Transform LLM output to UI-ready RoastResult
    const roastResult = transformToRoastResult(llmOutput);
    const publicSlug = generatePublicSlug();

    // TODO: Uncomment when DATABASE_URL is configured and `prisma db push` has been run
    // const roast = await prisma.roast.create({
    //   data: {
    //     inputType,
    //     originalInput: input,
    //     brutalMode,
    //     resultJson: llmOutput as object, // store raw LLM output
    //     publicSlug,
    //     // userId: session?.user?.id ?? null,
    //   },
    // });
    // return NextResponse.json(
    //   { id: roast.id, publicSlug: roast.publicSlug, result: roastResult },
    //   { status: 201 }
    // );

    void prisma; // suppress until DB is wired

    // Return both the routing slug and the full result so the client can
    // render immediately without a second round-trip to fetch by slug.
    return NextResponse.json(
      { id: publicSlug, publicSlug, result: roastResult },
      { status: 201 }
    );
  } catch (err) {
    console.error("[/api/roast] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
