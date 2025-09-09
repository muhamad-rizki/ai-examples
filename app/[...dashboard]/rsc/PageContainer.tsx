import { ReactNode } from "react";

export default function PageContainer({ children }: { children: ReactNode }) {
  // Simple wrapper that can host server-only logic later if needed
  return (
    <div className="flex h-svh w-full flex-col bg-background">{children}</div>
  );
}
