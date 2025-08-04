"use client";

import React from "react";
import { useRouter } from "next/navigation";

type Props = {
  onClick?: () => void;
  className?: string;
};

export default function ApplyNowButton({ onClick, className = "" }: Props) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push("/onboarding");
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`cursor-pointer
        bg-[#bfa521] text-black font-semibold px-8 py-3 rounded-full
        shadow-md hover:bg-yellow-400 transition-colors duration-300
        focus:outline-none focus:ring-4 focus:ring-yellow-300
        ${className}
      `}
      aria-label="Apply Now"
    >
      Apply Now
    </button>
  );
}
