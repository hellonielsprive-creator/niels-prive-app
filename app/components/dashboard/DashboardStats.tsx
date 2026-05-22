"use client";

export default function DashboardStats() {

  return (

    <div>
         {/* STATS */}

          <div className="grid grid-cols-4 gap-6">

            <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7">

              <p className="text-neutral-400 mb-4">

                Total Rooms

              </p>

              <h3 className="text-5xl font-semibold mb-3">

                2

              </h3>

              <p className="text-green-400 text-sm">

                +18% this month

              </p>

            </div>

            <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7">

              <p className="text-neutral-400 mb-4">

                Monthly Revenue

              </p>

              <h3 className="text-5xl font-semibold mb-3">

                $48K

              </h3>

              <p className="text-green-400 text-sm">

                +12% growth

              </p>

            </div>

            <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7">

              <p className="text-neutral-400 mb-4">

                Occupancy Rate

              </p>

              <h3 className="text-5xl font-semibold mb-3">

                82%

              </h3>

              <p className="text-green-400 text-sm">

                High demand

              </p>

            </div>

            <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7">

              <p className="text-neutral-400 mb-4">

                Property Status

              </p>

              <h3 className="text-5xl font-semibold mb-3">

                Live

              </h3>

              <p className="text-[#d4a574] text-sm">

                Global visibility active

              </p>

            </div>

          </div>

        </div>

    

  );

}