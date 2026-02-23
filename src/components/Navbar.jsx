import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-brand-dark">
          VeriEstate
        </Link>

        {/* Links */}
        <div className="hidden md:flex gap-8 text-slate-700 font-medium">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-4">
          <Link
            to="/signin"
            className="px-4 py-2 text-emerald-600 font-medium"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}