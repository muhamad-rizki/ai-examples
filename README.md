# KorinAI Chat Integration Example

A minimal, client-side implementation of a customer support chat widget using the KorinAI API. This example demonstrates how to integrate KorinAI's chat functionality directly into your Next.js application without requiring a server-side proxy.

![Chat Window](public/demo.jpeg)

## ✨ Features

- **Direct API Integration**: Connects directly to KorinAI's chat API from the client-side
- **No Server Required**: Full implementation without the need for a server-side proxy
- **Real-time Chat**: Interactive chat interface with typing indicators
- **Responsive Design**: Works on all device sizes
- **Simple Integration**: Easy to add to any Next.js project

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm, yarn, or pnpm
- A KorinAI API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/korinai-chat-example.git
   cd korinai-chat-example
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your KorinAI credentials:
   ```
   NEXT_PUBLIC_KORINAI_API_KEY=your_korinai_api_key
   NEXT_PUBLIC_KORINAI_PARTICIPANT_EMAIL=your_email@example.com
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see the chat widget in action.

## 🛠️ Implementation Details

This example showcases a client-side implementation of the KorinAI chat widget using:
- Next.js 14 App Router
- TypeScript
- Tailwind CSS for styling
- KorinAI's JavaScript SDK for chat functionality

The main chat component is implemented in `components/ChatWindow.tsx` and can be easily added to any page in your application.

## 📝 Notes

- This is a client-side only implementation that connects directly to KorinAI's API
- No server-side code is required
- The chat state is maintained by KorinAI's backend
- The widget is fully responsive and can be styled to match your application's design

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
