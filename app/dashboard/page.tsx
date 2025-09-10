"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Crown,
  User,
  LogOut,
  Shield,
  Star,
  Gem,
  Diamond,
  Globe,
} from "lucide-react";
import Link from "next/link";

interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  selectedTier?: string;
  gender?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      router.push("/login");
      return;
    }

    try {
      const user = JSON.parse(userData);
      setUser(user);
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  const getTierIcon = (tier: string) => {
    const tierLower = tier.toLowerCase();
    switch (tierLower) {
      case "bronze":
        return <Star className="w-6 h-6 text-amber-500" />;
      case "silver":
        return <Gem className="w-6 h-6 text-sky-500" />;
      case "gold":
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case "elitevip":
        return <Diamond className="w-6 h-6 text-purple-500" />;
      default:
        return <Shield className="w-6 h-6 text-gray-500" />;
    }
  };

  const getTierColor = (tier: string) => {
    const tierLower = tier.toLowerCase();
    switch (tierLower) {
      case "bronze":
        return "from-amber-400 to-amber-600";
      case "silver":
        return "from-sky-400 to-sky-600";
      case "gold":
        return "from-yellow-400 to-yellow-600";
      case "elitevip":
        return "from-purple-500 to-purple-700";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Welcome back, {user.firstName || user.fullName || "Member"}!
              </h1>
              <p className="text-gray-300">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/10"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Membership Status */}
          {user.selectedTier && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div
                className={`bg-gradient-to-r ${getTierColor(
                  user.selectedTier
                )} rounded-2xl p-8 text-white`}
              >
                <div className="flex items-center space-x-4 mb-4">
                  {getTierIcon(user.selectedTier)}
                  <div>
                    <h2 className="text-2xl font-bold">
                      {user.selectedTier} Membership
                    </h2>
                    <p className="text-white/80">Active subscription</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/20 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Content Access</h3>
                    <p className="text-sm text-white/80">
                      Full access to {user.selectedTier.toLowerCase()} tier
                      content
                    </p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Community</h3>
                    <p className="text-sm text-white/80">
                      Access to member-only community
                    </p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Support</h3>
                    <p className="text-sm text-white/80">
                      Priority customer support
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Quick Actions
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link
                href="/content"
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Browse Content
                </h3>
                <p className="text-gray-300 text-sm">
                  Access exclusive podcasts, videos, and behind-the-scenes
                  content
                </p>
              </Link>

              <Link
                href="/community"
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Community
                </h3>
                <p className="text-gray-300 text-sm">
                  Connect with other members and models
                </p>
              </Link>

              <Link
                href="/profile"
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Profile
                </h3>
                <p className="text-gray-300 text-sm">
                  Manage your account settings and preferences
                </p>
              </Link>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Recent Activity
            </h2>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="text-center text-gray-300 py-8">
                <Shield className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                <p>No recent activity to show</p>
                <p className="text-sm text-gray-400 mt-2">
                  Start exploring content to see your activity here
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}



