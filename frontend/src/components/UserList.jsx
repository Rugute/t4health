
import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/api/auth/users");
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p className="text-gray-500">Loading users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

return (
    <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">Users</h2>
        <table className="w-full border-collapse">
            <thead>
                <tr className="border-b">
                    <th className="text-left p-3 font-semibold">First Name</th>
                    <th className="text-left p-3 font-semibold">Last Name</th>
                    <th className="text-left p-3 font-semibold">Email</th>
                    <th className="text-left p-3 font-semibold">Action</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{user.firstName}</td>
                        <td className="p-3">{user.lastName}</td>
                        <td className="p-3 text-gray-500">{user.email}</td>
                        <td className="p-3">
                            <button className="text-sm text-blue-500 hover:underline">
                                <i className="fas fa-eye"></i> View
                            </button>
                            <span className="mx-2"></span>
                            <button className="text-sm text-blue-500 hover:underline">
                                <i className="fas fa-edit"></i> Edit
                            </button>
                            <span className="mx-2"></span>
                            <button className="text-sm text-blue-500 hover:underline">
                                <i className="fas fa-trash"></i> Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
}
