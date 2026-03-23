import { useState } from "react";
import { useStore } from "../store/useStore";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { register } = useStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({});

  const handleRegister = async () => {
    await register(form);
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-80">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

        <input
          className="w-full p-2 border rounded mb-3"
          placeholder="Username"
          onChange={(e)=>setForm({...form, username:e.target.value})}
        />

        <input
          className="w-full p-2 border rounded mb-3"
          placeholder="Email"
          onChange={(e)=>setForm({...form, email:e.target.value})}
        />

        <input
          type="password"
          className="w-full p-2 border rounded mb-3"
          placeholder="Password"
          onChange={(e)=>setForm({...form, password:e.target.value})}
        />

        <button
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          onClick={handleRegister}
        >
          Register
        </button>

        <p className="text-center mt-3">
          Already have account?{" "}
          <Link to="/" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}