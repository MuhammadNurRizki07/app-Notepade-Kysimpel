import React from "react"
import { BottomNav } from './bottom-nav';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 max-w-md mx-auto w-full pb-24">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
