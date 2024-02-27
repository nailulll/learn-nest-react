import { Button } from "@/components/ui/button";
import socket from "@/config/web-socket";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const params = useParams();

  useEffect(() => {
    socket.emit("listChat", params.id);
    socket.on("listChat", (data) => {
      console.log({ data });
    });
  }, []);

  const sendMessage = () => {
    socket.emit("sendMessage", {
      receiverId: params.id,
      content: "hello",
    });
  };

  return (
    <div>
      <Button onClick={() => sendMessage()}>Send</Button>
    </div>
  );
};

export default Chat;
