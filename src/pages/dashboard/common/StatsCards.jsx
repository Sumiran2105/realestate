import React from 'react';

const StatsCards = ({ stats }) => {
  const cardConfig = [
    { key: 'totalLeads', label: 'Total Leads', icon: '👥', color: 'blue' },
    { key: 'activeListings', label: 'Active Listings', icon: '🏠', color: 'green' },
    { key: 'pendingVerifications', label: 'Pending Verifications', icon: '⏳', color: 'yellow' },
    { key: 'completedDeals', label: 'Completed Deals', icon: '✓', color: 'purple' },
    { key: 'totalCommission', label: 'Total Commission', icon: '💰', color: 'indigo', format: 'currency' },
    { key: 'avgRating', label: 'Average Rating', icon: '⭐', color: 'orange', format: 'rating' }
  ];

  const formatValue = (value, format) => {
    if (format === 'currency') {
      return `₹${(value / 100000).toFixed(1)}L`;
    }
    if (format === 'rating') {
      return value.toFixed(1);
    }
    return value;
  };

  return (
    <>
      {cardConfig.map((card) => {
        if (stats[card.key] === undefined) return null;
        
        return (
          <div key={card.key} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className={`p-3 bg-${card.color}-100 rounded-lg`}>
                <span className="text-2xl">{card.icon}</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">{card.label}</p>
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