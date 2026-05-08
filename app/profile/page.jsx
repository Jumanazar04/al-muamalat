"use client";

import styles from './index.js'
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast, ToastContainer } from "react-toastify";// yoki Next.js ishlatayotgan bo'lsang: import { useRouter } from "next/navigation"
import { useRouter } from "next/navigation"
import { request } from "../../services/request";

export default function ProfilePage() {
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const router = useRouter(); // Next.js uchun: const router = useRouter();

  const { data: user, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: () => request.get("/users/me").then((res) => res.data),
  });

  const mutation = useMutation({
    mutationKey: ["Userdata", user?.data?.user_id],
    mutationFn: (data) =>
      request.put(`/users/${user?.data?.user_id}`, data),
    onSuccess: (updatedUser) => {
      toast.success("Profil muvaffaqiyatli yangilandi!");
      queryClient.setQueryData(["me"], updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Yangilashda xato!");
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      full_name: "",
      address: "",
      phone_number: "",
      password: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        full_name: user.full_name || "",
        address: user.address || "",
        phone_number: user.phone_number || "",
        password: "",
      });
    }
  }, [user, reset]);

  const onSubmit = (data) => {
    const payload = {
      full_name: data.full_name,
      address: data.address,
      phone_number: data.phone_number,
    };
    if (data.password) payload.password = data.password;
    mutation.mutate(payload);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CircularProgress sx={{ color: "#009688" }} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p style={{ color: "#ef4444" }}>Ma'lumotlarni yuklashda xato!</p>
      </div>
    );
  }

  const avatarLetter = user?.full_name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div style={styles.page}>
      {/* Tab buttons */}
      <div style={styles.tabs}>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === "profile" ? styles.tabActive : styles.tabInactive),
          }}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === "courses" ? styles.tabActive : styles.tabInactive),
          }}
          onClick={() => {
            setActiveTab("courses");
            router.push("/courses"); // Next.js uchun: router.push("/courses")
          }}
        >
          Courses
        </button>
      </div>

      {/* Card */}
      <div style={styles.card}>
        {/* Header: Avatar + Name + Save */}
        <div style={styles.cardHeader}>
          <div style={styles.avatarRow}>
            {user?.avatar ? (
              <img src={user.avatar} alt="avatar" style={styles.avatarImg} />
            ) : (
              <div style={styles.avatarFallback}>{avatarLetter}</div>
            )}
            <span style={styles.userName}>{user?.data?.full_name || "User"}</span>
          </div>
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={mutation.isPending}
            style={styles.saveBtn}
          >
            {mutation.isPending ? "Saving..." : "Save"}
          </button>
        </div>

        <div style={styles.divider} />

        {/* Form Grid */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={styles.grid}>
            {/* Full Name */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Full Name</label>
              <Controller
                name="full_name"
                control={control}
                rules={{ required: "Ism familiya kiritilishi shart" }}
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      placeholder="Your Full Name"
                      style={{
                        ...styles.input,
                        ...(errors.full_name ? styles.inputError : {}),
                      }}
                    />
                    {errors.full_name && (
                      <span style={styles.errorText}>{errors.full_name.message}</span>
                    )}
                  </>
                )}
              />
            </div>

            {/* Phone Number */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Phone Number</label>
              <Controller
                name="phone_number"
                control={control}
                rules={{ required: "Telefon raqam kiritilishi shart" }}
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      placeholder="+998901234567"
                      style={{
                        ...styles.input,
                        ...(errors.phone_number ? styles.inputError : {}),
                      }}
                    />
                    {errors.phone_number && (
                      <span style={styles.errorText}>{errors.phone_number.message}</span>
                    )}
                  </>
                )}
              />
            </div>

            {/* Address */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Address</label>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Enter Your Address"
                    style={styles.input}
                  />
                )}
              />
            </div>

            {/* Password */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>New Password (optional)</label>
              <Controller
                name="password"
                control={control}
                rules={{
                  minLength: { value: 6, message: "Kamida 6 ta belgi" },
                }}
                render={({ field }) => (
                  <>
                    <div style={styles.passwordWrapper}>
                      <input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter New Password"
                        style={{ ...styles.input, paddingRight: "44px" }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((p) => !p)}
                        style={styles.eyeBtn}
                      >
                        {showPassword ? (
                          <VisibilityOff fontSize="small" />
                        ) : (
                          <Visibility fontSize="small" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <span style={styles.errorText}>{errors.password.message}</span>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

