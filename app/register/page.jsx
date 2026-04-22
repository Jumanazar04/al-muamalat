"use client";
import Image from "next/image";
import { TextField, Button, Select, MenuItem } from "@mui/material";
import Link from "next/link";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl overflow-hidden flex flex-col md:flex-row">
        
        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
          
          {/* Logo */}
          <div className="mb-6 md:mb-10 flex justify-center md:justify-start">
            <a href="/" className="flex items-center gap-2.5">
              <svg width="40" height="40" viewBox="0 0 40 40">
                <polygon points="20,3 35,12 35,28 20,37 5,28 5,12" fill="none" stroke="#009688" strokeWidth="2.2"/>
                <rect x="17" y="8" width="6" height="14" rx="1" fill="#FF9800"/>
                <path d="M11 26 Q20 20 29 26" stroke="#009688" strokeWidth="2" fill="none" strokeLinecap="round"/>
                <path d="M8 28 Q20 22 32 28" stroke="#009688" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              </svg>
              <span className="text-lg font-bold text-teal-600">
                AL MUAMALAT
              </span>
            </a>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-extrabold text-center md:text-left mb-3">
            Get started
          </h1>

          <p className="text-gray-500 text-center md:text-left mb-6">
            Already have an account?{" "}
            <Link href="/login" className="text-teal-600">
              Sign in
            </Link>
          </p>

          {/* Form */}
          <div className="flex flex-col gap-4">
            <TextField label="Enter your name" fullWidth />
            <TextField label="Enter your email" fullWidth />

            <Select fullWidth defaultValue={10}>
              <MenuItem value={10}>Uzbekistan</MenuItem>
              <MenuItem value={20}>England</MenuItem>
              <MenuItem value={30}>Russia</MenuItem>
            </Select>

            <Button
              fullWidth
              sx={{
                backgroundColor: "#009688",
                color: "white",
                borderRadius: "10px",
                padding: "10px",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#00796B",
                },
              }}
            >
              Log in
            </Button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 bg-teal-600 text-white flex flex-col items-center justify-center p-6 md:p-10 
        md:rounded-l-[100px] rounded-b-3xl md:rounded-b-none">
          
          {/* Image */}
          <div className="mb-8 md:mb-16 mt-4 md:mt-6">
            <Image
              src="/login-illustration.png"
              alt="Login Illustration"
              width={380}
              height={400}
              className="md:w-64 md:h-80 object-contain"
            />
          </div>

          {/* Text */}
          <h2 className="text-lg md:text-2xl font-bold text-center leading-relaxed px-4">
            Welcome to Al Muamalat – <br />
            Empowering Your Journey in <br />
            Islamic Finance
          </h2>
        </div>
      </div>
    </div>
  );
}