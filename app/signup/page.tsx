"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Mail,
  Lock,
  User,
  Building2,
  ArrowRight,
  ShieldCheck,
  Globe2,
  Sparkles,
} from "lucide-react";

import {
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "@/app/firebase/config";

import { useRouter } from "next/navigation";

export default function SignupPage() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSignup = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert(
        "Welcome to Niels Privé"
      );

      router.push(
        "/partner/details"
      );

    } catch (error: any) {

      alert(error.message);

    } finally {

      setLoading(false);

    }

  };

  return (

    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND */}

      <div className="absolute inset-0">

        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury"
          className="w-full h-full object-cover opacity-20"
        />

        <div className="absolute inset-0 bg-black/75" />

      </div>

      {/* CONTENT */}

      <section className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">

        <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT SIDE */}

          <div>

            <p className="tracking-[0.4em] text-[#d4a574] text-xs mb-6">

              NIELS PRIVÉ PARTNERS

            </p>

            <h1 className="text-6xl leading-[1.05] font-semibold mb-8">

              Build The Future
              <br />
              Of Luxury Hospitality

            </h1>

            <p className="text-neutral-300 text-lg leading-9 max-w-2xl mb-10">

              Join a global hospitality platform designed for
              premium hotels, resorts, villas, and curated
              stays. Manage reservations, rooms, pricing,
              media, and guest experiences through one
              intelligent luxury ecosystem.

            </p>

            {/* FEATURE LIST */}

            <div className="space-y-5">

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-2xl bg-[#d4a574]/15 border border-[#d4a574]/30 flex items-center justify-center">

                  <ShieldCheck
                    className="text-[#d4a574]"
                    size={22}
                  />

                </div>

                <div>

                  <h3 className="font-medium text-lg">

                    Secure Partner Infrastructure

                  </h3>

                  <p className="text-neutral-400 text-sm">

                    Protected dashboards with intelligent management systems.

                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-2xl bg-[#d4a574]/15 border border-[#d4a574]/30 flex items-center justify-center">

                  <Globe2
                    className="text-[#d4a574]"
                    size={22}
                  />

                </div>

                <div>

                  <h3 className="font-medium text-lg">

                    Global Luxury Exposure

                  </h3>

                  <p className="text-neutral-400 text-sm">

                    Reach travelers across premium international destinations.

                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-2xl bg-[#d4a574]/15 border border-[#d4a574]/30 flex items-center justify-center">

                  <Sparkles
                    className="text-[#d4a574]"
                    size={22}
                  />

                </div>

                <div>

                  <h3 className="font-medium text-lg">

                    Luxury Experience Platform

                  </h3>

                  <p className="text-neutral-400 text-sm">

                    Cinematic presentation designed for modern hospitality brands.

                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="relative">

            <div className="absolute inset-0 bg-[#d4a574]/10 blur-3xl rounded-full" />

            <div className="relative rounded-[40px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-10">

              <div className="mb-10">

                <p className="tracking-[0.3em] text-[#d4a574] text-xs mb-4">

                  CREATE ACCOUNT

                </p>

                <h2 className="text-4xl font-semibold mb-3">

                  Partner Registration

                </h2>

                <p className="text-neutral-400 leading-8">

                  Create your Niels Privé partner account
                  and access your hospitality dashboard.

                </p>

              </div>

              <form
                onSubmit={handleSignup}
                className="space-y-6"
              >

                {/* FULL NAME */}

                <div>

                  <label className="text-sm text-neutral-300 mb-3 block">

                    Full Name

                  </label>

                  <div className="flex items-center gap-4 bg-white/[0.04] border border-white/10 rounded-2xl px-5 h-16">

                    <User
                      size={20}
                      className="text-[#d4a574]"
                    />

                    <input
                      type="text"
                      placeholder="Your Full Name"
                      className="bg-transparent outline-none w-full text-white placeholder:text-neutral-500"
                      required
                    />

                  </div>

                </div>

                {/* PROPERTY NAME */}

                <div>

                  <label className="text-sm text-neutral-300 mb-3 block">

                    Property / Brand Name

                  </label>

                  <div className="flex items-center gap-4 bg-white/[0.04] border border-white/10 rounded-2xl px-5 h-16">

                    <Building2
                      size={20}
                      className="text-[#d4a574]"
                    />

                    <input
                      type="text"
                      placeholder="Luxury Hotel / Resort"
                      className="bg-transparent outline-none w-full text-white placeholder:text-neutral-500"
                      required
                    />

                  </div>

                </div>

                {/* EMAIL */}

                <div>

                  <label className="text-sm text-neutral-300 mb-3 block">

                    Business Email

                  </label>

                  <div className="flex items-center gap-4 bg-white/[0.04] border border-white/10 rounded-2xl px-5 h-16">

                    <Mail
                      size={20}
                      className="text-[#d4a574]"
                    />

                    <input
                      type="email"
                      placeholder="partner@nielsprive.com"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      className="bg-transparent outline-none w-full text-white placeholder:text-neutral-500"
                      required
                    />

                  </div>

                </div>

                {/* PASSWORD */}

                <div>

                  <label className="text-sm text-neutral-300 mb-3 block">

                    Password

                  </label>

                  <div className="flex items-center gap-4 bg-white/[0.04] border border-white/10 rounded-2xl px-5 h-16">

                    <Lock
                      size={20}
                      className="text-[#d4a574]"
                    />

                    <input
                      type="password"
                      placeholder="Create Secure Password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      className="bg-transparent outline-none w-full text-white placeholder:text-neutral-500"
                      required
                    />

                  </div>

                </div>

                {/* BUTTON */}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-16 rounded-2xl bg-[#d4a574] hover:bg-[#c3925c] transition-all text-black font-semibold flex items-center justify-center gap-3 mt-4"
                >

                  {loading ? (
                    "Creating Account..."
                  ) : (
                    <>
                      Create Partner Account
                      <ArrowRight size={20} />
                    </>
                  )}

                </button>

              </form>

              {/* SIGN IN */}

              <div className="mt-8 text-center">

                <p className="text-neutral-400">

                  Already have a partner account?{" "}

                  <Link
                    href="/signin"
                    className="text-[#d4a574] hover:text-[#e6bb8c] transition-all"
                  >
                    Sign In
                  </Link>

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>

  );

}