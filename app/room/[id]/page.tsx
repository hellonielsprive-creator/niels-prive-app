"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
  useParams,
} from "next/navigation";

import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import {
  db,
  auth,
} from "@/app/firebase/config";

import { BOOKING_TYPES } from "@/lib/bookings/schema";
import { createBooking } from "@/lib/firestore/bookings";

import {
  Star,
  MapPin,
  Users,
  BedDouble,
  Bath,
  Wifi,
  Waves,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

export default function RoomPage() {

  const router = useRouter();

  const params = useParams();

  const roomId =
    params.id as string;

  const [room,
    setRoom,
  ] = useState<any>(null);

  const [loading,
    setLoading,
  ] = useState(true);

  const [bookingLoading,
    setBookingLoading,
  ] = useState(false);

  const [galleryIndex,
    setGalleryIndex,
  ] = useState(0);

  const [checkIn,
    setCheckIn,
  ] = useState("");

  const [checkOut,
    setCheckOut,
  ] = useState("");

  const [guests,
    setGuests,
  ] = useState("");

  useEffect(() => {

    const fetchRoom =
      async () => {

        try {

          const roomRef =
            doc(
              db,
              "rooms",
              roomId
            );

          const roomSnap =
            await getDoc(
              roomRef
            );

          if (
            roomSnap.exists()
          ) {

            setRoom({
              id: roomSnap.id,
              ...roomSnap.data(),
            });

          }

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };

    if (roomId) {

      fetchRoom();

    }

  }, [roomId]);

  if (loading || !room) {

    return (

      <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center">

        <div className="text-center">

          <div className="w-16 h-16 rounded-full border border-white/10 border-t-[#d4a574] animate-spin mx-auto mb-6" />

          <p className="text-white/50">

            Loading Luxury Experience...

          </p>

        </div>

      </main>

    );

  }

  const gallery =
    room.gallery?.length > 0
      ? room.gallery
      : [
          room.image ||
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2400&auto=format&fit=crop",
        ];

  const currentImage =
    gallery[galleryIndex];

  return (

    <main className="min-h-screen bg-[#050505] text-white overflow-hidden">

      {/* HERO */}

      <section className="relative h-[90vh] overflow-hidden">

        <img
          src={currentImage}
          alt={room.roomName}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* OVERLAYS */}

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/20 to-transparent" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_45%)]" />

        {/* TOP */}

        <div className="absolute top-0 left-0 w-full p-6 md:p-10 z-20">

          <button
            onClick={() =>
              router.back()
            }
            className="flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/10 px-5 py-4 rounded-2xl hover:bg-white/15 transition-all"
          >

            <ArrowLeft size={18} />

            Back

          </button>

        </div>

        {/* CONTENT */}

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 z-20">

          <div className="max-w-7xl mx-auto">

            <p className="uppercase tracking-[0.35em] text-[#d4a574] text-xs mb-5">

              Niels Privé Collection

            </p>

            <div className="flex flex-wrap items-end justify-between gap-8">

              <div>

                <h1 className="text-5xl md:text-7xl font-semibold leading-[0.95] max-w-4xl">

                  {room.roomName}

                </h1>

                <div className="flex items-center gap-3 mt-6 text-white/70">

                  <MapPin size={18} />

                  <p>

                    {room.location ||
                      "Luxury Hospitality Collection"}

                  </p>

                </div>

              </div>

              {/* RATING */}

              <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[28px] px-6 py-5">

                <div className="flex items-center gap-3">

                  <Star
                    size={18}
                    className="text-[#d4a574] fill-[#d4a574]"
                  />

                  <div>

                    <p className="text-2xl font-semibold">

                      4.9

                    </p>

                    <p className="text-white/50 text-sm">

                      Guest Rating

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* GALLERY BUTTONS */}

        {gallery.length > 1 && (

          <>

            <button
              onClick={() =>
                setGalleryIndex(
                  galleryIndex === 0
                    ? gallery.length - 1
                    : galleryIndex - 1
                )
              }
              className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center"
            >

              <ChevronLeft />

            </button>

            <button
              onClick={() =>
                setGalleryIndex(
                  galleryIndex ===
                    gallery.length - 1
                    ? 0
                    : galleryIndex + 1
                )
              }
              className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center"
            >

              <ChevronRight />

            </button>

          </>

        )}

      </section>

      {/* MAIN */}

      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10">

          {/* LEFT */}

          <div>

            {/* ABOUT */}

            <div className="mb-16">

              <p className="uppercase tracking-[0.25em] text-[#d4a574] text-xs mb-5">

                Room Experience

              </p>

              <h2 className="text-4xl md:text-5xl font-semibold mb-8 leading-tight">

                Crafted For Elevated Modern Hospitality

              </h2>

              <p className="text-white/60 text-lg leading-9 max-w-4xl">

                {
                  room.description ||
                  "Experience premium luxury hospitality with elegant interiors, cinematic comfort, curated guest experiences, and refined modern stays crafted for elevated travel."
                }

              </p>

            </div>

            {/* ROOM DETAILS */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">

              <div className="bg-white/[0.03] border border-white/10 rounded-[28px] p-6">

                <Users
                  size={24}
                  className="text-[#d4a574] mb-5"
                />

                <p className="text-white/45 text-sm mb-2">

                  Guests

                </p>

                <h3 className="text-3xl font-semibold">

                  {room.guests || 2}

                </h3>

              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-[28px] p-6">

                <BedDouble
                  size={24}
                  className="text-[#d4a574] mb-5"
                />

                <p className="text-white/45 text-sm mb-2">

                  Bed Type

                </p>

                <h3 className="text-2xl font-semibold">

                  {room.bedType || "King"}

                </h3>

              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-[28px] p-6">

                <Bath
                  size={24}
                  className="text-[#d4a574] mb-5"
                />

                <p className="text-white/45 text-sm mb-2">

                  Bathrooms

                </p>

                <h3 className="text-3xl font-semibold">

                  {room.bathrooms || 1}

                </h3>

              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-[28px] p-6">

                <Sparkles
                  size={24}
                  className="text-[#d4a574] mb-5"
                />

                <p className="text-white/45 text-sm mb-2">

                  Room Size

                </p>

                <h3 className="text-2xl font-semibold">

                  {room.size || "65m²"}

                </h3>

              </div>

            </div>

            {/* AMENITIES */}

            <div>

              <p className="uppercase tracking-[0.25em] text-[#d4a574] text-xs mb-5">

                Luxury Amenities

              </p>

              <div className="flex flex-wrap gap-4">

                <div className="bg-white/[0.03] border border-white/10 px-5 py-4 rounded-2xl flex items-center gap-3">

                  <Wifi
                    size={18}
                    className="text-[#d4a574]"
                  />

                  High-Speed Wifi

                </div>

                <div className="bg-white/[0.03] border border-white/10 px-5 py-4 rounded-2xl flex items-center gap-3">

                  <Waves
                    size={18}
                    className="text-[#d4a574]"
                  />

                  Infinity Pool

                </div>

                <div className="bg-white/[0.03] border border-white/10 px-5 py-4 rounded-2xl flex items-center gap-3">

                  <Sparkles
                    size={18}
                    className="text-[#d4a574]"
                  />

                  Premium Hospitality

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div>

            <div className="sticky top-10 bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-[34px] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">

              {/* PRICE */}

              <div className="mb-10">

                <p className="text-white/45 text-sm mb-3">

                  Starting From

                </p>

                <h2 className="text-5xl font-semibold">

                  ₹{room.price || 0}

                </h2>

                <p className="text-white/45 mt-3">

                  per night

                </p>

              </div>

              {/* INPUTS */}

              <div className="space-y-4 mb-8">

                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) =>
                    setCheckIn(
                      e.target.value
                    )
                  }
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-5 outline-none"
                />

                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) =>
                    setCheckOut(
                      e.target.value
                    )
                  }
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-5 outline-none"
                />

                <input
                  type="number"
                  placeholder="Guests"
                  value={guests}
                  onChange={(e) =>
                    setGuests(
                      e.target.value
                    )
                  }
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-5 outline-none"
                />

              </div>

              {/* BUTTON */}

              <button
                onClick={async () => {

                  if (
                    !checkIn ||
                    !checkOut ||
                    !guests
                  ) {

                    alert(
                      "Please fill all booking details"
                    );

                    return;

                  }

                  try {

                    setBookingLoading(
                      true
                    );

                    const bookingsQuery =
                      room.partnerId
                        ? query(
                            collection(
                              db,
                              "bookings"
                            ),
                            where(
                              "partnerId",
                              "==",
                              room.partnerId
                            ),
                            where(
                              "roomName",
                              "==",
                              room.roomName
                            )
                          )
                        : query(
                            collection(
                              db,
                              "bookings"
                            ),
                            where(
                              "roomName",
                              "==",
                              room.roomName
                            )
                          );

                    const existingBookings =
                      await getDocs(
                        bookingsQuery
                      );

                    const hasConflict =
                      existingBookings.docs.some(
                        (doc) => {

                          const booking: any =
                            doc.data();

                          if (
                            booking.status ===
                            "cancelled"
                          ) return false;

                          const existingCheckIn =
                            new Date(
                              booking.checkIn
                            );

                          const existingCheckOut =
                            new Date(
                              booking.checkOut
                            );

                          const newCheckIn =
                            new Date(
                              checkIn
                            );

                          const newCheckOut =
                            new Date(
                              checkOut
                            );

                          return (
                            newCheckIn <
                              existingCheckOut &&
                            newCheckOut >
                              existingCheckIn
                          );

                        }
                      );

                    if (hasConflict) {

                      alert(
                        "Room unavailable for selected dates"
                      );

                      setBookingLoading(
                        false
                      );

                      return;

                    }

                    if (!room.partnerId) {
                      alert(
                        "This room is not linked to a partner account yet."
                      );

                      setBookingLoading(false);

                      return;
                    }

                    await createBooking({
                      partnerId: room.partnerId,
                      bookingType: BOOKING_TYPES.ROOM,
                      userId: auth.currentUser?.uid,
                      roomId: room.id,
                      roomName: room.roomName,
                      hotelId: room.hotelId,
                      hotelName: room.hotelName,
                      guestName:
                        auth.currentUser?.displayName ||
                        "Guest",
                      guestEmail:
                        auth.currentUser?.email ||
                        "guest@niels.com",
                      guests: String(guests),
                      checkIn: String(checkIn),
                      checkOut: String(checkOut),
                      totalPrice: String(room.price),
                      status: "confirmed",
                    });

                    router.push(
                      "/payment"
                    );

                  } catch (error: any) {

                    console.log(error);

                    alert(
                      error.message
                    );

                  } finally {

                    setBookingLoading(
                      false
                    );

                  }

                }}

                disabled={bookingLoading}

                className="w-full bg-[#d4a574] hover:bg-[#c3925c] transition-all text-black py-5 rounded-2xl font-semibold text-lg disabled:opacity-50"
              >

                {
                  bookingLoading
                    ? "Processing Reservation..."
                    : "Reserve Luxury Stay"
                }

              </button>

              {/* EXTRA */}

              <div className="mt-8 pt-8 border-t border-white/10">

                <div className="flex items-center justify-between mb-4">

                  <p className="text-white/45">

                    Hospitality

                  </p>

                  <p>

                    Premium

                  </p>

                </div>

                <div className="flex items-center justify-between mb-4">

                  <p className="text-white/45">

                    Experience

                  </p>

                  <p>

                    Luxury Collection

                  </p>

                </div>

                <div className="flex items-center justify-between">

                  <p className="text-white/45">

                    Cancellation

                  </p>

                  <p>

                    Flexible

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>

  );

}