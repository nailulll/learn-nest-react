import api from "@/config/api";
import { Token, User } from "@/types";
import { AxiosError } from "axios";

const getAccessToken = () => localStorage.getItem("access_token");
const getRefreshToken = () => localStorage.getItem("refresh_token");
const setToken = (token: Token) => {
  localStorage.setItem("access_token", token.access_token);
  localStorage.setItem("refresh_token", token.refresh_token);
};
const removeToken = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

const getMe = async () => {
  try {
    const res = await api.get<User>("/users/me");
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
  }
};

const getAll = async () => {
  try {
    const res = await api.get<User[]>("/users");
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
  }
};

export default {
  getAccessToken,
  getRefreshToken,
  setToken,
  removeToken,
  getMe,
  getAll,
};
