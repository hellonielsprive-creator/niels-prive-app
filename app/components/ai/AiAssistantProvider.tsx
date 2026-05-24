"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { auth } from "@/app/firebase/config";
import {
  getOrCreateConversation,
  addMessageToConversation,
} from "@/lib/ai/conversations";
import type { AiMessage, AiConversation, AiContext } from "@/types/ai";

type AiAssistantContextValue = {
  isOpen: boolean;
  messages: AiMessage[];
  isLoading: boolean;
  isTyping: boolean;
  sendMessage: (content: string) => Promise<void>;
  toggleChat: () => void;
  closeChat: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
};

const AiAssistantContext = createContext<AiAssistantContextValue | null>(null);

export function useAiAssistant() {
  const context = useContext(AiAssistantContext);
  if (!context) {
    throw new Error(
      "useAiAssistant must be used within AiAssistantProvider"
    );
  }
  return context;
}

export default function AiAssistantProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [conversation, setConversation] = useState<AiConversation | null>(
    null
  );
  const [messages, setMessages] = useState<AiMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const getContext = useCallback((): AiContext => {
    let userRole: "guest" | "partner" | null = null;
    if (auth.currentUser) {
      if (pathname.includes("/partner")) {
        userRole = "partner";
      } else {
        userRole = "guest";
      }
    }

    let dashboardSection: string | undefined;
    if (pathname.includes("/partner/dashboard/analytics")) {
      dashboardSection = "Analytics";
    } else if (pathname.includes("/partner/dashboard/rooms")) {
      dashboardSection = "Rooms Inventory";
    } else if (pathname.includes("/partner/dashboard/reservations")) {
      dashboardSection = "Reservations";
    }

    return {
      pathname,
      userRole,
      dashboardSection,
    };
  }, [pathname]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      const user = auth.currentUser;
      if (!user) {
        return;
      }

      const context = getContext();
      const userRole = context.userRole || "guest";

      const userMessage: AiMessage = {
        id: Date.now().toString(),
        role: "user",
        content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);
      setIsLoading(true);

      try {
        let currentConversation = conversation;
        if (!currentConversation) {
          currentConversation = await getOrCreateConversation(
            user.uid,
            userRole,
            context
          );
          setConversation(currentConversation);
        }

        await addMessageToConversation(currentConversation.id, userMessage);

        console.log("AI: Sending request to /api/ai...");
        const response = await fetch("/api/ai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [...messages, userMessage],
            context,
          }),
        });

        console.log("AI: Received API response, status:", response.status);
        const data = await response.json();
        console.log("AI: API response data:", data);
        if (data.success) {
          const assistantMessage: AiMessage = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: data.message,
            timestamp: new Date(),
          };

          setMessages((prev) => [...prev, assistantMessage]);
          await addMessageToConversation(
            currentConversation.id,
            assistantMessage
          );
        }
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        setIsTyping(false);
        setIsLoading(false);
      }
    },
    [conversation, messages, isLoading, getContext]
  );

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = {
    isOpen,
    messages,
    isLoading,
    isTyping,
    sendMessage,
    toggleChat,
    closeChat,
    messagesEndRef,
  };

  return (
    <AiAssistantContext.Provider value={value}>
      {children}
    </AiAssistantContext.Provider>
  );
}
