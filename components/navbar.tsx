"use client";
import Image from "next/image";

const Navbar = () => {
  const goBackToHome = () => {
    window.location.href = "/";
  };
  return (
    <nav
      className="flex justify-between items-center px-6 py-4 bg-transparent absolute top-0 z-40"
      onClick={goBackToHome}
    >
      <Image
        src="/logo/logo.jpg"
        width={120}
        height={40}
        alt="Logo"
        className="rounded-full"
      />
    </nav>
  );
};
export default Navbar;
