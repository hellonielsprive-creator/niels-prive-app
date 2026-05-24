"use client";

import { memo } from "react";

import {
  Building2,
  BadgeCheck,
  Globe,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

function PropertyOverview({
  partnerData,
  luxuryMode,
  showPropertyOverview,
}: any) {

  if (!showPropertyOverview) {
    return null;
  }

  return (

    <div
      className={`rounded-[35px] p-10 mb-10 transition-all duration-300 border ${
        luxuryMode
          ? "border-[#e7dccd] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)]"
          : "border-[#d4a574]/20 bg-gradient-to-br from-[#1b1711] to-[#12100d]"
      }`}
    >

      <div className="flex items-center justify-between mb-10">

        <div>

          <p className="tracking-[0.3em] text-[#d4a574] text-xs mb-4">

            LIVE PROPERTY DATA

          </p>

          <h2 className="text-5xl font-semibold">

            {partnerData?.propertyName}

          </h2>

        </div>

        <div className="w-20 h-20 rounded-3xl bg-[#d4a574] text-black flex items-center justify-center">

          <Building2 size={38} />

        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div
          className={`rounded-3xl p-6 border transition-all ${
            luxuryMode
              ? "bg-[#faf7f2] border-[#ece3d7]"
              : "bg-white/[0.03] border-white/10"
          }`}
        >

          <div className="flex items-center gap-3 mb-4">

            <BadgeCheck
              size={20}
              className="text-[#d4a574]"
            />

            <p
              className={`${
                luxuryMode
                  ? "text-neutral-500"
                  : "text-neutral-400"
              }`}
            >

              Property Type

            </p>

          </div>

          <h3 className="text-2xl font-semibold">

            {partnerData?.propertyType}

          </h3>

        </div>

        <div
          className={`rounded-3xl p-6 border transition-all ${
            luxuryMode
              ? "bg-[#faf7f2] border-[#ece3d7]"
              : "bg-white/[0.03] border-white/10"
          }`}
        >

          <div className="flex items-center gap-3 mb-4">

            <Globe
              size={20}
              className="text-[#d4a574]"
            />

            <p
              className={`${
                luxuryMode
                  ? "text-neutral-500"
                  : "text-neutral-400"
              }`}
            >

              Country

            </p>

          </div>

          <h3 className="text-2xl font-semibold">

            {partnerData?.country}

          </h3>

        </div>

        <div
          className={`rounded-3xl p-6 border transition-all ${
            luxuryMode
              ? "bg-[#faf7f2] border-[#ece3d7]"
              : "bg-white/[0.03] border-white/10"
          }`}
        >

          <div className="flex items-center gap-3 mb-4">

            <Mail
              size={20}
              className="text-[#d4a574]"
            />

            <p
              className={`${
                luxuryMode
                  ? "text-neutral-500"
                  : "text-neutral-400"
              }`}
            >

              Business Email

            </p>

          </div>

          <h3 className="text-xl font-semibold break-all">

            {partnerData?.businessEmail}

          </h3>

        </div>

        <div
          className={`rounded-3xl p-6 border transition-all ${
            luxuryMode
              ? "bg-[#faf7f2] border-[#ece3d7]"
              : "bg-white/[0.03] border-white/10"
          }`}
        >

          <div className="flex items-center gap-3 mb-4">

            <Phone
              size={20}
              className="text-[#d4a574]"
            />

            <p
              className={`${
                luxuryMode
                  ? "text-neutral-500"
                  : "text-neutral-400"
              }`}
            >

              Phone Number

            </p>

          </div>

          <h3 className="text-2xl font-semibold">

            {partnerData?.phoneNumber}

          </h3>

        </div>

        <div
          className={`rounded-3xl p-6 border transition-all md:col-span-2 ${
            luxuryMode
              ? "bg-[#faf7f2] border-[#ece3d7]"
              : "bg-white/[0.03] border-white/10"
          }`}
        >

          <div className="flex items-center gap-3 mb-4">

            <MapPin
              size={20}
              className="text-[#d4a574]"
            />

            <p
              className={`${
                luxuryMode
                  ? "text-neutral-500"
                  : "text-neutral-400"
              }`}
            >

              Full Address

            </p>

          </div>

          <h3 className="text-xl font-semibold leading-10">

            {partnerData?.address}

          </h3>

        </div>

      </div>

    </div>

  );
}

export default memo(PropertyOverview);