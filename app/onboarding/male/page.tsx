"use client";

import { useState } from "react";

export default function MaleOnboarding() {
  const [form, setForm] = useState({
    fullName: "",
    age: "",
    income: "",
    healthStatus: "",
    // add more fields as needed
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // submit logic here (API call, validation)
    alert("Submitted male client form!");
  };

  return (
    <section className="min-h-screen flex justify-center items-center bg-gradient-to-br from-sky-100 to-white px-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white rounded-lg shadow-lg p-8"
      >
        <h1 className="text-2xl font-bold mb-6 text-black">
          Male Client Onboarding
        </h1>

        <label className="block mb-4 text-black">
          Full Name
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </label>

        <label className="block mb-4 text-black">
          Age
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            required
            min={35}
            max={60}
          />
        </label>

        {/* Add more fields similarly */}

        <button
          type="submit"
          className="w-full bg-[#bfa521] hover:bg-yellow-400 text-black font-semibold py-3 rounded mt-6"
        >
          Pay $6,800
        </button>
      </form>
    </section>
  );
}
