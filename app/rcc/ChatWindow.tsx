"use client";

import { EmptyStateHeader } from "@/app/rcc/EmptyStateHeader";
import { Action, Actions } from "@/components/ai-elements/actions";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Loader } from "@/components/ai-elements/loader";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/components/ai-elements/reasoning";
import { Response } from "@/components/ai-elements/response";
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@/components/ai-elements/sources";
import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { ChatStatus, DefaultChatTransport, generateId, UIMessage } from "ai";
import { CopyIcon, RefreshCcwIcon } from "lucide-react";
import { Fragment, useMemo, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ChatWindow({ roomId }: { roomId?: string }) {
  const [input, setInput] = useState("");
  const [currentRoomId, setCurrentRoomId] = useState(roomId || generateId());
  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);

  const networkTransport = new DefaultChatTransport({
    api: "/api/chat",
    body: {
      roomId: currentRoomId,
    },
  });

  const { messages, regenerate, sendMessage, status } = useChat({
    transport: networkTransport,
    id: currentRoomId,
  });

  const welcomeText = useMemo(() => {
    const candidates = [
      "How can I help you today?",
      "What are we exploring next?",
      "Got a question or an idea?",
      "Tell me what you're working on!",
      "Ready when you are. Ask me anything.",
      "Let's build something great.",
    ];
    return candidates[Math.floor(Math.random() * candidates.length)];
  }, []);

  const welcomeEmoji = useMemo(() => {
    const emojis = ["🤖", "✨", "🚀", "💡", "🧠", "📚", "🛠️", "🌟", "🔥", "🌈"];
    return emojis[Math.floor(Math.random() * emojis.length)];
  }, []);

  const handleSubmit = async (message: PromptInputMessage) => {
    const hasText = Boolean(message.text && message.text.trim());
    const hasAttachments = Boolean(message.files && message.files.length);
    if (!(hasText || hasAttachments)) return;

    const userText = hasText
      ? (message.text as string)
      : "Sent with attachments";
    const userMsg: UIMessage = {
      id: generateId(),
      role: "user",
      parts: [{ type: "text", text: userText }],
    };
    setCurrentRoomId(currentRoomId);
    sendMessage(userMsg, { body: { roomId: currentRoomId } });
    setInput("");
  };

  // Insert the suggested prompt into the input using the /api/prompt helper
  const handleQuickPromptClick = async (query: string) => {
    try {
      if (isGeneratingPrompt) return;
      setIsGeneratingPrompt(true);
      const res = await fetch("/api/prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      if (!res.ok) return;
      const data = (await res.json()) as { prompt?: string };
      if (data?.prompt) setInput(data.prompt);
    } catch {
    } finally {
      setIsGeneratingPrompt(false);
    }
  };

  return (
    <div className={cn("flex h-full min-h-0 w-full flex-col bg-background")}>
      <div className="flex h-full flex-col">
        <Conversation className="h-full">
          <ConversationContent className="mx-auto max-w-6xl">
            {messages.length === 0 ? (
              <ConversationEmptyState className="flex items-center justify-center flex-1 h-[calc(100vh-200px)]">
                <div className="text-center space-y-4">
                  <EmptyStateHeader emoji={welcomeEmoji} title={welcomeText} />
                  <p className="text-muted-foreground">Try prompts like:</p>
                  <div className="mx-auto w-fit">
                    <div
                      className={cn(
                        "relative flex flex-wrap justify-center gap-2",
                        isGeneratingPrompt && "opacity-60 pointer-events-none"
                      )}
                    >
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={() =>
                          handleQuickPromptClick("Summarize this article")
                        }
                        onKeyDown={(e) =>
                          e.key === "Enter" &&
                          handleQuickPromptClick("Summarize this article")
                        }
                        className="cursor-pointer rounded-full border px-3 py-1 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition"
                      >
                        Summarize this article
                      </span>
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={() =>
                          handleQuickPromptClick("Explain a concept like I'm 5")
                        }
                        onKeyDown={(e) =>
                          e.key === "Enter" &&
                          handleQuickPromptClick("Explain a concept like I'm 5")
                        }
                        className="cursor-pointer rounded-full border px-3 py-1 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition"
                      >
                        Explain a concept like I'm 5
                      </span>
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={() =>
                          handleQuickPromptClick("Draft an email to my team")
                        }
                        onKeyDown={(e) =>
                          e.key === "Enter" &&
                          handleQuickPromptClick("Draft an email to my team")
                        }
                        className="cursor-pointer rounded-full border px-3 py-1 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition"
                      >
                        Draft an email to my team
                      </span>

                      {isGeneratingPrompt && (
                        <div className="absolute inset-0 flex items-center justify-center rounded-md bg-background/70 backdrop-blur-sm">
                          <span className="text-sm text-muted-foreground">
                            Generating prompt…
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mt-8 flex items-center justify-center">
                      <div className="inline-flex items-center gap-2 rounded-lg border bg-muted/50 px-4 py-2.5 text-sm text-muted-foreground">
                        <span className="text-base">💡</span>
                        <span>Click any prompt to get started</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ConversationEmptyState>
            ) : (
              messages.map((message, mIdx) => (
                <div key={message.id}>
                  {message.role === "assistant" &&
                    message.parts.filter((p) => p.type === "source-url")
                      .length > 0 && (
                      <Sources>
                        <SourcesTrigger
                          count={
                            message.parts.filter((p) => p.type === "source-url")
                              .length
                          }
                        />
                        {message.parts
                          .filter((p) => p.type === "source-url")
                          .map((p, i) => (
                            <SourcesContent key={`${message.id}-${i}`}>
                              <Source
                                href={(p as any).url}
                                title={(p as any).url}
                              />
                            </SourcesContent>
                          ))}
                      </Sources>
                    )}

                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case "text":
                        if (!part.text.trim()) return null;
                        return (
                          <Fragment key={`${message.id}-${i}`}>
                            <Message className="py-1" from={message.role}>
                              <MessageContent>
                                <Response>{part.text}</Response>
                              </MessageContent>
                            </Message>
                            {message.role === "assistant" &&
                              mIdx === messages.length - 1 && (
                                <Actions className="mt-1">
                                  <Action
                                    onClick={() => regenerate()}
                                    label="Retry"
                                    size="icon"
                                  >
                                    <RefreshCcwIcon className="size-3" />
                                  </Action>
                                  <Action
                                    onClick={() =>
                                      navigator.clipboard.writeText(part.text)
                                    }
                                    label="Copy"
                                    size="icon"
                                  >
                                    <CopyIcon className="size-3" />
                                  </Action>
                                </Actions>
                              )}
                          </Fragment>
                        );
                      case "reasoning":
                        return (
                          <Reasoning
                            key={`${message.id}-${i}`}
                            className="w-full mb-1"
                            isStreaming={
                              status === "streaming" &&
                              i === message.parts.length - 1 &&
                              message.id === messages.at(-1)?.id
                            }
                          >
                            <ReasoningTrigger />
                            <ReasoningContent>
                              {(part as any).text}
                            </ReasoningContent>
                          </Reasoning>
                        );
                      default:
                        return null;
                    }
                  })}
                </div>
              ))
            )}
            {(["submitted", "streaming"] as ChatStatus[]).includes(status) && (
              <Loader />
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <PromptInput
          onSubmit={handleSubmit}
          className="mt-2 mb-4 mx-auto max-w-6xl"
          globalDrop
          multiple
        >
          <PromptInputBody>
            <PromptInputAttachments>
              {(attachment) => <PromptInputAttachment data={attachment} />}
            </PromptInputAttachments>
            <PromptInputTextarea
              onChange={(e) => setInput(e.target.value)}
              value={input}
              placeholder="Message..."
              disabled={isGeneratingPrompt || status === "streaming"}
              aria-busy={isGeneratingPrompt}
            />
          </PromptInputBody>
          <PromptInputToolbar>
            <PromptInputTools />
            <PromptInputSubmit
              status={status}
              disabled={status === "streaming" || isGeneratingPrompt}
            />
          </PromptInputToolbar>
        </PromptInput>
      </div>
    </div>
  );
}
