import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PACKS = {
  starter: {
    credits: 3,
    priceId: process.env.STRIPE_PRICE_ID_3_CREDITS!,
  },
  value: {
    credits: 10,
    priceId: process.env.STRIPE_PRICE_ID_10_CREDITS!,
  },
} as const;

export async function POST(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "You must be signed in to purchase credits." },
      { status: 401 }
    );
  }

  const body = await req.json();
  const pack = body.pack as keyof typeof PACKS | undefined;
  const packData = pack ? PACKS[pack] : undefined;

  if (!packData) {
    return NextResponse.json({ error: "Invalid pack." }, { status: 400 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: packData.priceId, quantity: 1 }],
    metadata: {
      userId,
      credits: String(packData.credits),
    },
    success_url: `${appUrl}/roast?success=true`,
    cancel_url: `${appUrl}/roast`,
  });

  return NextResponse.json({ url: session.url });
}
