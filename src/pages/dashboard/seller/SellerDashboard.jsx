import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import DashboardLayout from "../../../layouts/DashboardLayout";
import {
  getSellerListings,
  updateSellerListing,
  deleteSellerListing,
} from "../../../utils/sellerListings";

import {
  FaHome,
  FaCheckCircle,
  FaEye,
  FaComments,
} from "react-icons/fa";

const SellerDashboard = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    setProperties(getSellerListings(user?.id));
  }, [user?.id]);

  const stats = useMemo(() => {
    const activeStatuses = new Set(["verified", "pending", "under_review"]);
    const activeListings = properties.filter((item) => activeStatuses.has(item.status)).length;
    const totalViews = properties.reduce((sum, item) => sum + (item.views || 0), 0);
    const totalInquiries = properties.reduce((sum, item) => sum + (item.inquiries || 0), 0);

    return [
      {
        label: "Total Properties",
        value: String(properties.length),
        icon: <FaHome className="text-blue-600 text-xl" />,
        bg: "bg-blue-100",
      },
      {
        label: "Active Listings",
        value: String(activeListings),
        icon: <FaCheckCircle className="text-green-600 text-xl" />,
        bg: "bg-green-100",
      },
      {
        label: "Total Views",
        value: totalViews.toLocaleString("en-IN"),
        icon: <FaEye className="text-purple-600 text-xl" />,
        bg: "bg-purple-100",
      },
      {
        label: "Inquiries",
        value: totalInquiries.toLocaleString("en-IN"),
        icon: <FaComments className="text-yellow-600 text-xl" />,
        bg: "bg-yellow-100",
      },
    ];
  }, [properties]);

  const handleEdit = (property) => {
    const currentTitle = property.title || property.name || "";
    const currentPrice = property.price || "";
    const nextTitle = window.prompt("Edit property title", currentTitle);
    if (nextTitle === null) return;

    const nextPrice = window.prompt("Edit expected price", currentPrice);
    if (nextPrice === null) return;

    const updated = updateSellerListing(user?.id, property.id, {
      title: nextTitle.trim() || currentTitle,
      price: nextPrice.trim() || currentPrice,
    });
    setProperties(updated);
  };

  const handleDelete = (property) => {
    const confirmed = window.confirm(
      `Delete listing "${property.title || property.name}"? This cannot be undone.`
    );
    if (!confirmed) return;

    const updated = deleteSellerListing(user?.id, property.id);
    setProperties(updated);
  };

  return (
    <DashboardLayout title="Seller Dashboard">
      {/* Welcome Section */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name?.split(" ")[0]}!
          </h2>
          <p className="text-gray-600 mt-1">
            Manage your properties and track performance.
          </p>
        </div>
        <Link
          to="/dashboard/seller/add-property"
          className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          List Property
        </Link>
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
                {properties.slice(0, 6).map((property, index) => (
                  <tr
                    key={property.id || index}
                    className="border-t border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 text-sm font-medium text-gray-900">
                      {property.title || property.name}
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
                            : property.status === "under_review"
                            ? "bg-indigo-100 text-indigo-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {property.status === "under_review" ? "under review" : property.status}
                      </span>
                    </td>

                    <td className="py-3 text-sm text-gray-600">
                      {property.views}
                    </td>

                    <td className="py-3">
                      <button
                        onClick={() => handleEdit(property)}
                        className="text-sm text-blue-600 hover:text-blue-800 transition mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(property)}
                        className="text-sm text-red-600 hover:text-red-800 transition"
                      >
                        Delete
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
