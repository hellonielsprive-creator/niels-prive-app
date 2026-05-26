"use client";

import { useState } from "react";
import Link from "next/link";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { syncUserToFirestore } from "@/lib/firestore/users";

const handleRoleBasedRedirect = async (user: any, router: any) => {
  try {
    const userData = await syncUserToFirestore(user);
    const userRole = userData?.role || "guest";
    
    switch (userRole) {
      case "admin":
      case "super_admin":
        router.push("/adminx");
        break;
      case "partner":
        router.push("/partner/dashboard");
        break;
      default:
        router.push("/");
    }
  } catch (error) {
    console.error("Error in role redirect:", error);
    router.push("/");
  }
};

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setNeedsVerification(false);
    setResendSuccess(false);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      
      if (!user.emailVerified) {
        setNeedsVerification(true);
        setLoading(false);
        return;
      }

      await handleRoleBasedRedirect(user, router);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setNeedsVerification(false);
    const provider = new GoogleAuthProvider();

    try {
      const userCredential = await signInWithPopup(auth, provider);
      await handleRoleBasedRedirect(userCredential.user, router);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email first");
      return;
    }

    setError("");
    setResetSuccess(false);

    try {
      setResetLoading(true);
      await sendPasswordResetEmail(auth, email);
      setResetSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setResetLoading(false);
    }
  };

  const handleResendVerification = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      setResendLoading(true);
      setResendSuccess(false);
      await sendEmailVerification(user);
      setResendSuccess(true);
    } catch (err: any) {
      console.error("Error resending verification:", err);
      setError("Failed to resend verification email");
    } finally {
      setResendLoading(false);
    }
  };

  const handleRefreshVerification = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      setLoading(true);
      setError("");
      await user.reload();
      await syncUserToFirestore(user);

      if (user.emailVerified) {
        await handleRoleBasedRedirect(user, router);
      }
    } catch (err: any) {
      console.error("Error refreshing verification:", err);
      setError("Failed to refresh verification status");
    } finally {
      setLoading(false);
    }
  };

  if (needsVerification) {
    return (
      <main className="min-h-screen bg-[#f8f5ef] flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-3xl p-10 shadow-xl text-center">
          <p className="text-sm tracking-[0.3em] text-neutral-400 uppercase mb-3">
            Niels Privé
          </p>

          <div className="w-20 h-20 rounded-full bg-[#d4a574]/15 border border-[#d4a574]/30 flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-[#d4a574]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <h1 className="text-4xl font-bold text-neutral-900 mb-3">
            Verify Your Email
          </h1>

          <p className="text-neutral-500 mb-8">
            We've sent a verification email to <span className="font-medium text-neutral-900">{email}</span>. Please check your inbox and verify your account to continue.
          </p>

          {resendSuccess && (
            <p className="text-green-600 text-sm mb-6">
              Verification email resent!
            </p>
          )}

          {error && (
            <p className="text-red-500 text-sm mb-6">
              {error}
            </p>
          )}

          <div className="space-y-4">
            <button
              type="button"
              onClick={handleRefreshVerification}
              disabled={loading}
              className="w-full bg-black text-white py-4 rounded-2xl font-medium hover:opacity-90 transition"
            >
              {loading ? "Refreshing..." : "I've Verified My Email"}
            </button>

            <button
              type="button"
              onClick={handleResendVerification}
              disabled={resendLoading}
              className="w-full border border-neutral-300 py-4 rounded-2xl font-medium hover:bg-neutral-100 transition text-neutral-900"
            >
              {resendLoading ? "Resending..." : "Resend Verification Email"}
            </button>

            <button
              type="button"
              onClick={() => setNeedsVerification(false)}
              className="w-full text-neutral-500 py-4 rounded-2xl font-medium hover:text-neutral-900 transition"
            >
              Try a Different Account
            </button>
          </div>
        </div>
      </main>
    );
  }

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

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={resetLoading}
              className="text-sm text-[#d4a574] hover:text-[#c3925c] transition-all"
            >
              {resetLoading ? "Sending Reset..." : "Forgot Password?"}
            </button>
          </div>

          {resetSuccess && (
            <p className="text-green-600 text-sm">
              Password reset email sent!
            </p>
          )}

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

        <div className="mt-8 text-center">
          <p className="text-neutral-500">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#d4a574] hover:text-[#c3925c] transition-all"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
