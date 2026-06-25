"use client"
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Edit, Trash } from "lucide-react";
import { useAllUserQuery, useDeleteUserMutation } from "@/store/authApi";
import { IUser } from "@/type/type";
import AddUser from "@/components/admin/AddUser";

const Page = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<null | IUser>(null);
  const [deleteUser] = useDeleteUserMutation()

  const { data } = useAllUserQuery();
  const users = data?.user || [];

  const handleUpdate = (user: IUser) => {
    setOpen(true);
    setSelected(user);
  }

  const handleDelete = async (id: string) => {
    await deleteUser(id).unwrap()
  }

  return (
    <div className="p-8 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800">
          User Page
        </h3>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + Add User
        </button>
      </div>

      {/* TABLE */}
      <div className="border rounded-2xl p-4">

        <Table>

          <TableCaption>List of all users</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Profile</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>

            {users.map((user: IUser, index) => (
              <TableRow key={user._id}>

                {/* ID */}
                <TableCell className="font-medium">
                  {index + 1}
                </TableCell>

                {/* PROFILE PIC */}
                <TableCell>
                  <img
                    src={user.profilePic}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </TableCell>

                {/* NAME */}
                <TableCell>{user.name}</TableCell>

                {/* EMAIL */}
                <TableCell>{user.email}</TableCell>

                {/* ROLE */}
                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${user.role === "Admin"
                      ? "bg-red-100 text-red-600"
                      : user.role === "Moderator"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {user.role}
                  </span>
                </TableCell>

                {/* ACTION */}
                <TableCell className="text-right space-x-3">

                  <button
                    onClick={() => handleUpdate(user)}
                    className="text-blue-600 hover:text-blue-800">
                    <Edit size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-600 hover:text-red-800">
                    <Trash size={18} />
                  </button>

                </TableCell>

              </TableRow>
            ))}

          </TableBody>

        </Table>

      </div>
      <AddUser open={open} setOpen={setOpen} selected={selected} />
    </div>
  );
};

export default Page;