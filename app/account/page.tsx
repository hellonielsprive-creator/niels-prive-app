"use client";

import {
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  Moon,
  Sun,
  User,
  Calendar,
  Settings,
  LogOut,
  Mail,
  ShieldCheck,
} from "lucide-react";
import {
  auth,
  db,
} from "@/lib/firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";

export default function AccountPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [darkMode, setDarkMode] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const upcomingBookings = bookings.filter(
    (booking: any) => new Date(booking.checkOut) >= new Date()
  );

  const pastBookings = bookings.filter(
    (booking: any) => new Date(booking.checkOut) < new Date()
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!auth.currentUser) {
        router.push("/signin");
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }

        const snapshot = await getDocs(collection(db, "bookings"));
        const filtered = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(
            (booking: any) =>
              booking.guestEmail?.toLowerCase() === auth.currentUser?.email?.toLowerCase()
          );

        setBookings(filtered);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0a0a0b] text-white flex items-center justify-center">
        <p className="text-white/50 text-lg">Loading account...</p>
      </main>
    );
  }

  return (
    <main className={`min-h-screen transition-all duration-500 ${darkMode ? "bg-[#0a0a0b] text-white" : "bg-[#f5f1ea] text-[#1a1a1a]"}`}>
      {/* PROFILE SECTION */}
      <section className={`border-b ${darkMode ? "border-white/10" : "border-black/10"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">
            <div className="flex-1">
              <p className="text-sm tracking-[0.3em] uppercase text-[#c6a77b] mb-4">
                Niels Privé Account
              </p>

              <h1 className="text-5xl md:text-7xl font-light leading-tight mb-8">
                Welcome back,
                <br />
                {userData?.fullName || "Guest"}.
              </h1>

              <p className={`text-lg max-w-xl leading-relaxed ${darkMode ? "text-white/50" : "text-black/50"}`}>
                Manage your profile, upcoming reservations, and access your premium travel experience.
              </p>
            </div>

            <div className={`w-full lg:w-80 p-8 rounded-[36px] border ${darkMode ? "bg-white/[0.03] border-white/10" : "bg-white/70 border-black/10"}`}>
              <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 rounded-full bg-[#c6a77b]/15 border border-[#c6a77b]/30 flex items-center justify-center">
                  <User className="w-8 h-8 text-[#c6a77b]" />
                </div>
                <div>
                  <h3 className="text-xl font-medium">{userData?.fullName || "Guest"}</h3>
                  <p className={`text-sm ${darkMode ? "text-white/50" : "text-black/50"}`}>
                    {userData?.email || auth.currentUser?.email}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className={`w-5 h-5 ${darkMode ? "text-white/40" : "text-black/40"}`} />
                  <div className="flex-1">
                    <p className={`text-xs uppercase tracking-[0.15em] ${darkMode ? "text-white/40" : "text-black/40"}`}>
                      Email
                    </p>
                    <p className="text-sm">{userData?.email || auth.currentUser?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Calendar className={`w-5 h-5 ${darkMode ? "text-white/40" : "text-black/40"}`} />
                  <div className="flex-1">
                    <p className={`text-xs uppercase tracking-[0.15em] ${darkMode ? "text-white/40" : "text-black/40"}`}>
                      Member Since
                    </p>
                    <p className="text-sm">
                      {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : "Recently"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <ShieldCheck className={`w-5 h-5 ${darkMode ? "text-white/40" : "text-black/40"}`} />
                  <div className="flex-1">
                    <p className={`text-xs uppercase tracking-[0.15em] ${darkMode ? "text-white/40" : "text-black/40"}`}>
                      Verification
                    </p>
                    <p className="text-sm">
                      {auth.currentUser?.emailVerified ? (
                        <span className="text-green-400">Verified</span>
                      ) : (
                        <span className="text-[#c6a77b]">Unverified</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${darkMode ? "border-white/10 hover:bg-white/5" : "border-black/10 hover:bg-black/5"}`}
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                  <span className="font-medium">{darkMode ? "Light Mode" : "Dark Mode"}</span>
                </button>

                <button
                  onClick={handleSignOut}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-red-400 ${darkMode ? "border-red-500/20 hover:bg-red-500/5" : "border-red-500/20 hover:bg-red-500/5"}`}
                >
                  <LogOut size={20} />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKINGS */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        {bookings.length === 0 ? (
          <div className={`rounded-[36px] p-12 border transition-all duration-500 ${darkMode ? "bg-white/[0.03] border-white/10" : "bg-white/70 border-black/10"}`}>
            <p className="text-[#c6a77b] uppercase tracking-[0.25em] text-sm mb-6">
              No Reservations
            </p>

            <h2 className="text-4xl font-light mb-4 leading-tight max-w-2xl">
              Your account is waiting for its first escape.
            </h2>

            <p className={`max-w-lg leading-relaxed ${darkMode ? "text-white/50" : "text-black/50"}`}>
              Once you reserve a stay, your luxury travel history and upcoming experiences will appear here.
            </p>
          </div>
        ) : (
          <div>
            {/* UPCOMING */}
            {upcomingBookings.length > 0 && (
              <div className="mb-20">
                <div className="mb-10">
                  <p className="text-[#c6a77b] uppercase tracking-[0.25em] text-sm mb-4">
                    Upcoming Escapes
                  </p>
                  <h2 className="text-4xl font-light">Your upcoming stays</h2>
                </div>

                <div className="space-y-8">
                  {upcomingBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className={`rounded-[36px] overflow-hidden border backdrop-blur-xl transition-all duration-500 ${darkMode ? "bg-white/[0.03] border-white/10" : "bg-white/70 border-black/10"}`}
                    >
                      <div className={`p-8 md:p-10 border-b ${darkMode ? "border-white/10" : "border-black/10"}`}>
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                          <div>
                            <p className="text-[#c6a77b] uppercase tracking-[0.25em] text-sm mb-4">
                              Reservation
                            </p>
                            <h2 className="text-3xl md:text-4xl font-light leading-tight">
                              {booking.hotelName}
                            </h2>
                            <p className={`text-lg mt-3 ${darkMode ? "text-white/50" : "text-black/50"}`}>
                              {booking.roomName}
                            </p>
                          </div>

                          <div className="md:text-right">
                            <div
                              className={`inline-flex px-4 py-2 rounded-full text-sm capitalize border ${
                                booking.status === "confirmed"
                                  ? "bg-green-500/10 text-green-400 border-green-500/20"
                                  : booking.status === "cancelled"
                                  ? "bg-red-500/10 text-red-400 border-red-500/20"
                                  : "bg-[#c6a77b]/10 text-[#c6a77b] border-[#c6a77b]/20"
                              }`}
                            >
                              {booking.status}
                            </div>
                            <p className="text-3xl font-light mt-5">₹{booking.totalPrice}</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 md:p-10">
                        <div>
                          <p className={`text-xs uppercase tracking-[0.15em] mb-2 ${darkMode ? "text-white/40" : "text-black/40"}`}>
                            Check In
                          </p>
                          <p className="text-lg">{booking.checkIn}</p>
                        </div>
                        <div>
                          <p className={`text-xs uppercase tracking-[0.15em] mb-2 ${darkMode ? "text-white/40" : "text-black/40"}`}>
                            Check Out
                          </p>
                          <p className="text-lg">{booking.checkOut}</p>
                        </div>
                        <div>
                          <p className={`text-xs uppercase tracking-[0.15em] mb-2 ${darkMode ? "text-white/40" : "text-black/40"}`}>
                            Guests
                          </p>
                          <p className="text-lg">{booking.guests}</p>
                        </div>
                        <div>
                          <p className={`text-xs uppercase tracking-[0.15em] mb-2 ${darkMode ? "text-white/40" : "text-black/40"}`}>
                            Reserved By
                          </p>
                          <p className="text-lg">{booking.guestName}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PAST BOOKINGS */}
            {pastBookings.length > 0 && (
              <div>
                <div className="mb-10">
                  <p className="text-[#c6a77b] uppercase tracking-[0.25em] text-sm mb-4">
                    Previous Journeys
                  </p>
                  <h2 className="text-4xl font-light">Revisit your stays</h2>
                </div>

                <div className="space-y-8">
                  {pastBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className={`rounded-[36px] overflow-hidden border backdrop-blur-xl transition-all duration-500 opacity-75 hover:opacity-100 ${darkMode ? "bg-white/[0.03] border-white/10" : "bg-white/70 border-black/10"}`}
                    >
                      <div className={`p-8 md:p-10 border-b ${darkMode ? "border-white/10" : "border-black/10"}`}>
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                          <div>
                            <p className="text-[#c6a77b] uppercase tracking-[0.25em] text-sm mb-4">
                              Previous Stay
                            </p>
                            <h2 className="text-3xl md:text-4xl font-light leading-tight">
                              {booking.hotelName}
                            </h2>
                            <p className={`text-lg mt-3 ${darkMode ? "text-white/50" : "text-black/50"}`}>
                              {booking.roomName}
                            </p>
                          </div>

                          <div className="md:text-right">
                            <p className="text-3xl font-light">₹{booking.totalPrice}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}