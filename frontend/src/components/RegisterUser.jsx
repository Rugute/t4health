import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Input from "../components/RegInput";
import api from "../api/axios";

export default function RegisterUser({ user, onBack }) {
  const [form, setForm] = useState({
    name: "",
    lname: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Populate form when editing/viewing a user
  useEffect(() => {
    if (user) {
      setForm({
        name: user.firstName || "",
        lname: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        password: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    Swal.fire({
      title: user ? "Updating user..." : "Creating user...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const endpoint = user
        ? `/api/auth/users/${user.id}`
        : "/api/auth/signup";

      const method = user ? api.put : api.post;

      const payload = {
        firstName: form.name,
        lastName: form.lname,
        email: form.email,
        phone: form.phone,
        ...(form.password && { password: form.password }),
      };

      const res = await method(endpoint, payload);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: res.data,
        confirmButtonColor: "#2563eb",
      });

      onBack?.();

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data || "Operation failed",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">
          {user ? "Edit User" : "Create New User"}
        </h2>
        <button
          onClick={onBack}
          className="text-sm text-gray-600 hover:text-blue-600"
        >
          ← Back to list
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Input
          label="First Name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <Input
          label="Last Name"
          type="text"
          name="lname"
          value={form.lname}
          onChange={handleChange}
          required
        />

        <Input
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <Input
          label="Phone"
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />

        {!user && (
          <Input
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        )}

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {loading
              ? "Processing..."
              : user
                ? "Update User"
                : "Save User"}
          </button>
        </div>
      </form>
    </div>
  );
}
