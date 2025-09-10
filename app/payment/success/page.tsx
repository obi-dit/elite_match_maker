"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle,
  Crown,
  Star,
  Gem,
  Diamond,
  Shield,
  Globe,
  ArrowRight,
  Download,
  Calendar,
  CreditCard,
  User,
  Mail,
  Clock,
} from "lucide-react";

interface PaymentSuccessData {
  sessionId: string;
  subscriptionTier: string;
  amount: number;
  currency: string;
  userEmail: string;
  userName: string;
  subscriptionId: string;
  nextBillingDate?: string;
}

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [paymentData, setPaymentData] = useState<PaymentSuccessData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  const tierIconMapping: Record<string, React.ReactNode> = {
    bronze: <Star className="w-8 h-8 text-amber-500" />,
    silver: <Gem className="w-8 h-8 text-sky-500" />,
    gold: <Crown className="w-8 h-8 text-yellow-500" />,
    elitevip: <Diamond className="w-8 h-8 text-purple-500" />,
  };

  const tierColorMapping: Record<string, string> = {
    bronze: "from-amber-400 to-amber-600",
    silver: "from-sky-400 to-sky-600",
    gold: "from-yellow-400 to-yellow-600",
    elitevip: "from-purple-500 to-purple-700",
  };

  const tierBenefits: Record<string, string[]> = {
    bronze: [
      "Full-length podcast episodes",
      "Access to Q&A livestreams",
      "Member-only community access",
      "Weekly exclusive content",
    ],
    silver: [
      "All Bronze benefits",
      "Behind-the-scenes content",
      "Priority live questions",
      "Virtual Dating Challenge voting",
    ],
    gold: [
      "All Silver benefits",
      "Monthly virtual speed dates",
      "First access to matchmaking",
      "Discounts on packages",
    ],
    elitevip: [
      "All Gold benefits",
      "Direct model introductions",
      "One-on-one consultations",
      "Exclusive villa event invites",
    ],
  };

  useEffect(() => {
    // Simulate fetching payment data (in real app, this would come from your backend)
    const sessionId = searchParams.get("session_id");
    const subscriptionTier = searchParams.get("tier") || "bronze";

    if (!sessionId) {
      // If no session ID, redirect to home
      router.push("/");
      return;
    }

    // Mock payment data - replace with actual API call
    setTimeout(() => {
      setPaymentData({
        sessionId,
        subscriptionTier,
        amount:
          subscriptionTier === "bronze"
            ? 19
            : subscriptionTier === "silver"
            ? 69
            : subscriptionTier === "gold"
            ? 249
            : 1499,
        currency: "USD",
        userEmail: "user@example.com", // This would come from the session
        userName: "Elite Member", // This would come from the session
        subscriptionId: `sub_${Date.now()}`,
        nextBillingDate: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000
        ).toLocaleDateString(),
      });
      setIsLoading(false);
    }, 1500);
  }, [searchParams, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">
            Processing Your Payment
          </h2>
          <p className="text-gray-300">
            Please wait while we confirm your subscription...
          </p>
        </div>
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Payment Not Found</h1>
          <Link href="/" className="text-blue-400 hover:text-blue-300">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Success Header */}
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
          className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-12 h-12 text-white" />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Payment Successful!
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Welcome to the Elite community! Your membership has been activated and
          you now have access to exclusive content.
        </p>
      </motion.div>

      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Membership Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8"
          >
            <div className="text-center mb-8">
              <div
                className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${
                  tierColorMapping[paymentData.subscriptionTier]
                } rounded-full mb-4`}
              >
                {tierIconMapping[paymentData.subscriptionTier]}
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {paymentData.subscriptionTier.charAt(0).toUpperCase() +
                  paymentData.subscriptionTier.slice(1)}{" "}
                Membership
              </h2>
              <p className="text-gray-300">Your subscription is now active</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Payment Details */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-gray-300">Amount Paid</span>
                    <span className="text-white font-semibold">
                      ${paymentData.amount} {paymentData.currency}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-gray-300">Subscription ID</span>
                    <span className="text-white font-mono text-sm">
                      {paymentData.subscriptionId}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-gray-300">Next Billing</span>
                    <span className="text-white">
                      {paymentData.nextBillingDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">Status</span>
                    <span className="text-green-400 font-semibold flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Membership Benefits */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Your Benefits
                </h3>
                <div className="space-y-3">
                  {tierBenefits[paymentData.subscriptionTier]?.map(
                    (benefit, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{benefit}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              What's Next?
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Check Your Email
                </h4>
                <p className="text-gray-300 text-sm">
                  We've sent you a welcome email with your login credentials and
                  getting started guide.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Access Your Dashboard
                </h4>
                <p className="text-gray-300 text-sm">
                  Log in to your member dashboard to start exploring exclusive
                  content and features.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Join the Community
                </h4>
                <p className="text-gray-300 text-sm">
                  Connect with other members and models in our exclusive
                  community spaces.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/dashboard"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>

            <Link
              href="/become-member"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 border border-white/20 inline-flex items-center justify-center"
            >
              Explore Content
              <Star className="w-5 h-5 ml-2" />
            </Link>

            <button
              onClick={() => window.print()}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 border border-white/20 inline-flex items-center justify-center"
            >
              Download Receipt
              <Download className="w-5 h-5 ml-2" />
            </button>
          </motion.div>

          {/* Support Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-center mt-12"
          >
            <p className="text-gray-300 mb-4">
              Need help getting started? Our support team is here for you.
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
                href="/community"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Community Forum
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
