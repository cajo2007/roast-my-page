import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-900 px-6 py-8">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
        <p>
          <span className="text-amber-500">🔥</span>{" "}
          <span className="text-zinc-400 font-medium">Roast My Page</span> —
          honest feedback for honest founders.
        </p>
        <nav className="flex items-center gap-4">
          <Link href="/pricing" className="hover:text-zinc-300 transition-colors">
            Pricing
          </Link>
          <Link href="/roast" className="hover:text-zinc-300 transition-colors">
            Get a roast
          </Link>
          {/* TODO: Add /privacy and /terms when legal pages are ready */}
        </nav>
      </div>
    </footer>
  );
}
