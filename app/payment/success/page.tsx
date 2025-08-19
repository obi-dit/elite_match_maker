import PaymentSuccess from "@/components/payment-success";
import { Suspense } from "react";

// Define the type for searchParams
type PageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

// Ensure dynamic rendering for query parameters
export const dynamic = "force-dynamic";

export default async function PaymentSuccessPage({ searchParams }: PageProps) {
  // Resolve the searchParams Promise
  const resolvedSearchParams = await searchParams;
  const sessionId = resolvedSearchParams.session_id;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading payment details...</p>
          </div>
        </div>
      }
    >
      <PaymentSuccess sessionId={sessionId} />
    </Suspense>
  );
}
