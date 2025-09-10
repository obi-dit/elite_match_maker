"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import FileUpload from "../../../components/FileUpload";

// API endpoint configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:6000";

// Type definitions for API integration
interface CreateUserRequest {
  fullName?: string;
  age: number;
  email?: string;
  whatsappNumber?: string;
  gender?: "FEMALE";
  cityOfResidence?: string;
  cityOther?: string;
  englishProficiency?: string;
  heightCm: number;
  weightKg: number;
  isSingleAndAvailable?: boolean;
  comfortableFilming?: boolean;
  traditionalWantsMarriage?: boolean;
  willingToCompete?: boolean;
  children?: string;
  willingLieDetector?: boolean;
  consentForMedia?: boolean;
  personalityThreeWords?: string;
  relationshipGoals?: string;
  attractionToOlderMen?: string;
  whyGoodWife?: string;
  talentsOrHobbies?: string;
  comfortableBikiniChallenges: boolean;
  photo1?: string;
  photo2?: string;
  photo3?: string;
  introVideo?: string;
  socialMediaLinks?: string;
  understandsPrivateShow: boolean;
  understandsNoCompensation: boolean;
  confirmsTruthful: boolean;
}

// Initial form state
const initialFormState = {
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
};

export default function FemaleOnboarding() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState(initialFormState);

  // Photo and video URLs
  const [photoUrls, setPhotoUrls] = useState({
    photo1: "",
    photo2: "",
    photo3: "",
  });
  const [videoUrl, setVideoUrl] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (url: string) => {
    // Find the next empty photo slot
    if (!photoUrls.photo1) {
      setPhotoUrls((prev) => ({ ...prev, photo1: url }));
    } else if (!photoUrls.photo2) {
      setPhotoUrls((prev) => ({ ...prev, photo2: url }));
    } else if (!photoUrls.photo3) {
      setPhotoUrls((prev) => ({ ...prev, photo3: url }));
    }
  };

  const handleVideoUpload = (url: string) => {
    setVideoUrl(url);
  };

  const handleUploadError = (error: string) => {
    toast.error(error);
  };

  // Clear form function
  const clearForm = () => {
    setForm(initialFormState);
    setPhotoUrls({
      photo1: "",
      photo2: "",
      photo3: "",
    });
    setVideoUrl("");
  };

  // Transform form data to API format
  const transformFormData = (): CreateUserRequest => {
    return {
      fullName: form.fullName || undefined,
      age: parseInt(form.age),
      email: form.emailAddress || undefined,
      whatsappNumber: form.whatsappNumber || undefined,
      gender: "FEMALE" as const,
      cityOfResidence: form.cityOfResidence || undefined,
      cityOther: form.cityOfResidence === "OTHER" ? form.otherCity : undefined,
      englishProficiency: form.englishSpeaking || undefined,
      heightCm: parseInt(form.height),
      weightKg: parseInt(form.weight),
      isSingleAndAvailable: form.singleAndAvailable === "Yes",
      comfortableFilming: form.comfortableBeingFilmed === "Yes",
      traditionalWantsMarriage: form.traditionalWoman === "Yes",
      willingToCompete: form.willingToCompete === "Yes",
      children: form.hasChildren || undefined,
      willingLieDetector: form.willingLieDetector === "Yes",
      consentForMedia: form.agreeConsentForm === "Yes",
      personalityThreeWords: form.personalityThreeWords || undefined,
      relationshipGoals: form.relationshipGoals || undefined,
      attractionToOlderMen: form.attractedToManOver50 || undefined,
      whyGoodWife: form.goodWifeForBachelor || undefined,
      talentsOrHobbies: form.talentsHobbies || undefined,
      comfortableBikiniChallenges: form.comfortableBikiniChallenges === "Yes",
      photo1: photoUrls.photo1 || undefined,
      photo2: photoUrls.photo2 || undefined,
      photo3: photoUrls.photo3 || undefined,
      introVideo: videoUrl || undefined,
      socialMediaLinks: form.socialMediaLinks || undefined,
      understandsPrivateShow: form.understandPrivateShow === "Yes",
      understandsNoCompensation: form.understandNoCompensation === "Yes",
      confirmsTruthful: form.confirmInformationTrue === "Yes",
    };
  };

  // Validate form data before submission
  const validateForm = (): string | null => {
    if (!form.age || parseInt(form.age) < 28 || parseInt(form.age) > 32) {
      return "Age must be between 28 and 32";
    }
    if (
      !form.height ||
      parseInt(form.height) < 100 ||
      parseInt(form.height) > 250
    ) {
      return "Height must be between 100 and 250 cm";
    }
    if (
      !form.weight ||
      parseInt(form.weight) < 30 ||
      parseInt(form.weight) > 200
    ) {
      return "Weight must be between 30 and 200 kg";
    }
    if (form.cityOfResidence === "OTHER" && !form.otherCity) {
      return "Please specify your city if selecting 'Other'";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const userData = transformFormData();

      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit application");
      }

      // const result = await response.json();

      // Show success toast
      toast.success(
        "Gracias! Your application for Passport Bachelor has been received. Elite International Match Maker will review all submissions. Only applicants who pass the screening will be contacted for the lie detector phase and interview.",
        {
          autoClose: 3000,
          position: "top-center",
        }
      );

      // Redirect to success page after a short delay
      setTimeout(() => {
        router.push(
          `/onboarding/success?session_id=app_${Date.now()}&type=female`
        );
      }, 2000);

      // Clear form after successful submission
      clearForm();
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to submit application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
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
                    <option value="BARRANQUILLA">Barranquilla</option>
                    <option value="SANTA_MARTA">Santa Marta</option>
                    <option value="CARTAGENA">Cartagena</option>
                    <option value="MEDELLIN">Medellín</option>
                    <option value="BOGOTA">Bogotá</option>
                    <option value="OTHER">Other</option>
                  </select>
                </label>

                {form.cityOfResidence === "OTHER" && (
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
                    <option value="YES">Yes</option>
                    <option value="SOMEWHAT">Somewhat</option>
                    <option value="NO">No</option>
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
                    min="100"
                    max="250"
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
                    min="30"
                    max="200"
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
                    <option value="NO">No</option>
                    <option value="YES_1">Yes – 1</option>
                    <option value="YES_2_PLUS">Yes – 2+</option>
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
                    className="w-full mt-1 p-3 border border-gray-500 text-black rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#bfa521] focus:border-transparent"
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
                    className="w-full mt-1 p-3 border text-black border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#bfa521] focus:border-transparent"
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
                    className="w-full text-black mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#bfa521] focus:border-transparent"
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
                    className="w-full text-black mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#bfa521] focus:border-transparent"
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

              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    <strong>
                      Upload 3 recent photos (at least 1 full-body in swimwear)
                    </strong>
                  </p>
                  <FileUpload
                    accept="image"
                    multiple={true}
                    maxFiles={3}
                    onUploadSuccess={handlePhotoUpload}
                    onUploadError={handleUploadError}
                    label="Upload Photos"
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    <strong>
                      Upload a 1-minute video introducing yourself (in English
                      or Spanish)
                    </strong>
                  </p>
                  <FileUpload
                    accept="video"
                    multiple={false}
                    onUploadSuccess={handleVideoUpload}
                    onUploadError={handleUploadError}
                    label="Upload Video"
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
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className={`w-full font-bold text-lg py-4 rounded-lg transition-colors duration-300 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#bfa521] hover:bg-yellow-400"
              } text-black`}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
