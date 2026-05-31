import React from "react";
import Link from "next/link";
import { SondLogo } from "../../../components/brand/sond-logo";
import { Compass } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 w-full bg-[#E5E3DB]/90 dark:bg-zinc-950/90 backdrop-blur-md border-b-2 border-border h-16 flex items-center justify-between px-6 z-50 select-none">
      {/* Brand Wordmark & Logo */}
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 group">
          <SondLogo className="w-5 h-5 text-brand-blue group-hover:rotate-6 transition-transform" />
          <span className="font-display font-bold text-xl tracking-tight text-foreground uppercase">
            Sond
          </span>
        </Link>
        <div className="h-4 w-[1px] bg-border/40 hidden md:block"></div>
        <span className="font-mono text-[9px] font-bold tracking-widest text-muted-foreground uppercase bg-background border border-border px-2 py-0.5 hidden md:inline-block">
          Software Investigation Engine
        </span>
      </div>

      {/* Navigation anchors */}
      <nav className="hidden md:flex items-center gap-6 font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        <a href="#features" className="hover:text-foreground transition-colors">Features</a>
        <a href="#flow" className="hover:text-foreground transition-colors">Investigation Flow</a>
        <a href="#architecture" className="hover:text-foreground transition-colors">Architecture</a>
        <a href="#technology" className="hover:text-foreground transition-colors">Technology</a>
      </nav>

      {/* Primary CTA button */}
      <div className="flex items-center gap-3">
        <Link
          href="/investigation"
          className="h-9 px-4 border-2 border-border font-mono text-xs font-bold flex items-center gap-2 bg-brand-blue text-white shadow-neo-sm hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none hover:shadow-neo transition-all cursor-pointer"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>ENTER WORKSPACE</span>
        </Link>
      </div>
    </header>
  );
}
