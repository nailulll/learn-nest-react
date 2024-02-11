import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import AuthLayout from "@/pages/layouts/AuthLayout";
import MainLayout from "@/pages/layouts/MainLayout";
import Dashboard from "@/pages/main/Dashboard";
import { createBrowserRouter } from "react-router-dom";

export default createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "users",
        element: <div>users</div>,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);
