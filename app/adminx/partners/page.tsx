"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { listenToAllPartners } from "@/lib/firestore/admin";
import {
  updatePartnerStatus,
  updatePartnerCommission,
  archivePartner,
  restorePartner,
} from "@/lib/firestore/admin-partners";
import {
  Building2,
  Calendar,
  CreditCard,
} from "lucide-react";

export default function AdminXPartnersPage() {
  const router = useRouter();
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = listenToAllPartners((data) => {
      setPartners(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    await updatePartnerStatus(id, status);
  };

  const handleUpdateCommission = async (id: string, rate: number) => {
    await updatePartnerCommission(id, rate);
  };

  const handleArchive = async (id: string) => {
    await archivePartner(id);
  };

  const handleRestore = async (id: string) => {
    await restorePartner(id);
  };

  if (loading) {
    return (
      <div className="p-10 flex items-center justify-center min-h-[50vh]">
        <p className="text-white/50 text-lg">Loading partners...</p>
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
          Partners
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {partners.length > 0 ? (
          partners.map((partner) => (
            <div
              key={partner.id}
              className={`bg-white/[0.03] border border-white/10 rounded-[32px] p-8 transition-all hover:bg-white/[0.05] ${
                partner.archived ? "opacity-60" : "cursor-pointer"
              }`}
              onClick={() => !partner.archived && partner.id && router.push(`/adminx/partners/${partner.id}`)}
            >
              <div className="flex flex-wrap items-start justify-between gap-6 mb-6">
                <div>
                  <h4 className="text-2xl font-semibold text-white mb-1">
                    {partner.name || partner.hotelName || partner.fullName || "Unnamed Partner"}
                  </h4>
                  <p className="text-white/40 text-sm">
                    {partner.email || "No email"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {partner.archived ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        partner.id && handleRestore(partner.id);
                      }}
                      className="px-4 py-2 rounded-xl border border-[#d4a574]/30 text-[#d4a574] hover:bg-[#d4a574]/10 transition-all text-sm"
                    >
                      Restore
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        partner.id && handleArchive(partner.id);
                      }}
                      className="px-4 py-2 rounded-xl border border-white/20 text-white/40 hover:border-white/40 hover:text-white/60 transition-all text-sm"
                    >
                      Archive
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white/[0.02] rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className="w-4 h-4 text-[#d4a574]" />
                    <p className="text-white/40 text-xs">Properties</p>
                  </div>
                  <p className="text-2xl font-semibold">0</p>
                </div>
                <div className="bg-white/[0.02] rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-[#d4a574]" />
                    <p className="text-white/40 text-xs">Status</p>
                  </div>
                  <p className="text-2xl font-semibold">
                    {partner.status?.charAt(0).toUpperCase() + partner.status?.slice(1) || "Pending"}
                  </p>
                </div>
                <div className="bg-white/[0.02] rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <CreditCard className="w-4 h-4 text-[#d4a574]" />
                    <p className="text-white/40 text-xs">Commission</p>
                  </div>
                  <p className="text-2xl font-semibold">{partner.commissionRate || 12}%</p>
                </div>
              </div>

              {!partner.archived && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-white/40 mb-2 block">
                      Status
                    </label>
                    <select
                      value={partner.status || "pending"}
                      onChange={(e) => {
                        e.stopPropagation();
                        partner.id && handleUpdateStatus(partner.id, e.target.value);
                      }}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2 text-white outline-none text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-white/40 mb-2 block">
                      Commission (%)
                    </label>
                    <input
                      type="number"
                      value={partner.commissionRate || 12}
                      onChange={(e) => {
                        e.stopPropagation();
                        partner.id &&
                        handleUpdateCommission(partner.id, Number(e.target.value));
                      }}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2 text-white outline-none text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="lg:col-span-2 bg-white/[0.03] border border-white/10 rounded-[32px] p-10 text-center">
            <p className="text-white/40">No partners yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
