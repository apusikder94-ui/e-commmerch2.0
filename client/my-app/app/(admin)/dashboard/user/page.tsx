import React from "react";
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

const Page = () => {
  const users = [
    {
      id: 1,
      name: "Apu Sikder",
      email: "apu@email.com",
      role: "Admin",
      profilePic:
        "https://ui-avatars.com/api/?name=Apu+Sikder&background=0D8ABC&color=fff",
    },
    {
      id: 2,
      name: "John Doe",
      email: "john@example.com",
      role: "User",
      profilePic:
        "https://ui-avatars.com/api/?name=John+Doe&background=FF5733&color=fff",
    },
    {
      id: 3,
      name: "Sarah Khan",
      email: "sarah@example.com",
      role: "User",
      profilePic:
        "https://ui-avatars.com/api/?name=Sarah+Khan&background=28A745&color=fff",
    },
    {
      id: 4,
      name: "Rahim Uddin",
      email: "rahim@example.com",
      role: "Moderator",
      profilePic:
        "https://ui-avatars.com/api/?name=Rahim+Uddin&background=FFC107&color=000",
    },
    {
      id: 5,
      name: "Nadia Akter",
      email: "nadia@example.com",
      role: "User",
      profilePic:
        "https://ui-avatars.com/api/?name=Nadia+Akter&background=6F42C1&color=fff",
    },
  ];

  return (
    <div className="p-8 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800">
          User Page
        </h3>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
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

            {users.map((user) => (
              <TableRow key={user.id}>

                {/* ID */}
                <TableCell className="font-medium">
                  {user.id}
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
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.role === "Admin"
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

                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit size={18} />
                  </button>

                  <button className="text-red-600 hover:text-red-800">
                    <Trash size={18} />
                  </button>

                </TableCell>

              </TableRow>
            ))}

          </TableBody>

        </Table>

      </div>
    </div>
  );
};

export default Page;