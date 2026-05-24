"use client";

import { Sparkles, MessageSquare } from "lucide-react";
import { useAiAssistant } from "./AiAssistantProvider";

export default function AiAssistantButton() {
  const { toggleChat, isOpen } = useAiAssistant();

  return (
    <button
      onClick={toggleChat}
      className={`fixed bottom-6 right-6 z-[99] w-16 h-16 rounded-full shadow-[0_12px_40px_rgba(212,165,116,0.4)] transition-all duration-300 flex items-center justify-center ${
        isOpen
          ? "bg-white/10 border border-white/20"
          : "bg-[#d4a574] hover:bg-[#c3925c] hover:scale-105"
      }`}
    >
      {isOpen ? (
        <MessageSquare size={28} className="text-white" />
      ) : (
        <Sparkles size={28} className="text-black" />
      )}
    </button>
  );
}
