"use client";

import { useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Hotel,
  Users,
  CreditCard,
  Bell,
  Activity,
  Settings,
  BarChart3,
  Menu,
  X,
} from "lucide-react";
import { auth, db } from "@/lib/firebase";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { href: "/adminx", label: "Dashboard", icon: Home },
    { href: "/adminx/hotels", label: "Hotels", icon: Hotel },
    { href: "/adminx/partners", label: "Partners", icon: Users },
    { href: "/adminx/bookings", label: "Bookings", icon: CreditCard },
    { href: "/adminx/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/adminx/activity", label: "Activity", icon: Activity },
    { href: "/adminx/notifications", label: "Notifications", icon: Bell },
    { href: "/adminx/settings", label: "Settings", icon: Settings },
  ];

  useEffect(() => {
    let unmounted = false;

    const unsubscribeAuth = onAuthStateChanged(auth, async (user: User | null) => {
      if (unmounted) return;

      if (!user) {
        setLoading(false);
        setTimeout(() => {
          if (!unmounted) router.push("/signin");
        }, 100);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (unmounted) return;

        if (!userDoc.exists()) {
          setLoading(false);
          setTimeout(() => {
            if (!unmounted) router.push("/");
          }, 100);
          return;
        }

        const userData = userDoc.data();
        const role = userData.role;

        if (role === "admin" || role === "super_admin") {
          setIsAuthorized(true);
        } else {
          setLoading(false);
          setTimeout(() => {
            if (!unmounted) router.push("/");
          }, 100);
          return;
        }
      } catch (error) {
        setLoading(false);
        setTimeout(() => {
          if (!unmounted) router.push("/");
        }, 100);
        return;
      } finally {
        if (!unmounted) {
          setLoading(false);
        }
      }
    });

    return () => {
      unmounted = true;
      unsubscribeAuth();
    };
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030304] flex items-center justify-center">
        <p className="text-white/50 text-lg">Verifying access...</p>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#030304]">
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-[200] p-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl"
      >
        {sidebarOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
      </button>

      <div className="flex">
        {/* Sidebar - Desktop & Mobile */}
        <aside
          className={`
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0
            fixed lg:sticky top-0 left-0 z-[190]
            w-64 min-h-screen border-r border-white/5 bg-[#030304]/95 backdrop-blur-2xl p-6
            transition-transform duration-300 ease-in-out
          `}
        >
          <div className="mb-10">
            <h1 className="text-2xl font-light tracking-tight text-white">
              Niels <span className="text-[#d4a574]">Privé</span>
            </h1>
            <p className="text-xs text-white/40 mt-1">AdminX</p>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-300
                    ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/60 z-[180]"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8">{children}</main>
      </div>
    </div>
  );
}
