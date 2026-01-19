// src/pages/Signup.jsx
import { useState } from "react";
import Input from "../components/Input";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        <Input label="Full Name" type="text" value={form.name} onChange={handleChange} name="name" />
        <div className="mt-4">
          <Input label="Email" type="email" value={form.email} onChange={handleChange} name="email" />
        </div>
        <div className="mt-4">
          <Input label="Password" type="password" value={form.password} onChange={handleChange} name="password" />
        </div>

        <button className="w-full mt-6 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
          Sign Up
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account? <a href="/signin" className="text-blue-600">Sign in</a>
        </p>
      </form>
    </div>
  );
}
