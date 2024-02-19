import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import AuthLayout from "@/pages/layouts/AuthLayout";
import MainLayout from "@/pages/layouts/MainLayout";
import Dashboard from "@/pages/main/Dashboard";
import Messages from "@/pages/messages/Messages";
import Stories from "@/pages/stories/Stories";
import Streaming from "@/pages/streaming/Streaming";
import Users from "@/pages/users/Users";
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
      {
        path: "/",
        element: <Login />,
      },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "streaming",
        element: <Streaming />,
      },
      {
        path: "stories",
        element: <Stories />,
      },
      {
        path: "messages",
        element: <Messages />,
      },
    ],
  },
]);
