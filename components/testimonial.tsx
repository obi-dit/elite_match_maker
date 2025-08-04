"use client";

import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote:
      "I never believed matchmaking could work — but I found my fiancé in just 3 months!",
    name: "Stephanie M.",
  },
  {
    quote:
      "Their coaching gave me the confidence I needed to start dating again.",
    name: "James R.",
  },
];

const TestimonialsPreview = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="testimonials" className="py-20 px-6 md:px-20  text-center">
      <h2 className="text-3xl font-bold mb-12">What Our Clients Say</h2>

      <div
        ref={sectionRef}
        className={`grid gap-8 md:grid-cols-2 max-w-5xl mx-auto transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-gray-50 p-6 rounded-xl shadow-md flex flex-col items-center hover:shadow-lg transition-shadow"
          >
            <div className="w-14 h-14 rounded-full bg-[#bfa521] flex items-center justify-center text-white text-xl font-bold mb-4">
              {t.name[0]}
            </div>
            <p className="text-gray-700 italic leading-relaxed">“{t.quote}”</p>
            <p className="mt-4 font-semibold text-gray-900">{t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsPreview;
