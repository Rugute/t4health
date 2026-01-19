
import { useState } from "react";
import api from "../api/axios";

export default function SymptomForm() {
  const [symptom, setSymptom] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res =await api.post("/api/symptoms", {
        symptom: symptom,
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error submitting symptom:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Enter Your Symptoms Seperate by Commas</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Symptom</label>
          <input
            type="text"
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="e.g., headache, fever"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>

        {response && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
            {JSON.stringify(response)}
          </div>
        )}
      </form>
    </div>
  );
}
