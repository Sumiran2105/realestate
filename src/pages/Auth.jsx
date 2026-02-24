import { useState } from "react";

export default function Auth() {
  const [active, setActive] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div
        className="relative w-[750px] h-[450px] border-2 border-blue-600 
        shadow-[0_10px_40px_rgba(37,99,235,0.3)] 
        overflow-hidden rounded-xl bg-white"
      >
        {/* ================= CURVED SHAPE 1 ================= */}
        <div
          className={`absolute right-0 top-[-5px] h-[600px] w-[850px] 
          bg-gradient-to-br from-blue-600 to-blue-400
          origin-bottom-right transition-all duration-[1500ms] ease-in-out
          ${active ? "rotate-0 skew-y-0" : "rotate-[10deg] skew-y-[40deg]"}`}
        />

        {/* ================= CURVED SHAPE 2 ================= */}
        <div
          className={`absolute left-[250px] top-full h-[700px] w-[850px] 
          bg-white border-t-2 border-blue-600
          origin-bottom-left transition-all duration-[1500ms] ease-in-out
          ${active ? "-rotate-[11deg] -skew-y-[41deg]" : ""}`}
        />

        {/* ================= LOGIN FORM ================= */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center px-10 
          transition-all duration-700
          ${active ? "-translate-x-[120%] opacity-0" : "translate-x-0 opacity-100"}`}
        >
          <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
            Login
          </h2>

          <form className="space-y-6">
            <Input label="Username" />
            <Input label="Password" type="password" />

            <button className="w-full h-[45px] bg-blue-600 rounded-full 
              text-white font-semibold hover:bg-blue-700 transition">
              Login
            </button>

            <p className="text-sm text-center text-gray-600">
              Don’t have an account?{" "}
              <span
                onClick={() => setActive(true)}
                className="text-blue-600 font-semibold cursor-pointer"
              >
                Sign Up
              </span>
            </p>
          </form>
        </div>

        {/* ================= REGISTER FORM ================= */}
        <div
          className={`absolute top-0 right-0 w-1/2 h-full flex flex-col justify-center px-14 
          transition-all duration-700
          ${active ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"}`}
        >
          <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
            Register
          </h2>

          <form className="space-y-6">
            <Input label="Username" />
            <Input label="Email" type="email" />
            <Input label="Password" type="password" />

            <button className="w-full h-[45px] bg-blue-600 rounded-full 
              text-white font-semibold hover:bg-blue-700 transition">
              Register
            </button>

            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => setActive(false)}
                className="text-blue-600 font-semibold cursor-pointer"
              >
                Sign In
              </span>
            </p>
          </form>
        </div>

        {/* ================= INFO LEFT ================= */}
        <div
          className={`absolute top-0 right-0 w-1/2 h-full flex flex-col justify-center 
          text-right px-10 transition-all duration-700
          ${active ? "translate-x-[120%] opacity-0" : ""}`}
        >
          <h2 className="text-4xl font-bold text-white uppercase">
            Welcome Back!
          </h2>
          <p className="text-white mt-4">
            We are happy to have you with us again.
          </p>
        </div>

        {/* ================= INFO RIGHT ================= */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center 
          text-left px-10 transition-all duration-700
          ${active ? "" : "-translate-x-[120%] opacity-0"}`}
        >
          <h2 className="text-4xl font-bold text-white uppercase">
            Welcome!
          </h2>
          <p className="text-white mt-4">
            We’re delighted to have you here.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================= Floating Input ================= */
function Input({ label, type = "text" }) {
  return (
    <div className="relative w-full h-[50px]">
      <input
        type={type}
        required
        className="peer w-full h-full bg-transparent border-b-2 border-gray-400 
        text-gray-800 font-semibold outline-none focus:border-blue-600"
      />
      <label className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 transition-all 
        peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600
        peer-valid:-top-2 peer-valid:text-sm">
        {label}
      </label>
    </div>
  );
}