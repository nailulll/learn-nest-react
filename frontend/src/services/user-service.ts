import { Token } from "@/types";

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

export default {
  getAccessToken,
  getRefreshToken,
  setToken,
  removeToken,
};
