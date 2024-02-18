import authService from "@/services/auth-service";
import userService from "@/services/user-service";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = userService.getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      authService.refresh().then(() => {
        api.interceptors.request.use(error.request);
      });
    }
    if (error.response?.status === 500) {
      toast("Server error, please try again later");
    }
    if (error.response?.status === 502) {
      toast("Bad gateway, please try again later");
    }
    if (error.response?.status === 503) {
      toast("Service unavailable, please try again later");
    }
    if (error.response?.status === 504) {
      toast("Gateway timeout, please try again later");
    }
    if (error.response?.status === 429) {
      toast("Too many requests, please try again later");
    }
    return Promise.reject(error);
  }
);

export default api;
