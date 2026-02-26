import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaHeart, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { IoIosMagnet } from "react-icons/io";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const isBuyer = user?.role === "buyer";
  const isAgent = user?.role === "agent";

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

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

        {/* Desktop Right Controls */}
        <div className="flex gap-3">
          {isBuyer ? (
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/wishlist"
                className="w-10 h-10 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition flex items-center justify-center"
                title="Wishlist"
              >
                <FaHeart />
              </Link>
              <Link
                to="/buyer/profile"
                className="w-10 h-10 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition flex items-center justify-center"
                title="Profile"
              >
                <FaUserCircle />
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 transition"
              >
                Logout
              </button>
            </div>
          ) : !user ? (
            <>
              <div className="hidden md:flex items-center">
                <Link to="/login" className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition">Login</Link>
              </div>
              <div className="hidden md:flex items-center">
                <Link to="/register" className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition">Sign Up</Link>
              </div>
            </>
          ) : null}
          
          {isAgent ? (
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/"
                className="w-10 h-10 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition flex items-center justify-center"
                title="Agent Home"
              >
                < FaUserCircle />
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 transition"
              >
                Logout
              </button>
            </div>
          ) : null 
          }

        </div>
        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-2xl text-slate-700 "
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
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

          {isBuyer ? (
            <>
              <Link to="/buyer/home" onClick={() => setOpen(false)}>Buyer Home</Link>
              <Link to="/wishlist" onClick={() => setOpen(false)} className="flex items-center gap-2">
                <FaHeart /> Wishlist
              </Link>
              <Link to="/buyer/profile" onClick={() => setOpen(false)} className="flex items-center gap-2">
                <FaUserCircle /> Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-left border border-red-300 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition"
              >
                Logout
              </button>
            </>
          ) : !user ? (
            <>
              <Link to="/login" className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition">Login</Link>
              <Link to="/register" className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition">Sign Up</Link>
            </>
          ) : null}

          {isAgent ? (
            <>
              <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                <IoIosMagnet /> Agent Home
              </Link>
              <Link to="/agent/profile" onClick={() => setOpen(false)} className="flex items-center gap-2">
                <FaUserCircle /> Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-left border border-red-300 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition"
              >
                Logout
              </button>
            </>
          ) : null
          }
        </div>
      </div>
    </nav>
  );
}
