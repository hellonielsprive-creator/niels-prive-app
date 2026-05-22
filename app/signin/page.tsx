"use client";

import { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);

      router.push("/partner/dashboard");
    } catch (err: any) {
      setError("Invalid email or password");
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);

      router.push("/partner/dashboard");
    } catch (err: any) {
      console.log(err);
setError(err.message);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f5ef] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-3xl p-10 shadow-xl">

        <p className="text-sm tracking-[0.3em] text-neutral-400 uppercase mb-3">
          Niels Privé
        </p>

        <h1 className="text-4xl font-bold text-neutral-900 mb-2">
          Welcome Back
        </h1>

        <p className="text-neutral-500 mb-8">
          Sign in to continue your luxury experience.
        </p>

        <form onSubmit={handleLogin} className="space-y-5">

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border border-neutral-200 rounded-2xl px-5 py-4 outline-none focus:border-black text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-neutral-200 rounded-2xl px-5 py-4 outline-none focus:border-black text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-2xl font-medium hover:opacity-90 transition"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>

        <div className="mt-6">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full border border-neutral-300 py-4 rounded-2xl font-medium hover:bg-neutral-100 transition text-black"
          >
            Continue with Google
          </button>
        </div>

      </div>
    </main>
  );
}