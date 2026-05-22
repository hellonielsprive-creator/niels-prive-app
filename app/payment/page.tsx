"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  auth,
} from "../firebase/config";

import {
  Moon,
  Sun,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export default function PaymentPage() {

  const router = useRouter();

  const [darkMode, setDarkMode] =
    useState(true);

  useEffect(() => {

    if (!auth.currentUser) {

      router.push("/signin");

    }

  }, []);

  return (

    <main
      className={`min-h-screen transition-all duration-500 ${
        darkMode
          ? "bg-[#0b0b0b] text-white"
          : "bg-[#f6f2eb] text-black"
      }`}
    >

      {/* PAGE */}
      <section className="max-w-2xl mx-auto px-4 py-6 md:py-12">

        {/* TOP */}
        <div className="flex items-start justify-between mb-8">

          <div>

            <p
              className={`uppercase tracking-[0.3em] text-[10px] mb-3 ${
                darkMode
                  ? "text-[#d4a574]"
                  : "text-[#8a6a3e]"
              }`}
            >
              Niels Privé
            </p>

            <h1 className="text-3xl md:text-5xl font-semibold leading-tight mb-4">
              Reservation Secured
            </h1>

            <p
              className={`text-sm md:text-base leading-7 max-w-lg ${
                darkMode
                  ? "text-white/50"
                  : "text-black/55"
              }`}
            >
              Your stay at The Royal Atlantis,
              Dubai has been temporarily reserved
              for the next 24 hours.
            </p>

          </div>

          {/* TOGGLE */}
          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              darkMode
                ? "bg-white/5 border border-white/10"
                : "bg-white border border-black/10"
            }`}
          >

            {darkMode ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}

          </button>

        </div>

        {/* MAIN CARD */}
        <div
          className={`rounded-[34px] overflow-hidden border transition-all ${
            darkMode
              ? "bg-white/[0.03] border-white/10"
              : "bg-white border-black/10"
          }`}
        >

          {/* IMAGE */}
          <div className="relative h-[220px] overflow-hidden">

            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop"
              alt="Luxury Hotel"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <div className="absolute bottom-0 left-0 p-6">

              <p className="text-white/60 uppercase tracking-[0.25em] text-[10px] mb-2">
                Dubai, UAE
              </p>

              <h2 className="text-white text-3xl font-semibold">
                The Royal Atlantis
              </h2>

            </div>

          </div>

          {/* CONTENT */}
          <div className="p-5 md:p-7">

            {/* SUMMARY */}
            <div className="mb-8">

              <div className="flex items-center justify-between mb-5">

                <p
                  className={
                    darkMode
                      ? "text-white/45"
                      : "text-black/45"
                  }
                >
                  Reservation Status
                </p>

                <p className="text-[#d4a574]">
                  Awaiting Payment
                </p>

              </div>

              <div className="flex items-center justify-between mb-5">

                <p
                  className={
                    darkMode
                      ? "text-white/45"
                      : "text-black/45"
                  }
                >
                  Advance Payment
                </p>

                <p className="text-xl font-semibold">
                  ₹240
                </p>

              </div>

              <div className="flex items-center justify-between mb-5">

                <p
                  className={
                    darkMode
                      ? "text-white/45"
                      : "text-black/45"
                  }
                >
                  Remaining At Property
                </p>

                <p className="text-xl font-semibold">
                  ₹960
                </p>

              </div>

              <div
                className={`border-t pt-5 flex items-center justify-between ${
                  darkMode
                    ? "border-white/10"
                    : "border-black/10"
                }`}
              >

                <p
                  className={
                    darkMode
                      ? "text-white/45"
                      : "text-black/45"
                  }
                >
                  Total Reservation
                </p>

                <p className="text-2xl font-semibold">
                  ₹1200
                </p>

              </div>

            </div>

            {/* QR */}
            <div
              className={`rounded-[28px] border border-dashed p-6 text-center mb-6 ${
                darkMode
                  ? "border-[#d4a574]/30 bg-[#d4a574]/5"
                  : "border-[#8a6a3e]/20 bg-[#f8f3eb]"
              }`}
            >

              <div
                className={`w-[170px] h-[170px] rounded-[28px] mx-auto flex items-center justify-center mb-5 ${
                  darkMode
                    ? "bg-black/30 border border-white/10"
                    : "bg-white border border-black/10"
                }`}
              >

                <p className="text-[#d4a574] text-xs tracking-[0.2em]">
                  QR CODE
                </p>

              </div>

              <p
                className={`text-sm leading-7 ${
                  darkMode
                    ? "text-white/50"
                    : "text-black/50"
                }`}
              >
                Scan and complete the advance payment
                to officially confirm your reservation.
              </p>

            </div>

            {/* BANK DETAILS */}
            <div
              className={`rounded-[28px] p-5 mb-6 ${
                darkMode
                  ? "bg-white/[0.03] border border-white/10"
                  : "bg-black/[0.03] border border-black/10"
              }`}
            >

              <h3 className="text-lg font-semibold mb-5">
                Bank Details
              </h3>

              <div className="space-y-4 text-sm">

                <div>

                  <p
                    className={`mb-1 ${
                      darkMode
                        ? "text-white/40"
                        : "text-black/40"
                    }`}
                  >
                    Account Name
                  </p>

                  <p>
                    Niels Privé Hospitality
                  </p>

                </div>

                <div>

                  <p
                    className={`mb-1 ${
                      darkMode
                        ? "text-white/40"
                        : "text-black/40"
                    }`}
                  >
                    Bank
                  </p>

                  <p>
                    HDFC Bank
                  </p>

                </div>

                <div>

                  <p
                    className={`mb-1 ${
                      darkMode
                        ? "text-white/40"
                        : "text-black/40"
                    }`}
                  >
                    Account Number
                  </p>

                  <p>
                    45879211452
                  </p>

                </div>

                <div>

                  <p
                    className={`mb-1 ${
                      darkMode
                        ? "text-white/40"
                        : "text-black/40"
                    }`}
                  >
                    IFSC
                  </p>

                  <p>
                    HDFC0000192
                  </p>

                </div>

              </div>

            </div>

            {/* PAY BUTTON */}
            <button
              className="w-full bg-[#d4a574] text-black rounded-[22px] py-5 font-semibold text-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3"
            >

              Complete Payment

              <ArrowRight size={20} />

            </button>

            {/* NOTICE */}
            <div
              className={`mt-6 rounded-[24px] p-5 flex gap-4 ${
                darkMode
                  ? "bg-white/[0.03]"
                  : "bg-black/[0.03]"
              }`}
            >

              <ShieldCheck
                className="text-[#d4a574] mt-1"
                size={20}
              />

              <p
                className={`text-sm leading-7 ${
                  darkMode
                    ? "text-white/50"
                    : "text-black/55"
                }`}
              >
                Your reservation remains temporarily
                secured for 24 hours until payment
                confirmation is completed.
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>

  );

}