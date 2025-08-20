"use client";

import { useState, useEffect } from "react";
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
  selectedPackage?: string;
  selectedAddOns?: number[];
}

interface Package {
  id: number;
  name: string;
  description: string;
  price: number;
  isActive: boolean;
}

interface AddOn {
  id: number;
  name: string;
  description: string;
  price: number | null;
  isCustomPricing: boolean;
  customPricingNote?: string;
  category: string;
  isActive: boolean;
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

  // Package selection state
  const [packages, setPackages] = useState<Package[]>([]);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [isLoadingPackages, setIsLoadingPackages] = useState(false);

  // Add-on selection state
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [selectedAddOns, setSelectedAddOns] = useState<number[]>([]);
  const [isLoadingAddOns, setIsLoadingAddOns] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Fetch available packages
  const fetchPackages = async () => {
    setIsLoadingPackages(true);
    try {
      const response = await fetch(`${API_BASE_URL}/payment/packages`);
      if (response.ok) {
        const data = await response.json();
        setPackages(data.packages || []);
      }
    } catch (error) {
      console.error("Error fetching packages:", error);
      toast.error("Failed to load packages");
    } finally {
      setIsLoadingPackages(false);
    }
  };

  // Fetch available add-ons
  const fetchAddOns = async () => {
    setIsLoadingAddOns(true);
    try {
      const response = await fetch(`${API_BASE_URL}/addons`);
      if (response.ok) {
        const data = await response.json();
        setAddOns(data.addons || []);

        // Auto-select background verification add-on
        const backgroundVerification = data.addons?.find(
          (addon: AddOn) => addon.name === "Background Verification"
        );
        if (backgroundVerification) {
          setSelectedAddOns([backgroundVerification.id]);
        }
      }
    } catch (error) {
      console.error("Error fetching add-ons:", error);
      toast.error("Failed to load add-ons");
    } finally {
      setIsLoadingAddOns(false);
    }
  };

  // Load packages and add-ons on component mount
  useEffect(() => {
    fetchPackages();
    fetchAddOns();
  }, []);

  // Handle add-on selection
  const handleAddOnSelection = (addOnId: number, checked: boolean) => {
    if (checked) {
      setSelectedAddOns((prev) => [...prev, addOnId]);
    } else {
      setSelectedAddOns((prev) => prev.filter((id) => id !== addOnId));
    }
  };

  // Calculate total price including add-ons
  const calculateTotalPrice = () => {
    let total = 0;
    // Add package price
    if (selectedPackage) {
      const pkg = packages.find((p) => p.name === selectedPackage);
      if (pkg) {
        total += Number(pkg.price);
      }
    }

    // Add selected add-ons prices
    selectedAddOns.forEach((addOnId) => {
      const addOn = addOns.find((a) => a.id === addOnId);
      if (addOn && addOn.price && !addOn.isCustomPricing) {
        total += Number(addOn.price);
      }
    });

    return total;
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
    setSelectedPackage("");
    setSelectedAddOns([]);
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
      understandsNoCompensation: true,
      confirmsTruthful: form.confirmInformationTrue === "Yes",
      willingToPay: true,
      paymentMethod: form.paymentMethod || undefined,
      selectedPackage: selectedPackage || undefined,
      selectedAddOns: selectedAddOns,
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
    if (!selectedPackage) {
      return "Please select a package to continue";
    }

    // Ensure background verification is always selected
    const backgroundVerification = addOns.find(
      (addon) => addon.name === "Background Verification"
    );
    if (
      backgroundVerification &&
      !selectedAddOns.includes(backgroundVerification.id)
    ) {
      return "Background verification is required for all applications";
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

      // First create the user
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

      // Check if payment session was created by the backend
      if (result.paymentSession && result.paymentSession.url) {
        // Redirect to payment
        toast.success(
          "Application submitted successfully! Redirecting to payment...",
          {
            autoClose: 3000,
            position: "top-center",
          }
        );

        setTimeout(() => {
          window.location.href = result.paymentSession.url;
        }, 2000);
        return;
      }

      // Show success toast without payment
      toast.success(
        "Thank you! Your application has been received. Elite International Match Maker will review your submission and contact you within 48 hours.",
        {
          autoClose: 8000,
          position: "top-center",
        }
      );

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
    <section className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-400 px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-2xl p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Elite Matchmaking Application
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Choose your perfect package and start your journey to finding love
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 font-medium">
                Multiple Package Options Available
              </p>
              <p className="text-blue-600 text-sm">
                From starter packages to exclusive villa experiences - choose
                what fits your needs
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

            {/* Section 6: Package Selection */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Section 6: Choose Your Package
              </h2>

              <div className="space-y-6">
                {isLoadingPackages ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-gray-600 mt-2">Loading packages...</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {packages.map((pkg) => (
                      <motion.div
                        key={pkg.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                          selectedPackage === pkg.name
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        onClick={() => setSelectedPackage(pkg.name)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {pkg.name}
                            </h3>
                            <p className="text-gray-600 text-sm mt-1">
                              {pkg.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">
                              ${pkg.price.toLocaleString()}
                            </div>
                            {selectedPackage === pkg.name && (
                              <div className="text-blue-600 text-sm mt-1">
                                ✓ Selected
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {selectedPackage && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 font-medium">
                      Selected Package:{" "}
                      <span className="font-bold">{selectedPackage}</span>
                    </p>
                    <p className="text-green-600 text-sm mt-1">
                      You will be redirected to payment after form submission.
                    </p>
                  </div>
                )}

                {!selectedPackage && packages.length > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800 font-medium">
                      Please select a package to continue
                    </p>
                  </div>
                )}

                {/* Add-On Selection */}
                {selectedPackage && addOns.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Additional Services (Optional)
                    </h3>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                      <p className="text-green-800 text-sm">
                        <span className="font-semibold">Note:</span> Background
                        verification is automatically included for your safety
                        and is pre-selected by default. You can optionally add
                        other services below.
                      </p>
                    </div>

                    {isLoadingAddOns ? (
                      <div className="text-center py-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="text-gray-600 mt-2">Loading add-ons...</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {addOns.map((addOn) => (
                          <div
                            key={addOn.id}
                            className="flex items-center space-x-3"
                          >
                            <input
                              type="checkbox"
                              id={`addon-${addOn.id}`}
                              checked={selectedAddOns.includes(addOn.id)}
                              onChange={(e) =>
                                handleAddOnSelection(addOn.id, e.target.checked)
                              }
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label
                              htmlFor={`addon-${addOn.id}`}
                              className="flex-1"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <span className="font-medium text-gray-900">
                                    {addOn.name}
                                  </span>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {addOn.description}
                                  </p>
                                </div>
                                <div className="text-right">
                                  {addOn.isCustomPricing ? (
                                    <div>
                                      <span className="text-sm text-gray-500">
                                        Custom pricing
                                      </span>
                                      <p className="text-xs text-gray-400 mt-1">
                                        {addOn.customPricingNote}
                                      </p>
                                    </div>
                                  ) : (
                                    <span className="font-semibold text-blue-600">
                                      ${addOn.price?.toLocaleString()}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Total Price Display */}
                    {selectedPackage && (
                      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-gray-900">
                            Total Price:
                          </span>
                          <span className="text-2xl font-bold text-blue-600">
                            ${calculateTotalPrice().toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-blue-600 mt-2">
                          Package: {selectedPackage} + Selected Add-ons
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Section 7: Final Acknowledgement */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Section 7: Final Acknowledgement
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

                {/* <label className="block">
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
                </label> */}

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
              disabled={isSubmitting || !selectedPackage}
              whileHover={{
                scale: isSubmitting || !selectedPackage ? 1 : 1.02,
              }}
              whileTap={{ scale: isSubmitting || !selectedPackage ? 1 : 0.98 }}
              className={`w-full font-bold text-lg py-4 rounded-lg transition-colors duration-300 ${
                isSubmitting || !selectedPackage
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white`}
            >
              {isSubmitting
                ? "Submitting..."
                : !selectedPackage
                ? "Please Select a Package"
                : `Submit Application & Pay $${calculateTotalPrice().toLocaleString()}`}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
