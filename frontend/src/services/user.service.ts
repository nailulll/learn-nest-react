import { Token } from "@/types";

export class UserService {
  getUser() {}
  static getAccessToken() {
    return localStorage.getItem("access_token");
  }

  static getRefreshToken() {
    return localStorage.getItem("refresh_token");
  }

  static setToken(token: Token) {
    localStorage.setItem("access_token", token.access_token);
    localStorage.setItem("refresh_token", token.refresh_token);
  }

  static removeToken() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
}
