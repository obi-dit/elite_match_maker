"use client";

import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  XCircle,
  ArrowLeft,
  RefreshCw,
  CreditCard,
  Shield,
  HelpCircle,
} from "lucide-react";

export default function PaymentCancelPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const reason = searchParams.get("reason") || "Payment was cancelled";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
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
          className="w-24 h-24 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <XCircle className="w-12 h-12 text-white" />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Payment Cancelled
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Your payment was not completed. Don&apos;t worry, you can try again
          anytime.
        </p>
      </motion.div>

      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          {/* Cancellation Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                What Happened?
              </h2>
              <p className="text-gray-300 mb-6">
                {reason === "Payment was cancelled"
                  ? "You cancelled the payment process or closed the payment window."
                  : reason}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg">
                <Shield className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-1">
                    No Charges Made
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Your payment was not processed, so no charges were made to
                    your account.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg">
                <CreditCard className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-1">Try Again</h3>
                  <p className="text-gray-300 text-sm">
                    You can attempt the payment again with the same or different
                    payment method.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg">
                <HelpCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-1">Need Help?</h3>
                  <p className="text-gray-300 text-sm">
                    If you&apos;re experiencing issues, our support team is here
                    to help.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/become-member"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Try Again
            </Link>

            <Link
              href="/"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 border border-white/20 inline-flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </motion.div>

          {/* Support Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center mt-12"
          >
            <p className="text-gray-300 mb-4">
              Having trouble with payments? We&apos;re here to help.
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

          {/* Session ID for Support */}
          {sessionId && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-8 text-center"
            >
              <p className="text-gray-400 text-sm">
                Session ID: <span className="font-mono">{sessionId}</span>
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Please include this ID when contacting support
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
