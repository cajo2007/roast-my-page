import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const extractRequestSchema = z.object({
  url: z.string().url("Must be a valid URL"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = extractRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { url } = parsed.data;

    // TODO: Implement URL content extraction
    // Options:
    //   1. Use a headless browser service (Browserless, Playwright on a serverless fn)
    //   2. Use a scraping API (Firecrawl, ScrapingBee, Jina AI Reader)
    //   3. Simple fetch + parse HTML (works for basic pages, fails on heavy JS SPAs)
    //
    // Recommended approach for MVP: Jina AI Reader — free tier, returns clean markdown
    // const response = await fetch(`https://r.jina.ai/${url}`);
    // const content = await response.text();
    //
    // Important: Strip nav, footer, cookie banners before passing to LLM
    // to reduce token usage and noise.

    void url; // suppress until implemented

    return NextResponse.json(
      {
        content: "",
        message: "URL extraction not yet implemented — paste your copy instead",
      },
      { status: 501 }
    );
  } catch (err) {
    console.error("[/api/extract] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
