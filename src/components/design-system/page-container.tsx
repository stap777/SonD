"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn("max-w-[1200px] w-full mx-auto px-4 md:px-6 py-6 md:py-8 space-y-6", className)}>
      {children}
    </div>
  );
}
