"use client";

import ApplyNowButton from "./ui/applynowbutton";
import EligibilityCard from "./ui/eligibilitycard";

const femaleCriteria = [
  "Attractive and well-presented",
  "Fluent in English",
  "Educated or career-driven",
  "Live in Estrato 4 or higher",
  "Traditional values & marriage-minded",
];

const maleCriteria = [
  "Fit and health-conscious",
  "Childless",
  "Well-educated & successful",
  "Top 20% U.S. income earners",
  "Ages 35–60",
  "Marriage-minded and serious",
];

const handleApplyClick = () => {
  // Navigate or open application modal, for example:
  window.location.href = "/onboarding";
};

export default function EligibilitySection() {
  return (
    <section id="eligibility" className="bg-teal-600  py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-white">Who We Work With</h2>
        <p className="text-lg text-white font-bold  max-w-3xl mx-auto mb-12">
          We are not a dating site. We connect elite Black men with quality
          Colombian women who are serious about marriage.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          <EligibilityCard
            title="Women We Accept"
            items={femaleCriteria}
            delay={0.1}
          />
          <EligibilityCard
            title="Our Male Clients"
            items={maleCriteria}
            delay={0.3}
          />
        </div>

        <p className="mt-12 text-white text-md  max-w-3xl mx-auto">
          <span className="text-white font-semibold">Note:</span> All clients
          are carefully vetted. We prioritize quality over quantity.
        </p>

        <div className="mt-12 flex justify-center">
          <ApplyNowButton onClick={handleApplyClick} />
        </div>
      </div>
    </section>
  );
}
