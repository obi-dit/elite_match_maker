"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Play, Users, ArrowRight, Zap, Heart } from "lucide-react";
import { Subscription } from "@/typings/subscription";
import {
  SubcriptionIconMapping,
  SubscriptionColorMapping,
  SubscriptionCTAMapping,
  PopularSubscriptionMapping,
} from "@/utils/subscription-mappings";

export default function BecomeMemberPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(false);
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:6000";

  useEffect(() => {
    const fetchSubscriptions = async () => {
      setIsLoadingSubscription(true);
      try {
        const response = await fetch(`${API_BASE_URL}/subscription`);
        const data = (await response.json()) as Subscription[];
        console.log(data);

        setSubscriptions(
          data.map((subscription: Subscription) => ({
            ...subscription,
            icon: SubcriptionIconMapping[subscription.tier.toLowerCase()],
            color: SubscriptionColorMapping[subscription.tier.toLowerCase()],
            cta: SubscriptionCTAMapping[subscription.tier.toLowerCase()],
            popular:
              PopularSubscriptionMapping[subscription.tier.toLowerCase()],
          }))
        );
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      } finally {
        setIsLoadingSubscription(false);
      }
    };
    fetchSubscriptions();
  }, [API_BASE_URL]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-teal-50">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative py-20 px-4 text-center"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Become a{" "}
              <span className="bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-transparent">
                Member
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join the exclusive Elite community and unlock premium content,
              behind-the-scenes access, and direct interactions with our models
            </p>
          </motion.div>

          {/* Value Propositions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            <div className="bg-white rounded-2xl p-6 border border-teal-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-sky-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Premium Content
              </h3>
              <p className="text-gray-600">
                Uncut interviews, challenges, and exclusive behind-the-scenes
                footage
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-sky-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-sky-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Community Access
              </h3>
              <p className="text-gray-600">
                Join our exclusive member community with direct model
                interactions
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-teal-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-sky-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Matchmaking Priority
              </h3>
              <p className="text-gray-600">
                Get first access to our elite matchmaking services and exclusive
                events
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Membership Tiers */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="py-20 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-transparent">
                Membership Tier
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start with Bronze and upgrade as you discover more exclusive
              content and opportunities
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {isLoadingSubscription ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Loading...
              </div>
            ) : (
              subscriptions.map((tier, index) => (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className={`relative ${tier.popular ? "lg:scale-105" : ""}`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-teal-500 to-sky-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div
                    className={`bg-gradient-to-br ${tier.color} rounded-3xl p-8 h-full relative overflow-hidden`}
                  >
                    <div className="relative z-10 h-full">
                      {/* Header */}
                      <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <div className="text-white">{tier.icon}</div>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {tier.tier}
                        </h3>
                        <div className="text-white">
                          <span className="text-4xl font-bold">
                            ${tier.price}
                          </span>
                          <span className="text-lg opacity-80">
                            /{tier.period}
                          </span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mb-8 h-[69%]">
                        <ul className="space-y-3">
                          {tier.subscriptionFeatures.map(
                            (feature, featureIndex) => (
                              <li
                                key={featureIndex}
                                className="flex items-start"
                              >
                                <Check className="w-5 h-5 text-white mt-0.5 mr-3 flex-shrink-0" />
                                <span className="text-white text-sm leading-relaxed">
                                  {feature.feature.name}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      {/* CTA Button */}
                      <Link
                        href={`/become-member/register?tier=${tier.id}`}
                        className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 bg-white text-gray-900 hover:bg-gray-100 inline-flex items-center justify-center`}
                      >
                        {tier.cta}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="py-20 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-teal-600 to-sky-600 rounded-3xl p-12 relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Join the{" "}
                <span className="bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent">
                  Elite Community?
                </span>
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                Start your journey today and unlock exclusive content,
                behind-the-scenes access, and direct interactions with our
                models
              </p>
              <Link
                href="/become-member/register?tier=bronze"
                className="bg-white text-gray-900 py-4 px-8 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 inline-flex items-center shadow-lg"
              >
                Start Your Free Trial
                <Zap className="w-5 h-5 ml-2" />
              </Link>
              <p className="text-white/70 text-sm mt-4">
                No credit card required • 7-day free trial • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
