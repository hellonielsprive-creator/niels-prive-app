"use client";

import { useEffect, useState } from "react";

export default function FlightsPage() {

  const [from, setFrom] = useState("BOM");
  const [to, setTo] = useState("DXB");
  const [departureDate, setDepartureDate] =
    useState("2026-05-19");

  const [flights, setFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFlights = async () => {

    setLoading(true);

    try {

     const response = await fetch(
  `/api/flights?from=${from}&to=${to}&date=${departureDate}`
);

      const data = await response.json();

      console.log(
        "FULL SERPAPI RESPONSE:",
        data
      );

      const flightResults =
        data?.best_flights ||
        data?.other_flights ||
        [];

      setFlights(flightResults);

    } catch (error) {

      console.error(error);

    }

    setLoading(false);

  };

  useEffect(() => {
    fetchFlights();
  }, []);

  return (

    <main className="min-h-screen bg-[#f3efe8] text-[#111111] overflow-hidden relative">

      {/* Background */}
      <div className="absolute top-[-220px] right-[-140px] w-[520px] h-[520px] bg-[#e8ddce] rounded-full blur-3xl opacity-40"></div>

      <div className="absolute bottom-[-260px] left-[-140px] w-[460px] h-[460px] bg-[#ebe2d4] rounded-full blur-3xl opacity-50"></div>

      {/* HERO */}
      <section className="relative z-10 px-6 md:px-16 pt-28 md:pt-36 pb-24">

        <p className="uppercase tracking-[0.35em] text-xs text-neutral-500 mb-6">
          Niels Privé Flights
        </p>

        <h1 className="text-[52px] md:text-[92px] font-semibold leading-[0.95] tracking-[-0.06em] max-w-4xl mb-8">
          Curated air journeys for the modern luxury traveler.
        </h1>

        <p className="text-neutral-600 text-lg md:text-xl leading-relaxed max-w-2xl">
          Discover elevated routes, premium airlines,
          and real-time global flight experiences.
        </p>

      </section>

      {/* SEARCH */}
      <section className="relative z-10 px-6 md:px-16 pb-24">

        <div className="relative overflow-hidden rounded-[40px] border border-white/50 ring-1 ring-black/[0.03] bg-white/80 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.06)] p-6 md:p-9">

          <div className="relative z-10">

            <div className="flex items-center justify-between mb-10">

              <div>

                <p className="uppercase tracking-[0.35em] text-[11px] text-neutral-400 mb-3">
                  Journey Search
                </p>

                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
                  Begin your next arrival.
                </h3>

              </div>

              <div className="hidden md:flex items-center justify-center w-14 h-14 rounded-full bg-black text-white text-sm font-semibold shadow-xl">
                NP
              </div>

            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

              {/* FROM */}
              <div>

                <p className="text-sm text-neutral-500 mb-3">
                  From
                </p>

                <input
                  type="text"
                  value={from}
                  onChange={(e) =>
                    setFrom(
                      e.target.value.toUpperCase()
                    )
                  }
                  className="w-full rounded-[24px] border border-black/5 bg-[#f7f4ef] px-5 py-4 outline-none"
                />

              </div>

              {/* TO */}
              <div>

                <p className="text-sm text-neutral-500 mb-3">
                  To
                </p>

                <input
                  type="text"
                  value={to}
                  onChange={(e) =>
                    setTo(
                      e.target.value.toUpperCase()
                    )
                  }
                  className="w-full rounded-[24px] border border-black/5 bg-[#f7f4ef] px-5 py-4 outline-none"
                />

              </div>

              {/* DATE */}
              <div>

                <p className="text-sm text-neutral-500 mb-3">
                  Departure
                </p>

                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) =>
                    setDepartureDate(
                      e.target.value
                    )
                  }
                  className="w-full rounded-[24px] border border-black/5 bg-[#f7f4ef] px-5 py-4 outline-none"
                />

              </div>

              {/* BUTTON */}
              <div className="flex items-end">

                <button
                  onClick={fetchFlights}
                  className="w-full rounded-full bg-black text-white py-4 font-medium shadow-xl"
                >
                  {loading
                    ? "Searching..."
                    : "Explore Journeys"}
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* RESULTS */}
      <section className="relative z-10 px-6 md:px-16 pb-28">

        {!loading && flights.length === 0 && (

          <div className="rounded-[36px] bg-white/70 backdrop-blur-xl border border-black/5 p-14 text-center">

            <p className="text-2xl font-semibold tracking-tight mb-3">
              No flights available
            </p>

          </div>

        )}

        {loading && (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {[1, 2, 3, 4].map((item) => (

              <div
                key={item}
                className="animate-pulse rounded-[32px] min-h-[300px] bg-white/60 border border-black/5"
              ></div>

            ))}

          </div>

        )}

        {!loading && flights.length > 0 && (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {flights.map((flight, index) => (

              <div
                key={index}
                className="relative overflow-hidden rounded-[32px] bg-[#f8f5ef] border border-black/[0.04] p-8"
              >

                <div className="flex items-start justify-between mb-10">

                  <div>

                    <p className="text-[11px] uppercase tracking-[0.35em] text-neutral-500 mb-4">

                      {flight?.flights?.[0]?.airline ||
                        "Premium Airline"}

                    </p>

                    <h3 className="text-5xl font-semibold tracking-[-0.06em] leading-none mb-3">

                      {flight?.flights?.[0]?.arrival_airport?.id}

                    </h3>

                    <p className="text-neutral-600 text-lg">

                      {flight?.flights?.[0]?.arrival_airport?.name}

                    </p>

                  </div>

                  <div className="w-14 h-14 rounded-[20px] bg-black text-white flex items-center justify-center text-sm font-semibold">

                    {flight?.flights?.[0]?.airline?.slice(0, 2) || "NP"}

                  </div>

                </div>

                {/* ROUTE */}
                <div className="mb-8">

                  <div className="flex items-center gap-4 mb-5">

                    <p className="text-xl font-medium">

                      {flight?.flights?.[0]?.departure_airport?.id}

                    </p>

                    <div className="flex-1 h-px bg-black/10"></div>

                    <p className="text-xl font-medium">

                      {flight?.flights?.[0]?.arrival_airport?.id}

                    </p>

                  </div>

                  <div className="flex items-center justify-between text-sm text-neutral-600">

                    <p>

                      Departure •{" "}
                      {flight?.flights?.[0]?.departure_airport?.time ||
                        "08:30"}

                    </p>

                    <p>
                      Live Price
                    </p>

                  </div>

                </div>

                <div className="h-px w-full bg-black/5 mb-6"></div>

                {/* BOTTOM */}
                <div className="flex items-end justify-between">

                  <div>

                    <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-400 mb-2">
                      Price
                    </p>

                    <p className="text-2xl font-semibold">

                      ${flight?.price || "N/A"}

                    </p>

                  </div>

                <a
  href={`/flights/details?airline=${encodeURIComponent(
    flight?.flights?.[0]?.airline || ""
  )}&from=${encodeURIComponent(
    flight?.flights?.[0]?.departure_airport?.id || ""
  )}&to=${encodeURIComponent(
    flight?.flights?.[0]?.arrival_airport?.id || ""
  )}&price=${encodeURIComponent(
    flight?.price || ""
  )}&departure=${encodeURIComponent(
    flight?.flights?.[0]?.departure_airport?.time || ""
  )}&arrival=${encodeURIComponent(
    flight?.flights?.[0]?.arrival_airport?.time || ""
  )}`}
  className="rounded-full bg-black text-white px-6 py-3.5 text-sm font-medium tracking-tight shadow-lg transition-all duration-300 hover:scale-[1.02] hover:opacity-90"
>
  Continue
</a>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </main>

  );

}