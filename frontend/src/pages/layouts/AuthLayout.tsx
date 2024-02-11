import { Toaster } from "@/components/ui/sonner";
import userService from "@/services/user-service";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = userService.getAccessToken();
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <main className="flex min-h-screen items-center justify-center">
        <Outlet />
      </main>
      <Toaster />
    </>
  );
};

export default AuthLayout;
