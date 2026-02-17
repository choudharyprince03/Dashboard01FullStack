import { useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import { useState } from "react";
import SignupForm from "../components/SignUp";

const Signup = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (data) => {
    try {
      setErrorMessage("");
      await signUp(data);
      navigate("/");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Signup failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <SignupForm
        onSubmit={handleSignup}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default Signup;
