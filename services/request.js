import axios from "axios";

const request = axios.create({
  baseURL: "https://api.al-muamalat.uz/api",
  headers: {
    "Content-Type": "application/json",
  },
});

let isRedirectingToLogin = false;

const authRoutes = [
  "/login",
  "/register",
  "/verify-login",
  "/verify-register",
];

const authEndpoints = [
  "/v2/auth/signin/init",
  "/v2/auth/signin/verify",
  "/v2/auth/signin/resend",
  "/v2/auth/signup/init",
  "/v2/auth/signup/verify",
  "/v2/auth/signup/resend",
  "/auth/refreshToken",
];

function shouldRedirectToLogin(config) {
  if (typeof window === "undefined") return false;
  if (isRedirectingToLogin) return false;
  if (authRoutes.includes(window.location.pathname)) return false;

  const url = config?.url || "";
  return !authEndpoints.some((endpoint) => url.includes(endpoint));
}

// REQUEST interceptor
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE interceptor
request.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          throw new Error("Refresh token not found");
        }

        const res = await axios.post(
          "https://api.al-muamalat.uz/api/auth/refreshToken",
          { refreshToken }
        );

        const { accessToken } = res.data;

        localStorage.setItem("userToken", accessToken);

        // YANGI TOKENNI qo‘shamiz
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return request(originalRequest);
      } catch (err) {
        if (shouldRedirectToLogin(originalRequest)) {
          isRedirectingToLogin = true;
          localStorage.clear();
          window.location.replace("/login");
        }

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export { request };
