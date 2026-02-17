import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const SignupForm = ({ onSubmit, errorMessage }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-900 p-8 rounded-xl w-full max-w-md space-y-5 border border-gray-800"
    >
      <h2 className="text-white text-2xl font-bold text-center">
        Create Account
      </h2>

      {errorMessage && (
        <p className="text-red-400 text-sm text-center">
          {errorMessage}
        </p>
      )}

      <div>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 bg-gray-800 text-white rounded"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Minimum 2 characters"
            }
          })}
        />
        {errors.name && (
          <p className="text-red-400 text-sm mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 bg-gray-800 text-white rounded"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <p className="text-red-400 text-sm mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 bg-gray-800 text-white rounded"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Minimum 6 characters"
            }
          })}
        />
        {errors.password && (
          <p className="text-red-400 text-sm mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded text-white font-semibold"
      >
        {isSubmitting ? "Creating..." : "Sign Up"}
      </button>

      <p className="text-gray-400 text-sm text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500">
          Login
        </Link>
      </p>
    </form>
  );
};

export default SignupForm;
