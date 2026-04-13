"use client";
import { useState, useRef, useEffect } from "react";
import { Bars3Icon, ChevronDownIcon, XMarkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const BRAND = "#009688";
const BRAND_DARK = "#00796b";

export default function Navbar() {
  const [programsOpen, setProgramsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [langOpen, setLangOpen] = useState(false)
  const [lang, setLang] = useState("ENG")

  const menuRef = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProgramsOpen(false);
        setLangOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 w-full " ref={menuRef}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex  items-center gap-2.5 flex-shrink-0">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <polygon points="20,3 35,12 35,28 20,37 5,28 5,12" fill="none" stroke="#009688" strokeWidth="2.2"/>
            <rect x="17" y="8" width="6" height="14" rx="1" fill="#FF9800"/>
            <path d="M11 26 Q20 20 29 26" stroke="#009688" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M8 28 Q20 22 32 28" stroke="#009688" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
          <span className="text-lg font-bold tracking-wide" style={{ color: BRAND }}>
            AL MUAMALAT
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          <a href="#" className="px-3.5 py-2 rounded-md text-sm font-medium" style={{ color: BRAND }}>
            Home
          </a>

          {/* Programs dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProgramsOpen(!programsOpen)}
              className="flex items-center gap-1 px-3.5 py-2 rounded-md text-sm text-gray-600 hover:text-[#009688] transition-colors"
            >
              Programs
              <ChevronDownIcon
                className="w-4 h-4 transition-transform"
                style={{ transform: programsOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </button>
            {programsOpen && (
              <div className="absolute top-full left-0 mt-1.5 bg-white border border-gray-200 rounded-xl shadow-lg min-w-[180px] py-1.5 z-50">
                {["Islamic Finance", "Murabaha", "Ijarah", "Musharaka"].map((item) => (
                <a
                    key={item}
                    href="#"
                    className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-teal-50 hover:text-[#009688] transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            )}
          </div>

          <a href="#" className="px-3.5 py-2 rounded-md text-sm text-gray-600 hover:text-[#009688] transition-colors">
            Finance tools
          </a>
          <a href="#" className="px-3.5 py-2 rounded-md text-sm text-gray-600 hover:text-[#009688] transition-colors">
            Contact
          </a>
        </div>

  {/* Language Dropdown */}
        <div className="flex gap-2">
           <div className="relative hidden md:flex items-center" ref={dropdownRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm"
            >
              <span>{lang === "ENG" ? "🇬🇧" : "🇺🇿"}</span>
              {lang}
              <ChevronDownIcon className="w-4 h-4" />
            </button>

            {langOpen && (
              <div className="absolute top-12 left-0 bg-white shadow-lg border rounded-lg w-28 overflow-hidden z-50">
                <div
                  onClick={() => { setLang("ENG"); setLangOpen(false) }}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  🇬🇧 ENG
                </div>
                <div
                  onClick={() => { setLang("UZ"); setLangOpen(false) }}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  🇺🇿 UZ
                </div>
              </div>
            )}
          </div>

          <div className="w-px h-7 bg-gray-200" />

          {/* Button */}
          <Link href="/login"
            className="text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors hidden md:flex "
            style={{ backgroundColor: BRAND }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = BRAND_DARK)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = BRAND)}
          >
            Sign in
          </Link> 
        </div>

                <button
          className="md:hidden w-10"
          onClick={() => setMobileOpen(true)}
        >
          <Bars3Icon className="w-6 h-6" />
        </button>

        </div>


     {/* HAMBURGER */}

      

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-40" />
      )}

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold">Menu</h2>
          <button onClick={() => setMobileOpen(false)}>
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* LINKS */}
        <div className="flex flex-col p-4 gap-2 text-sm">
          <a href="#" className="font-medium" style={{ color: BRAND }}>Home</a>
          <a href="#" className="text-gray-600">Programs</a>
          <a href="#" className="text-gray-500 pl-4">Islamic Finance</a>
          <a href="#" className="text-gray-500 pl-4">Murabaha</a>
          <a href="#" className="text-gray-600">Finance tools</a>
          <a href="#" className="text-gray-600">Contact</a>

          <div className="h-px bg-gray-200 my-3" />

          {/* Mobile Lang */}
          <div className="flex  items-center">
            <button
              onClick={() => setLang("ENG")}
              className={`px-3 py-1 rounded ${lang === "ENG" ? "bg-gray-200" : ""}`}
            >
               ENG
            </button>
            <button
              onClick={() => setLang("UZ")}
              className={`px-3 py-1 rounded ${lang === "UZ" ? "bg-gray-200" : ""}`}
            >
               UZ
            </button>
          </div>

          {/* Button */}
          <Link href="/login"
            className="mt-4 text-white py-2 rounded-lg"
            style={{ backgroundColor: BRAND }}
          >
            Sign in
          </Link>
        </div>
      </div>
    </nav>
  );
}