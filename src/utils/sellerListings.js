const STORAGE_KEY = 'seller_listings_v1';

// Define default listings with proper image URLs
const defaultListings = [
  {
    id: 1,
    sellerId: 3,
    sellerName: 'Sarah Seller',
    title: '3BHK Luxury Apartment',
    location: 'Gachibowli, Hyderabad',
    price: '₹1.2 Cr',
    status: 'verified',
    views: 456,
    inquiries: 12,
    listedDate: '2024-01-10',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop',
    bedrooms: 3,
    bathrooms: 3,
    area: '1850 sq.ft',
    description: 'Luxurious 3BHK apartment with modern amenities and great view'
  },
  {
    id: 2,
    sellerId: 3,
    sellerName: 'Sarah Seller',
    title: '2BHK Affordable Flat',
    location: 'Kukatpally, Hyderabad',
    price: '₹65 L',
    status: 'verified',
    views: 234,
    inquiries: 8,
    listedDate: '2024-01-12',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop',
    bedrooms: 2,
    bathrooms: 2,
    area: '1250 sq.ft',
    description: 'Affordable 2BHK flat in prime location'
  },
  {
    id: 3,
    sellerId: 3,
    sellerName: 'Sarah Seller',
    title: 'Commercial Office Space',
    location: 'Hitech City, Hyderabad',
    price: '₹2.5 Cr',
    status: 'pending',
    views: 89,
    inquiries: 3,
    listedDate: '2024-01-15',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop',
    bedrooms: 0,
    bathrooms: 2,
    area: '2200 sq.ft',
    description: 'Prime commercial space in Hitech City'
  },
  {
    id: 4,
    sellerId: 3,
    sellerName: 'Sarah Seller',
    title: 'Independent Villa',
    location: 'Banjara Hills, Hyderabad',
    price: '₹3.8 Cr',
    status: 'sold',
    views: 789,
    inquiries: 25,
    listedDate: '2023-12-20',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop',
    bedrooms: 4,
    bathrooms: 4,
    area: '3200 sq.ft',
    description: 'Beautiful independent villa with garden'
  },
  {
    id: 5,
    sellerId: 3,
    sellerName: 'Sarah Seller',
    title: 'Plot for Construction',
    location: 'Miyapur, Hyderabad',
    price: '₹85 L',
    status: 'draft',
    views: 45,
    inquiries: 1,
    listedDate: '2024-01-16',
    image: 'https://www.jkcement.com/wp-content/uploads/2025/10/131-1-1-1024x536.jpg',
    bedrooms: 0,
    bathrooms: 0,
    area: '600 sq.yards',
    description: 'Prime residential plot ready for construction'
  }
];

const sellerKey = (sellerId) => String(sellerId || 'default_seller');

const readStore = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const writeStore = (store) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
};

// Force reset function - call this to clear corrupted data
export const resetSellerListings = (sellerId) => {
  const store = readStore();
  const key = sellerKey(sellerId);
  store[key] = defaultListings;
  writeStore(store);
  return defaultListings;
};

export const getSellerListings = (sellerId) => {
  const store = readStore();
  const key = sellerKey(sellerId);

  // Check if data exists and has proper images
  if (!store[key]) {
    console.log('No data found, setting default listings');
    store[key] = defaultListings;
    writeStore(store);
  } else {
    // Check if any property is missing images
    const hasMissingImages = store[key].some(p => !p.image);
    if (hasMissingImages) {
      console.log('Found properties with missing images, resetting data');
      store[key] = defaultListings;
      writeStore(store);
    }
  }

  return store[key];
};

// ... rest of your functions remain the same

export const saveSellerListings = (sellerId, listings) => {
  const store = readStore();
  store[sellerKey(sellerId)] = listings;
  writeStore(store);
};

export const appendSellerListing = (sellerId, listing) => {
  const existing = getSellerListings(sellerId);
  const updated = [listing, ...existing];
  saveSellerListings(sellerId, updated);
  return updated;
};

export const getSellerListingById = (sellerId, listingId) => {
  const existing = getSellerListings(sellerId);
  return existing.find((item) => String(item.id) === String(listingId)) || null;
};

export const updateSellerListing = (sellerId, listingId, updates) => {
  const existing = getSellerListings(sellerId);
  const updated = existing.map((item) =>
    item.id === listingId ? { ...item, ...updates } : item
  );
  saveSellerListings(sellerId, updated);
  return updated;
};

export const deleteSellerListing = (sellerId, listingId) => {
  const existing = getSellerListings(sellerId);
  const updated = existing.filter((item) => item.id !== listingId);
  saveSellerListings(sellerId, updated);
  return updated;
};

export const getAllSellerListings = () => {
  const store = readStore();
  const grouped = Object.values(store).filter(Array.isArray);
  if (grouped.length === 0) return defaultListings;
  return grouped.flat();
};

export const getSellerListingByIdFromAll = (listingId) => {
  const all = getAllSellerListings();
  return all.find((item) => String(item.id) === String(listingId)) || null;
};