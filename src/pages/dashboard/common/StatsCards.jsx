import React from "react";
import {
  FaUsers,
  FaHome,
  FaHourglassHalf,
  FaCheckCircle,
  FaRupeeSign,
  FaStar,
} from "react-icons/fa";

const StatsCards = ({ stats }) => {
  const cardConfig = [
    {
      key: "totalLeads",
      label: "Total Leads",
      icon: <FaUsers className="text-blue-600 text-xl" />,
      bg: "bg-blue-100",
    },
    {
      key: "activeListings",
      label: "Active Listings",
      icon: <FaHome className="text-green-600 text-xl" />,
      bg: "bg-green-100",
    },
    {
      key: "pendingVerifications",
      label: "Pending Verifications",
      icon: <FaHourglassHalf className="text-yellow-600 text-xl" />,
      bg: "bg-yellow-100",
    },
    {
      key: "completedDeals",
      label: "Completed Deals",
      icon: <FaCheckCircle className="text-purple-600 text-xl" />,
      bg: "bg-purple-100",
    },
    {
      key: "totalCommission",
      label: "Total Commission",
      icon: <FaRupeeSign className="text-indigo-600 text-xl" />,
      bg: "bg-indigo-100",
      format: "currency",
    },
    {
      key: "avgRating",
      label: "Average Rating",
      icon: <FaStar className="text-orange-500 text-xl" />,
      bg: "bg-orange-100",
      format: "rating",
    },
  ];

  const formatValue = (value, format) => {
    if (format === "currency") {
      return `₹${(value / 100000).toFixed(1)}L`;
    }
    if (format === "rating") {
      return value.toFixed(1);
    }
    return value;
  };

  return (
    <>
      {cardConfig.map((card) => {
        if (stats[card.key] === undefined) return null;

        return (
          <div
            key={card.key}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition"
          >
            <div className="flex items-center">
              <div className={`p-3 ${card.bg} rounded-lg`}>
                {card.icon}
              </div>

              <div className="ml-4">
                <p className="text-sm text-gray-600">
                  {card.label}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatValue(stats[card.key], card.format)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default StatsCards;