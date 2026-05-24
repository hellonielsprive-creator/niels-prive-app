"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles, Loader2 } from "lucide-react";
import { useAiAssistant } from "./AiAssistantProvider";
import type { AiMessage } from "@/types/ai";

export default function AiChatPanel() {
  const {
    isOpen,
    messages,
    isTyping,
    sendMessage,
    closeChat,
    messagesEndRef,
  } = useAiAssistant();
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 md:bottom-24 md:right-6 md:left-auto z-[100] w-full md:w-[420px] max-h-[85vh] md:max-h-[70vh] flex flex-col rounded-t-[32px] md:rounded-[32px] border overflow-hidden shadow-[0_-20px_80px_rgba(0,0,0,0.45)] md:shadow-[0_30px_80px_rgba(0,0,0,0.35)] bg-[#050505] text-white transition-all duration-300 ease-out">
      {/* HEADER */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-[#d4a574]/10 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#d4a574]/20 flex items-center justify-center">
            <Sparkles size={20} className="text-[#d4a574]" />
          </div>
          <div>
            <h3 className="font-semibold">Niels Privé Concierge</h3>
            <p className="text-xs text-white/50">Luxury hospitality assistant</p>
          </div>
        </div>
        <button
          onClick={closeChat}
          className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-all"
        >
          <X size={20} />
        </button>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-10 text-white/50">
            <Sparkles className="mx-auto mb-4 opacity-50" size={32} />
            <p className="text-sm">How can I assist you today?</p>
          </div>
        )}

        {messages.map((message: AiMessage) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-[24px] px-5 py-4 ${
                message.role === "user"
                  ? "bg-[#d4a574] text-black"
                  : "bg-white/[0.06] border border-white/10"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-[24px] px-5 py-4 bg-white/[0.06] border border-white/10 flex items-center gap-2">
              <Loader2 size={16} className="text-[#d4a574] animate-spin" />
              <span className="text-sm text-white/60">Typing...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div className="p-4 border-t border-white/10">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about bookings, properties, or support..."
            className="flex-1 bg-white/[0.04] border border-white/10 rounded-[20px] px-4 py-3 outline-none resize-none max-h-32 text-sm"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="w-12 h-12 rounded-full bg-[#d4a574] hover:bg-[#c3925c] disabled:opacity-50 disabled:hover:bg-[#d4a574] transition-all flex items-center justify-center flex-shrink-0"
          >
            <Send size={18} className="text-black" />
          </button>
        </form>
      </div>
    </div>
  );
}
