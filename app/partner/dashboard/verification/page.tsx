"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  ShieldCheck,
  Building2,
  FileText,
  Globe,
  Phone,
  Mail,
  User,
  BadgeCheck,
  LifeBuoy,
} from "lucide-react";

import {
  addDoc,
  collection,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { useDashboardData } from "@/app/components/dashboard/DashboardProvider";

export default function VerificationPage() {

  const router = useRouter();

  const { partnerId } = useDashboardData();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({

      businessName: "",
      ownerName: "",
      businessEmail: "",
      phoneNumber: "",
      country: "",
      propertyType: "",
      gstNumber: "",

    });

  const handleChange = (
    e: any
  ) => {

    setFormData({

      ...formData,
      [e.target.name]:
        e.target.value,

    });

  };

  const handleSubmit =
    async () => {

      try {

        if (!partnerId) {
          alert("Please sign in");
          return;
        }

        setLoading(true);

        await addDoc(
          collection(
            db,
            "partnerVerification"
          ),
          {
            ...formData,
            partnerId,
            status: "Under Review",
            submittedAt: new Date(),
          }
        );

        alert(
          "Verification Submitted Successfully"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed To Submit Verification"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <main className="min-h-screen bg-[#050505] text-white">

      <section className="max-w-7xl mx-auto px-8 py-10">

        {/* HEADER */}

        <div className="mb-14">

          <p className="tracking-[0.3em] text-[#d4a574] text-xs mb-4">

            PARTNER TRUST CENTER

          </p>

          <button
            onClick={() =>
              router.push(
                "/partner/dashboard"
              )
            }
            className="mb-6 px-5 py-3 rounded-2xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] transition-all"
          >

            ← Back To Dashboard

          </button>

          <h1 className="text-5xl font-semibold leading-tight">

            Verification &
            <br />
            Partner Trust

          </h1>

          <p className="text-white/45 mt-5 leading-8 max-w-3xl">

            Complete your luxury hospitality
            verification process to unlock
            trusted visibility,
            payouts,
            and premium platform access.

          </p>

        </div>

        {/* STATUS */}

        <div className="rounded-[35px] border border-[#d4a574]/20 bg-[#d4a574]/10 p-8 mb-10">

          <div className="flex items-center gap-5">

            <div className="w-16 h-16 rounded-2xl bg-black/20 flex items-center justify-center">

              <ShieldCheck
                className="text-[#d4a574]"
                size={30}
              />

            </div>

            <div>

              <p className="text-white/45 mb-2">

                Verification Status

              </p>

              <h2 className="text-3xl font-semibold">

                Under Review

              </h2>

            </div>

          </div>

        </div>

        {/* MAIN GRID */}

        <div className="grid lg:grid-cols-3 gap-8">

          {/* FORM */}

          <div className="lg:col-span-2 rounded-[35px] border border-white/10 bg-white/[0.03] p-8">

            <div className="mb-10">

              <p className="tracking-[0.3em] text-[#d4a574] text-xs mb-3">

                BUSINESS INFORMATION

              </p>

              <h2 className="text-4xl font-semibold">

                Verification Details

              </h2>

            </div>

            <div className="grid md:grid-cols-2 gap-5">

              {/* BUSINESS NAME */}

              <div>

                <p className="text-white/40 text-sm mb-3">

                  Business Name

                </p>

                <div className="relative">

                  <Building2
                    size={18}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30"
                  />

                  <input
                    type="text"
                    name="businessName"
                    value={
                      formData.businessName
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Luxury Hospitality Group"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-14 pr-5 py-4 outline-none"
                  />

                </div>

              </div>

              {/* OWNER */}

              <div>

                <p className="text-white/40 text-sm mb-3">

                  Owner Name

                </p>

                <div className="relative">

                  <User
                    size={18}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30"
                  />

                  <input
                    type="text"
                    name="ownerName"
                    value={
                      formData.ownerName
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="John Doe"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-14 pr-5 py-4 outline-none"
                  />

                </div>

              </div>

              {/* EMAIL */}

              <div>

                <p className="text-white/40 text-sm mb-3">

                  Business Email

                </p>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30"
                  />

                  <input
                    type="email"
                    name="businessEmail"
                    value={
                      formData.businessEmail
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="contact@luxury.com"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-14 pr-5 py-4 outline-none"
                  />

                </div>

              </div>

              {/* PHONE */}

              <div>

                <p className="text-white/40 text-sm mb-3">

                  Phone Number

                </p>

                <div className="relative">

                  <Phone
                    size={18}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30"
                  />

                  <input
                    type="text"
                    name="phoneNumber"
                    value={
                      formData.phoneNumber
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="+91 9876543210"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-14 pr-5 py-4 outline-none"
                  />

                </div>

              </div>

              {/* COUNTRY */}

              <div>

                <p className="text-white/40 text-sm mb-3">

                  Country

                </p>

                <div className="relative">

                  <Globe
                    size={18}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30"
                  />

                  <input
                    type="text"
                    name="country"
                    value={
                      formData.country
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="India"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-14 pr-5 py-4 outline-none"
                  />

                </div>

              </div>

              {/* PROPERTY TYPE */}

              <div>

                <p className="text-white/40 text-sm mb-3">

                  Property Type

                </p>

                <div className="relative">

                  <BadgeCheck
                    size={18}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30"
                  />

                  <input
                    type="text"
                    name="propertyType"
                    value={
                      formData.propertyType
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Luxury Resort"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-14 pr-5 py-4 outline-none"
                  />

                </div>

              </div>

              {/* GST */}

              <div className="md:col-span-2">

                <p className="text-white/40 text-sm mb-3">

                  GST / Tax Registration ID

                </p>

                <div className="relative">

                  <FileText
                    size={18}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30"
                  />

                  <input
                    type="text"
                    name="gstNumber"
                    value={
                      formData.gstNumber
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter Tax Registration Number"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-14 pr-5 py-4 outline-none"
                  />

                </div>

              </div>

            </div>

            {/* BUTTON */}

            <button
              onClick={
                handleSubmit
              }
              disabled={loading}
              className="w-full mt-10 bg-[#d4a574] hover:bg-[#c3925c] transition-all text-black py-5 rounded-2xl font-medium text-lg"
            >

              {loading
                ? "Submitting Verification..."
                : "Submit Verification"}

            </button>

          </div>

          {/* SIDEBAR */}

          <div className="space-y-8">

            {/* PROGRESS */}

            <div className="rounded-[35px] border border-white/10 bg-white/[0.03] p-8">

              <p className="tracking-[0.3em] text-[#d4a574] text-xs mb-4">

                PROFILE COMPLETION

              </p>

              <h2 className="text-5xl font-semibold mb-6">

                75%

              </h2>

              <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">

                <div className="w-[75%] h-full bg-[#d4a574]" />

              </div>

              <p className="text-white/45 leading-8 mt-6">

                Complete verification to unlock
                trusted visibility and
                hospitality operations access.

              </p>

            </div>

            {/* SUPPORT */}

            <div className="rounded-[35px] border border-white/10 bg-white/[0.03] p-8">

              <div className="w-16 h-16 rounded-2xl bg-[#d4a574]/10 border border-[#d4a574]/20 flex items-center justify-center mb-6">

                <LifeBuoy
                  className="text-[#d4a574]"
                />

              </div>

              <p className="tracking-[0.3em] text-[#d4a574] text-xs mb-4">

                SUPPORT

              </p>

              <h2 className="text-3xl font-semibold mb-5">

                Need Assistance?

              </h2>

              <p className="text-white/45 leading-8 mb-8">

                Contact Niels Privé support for
                verification guidance,
                onboarding help,
                and premium hospitality assistance.

              </p>

              <button className="w-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-all py-4 rounded-2xl">

                Contact Support

              </button>

            </div>

          </div>

        </div>

      </section>

    </main>

  );

}