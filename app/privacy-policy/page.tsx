"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-[#f8f8f6] min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="uppercase tracking-[0.4em] text-[#C8A96B] text-xs mb-6">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-[#1a1a1a] mb-10">
            Privacy Policy
          </h1>

          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-5">
                Our Commitment to Your Privacy
              </h2>
              <p className="text-[#5c5c5c] leading-relaxed text-lg">
                Niels Privé is built on trust. We believe your personal data should be treated with the same care and attention as every part of your luxury travel experience. We do not sell your data, we do not use invasive advertising trackers, and we only collect the information necessary to deliver exceptional hospitality.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-5">
                What We Collect
              </h2>
              <p className="text-[#5c5c5c] leading-relaxed text-lg">
                We collect only essential information to facilitate your stays, communicate with you, and maintain secure sessions. This may include basic account information, reservation details, and contact preferences you explicitly provide.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-5">
                Essential Cookies
              </h2>
              <p className="text-[#5c5c5c] leading-relaxed text-lg">
                Niels Privé uses only essential cookies to maintain secure sessions, remember your preferences, and ensure your hospitality experience functions smoothly. We do not use cookies for invasive tracking or advertising.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-5">
                Guest Privacy
              </h2>
              <p className="text-[#5c5c5c] leading-relaxed text-lg">
                Your reservation details and personal information are treated as confidential. We share only what's necessary with our partner properties to facilitate your stay, and nothing more.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-5">
                Questions
              </h2>
              <p className="text-[#5c5c5c] leading-relaxed text-lg">
                If you have any questions about your privacy or how we handle your data, please don't hesitate to reach out to our concierge team at hello.nielsprive@gmail.com.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
