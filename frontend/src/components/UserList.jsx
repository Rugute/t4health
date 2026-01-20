import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Swal from "sweetalert2";

export default function UserList({ onAddNew,onView  }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/api/auth/users");
        setUsers(res.data);
      } catch {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

   const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete User?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete",
    });

    if (!result.isConfirmed) return;

    try {
      await api.get(`/api/auth/users/delete/${id}`);

      setUsers((prev) => prev.filter((u) => u.id !== id));

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "User has been deleted successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete user",
      });
    }
  };

  const handleView = async (user) => {
  const res = await Swal.fire({
    title: "Edit User?",
    text: `Do you want to Edit  ${user.firstName}'s profile`,
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "Open",
  });

  if (res.isConfirmed) {
    onView(user);
  }
};


  if (loading) return <p className="text-gray-500">Loading Users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Users</h2>

        <button
          onClick={onAddNew}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
        >
          + Add New
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="text-left p-3 font-semibold">First Name</th>
            <th className="text-left p-3 font-semibold">Last Name</th>
            <th className="text-left p-3 font-semibold">Email</th>
            <th className="text-left p-3 font-semibold">Phone</th>
            <th className="text-left p-3 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{u.firstName}</td>
              <td className="p-3">{u.lastName}</td>
              <td className="p-3 text-gray-500">{u.email}</td>
              <td className="p-3 text-gray-500">{u.phone}</td>
              <td className="p-3 space-x-3">
               {/* <button className="text-blue-600 text-sm" onClick={() => handleView(u)}>View</button>
                <button className="text-blue-600 text-sm">View</button>*/}
                <button className="text-green-600 text-sm" onClick={() => handleView(u)}>Edit</button>
                <button onClick={() => handleDelete(u.id)} className="text-red-600 text-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
