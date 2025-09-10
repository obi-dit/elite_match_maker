"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function StripeSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (sessionId) {
      // Get stored onboarding session data
      const storedSession = localStorage.getItem("onboardingSession");

      if (storedSession) {
        try {
          const sessionData = JSON.parse(storedSession);

          // Redirect to our custom success page with session data
          router.push(
            `/onboarding/success?session_id=${sessionId}&type=${sessionData.userType}`
          );

          // Clean up stored data
          localStorage.removeItem("onboardingSession");
        } catch (error) {
          console.error("Error parsing stored session:", error);
          // Fallback redirect
          router.push(`/onboarding/success?session_id=${sessionId}&type=male`);
        }
      } else {
        // Fallback redirect if no stored data
        router.push(`/onboarding/success?session_id=${sessionId}&type=male`);
      }
    } else {
      // No session ID, redirect to home
      router.push("/");
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">Processing Payment</h2>
        <p className="text-gray-300">Redirecting to your success page...</p>
      </div>
    </div>
  );
}

export default function StripeSuccessRedirect() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Loading</h2>
            <p className="text-gray-300">Please wait...</p>
          </div>
        </div>
      }
    >
      <StripeSuccessContent />
    </Suspense>
  );
}
