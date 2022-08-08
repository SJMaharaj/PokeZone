import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white shadow dark:bg-black">
      <div className="container px-6 py-2 mx-auto md:flex">
        <Link href="/">
          <a className="font-bold text-gray-800 transition-colors duration-200 transform dark:text-white lg:text-xl hover:text-gray-700 dark:hover:text-gray-300">
            PokeZONE
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
