"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

// API endpoint configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:6000";

// Type definitions for API integration
interface CreateMaleUserRequest {
  fullName?: string;
  age: number;
  email?: string;
  phoneNumber?: string;
  gender?: "MALE";
  cityOfResidence?: string;
  cityOther?: string;
  occupation?: string;
  companyName?: string;
  annualIncome?: string;
  educationLevel?: string;
  maritalStatus?: string;
  hasChildren?: string;
  childrenAges?: string;
  heightCm?: number;
  weightKg?: number;
  healthStatus?: string;
  lifestyleHabits?: string;
  relationshipHistory?: string;
  whatLookingFor?: string;
  dealBreakers?: string;
  hobbiesInterests?: string;
  travelPreferences?: string;
  languageSkills?: string;
  culturalBackground?: string;
  financialStability?: string;
  futurePlans?: string;
  photo1?: string;
  photo2?: string;
  photo3?: string;
  introVideo?: string;
  socialMediaLinks?: string;
  understandsPrivateShow?: boolean;
  understandsNoCompensation?: boolean;
  confirmsTruthful?: boolean;
  willingToPay?: boolean;
  paymentMethod?: string;
}

// Initial form state
const initialFormState = {
  // Section 1: Basic Information
  fullName: "",
  age: "",
  email: "",
  phoneNumber: "",
  cityOfResidence: "",
  otherCity: "",
  occupation: "",
  companyName: "",
  annualIncome: "",
  educationLevel: "",

  // Section 2: Personal Details
  maritalStatus: "",
  hasChildren: "",
  childrenAges: "",
  height: "",
  weight: "",
  healthStatus: "",
  lifestyleHabits: "",

  // Section 3: Relationship & Preferences
  relationshipHistory: "",
  whatLookingFor: "",
  dealBreakers: "",
  hobbiesInterests: "",
  travelPreferences: "",
  languageSkills: "",
  culturalBackground: "",

  // Section 4: Financial & Future
  financialStability: "",
  futurePlans: "",

  // Section 5: Media & Social
  socialMediaLinks: "",

  // Section 6: Final Acknowledgement
  understandPrivateShow: "",
  understandNoCompensation: "",
  confirmInformationTrue: "",
  willingToPay: "",
  paymentMethod: "",
};

export default function MaleOnboarding() {
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
  const transformFormData = (): CreateMaleUserRequest => {
    return {
      fullName: form.fullName || undefined,
      age: parseInt(form.age),
      email: form.email || undefined,
      phoneNumber: form.phoneNumber || undefined,
      gender: "MALE" as const,
      cityOfResidence: form.cityOfResidence || undefined,
      cityOther: form.cityOfResidence === "OTHER" ? form.otherCity : undefined,
      occupation: form.occupation || undefined,
      companyName: form.companyName || undefined,
      annualIncome: form.annualIncome || undefined,
      educationLevel: form.educationLevel || undefined,
      maritalStatus: form.maritalStatus || undefined,
      hasChildren: form.hasChildren || undefined,
      childrenAges: form.childrenAges || undefined,
      heightCm: form.height ? parseInt(form.height) : undefined,
      weightKg: form.weight ? parseInt(form.weight) : undefined,
      healthStatus: form.healthStatus || undefined,
      lifestyleHabits: form.lifestyleHabits || undefined,
      relationshipHistory: form.relationshipHistory || undefined,
      whatLookingFor: form.whatLookingFor || undefined,
      dealBreakers: form.dealBreakers || undefined,
      hobbiesInterests: form.hobbiesInterests || undefined,
      travelPreferences: form.travelPreferences || undefined,
      languageSkills: form.languageSkills || undefined,
      culturalBackground: form.culturalBackground || undefined,
      financialStability: form.financialStability || undefined,
      futurePlans: form.futurePlans || undefined,
      photo1: photoUrls.photo1 || undefined,
      photo2: photoUrls.photo2 || undefined,
      photo3: photoUrls.photo3 || undefined,
      introVideo: videoUrl || undefined,
      socialMediaLinks: form.socialMediaLinks || undefined,
      understandsPrivateShow: form.understandPrivateShow === "Yes",
      understandsNoCompensation: form.understandNoCompensation === "Yes",
      confirmsTruthful: form.confirmInformationTrue === "Yes",
      willingToPay: form.willingToPay === "Yes",
      paymentMethod: form.paymentMethod || undefined,
    };
  };

  // Validate form data before submission
  const validateForm = (): string | null => {
    if (!form.age || parseInt(form.age) < 35 || parseInt(form.age) > 60) {
      return "Age must be between 35 and 60";
    }
    if (
      form.height &&
      (parseInt(form.height) < 150 || parseInt(form.height) > 220)
    ) {
      return "Height must be between 150 and 220 cm";
    }
    if (
      form.weight &&
      (parseInt(form.weight) < 50 || parseInt(form.weight) > 150)
    ) {
      return "Weight must be between 50 and 150 kg";
    }
    if (form.cityOfResidence === "OTHER" && !form.otherCity) {
      return "Please specify your city if selecting (Other)";
    }
    if (!form.willingToPay) {
      return "Please confirm your willingness to pay the program fee";
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

      const response = await fetch(`${API_BASE_URL}/users/male`, {
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

      const result = await response.json();

      // Check if payment session was created
      if (result.paymentSession) {
        // Show success toast
        toast.success(
          "Application submitted successfully! Redirecting to payment...",
          {
            autoClose: 3000,
            position: "top-center",
          }
        );

        // Redirect to Stripe checkout after a short delay
        setTimeout(() => {
          window.location.href = result.paymentSession.url;
        }, 2000);
      } else {
        // Show success toast without payment
        toast.success(
          "Thank you! Your application for Passport Bachelor has been received. Elite International Match Maker will review your submission and contact you within 48 hours.",
          {
            autoClose: 8000,
            position: "top-center",
          }
        );

        // Clear form after successful submission
        clearForm();
      }
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
    <section className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-400 px-6 py-8">
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
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 font-medium">
                Program Fee: $6,800 USD
              </p>
              <p className="text-blue-600 text-sm">
                Includes luxury accommodation, meals, activities, and
                matchmaking services
              </p>
            </div>
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
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">Age *</span>
                  <select
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Age</option>
                    {Array.from({ length: 26 }, (_, i) => 35 + i).map((age) => (
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
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Phone Number *
                  </span>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select City</option>
                    <option value="NEW_YORK">New York</option>
                    <option value="LOS_ANGELES">Los Angeles</option>
                    <option value="CHICAGO">Chicago</option>
                    <option value="HOUSTON">Houston</option>
                    <option value="PHOENIX">Phoenix</option>
                    <option value="PHILADELPHIA">Philadelphia</option>
                    <option value="SAN_ANTONIO">San Antonio</option>
                    <option value="SAN_DIEGO">San Diego</option>
                    <option value="DALLAS">Dallas</option>
                    <option value="SAN_JOSE">San Jose</option>
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
                      className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </label>
                )}

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Occupation *
                  </span>
                  <input
                    type="text"
                    name="occupation"
                    value={form.occupation}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Company Name
                  </span>
                  <input
                    type="text"
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Annual Income *
                  </span>
                  <select
                    name="annualIncome"
                    value={form.annualIncome}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Income Range</option>
                    <option value="UNDER_100K">Under $100,000</option>
                    <option value="100K_200K">$100,000 - $200,000</option>
                    <option value="200K_300K">$200,000 - $300,000</option>
                    <option value="300K_500K">$300,000 - $500,000</option>
                    <option value="500K_1M">$500,000 - $1,000,000</option>
                    <option value="OVER_1M">Over $1,000,000</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Education Level *
                  </span>
                  <select
                    name="educationLevel"
                    value={form.educationLevel}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Education</option>
                    <option value="HIGH_SCHOOL">High School</option>
                    <option value="SOME_COLLEGE">Some College</option>
                    <option value="BACHELORS">Bachelors Degree</option>
                    <option value="MASTERS">Masters Degree</option>
                    <option value="DOCTORATE">Doctorate</option>
                    <option value="OTHER">Other</option>
                  </select>
                </label>
              </div>
            </div>

            {/* Section 2: Personal Details */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Section 2: Personal Details
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Marital Status *
                  </span>
                  <select
                    name="maritalStatus"
                    value={form.maritalStatus}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="SINGLE">Single</option>
                    <option value="DIVORCED">Divorced</option>
                    <option value="WIDOWED">Widowed</option>
                    <option value="SEPARATED">Separated</option>
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
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Option</option>
                    <option value="NO">No</option>
                    <option value="YES">Yes</option>
                  </select>
                </label>

                {form.hasChildren === "YES" && (
                  <label className="block">
                    <span className="text-gray-900 font-medium">
                      Children Ages
                    </span>
                    <input
                      type="text"
                      name="childrenAges"
                      value={form.childrenAges}
                      onChange={handleChange}
                      placeholder="e.g., 8, 12, 15"
                      className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </label>
                )}

                <label className="block">
                  <span className="text-gray-900 font-medium">Height (cm)</span>
                  <input
                    type="number"
                    name="height"
                    value={form.height}
                    onChange={handleChange}
                    min="150"
                    max="220"
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">Weight (kg)</span>
                  <input
                    type="number"
                    name="weight"
                    value={form.weight}
                    onChange={handleChange}
                    min="50"
                    max="150"
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Health Status *
                  </span>
                  <select
                    name="healthStatus"
                    value={form.healthStatus}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Health Status</option>
                    <option value="EXCELLENT">Excellent</option>
                    <option value="GOOD">Good</option>
                    <option value="FAIR">Fair</option>
                    <option value="POOR">Poor</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Lifestyle Habits
                  </span>
                  <textarea
                    name="lifestyleHabits"
                    value={form.lifestyleHabits}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Describe your lifestyle, exercise routine, diet, etc."
                    className="w-full mt-1 text-black p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </label>
              </div>
            </div>

            {/* Section 3: Relationship & Preferences */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Section 3: Relationship & Preferences
              </h2>

              <div className="space-y-4">
                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Relationship History *
                  </span>
                  <textarea
                    name="relationshipHistory"
                    value={form.relationshipHistory}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Briefly describe your past relationships and what you have learned from them"
                    className="w-full mt-1 text-black p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    What are you looking for in a partner? *
                  </span>
                  <textarea
                    name="whatLookingFor"
                    value={form.whatLookingFor}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe the qualities, values, and characteristics you seek in a potential partner"
                    className="w-full mt-1 p-3 text-black border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Deal Breakers
                  </span>
                  <textarea
                    name="dealBreakers"
                    value={form.dealBreakers}
                    onChange={handleChange}
                    rows={3}
                    placeholder="What are your non-negotiables in a relationship?"
                    className="w-full mt-1 p-3 text-black border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Hobbies & Interests *
                  </span>
                  <textarea
                    name="hobbiesInterests"
                    value={form.hobbiesInterests}
                    onChange={handleChange}
                    rows={3}
                    placeholder="What are your main hobbies, interests, and activities you enjoy?"
                    className="w-full mt-1 p-3 text-black border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Travel Preferences
                  </span>
                  <textarea
                    name="travelPreferences"
                    value={form.travelPreferences}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Do you enjoy traveling? What types of destinations do you prefer?"
                    className="w-full mt-1 p-3 text-black border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Language Skills
                  </span>
                  <input
                    type="text"
                    name="languageSkills"
                    value={form.languageSkills}
                    onChange={handleChange}
                    placeholder="e.g., English (native), Spanish (basic), French (intermediate)"
                    className="w-full mt-1 p-3  border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Cultural Background
                  </span>
                  <input
                    type="text"
                    name="culturalBackground"
                    value={form.culturalBackground}
                    onChange={handleChange}
                    placeholder="Your cultural heritage and background"
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </label>
              </div>
            </div>

            {/* Section 4: Financial & Future */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Section 4: Financial & Future
              </h2>

              <div className="space-y-4">
                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Financial Stability *
                  </span>
                  <textarea
                    name="financialStability"
                    value={form.financialStability}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Describe your financial situation, investments, and financial goals"
                    className="w-full mt-1 p-3 text-black border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Future Plans *
                  </span>
                  <textarea
                    name="futurePlans"
                    value={form.futurePlans}
                    onChange={handleChange}
                    rows={3}
                    placeholder="What are your goals for the next 5-10 years? Career, family, lifestyle?"
                    className="w-full mt-1 p-3 border text-black border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </label>
              </div>
            </div>

            {/* Section 5: Media & Social */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Section 5: Media & Social
              </h2>

              <div className="space-y-4">
                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Social Media Links (Optional)
                  </span>
                  <input
                    type="text"
                    name="socialMediaLinks"
                    value={form.socialMediaLinks}
                    onChange={handleChange}
                    placeholder="LinkedIn, Instagram, Facebook, etc."
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </label>
              </div>
            </div>

            {/* Section 6: Final Acknowledgement */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Section 6: Final Acknowledgement
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
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Do you understand the program fee is $6,800 USD and includes
                    all accommodations, meals, and activities? *
                  </span>
                  <select
                    name="understandNoCompensation"
                    value={form.understandNoCompensation}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Are you willing to pay the $6,800 program fee? *
                  </span>
                  <select
                    name="willingToPay"
                    value={form.willingToPay}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-gray-900 font-medium">
                    Preferred Payment Method
                  </span>
                  <select
                    name="paymentMethod"
                    value={form.paymentMethod}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Payment Method</option>
                    <option value="CREDIT_CARD">Credit Card</option>
                    <option value="BANK_TRANSFER">Bank Transfer</option>
                    <option value="PAYPAL">PayPal</option>
                    <option value="WIRE_TRANSFER">Wire Transfer</option>
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
                    className="w-full mt-1 p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white`}
            >
              {isSubmitting
                ? "Submitting..."
                : "Submit Application & Proceed to Payment"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
