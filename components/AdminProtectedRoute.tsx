"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore, isAdmin } from "@/store/authStore";

interface AdminProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function AdminProtectedRoute({
  children,
  redirectTo = "/login",
}: AdminProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, user, token } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      // Check if user is authenticated
      if (!isAuthenticated || !token) {
        router.push(redirectTo);
        return;
      }

      // Check if user is admin
      if (!isAdmin()) {
        router.push("/member-dashboard"); // Redirect to member dashboard if not admin
        return;
      }

      setIsChecking(false);
    };

    // Small delay to ensure Zustand store is hydrated
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, [isAuthenticated, token, router, redirectTo]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">
            Verifying admin access...
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
        </div>
      </div>
    );
  }

  // If we reach here, user is authenticated and is admin
  return <>{children}</>;
}




