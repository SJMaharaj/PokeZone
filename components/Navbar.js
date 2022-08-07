import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white shadow dark:bg-gray-800">
      <div className="container px-6 py-2 mx-auto md:flex">
        <div className="flex items-center">
          <div>
            <span className="font-bold text-gray-800 transition-colors duration-200 transform dark:text-white lg:text-xl hover:text-gray-700 dark:hover:text-gray-300">
              ZONEPokeDex
            </span>
          </div>

          <div className="flex md:hidden">
            <button
              type="button"
              className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
              aria-label="toggle menu"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="w-full md:flex md:items-center md:justify-between">
          <div className="flex flex-col px-2 py-3 -mx-4 md:flex-row md:mx-0 md:py-0">
            <Link href="/">
              <a className="px-2 py-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded dark:text-gray-200 hover:bg-gray-900 hover:text-gray-100 md:mx-2">
                Home
              </a>
            </Link>
            <a
              href="#"
              className="px-2 py-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded dark:text-gray-200 hover:bg-gray-900 hover:text-gray-100 md:mx-2"
            >
              About
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded dark:text-gray-200 hover:bg-gray-900 hover:text-gray-100 md:mx-2"
            >
              Random
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
