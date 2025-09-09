"use client";

import { EmptyStateHeader } from "@/app/[...dashboard]/rcc/EmptyStateHeader";
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
import { CHAT_MESSAGES_UPDATED } from "@/lib/chat/events";
import { loadMessages, saveMessages, updateRoomMeta } from "@/lib/chat/storage";
import { generateRandomName } from "@/lib/chat/utils";
import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { ChatStatus, DefaultChatTransport, generateId, UIMessage } from "ai";
import { CopyIcon, RefreshCcwIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { mutate as swrMutate } from "swr";

export default function ChatWindow({ roomId }: { roomId?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [input, setInput] = useState("");
  const [currentRoomId, setCurrentRoomId] = useState(roomId || generateId());
  const ignoreNextMessagesEvent = useRef(false);

  const networkTransport = new DefaultChatTransport({
    api: "https://api.korinai.com/api/chat",
    body: {
      roomId: currentRoomId,
      participantEmail: process.env.NEXT_PUBLIC_KORINAI_PARTICIPANT_EMAIL,
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_KORINAI_API_KEY}`,
    },
  });

  const { messages, setMessages, regenerate, sendMessage, status } = useChat({
    transport: networkTransport,
    id: currentRoomId,
    onFinish: ({ messages }) => {
      // persist messages and navigate
      saveMessages(currentRoomId, messages);
      setTimeout(() => {
        router.push(`${basePath}/${currentRoomId}`);
      }, 500);
    },
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
  }, [roomId]);

  const welcomeEmoji = useMemo(() => {
    const emojis = ["🤖", "✨", "🚀", "💡", "🧠", "📚", "🛠️", "🌟", "🔥", "🌈"];
    return emojis[Math.floor(Math.random() * emojis.length)];
  }, [roomId]);

  const segments = useMemo(
    () => pathname?.split("/").filter(Boolean) ?? [],
    [pathname]
  );
  const basePath = useMemo(
    () => (segments[0] === "dashboard" ? "/dashboard" : ""),
    [segments]
  );

  // Load initial
  useEffect(() => {
    if (ignoreNextMessagesEvent.current) {
      return;
    }

    if (!roomId) return;

    const initial = loadMessages(roomId);
    setMessages(initial);
    setCurrentRoomId(roomId);
  }, [roomId]);

  // Listen for same-tab updates (e.g., previous component instance saving assistant reply after redirect)
  useEffect(() => {
    const onUpdated = (e: Event) => {
      const evt = e as CustomEvent<{ roomId?: string }>;
      if (ignoreNextMessagesEvent.current) {
        // consume and ignore one event originating from this component's own save
        ignoreNextMessagesEvent.current = false;
        return;
      }
      if (evt.detail?.roomId === roomId) {
        setMessages(loadMessages(roomId));
      }
    };
    window.addEventListener(CHAT_MESSAGES_UPDATED, onUpdated as EventListener);
    return () =>
      window.removeEventListener(
        CHAT_MESSAGES_UPDATED,
        onUpdated as EventListener
      );
  }, [roomId]);

  // Persist (avoid writing empty arrays on initial mount/navigation)
  useEffect(() => {
    if (!roomId) return;
    if (messages.length === 0) return;
    // mark to ignore the next event triggered by our own save
    ignoreNextMessagesEvent.current = true;
    saveMessages(roomId, messages);
  }, [messages, roomId]);

  const handleSubmit = async (message: PromptInputMessage) => {
    const hasText = Boolean(message.text && message.text.trim());
    const hasAttachments = Boolean(message.files && message.files.length);
    if (!(hasText || hasAttachments)) return;

    const userText = hasText
      ? (message.text as string)
      : "Sent with attachments";
    // Determine target room id (create if not provided)
    const createdId = roomId ? undefined : currentRoomId;
    const targetId = roomId ?? createdId!;
    const userMsg: UIMessage = {
      id: generateId(),
      role: "user",
      parts: [{ type: "text", text: userText }],
    };
    ignoreNextMessagesEvent.current = true;

    setCurrentRoomId(targetId);
    sendMessage(userMsg, { body: { roomId: targetId } });

    // Ensure room exists and name it with a random title on first submit
    updateRoomMeta(targetId, generateRandomName());
    // Notify SWR listeners to refresh sidebar list immediately
    swrMutate("chat_rooms");
    setInput("");
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
                  <div className="flex flex-wrap justify-center gap-2">
                    <span className="rounded-full border px-3 py-1 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition">
                      Summarize this article
                    </span>
                    <span className="rounded-full border px-3 py-1 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition">
                      Explain a concept like I'm 5
                    </span>
                    <span className="rounded-full border px-3 py-1 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition">
                      Draft an email to my team
                    </span>
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
            {(["submitted", "streaming"] as ChatStatus[]).includes(status) && <Loader />}
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
            />
          </PromptInputBody>
          <PromptInputToolbar>
            <PromptInputTools />
            <PromptInputSubmit
              status={status}
              disabled={status === "streaming"}
            />
          </PromptInputToolbar>
        </PromptInput>
      </div>
    </div>
  );
}
