export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { generatePublicSlug } from "@/lib/utils";
import { generateRoast, transformToRoastResult } from "@/lib/llm/generate-roast";

const NEW_USER_CREDITS = 3;

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

    const content = input.trim();

    if (inputType === "URL" && content.startsWith("http")) {
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

    // Credit check for signed-in users
    const { userId } = await auth();
    let currentCredits: number | null = null;
    let clerk: Awaited<ReturnType<typeof clerkClient>> | null = null;

    if (userId) {
      clerk = await clerkClient();
      const clerkUser = await clerk.users.getUser(userId);
      currentCredits =
        typeof clerkUser.publicMetadata.credits === "number"
          ? clerkUser.publicMetadata.credits
          : NEW_USER_CREDITS;

      if (currentCredits <= 0) {
        return NextResponse.json(
          { error: "You're out of credits." },
          { status: 402 }
        );
      }
    }

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

    // Decrement credits after successful generation
    if (userId && clerk !== null && currentCredits !== null) {
      await clerk.users.updateUser(userId, {
        publicMetadata: { credits: currentCredits - 1 },
      });
    }

    const roastResult = transformToRoastResult(llmOutput);
    const publicSlug = generatePublicSlug();

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
