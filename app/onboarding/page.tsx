"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaMale, FaFemale } from "react-icons/fa";

export default function Onboarding() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<"male" | "female" | null>(
    null
  );

  const handleContinue = () => {
    if (!selectedRole) return;
    router.push(`/onboarding/${selectedRole}`);
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-teal-600 to-sky-400 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl w-full bg-white rounded-xl shadow-2xl p-10 text-center"
      >
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          Welcome! How would you like to get started?
        </h1>

        <div className="flex flex-col md:flex-row gap-6 justify-center mt-4">
          {/* Male Client Option */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelectedRole("male")}
            className={`flex-1 border-2 rounded-xl p-6 cursor-pointer transition duration-300
              ${
                selectedRole === "male"
                  ? "border-[#bfa521] bg-[#bfa521] text-white shadow-lg"
                  : "border-gray-300 bg-white text-gray-700 hover:border-[#bfa521] hover:shadow-md"
              }`}
          >
            <div className="flex flex-col items-center">
              <FaMale size={36} className="mb-3" />
              <h2 className="text-xl font-semibold mb-1">Male Client</h2>
              <p className="text-sm text-center leading-snug">
                Looking for a serious, marriage-minded Colombian woman? Start
                here.
              </p>
            </div>
          </motion.button>

          {/* Female Applicant Option */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelectedRole("female")}
            className={`flex-1 border-2 rounded-xl p-6 cursor-pointer transition duration-300
              ${
                selectedRole === "female"
                  ? "border-[#bfa521] bg-[#bfa521] text-white shadow-lg"
                  : "border-gray-300 bg-white text-gray-700 hover:border-[#bfa521] hover:shadow-md"
              }`}
          >
            <div className="flex flex-col items-center">
              <FaFemale size={36} className="mb-3" />
              <h2 className="text-xl font-semibold mb-1">Woman Applicant</h2>
              <p className="text-sm text-center leading-snug">
                Interested in joining as a marriage-minded Colombian woman?
                Apply here.
              </p>
            </div>
          </motion.button>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={!selectedRole}
          onClick={handleContinue}
          className={`mt-10 px-10 py-3 rounded-full font-semibold text-lg transition
            ${
              selectedRole
                ? "bg-[#bfa521] text-black hover:bg-yellow-400 cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          Continue
        </motion.button>
      </motion.div>
    </section>
  );
}
