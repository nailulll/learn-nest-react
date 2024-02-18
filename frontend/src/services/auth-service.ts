import api from "@/config/api";
import { Token } from "@/types";
import { AxiosError } from "axios";
import userService from "./user-service";

const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const res = await api.post<Token>("/auth/login", {
      username,
      password,
    });
    userService.setToken(res.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
  }
};

const register = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    await api.post("/auth/register", {
      username,
      password,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
  }
};

const logout = async () => {
  try {
    await api.post("/auth/logout");
    userService.removeToken();
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
  }
};

const refresh = async () => {
  try {
    const res = await api.post<Token>("/auth/refresh", {
      token: userService.getRefreshToken(),
    });
    userService.setToken(res.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        userService.removeToken();
        window.location.reload();
      }
      throw error;
    }
  }
};

export default { login, register, logout, refresh };
