import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { getAllProperties, updatePropertyStatus } from '../../../utils/adminData';

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = () => {
    setProperties(getAllProperties());
  };

  const handleVerifyProperty = (propertyId, status) => {
    updatePropertyStatus(propertyId, status);
    loadProperties();
  };

  const filteredProperties = filter === 'all' 
    ? properties 
    : properties.filter(p => p.verificationStatus === filter);

  return (
    <DashboardLayout title="Property Listings">
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {['all', 'pending', 'verified', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg capitalize ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {status} ({status === 'all' ? properties.length : properties.filter(p => p.verificationStatus === status).length})
            </button>
          ))}
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                <span className={`absolute top-2 right-2 px-2 py-1 text-xs rounded-full ${
                  property.verificationStatus === 'verified' 
                    ? 'bg-green-500 text-white'
                    : property.verificationStatus === 'rejected'
                    ? 'bg-red-500 text-white'
                    : 'bg-yellow-500 text-white'
                }`}>
                  {property.verificationStatus}
                </span>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{property.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{property.location}</p>
                
                <div className="flex justify-between items-center mt-2">
                  <span className="text-lg font-bold text-blue-600">{property.price}</span>
                  <span className="text-xs text-gray-500">Seller: {property.sellerName}</span>
                </div>

                <div className="flex justify-between mt-3 text-sm text-gray-600">
                  <span>📐 {property.area}</span>
                  <span>🛏️ {property.bedrooms} BHK</span>
                </div>

                {property.verificationStatus === 'pending' && (
                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={() => handleVerifyProperty(property.id, 'verified')}
                      className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleVerifyProperty(property.id, 'rejected')}
                      className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminProperties;