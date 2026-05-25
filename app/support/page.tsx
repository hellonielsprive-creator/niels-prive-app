"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { MessageCircle, Mail, Phone, Calendar, HelpCircle, Building2, MapPin, ShieldAlert } from "lucide-react";

const supportCategories = [
  {
    title: "Reservation Support",
    icon: Calendar,
    description: "Modify bookings, check availability, or adjust stay dates."
  },
  {
    title: "Concierge Assistance",
    icon: MessageCircle,
    description: "Luxury travel planning, local recommendations, or special requests."
  },
  {
    title: "Property Questions",
    icon: Building2,
    description: "Details about specific stays, amenities, or on-property experiences."
  },
  {
    title: "Travel Planning",
    icon: MapPin,
    description: "Itinerary help, destination suggestions, or multi-stop planning."
  },
  {
    title: "Technical Assistance",
    icon: HelpCircle,
    description: "Account help, payment questions, or platform troubleshooting."
  }
];

const faqs = [
  {
    question: "How can I modify or cancel my booking?",
    answer: "You can manage your booking directly through your account, or contact our concierge team for personalized assistance with modifications or cancellations."
  },
  {
    question: "What is your concierge service available for?",
    answer: "Our concierge can assist with everything from restaurant reservations and private experiences to travel planning and last-minute adjustments to your stay."
  },
  {
    question: "How quickly will I receive a response?",
    answer: "Our concierge team typically responds within a few hours. For urgent matters, please reach out via WhatsApp for the fastest assistance."
  },
  {
    question: "Can I make special requests for my stay?",
    answer: "Absolutely. Whether it's a special occasion, dietary requirements, or specific amenities, our team will work to make your experience exactly as you'd like."
  },
  {
    question: "How do I partner my property with Niels Privé?",
    answer: "We'd love to hear from you. Please visit our Partner signup page or contact our team to begin the conversation."
  }
];

export default function SupportPage() {
  return (
    <main className="bg-[#f8f8f6] min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative bg-[#050505] pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="uppercase tracking-[0.4em] text-[#E7C58A]/80 text-xs mb-6">
            Niels Privé Support
          </p>
          <h1 className="text-white text-4xl md:text-6xl font-semibold leading-tight mb-6">
            Luxury assistance, whenever you need it.
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Our concierge team is here to ensure every moment of your journey feels calm, curated, and completely taken care of.
          </p>
        </div>
      </section>

      {/* CONCIERGE CONTACT */}
      <section className="max-w-5xl mx-auto px-6 -mt-12 relative z-20">
        <div className="bg-white rounded-[36px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-black/5 p-8 md:p-12">
          <p className="uppercase tracking-[0.3em] text-[#C8A96B] text-xs mb-4">
            Direct Concierge Access
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#1a1a1a] mb-8">
            Reach our team directly.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="https://wa.me/917204157984"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-4 p-6 rounded-[24px] bg-[#25D366]/5 border border-[#25D366]/10 hover:bg-[#25D366]/10 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center">
                <MessageCircle className="text-white" size={24} />
              </div>
              <div className="text-center">
                <p className="text-[#5c5c5c] text-sm mb-1">WhatsApp Concierge</p>
                <p className="text-[#1a1a1a] font-semibold">7204157984</p>
              </div>
            </a>

            <a
              href="mailto:concierge@nielsprive.com"
              className="flex flex-col items-center justify-center gap-4 p-6 rounded-[24px] bg-black/[0.02] border border-black/5 hover:bg-black/[0.04] transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center">
                <Mail className="text-white" size={24} />
              </div>
              <div className="text-center">
                <p className="text-[#5c5c5c] text-sm mb-1">Email Support</p>
                <p className="text-[#1a1a1a] font-semibold">concierge@nielsprive.com</p>
              </div>
            </a>

            <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-[24px] bg-[#E7C58A]/10 border border-[#E7C58A]/20">
              <div className="w-14 h-14 rounded-full bg-[#E7C58A] flex items-center justify-center">
                <Phone className="text-black" size={24} />
              </div>
              <div className="text-center">
                <p className="text-[#5c5c5c] text-sm mb-1">Response Expectation</p>
                <p className="text-[#1a1a1a] font-semibold">Within a few hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUPPORT CATEGORIES */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="uppercase tracking-[0.3em] text-[#C8A96B] text-xs mb-4">
            How we can help
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold text-[#1a1a1a]">
            Choose the support you need.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-[28px] border border-black/5 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-[#E7C58A]/20 flex items-center justify-center mb-6">
                <category.icon className="text-[#C8A96B]" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-[#1a1a1a] mb-3">
                {category.title}
              </h3>
              <p className="text-[#5c5c5c] leading-relaxed">
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-white border-t border-black/5">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[0.3em] text-[#C8A96B] text-xs mb-4">
              Frequently Asked
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold text-[#1a1a1a]">
              Questions, answered calmly.
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-black/5 pb-8 last:border-b-0"
              >
                <h3 className="text-xl font-semibold text-[#1a1a1a] mb-4">
                  {faq.question}
                </h3>
                <p className="text-[#5c5c5c] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMERGENCY HELP */}
      <section className="bg-[#050505]">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="flex items-center justify-center mb-6">
            <ShieldAlert className="text-[#E7C58A]" size={32} />
          </div>
          <h2 className="text-white text-3xl md:text-4xl font-semibold mb-6">
            For urgent matters during your stay.
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            If you need immediate assistance while traveling, please reach out to our concierge team via WhatsApp for the fastest response. We're here to help, whenever you need us.
          </p>
          <a
            href="https://wa.me/917204157984"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-black px-8 py-4 rounded-full font-semibold transition-all duration-300"
          >
            <MessageCircle size={20} />
            Message Concierge Now
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
