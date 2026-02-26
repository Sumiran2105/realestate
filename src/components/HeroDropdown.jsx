import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export default function HeroDropdown() {
  const [active, setActive] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(null);
  const location = useLocation();

  // Only make sticky on home page
  const isHomePage = location.pathname === "/";

  const menus = {
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
      Property: ["Verify Property", "Legal Assistance", "Home Loans","Rental Agreements"],
      Support: ["Customer Care", "FAQs", "Contact Us"],
    },
  };

  const serviceLinks = {
    "Ready to Move": "/properties",
    "Owner Properties": "/properties",
    "Budget Homes": "/properties",
    "Under ₹50 Lac": "/properties",
    "₹50 Lac - ₹1 Cr": "/properties",
    "Above ₹1 Cr": "/properties",
    "Verify Property": "/services/verify-property",
    "Legal Assistance": "/services/legal-assistance",
    "Home Loans": "/services/home-loan",
    "Rental Agreements": "/services/rental-agreements",
    "Customer Care": "/contact",
    "FAQs": "/contact",
    "Contact Us": "/contact",
  };

  return (
    <div className={`w-full bg-white border-b border-slate-200 ${isHomePage ? "sticky top-16 z-40" : ""} shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Desktop Menu - Centered */}
        <div className="hidden md:flex justify-center items-center gap-2 sm:gap-4 lg:gap-8">
          {Object.keys(menus).map((menu) => (
            <div
              key={menu}
              className="relative cursor-pointer"
              onMouseEnter={() => setActive(menu)}
              onMouseLeave={() => setActive(null)}
            >
              <button className={`relative px-3 sm:px-4 lg:px-6 py-2 font-semibold text-sm sm:text-base transition-colors flex items-center gap-2
                ${
                  active === menu
                    ? "text-red-600"
                    : "text-gray-700 hover:text-gray-900"
                }
              `}>
                {menu}
              </button>

              {/* Active Underline */}
              {active === menu && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 transition-all"></div>
              )}

              {/* Glass Mega Dropdown */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 top-full pt-2 w-max min-w-[600px]
                bg-white backdrop-blur-xl border border-slate-200
                rounded-2xl shadow-2xl p-8 grid grid-cols-2 gap-8
                transition-all duration-300 origin-top z-50
                ${active === menu
                    ? "opacity-100 translate-y-0 visible pointer-events-auto"
                    : "opacity-0 -translate-y-2 invisible pointer-events-none"
                  }`}
                onMouseEnter={() => setActive(menu)}
                onMouseLeave={() => setActive(null)}
              >
                {Object.entries(menus[menu]).map(([title, items]) => (
                  <div key={title}>
                    <h4 className="font-semibold text-gray-900 mb-4 border-b pb-2">
                      {title}
                    </h4>
                    <ul className="space-y-3 text-gray-600">
                      {items.map((item, index) => (
                        <li key={index} className="text-sm">
                          {serviceLinks[item] ? (
                            <Link
                              to={serviceLinks[item]}
                              onClick={() => setActive(null)}
                              className="hover:text-red-600 transition"
                            >
                              {item}
                            </Link>
                          ) : (
                            <span className="hover:text-red-600 cursor-pointer transition">
                              {item}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Tabs - Centered */}
        <div className="md:hidden flex justify-center items-center gap-1 overflow-x-auto py-2 px-2">
          {Object.keys(menus).map((menu) => (
            <button
              key={menu}
              onClick={() =>
                setMobileOpen(mobileOpen === menu ? null : menu)
              }
              className={`relative px-3 py-3 font-semibold text-xs sm:text-sm transition-colors whitespace-nowrap
                ${
                  mobileOpen === menu
                    ? "text-red-600"
                    : "text-gray-700 hover:text-gray-900"
                }
              `}
            >
              {menu}

              {/* Active Underline */}
              {mobileOpen === menu && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600"></div>
              )}
            </button>
          ))}
        </div>

        {/* Mobile Accordion */}
        <div className="md:hidden">
          {mobileOpen && (
            <div className="bg-slate-50 py-4 px-4 grid grid-cols-2 gap-4">
              {Object.entries(menus[mobileOpen]).map(([title, items]) => (
                <div key={title}>
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                    {title}
                  </h4>
                  <ul className="space-y-1">
                    {items.map((item, index) => (
                      <li key={index} className="text-gray-600 text-xs">
                        {serviceLinks[item] ? (
                          <Link
                            to={serviceLinks[item]}
                            onClick={() => setMobileOpen(null)}
                            className="hover:text-red-600 transition"
                          >
                            {item}
                          </Link>
                        ) : (
                          item
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
