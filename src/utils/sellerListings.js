const STORAGE_KEY = 'seller_listings_v1';

const defaultListings = [
  {
    id: 1,
    sellerId: 3,
    sellerName: 'Sarah Seller',
    title: '3BHK Luxury Apartment',
    location: 'Gachibowli, Hyderabad',
    price: '1.2 Cr',
    status: 'verified',
    views: 456,
    inquiries: 12,
    listedDate: '2024-01-10',
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: 2,
    sellerId: 3,
    sellerName: 'Sarah Seller',
    title: '2BHK Affordable Flat',
    location: 'Kukatpally, Hyderabad',
    price: '65 L',
    status: 'verified',
    views: 234,
    inquiries: 8,
    listedDate: '2024-01-12',
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: 3,
    sellerId: 3,
    sellerName: 'Sarah Seller',
    title: 'Commercial Office Space',
    location: 'Hitech City, Hyderabad',
    price: '2.5 Cr',
    status: 'pending',
    views: 89,
    inquiries: 3,
    listedDate: '2024-01-15',
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: 4,
    sellerId: 3,
    sellerName: 'Sarah Seller',
    title: 'Independent Villa',
    location: 'Banjara Hills, Hyderabad',
    price: '3.8 Cr',
    status: 'sold',
    views: 789,
    inquiries: 25,
    listedDate: '2023-12-20',
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: 5,
    sellerId: 3,
    sellerName: 'Sarah Seller',
    title: 'Plot for Construction',
    location: 'Miyapur, Hyderabad',
    price: '85 L',
    status: 'draft',
    views: 45,
    inquiries: 1,
    listedDate: '2024-01-16',
    image: 'https://via.placeholder.com/300x200',
  },
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

export const getSellerListings = (sellerId) => {
  const store = readStore();
  const key = sellerKey(sellerId);

  if (!store[key]) {
    store[key] = defaultListings;
    writeStore(store);
  }

  return store[key];
};

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
