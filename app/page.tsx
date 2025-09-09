import { Bot, Sparkles, Zap, Brain, MessageSquare, Code, ShieldCheck, Send, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Header */}
      <header className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ChatAI Pro
            </span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white transition-colors font-medium">Features</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white transition-colors font-medium">Pricing</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white transition-colors font-medium">About</a>
          </nav>
          <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-indigo-500/20 flex items-center space-x-2">
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content - Centered */}
      <main className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="max-w-4xl w-full text-center">
          <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 bg-indigo-50 dark:bg-gray-800 rounded-full">
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Next Generation AI Chat</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Chat Smarter with
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">AI Assistant</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Experience the future of AI conversations. Get instant answers, creative ideas, and expert assistance—all in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-medium text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center space-x-3">
              <Zap className="w-5 h-5" />
              <span>Start Chatting Now</span>
            </button>
          </div>

          {/* Feature Highlights */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: <Brain className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
                title: "Smart AI",
                description: "Advanced language understanding"
              },
              {
                icon: <Code className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
                title: "Code Ready",
                description: "Write & debug code"
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
                title: "Secure",
                description: "Privacy focused"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-indigo-50 dark:bg-gray-700 rounded-xl flex items-center justify-center mx-auto mb-3">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer - Minimal */}
      <footer className="px-6 py-4 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} ChatAI Pro. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-3 md:mt-0">
            {['Privacy', 'Terms', 'Contact'].map((item) => (
              <a 
                key={item}
                href="#" 
                className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-white transition-colors text-sm"
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
