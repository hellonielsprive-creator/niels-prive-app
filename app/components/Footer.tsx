"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, MapPin, Mail, Sparkles } from "lucide-react";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "Hotels", href: "/hotel" },
  { label: "Flights", href: "/flights" },
  { label: "Deals", href: "/deals" },
  { label: "Saved", href: "/saved" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Become a Partner", href: "/partner" },
  { label: "Support", href: "/support" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Cookies Policy", href: "/cookies" },
];

const destinations = ["Goa", "Kerala", "Maldives", "Dubai", "Switzerland", "France", "Jaipur", "Kashmir"];

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: { x: number; y: number; vx: number; vy: number; alpha: number; size: number }[] = 
      Array.from({ length: 60 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.4 + 0.05,
        size: Math.random() * 1.5 + 0.5,
      }));

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(231, 197, 138, ${p.alpha})`;
        ctx.fill();
      });
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(231, 197, 138, ${0.06 * (1 - dist / 80)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      style={{ position: "relative", overflow: "hidden", background: "#030303", color: "white", borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: "5rem" }}
    >
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.6 }} />

      <div style={{ position: "absolute", top: 0, left: "25%", width: 500, height: 400, background: "rgba(231,197,138,0.08)", filter: "blur(180px)", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, right: "25%", width: 400, height: 300, background: "rgba(200,169,107,0.06)", filter: "blur(150px)", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 800, height: 200, background: "rgba(231,197,138,0.04)", filter: "blur(120px)", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(231,197,138,0.4), transparent)" }} />

      <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "6rem 1.5rem 2.5rem" }}>

        <div style={{ overflow: "hidden", marginBottom: "4rem", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "2.5rem" }}>
          <style>{`
            @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
            .marquee-track { display: flex; gap: 2rem; animation: marquee 20s linear infinite; white-space: nowrap; width: max-content; }
            .dest-link { display: flex; align-items: center; gap: 0.5rem; color: rgba(255,255,255,0.2); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.4em; text-decoration: none; transition: color 0.4s; }
            .dest-link:hover { color: #E7C58A; }
            .dest-dot { width: 4px; height: 4px; border-radius: 50%; background: rgba(231,197,138,0.3); transition: background 0.3s; }
            .dest-link:hover .dest-dot { background: #E7C58A; }
            .nav-link { display: flex; align-items: center; gap: 0.5rem; color: rgba(255,255,255,0.35); font-size: 0.875rem; text-decoration: none; transition: color 0.3s; }
            .nav-link:hover { color: white; }
            .nav-link .link-bar { display: block; width: 0; height: 1px; background: rgba(231,197,138,0.6); transition: width 0.3s; }
            .nav-link:hover .link-bar { width: 12px; }
            .back-btn { display: flex; align-items: center; gap: 0.5rem; background: none; border: none; color: rgba(255,255,255,0.3); font-size: 0.625rem; text-transform: uppercase; letter-spacing: 0.35em; cursor: pointer; transition: color 0.3s; }
            .back-btn:hover { color: #E7C58A; }
            .back-icon { width: 24px; height: 24px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; transition: border-color 0.3s; }
            .back-btn:hover .back-icon { border-color: rgba(231,197,138,0.4); }
          `}</style>
          <div className="marquee-track">
            {[...destinations, ...destinations].map((d, i) => (
              <a key={i} href={`/hotel?destination=${d.toLowerCase()}`} className="dest-link">
                <span className="dest-dot" />
                {d}
              </a>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "3rem", marginBottom: "5rem", opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}>

          <div style={{ gridColumn: "span 5" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(231,197,138,0.1)", border: "1px solid rgba(231,197,138,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Sparkles style={{ width: 14, height: 14, color: "#E7C58A" }} />
              </div>
              <h2 style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.03em", margin: 0 }}>
                Niels <span style={{ color: "#E7C58A" }}>Privé</span>
              </h2>
            </div>
            <p style={{ color: "rgba(255,255,255,0.4)", lineHeight: 1.7, fontSize: "0.875rem", marginBottom: "2rem", maxWidth: 280 }}>
              Curated luxury stays, premium flights, and elevated travel experiences crafted for the modern explorer who demands more.
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 1.25rem", borderRadius: 999, border: "1px solid rgba(231,197,138,0.2)", background: "rgba(231,197,138,0.05)", cursor: "pointer" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#E7C58A" }} />
              <span style={{ color: "#E7C58A", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>AI Concierge Available</span>
            </div>
          </div>

          <div style={{ gridColumn: "span 2" }}>
            <h3 style={{ color: "rgba(255,255,255,0.3)", fontWeight: 500, marginBottom: "1.5rem", fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.4em" }}>Explore</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {exploreLinks.map((item) => (
                <a key={item.href} href={item.href} className="nav-link"
                  onMouseEnter={() => setHoveredLink(item.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <span className="link-bar" style={{ width: hoveredLink === item.href ? 12 : 0 }} />
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div style={{ gridColumn: "span 2" }}>
            <h3 style={{ color: "rgba(255,255,255,0.3)", fontWeight: 500, marginBottom: "1.5rem", fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.4em" }}>Company</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {companyLinks.map((item) => (
                <a key={item.href} href={item.href} className="nav-link">
                  <span className="link-bar" />
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div style={{ gridColumn: "span 3" }}>
            <h3 style={{ color: "rgba(255,255,255,0.3)", fontWeight: 500, marginBottom: "1.5rem", fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.4em" }}>Legal</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {legalLinks.map((item) => (
                <a key={item.href} href={item.href} className="nav-link">
                  <span className="link-bar" />
                  {item.label}
                </a>
              ))}
            </div>
            <div style={{ marginTop: "2.5rem" }}>
              <h3 style={{ color: "rgba(255,255,255,0.3)", fontWeight: 500, marginBottom: "1rem", fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.4em" }}>Contact</h3>
              <a href="mailto:nielsprive@nielsprive.com" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.35)", fontSize: "0.75rem", textDecoration: "none", marginBottom: "0.75rem", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#E7C58A")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
              >
                <Mail style={{ width: 12, height: 12, color: "rgba(231,197,138,0.4)" }} />
                nielsprive@nielsprive.com
              </a>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.25)", fontSize: "0.75rem" }}>
                <MapPin style={{ width: 12, height: 12, color: "rgba(231,197,138,0.3)" }} />
                Bangalore, India
              </div>
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)", marginBottom: "2rem" }} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem", margin: 0 }}>©️ 2026 Niels Privé. All rights reserved.</p>
            <span style={{ color: "rgba(255,255,255,0.1)", fontSize: "0.75rem" }}>·</span>
            <p style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.75rem", margin: 0 }}>Crafted with precision</p>
          </div>
          <button className="back-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
            Back to top
            <span className="back-icon">
              <ArrowUp style={{ width: 12, height: 12 }} />
            </span>
          </button>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(231,197,138,0.2), transparent)" }} />
    </footer>
  );
}