# ChatGPT Clone Example

A modern, responsive ChatGPT clone built with Next.js and TypeScript, featuring a clean UI with dark mode support.

## ✨ Features

- **Real-time Chat**: Interactive chat interface with message history
- **Markdown Support**: Messages are rendered with markdown formatting
- **Responsive Design**: Works on all device sizes
- **Dark Mode**: Built-in dark/light theme support
- **Type Safety**: Written in TypeScript for better developer experience
- **Modern UI**: Clean, minimalist interface inspired by ChatGPT

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/chatgpt-clone.git
   cd chatgpt-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State Management**: React Hooks
- **Icons**: Lucide React

## 📝 Notes

- This is a frontend-only implementation. To connect to a real AI model, you'll need to integrate with an API like OpenAI's GPT-4.
- The chat history is stored in the browser's memory and will be cleared on page refresh.
- Dark mode is automatically detected based on the system preference.
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🛠 Scripts

- `dev`: Start development server
- `build`: Build the application for production
- `start`: Start production server
- `lint`: Run ESLint
- `test`: Run tests

## 📁 Project Structure

```
/
├── app/                    # App router
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── auth/              # Authentication pages
│   └── page.tsx           # Home page
├── components/            # Reusable components
├── lib/                   # Utility functions
├── models/                # Database models
├── public/                # Static files
└── styles/                # Global styles
```

## 🌐 Deployment

### Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Docker

1. Build the Docker image:
   ```bash
   docker build -t customer-support-app .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 customer-support-app
   ```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

For any questions or feedback, please open an issue or contact us at support@example.com.
