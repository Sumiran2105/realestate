import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../../layouts/DashboardLayout';

const AgentListings = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const listings = [
    { id: 1, title: '3BHK Luxury Apartment', location: 'Gachibowli, Hyderabad', price: '₹1.2 Cr', status: 'active', views: 456, inquiries: 12, image: 'https://via.placeholder.com/300x200' },
    { id: 2, title: '2BHK Affordable Flat', location: 'Kukatpally, Hyderabad', price: '₹65 L', status: 'active', views: 234, inquiries: 8, image: 'https://via.placeholder.com/300x200' },
    { id: 3, title: 'Commercial Office Space', location: 'Hitech City, Hyderabad', price: '₹2.5 Cr', status: 'pending', views: 89, inquiries: 3, image: 'https://via.placeholder.com/300x200' },
    { id: 4, title: 'Independent Villa', location: 'Banjara Hills, Hyderabad', price: '₹3.8 Cr', status: 'sold', views: 789, inquiries: 25, image: 'https://via.placeholder.com/300x200' },
    { id: 5, title: '4BHK Penthouse', location: 'Jubilee Hills, Hyderabad', price: '₹4.5 Cr', status: 'active', views: 567, inquiries: 15, image: 'https://via.placeholder.com/300x200' }
  ];

  const filteredListings = listings
    .filter(l => filter === 'all' ? true : l.status === filter)
    .filter(l => l.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                 l.location.toLowerCase().includes(searchTerm.toLowerCase()));

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-600';
      case 'pending': return 'bg-yellow-100 text-yellow-600';
      case 'sold': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <DashboardLayout title="My Listings">
      {/* Header with Search and Add Button */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search listings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          + Add New Listing
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-2 min-w-max">
          {['all', 'active', 'pending', 'sold'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm capitalize whitespace-nowrap ${
                filter === status 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {status} ({listings.filter(l => status === 'all' ? true : l.status === status).length})
            </button>
          ))}
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing) => (
          <div key={listing.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
            <div className="h-48 bg-gray-200 relative">
              <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
              <span className={`absolute top-2 right-2 px-2 py-1 text-xs rounded-full ${getStatusColor(listing.status)}`}>
                {listing.status.toUpperCase()}
              </span>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">{listing.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{listing.location}</p>
              
              <div className="flex justify-between items-center mt-2">
                <span className="text-lg font-bold text-blue-600">{listing.price}</span>
              </div>
              
              <div className="flex justify-between mt-3 text-sm text-gray-600">
                <span>👁️ {listing.views} views</span>
                <span>💬 {listing.inquiries} inquiries</span>
              </div>
              
              <div className="flex space-x-2 mt-4">
                <Link 
                  to={`/property/${listing.id}`}
                  className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 text-center"
                >
                  View
                </Link>
                <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No listings found</p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AgentListings;