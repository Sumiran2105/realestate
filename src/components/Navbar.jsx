import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-4 sm:px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-brand-dark">
          VeriEstate
        </Link>

        {/* Hamburger (mobile) */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((s) => !s)}
          className="md:hidden text-2xl text-slate-700"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>

        {/* Links (desktop) */}
        <div className="hidden md:flex gap-8 text-slate-700 font-medium">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About</Link>
          
          <Link to="/contact">Contact</Link>
        </div>

        {/* Auth Buttons (desktop) */}
        <div className="flex gap-3">  
          <div className="hidden md:flex items-center">
            <Link to="/login" className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition">Login</Link>
          </div>
          <div className="hidden md:flex items-center">
            <Link to="/register" className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition">Sign Up</Link>
          </div>
        </div>

        {/* Mobile menu overlay */}
        {open && (
          <div className="absolute inset-x-0 top-full bg-white shadow-md md:hidden">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3">
              <Link to="/" onClick={() => setOpen(false)} className="py-2 px-2 text-slate-700 font-medium">Home</Link>
              <Link to="/about" onClick={() => setOpen(false)} className="py-2 px-2 text-slate-700 font-medium">About</Link>
              <Link to="/services" onClick={() => setOpen(false)} className="py-2 px-2 text-slate-700 font-medium">Services</Link>
              <Link to="/contact" onClick={() => setOpen(false)} className="py-2 px-2 text-slate-700 font-medium">Contact</Link>
              <Link to="/auth" onClick={() => setOpen(false)} className="mt-2 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition w-max">Login / Sign Up</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}