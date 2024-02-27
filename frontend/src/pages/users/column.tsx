import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "index",
    header: "No.",
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Button variant="ghost" size="sm">
        <Link to={`/messages/${row.original.id}`}>
          Chat with {row.original.username}
        </Link>
      </Button>
    ),
  },
];
