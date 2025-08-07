"use client";

import { useEffect, useRef, useState } from "react";

export default function AboutPage() {
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
    <>
      <section className="px-6 py-20 bg-white text-gray-800">
        <div
          ref={sectionRef}
          className={`max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10 transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="lg:w-1/2">
            <h1 className="text-4xl font-extrabold mb-4 text-gray-900">
              About Us
            </h1>
            <h4 className="text-xl font-bold mb-6 text-[#bfa521]">
              Modern Matchmaking Service
            </h4>
            <p className="text-lg leading-7 text-gray-700 mb-4">
              Elite International Matchmakers is a modern matchmaking service
              that blends tradition with technology to help exceptional singles
              find love. We were founded with a passion for bringing people
              together in authentic and meaningful ways. With years of
              experience in relationship coaching and personalized matchmaking,
              we are committed to transforming how our clients approach dating.
            </p>
            <p className="text-lg leading-7 text-gray-700">
              Our mission is to create a supportive and empowering environment
              where singles can grow, connect, and thrive. We believe in quality
              over quantity, and our boutique-style services ensure personalized
              attention and success.
            </p>
          </div>

          <div
            className="lg:w-1/2 w-full h-[300px] sm:h-[400px] md:h-[500px] bg-cover bg-center rounded-lg shadow-md"
            style={{ backgroundImage: "url(/jpeg/handsome.jpg)" }}
          ></div>
        </div>
      </section>
    </>
  );
}
