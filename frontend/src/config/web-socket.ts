import { io } from "socket.io-client";
import userService from "@/services/user-service";

const socket = io("http://localhost:3000", {
  extraHeaders: {
    Authorization: `Bearer ${userService.getAccessToken()}`,
  },
});

export default socket;
