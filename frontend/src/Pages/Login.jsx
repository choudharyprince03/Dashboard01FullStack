import { useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import { useState } from "react";
import LoginForm from "../components/Login";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (data) => {
    try {
      setErrorMessage("");
      await login(data);
      navigate("/");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0A0F1C] relative overflow-hidden px-4 transition-colors duration-300">
      {/* Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-300/40 dark:bg-blue-600/10 blur-[120px] pointer-events-none transition-colors duration-500" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-300/40 dark:bg-purple-600/10 blur-[120px] pointer-events-none transition-colors duration-500" />
      
      <LoginForm
        onSubmit={handleLogin}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default Login;
