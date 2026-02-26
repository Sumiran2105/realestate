import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';
import { useAuth } from '../../../contexts/AuthContext';
import { getSellerListings } from '../../../utils/sellerListings';

const SellerProperties = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    setProperties(getSellerListings(user?.id));
  }, [user?.id]);

  const filteredProperties =
    filter === 'all' ? properties : properties.filter((property) => property.status === filter);

  const statusStyles = {
    verified: 'bg-green-500 text-white',
    pending: 'bg-yellow-500 text-white',
    under_review: 'bg-indigo-500 text-white',
    sold: 'bg-gray-500 text-white',
    draft: 'bg-blue-500 text-white',
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="seller" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="My Properties" />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
            <div className="flex flex-wrap gap-2">
              {['all', 'verified', 'pending', 'under_review', 'sold', 'draft'].map((statusKey) => (
                <button
                  key={statusKey}
                  onClick={() => setFilter(statusKey)}
                  className={`px-4 py-2 rounded-lg capitalize ${
                    filter === statusKey
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {statusKey.replace('_', ' ')}
                </button>
              ))}
            </div>

            <button
              onClick={() => navigate('/dashboard/seller/add-property')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              + List Property
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="h-48 bg-gray-200 relative">
                  <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                  <span
                    className={`absolute top-2 right-2 px-2 py-1 text-xs rounded-full ${
                      statusStyles[property.status] || 'bg-blue-500 text-white'
                    }`}
                  >
                    {property.status.replace('_', ' ').toUpperCase()}
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
                    <button
                      onClick={() => navigate(`/dashboard/seller/properties/${property.id}`)}
                      className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200"
                    >
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
