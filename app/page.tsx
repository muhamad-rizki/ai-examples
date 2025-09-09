import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">CS</span>
            </div>
            <span className="text-xl font-bold text-gray-800 dark:text-white">SupportHub</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white transition-colors">How It Works</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white transition-colors">Pricing</a>
          </nav>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Get Started
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow flex items-center">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Modern Customer Support
            <span className="text-blue-600"> Made Simple</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Streamline your customer support with our all-in-one platform. Manage tickets, automate responses, and deliver exceptional service.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors">
              Start Free Trial
            </button>
            <button className="border-2 border-gray-300 hover:border-blue-600 text-gray-700 dark:text-gray-200 dark:border-gray-600 px-8 py-4 rounded-lg font-medium text-lg transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 dark:bg-gray-900 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">CS</span>
              </div>
              <span className="text-xl font-bold text-gray-800 dark:text-white">SupportHub</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} SupportHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
