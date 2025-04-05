"use client";
import Link from "next/link";
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useRef, useEffect, useState } from "react";



export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    setDropdownOpen(false); // Close dropdown when toggling menu
  };
  
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
    setMenuOpen(false); // Close mobile menu if dropdown opens
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !(menuRef.current as any).contains(event.target)) {
        setMenuOpen(false);
        setDropdownOpen(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  
  return (
    <nav className="w-full bg-white border-b border-gray-200 ">
      <div ref={menuRef} className="mx-3 px-4 py-3 flex items-center justify-between">
        {/* Logo/Brand */}
        <Link href="/" className="text-xl font-bold text-black">
          Anime Recc
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
          <Link href="/" className="navbar-item">Home</Link>
          <Link href="/about" className="navbar-item">About</Link>

          <div className="relative">
          <button onClick={toggleDropdown} className="flex items-center gap-1 navbar-item">
  Menu <ChevronDownIcon
  className={`h-4 w-4 transform transition-transform duration-200 ${
    dropdownOpen ? "" : "rotate-180"
  }`}
/>
</button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-100 shadow-md rounded w-48 z-10">

                <Link href="/random" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>Random Pick</Link>
                <Link href="/elite" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>Elite Picks</Link>
                <Link href="/full" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>Jean’s Anime List</Link>
                <Link href="/quiz" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>Take the Quiz</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link href="/" className="block">Home</Link>
          <Link href="/about" className="block">About</Link>
          <div>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1"
            >
              Menu <ChevronDownIcon className="h-4 w-4" />
            </button>
            {dropdownOpen && (
              <div className="mt-2 ml-2 space-y-1">
                <Link href="/random" className="block">Random</Link>
                <Link href="/elite" className="block">Elite Picks</Link>
                <Link href="/full" className="block">Jean’s Full List</Link>
                <Link href="/quiz" className="block">Quiz</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
