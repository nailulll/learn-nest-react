import { useUsers } from "@/hooks";
import { DataTable } from "./data-table";
import { columns } from "./column";

const Users = () => {
  const { data } = useUsers();
  return (
    <div>
      <DataTable columns={columns} data={data || []} />
    </div>
  );
};

export default Users;
