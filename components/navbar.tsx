import Image from "next/image";

const Navbar = () => (
  <nav className="flex justify-between items-center px-6 py-4 bg-transparent absolute top-0 z-40">
    <Image
      src="/logo/logo.jpg"
      width={120}
      alt="Logo"
      className="rounded-full"
    />
  </nav>
);
export default Navbar;
