
// register page
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import useAuth from "../../hooks/useAuth";
import Logo from "../../public/Logo.svg";
import { toast, ToastContainer } from "react-toastify";

export default function AuthPage() {
  const Auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      phone_number: "",
      first_name: "",
      last_name: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await Auth.register(data);

      localStorage.setItem("pendingEmail", data.email);
      window.location.href = "/verify-register";
      toast.success("Registration successful! Please verify your email."); // Show success toast
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
          <div className="mb-6 md:mb-10 flex justify-center md:justify-start">
            <a href="/" className="flex items-center gap-2.5">
              <Image src={Logo} alt="Logo" width={130} height={60} />
            </a>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-center md:text-left mb-3">
            Get started
          </h1>

          <p className="text-gray-500 text-center md:text-left mb-6">
            Already have an account?{" "}
            <Link href="/login" className="text-teal-600">
              Sign in
            </Link>
          </p>

          <div className="flex flex-col gap-4">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <TextField
                label="First Name"
                fullWidth
                {...register("first_name", { required: "First name is required" })}
                error={!!errors.first_name}
                helperText={errors.first_name?.message}
              />

              <TextField
                label="Last Name"
                fullWidth
                {...register("last_name", { required: "Last name is required" })}
                error={!!errors.last_name}
                helperText={errors.last_name?.message}
              />

              <TextField
                label="Phone Number"
                placeholder="+998901234567"
                fullWidth
                {...register("phone_number", { required: "Phone number is required" })}
                error={!!errors.phone_number}
                helperText={errors.phone_number?.message}
              />

              <TextField
                label="Email"
                fullWidth
                {...register("email", { required: "Email is required" })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Min 6 characters",
                  },
                }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.password}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                      {...field}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword((prev) => !prev)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                    <FormHelperText>{errors.password?.message}</FormHelperText>
                  </FormControl>
                )}
              />

              <Button
                type="submit"
                fullWidth
                disabled={Auth.loading}
                sx={{
                  backgroundColor: "#009688",
                  color: "white",
                  borderRadius: "5px",
                  padding: "10px",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#00796B",
                  },
                }}
              >
                {Auth.loading ? "Loading..." : "Sign Up"}
              </Button>
              <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
            </form>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-teal-600 text-white flex flex-col items-center justify-center p-6 md:p-10 md:rounded-l-[100px] rounded-b-3xl md:rounded-b-none">
          <div className="mb-8 md:mb-16 mt-4 md:mt-6">
            <Image
              src="/login-illustration.png"
              alt="Login Illustration"
              width={380}
              height={400}
              className="md:w-64 md:h-80 object-contain"
            />
          </div>

          <h2 className="text-lg md:text-2xl font-bold text-center leading-relaxed px-4">
            Welcome to Al Muamalat - <br />
            Empowering Your Journey in <br />
            Islamic Finance
          </h2>
        </div>
      </div>
    </div>
  );
}