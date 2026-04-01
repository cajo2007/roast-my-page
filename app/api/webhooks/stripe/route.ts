export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { clerkClient } from "@clerk/nextjs/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { error: "Missing stripe-signature header." },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Webhook verification failed.";
    console.error("[webhook/stripe] Signature verification failed:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const purchased = parseInt(session.metadata?.credits ?? "0", 10);

    if (!userId || !purchased) {
      console.error("[webhook/stripe] Missing metadata:", session.metadata);
      return NextResponse.json({ error: "Missing metadata." }, { status: 400 });
    }

    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);

    // Mirror the lazy-init default used in the roast API so credits are consistent
    const existing =
      typeof user.publicMetadata.credits === "number"
        ? user.publicMetadata.credits
        : 3;

    await clerk.users.updateUser(userId, {
      publicMetadata: { credits: existing + purchased },
    });
  }

  return NextResponse.json({ received: true });
}
