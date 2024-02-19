import { useUser } from "@/hooks";
import LogoutButton from "./LogoutButton";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTheme } from "./providers/ThemeProvider";

const TopBar = () => {
  const { data, isLoading, isError } = useUser();
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex justify-end items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            {theme === "dark" ? <Moon /> : <Sun />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isLoading && "Loading..."}
      {isError && "Something went wrong, cannot get user info"}
      <div>{data?.username}</div>
      <LogoutButton />
      <div />
    </div>
  );
};

export default TopBar;
