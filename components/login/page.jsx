"use client";
import Image from "next/image";
import { TextField, Button, Select } from "@mui/material";
import Link from "next/link";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl overflow-hidden flex flex-col md:flex-row">
        
        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
            <div className="mb-10">
                <a href="/" className="flex  items-center gap-2.5 flex-shrink-0">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <polygon points="20,3 35,12 35,28 20,37 5,28 5,12" fill="none" stroke="#009688" strokeWidth="2.2"/>
                    <rect x="17" y="8" width="6" height="14" rx="1" fill="#FF9800"/>
                    <path d="M11 26 Q20 20 29 26" stroke="#009688" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    <path d="M8 28 Q20 22 32 28" stroke="#009688" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                </svg>
                <span className="text-lg font-bold tracking-wide" style={{ color: "#009688" }}>
                    AL MUAMALAT
                </span>
                </a>
            </div>

          {/* Title */}
          <h1 className="text-5xl font-extrabold mb-6">Get started</h1>

          {/* Form */}
          <div className="flex flex-col gap-4">
            <TextField label="Enter your email" fullWidth />
            <TextField label="Enter your password" fullWidth />

            <Button
              style={{background: "#009688"}}
              variant="outlined"
              fullWidth
              className="bg-teal-600"
              sx={{
                borderRadius: "10px",
                color: "white",
                padding: "10px",
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Log in
            </Button>
            <Link href="/register" className="text-gray-500 text-center mb-6">
                Create a new account !
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 bg-teal-600 text-white flex flex-col items-center justify-center p-6 md:p-10 
        md:rounded-l-[100px] rounded-b-3xl md:rounded-b-none">
          
          {/* Illustration placeholder */}
          <div className="">
            <Image 
                src="/login-illustration.png"
                alt="Login Illustration"
                width={256}
                height={320}
                className="object-cover object-top rounded-t-2xl"   
            />
          </div>

          {/* Text */}
          <h2 className="text-2xl font-bold text-center leading-relaxed">
            Welcome to Al Muamalat – <br />
            Empowering Your Journey in <br />
            Islamic Finance
          </h2>

        </div>
      </div>
    </div>
  );
}