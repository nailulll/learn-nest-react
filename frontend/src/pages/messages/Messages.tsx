import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import socket from "@/config/web-socket";
import { useUsers } from "@/hooks";

import { useEffect, useState } from "react";
import { DataTable } from "../users/data-table";
import { columns } from "../users/column";

const Messages = () => {
  const { data: users } = useUsers();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("exception", (error: any) => {
      // if (error?.status === "error") {
      //   if (error?.message === "Unauthorized") {
      //     authService.refresh();
      //     sendMessage();
      //   } else {
      //     toast(error?.message, {
      //       duration: 1000,
      //     });
      //   }
      // }
    });

    socket.emit("listMessage");

    socket.on("listMessage", (data) => {
      setMessages(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>New Chat</Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Choose people to start conversation</DialogTitle>
            <DialogDescription asChild>
              <DataTable columns={columns} data={users || []} pageSize={5} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {messages.length === 0 && <div className="pt-14">No messages</div>}
    </div>
  );
};

export default Messages;
