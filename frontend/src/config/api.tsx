import userService from "@/services/user-service";
import axios, { AxiosError } from "axios";

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
      userService.removeToken();
      window.location.href = "/login";
    }
    if (error.response?.status === 500) {
      // Todo: handle 500
    }
    if (error.response?.status === 502) {
      // Todo: handle 502
    }
    if (error.response?.status === 503) {
      // Todo: handle 503
    }
    if (error.response?.status === 504) {
      // Todo: handle 504
    }
    if (error.response?.status === 429) {
      // Todo: handle 429
    }
    return Promise.reject(error);
  },
);

export default api;
