"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Crown,
  Diamond,
  Check,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  Shield,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { Subscription, SubscriptionFeature } from "@/typings/subscription";

function MembershipRegistrationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedTier = searchParams.get("tier") || "bronze";
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [selectedTierData, setSelectedTierData] = useState<Subscription | null>(
    null
  );

  const SubcriptionIconMapping: Record<string, React.ReactNode> = {
    bronze: <Crown className="w-8 h-8" />,
    silver: <Globe className="w-8 h-8" />,
    gold: <Shield className="w-8 h-8" />,
    elitevip: <Diamond className="w-8 h-8" />,
  };

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchSubscription = async () => {
      const response = await fetch(
        `${API_BASE_URL}/subscription/${selectedTier}`
      );
      const data = (await response.json()) as Subscription;
      console.log(data);
      setSelectedTierData(data);
    };
    fetchSubscription();
  }, [selectedTier, API_BASE_URL]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/users/membership`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          selectedTier,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const userData = await response.json();
      console.log("Registration successful:", userData);

      // Redirect to Stripe checkout or success page
      if (userData.url) {
        window.location.href = userData.url;
      } else {
        // If no payment URL, redirect to success page
        router.push(
          `/payment/success?session_id=${
            userData.sessionId || "local"
          }&tier=${selectedTier}`
        );
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedTierData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Invalid Membership Tier</h1>
          <Link
            href="/become-member"
            className="text-blue-400 hover:text-blue-300"
          >
            Return to Membership Selection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Floating back button - visible, non-obstructive on mobile and desktop */}
      <Link
        href="/become-member"
        className="fixed left-4 top-20 lg:top-24 z-40 flex items-center justify-center w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
        aria-label="Back to membership selection"
      >
        <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6" />
      </Link>

      {/* Header */}
      <div className="container mx-auto px-4 py-6 mt-20">
        <div className="text-center mb-8 pt-2">
          <h1 className="text-4xl font-bold text-white mb-4">
            Complete Your Registration
          </h1>
          <p className="text-gray-300 text-lg">
            Join our elite community and unlock exclusive content
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Registration Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Personal Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg !text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your first name"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg !text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg !text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    minLength={8}
                    className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg !text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Minimum 8 characters
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting
                  ? "Creating Account..."
                  : "Create Account & Continue to Payment"}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-300 text-sm">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </motion.div>

          {/* Selected Tier Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                {SubcriptionIconMapping[selectedTierData.tier.toLowerCase()]}
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {selectedTierData.tier} Membership
              </h2>
              <div className="text-3xl font-bold text-white">
                ${selectedTierData.price}
                <span className="text-lg text-gray-300 font-normal">
                  /{selectedTierData.period.toLowerCase()}
                </span>
              </div>
              {selectedTierData.popular && (
                <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-sm font-semibold px-3 py-1 rounded-full mt-2">
                  Most Popular
                </span>
              )}
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-semibold text-white mb-3">
                What&apos;s Included:
              </h3>
              {selectedTierData.subscriptionFeatures.map(
                (feature: SubscriptionFeature, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">
                      {feature.feature.name}
                    </span>
                  </div>
                )
              )}
            </div>

            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-4 border border-blue-500/30">
              <div className="text-center">
                <p className="text-white font-semibold mb-2">
                  Ready to get started?
                </p>
                <p className="text-gray-300 text-sm">
                  Complete your registration above to proceed with payment and
                  activate your membership.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function MembershipRegistration() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-teal-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading registration form...</p>
          </div>
        </div>
      }
    >
      <MembershipRegistrationContent />
    </Suspense>
  );
}
