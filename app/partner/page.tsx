"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { syncUserToFirestore } from "@/lib/firestore/users";

export default function PartnerPage() {
  const router = useRouter();
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("Partner page mounted, setting up auth listener");
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state updated, user:", currentUser ? currentUser.uid : "no user");
      setUser(currentUser);
      setLoading(false);
    });
    
    const timeout = setTimeout(() => {
      console.log("Fallback timeout triggered");
      setLoading(false);
    }, 3000);
    
    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const handleRoleBasedRedirect = async (user: any) => {
    try {
      await syncUserToFirestore(user);
    } catch (error) {
      console.error("Error in role redirect:", error);
    }
  };

  const handleAuthLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, authEmail, authPassword);
      await handleRoleBasedRedirect(userCredential.user);
    } catch (err: any) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleAuthGoogle = async () => {
    setAuthLoading(true);
    setAuthError("");
    
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      await handleRoleBasedRedirect(userCredential.user);
    } catch (err: any) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculateParallax = (factor: number) => {
    const moveX = (mousePos.x - 0.5) * factor;
    const moveY = (mousePos.y - 0.5) * factor;
    return { x: moveX, y: moveY };
  };

  const textParallax = calculateParallax(8);
  const glowParallax = calculateParallax(24);
  const ambientParallax = calculateParallax(6);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070709] flex items-center justify-center">
        <p className="text-white/50 text-lg">Checking access...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#070709] text-white overflow-x-hidden flex items-center justify-center px-6">
        <div className="w-full max-w-xl">
          <div className="space-y-10">
            <div className="text-center space-y-4">
              <p className="text-[#d6b96f]/70 tracking-[0.55em] text-[10px] uppercase">
                NIELS PRIVÉ
              </p>
              <h1 className="text-4xl md:text-5xl font-semibold leading-[1.05]">
                Sign in to continue your partnership application
              </h1>
              <p className="text-white/40 text-lg">
                Begin your exclusive hospitality journey with us
              </p>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8 backdrop-blur-sm">
              <form onSubmit={handleAuthLogin} className="space-y-5">
                <div>
                  <label className="text-sm text-white/60 mb-3 block">
                    Email Address
                  </label>
                  <div className="flex items-center gap-4 bg-white/[0.04] border border-white/10 rounded-2xl px-5 h-16">
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      className="bg-transparent outline-none w-full text-white placeholder:text-neutral-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-white/60 mb-3 block">
                    Password
                  </label>
                  <div className="flex items-center gap-4 bg-white/[0.04] border border-white/10 rounded-2xl px-5 h-16">
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      className="bg-transparent outline-none w-full text-white placeholder:text-neutral-500"
                      required
                    />
                  </div>
                </div>

                {authError && (
                  <p className="text-red-400 text-sm">{authError}</p>
                )}

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full h-16 rounded-2xl bg-[#d6b96f] hover:bg-[#c5a85e] transition-all text-black font-semibold flex items-center justify-center"
                >
                  {authLoading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleAuthGoogle}
                  disabled={authLoading}
                  className="w-full border border-white/20 py-4 rounded-2xl font-medium hover:bg-white/[0.04] transition-all text-white"
                >
                  Continue with Google
                </button>
              </div>

              <div className="mt-8 text-center space-y-4">
                <p className="text-white/40">
                  Don’t have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-[#d6b96f] hover:text-[#e5d29e] transition-all"
                  >
                    Create Account
                  </Link>
                </p>
                <Link
                  href="/"
                  className="text-white/30 hover:text-white/50 transition-all text-sm"
                >
                  Return to home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070709] text-white overflow-x-hidden">
      {/* CINEMATIC HERO LAYERING */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        {/* DEEP BASE LAYER */}
        <div className="absolute inset-0 bg-[#070709]" />
        
        {/* ATMOSPHERIC GRADIENT LAYERS */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#111115] via-[#070709] to-[#040405]"
          style={{
            transform: `translate(${ambientParallax.x * 0.4}px, ${ambientParallax.y * 0.4}px)`,
            transition: "transform 0.25s ease-out",
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${25 + glowParallax.x * 0.08}% ${30 + glowParallax.y * 0.08}%,rgba(214,185,111,0.20),transparent_65%)`,
            transition: "background 0.35s ease-out",
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${70 + glowParallax.x * 0.06}% ${65 + glowParallax.y * 0.06}%,rgba(255,255,255,0.09),transparent_60%)`,
            transition: "background 0.35s ease-out",
          }}
        />
        
        {/* CINEMATIC NOISE OVERLAY */}
        <div className="absolute inset-0 opacity-[0.025]" 
             style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\"0 0 200 200\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cfilter id=\\"noiseFilter\\"%3E%3CfeTurbulence type=\\"fractalNoise\\" baseFrequency=\\"0.9\\" numOctaves=\\"3\\" stitchTiles=\\"stitch\\"/%3E%3C/filter%3E%3Crect width=\\"100%25\\" height=\\"100%25\\" filter=\\"url(%23noiseFilter)\\"/%3E%3C/svg%3E")' }} />

        {/* ARCHITECTURAL FRAMING */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 border-[32px] border-white/[0.018]" />
        </div>

        {/* SPLIT CINEMATIC COMPOSITION */}
        <div className="relative z-10 min-h-screen flex items-center max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
            
            {/* LEFT SIDE — IMMERSIVE STORY */}
            <div className="space-y-10" style={{ transform: `translate(${textParallax.x}px, ${textParallax.y}px)`, transition: "transform 0.3s ease-out" }}>
              {/* TOP LABEL */}
              <div>
                <p className="text-[#d6b96f]/70 tracking-[0.55em] text-[10px] uppercase mb-3">
                  Niels Privé
                </p>
                <p className="text-white/25 tracking-[0.3em] text-xs uppercase">
                  Curated Hospitality
                </p>
              </div>

              {/* HERO HEADLINE */}
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-[-0.04em]">
                  We curate the stays
                </h2>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-[-0.04em]">
                  that stay with you.
                </h2>
              </div>

              {/* SUBTEXT */}
              <div className="max-w-xl">
                <p className="text-white/40 text-lg leading-relaxed">
                  An invitation‑only platform for properties that exist beyond accommodation — 
                  where every stay feels like a chapter in a larger story.
                </p>
              </div>
            </div>

            {/* RIGHT SIDE — ELEGANT INTERFACE */}
            <div 
              className="space-y-8" 
              style={{ transform: `translate(${-textParallax.x * 0.5}px, ${-textParallax.y * 0.5}px)`, transition: "transform 0.3s ease-out" }}
            >
              {/* CTA CARD */}
              <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8 backdrop-blur-sm">
                <div className="space-y-6">
                  <div>
                    <p className="text-white/60 text-sm mb-1">For</p>
                    <p className="text-white font-medium text-lg">Founders, operators, and storytellers</p>
                  </div>

                  <div className="w-full h-px bg-white/10" />

                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => router.push("/partner/signup")}
                      className="group relative overflow-hidden bg-[#d6b96f] text-black px-8 py-4 rounded-full font-medium transition-all duration-500 hover:scale-[1.015]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#d6b96f] via-[#e5d29e] to-[#d6b96f] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <span className="relative z-10">Request an invitation</span>
                    </button>

                    <button
                      onClick={() => router.push("/partner/dashboard")}
                      className="px-7 py-4 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/25 transition-all duration-500 text-sm"
                    >
                      Explore the operation
                    </button>
                  </div>
                </div>
              </div>

              {/* SUBTLE DETAIL CARDS */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/[0.02] border border-white/8 rounded-[24px] p-6">
                  <p className="text-[#d6b96f]/60 text-xs tracking-[0.35em] uppercase mb-2">
                    Curated
                  </p>
                  <p className="text-white/40 text-sm">
                    By invitation only
                  </p>
                </div>
                <div className="bg-white/[0.02] border border-white/8 rounded-[24px] p-6">
                  <p className="text-[#d6b96f]/60 text-xs tracking-[0.35em] uppercase mb-2">
                    Operational
                  </p>
                  <p className="text-white/40 text-sm">
                    Built for operators
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CINEMATIC BOTTOM LINE */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      </section>

      {/* SUBTLE SECONDARY SECTION */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-24">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="border-l border-white/10 pl-8">
            <p className="text-[#d6b96f]/60 text-xs tracking-[0.35em] uppercase mb-4">
              Curated
            </p>
            <h3 className="text-xl font-semibold mb-3 text-white">
              Integrity over scale
            </h3>
            <p className="text-white/40 leading-relaxed">
              We preserve the character of each property through careful curation, not rapid expansion.
            </p>
          </div>

          <div className="border-l border-white/10 pl-8">
            <p className="text-[#d6b96f]/60 text-xs tracking-[0.35em] uppercase mb-4">
              Operational
            </p>
            <h3 className="text-xl font-semibold mb-3 text-white">
              Designed from the ground up
            </h3>
            <p className="text-white/40 leading-relaxed">
              Built by hospitality operators, for hospitality operators — with precision and care.
            </p>
          </div>

          <div className="border-l border-white/10 pl-8">
            <p className="text-[#d6b96f]/60 text-xs tracking-[0.35em] uppercase mb-4">
              Cinematic
            </p>
            <h3 className="text-xl font-semibold mb-3 text-white">
              Stories, not listings
            </h3>
            <p className="text-white/40 leading-relaxed">
              Every property is presented with visual and emotional depth — as an experience, not a commodity.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
