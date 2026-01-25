import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    error ? prom.reject(error) : prom.resolve();
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      return Promise.reject(error);
    }

    // ❌ User logged in hi nahi hai
    if (!localStorage.getItem("isAuth")) {
      return Promise.reject(error);
    }

    // ❌ Refresh API pe dobara refresh nahi
    if (originalRequest.url.includes("/getUserData")) {
      return Promise.reject(error);
    }

    // ❌ Public routes skip
    const publicRoutes = ["/login", "/register"];
    if (publicRoutes.some((route) => originalRequest.url.includes(route))) {
      return Promise.reject(error);
    }

    // 🔁 Sirf 401 pe
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.get("/api/v1/user/getUserData");

        processQueue(null);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);

        // 🔥 Logout flow
        localStorage.removeItem("isAuth");
        // window.location.href = "/login";

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
