"use client";

import {
  ArrowRight,
  Bot,
  Brain,
  Code,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const goToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-background to-muted/50 dark:from-foreground/5 dark:to-background overflow-hidden">
      {/* Header */}
      <header className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-xl flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              KorinAI Pro
            </span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Features
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Pricing
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              About
            </a>
          </nav>
          <button
            onClick={goToDashboard}
            className="cursor-pointer bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground px-5 py-2.5 rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-primary/20 flex items-center space-x-2"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content - Centered */}
      <main className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="max-w-4xl w-full text-center">
          <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">
              Next Generation AI Chat
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Chat Smarter with
            <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              AI Assistant
            </span>
          </h1>

          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Experience the future of AI conversations. Get instant answers,
            creative ideas, and expert assistance—all in one place.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={goToDashboard}
              className="cursor-pointer bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground px-8 py-4 rounded-xl font-medium text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-primary/30 flex items-center justify-center space-x-3"
            >
              <Zap className="w-5 h-5" />
              <span>Start Chatting Now</span>
            </button>
          </div>

          {/* Feature Highlights */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: <Brain className="w-6 h-6 text-primary" />,
                title: "Smart AI",
                description: "Advanced language understanding",
              },
              {
                icon: <Code className="w-6 h-6 text-primary" />,
                title: "Code Ready",
                description: "Write & debug code",
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-primary" />,
                title: "Secure",
                description: "Privacy focused",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-card/50 backdrop-blur-sm p-5 rounded-2xl shadow-sm hover:shadow-md transition-all border"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer - Minimal */}
      <footer className="px-6 py-4 border-t">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} KorinAI Pro. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-3 md:mt-0">
            {["Privacy", "Terms", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
