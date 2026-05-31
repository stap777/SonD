"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export const Typography = {
  Display({ children, className }: TypographyProps) {
    return (
      <h1 className={cn("font-display font-black text-4xl md:text-5xl tracking-tighter text-foreground leading-none", className)}>
        {children}
      </h1>
    );
  },

  Heading({ children, className }: TypographyProps) {
    return (
      <h2 className={cn("font-display font-extrabold text-xs uppercase tracking-widest text-foreground", className)}>
        {children}
      </h2>
    );
  },

  Subheading({ children, className }: TypographyProps) {
    return (
      <h3 className={cn("font-display font-bold text-base text-foreground uppercase tracking-tight", className)}>
        {children}
      </h3>
    );
  },

  Body({ children, className }: TypographyProps) {
    return (
      <p className={cn("text-zinc-600 dark:text-zinc-400 font-sans text-xs md:text-sm leading-relaxed", className)}>
        {children}
      </p>
    );
  },

  Caption({ children, className }: TypographyProps) {
    return (
      <span className={cn("font-mono text-[9px] text-zinc-400 font-bold uppercase tracking-wider", className)}>
        {children}
      </span>
    );
  },

  Label({ children, className }: TypographyProps) {
    return (
      <span className={cn("font-mono text-[9px] font-bold uppercase tracking-widest text-muted-foreground", className)}>
        {children}
      </span>
    );
  },

  TechnicalLabel({ children, className }: TypographyProps) {
    return (
      <code className={cn("font-mono text-[10px] text-zinc-500 bg-secondary/80 border border-border/10 px-1.5 py-0.5 select-text", className)}>
        {children}
      </code>
    );
  }
};
