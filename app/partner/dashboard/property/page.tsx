"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useDashboardData } from "@/app/components/dashboard/DashboardProvider";
import {
  getPartnerByUserId,
  updatePartnerProfile,
} from "@/lib/firestore/partners";

function hydratePartnerForm(
  data: Record<string, unknown>,
  setters: {
    setPropertyName: (v: string) => void;
    setBusinessEmail: (v: string) => void;
    setPhoneNumber: (v: string) => void;
    setAddress: (v: string) => void;
    setPropertyType: (v: string) => void;
    setCountry: (v: string) => void;
    setStateRegion: (v: string) => void;
    setPincode: (v: string) => void;
  }
) {
  setters.setPropertyName(
    String(data.propertyName ?? "")
  );
  setters.setBusinessEmail(
    String(data.businessEmail ?? "")
  );
  setters.setPhoneNumber(
    String(data.phoneNumber ?? "")
  );
  setters.setAddress(String(data.address ?? ""));
  setters.setPropertyType(
    String(data.propertyType ?? "")
  );
  setters.setCountry(String(data.country ?? ""));
  setters.setStateRegion(
    String(data.stateRegion ?? "")
  );
  setters.setPincode(String(data.pincode ?? ""));
}

export default function PropertyPage() {
  const router = useRouter();

  const {
    partnerId,
    partnerData,
    syncAfterMutation,
    patchPartner,
  } = useDashboardData();

  const [loading, setLoading] =
    useState(true);

  const [editing, setEditing] =
    useState(false);

  const [propertyName, setPropertyName] =
    useState("");

  const [businessEmail, setBusinessEmail] =
    useState("");

  const [phoneNumber, setPhoneNumber] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [propertyType, setPropertyType] =
    useState("");

  const [country, setCountry] =
    useState("");

  const [stateRegion, setStateRegion] =
    useState("");

  const [pincode, setPincode] =
    useState("");

  useEffect(() => {
    if (!partnerId) {
      return;
    }

    const setters = {
      setPropertyName,
      setBusinessEmail,
      setPhoneNumber,
      setAddress,
      setPropertyType,
      setCountry,
      setStateRegion,
      setPincode,
    };

    if (partnerData) {
      hydratePartnerForm(partnerData, setters);
      setLoading(false);
      return;
    }

    const fetchProperty = async () => {
      try {
        const partner =
          await getPartnerByUserId(partnerId);

        if (partner) {
          hydratePartnerForm(partner, setters);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    void fetchProperty();
  }, [partnerId, partnerData]);

  const handleSave = async () => {
    if (!partnerId) {
      alert("Please sign in");
      router.push("/signin");
      return;
    }

    const partnerUpdate = {
      propertyName,
      businessEmail,
      phoneNumber,
      address,
      propertyType,
      country,
      stateRegion,
      pincode,
    };

    try {
      await updatePartnerProfile(
        partnerId,
        partnerUpdate
      );

      patchPartner(partnerUpdate);
      await syncAfterMutation();

      alert(
        "Property Updated Successfully"
      );

      setEditing(false);
    } catch (error) {
      console.log(error);

      alert(
        "Failed To Update Property"
      );
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}

        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="tracking-[0.3em] text-[#d4a574] text-sm mb-3">
              NIELS PRIVÉ
            </p>
            <button
              onClick={() =>
                router.push("/partner/dashboard")
              }
              className="mb-6 px-5 py-3 rounded-2xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] transition-all"
            >
              ← Back To Dashboard
            </button>

            <h1 className="text-5xl font-semibold">
              Property
            </h1>

            <p className="text-white/45 mt-4 max-w-2xl leading-8">
              Manage your global hospitality identity,
              property information, and guest-facing details.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                setEditing(!editing)
              }
              className="px-6 py-3 rounded-2xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] transition-all"
            >
              {editing ? "Cancel" : "Edit"}
            </button>

            <button
              onClick={handleSave}
              className="px-6 py-3 rounded-2xl bg-[#d4a574] text-black font-medium hover:bg-[#c3925c] transition-all"
            >
              Save
            </button>
          </div>
        </div>

        {/* PROPERTY CARD */}

        <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* PROPERTY NAME */}

            <div>
              <p className="text-sm text-white/40 mb-3">
                Property Name
              </p>

              <input
                value={propertyName}
                onChange={(e) =>
                  setPropertyName(e.target.value)
                }
                disabled={!editing}
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 outline-none"
              />
            </div>

            {/* PROPERTY TYPE */}

            <div>
              <p className="text-sm text-white/40 mb-3">
                Property Type
              </p>

              <input
                value={propertyType}
                onChange={(e) =>
                  setPropertyType(e.target.value)
                }
                disabled={!editing}
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 outline-none"
              />
            </div>

            {/* BUSINESS EMAIL */}

            <div>
              <p className="text-sm text-white/40 mb-3">
                Business Email
              </p>

              <input
                value={businessEmail}
                onChange={(e) =>
                  setBusinessEmail(e.target.value)
                }
                disabled={!editing}
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 outline-none"
              />
            </div>

            {/* PHONE */}

            <div>
              <p className="text-sm text-white/40 mb-3">
                Phone Number
              </p>

              <input
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(e.target.value)
                }
                disabled={!editing}
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 outline-none"
              />
            </div>

            {/* COUNTRY */}

            <div>
              <p className="text-sm text-white/40 mb-3">
                Country
              </p>

              <input
                value={country}
                onChange={(e) =>
                  setCountry(e.target.value)
                }
                disabled={!editing}
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 outline-none"
              />
            </div>

            {/* STATE */}

            <div>
              <p className="text-sm text-white/40 mb-3">
                State / Region
              </p>

              <input
                value={stateRegion}
                onChange={(e) =>
                  setStateRegion(e.target.value)
                }
                disabled={!editing}
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 outline-none"
              />
            </div>

            {/* PINCODE */}

            <div>
              <p className="text-sm text-white/40 mb-3">
                Pin Code
              </p>

              <input
                value={pincode}
                onChange={(e) =>
                  setPincode(e.target.value)
                }
                disabled={!editing}
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 outline-none"
              />
            </div>

            {/* ADDRESS */}

            <div className="md:col-span-2">
              <p className="text-sm text-white/40 mb-3">
                Address
              </p>

              <textarea
                value={address}
                onChange={(e) =>
                  setAddress(e.target.value)
                }
                disabled={!editing}
                className="w-full h-[140px] resize-none bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
