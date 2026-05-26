"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import {
  auth,
  db,
} from "@/lib/firebase";

import {
  Plane,
  Hotel,
  CalendarDays,
  Users,
  ArrowRight,
  Clock3,
  CheckCircle2,
  XCircle,
  Sparkles,
} from "lucide-react";

export default function BookingHistoryPage() {

  const [bookings,
    setBookings,
  ] = useState<any[]>([]);

  const [loading,
    setLoading,
  ] = useState(true);

  const router = useRouter();

  useEffect(() => {

    if (!auth.currentUser) {

      router.push("/signin");

      return;

    }

    const fetchBookings =
      async () => {

        try {

          const q = query(
            collection(db, "bookings"),
            where(
              "userId",
              "==",
              auth.currentUser?.uid
            ),
            orderBy(
              "createdAt",
              "desc"
            )
          );

          const querySnapshot =
            await getDocs(q);

          const bookingData =
            querySnapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            );

          setBookings(
            bookingData
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };

    fetchBookings();

  }, []);

  const hotelBookings =
    bookings.filter(
      (booking) =>
        booking.bookingType ===
        "hotel"
    );

  const flightBookings =
    bookings.filter(
      (booking) =>
        booking.bookingType ===
        "flight"
    );

  const getStatusIcon = (
    status: string
  ) => {

    switch (status) {

      case "confirmed":
        return (
          <CheckCircle2
            size={18}
            className="text-green-500"
          />
        );

      case "cancelled":
        return (
          <XCircle
            size={18}
            className="text-red-500"
          />
        );

      default:
        return (
          <Clock3
            size={18}
            className="text-[#d4a574]"
          />
        );

    }

  };

  return (

    <main className="min-h-screen bg-[#f5f1ea] text-[#111] overflow-hidden">

      {/* TOP LIGHT */}

      <div className="absolute top-0 left-0 w-full h-[400px] bg-[radial-gradient(circle_at_top,rgba(212,165,116,0.14),transparent_50%)] pointer-events-none" />

      {/* PAGE */}

      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">

        {/* HEADER */}

        <div className="mb-16">

          <p className="uppercase tracking-[0.35em] text-xs text-[#b38a58] mb-5">

            Niels Privé Account

          </p>

          <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.06em] leading-none mb-8">

            Your Journeys

          </h1>

          <p className="text-neutral-600 text-lg max-w-3xl leading-8">

            View your upcoming luxury stays, premium flight reservations, and curated hospitality experiences connected to the Niels Privé platform.

          </p>

        </div>

        {/* LOADING */}

        {loading && (

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {[1, 2].map((item) => (

              <div
                key={item}
                className="h-[320px] rounded-[36px] bg-white animate-pulse"
              />

            ))}

          </div>

        )}

        {/* EMPTY STATE */}

        {!loading &&
          bookings.length === 0 && (

          <div className="bg-white rounded-[40px] border border-black/5 p-14 text-center shadow-[0_20px_70px_rgba(0,0,0,0.05)]">

            <div className="w-20 h-20 rounded-full bg-[#d4a574]/10 flex items-center justify-center mx-auto mb-8">

              <Sparkles
                size={34}
                className="text-[#d4a574]"
              />

            </div>

            <h2 className="text-4xl font-semibold mb-5">

              No Journeys Reserved Yet

            </h2>

            <p className="text-neutral-600 text-lg leading-8 max-w-2xl mx-auto mb-10">

              Your luxury stays and premium reservations will automatically appear here once your bookings are confirmed.

            </p>

            <button
              onClick={() =>
                router.push("/")
              }
              className="bg-black text-white px-8 py-4 rounded-2xl font-medium hover:scale-[1.02] transition-all"
            >

              Explore Stays

            </button>

          </div>

        )}

        {/* FLIGHTS */}

        {!loading &&
          flightBookings.length > 0 && (

          <section className="mb-20">

            <div className="flex items-center gap-4 mb-10">

              <div className="w-14 h-14 rounded-2xl bg-[#d4a574]/10 flex items-center justify-center">

                <Plane
                  size={24}
                  className="text-[#d4a574]"
                />

              </div>

              <div>

                <p className="uppercase tracking-[0.25em] text-xs text-[#b38a58] mb-2">

                  Flights

                </p>

                <h2 className="text-4xl font-semibold">

                  Premium Air Journeys

                </h2>

              </div>

            </div>

            <div className="space-y-7">

              {flightBookings.map(
                (booking) => (

                <div
                  key={booking.id}
                  className="rounded-[36px] bg-white border border-black/5 p-8 shadow-[0_20px_70px_rgba(0,0,0,0.05)]"
                >

                  <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

                    <div>

                      <div className="flex items-center gap-3 mb-5">

                        {getStatusIcon(
                          booking.status
                        )}

                        <p className="capitalize text-sm text-neutral-600">

                          {booking.status ||
                            "confirmed"}

                        </p>

                      </div>

                      <p className="uppercase tracking-[0.25em] text-xs text-neutral-400 mb-4">

                        {booking.airline ||
                          "Premium Airline"}

                      </p>

                      <h3 className="text-4xl font-semibold tracking-tight mb-5">

                        {booking.from} →
                        {" "}
                        {booking.to}

                      </h3>

                      <div className="flex flex-wrap gap-5 text-sm text-neutral-600">

                        <p>
                          Cabin:
                          {" "}
                          {booking.cabin}
                        </p>

                        <p>
                          Travelers:
                          {" "}
                          {booking.travelers}
                        </p>

                      </div>

                    </div>

                    <div className="xl:text-right">

                      <p className="text-5xl font-semibold mb-3">

                        ₹{booking.price}

                      </p>

                      <button className="inline-flex items-center gap-3 bg-black text-white px-6 py-4 rounded-2xl hover:scale-[1.02] transition-all">

                        View Journey

                        <ArrowRight size={18} />

                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </section>

        )}

        {/* HOTELS */}

        {!loading &&
          hotelBookings.length > 0 && (

          <section>

            <div className="flex items-center gap-4 mb-10">

              <div className="w-14 h-14 rounded-2xl bg-[#d4a574]/10 flex items-center justify-center">

                <Hotel
                  size={24}
                  className="text-[#d4a574]"
                />

              </div>

              <div>

                <p className="uppercase tracking-[0.25em] text-xs text-[#b38a58] mb-2">

                  Stays

                </p>

                <h2 className="text-4xl font-semibold">

                  Luxury Reservations

                </h2>

              </div>

            </div>

            <div className="space-y-7">

              {hotelBookings.map(
                (booking) => (

                <div
                  key={booking.id}
                  className="rounded-[36px] bg-white border border-black/5 overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.05)]"
                >

                  {/* IMAGE */}

                  <div className="relative h-[260px] overflow-hidden">

                    <img
                      src={
                        booking.image ||
                        "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2400&auto=format&fit=crop"
                      }
                      alt={booking.hotelName}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                    <div className="absolute bottom-0 left-0 p-7">

                      <div className="flex items-center gap-3 mb-4">

                        {getStatusIcon(
                          booking.status
                        )}

                        <p className="capitalize text-sm text-white/80">

                          {booking.status ||
                            "confirmed"}

                        </p>

                      </div>

                      <p className="uppercase tracking-[0.25em] text-xs text-white/60 mb-3">

                        Niels Privé Collection

                      </p>

                      <h3 className="text-white text-4xl font-semibold">

                        {booking.hotelName ||
                          booking.roomName}

                      </h3>

                    </div>

                  </div>

                  {/* CONTENT */}

                  <div className="p-8">

                    <div className="grid md:grid-cols-4 gap-5 mb-8">

                      <div className="bg-[#f8f6f1] rounded-[24px] p-5">

                        <CalendarDays
                          size={22}
                          className="text-[#d4a574] mb-4"
                        />

                        <p className="text-sm text-neutral-500 mb-2">

                          Check In

                        </p>

                        <h4 className="font-semibold">

                          {booking.checkIn}

                        </h4>

                      </div>

                      <div className="bg-[#f8f6f1] rounded-[24px] p-5">

                        <CalendarDays
                          size={22}
                          className="text-[#d4a574] mb-4"
                        />

                        <p className="text-sm text-neutral-500 mb-2">

                          Check Out

                        </p>

                        <h4 className="font-semibold">

                          {booking.checkOut}

                        </h4>

                      </div>

                      <div className="bg-[#f8f6f1] rounded-[24px] p-5">

                        <Users
                          size={22}
                          className="text-[#d4a574] mb-4"
                        />

                        <p className="text-sm text-neutral-500 mb-2">

                          Guests

                        </p>

                        <h4 className="font-semibold">

                          {booking.guests}

                        </h4>

                      </div>

                      <div className="bg-[#f8f6f1] rounded-[24px] p-5">

                        <Hotel
                          size={22}
                          className="text-[#d4a574] mb-4"
                        />

                        <p className="text-sm text-neutral-500 mb-2">

                          Room

                        </p>

                        <h4 className="font-semibold">

                          {booking.roomName}

                        </h4>

                      </div>

                    </div>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                      <div>

                        <p className="text-neutral-500 mb-2">

                          Reservation Total

                        </p>

                        <h3 className="text-4xl font-semibold">

                          ₹{booking.totalPrice}

                        </h3>

                      </div>

                      <button className="inline-flex items-center justify-center gap-3 bg-black text-white px-7 py-4 rounded-2xl hover:scale-[1.02] transition-all">

                        View Reservation

                        <ArrowRight size={18} />

                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </section>

        )}

      </section>

    </main>

  );

}