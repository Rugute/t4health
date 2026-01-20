import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Input from "../components/RegInput";
import api from "../api/axios";

export default function RegisterUser({ user, onBack }) {
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    sex: "",
    identifier: "",
    idno: "",
    dob: "",
    contacts: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        middleName: user.middleName || "",
        lastName: user.lastName || "",
        sex: user.sex || "",
        identifier: user.identifier || "",
        idno: user.idno || "",
        dob: user.dob || "",
        contacts: user.contacts || "",
        address: user.address || "",
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
      title: user ? "Updating patient..." : "Registering patient...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const endpoint = user
        ? `/api/patient/${user.id}`
        : "/api/patient/register";

      const method = user ? api.put : api.post;

      const res = await method(endpoint, form);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: res.data || "Operation successful",
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
          {user ? "Edit Patient" : "Register Patient"}
        </h2>
        <button
          onClick={onBack}
          className="text-sm text-gray-600 hover:text-blue-600"
        >
          ← Back
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Input label="First Name" name="firstName" value={form.firstName} onChange={handleChange} required />
        <Input label="Middle Name" name="middleName" value={form.middleName} onChange={handleChange} />
        <Input label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} required />

        <div>
          <label className="block text-sm font-medium mb-1">Sex</label>
          <select
            name="sex"
            value={form.sex}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <Input label="Identifier" name="identifier" value={form.identifier} onChange={handleChange} required />
        <Input label="ID Number" name="idno" value={form.idno} onChange={handleChange} />

        <Input
          label="Date of Birth"
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
          required
        />

        <Input
          label="Phone Number"
          name="contacts"
          value={form.contacts}
          onChange={handleChange}
          required
        />

        <Input
          label="Address"
          name="address"
          value={form.address}
          onChange={handleChange}
          required
        />

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "Processing..." : user ? "Update Patient" : "Save Patient"}
          </button>
        </div>
      </form>
    </div>
  );
}
