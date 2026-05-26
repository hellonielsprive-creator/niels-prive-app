"use client";

import { useEffect, useState } from "react";
import { listenToAllHotels } from "@/lib/firestore/admin";
import {
  updateHotelStatus,
  updateHotelFeatured,
  updateHotelPriority,
  updateHotelVisibility,
  updateHotelCommission,
  archiveHotel,
  restoreHotel,
} from "@/lib/firestore/admin-hotels";

export default function AdminXHotelsPage() {
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = listenToAllHotels((data) => {
      setHotels(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    await updateHotelStatus(id, status);
  };

  const handleToggleFeatured = async (id: string, current: boolean) => {
    await updateHotelFeatured(id, !current);
  };

  const handleUpdatePriority = async (id: string, score: number) => {
    await updateHotelPriority(id, score);
  };

  const handleUpdateVisibility = async (id: string, level: string) => {
    await updateHotelVisibility(id, level);
  };

  const handleUpdateCommission = async (id: string, rate: number) => {
    await updateHotelCommission(id, rate);
  };

  const handleArchive = async (id: string) => {
    await archiveHotel(id);
  };

  const handleRestore = async (id: string) => {
    await restoreHotel(id);
  };

  if (loading) {
    return (
      <div className="p-10 flex items-center justify-center min-h-[50vh]">
        <p className="text-white/50 text-lg">Loading hotels...</p>
      </div>
    );
  }

  return (
    <div className="p-10">
      <div className="mb-12">
        <p className="text-[#d4a574] tracking-[0.3em] text-xs mb-3">
          ADMINX
        </p>
        <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
          Hotels
        </h2>
      </div>

      <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8">
        <h3 className="text-2xl font-semibold mb-6">Hotel Management</h3>
        <div className="space-y-6">
          {hotels.length > 0 ? (
            hotels.map((hotel) => (
              <div
                key={hotel.id}
                className={`p-6 rounded-2xl border transition-all ${
                  hotel.archived
                    ? "border-white/5 bg-white/[0.01]"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-6 mb-4">
                  <div>
                    <h4 className="text-xl font-medium text-white mb-1">
                      {hotel.name || hotel.title || "Unnamed Hotel"}
                    </h4>
                    <p className="text-white/40 text-sm">
                      {hotel.location || hotel.city || "Unknown location"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {hotel.archived ? (
                      <button
                        onClick={() => hotel.id && handleRestore(hotel.id)}
                        className="px-4 py-2 rounded-xl border border-[#d4a574]/30 text-[#d4a574] hover:bg-[#d4a574]/10 transition-all text-sm"
                      >
                        Restore
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => hotel.id && handleToggleFeatured(hotel.id, hotel.featured || false)}
                          className={`px-4 py-2 rounded-xl border transition-all text-sm ${
                            hotel.featured
                              ? "bg-[#d4a574] text-black border-[#d4a574]"
                              : "border-white/20 text-white/60 hover:border-white/40"
                          }`}
                        >
                          {hotel.featured ? "Featured" : "Feature"}
                        </button>
                        <button
                          onClick={() => hotel.id && handleArchive(hotel.id)}
                          className="px-4 py-2 rounded-xl border border-white/20 text-white/40 hover:border-white/40 hover:text-white/60 transition-all text-sm"
                        >
                          Archive
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {!hotel.archived && (
                  <div className="grid md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <label className="text-xs text-white/40 mb-2 block">
                        Status
                      </label>
                      <select
                        value={hotel.status || "active"}
                        onChange={(e) =>
                          hotel.id && handleUpdateStatus(hotel.id, e.target.value)
                        }
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2 text-white outline-none text-sm"
                      >
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="suspended">Suspended</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-white/40 mb-2 block">
                        Priority Score
                      </label>
                      <input
                        type="number"
                        value={hotel.priorityScore || 0}
                        onChange={(e) =>
                          hotel.id &&
                          handleUpdatePriority(hotel.id, Number(e.target.value))
                        }
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2 text-white outline-none text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-white/40 mb-2 block">
                        Visibility
                      </label>
                      <select
                        value={hotel.visibilityLevel || "normal"}
                        onChange={(e) =>
                          hotel.id && handleUpdateVisibility(hotel.id, e.target.value)
                        }
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2 text-white outline-none text-sm"
                      >
                        <option value="hidden">Hidden</option>
                        <option value="low">Low</option>
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                        <option value="featured">Featured</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-white/40 mb-2 block">
                        Commission (%)
                      </label>
                      <input
                        type="number"
                        value={hotel.commissionRate || 12}
                        onChange={(e) =>
                          hotel.id &&
                          handleUpdateCommission(hotel.id, Number(e.target.value))
                        }
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2 text-white outline-none text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-white/40">No hotels yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
