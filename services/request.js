import axios from "axios";

const request = axios.create({
  baseURL: "https://api.al-muamalat.uz/api",
  headers: {
    "Content-Type": "application/json",
  },
});

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
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export { request };