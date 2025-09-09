"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, generateId, UIMessage } from "ai";
import { useEffect, useRef, useState } from "react";
import { Conversation, ConversationContent } from "./ai-elements/conversation";
import { Message, MessageContent } from "./ai-elements/message";
import { Response } from "./ai-elements/response";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function ChatWindow() {
  const [isOpen, setIsOpen] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const networkTransport = new DefaultChatTransport({
    api: "https://api.korinai.com/api/chat",
    headers: {
      Authorization: "Bearer " + process.env.NEXT_PUBLIC_KORINAI_API_KEY,
    },
    body: {
      room_id: undefined, // since we don't need chat persistence, we can omit this. KorinAI will generate a random room_id for us.
      participantEmail: "user@email.com", // need to replace with actual Korin User email
    },
  });

  const { messages, sendMessage } = useChat({
    transport: networkTransport,
    onFinish: () => {
      setIsTyping(false);
    },
  });

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: UIMessage = {
      id: generateId(),
      role: "user",
      parts: [{ type: "text", text: inputValue }],
    };

    setInputValue("");
    setIsTyping(true);
    await sendMessage(userMessage);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6">
        <Button
          onClick={toggleChat}
          className="rounded-full w-14 h-14 p-0 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-white rounded-lg shadow-xl flex flex-col h-[500px] border border-gray-200">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 rounded-t-lg flex justify-between items-center">
        <h3 className="font-semibold">Customer Support</h3>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-primary-foreground hover:bg-primary/90"
          onClick={toggleChat}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </Button>
      </div>

      {/* Messages */}
      <Conversation>
        <ConversationContent>
          {(messages.length > 0
            ? messages
            : [
                {
                  id: generateId(),
                  role: "assistant",
                  parts: [
                    {
                      type: "text",
                      text: "Hello! I'm your AI assistant. How can I help you today?",
                    },
                  ],
                } as UIMessage,
              ]
          ).map((message) => (
            <div key={message.id}>
              {message.parts
                .filter((x) => x.type === "text")
                .filter((x) => !!x.text.trim())
                .map((part, i) => (
                  <Message key={`${message.id}-${i}`} from={message.role}>
                    <MessageContent>
                      <Response>{part.text}</Response>
                    </MessageContent>
                  </Message>
                ))}
            </div>
          ))}
          {isTyping && (
            <div className="flex items-start">
              <div className="bg-muted rounded-lg px-4 py-2 rounded-bl-none">
                <div className="flex space-x-1 py-2">
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </ConversationContent>
      </Conversation>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1"
            disabled={isTyping}
          />
          <Button type="submit" size="sm" disabled={isTyping}>
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}
