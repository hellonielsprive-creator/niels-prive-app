"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleBackToTop();
    }
  };

  return (
    <button
      aria-label="Back to top of page"
      onClick={handleBackToTop}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className={`
        fixed z-[100]
        w-14 h-14
        rounded-full
        bg-gradient-to-br from-[#d4a574] to-[#b88c4e]
        shadow-[0_10px_30px_rgba(212,165,116,0.4)]
        flex items-center justify-center
        transition-all duration-300 ease-in-out
        hover:scale-[1.08]
        active:scale-[0.95]
        focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-black
        
        ${isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-10 pointer-events-none"
        }
        
        bottom-28 right-6
        md:bottom-6 md:right-6
        md:w-16 md:h-16
        
        lg:bottom-8 lg:right-8
      `}
    >
      <ArrowUp className="w-6 h-6 md:w-7 md:h-7 text-black" />
    </button>
  );
}
