import Image from "next/image";
import { ChatWindow } from "@/components/ChatWindow";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen bg-background text-foreground">
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">CS</span>
            </div>
            <span className="text-xl font-bold text-foreground">KorinCenter</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          </nav>
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-lg font-medium transition-colors">
            Get Started
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow flex items-center">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Modern Customer Support
            <span className="text-primary"> Made Simple</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Streamline your customer support with our all-in-one platform. Manage tickets, automate responses, and deliver exceptional service.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-lg font-medium text-lg transition-colors">
              Start Free Trial
            </button>
            <button className="border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground px-8 py-4 rounded-lg font-medium text-lg transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-muted/50 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">CS</span>
              </div>
              <span className="text-xl font-bold text-foreground">KorinCenter</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border text-center text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} KorinCenter. All rights reserved.
          </div>
        </div>
      </footer>
      <ChatWindow />
    </div>
  );
}
