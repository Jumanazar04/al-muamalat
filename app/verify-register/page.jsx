"use client";

import { useState } from "react";
import { Button, TextField } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";

export default function VerifyRegisterPage() {
  const Auth = useAuth();
  const [otp, setOtp] = useState("");

  const email =
    typeof window !== "undefined"
      ? localStorage.getItem("pendingEmail") || ""  // register saqlagan kalit
      : "";

  const handleVerify = async () => {
    try {
      if (!email) {
        toast.error("Email topilmadi. Qaytadan ro'yxatdan o'ting.");
        window.location.href = "/register";
        return;
      }

      await Auth.verifySignup({ email, otp }); // ✅ TO'G'RI METHOD

      localStorage.removeItem("pendingEmail");
      toast.success("Akkaunt tasdiqlandi!");
      window.location.href = "/login"; // ✅ Login ga yo'naltir
    } catch (error) {
      console.error("Verify signup error:", error);
      toast.error(error?.response?.data?.message || "OTP noto'g'ri");
    }
  };

  const handleResend = async () => {
    try {
      if (!email) {
        toast.error("Email topilmadi.");
        window.location.href = "/register";
        return;
      }

      await Auth.resendSignupOtp({ email }); // ✅ TO'G'RI METHOD
      toast.success("OTP qayta yuborildi");
    } catch (error) {
      toast.error(error?.response?.data?.message || "OTP yuborilmadi");
    }
  };

  return (
    <div className="max-w-md mx-auto py-20">
      <h1 className="text-3xl font-bold mb-6">Email tasdiqlash</h1>
      <p className="text-gray-500 mb-4">{email} ga OTP yuborildi</p>

      <TextField
        fullWidth
        label="6 xonali OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
      />

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2, backgroundColor: "#009688" }}
        onClick={handleVerify}
        disabled={Auth.loading || otp.length !== 6}
      >
        {Auth.loading ? "Tekshirilmoqda..." : "Tasdiqlash"}
      </Button>

      <Button
        fullWidth
        variant="text"
        sx={{ mt: 1 }}
        onClick={handleResend}
        disabled={Auth.loading}
      >
        OTP qayta yuborish
      </Button>
      <ToastContainer />
    </div>
  );
}