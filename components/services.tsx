"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  {
    title: "Matchmaking",
    desc: "Tailored introductions to compatible singles",
    image: "/jpeg/matchmaking1.jpg",
    link: "",
  },
  {
    title: "Coaching",
    desc: "Dating and relationship coaching by experts",
    image: "/jpeg/coaching.jpeg",
    link: "",
  },
  {
    title: "Events",
    desc: "Private matchmaking mixers and social events",
    image: "/jpeg/events.jpeg",
    link: "",
  },
];

const ServicesOverview = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      className="py-16 px-6 md:px-20 bg-gray-100"
      ref={sectionRef}
    >
      <h2 className="text-3xl font-bold text-center mb-10">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {services.map((s, i) => {
          const CardContent = (
            <div
              className={`bg-white rounded-lg shadow-md overflow-hidden transform transition duration-500 ease-in-out ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              } hover:scale-105 hover:shadow-xl`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                className="h-56 bg-cover bg-top"
                style={{ backgroundImage: `url(${s.image})` }}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-gray-600">{s.desc}</p>
              </div>
            </div>
          );
          return s.link ? (
            <a
              href={s.link}
              key={i}
              className="block focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {CardContent}
            </a>
          ) : (
            <div key={i}>{CardContent}</div>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesOverview;
