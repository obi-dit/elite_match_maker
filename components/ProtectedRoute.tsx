"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireSubscription?: boolean;
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  requireSubscription = false,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const { isAuthenticated, user, token } = useAuthStore();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const publicRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];
  useEffect(() => {
    // Check if we have a token in localStorage (for initial load)
    const checkAuth = () => {
      const hasToken = token || localStorage.getItem("auth-storage");

      if (!hasToken) {
        // No token found, redirect to login immediately
        router.push(redirectTo);
        return;
      }

      if (!isAuthenticated) {
        // Token exists but user not authenticated, redirect to login
        router.push(redirectTo);
        return;
      }

      if (requireSubscription && !user?.isMembershipSubscribed) {
        // User authenticated but no subscription, redirect to membership
        router.push("/become-member");
        return;
      }

      console.log("window.location.pathname", window.location.pathname);

      // All checks passed
      setIsChecking(false);
    };

    // Small delay to ensure store is hydrated
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, [isAuthenticated, user, token, requireSubscription, redirectTo, router]);

  // Show loading spinner while checking authentication
  if (isChecking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Don't render children if not authenticated or subscription required
  if (
    !isAuthenticated ||
    (requireSubscription && !user?.isMembershipSubscribed)
  ) {
    return null;
  }

  return <>{children}</>;
}
