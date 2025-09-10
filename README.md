# KorinAI API Integration Example

This repository provides example implementations for integrating with the KorinAI API. It demonstrates how to set up server-side API routes in Next.js to proxy requests to the KorinAI chat and prompt generation endpoints.

## ✨ Features

- **Chat API Proxy**: Server-side proxy for KorinAI's chat API with proper error handling and streaming support
- **Prompt Generation**: Example implementation for generating high-quality prompts using KorinAI
- **Type Safety**: Built with TypeScript for better developer experience
- **Environment Configuration**: Secure handling of API keys and configuration
- **Streaming Support**: Efficient handling of server-sent events (SSE) for real-time responses

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm, yarn, or pnpm
- KorinAI API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/ai-examples.git
   cd ai-examples
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
   Copy `.env.example` to `.env.local` and update with your KorinAI API credentials:
   ```env
   KORINAI_API_KEY=your_api_key_here
   KORINAI_PARTICIPANT_EMAIL=participant@example.com
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   The API routes will be available at:
   - `POST /api/chat` - Chat API proxy
   - `POST /api/prompt` - Prompt generation endpoint

## 🛠️ API Endpoints

### Chat API Proxy (`/api/chat`)

Proxies requests to the KorinAI chat API with support for:
- Server-sent events (SSE) streaming
- Authentication header injection
- Error handling and response forwarding
- Request/response transformation

### Prompt Generation (`/api/prompt`)

Generates high-quality prompts using KorinAI's chat API:
- Takes a user goal as input
- Uses a system instruction for prompt engineering
- Returns a well-structured, actionable prompt
- Handles errors and edge cases gracefully

## 🛠️ Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **API**: Edge-compatible API routes

## 📝 Usage Examples

### Chat API Request

```typescript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    roomId: 'unique-room-id',
    messages: [
      {
        role: 'user',
        parts: [{ type: 'text', text: 'Hello, KorinAI!' }]
      }
    ]
  })
});
```

### Prompt Generation Request

```typescript
const response = await fetch('/api/prompt', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: 'I need a prompt for generating product descriptions'
  })
});
```

## 🛠 Scripts

- `dev`: Start development server
- `build`: Build the application for production
- `start`: Start production server
- `lint`: Run ESLint
- `test`: Run tests

## 📁 Project Structure

```
/
├── app/
│   ├── api/
│   │   ├── chat/          # Chat API proxy route
│   │   │   └── route.ts   # Handles chat completions
│   │   └── prompt/        # Prompt generation route
│   │       └── route.ts   # Handles prompt generation
│   └── (other app routes)
├── components/            # Reusable UI components
├── lib/                   # Utility functions
└── public/                # Static assets
```

## 🌐 Deployment

### Vercel

Deploy to Vercel for a serverless deployment with edge functions:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-org%2Fai-examples)

### Environment Variables

Make sure to set these environment variables in your deployment:

- `KORINAI_API_KEY`: Your KorinAI API key
- `KORINAI_PARTICIPANT_EMAIL`: Email for participant identification

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
