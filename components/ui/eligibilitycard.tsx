// components/EligibilityCard.tsx
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

type Props = {
  title: string;
  items: string[];
  delay?: number;
};

export default function EligibilityCard({ title, items, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="rounded-xl border border-[#bfa521] backdrop-blur-lg shadow-[0_10px_20px_rgba(0,0,0,0.1)] bg-white/90 hover:shadow-xl transition-shadow duration-300 p-8"
    >
      <h3 className="text-2xl font-bold text-black mb-4 border-b border-gray-200 pb-2">
        {title}
      </h3>

      <ul className="space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-gray-800 text-sm md:text-base"
          >
            <FaCheckCircle className="text-[#bfa521] mt-1" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
