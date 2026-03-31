import Link from "next/link";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-zinc-100 hover:text-white transition-colors flex items-center gap-2"
        >
          <span className="text-amber-500">🔥</span>
          <span>Roast My Page</span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/pricing"
            className="px-3 py-1.5 text-sm text-zinc-400 hover:text-zinc-100 transition-colors rounded-md hover:bg-zinc-900"
          >
            Pricing
          </Link>
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="px-3 py-1.5 text-sm text-zinc-400 hover:text-zinc-100 transition-colors rounded-md hover:bg-zinc-900">
                Sign in
              </button>
            </SignInButton>
          </Show>

          <Show when="signed-in">
            <div className="ml-1 flex items-center">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-7 h-7",
                  },
                }}
              />
            </div>
          </Show>

          <Link
            href="/roast"
            className="ml-2 px-4 py-1.5 text-sm font-medium bg-amber-500 hover:bg-amber-400 text-zinc-950 rounded-md transition-colors"
          >
            Roast my page
          </Link>
        </nav>
      </div>
    </header>
  );
}
