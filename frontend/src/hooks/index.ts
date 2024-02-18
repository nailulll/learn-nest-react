import userService from "@/services/user-service";
import { useQuery } from "react-query";

export const useUser = () => useQuery("users", userService.getMe);
