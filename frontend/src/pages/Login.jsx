import { useState } from "react";
import { useStore } from "../store/useStore";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await login(email, password);
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 to-blue-600">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-80">
        <h2 className="text-2xl font-bold text-center mb-4 text-indigo-600">
          Login
        </h2>

        <input
          className="w-full p-2 border rounded mb-3 focus:outline-indigo-400"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 border rounded mb-3 focus:outline-indigo-400"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="text-center mt-3">
          No account?{" "}
          <Link to="/register" className="text-indigo-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}