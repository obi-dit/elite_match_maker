
"use client"
import Hero from "@/components/hero";
import AboutPage from "@/components/about";
import ServicesOverview from "@/components/services";
import TestimonialsPreview from "@/components/testimonial";
import Footer from "@/components/footer";
import VideoSection from "@/components/videosection";
import EligibilitySection from "@/components/eligibility";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-white text-gray-900">
      <Hero />
      <AboutPage />
      {/* What to Expect Sneak Peek Section */}
      <section className="relative py-20 px-6 md:px-20 bg-gradient-to-br from-sky-100 via-white to-teal-50 overflow-hidden">
        <motion.div
          className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
         
          <div className="flex-1">
            <motion.h2
              className="text-4xl font-extrabold mb-4 text-gray-900"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              viewport={{ once: true }}
            >
              What to Expect
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 mb-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              viewport={{ once: true }}
            >
              Get an exclusive look at our Passport Bachelor experience: a private villa in Colombia, 20 pre-screened women, and a week-long journey to find true love. Discover the challenges, the luxury, and the real connections that make this show unique.
            </motion.p>
            <motion.a
              href="/what-to-expect"
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block"
            >
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400">
                See More
              </button>
            </motion.a>
          </div>
        </motion.div>
        {/* Decorative blurred circle */}
        <motion.div
          className="absolute -top-20 -left-20 w-72 h-72 bg-teal-200 rounded-full opacity-30 blur-3xl z-0"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />
      </section>
      <VideoSection />
      <ServicesOverview />
      <EligibilitySection />
      <TestimonialsPreview />
      <Footer />
    </div>
  );
}
