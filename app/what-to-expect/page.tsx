"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaCrown,
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
  FaHome,
  FaVideo,
  FaTasks,
  FaMoneyBillWave,
  FaHeart,
  FaGavel,
  FaFileContract,
} from "react-icons/fa";
import { useCallback } from "react";
import ApplyNowButton from "@/components/ui/applynowbutton";

const gold = "#bfa521";

export default function WhatToExpectPage() {
  // Smooth scroll handler
  const handleExploreClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const section = document.getElementById("show-details");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-white to-teal-50 text-gray-900">
      {/* Modern Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-[60vh] md:h-[70vh] text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="z-10"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-teal-600 via-[#bfa521] to-sky-500 bg-clip-text text-transparent mb-2 drop-shadow-lg">
            What to Expect
          </h1>
          <div
            className="w-24 h-1 mx-auto mb-6 rounded-full"
            style={{ background: gold }}
          />
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto mb-8">
            Experience the journey of Passport Bachelor: luxury, romance, and
            real connection in Colombia. Dive into the process, the people, and
            the magic that makes this show unique.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              onClick={handleExploreClick}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 border-2"
              style={{ borderColor: gold }}
            >
              Explore the Experience
            </motion.button>
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }}>
              <ApplyNowButton className="text-lg px-8 py-4" />
            </motion.div>
          </div>
        </motion.div>
        {/* Animated background shapes */}
        <motion.div
          className="absolute -top-24 -left-24 w-96 h-96 bg-teal-200 rounded-full opacity-30 blur-3xl z-0"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-br from-sky-200 via-[#bfa521] to-teal-200 rounded-full opacity-30 blur-3xl z-0"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
      </section>

      {/* Show Overview */}
      <motion.section
        id="show-details"
        className="py-16 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <FaCrown style={{ color: gold }} /> Show Concept
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              This is not a dating show—it is a wife selection challenge. All
              contestants understand this is a once-in-a-lifetime chance to
              marry into a life of stability, love, and elite status in the U.S.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center border-2"
              style={{ borderColor: gold }}
            >
              <FaMapMarkerAlt
                className="text-3xl mb-2"
                style={{ color: gold }}
              />
              <h3 className="text-2xl font-bold text-teal-600 mb-2">
                Location
              </h3>
              <p className="text-gray-700 text-center">
                Santa Marta, Colombia - Jungle Villa near the beach
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <FaClock className="text-3xl text-teal-600 mb-2" />
              <h3 className="text-2xl font-bold text-teal-600 mb-2">
                Duration
              </h3>
              <p className="text-gray-700 text-center">
                8 Days Filming + 45 Days Post-Show Dating Period
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <FaUsers className="text-3xl text-teal-600 mb-2" />
              <h3 className="text-2xl font-bold text-teal-600 mb-2">
                Contestants
              </h3>
              <p className="text-gray-700 text-center">
                20 Pre-screened Colombian women, ages 28-38
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Villa & Production */}
      <motion.section
        className="py-16 px-6 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
        }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12 flex items-center justify-center gap-2">
            <FaHome className="text-teal-500" /> Villa & Production Setup
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-teal-600 mb-6 flex items-center gap-2">
                <FaHome /> Villa Details
              </h3>
              <ul className="space-y-4 text-gray-700">
                <li>Private villa in Santa Marta, near jungle and beach</li>
                <li>8-day rental period</li>
                <li>
                  Young Colombian content creators (no gear rental needed)
                </li>
                <li>They supply mics, drones, cameras</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-teal-600 mb-6 flex items-center gap-2">
                <FaVideo /> Content Output
              </h3>
              <ul className="space-y-4 text-gray-700">
                <li>5–8 full-length episodes (20–40 minutes each)</li>
                <li>10 confessionals / interview shorts</li>
                <li>15+ Instagram/Facebook Reels</li>
                <li>Behind-the-scenes vlogs, bloopers, romantic montages</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contestant Requirements */}
      <motion.section
        className="py-16 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
        }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12 flex items-center justify-center gap-2">
            <FaTasks className="text-teal-500" /> Contestant Requirements
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-teal-600 mb-6">
                Basic Requirements
              </h3>
              <ul className="space-y-4 text-gray-700">
                <li>Female, Age 28–38</li>
                <li>Fluent in English</li>
                <li>Traditional mindset: submissive, loyal, family-oriented</li>
                <li>Physically attractive with model looks, healthy body</li>
                <li>Willing to show affection, compete in homemaking tasks</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-teal-600 mb-6">
                Selection Process
              </h3>
              <ul className="space-y-4 text-gray-700">
                <li>
                  Recruitment via Modeling Agencies (Barranquilla & Santa Marta)
                </li>
                <li>
                  Brand Model Influencers screen and interview all applicants
                </li>
                <li>AI Physical Attraction Lie Detector Test required</li>
                <li>Only 20 women selected for the pilot based on results</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Daily Structure */}
      <motion.section
        className="py-16 px-6 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
        }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12 flex items-center justify-center gap-2">
            <FaClock className="text-teal-500" /> Daily Filming Structure
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-sky-100 to-teal-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-teal-600 mb-4">
                🌅 Morning (8AM–12PM)
              </h3>
              <p className="text-gray-700">Traditional Wife Challenges</p>
            </div>
            <div className="bg-gradient-to-br from-sky-100 to-teal-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-teal-600 mb-4">
                🏐 Afternoon (1PM–5PM)
              </h3>
              <p className="text-gray-700">
                Sports Activities (Volleyball, Basketball, Swimming)
              </p>
            </div>
            <div className="bg-gradient-to-br from-sky-100 to-teal-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-teal-600 mb-4">
                🍽️ Evening (6PM–9PM)
              </h3>
              <p className="text-gray-700">
                Intimate Dinner & Affection Rounds
              </p>
            </div>
            <div className="bg-gradient-to-br from-sky-100 to-teal-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-teal-600 mb-4">
                🌙 Night (9PM–11PM)
              </h3>
              <p className="text-gray-700">
                Confessionals, Judgment, and Reflection
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Challenges */}
      <motion.section
        className="py-16 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
        }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12 flex items-center justify-center gap-2">
            <FaTasks className="text-teal-500" /> Competition Challenges
          </h2>
          <p className="text-center text-xl text-gray-700 mb-12 max-w-3xl mx-auto">
            All contestants compete in categories that reflect traditional wife
            roles:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Cooking competitions",
              "Massage & relaxation service",
              "Household task challenge",
              "Swimwear & beach elegance contest",
              "Bikini pool service event",
              "Sports: Volleyball / Basketball shooting",
              "Serve & dine with the Bachelor",
              "Show how they would treat their husband",
            ].map((challenge, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-teal-600"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <p className="text-gray-700 font-medium">{challenge}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Budget Overview */}
      <motion.section
        className="py-16 px-6 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
        }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12 flex items-center justify-center gap-2">
            <FaMoneyBillWave className="text-teal-500" /> Budget Overview (8
            Days)
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              { item: "Villa Rental", amount: "$1,500" },
              { item: "Food & Beverages", amount: "$250" },
              { item: "Transportation", amount: "$400" },
              { item: "Luxury Gifts (Top 3)", amount: "$300" },
              { item: "Production Crew", amount: "$2,000" },
              { item: "Miscellaneous/Decor", amount: "$1,000" },
              { item: "Post-show Airbnb (30 Days)", amount: "$400" },
              { item: "Groceries for 30 Days", amount: "$150" },
              { item: "Emergency / Misc", amount: "$800" },
            ].map((budget, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-r from-sky-50 to-teal-50 p-4 rounded-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <p className="text-gray-700 font-medium">{budget.item}</p>
                <p className="text-2xl font-bold text-teal-600">
                  {budget.amount}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="text-center bg-teal-600 text-white p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-2">Total Estimated Budget</h3>
            <p className="text-3xl font-bold">~$6,800</p>
            <p className="text-sm mt-2">(well below $10K cap)</p>
          </div>
        </div>
      </motion.section>

      {/* Post-Show Dating Plan */}
      <motion.section
        className="py-16 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
        }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12 flex items-center justify-center gap-2">
            <FaHeart className="text-teal-500" /> Post-Show Dating Plan (45
            Days)
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-teal-600 mb-6">
                  Dating Strategy
                </h3>
                <ul className="space-y-4 text-gray-700">
                  <li>Bachelor stays in Santa Marta for 45 extra days</li>
                  <li>Keeps in touch and dates top 10 women from the pilot</li>
                  <li>Opportunity to explore real chemistry</li>
                  <li>Women free to pursue deeper intimacy voluntarily</li>
                  <li>Final woman selected before Bachelor returns to U.S.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-teal-600 mb-6">
                  Distribution
                </h3>
                <ul className="space-y-4 text-gray-700">
                  <li>Private Release on Elite TV</li>
                  <li>Via IG Live + Exclusive YouTube link</li>
                  <li>Not a public broadcast</li>
                  <li>
                    All rights owned exclusively by Elite International Match
                    Makers
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Scripted Voiceover */}
      <motion.section
        className="py-16 px-6 bg-gradient-to-r from-teal-600 to-sky-600"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
        }}
      >
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-8 flex items-center justify-center gap-2">
            <FaGavel className="text-white" /> Trailer Script
          </h2>
          <div className="space-y-6 text-lg">
            <p className="italic">
              `In the heart of Colombia, twenty beautiful women arrive with one
              mission… to win the love of a man most women will never meet — an
              Elite, high-value American bachelor.`
            </p>
            <p className="italic">
              `He is not here for games. He is not here for flings. He is here
              to find a wife.`
            </p>
            <p className="italic">
              `For 8 days, they will compete to prove they are wife material.
              The winners stay. The rest go home.`
            </p>
            <p className="italic font-bold">
              `This is Passport Bachelor. Exclusive. Private. Real. And only one
              woman… will become his queen.`
            </p>
          </div>
        </div>
      </motion.section>

      {/* Legal & Consent */}
      <motion.section
        className="py-16 px-6 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
        }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12 flex items-center justify-center gap-2">
            <FaFileContract className="text-teal-500" /> Legal & Consent Packets
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              "Pre-screening Application Form (English fluency, attraction, availability)",
              "AI Lie Detector Consent Form (emotional/physical attraction verification)",
              "Post-Show Dating Agreement (expectations, privacy, no-filming clause)",
              "Confidentiality Waivers for all participants",
            ].map((legal, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-6 rounded-lg border-l-4 border-teal-600"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <p className="text-gray-700 font-medium">{legal}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-16 px-6 bg-gradient-to-r from-sky-200 to-teal-200"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Experience Elite Matchmaking?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Join the exclusive world of high-value matchmaking and find your
            perfect traditional partner.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/">
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded text-lg font-semibold">
                Return to Home
              </button>
            </Link>
            <ApplyNowButton className="text-lg px-8 py-4" />
          </div>
        </div>
      </motion.section>
    </div>
  );
}
