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
} from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuthStore, getAuthHeaders } from "@/store/authStore";
import { handleAuthError } from "@/utils/auth";

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
  const { user } = useAuthStore();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/podcast/dashboard", {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        if (handleAuthError(response)) {
          return;
        }
        throw new Error("Failed to fetch dashboard data");
      }

      const data = await response.json();
      setDashboardData(data);
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
        return <Badge variant="default">Published</Badge>;
      case "DRAFT":
        return <Badge variant="secondary">Draft</Badge>;
      case "ARCHIVED":
        return <Badge variant="outline">Archived</Badge>;
      case "LIVE":
        return <Badge variant="destructive">Live</Badge>;
      case "ENDED":
        return <Badge variant="outline">Ended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
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

  return (
    <ProtectedRoute requireSubscription={true}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Member Dashboard
                </h1>
                <p className="mt-2 text-gray-600">
                  Welcome back, {user?.firstName || user?.fullName || "Member"}!
                  Here are your latest podcasts and content.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant="default"
                  className="bg-green-100 text-green-800"
                >
                  {user?.selectedTier || "Active Member"}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                      <Badge variant="destructive" className="animate-pulse">
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
                    <CardTitle className="text-lg line-clamp-2">
                      {podcast.title}
                    </CardTitle>
                    {getStatusBadge(podcast.status, podcast.isLive)}
                  </div>
                  <CardDescription className="line-clamp-2">
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
                              className="text-xs"
                            >
                              {category.category}
                            </Badge>
                          ))}
                        {podcast.podcastCategories.length > 2 && (
                          <Badge variant="outline" className="text-xs">
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
                          className="flex-1"
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
                {activeTab === "previous" && "No previous episodes available."}
                {activeTab === "live" && "No live streams currently available."}
                {activeTab === "recent" &&
                  "You haven't accessed any podcasts yet."}
              </p>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
