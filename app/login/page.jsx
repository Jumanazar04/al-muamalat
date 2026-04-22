"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

import {
  TextField,
  Button,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  FormHelperText,
  InputLabel,
} from "@mui/material";

import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

export default function AuthPage() {
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {

    try {
      await auth.login(data);
      window.location.href = "/";
    console.log("submit data:", data);

    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
          <div className="mb-10">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="text-lg font-bold" style={{ color: "#009688" }}>
                AL MUAMALAT
              </span>
            </Link>
          </div>

          <h1 className="text-5xl font-extrabold mb-6">Get started</h1>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              type="email"
              label="Enter your email"
              fullWidth
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email",
                },
              })}
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
              variant="contained"
              fullWidth
              disabled={auth.loading}
              sx={{
                borderRadius: "10px",
                padding: "10px",
                textTransform: "none",
                fontWeight: "bold",
                backgroundColor: "#009688",
                "&:hover": { backgroundColor: "#00796b" },
              }}
            >
              {auth.loading ? "Loading..." : "Log in"}
            </Button>
          </form>

          <Link href="/register" className="text-gray-500 text-center mt-4">
            Create a new account!
          </Link>
        </div>

        <div className="w-full md:w-1/2 bg-teal-600 text-white flex flex-col items-center justify-center p-6 md:p-10">
          <Image
            src="/login-illustration.png"
            alt="Login Illustration"
            width={256}
            height={320}
          />
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
