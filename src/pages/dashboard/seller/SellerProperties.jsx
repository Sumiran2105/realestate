import React, { useState } from 'react';
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';

const SellerProperties = () => {
  const [filter, setFilter] = useState('all');
  
  const properties = [
    {
      id: 1,
      title: '3BHK Luxury Apartment',
      location: 'Gachibowli, Hyderabad',
      price: '1.2 Cr',
      status: 'verified',
      views: 456,
      inquiries: 12,
      listedDate: '2024-01-10',
      image: 'https://via.placeholder.com/300x200'
    },
    {
      id: 2,
      title: '2BHK Affordable Flat',
      location: 'Kukatpally, Hyderabad',
      price: '65 L',
      status: 'verified',
      views: 234,
      inquiries: 8,
      listedDate: '2024-01-12',
      image: 'https://via.placeholder.com/300x200'
    },
    {
      id: 3,
      title: 'Commercial Office Space',
      location: 'Hitech City, Hyderabad',
      price: '2.5 Cr',
      status: 'pending',
      views: 89,
      inquiries: 3,
      listedDate: '2024-01-15',
      image: 'https://via.placeholder.com/300x200'
    },
    {
      id: 4,
      title: 'Independent Villa',
      location: 'Banjara Hills, Hyderabad',
      price: '3.8 Cr',
      status: 'sold',
      views: 789,
      inquiries: 25,
      listedDate: '2023-12-20',
      image: 'https://via.placeholder.com/300x200'
    },
    {
      id: 5,
      title: 'Plot for Construction',
      location: 'Miyapur, Hyderabad',
      price: '85 L',
      status: 'draft',
      views: 45,
      inquiries: 1,
      listedDate: '2024-01-16',
      image: 'https://via.placeholder.com/300x200'
    }
  ];

  const filteredProperties = filter === 'all' 
    ? properties 
    : properties.filter(p => p.status === filter);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="seller" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="My Properties" />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Filters and Actions */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg ${
                  filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('verified')}
                className={`px-4 py-2 rounded-lg ${
                  filter === 'verified' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Verified
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-lg ${
                  filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter('sold')}
                className={`px-4 py-2 rounded-lg ${
                  filter === 'sold' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Sold
              </button>
              <button
                onClick={() => setFilter('draft')}
                className={`px-4 py-2 rounded-lg ${
                  filter === 'draft' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Draft
              </button>
            </div>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              + Add New Property
            </button>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="h-48 bg-gray-200 relative">
                  <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                  <span className={`absolute top-2 right-2 px-2 py-1 text-xs rounded-full ${
                    property.status === 'verified' ? 'bg-green-500 text-white' :
                    property.status === 'pending' ? 'bg-yellow-500 text-white' :
                    property.status === 'sold' ? 'bg-gray-500 text-white' :
                    'bg-blue-500 text-white'
                  }`}>
                    {property.status.toUpperCase()}
                  </span>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{property.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{property.location}</p>
                  
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-lg font-bold text-blue-600">{property.price}</span>
                    <span className="text-xs text-gray-500">Listed: {property.listedDate}</span>
                  </div>
                  
                  <div className="flex justify-between mt-3 text-sm text-gray-600">
                    <span>👁️ {property.views} views</span>
                    <span>💬 {property.inquiries} inquiries</span>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                      Edit
                    </button>
                    <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SellerProperties;