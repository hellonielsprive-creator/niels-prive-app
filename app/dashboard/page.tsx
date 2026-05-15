export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#f8f6f2] flex">

      {/* Sidebar */}
      <aside className="w-[260px] bg-white border-r border-black/5 p-8">

        <h1 className="text-3xl font-semibold mb-12">
          Niels <span className="text-[#C8A96B]">Privé</span>
        </h1>

        <div className="space-y-6 text-black/60">

          <p className="hover:text-black transition cursor-pointer">
            Overview
          </p>

          <p className="hover:text-black transition cursor-pointer">
            My Hotels
          </p>

          <p className="hover:text-black transition cursor-pointer">
            Bookings
          </p>

          <p className="hover:text-black transition cursor-pointer">
            Earnings
          </p>

          <p className="hover:text-black transition cursor-pointer">
            Messages
          </p>

          <p className="hover:text-black transition cursor-pointer">
            Settings
          </p>

        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10">

        <div className="flex items-center justify-between mb-12">

          <div>
            <p className="uppercase tracking-[4px] text-sm text-black/40 mb-2">
              Hotel Owner Dashboard
            </p>

            <h2 className="text-5xl font-semibold text-[#1a1a1a]">
              Welcome Back
            </h2>
          </div>

          <button className="bg-[#C8A96B] hover:bg-[#b89555] transition px-7 py-4 rounded-full text-black font-medium">
            Add New Hotel
          </button>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

          <div className="bg-white rounded-[30px] p-8 shadow-sm">

            <p className="text-black/50 mb-4">
              Total Properties
            </p>

            <h3 className="text-5xl font-semibold">
              4
            </h3>

          </div>

          <div className="bg-white rounded-[30px] p-8 shadow-sm">

            <p className="text-black/50 mb-4">
              Monthly Earnings
            </p>

            <h3 className="text-5xl font-semibold">
              ₹3.8L
            </h3>

          </div>

          <div className="bg-white rounded-[30px] p-8 shadow-sm">

            <p className="text-black/50 mb-4">
              Total Bookings
            </p>

            <h3 className="text-5xl font-semibold">
              128
            </h3>

          </div>

        </div>

        {/* Hotel Card */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm">

          <div className="flex items-center justify-between mb-8">

            <div>

              <p className="uppercase tracking-[4px] text-sm text-black/40 mb-2">
                Active Listing
              </p>

              <h3 className="text-3xl font-semibold text-[#1a1a1a]">
                Niels Grand Resort
              </h3>

            </div>

            <button className="border border-black/10 px-5 py-3 rounded-full hover:bg-black hover:text-white transition">
              Edit Hotel
            </button>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            <div>
              <p className="text-black/40 text-sm mb-2">
                Location
              </p>

              <h4 className="font-medium">
                Goa, India
              </h4>
            </div>

            <div>
              <p className="text-black/40 text-sm mb-2">
                Price Per Night
              </p>

              <h4 className="font-medium">
                ₹12,500
              </h4>
            </div>

            <div>
              <p className="text-black/40 text-sm mb-2">
                Occupancy
              </p>

              <h4 className="font-medium">
                82%
              </h4>
            </div>

            <div>
              <p className="text-black/40 text-sm mb-2">
                Rating
              </p>

              <h4 className="font-medium">
                4.9 ★
              </h4>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}