import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function HeroDropdown() {
  const [active, setActive] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(null);

  const menus = {
    Buy: {
      Popular: ["Ready to Move", "Owner Properties", "Budget Homes"],
      Budget: ["Under ₹50 Lac", "₹50 Lac - ₹1 Cr", "Above ₹1 Cr"],
    },
    Sell: {
      Owner: ["Post Property", "Dashboard"],
      Tools: ["Property Valuation", "Find Agent"],
    },
    Loans: {
      Apply: ["Home Loan", "Balance Transfer"],
      Explore: ["EMI Calculator", "Eligibility Check"],
    },
    Services: {
      Property: ["Verification", "Legal Assistance", "Home Inspection"],
      Support: ["Customer Care", "FAQs", "Contact Us"],
    },
  };

  return (
    <div className="w-full bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">

        {/* Desktop Menu */}
        <div className="hidden md:flex justify-center gap-12 py-4 text-gray-800 font-medium">
          {Object.keys(menus).map((menu) => (
            <div
              key={menu}
              className="relative cursor-pointer flex items-center gap-1 hover:text-blue-600"
              onMouseEnter={() => setActive(menu)}
              onMouseLeave={() => setActive(null)}
            >
              {menu}
              <ChevronDown size={16} />

              {/* Glass Mega Dropdown */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 top-10 w-[900px]
                bg-white/70 backdrop-blur-xl border border-white/40
                rounded-2xl shadow-2xl p-8 grid grid-cols-3 gap-8
                transition-all duration-300
                ${active === menu
                    ? "opacity-100 translate-y-0 visible"
                    : "opacity-0 -translate-y-5 invisible"
                  }`}
              >
                {Object.entries(menus[menu]).map(([title, items]) => (
                  <div key={title}>
                    <h4 className="font-semibold text-gray-900 mb-4 border-b pb-2">
                      {title}
                    </h4>
                    <ul className="space-y-3 text-gray-600">
                      {items.map((item, index) => (
                        <li
                          key={index}
                          className="hover:text-blue-600 cursor-pointer transition"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Accordion */}
        <div className="md:hidden py-4">
          {Object.keys(menus).map((menu) => (
            <div key={menu} className="border-b">
              <button
                onClick={() =>
                  setMobileOpen(mobileOpen === menu ? null : menu)
                }
                className="w-full flex justify-between items-center py-4 font-medium"
              >
                {menu}
                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    mobileOpen === menu ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  mobileOpen === menu ? "max-h-96 pb-4" : "max-h-0"
                }`}
              >
                {Object.entries(menus[menu]).map(([title, items]) => (
                  <div key={title} className="pl-4 mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      {title}
                    </h4>
                    <ul className="space-y-2 text-gray-600">
                      {items.map((item, index) => (
                        <li key={index} className="text-sm">
                          {item}
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
  );
}