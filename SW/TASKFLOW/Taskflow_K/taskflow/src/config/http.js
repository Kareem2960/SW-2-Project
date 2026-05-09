import axios from "axios";
import { API_BASE_URL } from "./apiBase";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 30000,
});

// Add interceptor to include JWT token in requests
api.interceptors.request.use(
  (config) => {
    const requestUrl = String(config.url || "");
    const isPublicAuthRequest =
      requestUrl.includes("/api/auth/register") ||
      requestUrl.includes("/api/auth/login");

    if (isPublicAuthRequest) {
      if (config.headers?.Authorization) {
        delete config.headers.Authorization;
      }
      return config;
    }

    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/** @param {import("axios").AxiosError} error */
export function getApiErrorMessage(error, fallback = "Something went wrong") {
  if (!error?.response) {
    if (
      error?.code === "ERR_NETWORK" ||
      error?.message?.includes?.("Network Error")
    ) {
      return "Cannot reach the server. Is the API running and is VITE_API_URL correct?";
    }
    return fallback;
  }
  const status = error.response.status;
  const body = error.response.data;
  if (typeof body === "string" && body.trim()) return body;
  if (body?.message) return String(body.message);
  if (body?.detail) return String(body.detail);
  if (body?.title && body?.detail) return `${body.title}: ${body.detail}`;
  if (status === 409) {
    return "This username is already taken. Try another one.";
  }
  return fallback;
}
