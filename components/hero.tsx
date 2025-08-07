import Link from "next/link";
const Hero = () => (
  <section
    className="relative h-screen bg-cover bg-center"
    style={{ backgroundImage: "url(/jpeg/hero.jpg)" }}
  >
    <div className="bg-black/50 absolute inset-0 flex items-center justify-center">
      <div className="text-center text-white px-6">
        <h1 className="text-5xl font-bold">
          Modern Matchmaking for U.S Men of Color
        </h1>
        <p className="mt-4 text-lg">
          Connecting high-value U.S. Men with feminine. Family-ready Columbian
          woman
        </p>
        <Link href="#contact">
          <button className="mt-6 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded text-lg">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  </section>
);

export default Hero;
