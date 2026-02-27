import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaHeart, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false);
  const { user, logout } = useAuth();
  const isBuyer = user?.role === "buyer";
  const isAgent = user?.role === "agent";

  const featureMenus = {
    Buy: {
      Popular: ["Ready to Move", "Owner Properties", "Budget Homes"],
      Budget: ["Under ₹50 Lac", "₹50 Lac - ₹1 Cr", "Above ₹1 Cr"],
    },
    Rent: {
      Popular: ["Apartments", "Independent Houses", "Villas"],
      Budget: ["Under ₹20K", "₹20K - ₹50K", "Above ₹50K"],
    },
    Sell: {
      Owner: ["Post Property", "Dashboard"],
      Tools: ["Property Valuation", "Find Agent"],
    },
    Services: {
      Property: ["Verify Property", "Legal Assistance", "Home Loans", "Rental Agreements"],
      Support: ["Customer Care", "FAQs", "Contact Us"],
    },
  };

  const featureLinks = {
    "Ready to Move": "/properties",
    "Owner Properties": "/properties",
    "Budget Homes": "/properties",
    "Under ₹50 Lac": "/properties",
    "₹50 Lac - ₹1 Cr": "/properties",
    "Above ₹1 Cr": "/properties",
    Apartments: "/properties",
    "Independent Houses": "/properties",
    Villas: "/properties",
    "Under ₹20K": "/properties",
    "₹20K - ₹50K": "/properties",
    "Above ₹50K": "/properties",
    "Post Property": "/dashboard/seller/add-property",
    Dashboard: "/dashboard",
    "Property Valuation": "/services",
    "Find Agent": "/properties",
    "Verify Property": "/services/verify-property",
    "Legal Assistance": "/services/legal-assistance",
    "Home Loans": "/services/home-loan",
    "Rental Agreements": "/services/rental-agreements",
    "Customer Care": "/contact",
    FAQs: "/contact",
    "Contact Us": "/contact",
  };

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
          <div
            className="relative"
            onMouseEnter={() => setFeaturesOpen(true)}
            onMouseLeave={() => setFeaturesOpen(false)}
          >
            <button className="transition">Features</button>
            <div
              className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[760px] bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 grid grid-cols-4 gap-6 z-50 transition-all duration-200 ${
                featuresOpen ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              {Object.entries(featureMenus).map(([menu, groups]) => (
                <div key={menu}>
                  <h4 className="text-sm font-semibold text-slate-900 mb-3 border-b border-slate-200 pb-2">
                    {menu}
                  </h4>
                  <div className="space-y-3">
                    {Object.entries(groups).map(([groupTitle, items]) => (
                      <div key={groupTitle}>
                        <p className="text-xs font-medium text-slate-500 mb-1">{groupTitle}</p>
                        <ul className="space-y-1">
                          {items.map((item) => (
                            <li key={item}>
                              <Link
                                to={featureLinks[item] || "/"}
                                className="text-sm text-slate-700 hover:text-blue-700"
                                onClick={() => setFeaturesOpen(false)}
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
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
          <button
            onClick={() => setMobileFeaturesOpen((prev) => !prev)}
            className="text-left"
          >
            Features
          </button>
          {mobileFeaturesOpen && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 grid grid-cols-2 gap-3">
              {Object.entries(featureMenus).map(([menu, groups]) => (
                <div key={menu}>
                  <h4 className="text-xs font-semibold text-slate-900 mb-2">{menu}</h4>
                  {Object.entries(groups).map(([groupTitle, items]) => (
                    <div key={groupTitle} className="mb-2">
                      <p className="text-[11px] text-slate-500 mb-1">{groupTitle}</p>
                      <ul className="space-y-1">
                        {items.map((item) => (
                          <li key={item}>
                            <Link
                              to={featureLinks[item] || "/"}
                              onClick={() => {
                                setOpen(false);
                                setMobileFeaturesOpen(false);
                              }}
                              className="text-xs text-slate-700 hover:text-blue-700"
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
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
        </div>
      </div>
    </nav>
  );
}
