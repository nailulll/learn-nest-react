import userService from "@/services/user-service";
import { useQuery } from "react-query";

export const useUser = () => useQuery("user", userService.getMe);

export const useUsers = () => useQuery("users", userService.getAll);
