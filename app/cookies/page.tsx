"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function CookiesPage() {
  return (
    <main className="bg-[#f8f8f6] min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="uppercase tracking-[0.4em] text-[#C8A96B] text-xs mb-6">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-[#1a1a1a] mb-10">
            Cookies Policy
          </h1>

          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-5">
                Our Approach to Cookies
              </h2>
              <p className="text-[#5c5c5c] leading-relaxed text-lg">
                Niels Privé uses cookies thoughtfully — only what's essential to deliver a smooth, secure hospitality experience. No invasive tracking, no advertising cookies, just the basics to make your time on our platform feel effortless.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-5">
                What We Use
              </h2>
              <p className="text-[#5c5c5c] leading-relaxed text-lg">
                We use only essential cookies: session cookies to keep you signed in securely, and preference cookies to remember basic settings that enhance your experience. That's it.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-5">
                No Invasive Tracking
              </h2>
              <p className="text-[#5c5c5c] leading-relaxed text-lg">
                We do not use third-party advertising trackers, we do not build extensive profiles of your browsing behavior, and we do not sell your data to anyone. Your privacy is as important to us as your experience.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-5">
                Managing Cookies
              </h2>
              <p className="text-[#5c5c5c] leading-relaxed text-lg">
                You can always manage cookie settings through your browser. Note that disabling essential cookies may impact the functionality of our platform, like maintaining secure sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
