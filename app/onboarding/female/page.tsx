"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function FemaleOnboarding() {
  const [form, setForm] = useState({
    // Section 1: Basic Information
    fullName: "",
    age: "",
    emailAddress: "",
    whatsappNumber: "",
    cityOfResidence: "",
    otherCity: "",
    englishSpeaking: "",

    // Section 2: Physical & Lifestyle Info
    height: "",
    weight: "",
    singleAndAvailable: "",
    comfortableBeingFilmed: "",
    traditionalWoman: "",
    willingToCompete: "",
    hasChildren: "",
    willingLieDetector: "",
    agreeConsentForm: "",

    // Section 3: Personality & Intentions
    personalityThreeWords: "",
    relationshipGoals: "",
    attractedToManOver50: "",
    goodWifeForBachelor: "",
    talentsHobbies: "",
    comfortableBikiniChallenges: "",

    // Section 4: Photos & Media
    socialMediaLinks: "",

    // Section 5: Final Acknowledgement
    understandPrivateShow: "",
    understandNoCompensation: "",
    confirmInformationTrue: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // submit logic here (API call, validation)
    alert(
      "Gracias! Your application for Passport Bachelor has been received.\n\nElite International Match Maker will review all submissions. Only applicants who pass the screening will be contacted for the lie detector phase and interview.\n\nIf you have questions, please contact Ms. Nicole at allexandra@diversityintechnology.org"
    );
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-teal-600 to-sky-400 px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-2xl p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Passport Bachelor Application
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Join the exclusive experience in Santa Marta, Colombia
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Basic Information */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Section 1: Basic Information
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-gray-900 font-medium">Full Name *</span>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#bfa521] focus:border-transparent"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">Age *</span>
                  <select
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#bfa521] focus:border-transparent"
                    required
                  >
                    <option value="">Select Age</option>
                    {[28, 29, 30, 31, 32].map((age) => (
                      <option key={age} value={age}>
                        {age}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Email Address *
                  </span>
                  <input
                    type="email"
                    name="emailAddress"
                    value={form.emailAddress}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#bfa521] focus:border-transparent"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    WhatsApp Number *
                  </span>
                  <input
                    type="tel"
                    name="whatsappNumber"
                    value={form.whatsappNumber}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#bfa521] focus:border-transparent"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    City of Residence *
                  </span>
                  <select
                    name="cityOfResidence"
                    value={form.cityOfResidence}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#bfa521] focus:border-transparent"
                    required
                  >
                    <option value="">Select City</option>
                    <option value="Barranquilla">Barranquilla</option>
                    <option value="Santa Marta">Santa Marta</option>
                    <option value="Cartagena">Cartagena</option>
                    <option value="Medellín">Medellín</option>
                    <option value="Bogotá">Bogotá</option>
                    <option value="Other">Other</option>
                  </select>
                </label>

                {form.cityOfResidence === "Other" && (
                  <label className="block">
                    <span className="text-gray-900 font-medium">
                      If Other, please specify *
                    </span>
                    <input
                      type="text"
                      name="otherCity"
                      value={form.otherCity}
                      onChange={handleChange}
                      className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#bfa521] focus:border-transparent"
                      required
                    />
                  </label>
                )}

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Do you speak English? *
                  </span>
                  <select
                    name="englishSpeaking"
                    value={form.englishSpeaking}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#bfa521] focus:border-transparent"
                    required
                  >
                    <option value="">Select Option</option>
                    <option value="Yes">Yes</option>
                    <option value="Somewhat">Somewhat</option>
                    <option value="No">No</option>
                  </select>
                </label>
              </div>
            </div>

            {/* Section 2: Physical & Lifestyle Info */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Section 2: Physical & Lifestyle Info
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Height (cm) *
                  </span>
                  <input
                    type="number"
                    name="height"
                    value={form.height}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#bfa521] focus:border-transparent"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Weight (kg) *
                  </span>
                  <input
                    type="number"
                    name="weight"
                    value={form.weight}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#bfa521] focus:border-transparent"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Are you currently single and emotionally available? *
                  </span>
                  <select
                    name="singleAndAvailable"
                    value={form.singleAndAvailable}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#bfa521] focus:border-transparent"
                    required
                  >
                    <option value="">Select Option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Are you comfortable being filmed for a private reality show
                    in Santa Marta? *
                  </span>
                  <select
                    name="comfortableBeingFilmed"
                    value={form.comfortableBeingFilmed}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#bfa521] focus:border-transparent"
                    required
                  >
                    <option value="">Select Option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Do you consider yourself a traditional woman who desires
                    marriage with an American man? *
                  </span>
                  <select
                    name="traditionalWoman"
                    value={form.traditionalWoman}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#bfa521] focus:border-transparent"
                    required
                  >
                    <option value="">Select Option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Are you willing to compete for the affection of a high-value
                    man from the U.S.? *
                  </span>
                  <select
                    name="willingToCompete"
                    value={form.willingToCompete}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#bfa521] focus:border-transparent"
                    required
                  >
                    <option value="">Select Option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Do you have children? *
                  </span>
                  <select
                    name="hasChildren"
                    value={form.hasChildren}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#bfa521] focus:border-transparent"
                    required
                  >
                    <option value="">Select Option</option>
                    <option value="No">No</option>
                    <option value="Yes – 1">Yes – 1</option>
                    <option value="Yes – 2+">Yes – 2+</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Are you willing to take a lie detector test about physical
                    attraction to the Bachelor? *
                  </span>
                  <select
                    name="willingLieDetector"
                    value={form.willingLieDetector}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#bfa521] focus:border-transparent"
                    required
                  >
                    <option value="">Select Option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Do you agree to sign a consent form and appear on Elite TV
                    and social media promotions? *
                  </span>
                  <select
                    name="agreeConsentForm"
                    value={form.agreeConsentForm}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#bfa521] focus:border-transparent"
                    required
                  >
                    <option value="">Select Option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </label>
              </div>
            </div>

            {/* Section 3: Personality & Intentions */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Section 3: Personality & Intentions
              </h2>

              <div className="space-y-4">
                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Describe your personality in 3 words *
                  </span>
                  <input
                    type="text"
                    name="personalityThreeWords"
                    value={form.personalityThreeWords}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#bfa521] focus:border-transparent"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    What are your relationship goals for the next 2 years? *
                  </span>
                  <textarea
                    name="relationshipGoals"
                    value={form.relationshipGoals}
                    onChange={handleChange}
                    rows={4}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#bfa521] focus:border-transparent"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    What attracts you to a man over 50? *
                  </span>
                  <textarea
                    name="attractedToManOver50"
                    value={form.attractedToManOver50}
                    onChange={handleChange}
                    rows={4}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#bfa521] focus:border-transparent"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Why do you believe you would make a good wife for the
                    Bachelor? *
                  </span>
                  <textarea
                    name="goodWifeForBachelor"
                    value={form.goodWifeForBachelor}
                    onChange={handleChange}
                    rows={4}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#bfa521] focus:border-transparent"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Do you have any talents or hobbies you want to showcase
                    during the show? *
                  </span>
                  <textarea
                    name="talentsHobbies"
                    value={form.talentsHobbies}
                    onChange={handleChange}
                    rows={4}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#bfa521] focus:border-transparent"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Are you comfortable wearing bikinis and doing pool/sport
                    challenges on camera? *
                  </span>
                  <select
                    name="comfortableBikiniChallenges"
                    value={form.comfortableBikiniChallenges}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#bfa521] focus:border-transparent"
                    required
                  >
                    <option value="">Select Option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </label>
              </div>
            </div>

            {/* Section 4: Photos & Media */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Section 4: Photos & Media
              </h2>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-2">
                    <strong>
                      Upload 3 recent photos (at least 1 full-body in swimwear)
                    </strong>
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="w-full p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#bfa521] focus:border-transparent"
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-2">
                    <strong>
                      Upload a 1-minute video introducing yourself (in English
                      or Spanish)
                    </strong>
                  </p>
                  <input
                    type="file"
                    accept="video/*"
                    className="w-full p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#bfa521] focus:border-transparent"
                  />
                </div>

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Social Media Links (Instagram, TikTok, etc.) (Optional)
                  </span>
                  <input
                    type="text"
                    name="socialMediaLinks"
                    value={form.socialMediaLinks}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#bfa521] focus:border-transparent"
                  />
                </label>
              </div>
            </div>

            {/* Section 5: Final Acknowledgement */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Section 5: Final Acknowledgement
              </h2>

              <div className="space-y-4">
                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Do you understand this is a private pilot show and not a
                    nationally aired program? *
                  </span>
                  <select
                    name="understandPrivateShow"
                    value={form.understandPrivateShow}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#bfa521] focus:border-transparent"
                    required
                  >
                    <option value="">Select Option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Do you understand there is no financial compensation, but
                    you will receive food, lodging, and a luxury gift if
                    selected? *
                  </span>
                  <select
                    name="understandNoCompensation"
                    value={form.understandNoCompensation}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#bfa521] focus:border-transparent"
                    required
                  >
                    <option value="">Select Option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Do you confirm all the information provided is true and
                    complete? *
                  </span>
                  <select
                    name="confirmInformationTrue"
                    value={form.confirmInformationTrue}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#bfa521] focus:border-transparent"
                    required
                  >
                    <option value="">Select Option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </label>
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#bfa521] hover:bg-yellow-400 text-black font-bold text-lg py-4 rounded-lg transition-colors duration-300"
            >
              Submit Application
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
