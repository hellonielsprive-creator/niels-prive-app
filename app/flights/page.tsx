"use client";

import {useEffect, useState } from "react";

export default function FlightsPage() {

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
const API_KEY = process.env.NEXT_PUBLIC_AVIATIONSTACK_API_KEY;

const [flights, setFlights] = useState<any[]>([]);
const [loading, setLoading] = useState(false);

const fetchFlights = async () => {
  setLoading(true);

  try {
    const response = await fetch(
      `https://api.aviationstack.com/v1/flights?access_key=${API_KEY}&dep_iata=${from}&arr_iata=${to}`
    );

    const data = await response.json();
    
    console.log(data);

    if (data.data) {
      setFlights(data.data.slice(0, 10));
    }
  } catch (error) {
    console.error(error);
  }

  setLoading(false);
};

useEffect(() => {
  fetchFlights();
}, []);
  return (
    <main className="min-h-screen bg-[#f8f5ef] text-black">

      {/* Hero */}
      <section className="px-6 md:px-16 pt-20 pb-14">

        <p className="uppercase tracking-[0.35em] text-sm text-neutral-500 mb-4">
          Niels Privé Flights
        </p>

        <h1 className="text-5xl md:text-7xl font-semibold leading-tight max-w-4xl mb-6">
          Luxury Air Travel,
          <br />
          Reimagined.
        </h1>

        <p className="text-neutral-600 text-lg max-w-2xl">
          Discover premium flights, seamless journeys, and elevated travel experiences curated for modern explorers.
        </p>

      </section>

      {/* Search Box */}
      <section className="px-6 md:px-16 pb-20">

        <div className="bg-white rounded-[36px] p-6 md:p-8 shadow-xl border border-black/5">

          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">

            {/* From */}
            <div>
              <p className="text-sm text-neutral-500 mb-3">
                From
              </p>

              <input
                type="text"
                placeholder="Mumbai"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full rounded-2xl border border-neutral-200 px-5 py-4 outline-none focus:border-black bg-white"
              />
            </div>

            {/* To */}
            <div>
              <p className="text-sm text-neutral-500 mb-3">
                To
              </p>

              <input
                type="text"
                placeholder="Dubai"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full rounded-2xl border border-neutral-200 px-5 py-4 outline-none focus:border-black bg-white"
              />
            </div>

            {/* Departure */}
            <div>
              <p className="text-sm text-neutral-500 mb-3">
                Departure
              </p>

              <input
                type="date"
                className="w-full rounded-2xl border border-neutral-200 px-5 py-4 outline-none focus:border-black bg-white"
              />
            </div>

            {/* Travelers */}
            <div>
              <p className="text-sm text-neutral-500 mb-3">
                Travelers
              </p>

              <select className="w-full rounded-2xl border border-neutral-200 px-5 py-4 outline-none focus:border-black bg-white">
                <option>1 Traveler</option>
                <option>2 Travelers</option>
                <option>3 Travelers</option>
                <option>4+ Travelers</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">

              <button
  onClick={fetchFlights}
  className="w-full bg-black hover:opacity-90 transition text-white rounded-2xl py-4 font-medium"
>
  {loading ? "Searching..." : "Search Flights"}
</button>

            </div>

          </div>

        </div>

      </section>

      {/* Flight Results */}
      <section className="px-6 md:px-16 pb-24">

        <div className="flex items-center justify-between mb-10">

          <div>
            <p className="uppercase tracking-[0.3em] text-sm text-neutral-500 mb-2">
              Featured Routes
            </p>

            <h2 className="text-4xl font-semibold">
              Popular Luxury Flights
            </h2>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {flights.map((flight, index) => (
  <div
    key={index}
    className="bg-white rounded-[32px] p-8 shadow-lg border border-black/5"
  >
    <div className="flex items-center justify-between mb-6">
      <div>
        <p className="text-sm text-neutral-500 mb-2">
          {flight.airline?.name}
        </p>

        <h3 className="text-3xl font-semibold">
          {flight.departure?.iata} → {flight.arrival?.iata}
        </h3>
      </div>

      <p className="text-2xl font-semibold">
        {flight.flight_status}
      </p>
    </div>

    <div className="grid grid-cols-3 gap-4 text-sm text-neutral-600">
      <div>
        <p>Departure</p>
        <p className="font-medium text-black">
          {flight.departure?.airport}
        </p>
      </div>

      <div>
        <p>Arrival</p>
        <p className="font-medium text-black">
          {flight.arrival?.airport}
        </p>
      </div>

      <div>
        <p>Flight</p>
        <p className="font-medium text-black">
          {flight.flight?.iata}
        </p>
      </div>
    </div>
  </div>
))}

          {/* Card */}
          <div className="bg-white rounded-[32px] p-8 shadow-lg border border-black/5">

            <div className="flex items-center justify-between mb-10">

              <div>
                <p className="text-sm text-neutral-500 mb-2">
                  Emirates
                </p>

                <h3 className="text-3xl font-semibold">
                  Mumbai → Dubai
                </h3>
              </div>

              <p className="text-3xl font-semibold">
                ₹42,500
              </p>

            </div>

            <div className="grid grid-cols-3 gap-6 mb-10">

              <div>
                <p className="text-neutral-500 text-sm mb-2">
                  Departure
                </p>

                <h4 className="font-semibold">
                  08:40 AM
                </h4>
              </div>

              <div>
                <p className="text-neutral-500 text-sm mb-2">
                  Arrival
                </p>

                <h4 className="font-semibold">
                  11:15 AM
                </h4>
              </div>

              <div>
                <p className="text-neutral-500 text-sm mb-2">
                  Duration
                </p>

                <h4 className="font-semibold">
                  3h 05m
                </h4>
              </div>

            </div>

            <button className="w-full bg-black text-white py-4 rounded-2xl hover:opacity-90 transition">
              View Flight
            </button>

          </div>

          {/* Card */}
          <div className="bg-white rounded-[32px] p-8 shadow-lg border border-black/5">

            <div className="flex items-center justify-between mb-10">

              <div>
                <p className="text-sm text-neutral-500 mb-2">
                  Qatar Airways
                </p>

                <h3 className="text-3xl font-semibold">
                  Delhi → London
                </h3>
              </div>

              <p className="text-3xl font-semibold">
                ₹88,900
              </p>

            </div>

            <div className="grid grid-cols-3 gap-6 mb-10">

              <div>
                <p className="text-neutral-500 text-sm mb-2">
                  Departure
                </p>

                <h4 className="font-semibold">
                  02:10 AM
                </h4>
              </div>

              <div>
                <p className="text-neutral-500 text-sm mb-2">
                  Arrival
                </p>

                <h4 className="font-semibold">
                  11:30 AM
                </h4>
              </div>

              <div>
                <p className="text-neutral-500 text-sm mb-2">
                  Duration
                </p>

                <h4 className="font-semibold">
                  11h 20m
                </h4>
              </div>

            </div>

            <button className="w-full bg-black text-white py-4 rounded-2xl hover:opacity-90 transition">
              View Flight
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}