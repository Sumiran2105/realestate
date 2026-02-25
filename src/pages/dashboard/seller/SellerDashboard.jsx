import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import DashboardLayout from "../../../layouts/DashboardLayout";

import {
  FaHome,
  FaCheckCircle,
  FaEye,
  FaComments,
} from "react-icons/fa";

const SellerDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      label: "Total Properties",
      value: "5",
      icon: <FaHome className="text-blue-600 text-xl" />,
      bg: "bg-blue-100",
    },
    {
      label: "Active Listings",
      value: "3",
      icon: <FaCheckCircle className="text-green-600 text-xl" />,
      bg: "bg-green-100",
    },
    {
      label: "Total Views",
      value: "1,245",
      icon: <FaEye className="text-purple-600 text-xl" />,
      bg: "bg-purple-100",
    },
    {
      label: "Inquiries",
      value: "28",
      icon: <FaComments className="text-yellow-600 text-xl" />,
      bg: "bg-yellow-100",
    },
  ];

  const properties = [
    {
      name: "3BHK Luxury Apartment",
      location: "Gachibowli",
      price: "₹1.2Cr",
      status: "verified",
      views: 456,
    },
    {
      name: "2BHK Affordable Flat",
      location: "Kukatpally",
      price: "₹65L",
      status: "verified",
      views: 234,
    },
    {
      name: "Commercial Space",
      location: "Hitech City",
      price: "₹2.5Cr",
      status: "pending",
      views: 89,
    },
  ];

  return (
    <DashboardLayout title="Seller Dashboard">
      {/* Welcome Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name?.split(" ")[0]}!
        </h2>
        <p className="text-gray-600 mt-1">
          Manage your properties and track performance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition"
          >
            <div className="flex items-center">
              <div className={`p-3 ${stat.bg} rounded-lg`}>
                {stat.icon}
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Properties Table */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Your Properties
          </h3>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500">
                  <th className="pb-3">Property</th>
                  <th className="pb-3">Location</th>
                  <th className="pb-3">Price</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Views</th>
                  <th className="pb-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {properties.map((property, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 text-sm font-medium text-gray-900">
                      {property.name}
                    </td>
                    <td className="py-3 text-sm text-gray-600">
                      {property.location}
                    </td>
                    <td className="py-3 text-sm text-gray-900">
                      {property.price}
                    </td>

                    <td className="py-3">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          property.status === "verified"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {property.status}
                      </span>
                    </td>

                    <td className="py-3 text-sm text-gray-600">
                      {property.views}
                    </td>

                    <td className="py-3">
                      <button className="text-sm text-blue-600 hover:text-blue-800 transition">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SellerDashboard;