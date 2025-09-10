"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle,
  Crown,
  Star,
  Heart,
  Users,
  Calendar,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Download,
  Clock,
  Shield,
  Gift,
  Camera,
  Video,
  MessageCircle,
} from "lucide-react";

interface OnboardingSuccessData {
  sessionId: string;
  userType: "male" | "female";
  packageType: string;
  amount?: number;
  currency?: string;
  userName: string;
  userEmail: string;
  applicationId: string;
  nextSteps: string[];
  timeline: string[];
}

export default function OnboardingSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [successData, setSuccessData] = useState<OnboardingSuccessData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  const sessionId = searchParams.get("session_id");
  const userType = (searchParams.get("type") as "male" | "female") || "male";

  useEffect(() => {
    if (!sessionId) {
      // If no session ID, redirect to home
      router.push("/");
      return;
    }

    // Simulate fetching onboarding success data
    setTimeout(() => {
      const mockData: OnboardingSuccessData = {
        sessionId,
        userType,
        packageType:
          userType === "male"
            ? "Elite Matchmaking Package"
            : "Passport Bachelor Application",
        amount: userType === "male" ? 6800 : undefined,
        currency: userType === "male" ? "USD" : undefined,
        userName: "Elite Applicant",
        userEmail: "applicant@example.com",
        applicationId: `app_${Date.now()}`,
        nextSteps:
          userType === "male"
            ? [
                "Your application is being reviewed by our Elite Matchmakers",
                "You'll receive a welcome email with your login credentials",
                "Schedule your initial consultation call within 48 hours",
                "Complete your profile verification process",
                "Start receiving curated match introductions",
              ]
            : [
                "Your Passport Bachelor application is under review",
                "Our team will screen all applications carefully",
                "Only selected applicants will be contacted for interviews",
                "Lie detector testing will be scheduled for qualified candidates",
                "Final selections will be announced via email",
              ],
        timeline:
          userType === "male"
            ? [
                "Day 1-2: Application review and initial screening",
                "Day 3-5: Consultation call and profile verification",
                "Week 2: First curated introductions begin",
                "Ongoing: Regular match updates and feedback sessions",
              ]
            : [
                "Week 1: Application screening and initial review",
                "Week 2-3: Interview scheduling for qualified candidates",
                "Week 4: Lie detector testing for selected applicants",
                "Week 5-6: Final selections and villa event preparation",
              ],
      };

      setSuccessData(mockData);
      setIsLoading(false);
    }, 1500);
  }, [sessionId, userType, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">
            Processing Your Application
          </h2>
          <p className="text-gray-300">
            Please wait while we confirm your submission...
          </p>
        </div>
      </div>
    );
  }

  if (!successData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Application Not Found</h1>
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
          {successData.userType === "male"
            ? "Application Submitted!"
            : "Application Received!"}
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          {successData.userType === "male"
            ? "Welcome to Elite Matchmaking! Your application has been submitted and payment processed successfully."
            : "Thank you for applying to Passport Bachelor! Your application is now under review by our Elite team."}
        </p>
      </motion.div>

      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Application Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                {successData.userType === "male" ? (
                  <Crown className="w-10 h-10 text-white" />
                ) : (
                  <Heart className="w-10 h-10 text-white" />
                )}
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {successData.packageType}
              </h2>
              <p className="text-gray-300">
                {successData.userType === "male"
                  ? "Elite Matchmaking Service"
                  : "Passport Bachelor Experience"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Application Details */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Application Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-gray-300">Application ID</span>
                    <span className="text-white font-mono text-sm">
                      {successData.applicationId}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-gray-300">Applicant Name</span>
                    <span className="text-white font-semibold">
                      {successData.userName}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-gray-300">Email</span>
                    <span className="text-white">{successData.userEmail}</span>
                  </div>
                  {successData.amount && (
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-gray-300">Amount Paid</span>
                      <span className="text-white font-semibold">
                        ${successData.amount} {successData.currency}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">Status</span>
                    <span className="text-green-400 font-semibold flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      {successData.userType === "male"
                        ? "Payment Processed"
                        : "Under Review"}
                    </span>
                  </div>
                </div>
              </div>

              {/* What's Included */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Gift className="w-5 h-5 mr-2" />
                  {successData.userType === "male"
                    ? "What's Included"
                    : "What's Next"}
                </h3>
                <div className="space-y-3">
                  {successData.userType === "male" ? (
                    <>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">
                          Personal Elite Matchmaker assigned
                        </span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">
                          Curated introductions to verified women
                        </span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">
                          Background verification included
                        </span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">
                          Ongoing support and guidance
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">
                          Application screening and review
                        </span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">
                          Interview process for qualified candidates
                        </span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">
                          Lie detector testing for selected applicants
                        </span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">
                          Villa event participation for final selections
                        </span>
                      </div>
                    </>
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
              What Happens Next?
            </h3>
            <div className="space-y-4">
              {successData.nextSteps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-gray-300">{step}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center">
              <Clock className="w-6 h-6 mr-2" />
              Expected Timeline
            </h3>
            <div className="space-y-4">
              {successData.timeline.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg"
                >
                  <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex-shrink-0"></div>
                  <p className="text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
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
              href="/contact"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 border border-white/20 inline-flex items-center justify-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact Support
            </Link>

            <button
              onClick={() => window.print()}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 border border-white/20 inline-flex items-center justify-center"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Receipt
            </button>
          </motion.div>

          {/* Support Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="text-center mt-12"
          >
            <p className="text-gray-300 mb-4">
              Questions about your application? Our Elite team is here to help.
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


