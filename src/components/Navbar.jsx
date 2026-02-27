import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaHeart, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false);
  const { user, logout } = useAuth();
  const isBuyer = user?.role === "buyer";
  
  // Close mobile menu when clicking outside
  const mobileMenuRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

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

  // Close mobile menu when link is clicked
  const handleMobileLinkClick = () => {
    setOpen(false);
    setMobileFeaturesOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-xl sm:text-2xl font-bold text-slate-800 hover:text-blue-600 transition md:mt-0 mt-4"
          >
            VeriEstate
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link to="/" className="text-slate-700 hover:text-blue-600 font-medium transition">
              Home
            </Link>
            <Link to="/services" className="text-slate-700 hover:text-blue-600 font-medium transition">
              Services
            </Link>
            {/* Features Dropdown - No Arrow */}
            <div
              className="relative"
              onMouseEnter={() => setFeaturesOpen(true)}
              onMouseLeave={() => setFeaturesOpen(false)}
            >
              <button className="text-slate-700 hover:text-blue-600 font-medium transition">
                Features
              </button>
              
              {/* Dropdown Menu */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[780px] bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 grid grid-cols-4 gap-6 z-50 transition-all duration-200 ${
                  featuresOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
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
                                  className="text-sm text-slate-700 hover:text-blue-700 transition"
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
            <Link to="/about" className="text-slate-700 hover:text-blue-600 font-medium transition">
              About
            </Link>
            <Link to="/contact" className="text-slate-700 hover:text-blue-600 font-medium transition">
              Contact
            </Link>
            
          </div>

          {/* Desktop Right Controls */}
          <div className="hidden md:flex items-center gap-3">
            {isBuyer ? (
              <>
                <Link
                  to="/wishlist"
                  className="w-10 h-10 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-red-500 transition flex items-center justify-center"
                  title="Wishlist"
                >
                  <FaHeart />
                </Link>
                <Link
                  to="/buyer/profile"
                  className="w-10 h-10 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition flex items-center justify-center"
                  title="Profile"
                >
                  <FaUserCircle size={20} />
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 transition font-medium text-sm"
                >
                  Logout
                </button>
              </>
            ) : !user ? (
              <div className="flex items-center gap-2">
                <Link 
                  to="/login" 
                  className="px-4 py-2 rounded-lg hardgreen text-white hover:bg-emerald-600 transition font-medium text-sm"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 rounded-lg border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 transition font-medium text-sm"
                >
                  Sign Up
                </Link>
              </div>
            ) : null}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
            aria-label="Toggle menu"
          >
            {open ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {open && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 w-[85%] max-w-sm h-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden overflow-y-auto ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center mb-8">
            <Link 
              to="/" 
              className="text-xl font-bold text-slate-800 flex items-center gap-2 "
              onClick={handleMobileLinkClick}
            >
              VeriEstate
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-100 transition"
              aria-label="Close menu"
            >
              <FaTimes size={20} className="text-slate-600" />
            </button>
          </div>

          {/* User Info - if logged in */}
          {user && (
            <div className="mb-6 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm font-medium text-slate-700">Welcome back,</p>
              <p className="text-base font-bold text-blue-600 truncate">{user.email || 'User'}</p>
            </div>
          )}

          {/* Mobile Navigation Links */}
          <div className="space-y-1">
            <Link
              to="/"
              onClick={handleMobileLinkClick}
              className="block px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition"
            >
              Home
            </Link>

            {/* Mobile Features Accordion - Simple version */}
            <div>
              <button
                onClick={() => setMobileFeaturesOpen(!mobileFeaturesOpen)}
                className="w-full px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition text-left"
              >
                Features
              </button>
              
              {/* Always visible when open - no max-height constraints */}
              {mobileFeaturesOpen && (
                <div className="bg-slate-50 rounded-xl p-4 mt-2 mb-4 space-y-6">
                  {/* Buy Section */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-2">Buy</h4>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs font-medium text-slate-500">Popular</p>
                        <div className="pl-2 mt-1 space-y-1">
                          {featureMenus.Buy.Popular.map((item) => (
                            <Link
                              key={item}
                              to={featureLinks[item] || "/"}
                              onClick={handleMobileLinkClick}
                              className="block text-sm text-slate-700 hover:text-blue-600 py-1"
                            >
                              {item}
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-500">Budget</p>
                        <div className="pl-2 mt-1 space-y-1">
                          {featureMenus.Buy.Budget.map((item) => (
                            <Link
                              key={item}
                              to={featureLinks[item] || "/"}
                              onClick={handleMobileLinkClick}
                              className="block text-sm text-slate-700 hover:text-blue-600 py-1"
                            >
                              {item}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rent Section */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-2">Rent</h4>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs font-medium text-slate-500">Popular</p>
                        <div className="pl-2 mt-1 space-y-1">
                          {featureMenus.Rent.Popular.map((item) => (
                            <Link
                              key={item}
                              to={featureLinks[item] || "/"}
                              onClick={handleMobileLinkClick}
                              className="block text-sm text-slate-700 hover:text-blue-600 py-1"
                            >
                              {item}
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-500">Budget</p>
                        <div className="pl-2 mt-1 space-y-1">
                          {featureMenus.Rent.Budget.map((item) => (
                            <Link
                              key={item}
                              to={featureLinks[item] || "/"}
                              onClick={handleMobileLinkClick}
                              className="block text-sm text-slate-700 hover:text-blue-600 py-1"
                            >
                              {item}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sell Section */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-2">Sell</h4>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs font-medium text-slate-500">Owner</p>
                        <div className="pl-2 mt-1 space-y-1">
                          {featureMenus.Sell.Owner.map((item) => (
                            <Link
                              key={item}
                              to={featureLinks[item] || "/"}
                              onClick={handleMobileLinkClick}
                              className="block text-sm text-slate-700 hover:text-blue-600 py-1"
                            >
                              {item}
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-500">Tools</p>
                        <div className="pl-2 mt-1 space-y-1">
                          {featureMenus.Sell.Tools.map((item) => (
                            <Link
                              key={item}
                              to={featureLinks[item] || "/"}
                              onClick={handleMobileLinkClick}
                              className="block text-sm text-slate-700 hover:text-blue-600 py-1"
                            >
                              {item}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Services Section */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-2">Services</h4>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs font-medium text-slate-500">Property</p>
                        <div className="pl-2 mt-1 space-y-1">
                          {featureMenus.Services.Property.map((item) => (
                            <Link
                              key={item}
                              to={featureLinks[item] || "/"}
                              onClick={handleMobileLinkClick}
                              className="block text-sm text-slate-700 hover:text-blue-600 py-1"
                            >
                              {item}
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-500">Support</p>
                        <div className="pl-2 mt-1 space-y-1">
                          {featureMenus.Services.Support.map((item) => (
                            <Link
                              key={item}
                              to={featureLinks[item] || "/"}
                              onClick={handleMobileLinkClick}
                              className="block text-sm text-slate-700 hover:text-blue-600 py-1"
                            >
                              {item}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/services"
              onClick={handleMobileLinkClick}
              className="block px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition"
            >
              Services
            </Link>
            <Link
              to="/about"
              onClick={handleMobileLinkClick}
              className="block px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={handleMobileLinkClick}
              className="block px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Action Buttons */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            {isBuyer ? (
              <div className="space-y-3">
                <Link
                  to="/wishlist"
                  onClick={handleMobileLinkClick}
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition"
                >
                  <FaHeart className="text-red-500" />
                  <span>Wishlist</span>
                </Link>
                <Link
                  to="/buyer/profile"
                  onClick={handleMobileLinkClick}
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition"
                >
                  <FaUserCircle className="text-blue-600" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg transition border border-red-200"
                >
                  Logout
                </button>
              </div>
            ) : !user ? (
              <div className="space-y-3">
                <Link
                  to="/login"
                  onClick={handleMobileLinkClick}
                  className="block w-full px-4 py-3 text-center font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={handleMobileLinkClick}
                  className="block w-full px-4 py-3 text-center font-medium text-emerald-600 border-2 border-emerald-500 hover:bg-emerald-50 rounded-lg transition"
                >
                  Sign Up
                </Link>
              </div>
            ) : null}
          </div>

          {/* Footer Note */}
          <p className="mt-8 text-xs text-center text-slate-500">
            © 2024 VeriEstate. All rights reserved.
          </p>
        </div>
      </div>
    </nav>
  );
}