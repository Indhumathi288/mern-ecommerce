import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleLogin = async () => {
  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        email,
        password,
      }
    );

    localStorage.setItem("token", response.data.token);

    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    localStorage.setItem("loggedIn", "true");

    navigate("/");
  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Login failed"
    );
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>

        <p className="text-sm mt-4 text-center">
          New user?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
