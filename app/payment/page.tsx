"use client";

export default function PaymentPage() {

  return (

    <main className="min-h-screen bg-[#0f0f11] text-white flex items-center justify-center px-6 py-20">

      <div className="w-full max-w-2xl rounded-[40px] border border-white/10 bg-white/[0.03] p-10">

        <h1 className="text-5xl font-semibold mb-4">
          Complete Your Reservation
        </h1>

        <p className="text-neutral-400 text-lg mb-10 leading-8">
          Your stay has been reserved temporarily.
          Complete the advance payment within 24 hours
          to confirm your booking.
        </p>

        <div className="rounded-[30px] border border-white/10 bg-black/30 p-8 mb-8">

          <h2 className="text-2xl font-semibold mb-6">
            Payment Summary
          </h2>

          <div className="space-y-4 text-lg">

            <div className="flex justify-between">
              <span className="text-neutral-400">
                Reservation Status
              </span>

              <span className="text-[#d4a574]">
                Payment Pending
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-neutral-400">
                Advance Required
              </span>

              <span>
                ₹240
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-neutral-400">
                Remaining At Property
              </span>

              <span>
                ₹960
              </span>
            </div>

          </div>

        </div>

        <div className="rounded-[30px] border border-white/10 bg-black/30 p-8 mb-8">

          <h2 className="text-2xl font-semibold mb-6">
            Bank Transfer Details
          </h2>

          <div className="space-y-4 text-lg">

            <p>
              <span className="text-neutral-400">
                Account Name:
              </span>

              {" "}
              Niels Privé Hospitality
            </p>

            <p>
              <span className="text-neutral-400">
                Bank:
              </span>

              {" "}
              HDFC Bank
            </p>

            <p>
              <span className="text-neutral-400">
                Account Number:
              </span>

              {" "}
              45879211452
            </p>

            <p>
              <span className="text-neutral-400">
                IFSC:
              </span>

              {" "}
              HDFC0000192
            </p>

          </div>

        </div>

        <div className="rounded-[30px] border border-dashed border-[#d4a574]/40 p-10 text-center mb-8">

          <p className="text-[#d4a574] text-xl mb-4">
            QR Code Placeholder
          </p>

          <p className="text-neutral-500">
            Add your business QR image here later
          </p>

        </div>

        <div className="rounded-[25px] bg-[#d4a574] text-black p-6">

          <h3 className="text-2xl font-semibold mb-3">
            Important Notice
          </h3>

          <p className="leading-8">
            Reservations remain temporarily blocked for
            24 hours. If payment is not received within
            the required timeframe, the reservation may
            be released automatically.
          </p>

        </div>

      </div>

    </main>

  );

}