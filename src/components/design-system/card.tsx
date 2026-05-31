"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  shadow?: "default" | "sm" | "none";
}

export function Card({ children, className, shadow = "default", ...props }: CardProps) {
  return (
    <div 
      className={cn(
        "bg-white dark:bg-zinc-950 border-2 border-border p-6 transition-all select-none",
        shadow === "default" && "shadow-neo hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-neo-sm",
        shadow === "sm" && "shadow-neo-sm hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-neo",
        shadow === "none" && "shadow-none",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
