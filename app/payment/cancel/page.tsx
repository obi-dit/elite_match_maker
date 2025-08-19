"use client";

import { motion } from "framer-motion";

export default function PaymentCancel() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-red-600 to-pink-400 px-6 py-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-2xl p-8 text-center"
        >
          <div className="mb-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Payment Cancelled
            </h1>
            <p className="text-lg text-gray-600">
              Your payment was cancelled. Don't worry, your application is still
              saved.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">
                What Happened?
              </h3>
              <ul className="text-yellow-800 text-sm space-y-1">
                <li>• Your payment process was interrupted</li>
                <li>• Your application data has been saved</li>
                <li>• You can complete payment at any time</li>
                <li>• No charges were made to your account</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Next Steps</h3>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Contact our team to complete your payment</li>
                <li>• We can send you a new payment link</li>
                <li>
                  • Your application will be processed once payment is complete
                </li>
                <li>• No rush - take your time to review everything</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                Contact Information
              </h3>
              <p className="text-gray-700 text-sm">
                If you have any questions or need assistance completing your
                payment, please contact us at{" "}
                <a
                  href="mailto:allexandra@diversityintechnology.org"
                  className="text-blue-600 hover:underline"
                >
                  allexandra@diversityintechnology.org
                </a>
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <button
              onClick={() => (window.location.href = "/onboarding/male")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 mr-4"
            >
              Try Payment Again
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              Return to Home
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
