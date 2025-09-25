"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuthStore, getAuthHeaders, isAdmin } from "@/store/authStore";
import { handleAuthError } from "@/utils/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Mail,
  Calendar,
  MapPin,
  Heart,
  UserCheck,
  UserX,
  Users,
  DollarSign,
  Clock,
  FileText,
  Shield,
  AlertCircle,
  Image,
  Play,
  Eye,
} from "lucide-react";
import NextImage from "next/image";

interface Applicant {
  id: number;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  age?: number;
  gender: string;
  cityOfResidence?: string;
  isMembershipSubscribed: boolean;
  isApplicantApproved: boolean;
  createdAt: string;
  updatedAt: string;
  photo1?: string;
  photo2?: string;
  photo3?: string;
  introVideo?: string;
  userSubscription: {
    id: number;
    subscription: {
      id: number;
      tier: string;
      price: number;
      duration: number;
    };
    startDate: string;
    endDate: string;
    isActive: boolean;
  }[];
  transactions: {
    id: number;
    amount: number;
    status: string;
    createdAt: string;
    package?: {
      id: number;
      name: string;
      price: number;
    };
    subscription?: {
      id: number;
      tier: string;
      price: number;
    };
  }[];
  podcastAccess: {
    id: number;
    podcast: {
      id: number;
      title: string;
      status: string;
      type: string;
    };
    accessDate: string;
  }[];
}

export default function ApplicantDetail() {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated } = useAuthStore();
  const [applicant, setApplicant] = useState<Applicant | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin()) {
      router.push("/login");
      return;
    }

    if (params.id) {
      fetchApplicant(Number(params.id));
    }
  }, [isAuthenticated, router, params.id]);

  const fetchApplicant = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/applicants/${id}`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        await handleAuthError(response);
        return;
      }

      const data = await response.json();
      setApplicant(data);
    } catch (error) {
      console.error("Error fetching applicant:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async () => {
    if (!applicant) return;

    setActionLoading(true);
    try {
      const response = await fetch(
        `/api/admin/applicants/${applicant.id}/status`,
        {
          method: "PUT",
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isApproved: !applicant.isApplicantApproved }),
        }
      );

      if (!response.ok) {
        await handleAuthError(response);
        return;
      }

      // Update local state
      setApplicant((prev) =>
        prev
          ? { ...prev, isApplicantApproved: !prev.isApplicantApproved }
          : null
      );
    } catch (error) {
      console.error("Error updating applicant status:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const getTierColor = (tier?: string) => {
    switch (tier) {
      case "BRONZE":
        return "bg-orange-600";
      case "SILVER":
        return "bg-gray-600";
      case "GOLD":
        return "bg-yellow-600";
      case "ELITEVIP":
        return "bg-purple-600";
      default:
        return "bg-gray-600";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-600";
      case "PENDING":
        return "bg-yellow-600";
      case "FAILED":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading applicant details...</div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin()) {
    return null;
  }

  if (!applicant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <div className="text-white text-xl mb-2">Applicant not found</div>
          <p className="text-gray-300 mb-4">
            The applicant you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Button
            onClick={() => router.push("/admin/applicants")}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Applicants
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => router.push("/admin/applicants")}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Applicants
          </Button>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white mb-2">
              Applicant Details
            </h1>
            <p className="text-gray-300">
              View and manage{" "}
              {applicant.firstName || applicant.fullName || "applicant"}&apos;s
              information
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Applicant Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-white">
                  <FileText className="h-4 w-4" />
                  <span className="font-medium">Name:</span>
                  <span>
                    {applicant.firstName ||
                      applicant.fullName ||
                      "Not provided"}
                    {applicant.lastName && ` ${applicant.lastName}`}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-300">
                  <Mail className="h-4 w-4" />
                  <span className="font-medium">Email:</span>
                  <span>{applicant.email}</span>
                </div>

                {applicant.age && (
                  <div className="flex items-center gap-2 text-gray-300">
                    <Users className="h-4 w-4" />
                    <span className="font-medium">Age:</span>
                    <span>{applicant.age}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-gray-300">
                  <Heart className="h-4 w-4" />
                  <span className="font-medium">Gender:</span>
                  <span>{applicant.gender}</span>
                </div>

                {applicant.cityOfResidence && (
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin className="h-4 w-4" />
                    <span className="font-medium">Location:</span>
                    <span>{applicant.cityOfResidence}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-gray-300">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">Applied:</span>
                  <span>
                    {new Date(applicant.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Photos and Media */}
            {applicant.photo1 ||
            applicant.photo2 ||
            applicant.photo3 ||
            applicant.introVideo ? (
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Image className="h-5 w-5" aria-hidden="true" />
                    Photos & Media
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Photos Grid */}
                    {(applicant.photo1 ||
                      applicant.photo2 ||
                      applicant.photo3) && (
                      <div>
                        <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                          <Image className="h-4 w-4" aria-hidden="true" />
                          Photos
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {[
                            applicant.photo1,
                            applicant.photo2,
                            applicant.photo3,
                          ]
                            .filter(Boolean)
                            .map((photo, index) => (
                              <div
                                key={index}
                                className="relative group cursor-pointer"
                                onClick={() => window.open(photo, "_blank")}
                              >
                                <div className="aspect-square rounded-lg overflow-hidden bg-white/5 border border-white/20 relative">
                                  <NextImage
                                    src={photo || "/placeholder-avatar.jpg"}
                                    alt={`Applicant photo ${index + 1}`}
                                    width={400}
                                    height={400}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                    onError={(e) => {
                                      const target =
                                        e.target as HTMLImageElement;
                                      target.style.display = "none";
                                      const parent = target.parentElement;
                                      if (parent) {
                                        parent.innerHTML = `
                                          <div class="w-full h-full flex items-center justify-center text-gray-400">
                                            <div class="text-center">
                                              <Image class="h-8 w-8 mx-auto mb-2" />
                                              <p class="text-sm">Image not available</p>
                                            </div>
                                          </div>
                                        `;
                                      }
                                    }}
                                  />
                                </div>
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 rounded-lg flex items-center justify-center">
                                  <Eye className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                </div>
                                <div className="mt-2 text-center">
                                  <span className="text-sm text-gray-300">
                                    Photo {index + 1}
                                  </span>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* Intro Video */}
                    {applicant.introVideo && (
                      <div>
                        <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                          <Play className="h-4 w-4" />
                          Intro Video
                        </h4>
                        <div
                          className="relative group cursor-pointer"
                          onClick={() =>
                            window.open(applicant.introVideo, "_blank")
                          }
                        >
                          <div className="aspect-video rounded-lg overflow-hidden bg-white/5 border border-white/20">
                            <video
                              src={applicant.introVideo}
                              className="w-full h-full object-cover"
                              controls={false}
                              onError={(e) => {
                                const target = e.target as HTMLVideoElement;
                                target.style.display = "none";
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = `
                                    <div class="w-full h-full flex items-center justify-center text-gray-400">
                                      <div class="text-center">
                                        <Play class="h-8 w-8 mx-auto mb-2" />
                                        <p class="text-sm">Video not available</p>
                                      </div>
                                    </div>
                                  `;
                                }
                              }}
                            />
                          </div>
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 rounded-lg flex items-center justify-center">
                            <div className="bg-white/20 rounded-full p-3 group-hover:bg-white/30 transition-colors duration-200">
                              <Play className="h-6 w-6 text-white" />
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 text-center">
                          <span className="text-sm text-gray-300">
                            Click to view full video
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Image className="h-5 w-5" aria-hidden="true" />
                    Photos & Media
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Image
                      className="h-12 w-12 text-gray-400 mx-auto mb-4"
                      aria-hidden="true"
                    />
                    <p className="text-gray-300 text-lg mb-2">
                      No media uploaded
                    </p>
                    <p className="text-gray-400 text-sm">
                      This applicant hasn&apos;t uploaded any photos or videos
                      yet.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Subscription Information */}
            {applicant.userSubscription.length > 0 && (
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Subscription Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {applicant.userSubscription.map((subscription) => (
                      <div
                        key={subscription.id}
                        className="bg-white/5 p-4 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Badge
                            className={getTierColor(
                              subscription.subscription.tier
                            )}
                          >
                            <Heart className="h-3 w-3 mr-1" />
                            {subscription.subscription.tier}
                          </Badge>
                          <Badge
                            variant={
                              subscription.isActive ? "default" : "secondary"
                            }
                            className={
                              subscription.isActive
                                ? "bg-green-600"
                                : "bg-gray-600"
                            }
                          >
                            {subscription.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                          <div>
                            <span className="font-medium">Price:</span> $
                            {subscription.subscription.price}
                          </div>
                          <div>
                            <span className="font-medium">Duration:</span>{" "}
                            {subscription.subscription.duration} days
                          </div>
                          <div>
                            <span className="font-medium">Start Date:</span>{" "}
                            {new Date(
                              subscription.startDate
                            ).toLocaleDateString()}
                          </div>
                          <div>
                            <span className="font-medium">End Date:</span>{" "}
                            {new Date(
                              subscription.endDate
                            ).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Transaction History */}
            {applicant.transactions.length > 0 && (
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Transaction History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {applicant.transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="bg-white/5 p-4 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-white font-medium">
                            {transaction.package?.name ||
                              transaction.subscription?.tier ||
                              "Subscription"}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={getStatusColor(transaction.status)}
                            >
                              {transaction.status}
                            </Badge>
                            <span className="text-white font-bold">
                              ${transaction.amount}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-300 flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {new Date(transaction.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Podcast Access */}
            {applicant.podcastAccess.length > 0 && (
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Podcast Access
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {applicant.podcastAccess.map((access) => (
                      <div
                        key={access.id}
                        className="bg-white/5 p-4 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-white font-medium">
                            {access.podcast.title}
                          </div>
                          <Badge
                            variant={
                              access.podcast.status === "PUBLISHED"
                                ? "default"
                                : "secondary"
                            }
                            className={
                              access.podcast.status === "PUBLISHED"
                                ? "bg-green-600"
                                : "bg-yellow-600"
                            }
                          >
                            {access.podcast.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-300">
                          <div>
                            <span className="font-medium">Type:</span>{" "}
                            {access.podcast.type}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="h-4 w-4" />
                            Access granted:{" "}
                            {new Date(access.accessDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Application Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Status:</span>
                  <Badge
                    variant={
                      applicant.isApplicantApproved ? "default" : "secondary"
                    }
                    className={
                      applicant.isApplicantApproved
                        ? "bg-green-600"
                        : "bg-yellow-600"
                    }
                  >
                    {applicant.isApplicantApproved ? "Approved" : "Pending"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Membership:</span>
                  <Badge
                    variant={
                      applicant.isMembershipSubscribed ? "default" : "secondary"
                    }
                    className={
                      applicant.isMembershipSubscribed
                        ? "bg-green-600"
                        : "bg-gray-600"
                    }
                  >
                    {applicant.isMembershipSubscribed
                      ? "Subscribed"
                      : "Not Subscribed"}
                  </Badge>
                </div>

                <Button
                  onClick={handleToggleStatus}
                  disabled={actionLoading}
                  className={`w-full ${
                    applicant.isApplicantApproved
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  {actionLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Processing...
                    </div>
                  ) : applicant.isApplicantApproved ? (
                    <>
                      <UserX className="h-4 w-4 mr-2" />
                      Reject Application
                    </>
                  ) : (
                    <>
                      <UserCheck className="h-4 w-4 mr-2" />
                      Approve Application
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Total Subscriptions:</span>
                  <span className="text-white font-medium">
                    {applicant.userSubscription.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Total Transactions:</span>
                  <span className="text-white font-medium">
                    {applicant.transactions.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Total Spent:</span>
                  <span className="text-white font-medium">
                    $
                    {applicant.transactions
                      .reduce((sum, t) => sum + t.amount, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Podcast Access:</span>
                  <span className="text-white font-medium">
                    {applicant.podcastAccess.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Photos:</span>
                  <span className="text-white font-medium">
                    {
                      [
                        applicant.photo1,
                        applicant.photo2,
                        applicant.photo3,
                      ].filter(Boolean).length
                    }
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Intro Video:</span>
                  <span className="text-white font-medium">
                    {applicant.introVideo ? "Yes" : "No"}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Account Details */}
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Account Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-300">
                  <div>
                    <span className="font-medium">User ID:</span> {applicant.id}
                  </div>
                  <div>
                    <span className="font-medium">Created:</span>{" "}
                    {new Date(applicant.createdAt).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-medium">Last Updated:</span>{" "}
                    {new Date(applicant.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
