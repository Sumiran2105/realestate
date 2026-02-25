import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-slate-800">
          VeriEstate
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-slate-700 font-medium">
          <Link to="/" className="transition">Home</Link>
          <Link to="/services" className="transition">Services</Link>
          <Link to="/about" className="transition">About</Link>
          <Link to="/contact" className="transition">Contact</Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="flex gap-3">  
          <div className="hidden md:flex items-center">
            <Link to="/login" className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition">Login</Link>
          </div>
          <div className="hidden md:flex items-center">
            <Link to="/register" className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition">Sign Up</Link>
          </div>
        </div>
        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl text-slate-700"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
        ${open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
        bg-white shadow-inner`}
      >
        <div className="flex flex-col px-6 py-4 space-y-4 text-slate-700 font-medium">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/services" onClick={() => setOpen(false)}>Services</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>

          <Link
            to="/auth"
            onClick={() => setOpen(false)}
            className="mt-3 bg-slate-800 text-white px-4 py-2 rounded-lg text-center"
          >
            Login / Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}