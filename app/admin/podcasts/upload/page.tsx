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
import {
  Upload,
  FileAudio,
  FileVideo,
  Image,
  Calendar,
  Clock,
  ArrowLeft,
  Save,
  X,
} from "lucide-react";

interface PodcastFormData {
  title: string;
  description: string;
  categories: string[];
  status: string;
  type: string;
  scheduledAt: string;
  audioFile: File | null;
  videoFile: File | null;
  thumbnailFile: File | null;
}

export default function PodcastUpload() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<PodcastFormData>({
    title: "",
    description: "",
    categories: [],
    status: "DRAFT",
    type: "RECORDED",
    scheduledAt: "",
    audioFile: null,
    videoFile: null,
    thumbnailFile: null,
  });
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    if (!isAuthenticated || !isAdmin()) {
      router.push("/login");
      return;
    }
  }, [isAuthenticated, router]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileType: "audio" | "video" | "thumbnail"
  ) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      [`${fileType}File`]: file,
    }));
  };

  const addCategory = () => {
    if (
      newCategory.trim() &&
      !formData.categories.includes(newCategory.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        categories: [...prev.categories, newCategory.trim()],
      }));
      setNewCategory("");
    }
  };

  const removeCategory = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c !== category),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("description", formData.description);
      submitData.append("status", formData.status);
      submitData.append("type", formData.type);
      submitData.append("categories", JSON.stringify(formData.categories));

      if (formData.scheduledAt) {
        submitData.append("scheduledAt", formData.scheduledAt);
      }

      if (formData.audioFile) {
        submitData.append("audioFile", formData.audioFile);
      }

      if (formData.videoFile) {
        submitData.append("videoFile", formData.videoFile);
      }

      if (formData.thumbnailFile) {
        submitData.append("thumbnailFile", formData.thumbnailFile);
      }

      const response = await fetch("/api/admin/podcasts/upload", {
        method: "POST",
        headers: {
          Authorization: getAuthHeaders().Authorization,
        },
        body: submitData,
      });

      if (!response.ok) {
        await handleAuthError(response);
        return;
      }

      router.push("/admin/podcasts");
    } catch (error) {
      console.error("Error uploading podcast:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || !isAdmin()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => router.push("/admin/podcasts")}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Upload Podcast
            </h1>
            <p className="text-gray-300">
              Create and upload new podcast content
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Basic Information */}
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Basic Information</CardTitle>
                <CardDescription className="text-gray-300">
                  Enter the basic details for your podcast
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter podcast title"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter podcast description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="DRAFT">Draft</option>
                      <option value="PUBLISHED">Published</option>
                      <option value="ARCHIVED">Archived</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Type
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="RECORDED">Recorded</option>
                      <option value="LIVE">Live</option>
                      <option value="PREMIUM">Premium</option>
                    </select>
                  </div>
                </div>

                {formData.type === "LIVE" && (
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Scheduled Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      name="scheduledAt"
                      value={formData.scheduledAt}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Categories</CardTitle>
                <CardDescription className="text-gray-300">
                  Add categories to organize your podcast
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addCategory())
                    }
                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter category name"
                  />
                  <Button
                    type="button"
                    onClick={addCategory}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.categories.map((category) => (
                    <Badge
                      key={category}
                      variant="outline"
                      className="border-white/20 text-white"
                    >
                      {category}
                      <button
                        type="button"
                        onClick={() => removeCategory(category)}
                        className="ml-2 hover:text-red-400"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* File Uploads */}
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-white">Media Files</CardTitle>
                <CardDescription className="text-gray-300">
                  Upload audio, video, and thumbnail files
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Audio File */}
                  <div className="space-y-2">
                    <label className="block text-white text-sm font-medium">
                      <FileAudio className="h-4 w-4 inline mr-2" />
                      Audio File
                    </label>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => handleFileChange(e, "audio")}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                    />
                    {formData.audioFile && (
                      <p className="text-green-400 text-sm">
                        Selected: {formData.audioFile.name}
                      </p>
                    )}
                  </div>

                  {/* Video File */}
                  <div className="space-y-2">
                    <label className="block text-white text-sm font-medium">
                      <FileVideo className="h-4 w-4 inline mr-2" />
                      Video File
                    </label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileChange(e, "video")}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                    />
                    {formData.videoFile && (
                      <p className="text-green-400 text-sm">
                        Selected: {formData.videoFile.name}
                      </p>
                    )}
                  </div>

                  {/* Thumbnail File */}
                  <div className="space-y-2">
                    <label className="block text-white text-sm font-medium">
                      <Image className="h-4 w-4 inline mr-2" />
                      Thumbnail
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "thumbnail")}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                    />
                    {formData.thumbnailFile && (
                      <p className="text-green-400 text-sm">
                        Selected: {formData.thumbnailFile.name}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 mt-8">
            <Button
              type="button"
              onClick={() => router.push("/admin/podcasts")}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !formData.title}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {loading ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Upload Podcast
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}




