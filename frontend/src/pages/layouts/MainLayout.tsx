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
      <main>
        <Outlet />
      </main>
      <Toaster />
    </>
  );
};

export default MainLayout;
