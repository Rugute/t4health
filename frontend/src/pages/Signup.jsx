import { useState } from "react";
import Input from "../components/Input";
import api from "../api/axios";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    lname: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);
    console.log(form);
    try {
      const res = await api.post("/api/auth/signup", {
        email: form.email,
        password: form.password,
        firstName: form.name,
        lastName: form.lname,

      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        <Input
          label="First Name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <Input
          label="Last Name"
          type="text"
          name="lname"
          value={form.name}
          onChange={handleChange}
        />

        <div className="mt-4">
          <Input
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="mt-4">
          <Input
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Sign Up
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}
