"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore, getAuthHeaders, isAdmin } from "@/store/authStore";
import { handleAuthError } from "@/utils/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Heart,
  Users,
  Calendar,
  MapPin,
  Mail,
  Eye,
  Search,
} from "lucide-react";
import Image from "next/image";

interface Like {
  id: number;
  client: {
    id: number;
    fullName?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    createdAt: string;
  };
  applicant: {
    id: number;
    fullName?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    age?: number;
    cityOfResidence?: string;
    photo1?: string;
    photo2?: string;
    photo3?: string;
    createdAt: string;
  };
}

export default function AdminLikes() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [likes, setLikes] = useState<Like[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState<"all" | "client" | "applicant">(
    "all"
  );

  useEffect(() => {
    if (!isAuthenticated || !isAdmin()) {
      router.push("/login");
      return;
    }

    fetchLikes();
  }, [isAuthenticated, router]);

  const fetchLikes = async () => {
    try {
      const response = await fetch("/api/admin/likes", {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        await handleAuthError(response);
        return;
      }

      const data = await response.json();
      setLikes(data);
    } catch (error) {
      console.error("Error fetching likes:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLikes = likes.filter((like) => {
    const matchesSearch =
      like.client.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      like.client.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      like.client.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      like.client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      like.applicant.firstName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      like.applicant.lastName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      like.applicant.fullName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      like.applicant.email.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading likes...</div>
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
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => router.push("/admin")}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Likes Management
            </h1>
            <p className="text-gray-300">
              Monitor all client-applicant interactions and engagement
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by client or applicant name/email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterBy}
              onChange={(e) =>
                setFilterBy(e.target.value as "all" | "client" | "applicant")
              }
              className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Filter likes"
            >
              <option value="all">All Likes</option>
              <option value="client">Filter by Client</option>
              <option value="applicant">Filter by Applicant</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Total Likes
              </CardTitle>
              <Heart className="h-4 w-4 text-pink-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {likes.length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Unique Clients
              </CardTitle>
              <Users className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {new Set(likes.map((like) => like.client.id)).size}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Liked Applicants
              </CardTitle>
              <Users className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {new Set(likes.map((like) => like.applicant.id)).size}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Likes List */}
        <div className="space-y-4">
          {filteredLikes.map((like) => (
            <Card
              key={like.id}
              className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-200"
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Client Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">
                          {like.client.firstName ||
                            like.client.fullName ||
                            "Unknown"}
                          {like.client.lastName && ` ${like.client.lastName}`}
                        </h3>
                        <p className="text-gray-300 text-sm">Client</p>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm text-gray-300">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {like.client.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Joined:{" "}
                        {new Date(like.client.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Heart Icon */}
                  <div className="flex items-center justify-center">
                    <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  {/* Applicant Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative w-10 h-10">
                        {like.applicant.photo1 ? (
                          <Image
                            src={like.applicant.photo1}
                            alt={like.applicant.fullName || "Applicant"}
                            fill
                            className="rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">
                          {like.applicant.firstName ||
                            like.applicant.fullName ||
                            "Unknown"}
                          {like.applicant.lastName &&
                            ` ${like.applicant.lastName}`}
                        </h3>
                        <p className="text-gray-300 text-sm">Applicant</p>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm text-gray-300">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {like.applicant.email}
                      </div>
                      {like.applicant.age && (
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Age: {like.applicant.age}
                        </div>
                      )}
                      {like.applicant.cityOfResidence && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {like.applicant.cityOfResidence}
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Applied:{" "}
                        {new Date(
                          like.applicant.createdAt
                        ).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                      onClick={() =>
                        router.push(`/admin/applicants/${like.applicant.id}`)
                      }
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Applicant
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                      onClick={() =>
                        router.push(`/admin/clients/${like.client.id}`)
                      }
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Client
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredLikes.length === 0 && (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <div className="text-white text-xl mb-2">No likes found</div>
            <p className="text-gray-300">
              {searchTerm || filterBy !== "all"
                ? "Try adjusting your search or filter criteria"
                : "No client-applicant interactions have been recorded yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
