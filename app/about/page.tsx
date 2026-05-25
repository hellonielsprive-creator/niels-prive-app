"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Sparkles, MapPin, Plane, MessageCircle, Heart, Building2 } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="bg-[#f8f8f6] min-h-screen">
      <Navbar />

      {/* CINEMATIC INTRO */}
      <section className="relative bg-[#050505] pt-32 pb-32 px-6 overflow-hidden">
        <div className="absolute top-[-30%] left-[-10%] w-[70%] h-[70%] rounded-full bg-[#E7C58A]/10 blur-[120px] animate-[pulse_10s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-[-30%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#C8A96B]/8 blur-[100px] animate-[pulse_14s_ease-in-out_infinite_reverse]"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <p className="uppercase tracking-[0.4em] text-[#E7C58A]/80 text-xs mb-6">
            The Story Behind
          </p>
          <h1 className="text-white text-5xl md:text-7xl font-semibold leading-tight mb-8">
            Niels Privé was created to make luxury hospitality feel more human.
          </h1>
          <p className="text-white/70 text-xl max-w-3xl mx-auto leading-relaxed">
            Immersive, emotionally intelligent, and designed for the modern explorer.
          </p>
        </div>
      </section>

      {/* FOUNDER STORY */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="uppercase tracking-[0.4em] text-[#C8A96B] text-xs mb-4">
              Founder
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold text-[#1a1a1a] mb-6">
              Aron Neal
            </h2>
            <p className="text-[#5c5c5c] text-lg leading-relaxed mb-6">
              I created Niels Privé because I believed luxury hospitality could feel more connected, more cinematic, and more human. Too often, luxury travel feels distant or transactional — I wanted to build something that felt the opposite.
            </p>
            <p className="text-[#5c5c5c] text-lg leading-relaxed mb-6">
              This platform is about bringing emotional intelligence to travel. About making every stay feel memorable, every interaction feel calm, and every guest feel like they're part of something special.
            </p>
            <p className="text-[#5c5c5c] text-lg leading-relaxed">
              This is just the beginning. We're building an AI‑native hospitality ecosystem — where stays, concierge, flights, and experiences all feel part of one seamless, premium journey.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full rounded-[36px] border-2 border-[#E7C58A]/30"></div>
            <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#050505] rounded-[32px] h-[500px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-[#E7C58A] flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="text-black" size={40} />
                </div>
                <p className="text-white/70 text-lg">Founder's Vision</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISION SECTION */}
      <section className="bg-[#050505] py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[0.4em] text-[#E7C58A]/80 text-xs mb-4">
              The Vision
            </p>
            <h2 className="text-white text-4xl md:text-5xl font-semibold">
              The future of hospitality is emotionally intelligent.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-[28px] p-8">
              <div className="w-12 h-12 rounded-full bg-[#E7C58A]/20 flex items-center justify-center mb-6">
                <Heart className="text-[#E7C58A]" size={24} />
              </div>
              <h3 className="text-white text-2xl font-semibold mb-4">
                Human‑Centered Luxury
              </h3>
              <p className="text-white/70 leading-relaxed">
                We believe luxury should feel warm, not intimidating. Designed for real people, real journeys, and real memories.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[28px] p-8">
              <div className="w-12 h-12 rounded-full bg-[#E7C58A]/20 flex items-center justify-center mb-6">
                <Sparkles className="text-[#E7C58A]" size={24} />
              </div>
              <h3 className="text-white text-2xl font-semibold mb-4">
                AI‑Native Hospitality
              </h3>
              <p className="text-white/70 leading-relaxed">
                Intelligence that enhances humanity. Concierge that feels calm, premium, and deeply connected to your journey.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[28px] p-8">
              <div className="w-12 h-12 rounded-full bg-[#E7C58A]/20 flex items-center justify-center mb-6">
                <MapPin className="text-[#E7C58A]" size={24} />
              </div>
              <h3 className="text-white text-2xl font-semibold mb-4">
                Cinematic Journeys
              </h3>
              <p className="text-white/70 leading-relaxed">
                Every part of the experience designed with intention. From discovery to departure, everything should feel memorable.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[28px] p-8">
              <div className="w-12 h-12 rounded-full bg-[#E7C58A]/20 flex items-center justify-center mb-6">
                <Building2 className="text-[#E7C58A]" size={24} />
              </div>
              <h3 className="text-white text-2xl font-semibold mb-4">
                Global Ecosystem
              </h3>
              <p className="text-white/70 leading-relaxed">
                A single platform for stays, flights, experiences, and concierge — all part of one cohesive luxury travel ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FUTURE ECOSYSTEM */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="uppercase tracking-[0.4em] text-[#C8A96B] text-xs mb-4">
            What's Next
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold text-[#1a1a1a]">
            Building the complete luxury travel ecosystem.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Building2, title: "Premium Stays", desc: "Curated luxury properties, carefully selected for exceptional experiences." },
            { icon: MessageCircle, title: "AI Concierge", desc: "Calm, intelligent assistance for every part of your journey." },
            { icon: Plane, title: "Flights", desc: "Seamless air travel integrated with your stay experience." },
            { icon: Heart, title: "Experiences", desc: "Memorable, local experiences designed for premium travelers." },
            { icon: MapPin, title: "Discovery", desc: "Smart, intuitive ways to find your next perfect escape." },
            { icon: Sparkles, title: "Memberships", desc: "Elite access, elevated benefits, and special privileges." }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[28px] border border-black/5 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-[#E7C58A]/20 flex items-center justify-center mb-6">
                <item.icon className="text-[#C8A96B]" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-[#1a1a1a] mb-3">
                {item.title}
              </h3>
              <p className="text-[#5c5c5c] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* EMOTIONAL CLOSING */}
      <section className="bg-gradient-to-br from-[#1a1a1a] to-[#050505] py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="uppercase tracking-[0.4em] text-[#E7C58A]/80 text-xs mb-6">
            The Journey Continues
          </p>
          <h2 className="text-white text-4xl md:text-6xl font-semibold leading-tight mb-8">
            This is just the beginning.
          </h2>
          <p className="text-white/70 text-xl max-w-2xl mx-auto leading-relaxed">
            We're building something special. A platform that reimagines what luxury hospitality can feel like — more human, more cinematic, more emotionally intelligent. Thank you for being part of this journey.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
