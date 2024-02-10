import { UserService } from "@/services/user.service";
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
  config.headers.Authorization = `Bearer ${UserService.getAccessToken()}`;
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      UserService.removeToken();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
