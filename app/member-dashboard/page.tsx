"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
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
  Play,
  Clock,
  Users,
  Calendar,
  Headphones,
  Video,
  Radio,
  Menu,
  X,
  User,
  Heart,
  MapPin,
  Star,
  Eye,
  ChevronRight,
} from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuthStore, getAuthHeaders } from "@/store/authStore";
import { handleAuthError } from "@/utils/auth";
import { toast } from "react-toastify";

interface Podcast {
  id: number;
  title: string;
  description?: string;
  audioUrl?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  duration?: number;
  status: string;
  type: string;
  isLive: boolean;
  viewCount: number;
  createdAt: string;
  scheduledAt?: string;
  podcastCategories: Array<{
    id: number;
    category: string;
  }>;
}

interface Applicant {
  id: number;
  fullName: string;
  firstName?: string;
  lastName?: string;
  age: number;
  photo1?: string;
  photo2?: string;
  photo3?: string;
  cityOfResidence?: string;
  englishProficiency?: string;
  heightCm?: number;
  weightKg?: number;
  personalityThreeWords?: string;
  relationshipGoals?: string;
  talentsOrHobbies?: string;
  whyGoodWife?: string;
  attractionToOlderMen?: string;
  comfortableFilming?: boolean;
  traditionalWantsMarriage?: boolean;
  willingToCompete?: boolean;
  children?: string;
  willingLieDetector?: boolean;
  consentForMedia?: boolean;
  comfortableBikiniChallenges?: boolean;
  introVideo?: string;
  socialMediaLinks?: string;
  createdAt: string;
  updatedAt: string;
}

interface Like {
  id: number;
  applicant: Applicant;
}

interface DashboardData {
  userSubscription: {
    id: string;
    tier: string;
    status: string;
    startDate: string;
    endDate: string;
  } | null;
  newRecordedPodcasts: Podcast[];
  previousPodcasts: Podcast[];
  livePodcasts: Podcast[];
  recentlyAccessed: Podcast[];
  applicants: Applicant[];
}

export default function MemberDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "new" | "previous" | "live" | "recent"
  >("new");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<
    "dashboard" | "applicants" | "applicant-detail" | "liked-applicants"
  >("dashboard");
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(
    null
  );
  const [likedApplicants, setLikedApplicants] = useState<Like[]>([]);
  const [likedLoading, setLikedLoading] = useState(false);
  const [likeLoading, setLikeLoading] = useState<number | null>(null);
  const [unlikeLoading, setUnlikeLoading] = useState<number | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch dashboard data and applicants in parallel
      const [dashboardResponse, applicantsResponse] = await Promise.all([
        fetch("/api/podcast/dashboard", {
          headers: getAuthHeaders(),
        }),
        fetch("/api/users/applicants", {
          headers: getAuthHeaders(),
        }),
      ]);

      if (!dashboardResponse.ok) {
        if (handleAuthError(dashboardResponse)) {
          return;
        }
        throw new Error("Failed to fetch dashboard data");
      }

      if (!applicantsResponse.ok) {
        if (handleAuthError(applicantsResponse)) {
          return;
        }
        throw new Error("Failed to fetch applicants data");
      }

      const [dashboardData, applicantsData] = await Promise.all([
        dashboardResponse.json(),
        applicantsResponse.json(),
      ]);

      setDashboardData({
        ...dashboardData,
        applicants: applicantsData || [],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const recordPodcastAccess = async (podcastId: number) => {
    try {
      const response = await fetch(`/api/podcast/${podcastId}/access`, {
        method: "POST",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        handleAuthError(response);
      }
    } catch (err) {
      console.error("Failed to record podcast access:", err);
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return "Unknown";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getPodcastIcon = (type: string, isLive: boolean) => {
    if (isLive) return <Radio className="w-5 h-5 text-red-500" />;
    if (type === "LIVE") return <Video className="w-5 h-5 text-blue-500" />;
    return <Headphones className="w-5 h-5 text-green-500" />;
  };

  const getStatusBadge = (status: string, isLive: boolean) => {
    if (isLive) {
      return (
        <Badge variant="destructive" className="animate-pulse">
          LIVE
        </Badge>
      );
    }

    switch (status) {
      case "PUBLISHED":
        return (
          <Badge variant="default" className="text-gray-500">
            Published
          </Badge>
        );
      case "DRAFT":
        return (
          <Badge variant="secondary" className="text-gray-500">
            Draft
          </Badge>
        );
      case "ARCHIVED":
        return (
          <Badge variant="outline" className="text-gray-500">
            Archived
          </Badge>
        );
      case "LIVE":
        return (
          <Badge variant="destructive" className="text-gray-500">
            Live
          </Badge>
        );
      case "ENDED":
        return (
          <Badge variant="outline" className="text-gray-500">
            Ended
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="text-gray-500">
            {status}
          </Badge>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchDashboardData}>Try Again</Button>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">No data available</p>
      </div>
    );
  }

  const {
    newRecordedPodcasts,
    previousPodcasts,
    livePodcasts,
    recentlyAccessed,
  } = dashboardData;

  const getCurrentPodcasts = () => {
    switch (activeTab) {
      case "new":
        return newRecordedPodcasts;
      case "previous":
        return previousPodcasts;
      case "live":
        return livePodcasts;
      case "recent":
        return recentlyAccessed;
      default:
        return newRecordedPodcasts;
    }
  };

  const renderApplicantDetail = (applicant: Applicant) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setActiveView("applicants")}
          className="flex items-center gap-2"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Back to Applicants
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Section */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src={applicant.photo1 || "/placeholder-avatar.jpg"}
                    alt={applicant.fullName}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h2 className="text-2xl  font-bold text-gray-600 mb-2">
                  {applicant.fullName}
                </h2>
                <p className="text-lg text-gray-600 mb-4">
                  {applicant.age} years old
                </p>

                {applicant.cityOfResidence && (
                  <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{applicant.cityOfResidence}</span>
                  </div>
                )}

                <div className="flex gap-2 justify-center">
                  <Button
                    size="sm"
                    className="flex items-center gap-2 text-gray-600 cursor-pointer border border-gray-600"
                    onClick={() => createLike(applicant.id)}
                    disabled={likeLoading === applicant.id}
                  >
                    {likeLoading === applicant.id ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                        Liking...
                      </>
                    ) : (
                      <>
                        <Heart className="w-4 h-4" />
                        Like
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    View Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Details Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-600">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {applicant.heightCm && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Height
                    </label>
                    <p className="text-lg text-gray-700">
                      {applicant.heightCm} cm
                    </p>
                  </div>
                )}
                {applicant.weightKg && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Weight
                    </label>
                    <p className="text-lg text-gray-700">
                      {applicant.weightKg} kg
                    </p>
                  </div>
                )}
                {applicant.englishProficiency && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      English Level
                    </label>
                    <p className="text-lg text-gray-700">
                      {applicant.englishProficiency}
                    </p>
                  </div>
                )}
                {applicant.children && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Children
                    </label>
                    <p className="text-lg text-gray-700">
                      {applicant.children}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Personality & Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-600">
                Personality & Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {applicant.personalityThreeWords && (
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Personality (3 words)
                  </label>
                  <p className="text-lg text-gray-700">
                    {applicant.personalityThreeWords}
                  </p>
                </div>
              )}
              {applicant.relationshipGoals && (
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Relationship Goals
                  </label>
                  <p className="text-lg text-gray-700">
                    {applicant.relationshipGoals}
                  </p>
                </div>
              )}
              {applicant.talentsOrHobbies && (
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Talents & Hobbies
                  </label>
                  <p className="text-lg text-gray-700">
                    {applicant.talentsOrHobbies}
                  </p>
                </div>
              )}
              {applicant.whyGoodWife && (
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Why I&apos;d Make a Good Wife
                  </label>
                  <p className="text-lg text-gray-700">
                    {applicant.whyGoodWife}
                  </p>
                </div>
              )}
              {applicant.attractionToOlderMen && (
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Attraction to Older Men
                  </label>
                  <p className="text-lg text-gray-700">
                    {applicant.attractionToOlderMen}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-600">
                Preferences & Values
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-gray-700">
                    Comfortable Filming:{" "}
                    {applicant.comfortableFilming ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="text-gray-700">
                    Wants Marriage:{" "}
                    {applicant.traditionalWantsMarriage ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-700">
                    Willing to Compete:{" "}
                    {applicant.willingToCompete ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700">
                    Media Consent: {applicant.consentForMedia ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Photos */}
          {(applicant.photo2 || applicant.photo3) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-600">
                  Additional Photos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {applicant.photo2 && (
                    <div className="relative aspect-square">
                      <Image
                        src={applicant.photo2}
                        alt={`${applicant.fullName} photo 2`}
                        fill
                        className="rounded-lg object-cover"
                      />
                    </div>
                  )}
                  {applicant.photo3 && (
                    <div className="relative aspect-square">
                      <Image
                        src={applicant.photo3}
                        alt={`${applicant.fullName} photo 3`}
                        fill
                        className="rounded-lg object-cover"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );

  const createLike = async (applicantId: number) => {
    try {
      setLikeLoading(applicantId);
      const likeResponse = await fetch(`/api/likes/create`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ clientId: user?.id, applicantId }),
      });

      if (!likeResponse.ok) {
        if (handleAuthError(likeResponse)) {
          return;
        }
        throw new Error("Failed to create like");
      }
      toast.success("Like created successfully");
      // Refresh liked applicants if we're on that view
      if (activeView === "liked-applicants") {
        fetchLikedApplicants();
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
      console.error(error);
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLikeLoading(null);
    }
  };

  const fetchLikedApplicants = async () => {
    try {
      setLikedLoading(true);
      const response = await fetch("/api/likes/liked-applicants", {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        if (handleAuthError(response)) {
          return;
        }
        throw new Error("Failed to fetch liked applicants");
      }

      const data = await response.json();
      setLikedApplicants(data || []);
    } catch (error) {
      console.error("Error fetching liked applicants:", error);
      toast.error("Failed to fetch liked applicants");
    } finally {
      setLikedLoading(false);
    }
  };

  const unlikeApplicant = async (id: number) => {
    try {
      setUnlikeLoading(id);
      const response = await fetch(`/api/likes/unlike/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        if (handleAuthError(response)) {
          return;
        }
        throw new Error("Failed to unlike applicant");
      }

      toast.success("Removed from liked applicants");
      // Remove from local state
      setLikedApplicants((prev) => prev.filter((like) => like.id !== id));
    } catch (error) {
      console.error("Error unliking applicant:", error);
      toast.error("Failed to unlike applicant");
    } finally {
      setUnlikeLoading(null);
    }
  };

  return (
    <ProtectedRoute requireSubscription={true}>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen
              ? "translate-x-0 sidebar-enter"
              : "-translate-x-full sidebar-exit"
          } fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 border-r border-slate-700 sidebar-glow`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-20 px-6 border-b border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Elite Match</h2>
                <p className="text-xs text-slate-400">Member Portal</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* User Info */}
          <div className="px-6 py-4 border-b border-slate-700 animate-fadeIn">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-200">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">
                  {user?.firstName || user?.fullName || "Member"}
                </p>
                <p className="text-sm text-slate-400">
                  {user?.selectedTier || "Active Member"}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-6 px-4 space-y-2">
            <Button
              variant={activeView === "dashboard" ? "default" : "ghost"}
              className={`sidebar-item w-full justify-start h-12 text-left transition-all duration-200 ${
                activeView === "dashboard"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                  : "text-slate-300 hover:text-white hover:bg-slate-700 hover:translate-x-2"
              }`}
              onClick={() => {
                setActiveView("dashboard");
                setSidebarOpen(false);
              }}
            >
              <Users className="w-5 h-5 mr-3 transition-transform duration-200 group-hover:scale-110" />
              <span className="font-medium">Dashboard</span>
            </Button>

            <Button
              variant={activeView === "applicants" ? "default" : "ghost"}
              className={`sidebar-item w-full justify-start h-12 text-left transition-all duration-200 ${
                activeView === "applicants"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                  : "text-slate-300 hover:text-white hover:bg-slate-700 hover:translate-x-2"
              }`}
              onClick={() => {
                setActiveView("applicants");
                setSidebarOpen(false);
              }}
            >
              <User className="w-5 h-5 mr-3 transition-transform duration-200 group-hover:scale-110" />
              <span className="font-medium">Applicants</span>
            </Button>

            <Button
              variant={activeView === "liked-applicants" ? "default" : "ghost"}
              className={`sidebar-item w-full justify-start h-12 text-left transition-all duration-200 ${
                activeView === "liked-applicants"
                  ? "bg-gradient-to-r from-pink-500 to-red-600 text-white shadow-lg transform scale-105"
                  : "text-slate-300 hover:text-white hover:bg-slate-700 hover:translate-x-2"
              }`}
              onClick={() => {
                setActiveView("liked-applicants");
                setSidebarOpen(false);
                fetchLikedApplicants();
              }}
            >
              <Heart className="w-5 h-5 mr-3 transition-transform duration-200 group-hover:scale-110" />
              <span className="font-medium">Liked Applicants</span>
            </Button>
          </nav>

          {/* Sidebar Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-700">
            <div className="text-center">
              <p className="text-xs text-slate-500">
                Elite International Match Maker
              </p>
              <p className="text-xs text-slate-600 mt-1">
                Premium Dating Services
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-white to-gray-50 shadow-lg border-b border-gray-200">
            <div className="px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden hover:bg-gray-100 transition-colors duration-200"
                  >
                    <Menu className="w-6 h-6 text-gray-700" />
                  </Button>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent animate-fadeIn">
                      {activeView === "dashboard" && "Member Dashboard"}
                      {activeView === "applicants" && "Applicants"}
                      {activeView === "liked-applicants" && "Liked Applicants"}
                      {activeView === "applicant-detail" &&
                        selectedApplicant?.fullName}
                    </h1>
                    <p className="mt-2 text-gray-600 text-lg">
                      {activeView === "dashboard" &&
                        `Welcome back, ${
                          user?.firstName || user?.fullName || "Member"
                        }! Here are your latest podcasts and content.`}
                      {activeView === "applicants" &&
                        "Browse and connect with potential matches."}
                      {activeView === "liked-applicants" &&
                        "View all the applicants you've liked and manage your preferences."}
                      {activeView === "applicant-detail" &&
                        "View detailed profile information."}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge
                    variant="default"
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {user?.selectedTier || "Active Member"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8">
            {activeView === "dashboard" && (
              <div className="max-w-7xl mx-auto">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm text-gray-500 font-medium">
                        New Episodes
                      </CardTitle>
                      <Headphones className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-500">
                        {newRecordedPodcasts.length}
                      </div>
                      <p className="text-xs text-muted-foreground text-gray-500">
                        This week
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm text-gray-500 font-medium">
                        Live Streams
                      </CardTitle>
                      <Radio className="h-4 w-4 text-muted-foreground " />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-500">
                        {livePodcasts.length}
                      </div>
                      <p className="text-xs text-muted-foreground text-gray-500">
                        Available now
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">
                        Total Episodes
                      </CardTitle>
                      <Play className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-500">
                        {previousPodcasts.length + newRecordedPodcasts.length}
                      </div>
                      <p className="text-xs text-muted-foreground text-gray-500">
                        All time
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">
                        Recently Accessed
                      </CardTitle>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-500">
                        {recentlyAccessed.length}
                      </div>
                      <p className="text-xs text-muted-foreground text-gray-500">
                        Your history
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Navigation Tabs */}
                <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
                  <button
                    onClick={() => setActiveTab("new")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === "new"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    New Episodes
                  </button>
                  <button
                    onClick={() => setActiveTab("previous")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === "previous"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Previous Episodes
                  </button>
                  <button
                    onClick={() => setActiveTab("live")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === "live"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Live Streams
                  </button>
                  <button
                    onClick={() => setActiveTab("recent")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === "recent"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Recently Accessed
                  </button>
                </div>

                {/* Podcast Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getCurrentPodcasts().map((podcast) => (
                    <Card
                      key={podcast.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="aspect-video bg-gray-200 relative">
                        {podcast.thumbnailUrl ? (
                          <Image
                            src={podcast.thumbnailUrl}
                            alt={podcast.title}
                            fill
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                            {getPodcastIcon(podcast.type, podcast.isLive)}
                          </div>
                        )}
                        {podcast.isLive && (
                          <div className="absolute top-2 left-2">
                            <Badge
                              variant="destructive"
                              className="animate-pulse"
                            >
                              LIVE
                            </Badge>
                          </div>
                        )}
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                          {formatDuration(podcast.duration)}
                        </div>
                      </div>

                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg text-gray-500 line-clamp-2">
                            {podcast.title}
                          </CardTitle>
                          {getStatusBadge(podcast.status, podcast.isLive)}
                        </div>
                        <CardDescription className="line-clamp-2 text-gray-500  ">
                          {podcast.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-3">
                          {/* Categories */}
                          {podcast.podcastCategories.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {podcast.podcastCategories
                                .slice(0, 2)
                                .map((category) => (
                                  <Badge
                                    key={category.id}
                                    variant="outline"
                                    className="text-xs text-gray-500"
                                  >
                                    {category.category}
                                  </Badge>
                                ))}
                              {podcast.podcastCategories.length > 2 && (
                                <Badge
                                  variant="outline"
                                  className="text-xs text-gray-500"
                                >
                                  +{podcast.podcastCategories.length - 2} more
                                </Badge>
                              )}
                            </div>
                          )}

                          {/* Metadata */}
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(podcast.createdAt)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{podcast.viewCount}</span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex space-x-2">
                            {podcast.audioUrl && (
                              <Button
                                size="sm"
                                className="flex-1 text-gray-500"
                                onClick={() => {
                                  recordPodcastAccess(podcast.id);
                                  window.open(podcast.audioUrl, "_blank");
                                }}
                              >
                                <Play className="w-4 h-4 mr-2" />
                                Listen
                              </Button>
                            )}
                            {podcast.videoUrl && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1"
                                onClick={() => {
                                  recordPodcastAccess(podcast.id);
                                  window.open(podcast.videoUrl, "_blank");
                                }}
                              >
                                <Video className="w-4 h-4 mr-2" />
                                Watch
                              </Button>
                            )}
                          </div>

                          {/* Scheduled Time for Live Podcasts */}
                          {podcast.scheduledAt && !podcast.isLive && (
                            <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
                              <Clock className="w-4 h-4 inline mr-1" />
                              Scheduled for {formatDate(podcast.scheduledAt)}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {getCurrentPodcasts().length === 0 && (
                  <div className="text-center py-12">
                    <Headphones className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No podcasts available
                    </h3>
                    <p className="text-gray-500">
                      {activeTab === "new" &&
                        "No new episodes this week. Check back soon!"}
                      {activeTab === "previous" &&
                        "No previous episodes available."}
                      {activeTab === "live" &&
                        "No live streams currently available."}
                      {activeTab === "recent" &&
                        "You haven't accessed any podcasts yet."}
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeView === "applicants" && (
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {dashboardData.applicants?.map((applicant) => (
                    <Card
                      key={applicant.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="relative aspect-square">
                        <Image
                          src={applicant.photo1 || "/placeholder-avatar.jpg"}
                          alt={applicant.fullName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-600 text-lg mb-1">
                          {applicant.fullName}
                        </h3>
                        <p className="text-gray-600 mb-2">
                          {applicant.age} years old
                        </p>
                        {applicant.cityOfResidence && (
                          <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {applicant.cityOfResidence}
                          </p>
                        )}
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1 text-gray-600 cursor-pointer"
                            onClick={() => {
                              setSelectedApplicant(applicant);
                              setActiveView("applicant-detail");
                            }}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button
                            className="cursor-pointer"
                            onClick={() => {
                              createLike(applicant.id);
                            }}
                            size="sm"
                            variant="outline"
                            disabled={likeLoading === applicant.id}
                          >
                            {likeLoading === applicant.id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                            ) : (
                              <Heart className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {(!dashboardData.applicants ||
                  dashboardData.applicants.length === 0) && (
                  <div className="text-center py-12">
                    <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No applicants available
                    </h3>
                    <p className="text-gray-500">
                      Check back later for new potential matches.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeView === "liked-applicants" && (
              <div className="max-w-7xl mx-auto">
                {likedLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading liked applicants...</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {likedApplicants.map((like) => (
                        <Card
                          key={like.id}
                          className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white border border-gray-200 overflow-hidden"
                        >
                          <div className="relative">
                            {like.applicant.photo1 ? (
                              <div className="aspect-square relative overflow-hidden">
                                <Image
                                  src={like.applicant.photo1}
                                  alt={like.applicant.fullName || "Applicant"}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            ) : (
                              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                <User className="w-16 h-16 text-gray-400" />
                              </div>
                            )}
                            <div className="absolute top-2 right-2">
                              <Badge className="bg-pink-500 text-white">
                                <Heart className="w-3 h-3 mr-1" />
                                Liked
                              </Badge>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <div className="space-y-2">
                              <h3 className="font-semibold text-lg text-gray-900 truncate">
                                {like.applicant.firstName ||
                                  like.applicant.fullName ||
                                  "Unknown"}
                                {like.applicant.lastName &&
                                  ` ${like.applicant.lastName}`}
                              </h3>
                              {like.applicant.age && (
                                <p className="text-sm text-gray-600">
                                  Age: {like.applicant.age}
                                </p>
                              )}
                              {like.applicant.cityOfResidence && (
                                <div className="flex items-center text-sm text-gray-600">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {like.applicant.cityOfResidence}
                                </div>
                              )}
                              <div className="flex items-center text-sm text-gray-500">
                                <Calendar className="w-4 h-4 mr-1" />
                                Liked{" "}
                                {new Date(
                                  like.applicant.createdAt
                                ).toLocaleDateString()}
                              </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                              <Button
                                size="sm"
                                className="flex-1 text-gray-600 cursor-pointer"
                                onClick={() => {
                                  setSelectedApplicant(like.applicant);
                                  setActiveView("applicant-detail");
                                }}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                              <Button
                                className="cursor-pointer bg-red-500 hover:bg-red-600 text-white"
                                onClick={() => {
                                  unlikeApplicant(like.id);
                                }}
                                size="sm"
                                variant="outline"
                                disabled={unlikeLoading === like.id}
                              >
                                {unlikeLoading === like.id ? (
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                ) : (
                                  <X className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {likedApplicants.length === 0 && (
                      <div className="text-center py-12">
                        <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No liked applicants yet
                        </h3>
                        <p className="text-gray-500 mb-4">
                          Start browsing applicants and like the ones
                          you&apos;re interested in.
                        </p>
                        <Button
                          onClick={() => setActiveView("applicants")}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Browse Applicants
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {activeView === "applicant-detail" && selectedApplicant && (
              <div className="max-w-7xl mx-auto">
                {renderApplicantDetail(selectedApplicant)}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
