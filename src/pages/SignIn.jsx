import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#25252b] overflow-hidden">
      
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-[400px] p-8 border-2 border-[#e46033] shadow-[0_0_25px_#e46033] rounded-xl bg-[#2c2c33]"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Welcome Back
        </h2>

        <form className="space-y-6">
          <input
            type="text"
            placeholder="Username"
            className="w-full bg-transparent border-b-2 border-white text-white py-2 outline-none focus:border-[#e46033]"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-transparent border-b-2 border-white text-white py-2 outline-none focus:border-[#e46033]"
          />

          <button className="w-full py-3 border-2 border-[#e46033] rounded-full text-white font-semibold hover:bg-[#e46033] transition">
            Sign In
          </button>

          <p className="text-sm text-center text-white">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-[#e46033] font-semibold">
              Sign Up
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}