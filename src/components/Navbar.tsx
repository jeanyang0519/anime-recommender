"use client";
import Link from "next/link";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import Image from "../../public/images/logo.png"
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    setDropdownOpen(false); // Close dropdown when toggling menu
  };

  

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node;
  
      if (
        menuRef.current &&
        !menuRef.current.contains(target)
      ) {
        // full navbar clicked outside — close all
        setMenuOpen(false);
        setDropdownOpen(false);
      }
  
      if (
        dropdownOpen &&
        menuRef.current &&
        menuRef.current.contains(target) &&
        !dropdownRef.current?.contains(target) &&
        !menuButtonRef.current?.contains(target)
      ) {
        // clicked inside navbar, but NOT on dropdown or menu button
        setDropdownOpen(false);
      }
    };
  
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [dropdownOpen]);
  

  return (
    <nav
      ref={menuRef}
      className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 "
    >
      <div className="mx-3 px-4 flex items-center justify-between">
        {/* Logo/Brand */}
        <Link href="/" className="text-xl font-bold text-black flex items-center " onClick={() => setDropdownOpen(false)} >
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={60}
          height={60}
          className="rounded-full"
        />
          Anime Rec
        </Link>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {menuOpen ? (
              <XMarkIcon className="h-6 w-6 text-black" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-black" />
            )}
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center ">
          <Link href="/" className="navbar-item" onClick={() => setDropdownOpen(false)} >
            Home
          </Link>
          <Link href="/about" className="navbar-item" onClick={() => setDropdownOpen(false)} >
            About
          </Link>

          <div className="relative">
            <button
            ref={menuButtonRef}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 navbar-item"
            >
              Menu{" "}
              <ChevronDownIcon
                className={`h-4 w-4 transform transition-transform duration-200 ${
                  dropdownOpen ? "" : "rotate-180"
                }`}
              />
            </button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                ref={dropdownRef}
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 mt-2 bg-white border border-gray-100 shadow-md rounded w-48 z-10"
                >
                  
                  <Link
                    href="/full"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Jean’s Anime List
                  </Link>
                  <Link
                    href="/quiz"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Take the Quiz
                  </Link>
                  <Link
                    href="/elite"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Elite Picks
                  </Link>
                  <Link
                    href="/random"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Random Pick
                  </Link>
                  
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        ref={menuRef}
        className={`md:hidden px-6 pb-4 flex flex-wrap gap-4 justify-center ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <Link
          href="/"
          className="navbar-item"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          href="/about"
          className="navbar-item"
          onClick={() => setMenuOpen(false)}
        >
          About
        </Link>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1 navbar-item"
          >
            Menu
            <ChevronDownIcon
              className={`h-4 w-4 transform transition-transform duration-200 ${
                dropdownOpen ? "" : "rotate-180"
              }`}
            />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute right-0 mt-2 bg-white border border-gray-100 shadow-md rounded w-48 z-10"
              >
                <Link
                  href="/random"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Random
                </Link>
                <Link
                  href="/elite"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Elite Picks
                </Link>
                <Link
                  href="/full"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Jean’s Anime List
                </Link>
                <Link
                  href="/quiz"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Take the Quiz
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
