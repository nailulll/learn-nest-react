import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import userService from "@/services/user-service";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const MainLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = userService.getAccessToken();
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <main className="h-screen">
        <ResizablePanelGroup direction="horizontal" className="w-full">
          <ResizablePanel maxSize={15} minSize={15}>
            <Sidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel className="pt-5">
            <TopBar />
            <Separator className="my-5" />
            <ScrollArea className="p-10">
              <Outlet />
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
      <Toaster />
    </>
  );
};

export default MainLayout;
