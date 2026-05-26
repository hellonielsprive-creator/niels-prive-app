"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Globe2,
  ShieldCheck,
} from "lucide-react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setVerificationSent(false);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await setDoc(
        doc(db, "users", user.uid),
        {
          fullName,
          email,
          role: "guest",
          emailVerified: false,
          createdAt: new Date().toISOString(),
        },
        { merge: true }
      );

      await sendEmailVerification(user);
      setVerificationSent(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (verificationSent) {
    return (
      <main className="min-h-screen bg-black text-white overflow-hidden relative flex items-center justify-center px-5">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop"
            alt="Luxury"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-black/75" />
        </div>

        <div className="relative z-10 max-w-md text-center">
          <div className="w-20 h-20 rounded-full bg-[#d4a574]/15 border border-[#d4a574]/30 flex items-center justify-center mx-auto mb-8">
            <Mail className="w-10 h-10 text-[#d4a574]" />
          </div>

          <h1 className="text-4xl font-semibold mb-4">
            Verify Your Email
          </h1>
          <p className="text-neutral-400 leading-8 mb-8">
            We've sent a verification email to <span className="text-white">{email}</span>. Please check your inbox and verify your account to continue.
          </p>

          <Link
            href="/signin"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#d4a574] hover:bg-[#c3925c] transition-all text-black font-semibold"
          >
            Go to Sign In
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      <section className="relative z-10 min-h-screen flex items-center justify-center px-5 py-16">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-14 items-center">
          <div className="hidden lg:block">
            <p className="tracking-[0.4em] text-[#d4a574] text-xs mb-6">
              NIELS PRIVÉ
            </p>

            <h1 className="text-6xl leading-[1.05] font-semibold mb-8">
              Luxury Travel
              <br />
              Begins Here
            </h1>

            <p className="text-neutral-300 text-lg leading-9 max-w-2xl mb-10">
              Create your Niels Privé account and
              unlock premium stays,
              curated destinations,
              luxury experiences,
              and elegant travel management.
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#d4a574]/15 border border-[#d4a574]/30 flex items-center justify-center">
                  <Sparkles
                    className="text-[#d4a574]"
                    size={22}
                  />
                </div>

                <div>
                  <h3 className="font-medium text-lg">
                    Curated Luxury Stays
                  </h3>
                  <p className="text-neutral-400 text-sm">
                    Premium hotels, villas, and experiences worldwide.
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
                    Global Destinations
                  </h3>
                  <p className="text-neutral-400 text-sm">
                    Discover handpicked luxury escapes across the world.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#d4a574]/15 border border-[#d4a574]/30 flex items-center justify-center">
                  <ShieldCheck
                    className="text-[#d4a574]"
                    size={22}
                  />
                </div>

                <div>
                  <h3 className="font-medium text-lg">
                    Secure Reservations
                  </h3>
                  <p className="text-neutral-400 text-sm">
                    Trusted booking infrastructure with elegant guest experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-[#d4a574]/10 blur-3xl rounded-full" />

            <div className="relative rounded-[40px] border border-white/10 bg-white/[0.05] backdrop-blur-2xl p-7 md:p-10">
              <div className="mb-10">
                <p className="tracking-[0.3em] text-[#d4a574] text-xs mb-4">
                  CREATE ACCOUNT
                </p>

                <h2 className="text-4xl font-semibold mb-3">
                  Join Niels Privé
                </h2>

                <p className="text-neutral-400 leading-8">
                  Create your account and begin
                  your luxury hospitality journey.
                </p>
              </div>

              <form onSubmit={handleSignup} className="space-y-6">
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
                      value={fullName}
                      onChange={(e) =>
                        setFullName(e.target.value)
                      }
                      className="bg-transparent outline-none w-full text-white placeholder:text-neutral-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-neutral-300 mb-3 block">
                    Email Address
                  </label>
                  <div className="flex items-center gap-4 bg-white/[0.04] border border-white/10 rounded-2xl px-5 h-16">
                    <Mail
                      size={20}
                      className="text-[#d4a574]"
                    />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      className="bg-transparent outline-none w-full text-white placeholder:text-neutral-500"
                      required
                    />
                  </div>
                </div>

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

                {error && (
                  <p className="text-red-400 text-sm">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-16 rounded-2xl bg-[#d4a574] hover:bg-[#c3925c] transition-all text-black font-semibold flex items-center justify-center gap-3"
                >
                  {loading ? (
                    "Creating Account..."
                  ) : (
                    <>
                      Create Account
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-neutral-400">
                  Already have an account?{" "}
                  <Link
                    href="/signin"
                    className="text-[#d4a574] hover:text-[#e6bb8c] transition-all"
                  >
                    Sign In
                  </Link>
                </p>
              </div>

              <div className="mt-5 text-center">
                <Link
                  href="/partner/signup"
                  className="text-sm text-neutral-500 hover:text-[#d4a574] transition-all"
                >
                  Partner with Niels Privé
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
