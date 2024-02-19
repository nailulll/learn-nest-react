import {
  Activity,
  Braces,
  LayoutDashboard,
  MessagesSquare,
  Radio,
  UsersRound,
} from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const items = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    name: "Users",
    href: "/users",
    icon: <UsersRound />,
  },
  {
    name: "Messages",
    href: "/messages",
    icon: <MessagesSquare />,
  },
  {
    name: "Streaming",
    href: "/streaming",
    icon: <Radio />,
  },
  {
    name: "Stories",
    href: "/stories",
    icon: <Activity />,
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="p-10">
      <Button
        className="font-semibold flex gap-2 items-center"
        variant="ghost"
        size="sm"
      >
        <Braces />
        Learn
      </Button>
      <div className="pt-10" />
      <Button className="text-xs font-semibold" variant="ghost" size="sm">
        Available Features
      </Button>
      <div className="pt-5" />
      {items.map((item) => (
        <Button
          key={item.name}
          className="font-semibold flex gap-5 items-center w-full justify-start my-2"
          variant="ghost"
          size="sm"
          onClick={() => navigate(item.href)}
        >
          {item.icon}
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default Sidebar;
