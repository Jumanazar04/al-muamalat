"use client";
import { useState, useRef, useEffect } from "react";
import { Bars3Icon, ChevronDownIcon, XMarkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/Logo.svg";
import { request } from "@/services/request";
import { useQuery } from "@tanstack/react-query";
import {usePathname} from 'next/navigation';

const BRAND = "#009688";
const BRAND_DARK = "#00796b";

export default function Navbar() {
  const [programsOpen, setProgramsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState("ENG");
  const [profil, setProfil] = useState({});
  const pathname = usePathname();
  const isActiveHome = pathname === "/";
  const isActivePrograms = pathname.startsWith("/courses");
  const isActiveFinance = pathname === "/finance-tools";
  const isActiveContact = pathname === "/contact";

  const dropdownRef = useRef<HTMLDivElement>(null); 
  
  const { data: coursesData, isLoading, isError } = useQuery({
    queryKey: ["courses"],
    queryFn: () => request.get('/courses').then(res => res?.data),
  });


  const courseList = coursesData?.data ?? [];

  useEffect(() => {
    
    setProfil(JSON.parse(localStorage.getItem('user') || '{}'));
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProgramsOpen(false);
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 w-full">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image src={Logo} alt="Logo" width={130} height={60} />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          <Link href="/" className={isActiveHome ? `text-[#009688] px-3.5` : `text-gray-600 hover:text-[#009688] px-3.5`}>
            Home
          </Link>

          {/* Programs dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProgramsOpen(!programsOpen)}
              className={ isActivePrograms ? `flex items-center gap-1 text-[#009688]` : `flex items-center gap-1 text-gray-600 hover:text-[#009688]`}
            >
              Programs
              <ChevronDownIcon
                className="w-4 h-4 transition-transform"
                style={{ transform: programsOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </button>

            {/* ✅ Link emas div, ichida har bir kurs o'z Link-iga ega */}
            {programsOpen && (
              <div className="absolute top-full left-0 mt-1.5 bg-white border border-gray-200 rounded-xl shadow-lg min-w-[180px] py-1.5 z-50">
                {courseList.map((course: { course_id: string; name_uz: string }) => (
                  <Link
                    key={course.course_id}
                    href={`/courses/${course.course_id}`}
                    onClick={() => setProgramsOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-teal-50 hover:text-[#009688] transition-colors"
                  >
                    {course.name_uz}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/finance-tools" className={isActiveFinance ? `px-3.5 py-2 rounded-md text-sm text-[#009688]` : `px-3.5 py-2 rounded-md text-sm text-gray-600 hover:text-[#009688]`}>
            Finance tools
          </Link>
          <Link href="/contact" className={isActiveContact ? `px-3.5 py-2 rounded-md text-sm text-[#009688]` : `px-3.5 py-2 rounded-md text-sm text-gray-600 hover:text-[#009688]`} >
            Contact
          </Link>
        </div>

        {/* Right side */}
        <div className="flex gap-2 items-center">
          {/* Language Dropdown */}
          <div className="relative hidden md:flex items-center">
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
                  onClick={() => { setLang("ENG"); setLangOpen(false); }}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  🇬🇧 ENG
                </div>
                <div
                  onClick={() => { setLang("UZ"); setLangOpen(false); }}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  🇺🇿 UZ
                </div>
              </div>
            )}
          </div>

          <div className="w-px h-7 bg-gray-200 hidden md:block" />

          {/* Sign in */}
          {profil ? (
            <Link
              href="/profile"
              className="text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors hidden md:flex"
              style={{ backgroundColor: BRAND }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.backgroundColor = BRAND_DARK)}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.backgroundColor = BRAND)}
            >
             Profile
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors hidden md:flex"
              style={{ backgroundColor: BRAND }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.backgroundColor = BRAND_DARK)}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.backgroundColor = BRAND)}
            >
              Sign in
            </Link>
          )}

          {/* Hamburger */}
          <button className="md:hidden w-10" onClick={() => setMobileOpen(true)}>
            <Bars3Icon className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold">Menu</h2>
          <button onClick={() => setMobileOpen(false)}>
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col p-4 gap-2 text-sm">
          <Link href="/" className="font-medium" style={{ color: BRAND }}>Home</Link>

          {/* ✅ Mobile da ham real kurslar */}
          <p className="text-gray-600 font-medium">Programs</p>
          {courseList.map((course: { course_id: string; name_uz: string }) => (
            <Link
              key={course.course_id}
              href={`/courses/${course.course_id}`}
              onClick={() => setMobileOpen(false)}
              className="text-gray-500 pl-4"
            >
              {course.name_uz}
            </Link>
          ))}

          <Link href="/finance-tools" className="text-gray-600">Finance tools</Link>
          <Link href="/contact" className="text-gray-600">Contact</Link>

          <div className="h-px bg-gray-200 my-3" />

          {/* Mobile lang */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang("ENG")}
              className={`px-3 py-1 rounded text-sm ${lang === "ENG" ? "bg-gray-200" : ""}`}
            >
              🇬🇧 ENG
            </button>
            <button
              onClick={() => setLang("UZ")}
              className={`px-3 py-1 rounded text-sm ${lang === "UZ" ? "bg-gray-200" : ""}`}
            >
              🇺🇿 UZ
            </button>
          </div>

          <Link
            href="/login"
            className="mt-4 text-white py-2 rounded-lg text-center transition-colors"
            style={{ backgroundColor: BRAND }}
          >
            Sign in
          </Link>
        </div>
      </div>
    </nav>
  );
}