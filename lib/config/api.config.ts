import axios from "axios";
import { getToken, removeToken } from "@/lib/auth/token";
// const isServer = typeof window === 'undefined';
// const baseURL = isServer
//   ? process.env.NEXT_PUBLIC_API_URL
//   : '/proxy';
const baseURL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor: otomatis menambahkan Bearer token ke setiap request jika ada
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor: penanganan error global
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Tangani unauthorized (misal token kedaluwarsa)
      if (typeof window !== "undefined") {
        removeToken();
        // Opsional: Redirect ke halaman login jika diperlukan
        // window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

export default api;
