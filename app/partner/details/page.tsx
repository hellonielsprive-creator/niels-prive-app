"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import {
  auth,
  db,
} from "@/app/firebase/config";
import { updatePartnerProfile } from "@/lib/firestore/partners";

import {
  Building2,
  Globe,
  MapPinned,
  Map,
  Mail,
  Phone,
  Wallet,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Hotel,
  Moon,
  Sun,
} from "lucide-react";

export default function PartnerDetailsPage() {

  const router = useRouter();

  const [darkMode, setDarkMode] =
    useState(true);

  const [selectedType, setSelectedType] =
    useState("");

  const [propertyName, setPropertyName] =
    useState("");

  const [country, setCountry] =
    useState("");

  const [stateRegion, setStateRegion] =
    useState("");

  const [pincode, setPincode] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [businessEmail, setBusinessEmail] =
    useState("");

  const [phoneNumber, setPhoneNumber] =
    useState("");

  const [priceRange, setPriceRange] =
    useState("");

  const propertyTypes = [

    "Luxury Hotel",
    "Standard Hotel",
    "Beachfront Resort",
    "Private Villa",
    "Boutique Hotel",
    "Business Hotel",
    "Apartment Stay",
    "Serviced Apartment",
    "Family Resort",
    "Wellness Retreat",
    "Island Resort",
    "Mountain Resort",
    "Eco Resort",
    "Safari Lodge",
    "Heritage Property",
    "Glamping Stay",

  ];

  const countries = [

    "India",
    "United Arab Emirates",
    "United States",
    "United Kingdom",
    "France",
    "Italy",
    "Switzerland",
    "Maldives",
    "Thailand",
    "Indonesia",
    "Japan",
    "Singapore",
    "Australia",
    "Saudi Arabia",
    "Qatar",
    "Turkey",
    "Mauritius",
    "Seychelles",
    "South Africa",
    "Greece",

  ];

  const handleSubmit = async () => {

    try {

      const currentUser =
        auth.currentUser;

      if (!currentUser) {

        alert(
          "Please sign in"
        );

        return;

      }

      console.log("Partner details: Current user uid:", currentUser.uid);

      await updatePartnerProfile(
        currentUser.uid,
        {
          propertyType: selectedType,
          propertyName,
          country,
          stateRegion,
          pincode,
          address,
          businessEmail,
          phoneNumber,
          priceRange,
        },
        businessEmail
      );

      console.log("Partner details: Partner profile updated");

      console.log("Partner details: Checking existing hotels for partner...");
      const hotelsQuery = query(
        collection(db, "hotels"),
        where("partnerId", "==", currentUser.uid)
      );
      const hotelsSnapshot = await getDocs(hotelsQuery);
      console.log("Partner details: Found", hotelsSnapshot.size, "hotels");

      if (hotelsSnapshot.empty) {
        console.log("Partner details: No hotels found, creating new hotel...");
        const hotelRef = await addDoc(collection(db, "hotels"), {
          name: propertyName,
          partnerId: currentUser.uid,
          createdAt: new Date(),
        });
        console.log("Partner details: Created hotel doc with id:", hotelRef.id);
      }

      alert(
        "Partner Details Saved Successfully"
      );

      console.log("Partner details: Redirecting to /partner/dashboard");
      router.push(
        "/partner/dashboard"
      );

    } catch (error) {

      console.error("Partner details: Error in handleSubmit:", error);

      alert(
        "Something went wrong"
      );

    }

  };

  return (

    <main
      className={`min-h-screen overflow-hidden transition-all duration-500 ${
        darkMode
          ? "bg-[#050505] text-white"
          : "bg-[#f5f0e7] text-black"
      }`}
    >

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-200px] left-[-120px] w-[520px] h-[520px] rounded-full bg-[#d4a574]/20 blur-[140px]" />

        <div className="absolute bottom-[-220px] right-[-120px] w-[520px] h-[520px] rounded-full bg-[#8b5e34]/20 blur-[140px]" />

      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-8">

        <div className="flex justify-end mb-10">

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className={`flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all ${
              darkMode
                ? "bg-white/[0.04] border-white/10 hover:bg-white/[0.08]"
                : "bg-black/[0.04] border-black/10 hover:bg-black/[0.08]"
            }`}
          >

            {darkMode ? (
              <>
                <Sun size={18} />
                <span>Day View</span>
              </>
            ) : (
              <>
                <Moon size={18} />
                <span>Night View</span>
              </>
            )}

          </button>

        </div>

        <div className="grid lg:grid-cols-[1fr_0.95fr] gap-16 items-center min-h-screen">

          <div>

            <p className="tracking-[0.35em] text-[#d4a574] text-sm mb-8">

              NIELS PRIVÉ PARTNERS

            </p>

            <h1 className="text-7xl lg:text-8xl font-semibold leading-[0.95] mb-10">

              The Future
              <br />
              Of Luxury
              <br />
              Hospitality
              <br />
              Starts Here.

            </h1>

            <p className={`text-xl leading-10 max-w-2xl mb-14 ${
              darkMode
                ? "text-neutral-400"
                : "text-neutral-700"
            }`}>

              Curated onboarding for exceptional hotels,
              resorts, villas, and modern stays built for
              the next generation of global travelers.

            </p>

            <div className="grid grid-cols-3 gap-5">

              <div className={`rounded-[30px] p-7 border backdrop-blur-xl ${
                darkMode
                  ? "bg-white/[0.03] border-white/10"
                  : "bg-white/70 border-black/10"
              }`}>

                <Sparkles
                  size={28}
                  className="text-[#d4a574] mb-6"
                />

                <h3 className="text-2xl font-semibold mb-3">

                  Premium

                </h3>

                <p className={`leading-7 text-sm ${
                  darkMode
                    ? "text-neutral-400"
                    : "text-neutral-700"
                }`}>

                  Curated luxury hospitality experiences.

                </p>

              </div>

              <div className={`rounded-[30px] p-7 border backdrop-blur-xl ${
                darkMode
                  ? "bg-white/[0.03] border-white/10"
                  : "bg-white/70 border-black/10"
              }`}>

                <ShieldCheck
                  size={28}
                  className="text-[#d4a574] mb-6"
                />

                <h3 className="text-2xl font-semibold mb-3">

                  Trusted

                </h3>

                <p className={`leading-7 text-sm ${
                  darkMode
                    ? "text-neutral-400"
                    : "text-neutral-700"
                }`}>

                  Smart onboarding with verification systems.

                </p>

              </div>

              <div className={`rounded-[30px] p-7 border backdrop-blur-xl ${
                darkMode
                  ? "bg-white/[0.03] border-white/10"
                  : "bg-white/70 border-black/10"
              }`}>

                <Hotel
                  size={28}
                  className="text-[#d4a574] mb-6"
                />

                <h3 className="text-2xl font-semibold mb-3">

                  Global

                </h3>

                <p className={`leading-7 text-sm ${
                  darkMode
                    ? "text-neutral-400"
                    : "text-neutral-700"
                }`}>

                  Reach travelers across worldwide destinations.

                </p>

              </div>

            </div>

          </div>

          <div>

            <div className={`rounded-[40px] p-10 border backdrop-blur-2xl ${
              darkMode
                ? "bg-white/[0.03] border-white/10"
                : "bg-white/75 border-black/10"
            }`}>

              <div className="flex items-center justify-between mb-12">

                <div>

                  <p className="tracking-[0.3em] text-[#d4a574] text-sm mb-3">

                    STEP 01

                  </p>

                  <h2 className="text-4xl font-semibold">

                    Property Details

                  </h2>

                </div>

                <div className="w-16 h-16 rounded-2xl bg-[#d4a574] text-black flex items-center justify-center">

                  <Building2 size={28} />

                </div>

              </div>

              <div className="mb-10">

                <label className={`text-sm mb-4 block ${
                  darkMode
                    ? "text-neutral-400"
                    : "text-neutral-700"
                }`}>

                  Property Type

                </label>

                <div className="grid grid-cols-2 gap-4">

                  {propertyTypes.map((type) => (

                    <button
                      type="button"
                      key={type}
                      onClick={() =>
                        setSelectedType(type)
                      }
                      className={`rounded-2xl p-5 text-left border transition-all ${
                        selectedType === type
                          ? "bg-[#d4a574] text-black border-[#d4a574]"
                          : darkMode
                          ? "bg-white/[0.03] border-white/10 hover:border-[#d4a574]"
                          : "bg-black/[0.03] border-black/10 hover:border-[#d4a574]"
                      }`}
                    >

                      {type}

                    </button>

                  ))}

                </div>

              </div>

              <div className="space-y-6">

                <div className="relative">

                  <Building2
                    size={20}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500"
                  />

                  <input
                    value={propertyName}
                    onChange={(e) =>
                      setPropertyName(
                        e.target.value
                      )
                    }
                    placeholder="Property Name"
                    className={`w-full rounded-2xl pl-14 pr-5 py-5 outline-none border transition-all ${
                      darkMode
                        ? "bg-white/[0.03] border-white/10 focus:border-[#d4a574]"
                        : "bg-white border-black/10 focus:border-[#d4a574]"
                    }`}
                  />

                </div>

                <div className="relative">

                  <Globe
                    size={20}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500"
                  />

                  <input
                    list="countries"
                    value={country}
                    onChange={(e) =>
                      setCountry(
                        e.target.value
                      )
                    }
                    placeholder="Type Country Name"
                    className={`w-full rounded-2xl pl-14 pr-5 py-5 outline-none border transition-all ${
                      darkMode
                        ? "bg-white/[0.03] border-white/10 focus:border-[#d4a574]"
                        : "bg-white border-black/10 focus:border-[#d4a574]"
                    }`}
                  />

                  <datalist id="countries">

                    {countries.map((country) => (

                      <option
                        key={country}
                        value={country}
                      />

                    ))}

                  </datalist>

                </div>

                <div className="grid grid-cols-2 gap-6">

                  <div className="relative">

                    <Map
                      size={20}
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500"
                    />

                    <input
                      value={stateRegion}
                      onChange={(e) =>
                        setStateRegion(
                          e.target.value
                        )
                      }
                      placeholder="State / Region"
                      className={`w-full rounded-2xl pl-14 pr-5 py-5 outline-none border transition-all ${
                        darkMode
                          ? "bg-white/[0.03] border-white/10 focus:border-[#d4a574]"
                          : "bg-white border-black/10 focus:border-[#d4a574]"
                      }`}
                    />

                  </div>

                  <div className="relative">

                    <MapPinned
                      size={20}
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500"
                    />

                    <input
                      value={pincode}
                      onChange={(e) =>
                        setPincode(
                          e.target.value
                        )
                      }
                      placeholder="Pin Code"
                      className={`w-full rounded-2xl pl-14 pr-5 py-5 outline-none border transition-all ${
                        darkMode
                          ? "bg-white/[0.03] border-white/10 focus:border-[#d4a574]"
                        : "bg-white border-black/10 focus:border-[#d4a574]"
                      }`}
                    />

                  </div>

                </div>

                <textarea
                  value={address}
                  onChange={(e) =>
                    setAddress(
                      e.target.value
                    )
                  }
                  placeholder="Street, Landmark, Building Name..."
                  className={`w-full h-[140px] resize-none rounded-2xl px-6 py-5 outline-none border transition-all ${
                    darkMode
                      ? "bg-white/[0.03] border-white/10 focus:border-[#d4a574]"
                      : "bg-white border-black/10 focus:border-[#d4a574]"
                  }`}
                />

                <div className="grid grid-cols-2 gap-6">

                  <div className="relative">

                    <Mail
                      size={20}
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500"
                    />

                    <input
                      value={businessEmail}
                      onChange={(e) =>
                        setBusinessEmail(
                          e.target.value
                        )
                      }
                      placeholder="Business Email"
                      className={`w-full rounded-2xl pl-14 pr-5 py-5 outline-none border transition-all ${
                        darkMode
                          ? "bg-white/[0.03] border-white/10 focus:border-[#d4a574]"
                          : "bg-white border-black/10 focus:border-[#d4a574]"
                      }`}
                    />

                  </div>

                  <div className="relative">

                    <Phone
                      size={20}
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500"
                    />

                    <input
                      value={phoneNumber}
                      onChange={(e) =>
                        setPhoneNumber(
                          e.target.value
                        )
                      }
                      placeholder="+1 / +44 / +91"
                      className={`w-full rounded-2xl pl-14 pr-5 py-5 outline-none border transition-all ${
                        darkMode
                          ? "bg-white/[0.03] border-white/10 focus:border-[#d4a574]"
                          : "bg-white border-black/10 focus:border-[#d4a574]"
                      }`}
                    />

                  </div>

                </div>

                <div className="relative">

                  <Wallet
                    size={20}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500"
                  />

                  <input
                    value={priceRange}
                    onChange={(e) =>
                      setPriceRange(
                        e.target.value
                      )
                    }
                    placeholder="Starting Price Range ($$)"
                    className={`w-full rounded-2xl pl-14 pr-5 py-5 outline-none border transition-all ${
                      darkMode
                        ? "bg-white/[0.03] border-white/10 focus:border-[#d4a574]"
                        : "bg-white border-black/10 focus:border-[#d4a574]"
                    }`}
                  />

                </div>

              </div>

              <button
                onClick={handleSubmit}
                className="w-full mt-10 bg-[#d4a574] hover:bg-[#c3925c] transition-all rounded-2xl py-5 text-black font-semibold text-lg flex items-center justify-center gap-3"
              >

                Continue To Dashboard

                <ChevronRight size={22} />

              </button>

            </div>

          </div>

        </div>

      </section>

    </main>

  );

}