import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, Loader2, Sparkles } from "lucide-react";

const LoginForm = ({ onSubmit, errorMessage }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md relative z-10"
    >
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-400/20 dark:bg-blue-500/20 rounded-full blur-[80px] pointer-events-none transition-colors duration-500" />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-400/20 dark:bg-purple-500/20 rounded-full blur-[80px] pointer-events-none transition-colors duration-500" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/90 dark:bg-[#121A2F]/80 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden transition-colors duration-300"
      >
        {/* Subtle top highlight */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-white/20 to-transparent transition-colors" />

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-500/20 dark:to-purple-600/20 border border-gray-200 dark:border-white/10 mb-6 shadow-xl transition-colors">
            <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400 transition-colors" />
          </div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 transition-colors">
            Welcome Back
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm transition-colors">Sign in to continue to your dashboard</p>
        </div>

        {errorMessage && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6 p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm text-center font-medium transition-colors"
          >
            {errorMessage}
          </motion.div>
        )}

        <div className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1 transition-colors">Email</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 dark:text-gray-500 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                placeholder="hello@example.com"
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-[#0A0F1C]/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                {...register("email", { required: "Email is required" })}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 dark:text-red-400 text-xs ml-1 mt-1 transition-colors">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1 transition-colors">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 dark:text-gray-500 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-[#0A0F1C]/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                {...register("password", { required: "Password is required" })}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 dark:text-red-400 text-xs ml-1 mt-1 transition-colors">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-3.5 rounded-xl font-semibold transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm text-center mt-8 transition-colors">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            Create one now
          </Link>
        </p>
      </form>
    </motion.div>
  );
};

export default LoginForm;
