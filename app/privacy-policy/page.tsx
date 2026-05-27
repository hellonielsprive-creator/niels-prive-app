"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useEffect, useRef, useState } from "react";
import { Shield, Eye, Cookie, Lock, MessageCircle, ChevronRight } from "lucide-react";

type Section = {
  id: string;
  icon: React.ElementType;
  title: string;
  content: string | null;
};

const sections: Section[] = [
  {
    id: "commitment",
    icon: Shield,
    title: "Our Commitment to Your Privacy",
    content:
      "Niels Privé is built on trust. We believe your personal data should be treated with the same care and attention as every part of your luxury travel experience. We do not sell your data, we do not use invasive advertising trackers, and we only collect the information necessary to deliver exceptional hospitality.",
  },
  {
    id: "collect",
    icon: Eye,
    title: "What We Collect",
    content:
      "We collect only essential information to facilitate your stays, communicate with you, and maintain secure sessions. This may include basic account information, reservation details, and contact preferences you explicitly provide.",
  },
  {
    id: "cookies",
    icon: Cookie,
    title: "Essential Cookies",
    content:
      "Niels Privé uses only essential cookies to maintain secure sessions, remember your preferences, and ensure your hospitality experience functions smoothly. We do not use cookies for invasive tracking or advertising.",
  },
  {
    id: "guest",
    icon: Lock,
    title: "Guest Privacy",
    content:
      "Your reservation details and personal information are treated as confidential. We share only what is necessary with our partner properties to facilitate your stay, and nothing more.",
  },
  {
    id: "questions",
    icon: MessageCircle,
    title: "Questions",
    content: null,
  },
];

function SectionCard({
  section,
  index,
  isActive,
  onClick,
}: {
  section: Section;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = section.icon;
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onClick={onClick}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
        cursor: "pointer",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 16,
          border: isActive ? "1px solid rgba(231,197,138,0.25)" : "1px solid rgba(255,255,255,0.07)",
          background: isActive ? "rgba(231,197,138,0.05)" : "rgba(255,255,255,0.025)",
          padding: "2rem",
          transition: "all 0.5s ease",
        }}
      >
        {isActive && (
          <div style={{ position: "absolute", top: 0, right: 0, width: 192, height: 192, background: "rgba(231,197,138,0.08)", filter: "blur(80px)", borderRadius: "50%", pointerEvents: "none" }} />
        )}

        <div style={{ display: "flex", alignItems: "flex-start", gap: "1.25rem", position: "relative" }}>
          <div
            style={{
              flexShrink: 0,
              width: 40,
              height: 40,
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: isActive ? "1px solid rgba(231,197,138,0.3)" : "1px solid rgba(255,255,255,0.1)",
              background: isActive ? "rgba(231,197,138,0.15)" : "rgba(255,255,255,0.05)",
              transition: "all 0.3s ease",
            }}
          >
            <Icon style={{ width: 16, height: 16, color: isActive ? "#E7C58A" : "rgba(255,255,255,0.4)" }} />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 600, letterSpacing: "-0.02em", color: isActive ? "white" : "rgba(255,255,255,0.7)", margin: 0 }}>
                {section.title}
              </h2>
              <ChevronRight style={{ width: 16, height: 16, color: isActive ? "#E7C58A" : "rgba(255,255,255,0.2)", transform: isActive ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.3s ease", flexShrink: 0 }} />
            </div>

            {section.id !== "questions" ? (
              <p style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.7, fontSize: "0.875rem", margin: 0 }}>
                {section.content}
              </p>
            ) : (
              <p style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.7, fontSize: "0.875rem", margin: 0 }}>
                If you have any questions about your privacy or how we handle your data, please do not hesitate to reach out to our concierge team at{" "}
                <a
                  href="mailto:nielsprive@nielsprive.com"
                  style={{ color: "#E7C58A", textDecoration: "underline", textUnderlineOffset: 4 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  nielsprive@nielsprive.com
                </a>
                .
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setScrollProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main style={{ background: "#080807", minHeight: "100vh" }}>
      <div
        style={{
          position: "fixed", top: 0, left: 0, height: 2,
          background: "linear-gradient(to right, rgba(231,197,138,0.8), #C8A96B)",
          zIndex: 50, transition: "width 0.1s",
          width: `${scrollProgress}%`,
        }}
      />

      <Navbar />

      <section style={{ position: "relative", paddingTop: "10rem", paddingBottom: "5rem", paddingLeft: "1.5rem", paddingRight: "1.5rem", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 80, left: "50%", transform: "translateX(-50%)", width: 600, height: 400, background: "rgba(231,197,138,0.06)", filter: "blur(160px)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(231,197,138,0.2), transparent)" }} />
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.03,
          backgroundImage: "linear-gradient(rgba(231,197,138,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(231,197,138,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        <div style={{ position: "relative", maxWidth: 896, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
            <div style={{ height: 1, width: 32, background: "rgba(231,197,138,0.5)" }} />
            <p style={{ textTransform: "uppercase", letterSpacing: "0.5em", color: "rgba(231,197,138,0.7)", fontSize: "0.625rem", fontWeight: 500, margin: 0 }}>Legal</p>
          </div>

          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 600, color: "white", letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: "1.5rem" }}>
            Privacy{" "}
            <span style={{ background: "linear-gradient(to right, #E7C58A, #C8A96B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Policy
            </span>
          </h1>

          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "1.125rem", maxWidth: 480, lineHeight: 1.7, margin: 0 }}>
            Your privacy is the foundation of your trust in us. Read how Niels Privé protects and respects your personal data.
          </p>

          <div style={{ marginTop: "2.5rem", display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", borderRadius: 999, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", letterSpacing: "0.05em" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(231,197,138,0.6)" }} />
            Last updated: January 2026
          </div>
        </div>
      </section>

      <section style={{ paddingLeft: "1.5rem", paddingRight: "1.5rem", paddingBottom: "8rem" }}>
        <div style={{ maxWidth: 896, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "4rem" }}>
            {["No data selling", "No ad trackers", "Essential cookies only", "Confidential stays"].map((chip) => (
              <div key={chip} style={{ padding: "0.5rem 1rem", borderRadius: 999, background: "rgba(231,197,138,0.08)", border: "1px solid rgba(231,197,138,0.15)", color: "rgba(231,197,138,0.7)", fontSize: "0.75rem", letterSpacing: "0.05em" }}>
                ✦ {chip}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {sections.map((section, i) => (
              <SectionCard
                key={section.id}
                section={section}
                index={i}
                isActive={activeSection === section.id}
                onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
              />
            ))}
          </div>

          <div style={{ marginTop: "4rem", position: "relative", overflow: "hidden", borderRadius: 16, border: "1px solid rgba(231,197,138,0.2)", background: "rgba(231,197,138,0.05)", padding: "2.5rem", textAlign: "center" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(231,197,138,0.05), transparent)", pointerEvents: "none" }} />
            <div style={{ position: "relative" }}>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.3em" }}>Need help?</p>
              <h3 style={{ color: "white", fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "1rem" }}>Speak to our Concierge</h3>
              <a
                href="mailto:nielsprive@nielsprive.com"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", borderRadius: 999, background: "#E7C58A", color: "#0a0a0a", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none", transition: "background 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#d4b07a")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#E7C58A")}
              >
                nielsprive@nielsprive.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}