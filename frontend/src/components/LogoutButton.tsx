import { Button } from "./ui/button";
import { toast } from "sonner";
import authService from "@/services/auth-service";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    toast("Processing...");
    authService.logout().then(() => {
      toast("Success logout");
      navigate("/login");
    });
  };

  return (
    <Button variant="destructive" onClick={() => logoutHandler()}>
      Logout
    </Button>
  );
};

export default LogoutButton;
