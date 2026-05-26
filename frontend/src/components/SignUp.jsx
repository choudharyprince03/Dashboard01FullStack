import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { UserPlus, Mail, Lock, User, Loader2, Orbit } from "lucide-react";

const SignupForm = ({ onSubmit, errorMessage }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md relative z-10"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#F7F6F2]/95 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-[#D8D3C7] shadow-xl relative overflow-hidden transition-colors duration-300"
      >
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C6D7C2] to-transparent transition-colors" />

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#DFE8DC] border border-[#C6D7C2] mb-6 shadow-sm transition-colors">
            <Orbit className="w-8 h-8 text-[#6B8F71] transition-colors animate-spin-slow" />
          </div>
          <h2 className="text-3xl font-bold text-[#2C3040] transition-colors">
            Create Account
          </h2>
          <p className="text-[#7B8190] mt-2 text-sm transition-colors">Join us to manage your projects</p>
        </div>

        {errorMessage && (
          <Motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6 p-3 rounded-xl bg-[#F4E6E4] border border-[#E1C1BC] text-[#A7625B] text-sm text-center font-medium transition-colors"
          >
            {errorMessage}
          </Motion.div>
        )}

        <div className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#5E6473] ml-1 transition-colors">Full Name</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#8A8F9E] group-focus-within:text-[#6B8F71] transition-colors">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full pl-11 pr-4 py-3.5 bg-[#EDEAE2] border border-[#D8D3C7] text-[#2C3040] rounded-xl focus:border-[#6B8F71] focus:ring-1 focus:ring-[#6B8F71] outline-none transition-all placeholder:text-[#8A8F9E]"
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 2, message: "Minimum 2 characters" }
                })}
              />
            </div>
            {errors.name && (
              <p className="text-[#A7625B] text-xs ml-1 mt-1 transition-colors">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#5E6473] ml-1 transition-colors">Email</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#8A8F9E] group-focus-within:text-[#6B8F71] transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                placeholder="hello@example.com"
                className="w-full pl-11 pr-4 py-3.5 bg-[#EDEAE2] border border-[#D8D3C7] text-[#2C3040] rounded-xl focus:border-[#6B8F71] focus:ring-1 focus:ring-[#6B8F71] outline-none transition-all placeholder:text-[#8A8F9E]"
                {...register("email", { required: "Email is required" })}
              />
            </div>
            {errors.email && (
              <p className="text-[#A7625B] text-xs ml-1 mt-1 transition-colors">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#5E6473] ml-1 transition-colors">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#8A8F9E] group-focus-within:text-[#6B8F71] transition-colors">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3.5 bg-[#EDEAE2] border border-[#D8D3C7] text-[#2C3040] rounded-xl focus:border-[#6B8F71] focus:ring-1 focus:ring-[#6B8F71] outline-none transition-all placeholder:text-[#8A8F9E]"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" }
                })}
              />
            </div>
            {errors.password && (
              <p className="text-[#A7625B] text-xs ml-1 mt-1 transition-colors">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full group flex items-center justify-center gap-2 bg-[#6B8F71] hover:bg-[#5F8065] text-white py-3.5 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                Sign Up
                <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </>
            )}
          </button>
        </div>

        <p className="text-[#7B8190] text-sm text-center mt-8 transition-colors">
          Already have an account?{" "}
          <Link to="/login" className="text-[#48684F] font-medium hover:text-[#3F5D45] transition-colors">
            Login here
          </Link>
        </p>
      </form>
    </Motion.div>
  );
};

export default SignupForm;
