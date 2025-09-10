"use client";

import ChatWindow from "@/app/rcc/ChatWindow";
import { BarChart2, Bot, MessageSquare, Settings, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-border bg-card">
          <div className="flex items-center h-16 px-4 border-b border-border">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-md bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="ml-3 text-lg font-semibold text-foreground">
                KorinAI
              </span>
            </div>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md group hover:bg-primary/90 transition-colors"
            >
              <MessageSquare className="mr-3 h-5 w-5" />
              Chat
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
            >
              <Users className="mr-3 h-5 w-5" />
              Team
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
            >
              <BarChart2 className="mr-3 h-5 w-5" />
              Analytics
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </a>
          </nav>
          <div className="p-4 border-t border-border">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-medium">
                  JD
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-foreground">
                  John Doe
                </p>
                <p className="text-xs font-medium text-muted-foreground">
                  Admin
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Chat Window */}
        <main className="flex-1 overflow-hidden bg-background">
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <ChatWindow />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
