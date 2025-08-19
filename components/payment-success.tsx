"use client";
import { Suspense, useEffect, useState } from "react";

import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { CheckCircle, Calendar, Phone, Mail } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:6000";

interface Transaction {
  id: number;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
  user: {
    fullName: string;
    email: string;
  };
  package: {
    name: string;
    description: string;
  };
}

export default function PaymentSuccessPage({
  sessionId,
}: {
  sessionId?: string;
}) {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      fetchTransaction();
    }
  }, [sessionId]);

  const fetchTransaction = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/payment/transaction/${sessionId}`
      );
      if (response.ok) {
        const data = await response.json();
        setTransaction(data.transaction);
      } else {
        toast.error("Failed to fetch transaction details");
      }
    } catch (error) {
      console.error("Error fetching transaction:", error);
      toast.error("Failed to fetch transaction details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Suspense>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading payment details...</p>
          </div>
        </div>
      </Suspense>
    );
  }

  if (!transaction) {
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
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Payment Details Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              We couldnt retrieve your payment information.
            </p>
            <button
              onClick={() => window.history.back()}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </Suspense>
    );
  }

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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Payment Successful! 🎉
            </h1>
            <p className="text-xl text-gray-600">
              Thank you for your payment. Your application has been confirmed.
            </p>
          </motion.div>

          {/* Transaction Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Payment Details
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Package Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600">Package:</span>
                    <span className="ml-2 font-medium">
                      {transaction.package.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Description:</span>
                    <span className="ml-2 font-medium">
                      {transaction.package.description}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Amount:</span>
                    <span className="ml-2 font-medium text-green-600">
                      ${transaction.amount} {transaction.currency}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <span className="ml-2 font-medium text-green-600 capitalize">
                      {transaction.status}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Applicant Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600">Name:</span>
                    <span className="ml-2 font-medium">
                      {transaction.user.fullName}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Email:</span>
                    <span className="ml-2 font-medium">
                      {transaction.user.email}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Transaction ID:</span>
                    <span className="ml-2 font-medium text-purple-600">
                      #{transaction.id}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Date:</span>
                    <span className="ml-2 font-medium">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              What Happens Next?
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-white/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Application Review
                </h3>
                <p className="text-purple-100">
                  Our team will review your application within 24-48 hours
                </p>
              </div>

              <div className="text-center">
                <div className="bg-white/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Initial Contact
                </h3>
                <p className="text-purple-100">
                  We will contact you to discuss next steps and answer any
                  questions
                </p>
              </div>

              <div className="text-center">
                <div className="bg-white/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Welcome Email
                </h3>
                <p className="text-purple-100">
                  You will receive a welcome email with program details and next
                  steps
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Need Help?
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-purple-600 mr-3" />
                    <span className="text-gray-600">Email:</span>
                    <span className="ml-2 font-medium">
                      info@elitematchmaker.com
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-purple-600 mr-3" />
                    <span className="text-gray-600">Phone:</span>
                    <span className="ml-2 font-medium">+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Important Notes
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Keep your transaction ID for reference</li>
                  <li>• Check your email for confirmation</li>
                  <li>• Contact us if you have any questions</li>
                  <li>• Program details will be sent within 24 hours</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-8"
          >
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors mr-4"
            >
              Return to Home
            </button>
            <button
              onClick={() => window.print()}
              className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Print Receipt
            </button>
          </motion.div>
        </div>
      </div>
    </Suspense>
  );
}
