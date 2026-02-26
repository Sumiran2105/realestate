// Mock data for admin panel

const mockUsers = [
  {
    id: 1,
    name: 'John Buyer',
    email: 'buyer@example.com',
    phone: '9876543210',
    role: 'buyer',
    kycStatus: 'verified',
    kycData: {
      aadhaarNumber: '123456789012',
      panNumber: 'ABCDE1234F'
    },
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    name: 'Mike Agent',
    email: 'agent@example.com',
    phone: '9876543211',
    role: 'agent',
    kycStatus: 'pending',
    kycData: {
      aadhaarNumber: '123456789013',
      panNumber: 'FGHIJ5678K'
    },
    createdAt: '2024-02-20'
  },
  {
    id: 3,
    name: 'Sarah Seller',
    email: 'seller@example.com',
    phone: '9876543212',
    role: 'seller',
    kycStatus: 'pending',
    kycData: {
      aadhaarNumber: '123456789014',
      panNumber: 'KLMNO9012P'
    },
    createdAt: '2024-03-10'
  },
  {
    id: 999,
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '9876543000',
    role: 'admin',
    kycStatus: 'verified',
    createdAt: '2024-01-01'
  }
];

const mockProperties = [
  {
    id: 1,
    title: 'Luxury 3BHK Villa',
    location: 'Banjara Hills, Hyderabad',
    price: '₹2.5 Cr',
    area: '2500 sq.ft',
    bedrooms: 3,
    image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/696926061.jpg?k=1e287bd2a31767c083d799501db5f265b4fc4f11cf36b7cbb29a35fba6fb14bb&o=',
    sellerName: 'Sarah Seller',
    sellerId: 3,
    verificationStatus: 'verified',
    listedDate: '2024-03-15'
  },
  {
    id: 2,
    title: 'Modern 2BHK Apartment',
    location: 'Gachibowli, Hyderabad',
    price: '₹1.2 Cr',
    area: '1500 sq.ft',
    bedrooms: 2,
    image: 'https://northinteriorspaces.com/wp-content/uploads/2025/07/01-Devorat-4-scaled.jpg.webp',
    sellerName: 'Sarah Seller',
    sellerId: 3,
    verificationStatus: 'pending',
    listedDate: '2024-03-20'
  },
  {
    id: 3,
    title: '4BHK Independent House',
    location: 'Jubilee Hills, Hyderabad',
    price: '₹3.8 Cr',
    area: '3200 sq.ft',
    bedrooms: 4,
    image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/514934803.jpg?k=c63b04e12e176bc719f25465b41dcb1fc41c57c7cd5a4645b9ec837541790231&o=',
    sellerName: 'Mike Agent',
    sellerId: 2,
    verificationStatus: 'pending',
    listedDate: '2024-03-18'
  }
];

export const getAllUsers = () => mockUsers;

export const getAllProperties = () => mockProperties;

export const getPendingKYC = () => mockUsers.filter(user => user.kycStatus === 'pending');

export const updateUserKYC = (userId, status) => {
  const user = mockUsers.find(u => u.id === userId);
  if (user) {
    user.kycStatus = status;
  }
};

export const updatePropertyStatus = (propertyId, status) => {
  const property = mockProperties.find(p => p.id === propertyId);
  if (property) {
    property.verificationStatus = status;
  }
};

// Add these functions to your existing adminData.js

export const updateUserStatus = (userId, newStatus) => {
  const user = mockUsers.find(u => u.id === userId);
  if (user) {
    user.kycStatus = newStatus;
  }
};

export const deleteUser = (userId) => {
  const index = mockUsers.findIndex(u => u.id === userId);
  if (index !== -1) {
    mockUsers.splice(index, 1);
  }
};

export const updateUserRole = (userId, newRole) => {
  const user = mockUsers.find(u => u.id === userId);
  if (user) {
    user.role = newRole;
  }
};