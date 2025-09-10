"use client";

import { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  ArrowLeft,
  CreditCard,
  User,
  Calendar,
} from "lucide-react";

interface PaymentStatus {
  sessionId: string;
  status: "succeeded" | "pending" | "failed" | "cancelled";
  amount: number;
  currency: string;
  subscriptionTier: string;
  userEmail: string;
  subscriptionId?: string;
  nextBillingDate?: string;
  errorMessage?: string;
}

function PaymentStatusContent() {
  const searchParams = useSearchParams();

  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      setError("No session ID provided");
      setIsLoading(false);
      return;
    }

    // Simulate API call to check payment status
    const checkPaymentStatus = async () => {
      try {
        // In a real app, this would be an API call to your backend
        // const response = await fetch(`/api/payment/status?session_id=${sessionId}`);
        // const data = await response.json();

        // Mock data for demonstration
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const mockStatus: PaymentStatus = {
          sessionId,
          status: "succeeded", // This would come from your payment provider
          amount: 69,
          currency: "USD",
          subscriptionTier: "silver",
          userEmail: "user@example.com",
          subscriptionId: `sub_${Date.now()}`,
          nextBillingDate: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
          ).toLocaleDateString(),
        };

        setPaymentStatus(mockStatus);
      } catch (err) {
        setError("Failed to check payment status");
        console.error("Payment status check error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkPaymentStatus();
  }, [sessionId]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "succeeded":
        return <CheckCircle className="w-12 h-12 text-green-500" />;
      case "pending":
        return <Clock className="w-12 h-12 text-yellow-500" />;
      case "failed":
      case "cancelled":
        return <XCircle className="w-12 h-12 text-red-500" />;
      default:
        return <Clock className="w-12 h-12 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "succeeded":
        return "from-green-500 to-emerald-600";
      case "pending":
        return "from-yellow-500 to-orange-600";
      case "failed":
      case "cancelled":
        return "from-red-500 to-red-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case "succeeded":
        return "Payment Successful!";
      case "pending":
        return "Payment Pending";
      case "failed":
        return "Payment Failed";
      case "cancelled":
        return "Payment Cancelled";
      default:
        return "Unknown Status";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">
            Checking Payment Status
          </h2>
          <p className="text-gray-300">
            Please wait while we verify your payment...
          </p>
        </div>
      </div>
    );
  }

  if (error || !paymentStatus) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-gray-300 mb-6">
            {error || "Payment status not found"}
          </p>
          <Link href="/" className="text-blue-400 hover:text-blue-300">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Status Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-12 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`w-24 h-24 bg-gradient-to-r ${getStatusColor(
            paymentStatus.status
          )} rounded-full flex items-center justify-center mx-auto mb-6`}
        >
          {getStatusIcon(paymentStatus.status)}
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {getStatusMessage(paymentStatus.status)}
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          {paymentStatus.status === "succeeded"
            ? "Your payment has been processed successfully and your membership is now active."
            : paymentStatus.status === "pending"
            ? "Your payment is being processed. This may take a few minutes."
            : "There was an issue with your payment. Please try again or contact support."}
        </p>
      </motion.div>

      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          {/* Payment Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Payment Details
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-gray-300 flex items-center">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Amount
                </span>
                <span className="text-white font-semibold">
                  ${paymentStatus.amount} {paymentStatus.currency}
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-gray-300 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Subscription Tier
                </span>
                <span className="text-white font-semibold capitalize">
                  {paymentStatus.subscriptionTier}
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-gray-300">Session ID</span>
                <span className="text-white font-mono text-sm">
                  {paymentStatus.sessionId}
                </span>
              </div>

              {paymentStatus.subscriptionId && (
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-gray-300">Subscription ID</span>
                  <span className="text-white font-mono text-sm">
                    {paymentStatus.subscriptionId}
                  </span>
                </div>
              )}

              {paymentStatus.nextBillingDate && (
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-300 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Next Billing
                  </span>
                  <span className="text-white">
                    {paymentStatus.nextBillingDate}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {paymentStatus.status === "succeeded" ? (
              <>
                <Link
                  href="/dashboard"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
                >
                  Go to Dashboard
                </Link>
                <Link
                  href="/payment/success"
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 border border-white/20 inline-flex items-center justify-center"
                >
                  View Success Page
                </Link>
              </>
            ) : paymentStatus.status === "pending" ? (
              <>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Check Again
                </button>
                <Link
                  href="/become-member"
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 border border-white/20 inline-flex items-center justify-center"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Membership
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/become-member"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
                >
                  Try Again
                </Link>
                <Link
                  href="/support"
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 border border-white/20 inline-flex items-center justify-center"
                >
                  Contact Support
                </Link>
              </>
            )}
          </motion.div>

          {/* Support Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center mt-12"
          >
            <p className="text-gray-300 mb-4">
              Need help? Our support team is here for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/support"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Contact Support
              </Link>
              <span className="text-gray-500 hidden sm:inline">•</span>
              <Link
                href="/help"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Help Center
              </Link>
              <span className="text-gray-500 hidden sm:inline">•</span>
              <Link
                href="mailto:support@elitematchmaker.com"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Email Support
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentStatusPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-teal-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading payment status...</p>
          </div>
        </div>
      }
    >
      <PaymentStatusContent />
    </Suspense>
  );
}
