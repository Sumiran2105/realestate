// Shared property data for both admin and agent
const STORAGE_KEY = 'property_listings_v1';

// Default property listings
const defaultProperties = [
  {
    id: 1,
    agentId: 2, // Mike Agent's ID
    agentName: 'Mike Agent',
    title: '3BHK Luxury Apartment',
    location: 'Gachibowli, Hyderabad',
    price: '₹1.2 Cr',
    status: 'verified',
    verificationStatus: 'verified',
    views: 456,
    inquiries: 12,
    listedDate: '2024-01-10',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop',
    bedrooms: 3,
    bathrooms: 3,
    area: '1850 sq.ft',
    description: 'Luxurious 3BHK apartment with modern amenities and great view',
    type: 'Apartment',
    furnished: 'Fully Furnished',
    parking: '2 Covered'
  },
  {
    id: 2,
    agentId: 2,
    agentName: 'Mike Agent',
    title: '2BHK Affordable Flat',
    location: 'Kukatpally, Hyderabad',
    price: '₹65 L',
    status: 'verified',
    verificationStatus: 'verified',
    views: 234,
    inquiries: 8,
    listedDate: '2024-01-12',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop',
    bedrooms: 2,
    bathrooms: 2,
    area: '1250 sq.ft',
    description: 'Affordable 2BHK flat in prime location',
    type: 'Apartment',
    furnished: 'Semi Furnished',
    parking: '1 Covered'
  },
  {
    id: 3,
    agentId: 2,
    agentName: 'Mike Agent',
    title: 'Commercial Office Space',
    location: 'Hitech City, Hyderabad',
    price: '₹2.5 Cr',
    status: 'pending',
    verificationStatus: 'pending',
    views: 89,
    inquiries: 3,
    listedDate: '2024-01-15',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop',
    bedrooms: 0,
    bathrooms: 2,
    area: '2200 sq.ft',
    description: 'Prime commercial space in Hitech City',
    type: 'Commercial',
    furnished: 'Shell',
    parking: '4 Open'
  },
  {
    id: 4,
    agentId: 2,
    agentName: 'Mike Agent',
    title: 'Independent Villa',
    location: 'Banjara Hills, Hyderabad',
    price: '₹3.8 Cr',
    status: 'sold',
    verificationStatus: 'verified',
    views: 789,
    inquiries: 25,
    listedDate: '2023-12-20',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop',
    bedrooms: 4,
    bathrooms: 4,
    area: '3200 sq.ft',
    description: 'Beautiful independent villa with garden',
    type: 'Villa',
    furnished: 'Fully Furnished',
    parking: '2 Covered + 2 Open'
  },
  {
    id: 5,
    agentId: 2,
    agentName: 'Mike Agent',
    title: '4BHK Penthouse',
    location: 'Jubilee Hills, Hyderabad',
    price: '₹4.5 Cr',
    status: 'verified',
    verificationStatus: 'verified',
    views: 567,
    inquiries: 15,
    listedDate: '2024-01-18',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop',
    bedrooms: 4,
    bathrooms: 5,
    area: '3500 sq.ft',
    description: 'Luxury penthouse with terrace and city view',
    type: 'Apartment',
    furnished: 'Fully Furnished',
    parking: '2 Covered'
  },
  {
    id: 6,
    agentId: 2,
    agentName: 'Mike Agent',
    title: 'Plot for Construction',
    location: 'Miyapur, Hyderabad',
    price: '₹85 L',
    status: 'draft',
    verificationStatus: 'pending',
    views: 45,
    inquiries: 1,
    listedDate: '2024-01-16',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop',
    bedrooms: 0,
    bathrooms: 0,
    area: '600 sq.yards',
    description: 'Prime residential plot ready for construction',
    type: 'Plot',
    furnished: 'N/A',
    parking: 'Open Space'
  }
];

// Read from localStorage
const readStore = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultProperties;
  } catch {
    return defaultProperties;
  }
};

// Write to localStorage
const writeStore = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Get all properties (for admin)
export const getAllProperties = () => {
  return readStore();
};

// Get properties by agent ID
export const getAgentProperties = (agentId) => {
  const allProperties = readStore();
  return allProperties.filter(p => p.agentId === agentId);
};

// Get single property by ID
export const getPropertyById = (propertyId) => {
  const allProperties = readStore();
  return allProperties.find(p => p.id === propertyId);
};

// Add new property
export const addProperty = (propertyData) => {
  const allProperties = readStore();
  const newProperty = {
    ...propertyData,
    id: Math.max(...allProperties.map(p => p.id), 0) + 1,
    views: 0,
    inquiries: 0,
    listedDate: new Date().toISOString().split('T')[0]
  };
  const updated = [...allProperties, newProperty];
  writeStore(updated);
  return newProperty;
};

// Update property
export const updateProperty = (propertyId, updates) => {
  const allProperties = readStore();
  const updated = allProperties.map(p => 
    p.id === propertyId ? { ...p, ...updates } : p
  );
  writeStore(updated);
  return updated;
};

// Delete property
export const deleteProperty = (propertyId) => {
  const allProperties = readStore();
  const updated = allProperties.filter(p => p.id !== propertyId);
  writeStore(updated);
  return updated;
};

// Get statistics for agent
export const getAgentStats = (agentId) => {
  const properties = getAgentProperties(agentId);
  return {
    total: properties.length,
    active: properties.filter(p => p.status === 'verified' || p.status === 'active').length,
    pending: properties.filter(p => p.status === 'pending').length,
    sold: properties.filter(p => p.status === 'sold').length,
    draft: properties.filter(p => p.status === 'draft').length,
    totalViews: properties.reduce((sum, p) => sum + (p.views || 0), 0),
    totalInquiries: properties.reduce((sum, p) => sum + (p.inquiries || 0), 0)
  };
};

// Reset to default (for testing)
export const resetProperties = () => {
  writeStore(defaultProperties);
  return defaultProperties;
};