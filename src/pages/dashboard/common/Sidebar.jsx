import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

import {
  FaChartBar,
  FaHome,
  FaUsers,
  FaChartLine,
  FaRupeeSign,
  FaUser,
  FaPlus,
  FaComments,
  FaHeart,
  FaSearch,
  FaSignOutAlt,
  FaTimes,
  FaCheckCircle,
  FaHourglassHalf,
} from "react-icons/fa";

const Sidebar = ({ role, isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = {
    agent: [
      { path: "/dashboard/agent", icon: <FaChartBar />, label: "Dashboard", exact: true },
      { path: "/dashboard/agent/listings", icon: <FaHome />, label: "My Listings" },
      { path: "/dashboard/agent/leads", icon: <FaUsers />, label: "Leads" },
      { path: "/dashboard/agent/analytics", icon: <FaChartLine />, label: "Analytics" },
      { path: "/dashboard/agent/transactions", icon: <FaRupeeSign />, label: "Transactions" },
      { path: "/dashboard/agent/profile", icon: <FaUser />, label: "Profile" },
    ],
    seller: [
      { path: "/dashboard/seller", icon: <FaChartBar />, label: "Dashboard", exact: true },
      { path: "/dashboard/seller/properties", icon: <FaHome />, label: "My Properties" },
      { path: "/dashboard/seller/add-property", icon: <FaPlus />, label: "Add Property" },
      { path: "/dashboard/seller/inquiries", icon: <FaComments />, label: "Inquiries" },
      { path: "/dashboard/seller/profile", icon: <FaUser />, label: "Profile" },
    ],
    buyer: [
      { path: "/dashboard/buyer", icon: <FaChartBar />, label: "Dashboard", exact: true },
      { path: "/dashboard/buyer/favorites", icon: <FaHeart />, label: "Favorites" },
      { path: "/dashboard/buyer/searches", icon: <FaSearch />, label: "Saved Searches" },
      { path: "/dashboard/buyer/profile", icon: <FaUser />, label: "Profile" },
    ],
  };

  const currentMenu = menuItems[role] || menuItems.buyer;

  const isLinkActive = (item) => {
    if (item.exact) {
      return location.pathname === item.path;
    }
    return (
      location.pathname.startsWith(item.path) &&
      location.pathname !== `/dashboard/${role}`
    );
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 768 && onClose) {
      onClose();
    }
  };

  /* ================= DESKTOP ================= */

  const DesktopSidebar = () => (
    <aside className="hidden md:flex md:flex-col md:w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
      <div className="p-6">
        <h1 className="text-xl font-bold text-blue-600">
          RealEstate
        </h1>
        <p className="text-xs text-gray-500 mt-1 capitalize">
          {role} Dashboard
        </p>
      </div>

      {/* User Info */}
      <div className="px-4 pb-4">
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              {user?.kycStatus === "completed" ? (
                <>
                  <FaCheckCircle className="text-green-500 text-xs" />
                  Verified
                </>
              ) : (
                <>
                  <FaHourglassHalf className="text-yellow-500 text-xs" />
                  KYC Pending
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {currentMenu.map((item) => {
          const isActive = isLinkActive(item);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={handleLinkClick}
              className={`flex items-center px-3 py-2.5 rounded-lg transition ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              <span className="text-sm font-medium">
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center px-3 py-2.5 w-full text-red-600 hover:bg-red-50 rounded-lg transition"
        >
          <FaSignOutAlt className="mr-3" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );

  /* ================= MOBILE ================= */

  const MobileSidebar = () => (
    <div className={`fixed inset-0 z-50 md:hidden ${isOpen ? "visible" : "invisible"}`}>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? "opacity-50" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 left-0 bottom-0 w-64 bg-white transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-600">
              RealEstate
            </h1>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
            >
              <FaTimes />
            </button>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {currentMenu.map((item) => {
              const isActive = isLinkActive(item);

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={handleLinkClick}
                  className={`flex items-center px-3 py-2.5 rounded-lg transition ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  <span className="text-sm font-medium">
                    {item.label}
                  </span>
                </NavLink>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2.5 w-full text-red-600 hover:bg-red-50 rounded-lg"
            >
              <FaSignOutAlt className="mr-3" />
              <span className="text-sm font-medium">
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;