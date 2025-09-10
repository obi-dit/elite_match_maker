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
  Crown,
  ArrowLeft,
  Search,
} from "lucide-react";

interface Client {
  id: number;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email: string;
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

export default function ClientManagement() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    if (!isAuthenticated || !isAdmin()) {
      router.push("/login");
      return;
    }

    fetchClients();
  }, [isAuthenticated, router]);

  const fetchClients = async () => {
    try {
      const response = await fetch("/api/admin/clients", {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        await handleAuthError(response);
        return;
      }

      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (
    clientId: number,
    currentStatus: boolean
  ) => {
    try {
      const response = await fetch(`/api/admin/clients/${clientId}/status`, {
        method: "PUT",
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (!response.ok) {
        await handleAuthError(response);
        return;
      }

      // Update local state
      setClients((prevClients) =>
        prevClients.map((client) =>
          client.id === clientId
            ? { ...client, isMembershipSubscribed: !currentStatus }
            : client
        )
      );
    } catch (error) {
      console.error("Error updating client status:", error);
    }
  };

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "active" && client.isMembershipSubscribed) ||
      (filterStatus === "inactive" && !client.isMembershipSubscribed);

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
        <div className="text-white text-xl">Loading clients...</div>
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
              Client Management
            </h1>
            <p className="text-gray-300">
              Manage subscribed clients and their memberships
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
                placeholder="Search clients by name or email..."
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
              aria-label="Filter clients"
              className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Clients</option>
              <option value="active">Active Subscriptions</option>
              <option value="inactive">Inactive Subscriptions</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Total Clients
              </CardTitle>
              <Users className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {clients.length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Active Subscriptions
              </CardTitle>
              <UserCheck className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {clients.filter((c) => c.isMembershipSubscribed).length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Inactive Subscriptions
              </CardTitle>
              <UserX className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {clients.filter((c) => !c.isMembershipSubscribed).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Clients List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <Card
              key={client.id}
              className="bg-white/10 backdrop-blur-lg border-white/20"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-white text-lg mb-2">
                      {client.firstName || client.fullName || "Unknown"}
                      {client.lastName && ` ${client.lastName}`}
                    </CardTitle>
                    <div className="flex gap-2 mb-2">
                      <Badge
                        variant={
                          client.isMembershipSubscribed
                            ? "default"
                            : "secondary"
                        }
                        className={
                          client.isMembershipSubscribed
                            ? "bg-green-600"
                            : "bg-gray-600"
                        }
                      >
                        {client.isMembershipSubscribed ? "Active" : "Inactive"}
                      </Badge>
                      {client.selectedTier && (
                        <Badge className={getTierColor(client.selectedTier)}>
                          <Crown className="h-3 w-3 mr-1" />
                          {client.selectedTier}
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
                    {client.email}
                  </div>

                  {/* Join Date */}
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Calendar className="h-4 w-4" />
                    Joined: {new Date(client.createdAt).toLocaleDateString()}
                  </div>

                  {/* Subscription Info */}
                  {client.userSubscription.length > 0 && (
                    <div>
                      <p className="text-white text-sm font-medium mb-1">
                        Current Subscription:
                      </p>
                      <div className="space-y-1">
                        {client.userSubscription.map((sub, index) => (
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
                  {client.transactions.length > 0 && (
                    <div>
                      <p className="text-white text-sm font-medium mb-1">
                        Recent Transactions:
                      </p>
                      <div className="space-y-1">
                        {client.transactions.slice(0, 2).map((transaction) => (
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
                      className={`flex-1 ${
                        client.isMembershipSubscribed
                          ? "border-red-500/50 text-red-400 hover:bg-red-500/10"
                          : "border-green-500/50 text-green-400 hover:bg-green-500/10"
                      }`}
                      onClick={() =>
                        handleToggleStatus(
                          client.id,
                          client.isMembershipSubscribed
                        )
                      }
                    >
                      {client.isMembershipSubscribed ? (
                        <>
                          <UserX className="h-3 w-3 mr-1" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <UserCheck className="h-3 w-3 mr-1" />
                          Activate
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <div className="text-white text-xl mb-4">No clients found</div>
            <p className="text-gray-300">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search or filter criteria"
                : "No clients have subscribed yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
