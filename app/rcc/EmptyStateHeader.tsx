"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function EmptyStateHeader({
  emoji,
  title,
  className,
}: {
  emoji: string;
  title: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="text-6xl md:text-7xl" aria-hidden="true" suppressHydrationWarning>
        {emoji}
      </div>
      <div className="text-3xl md:text-5xl font-bold tracking-tight" suppressHydrationWarning>
        {title}
      </div>
    </div>
  );
}
