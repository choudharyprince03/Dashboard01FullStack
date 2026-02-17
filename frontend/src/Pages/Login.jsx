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
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <LoginForm
        onSubmit={handleLogin}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default Login;
