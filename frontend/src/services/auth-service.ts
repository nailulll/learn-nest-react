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

export default { login };
