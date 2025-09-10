"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore, getAuthHeaders, isAdmin } from "@/store/authStore";
import { handleAuthError } from "@/utils/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, Calendar, Clock } from "lucide-react";

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
  scheduledAt?: string;
  isLive: boolean;
  viewCount: number;
  createdAt: string;
  podcastCategories: { category: string }[];
  podcastAccess: Record<string, unknown>[];
}

export default function PodcastManagement() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin()) {
      router.push("/login");
      return;
    }

    fetchPodcasts();
  }, [isAuthenticated, router]);

  const fetchPodcasts = async () => {
    try {
      const response = await fetch("/api/admin/podcasts", {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        await handleAuthError(response);
        return;
      }

      const data = await response.json();
      setPodcasts(data);
    } catch (error) {
      console.error("Error fetching podcasts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePodcast = async (id: number) => {
    if (!confirm("Are you sure you want to delete this podcast?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/podcasts/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        await handleAuthError(response);
        return;
      }

      setPodcasts(podcasts.filter((podcast) => podcast.id !== id));
    } catch (error) {
      console.error("Error deleting podcast:", error);
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return "N/A";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-green-600";
      case "DRAFT":
        return "bg-yellow-600";
      case "LIVE":
        return "bg-red-600";
      case "ARCHIVED":
        return "bg-gray-600";
      default:
        return "bg-gray-600";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "RECORDED":
        return "bg-blue-600";
      case "LIVE":
        return "bg-red-600";
      case "PREMIUM":
        return "bg-purple-600";
      default:
        return "bg-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading podcasts...</div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Podcast Management
            </h1>
            <p className="text-gray-300">Manage all podcasts and content</p>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={() => router.push("/admin/podcasts/upload")}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Upload Podcast
            </Button>
            <Button
              onClick={() => router.push("/admin")}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>

        {/* Podcasts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {podcasts.map((podcast) => (
            <Card
              key={podcast.id}
              className="bg-white/10 backdrop-blur-lg border-white/20"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-white text-lg mb-2">
                      {podcast.title}
                    </CardTitle>
                    <div className="flex gap-2 mb-2">
                      <Badge className={getStatusColor(podcast.status)}>
                        {podcast.status}
                      </Badge>
                      <Badge className={getTypeColor(podcast.type)}>
                        {podcast.type}
                      </Badge>
                    </div>
                  </div>
                </div>
                {podcast.description && (
                  <CardDescription className="text-gray-300 text-sm">
                    {podcast.description.length > 100
                      ? `${podcast.description.substring(0, 100)}...`
                      : podcast.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Categories */}
                  {podcast.podcastCategories.length > 0 && (
                    <div>
                      <p className="text-white text-sm font-medium mb-1">
                        Categories:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {podcast.podcastCategories.map((cat, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs border-white/20 text-white"
                          >
                            {cat.category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex justify-between text-sm text-gray-300">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDuration(podcast.duration)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {podcast.viewCount} views
                    </div>
                  </div>

                  {/* Created Date */}
                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    <Calendar className="h-3 w-3" />
                    {new Date(podcast.createdAt).toLocaleDateString()}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-white/20 text-white hover:bg-white/10"
                      onClick={() =>
                        router.push(`/admin/podcasts/${podcast.id}/edit`)
                      }
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                      onClick={() => handleDeletePodcast(podcast.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {podcasts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-white text-xl mb-4">No podcasts found</div>
            <p className="text-gray-300 mb-6">
              Get started by uploading your first podcast
            </p>
            <Button
              onClick={() => router.push("/admin/podcasts/upload")}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Upload Podcast
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
