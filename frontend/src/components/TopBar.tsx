import { useUser } from "@/hooks";
import LogoutButton from "./LogoutButton";

const TopBar = () => {
  const { data, isLoading, isError } = useUser();

  return (
    <div className="flex justify-end items-center gap-4">
      {isLoading && "Loading..."}
      {isError && "Something went wrong, cannot get user info"}
      <div>{data?.username}</div>
      <LogoutButton />
      <div />
    </div>
  );
};

export default TopBar;
