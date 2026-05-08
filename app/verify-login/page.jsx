
// login verify page
"use client";

import { useState } from "react";
import { Button, TextField } from "@mui/material";
import useAuth from "../../hooks/useAuth";

export default function LoginVerifyPage() {
  const Auth = useAuth();
  const [otp, setOtp] = useState("");

  const email =
    typeof window !== "undefined"
      ? localStorage.getItem("pendingLoginEmail") || ""
      : "";

  const handleVerify = async () => {
    try {
      if (!email) {
        alert("Email topilmadi. Qaytadan login qiling.");
        window.location.href = "/login";
        return;
      }

      await Auth.verifyLogin({
        email,
        otp,
      });

      localStorage.removeItem("pendingLoginEmail");
      window.location.href = "/profile";
    } catch (error) {
      console.error("Login verify error:", error);
      alert(error?.response?.data?.message || "OTP incorrect");
    }
  };

  const handleResend = async () => {
    try {
      if (!email) {
        alert("Email topilmadi. Qaytadan login qiling.");
        window.location.href = "/verify-login";
        return;
      }

      await Auth.resendLoginOtp({ email });
      alert("OTP qayta yuborildi");
    } catch (error) {
      console.error("Resend login OTP error:", error);
      alert(error?.response?.data?.message || "OTP qayta yuborilmadi");
    }
  };

  return (
    <div className="max-w-md mx-auto py-20">
      <h1 className="text-3xl font-bold mb-6">Verify Login</h1>

      <TextField
        fullWidth
        label="6 digit OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
      />

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleVerify}
        disabled={Auth.loading || otp.length !== 6}
      >
        {Auth.loading ? "Checking..." : "Verify"}
      </Button>

      <Button fullWidth variant="text" sx={{ mt: 1 }} onClick={handleResend} disabled={Auth.loading}>
        Resend OTP
      </Button>
    </div>
  );
}
