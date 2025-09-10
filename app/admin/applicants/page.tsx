"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore, getAuthHeaders, isAdmin } from "@/store/authStore";
import { handleAuthError } from "@/utils/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  UserCheck,
  UserX,
  Mail,
  Calendar,
  MapPin,
  Heart,
  ArrowLeft,
  Search,
  Eye,
} from "lucide-react";

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
  selectedTier?: string;
  createdAt: string;
  userSubscription: {
    subscription: {
      tier: string;
    };
  }[];
  transactions: {
    id: number;
    amount: number;
    status: string;
    createdAt: string;
    package?: {
      name: string;
    };
    subscription?: {
      tier: string;
    };
  }[];
}

export default function ApplicantManagement() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    if (!isAuthenticated || !isAdmin()) {
      router.push("/login");
      return;
    }

    fetchApplicants();
  }, [isAuthenticated, router]);

  const fetchApplicants = async () => {
    try {
      const response = await fetch("/api/admin/applicants", {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        await handleAuthError(response);
        return;
      }

      const data = await response.json();
      setApplicants(data);
    } catch (error) {
      console.error("Error fetching applicants:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (
    applicantId: number,
    currentStatus: boolean
  ) => {
    try {
      const response = await fetch(
        `/api/admin/applicants/${applicantId}/status`,
        {
          method: "PUT",
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isApproved: !currentStatus }),
        }
      );

      if (!response.ok) {
        await handleAuthError(response);
        return;
      }

      // Update local state
      setApplicants((prevApplicants) =>
        prevApplicants.map((applicant) =>
          applicant.id === applicantId
            ? { ...applicant, isMembershipSubscribed: !currentStatus }
            : applicant
        )
      );
    } catch (error) {
      console.error("Error updating applicant status:", error);
    }
  };

  const filteredApplicants = applicants.filter((applicant) => {
    const matchesSearch =
      applicant.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.cityOfResidence
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "approved" && applicant.isMembershipSubscribed) ||
      (filterStatus === "pending" && !applicant.isMembershipSubscribed);

    return matchesSearch && matchesFilter;
  });

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading applicants...</div>
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
              Applicant Management
            </h1>
            <p className="text-gray-300">Review and manage female applicants</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search applicants by name, email, or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Applicants</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending Review</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Total Applicants
              </CardTitle>
              <Users className="h-4 w-4 text-pink-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {applicants.length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Approved
              </CardTitle>
              <UserCheck className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {applicants.filter((a) => a.isMembershipSubscribed).length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Pending Review
              </CardTitle>
              <UserX className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {applicants.filter((a) => !a.isMembershipSubscribed).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applicants List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredApplicants.map((applicant) => (
            <Card
              key={applicant.id}
              className="bg-white/10 backdrop-blur-lg border-white/20"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-white text-lg mb-2">
                      {applicant.firstName || applicant.fullName || "Unknown"}
                      {applicant.lastName && ` ${applicant.lastName}`}
                    </CardTitle>
                    <div className="flex gap-2 mb-2">
                      <Badge
                        variant={
                          applicant.isMembershipSubscribed
                            ? "default"
                            : "secondary"
                        }
                        className={
                          applicant.isMembershipSubscribed
                            ? "bg-green-600"
                            : "bg-yellow-600"
                        }
                      >
                        {applicant.isMembershipSubscribed
                          ? "Approved"
                          : "Pending"}
                      </Badge>
                      {applicant.selectedTier && (
                        <Badge className={getTierColor(applicant.selectedTier)}>
                          <Heart className="h-3 w-3 mr-1" />
                          {applicant.selectedTier}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Contact Info */}
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Mail className="h-4 w-4" />
                    {applicant.email}
                  </div>

                  {/* Age */}
                  {applicant.age && (
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Users className="h-4 w-4" />
                      Age: {applicant.age}
                    </div>
                  )}

                  {/* Location */}
                  {applicant.cityOfResidence && (
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <MapPin className="h-4 w-4" />
                      {applicant.cityOfResidence}
                    </div>
                  )}

                  {/* Join Date */}
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Calendar className="h-4 w-4" />
                    Applied:{" "}
                    {new Date(applicant.createdAt).toLocaleDateString()}
                  </div>

                  {/* Subscription Info */}
                  {applicant.userSubscription.length > 0 && (
                    <div>
                      <p className="text-white text-sm font-medium mb-1">
                        Current Subscription:
                      </p>
                      <div className="space-y-1">
                        {applicant.userSubscription.map((sub, index) => (
                          <Badge
                            key={index}
                            className={getTierColor(sub.subscription.tier)}
                          >
                            {sub.subscription.tier}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Transaction History */}
                  {applicant.transactions.length > 0 && (
                    <div>
                      <p className="text-white text-sm font-medium mb-1">
                        Recent Transactions:
                      </p>
                      <div className="space-y-1">
                        {applicant.transactions
                          .slice(0, 2)
                          .map((transaction) => (
                            <div
                              key={transaction.id}
                              className="text-xs text-gray-300 bg-white/5 p-2 rounded"
                            >
                              <div className="flex justify-between">
                                <span>
                                  {transaction.package?.name ||
                                    transaction.subscription?.tier ||
                                    "Subscription"}
                                </span>
                                <span className="font-medium">
                                  ${transaction.amount}
                                </span>
                              </div>
                              <div className="text-gray-400">
                                {new Date(
                                  transaction.createdAt
                                ).toLocaleDateString()}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-white/20 text-white hover:bg-white/10"
                      onClick={() =>
                        router.push(`/admin/applicants/${applicant.id}`)
                      }
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className={`${
                        applicant.isMembershipSubscribed
                          ? "border-red-500/50 text-red-400 hover:bg-red-500/10"
                          : "border-green-500/50 text-green-400 hover:bg-green-500/10"
                      }`}
                      onClick={() =>
                        handleToggleStatus(
                          applicant.id,
                          applicant.isMembershipSubscribed
                        )
                      }
                    >
                      {applicant.isMembershipSubscribed ? (
                        <>
                          <UserX className="h-3 w-3 mr-1" />
                          Reject
                        </>
                      ) : (
                        <>
                          <UserCheck className="h-3 w-3 mr-1" />
                          Approve
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredApplicants.length === 0 && (
          <div className="text-center py-12">
            <div className="text-white text-xl mb-4">No applicants found</div>
            <p className="text-gray-300">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search or filter criteria"
                : "No female applicants have registered yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
