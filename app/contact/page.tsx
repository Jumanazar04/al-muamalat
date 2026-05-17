"use client";

import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Button,
  Link,
  Stack,
  Divider,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

// ─── Types ───────────────────────────────────────────────────────────────────

type ContactFormValues = {
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
};

// ─── Constants ───────────────────────────────────────────────────────────────

const SERVICE_OPTIONS = [
  { value: "branding", label: "Branding & Identity" },
  { value: "web_design", label: "Web Design" },
  { value: "ui_ux", label: "UI / UX Design" },
  { value: "development", label: "Development" },
  { value: "consulting", label: "Consulting" },
];

const BUDGET_OPTIONS = [
  { value: "under_1k", label: "Under $1,000" },
  { value: "1k_5k", label: "$1,000 – $5,000" },
  { value: "5k_10k", label: "$5,000 – $10,000" },
  { value: "10k_plus", label: "$10,000+" },
];

// ─── Socials data ─────────────────────────────────────────────────────────────

const SOCIALS = [
  { label: "Instagram", href: "#", icon: <InstagramIcon fontSize="small" /> },
  { label: "Twitter", href: "#", icon: <TwitterIcon fontSize="small" /> },
  { label: "Facebook", href: "#", icon: <FacebookIcon fontSize="small" /> },
];

// ─── Shared field styles ──────────────────────────────────────────────────────

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    bgcolor: "#F5F5F0",
    "& fieldset": { borderColor: "transparent" },
    "&:hover fieldset": { borderColor: "#00A87A" },
    "&.Mui-focused fieldset": { borderColor: "#00A87A", borderWidth: "1.5px" },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#00A87A" },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      service: "",
      budget: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Form data:", data);

    toast.success("Xabaringiz yuborildi! Tez orada bog'lanamiz.", {
      style: {
        borderRadius: "10px",
        background: "#1A1A1A",
        color: "#fff",
        fontFamily: "inherit",
      },
    });

    reset();
  };

  return (
    <>
      {/* Toast provider */}
      <ToastContainer position="top-right" />

      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#FAFAF8",
          fontFamily: "'Outfit', 'Helvetica Neue', sans-serif",
          py: { xs: 6, md: 10 },
        }}
      >
        <Container maxWidth="lg">
          {/* ── Section header ── */}
          <Box sx={{ mb: { xs: 6, md: 8 } }}>
            <Typography
              variant="overline"
              sx={{
                color: "#00A87A",
                fontWeight: 700,
                letterSpacing: 3,
                fontSize: "0.7rem",
              }}
            >
              ALOQA
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2.4rem", md: "3.5rem" },
                lineHeight: 1.1,
                color: "#111",
                mt: 0.5,
              }}
            >
              Let&apos;s Talk
            </Typography>
            <Typography sx={{ color: "#666", mt: 1.5, maxWidth: 420, lineHeight: 1.7 }}>
              Katta g&apos;oya yoki brend yaratmoqchimisiz? Biz yordam berishdan
              xursand bo&apos;lamiz — faqat bizga yozing.
            </Typography>
          </Box>

          {/* ── Two-column layout ── */}
          <Grid container spacing={{ xs: 6, md: 10 }} alignItems="flex-start">
            {/* Left: info */}
            <Grid item xs={12} md={4}>
              <Stack spacing={4}>
                {/* Email */}
                <Box>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <EmailOutlinedIcon sx={{ color: "#00A87A", fontSize: 20 }} />
                    <Typography fontWeight={700} fontSize="1rem" color="#111">
                      Email
                    </Typography>
                  </Stack>
                  <Link
                    href="mailto:beebs@gmail.com"
                    underline="hover"
                    sx={{ color: "#444", fontSize: "0.95rem" }}
                  >
                    beebs@gmail.com
                  </Link>
                </Box>

                <Divider sx={{ borderColor: "#E8E8E4" }} />

                {/* Socials */}
                <Box>
                  <Typography fontWeight={700} fontSize="1rem" color="#111" mb={1.5}>
                    Socials
                  </Typography>
                  <Stack spacing={1.2}>
                    {SOCIALS.map((s) => (
                      <Link
                        key={s.label}
                        href={s.href}
                        underline="none"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          color: "#555",
                          fontSize: "0.9rem",
                          transition: "color 0.2s",
                          "&:hover": { color: "#00A87A" },
                        }}
                      >
                        {s.icon}
                        {s.label}
                      </Link>
                    ))}
                  </Stack>
                </Box>

                <Divider sx={{ borderColor: "#E8E8E4" }} />

                {/* Decorative badge */}
                <Box
                  sx={{
                    bgcolor: "#00A87A",
                    borderRadius: "16px",
                    p: 3,
                    color: "#fff",
                  }}
                >
                  <Typography fontWeight={700} fontSize="1.1rem" mb={0.5}>
                    24 soat ichida javob
                  </Typography>
                  <Typography fontSize="0.85rem" sx={{ opacity: 0.85, lineHeight: 1.6 }}>
                    Barcha so&apos;rovlarga ish kunlari 24 soat ichida javob
                    beramiz.
                  </Typography>
                </Box>
              </Stack>
            </Grid>

            {/* Right: form */}
            <Grid item xs={12} md={8}>
              <Box
                component="div"
                sx={{
                  bgcolor: "#fff",
                  borderRadius: "20px",
                  p: { xs: 3, md: 5 },
                  boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
                }}
              >
                <Box
                  component="form"
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                >
                  <Grid container spacing={2.5}>
                    {/* Name */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Name"
                        {...register("name", { required: "Ism kiritish shart" })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        sx={fieldSx}
                      />
                    </Grid>

                    {/* Email */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        {...register("email", {
                          required: "Email kiritish shart",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Email noto'g'ri formatda",
                          },
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        sx={fieldSx}
                      />
                    </Grid>

                    {/* Service */}
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="service"
                        control={control}
                        rules={{ required: "Xizmat turini tanlang" }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            select
                            fullWidth
                            label="What service are you interested in"
                            error={!!errors.service}
                            helperText={errors.service?.message}
                            sx={fieldSx}
                          >
                            {SERVICE_OPTIONS.map((opt) => (
                              <MenuItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                    </Grid>

                    {/* Budget */}
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="budget"
                        control={control}
                        rules={{ required: "Byudjetni tanlang" }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            select
                            fullWidth
                            label="Budget"
                            error={!!errors.budget}
                            helperText={errors.budget?.message}
                            sx={fieldSx}
                          >
                            {BUDGET_OPTIONS.map((opt) => (
                              <MenuItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                    </Grid>

                    {/* Message */}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message"
                        multiline
                        rows={5}
                        {...register("message", {
                          required: "Xabar kiritish shart",
                          minLength: {
                            value: 10,
                            message: "Kamida 10 ta belgi kiriting",
                          },
                        })}
                        error={!!errors.message}
                        helperText={errors.message?.message}
                        sx={fieldSx}
                      />
                    </Grid>

                    {/* Submit */}
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        fullWidth
                        disabled={isSubmitting}
                        sx={{
                          bgcolor: "#00A87A",
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: "1rem",
                          py: 1.8,
                          borderRadius: "12px",
                          textTransform: "none",
                          letterSpacing: 0.3,
                          transition: "all 0.25s",
                          "&:hover": {
                            bgcolor: "#008F66",
                            transform: "translateY(-1px)",
                            boxShadow: "0 6px 20px rgba(0,168,122,0.35)",
                          },
                          "&:active": { transform: "translateY(0)" },
                          "&.Mui-disabled": { bgcolor: "#B2DFCF", color: "#fff" },
                        }}
                      >
                        {isSubmitting ? "Yuborilmoqda…" : "Submit"}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}