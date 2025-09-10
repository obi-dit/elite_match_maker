"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore, getAuthHeaders, isAdmin } from "@/store/authStore";
import { handleAuthError } from "@/utils/auth";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  UserCheck,
  UserX,
  Podcast,
  Upload,
  Settings,
  BarChart3,
  Calendar,
  TrendingUp,
} from "lucide-react";

interface DashboardStats {
  totalUsers: number;
  totalClients: number;
  totalApplicants: number;
  totalPodcasts: number;
  recentUsers: any[];
  recentPodcasts: any[];
}

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch("/api/admin/dashboard", {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        await handleAuthError(response);
        return;
      }

      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <AdminProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-300">
              Welcome back, {user?.firstName || user?.fullName || "Admin"}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  Total Users
                </CardTitle>
                <Users className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {stats?.totalUsers || 0}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  Active Clients
                </CardTitle>
                <UserCheck className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {stats?.totalClients || 0}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  Applicants
                </CardTitle>
                <UserX className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {stats?.totalApplicants || 0}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  Total Podcasts
                </CardTitle>
                <Podcast className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {stats?.totalPodcasts || 0}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Podcast Management
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Upload and manage podcasts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    onClick={() => router.push("/admin/podcasts")}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    Manage Podcasts
                  </Button>
                  <Button
                    onClick={() => router.push("/admin/podcasts/upload")}
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10"
                  >
                    Upload New Podcast
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Client Management
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Manage subscribed clients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => router.push("/admin/clients")}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  View All Clients
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  Applicant Management
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Review and manage applicants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => router.push("/admin/applicants")}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  View All Applicants
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Recent Users
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Latest user registrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats?.recentUsers?.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                    >
                      <div>
                        <p className="text-white font-medium">
                          {user.firstName || user.fullName || "Unknown"}
                        </p>
                        <p className="text-gray-400 text-sm">{user.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            user.isMembershipSubscribed
                              ? "default"
                              : "secondary"
                          }
                          className={
                            user.isMembershipSubscribed
                              ? "bg-green-600"
                              : "bg-gray-600"
                          }
                        >
                          {user.isMembershipSubscribed ? "Subscribed" : "Free"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Podcast className="h-5 w-5" />
                  Recent Podcasts
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Latest podcast uploads
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats?.recentPodcasts?.map((podcast) => (
                    <div
                      key={podcast.id}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                    >
                      <div>
                        <p className="text-white font-medium">
                          {podcast.title}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {new Date(podcast.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            podcast.status === "PUBLISHED"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            podcast.status === "PUBLISHED"
                              ? "bg-green-600"
                              : "bg-yellow-600"
                          }
                        >
                          {podcast.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminProtectedRoute>
  );
}
