import { Button } from "@/components/ui/button";
import userService from "@/services/user-service";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { toast } from "sonner";

const Messages = () => {
  const socket = io("http://localhost:3000", {
    extraHeaders: {
      Authorization: `Bearer ${userService.getAccessToken()}`,
    },
  });

  useEffect(() => {
    socket.on("message", (data) => {
      console.log("Received message from server:", data);
    });

    socket.on("exception", (error: any) => {
      if (error?.status === "error") {
        toast(error?.message, {
          duration: 1000,
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socket.emit("message", "Hello from client");
  };

  return (
    <div>
      <Button onClick={sendMessage}>Send Message</Button>
    </div>
  );
};

export default Messages;
