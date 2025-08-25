import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ setAuthToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch("https://svcgvtd-be.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      //Set the auth token in the parent component
      setAuthToken(data.token);
      localStorage.setItem("authToken", data.token);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "An error occurred during login");
    }
  };
  return (
    <div className="flex justify-center items-center mt-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-sky-800">
          Admin Login
        </h2>
        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>
        )}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-sky-800 text-white p-3 rounded hover:bg-sky-700 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
}
export default LoginPage;
