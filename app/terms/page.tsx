"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function TermsPage() {
  return (
    <main className="bg-[#f8f8f6] min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="uppercase tracking-[0.4em] text-[#C8A96B] text-xs mb-6">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-[#1a1a1a] mb-10">
            Terms & Conditions
          </h1>

          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-5">
                Our Agreement
              </h2>
              <p className="text-[#5c5c5c] leading-relaxed text-lg">
                Welcome to Niels Privé. By using our platform, you agree to these terms, designed to be clear, fair, and focused on delivering exceptional hospitality experiences.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-5">
                Reservations
              </h2>
              <p className="text-[#5c5c5c] leading-relaxed text-lg">
                When you make a reservation through Niels Privé, our concierge team reviews and confirms each booking to ensure everything is prepared for your arrival. We work closely with our partner properties to deliver the experience you expect.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-5">
                Payments
              </h2>
              <p className="text-[#5c5c5c] leading-relaxed text-lg">
                Payments are processed securely. The exact payment terms for your stay — including deposit requirements and final payment timing — are confirmed during your reservation process.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-5">
                Cancellations
              </h2>
              <p className="text-[#5c5c5c] leading-relaxed text-lg">
                Cancellation policies vary by property. Your specific cancellation terms are clearly outlined during booking. Our concierge team is available to assist with changes or questions about your reservation.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-5">
                Partner Responsibilities
              </h2>
              <p className="text-[#5c5c5c] leading-relaxed text-lg">
                Our partners agree to deliver the experiences listed on Niels Privé, maintain their properties to high standards, and treat every guest with the same care and attention we would expect ourselves.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
