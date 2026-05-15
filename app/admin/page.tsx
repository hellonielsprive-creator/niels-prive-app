export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex">

      {/* Sidebar */}
      <aside className="w-[260px] border-r border-white/10 p-8">

        <h1 className="text-3xl font-semibold tracking-wide mb-12">
          Niels Privé
        </h1>

        <div className="space-y-6 text-white/70">

          <p className="hover:text-white transition cursor-pointer">
            Dashboard
          </p>

          <p className="hover:text-white transition cursor-pointer">
            Hotels
          </p>

          <p className="hover:text-white transition cursor-pointer">
            Owners
          </p>

          <p className="hover:text-white transition cursor-pointer">
            Commissions
          </p>

          <p className="hover:text-white transition cursor-pointer">
            Analytics
          </p>

          <p className="hover:text-white transition cursor-pointer">
            Settings
          </p>

        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10">

        <div className="flex items-center justify-between mb-10">

          <div>
            <p className="text-white/50 text-sm uppercase tracking-[4px] mb-2">
              Admin Panel
            </p>

            <h2 className="text-5xl font-semibold">
              Dashboard Overview
            </h2>
          </div>

          <button className="bg-[#C8A96B] hover:bg-[#b89555] transition px-6 py-3 rounded-full text-black font-medium">
            Add Hotel
          </button>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

          <div className="bg-white/5 border border-white/10 rounded-[30px] p-8">
            <p className="text-white/50 mb-4">
              Total Hotels
            </p>

            <h3 className="text-5xl font-semibold">
              248
            </h3>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[30px] p-8">
            <p className="text-white/50 mb-4">
              Monthly Revenue
            </p>

            <h3 className="text-5xl font-semibold">
              ₹12.4L
            </h3>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[30px] p-8">
            <p className="text-white/50 mb-4">
              Global Commission
            </p>

            <h3 className="text-5xl font-semibold">
              10%
            </h3>
          </div>

        </div>

        {/* Commission Panel */}
        <div className="bg-white/5 border border-white/10 rounded-[32px] p-10">

          <p className="text-white/50 uppercase tracking-[4px] text-sm mb-3">
            Commission Settings
          </p>

          <h3 className="text-3xl font-semibold mb-8">
            Global Platform Commission
          </h3>

          <div className="flex items-center gap-4">

            <input
              type="number"
              placeholder="10"
              className="bg-white/10 border border-white/10 rounded-xl px-5 py-4 w-[140px] outline-none"
            />

            <span className="text-2xl">
              %
            </span>

            <button className="bg-[#C8A96B] hover:bg-[#b89555] transition px-6 py-4 rounded-xl text-black font-medium">
              Save Changes
            </button>

          </div>

        </div>

      </main>
    </div>
  );
}