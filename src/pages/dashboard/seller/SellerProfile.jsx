import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaBuilding,
  FaIdCard,
  FaEdit,
  FaCamera,
  FaSave,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaStar,
  FaCalendarAlt,
  FaFileAlt,
  FaDownload,
  FaShieldAlt,
  FaHome,
  FaEye,
  FaComments
} from 'react-icons/fa';

const SellerProfile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    gstNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    panNumber: '',
    aadhaarNumber: '',
    experience: '',
    specialization: [],
    about: '',
    website: '',
    socialMedia: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: ''
    }
  });

  const [stats, setStats] = useState({
    totalProperties: 24,
    activeListings: 18,
    soldProperties: 6,
    totalViews: 3456,
    totalInquiries: 89,
    avgResponseTime: '2.5 hours',
    rating: 4.8,
    reviews: 42,
    memberSince: 'Jan 2024'
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || 'Sarah Seller',
        email: user.email || 'sarah.seller@example.com',
        phone: user.phone || '+91 9876543210',
        company: 'Sarah Properties',
        gstNumber: '22AAAAA0000A1Z5',
        address: '123, Jubilee Hills',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500033',
        panNumber: 'ABCDE1234F',
        aadhaarNumber: 'XXXX-XXXX-1234',
        experience: '5 years',
        specialization: ['Residential', 'Luxury Homes', 'Apartments'],
        about: 'Experienced real estate seller with a passion for helping people find their dream homes. Specializing in luxury properties and residential spaces in prime locations.',
        website: 'www.sarahproperties.com',
        socialMedia: {
          facebook: 'sarah.properties',
          twitter: '@sarah_properties',
          linkedin: 'sarah-seller',
          instagram: 'sarah.properties'
        }
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfileData({
        ...profileData,
        [parent]: {
          ...profileData[parent],
          [child]: value
        }
      });
    } else {
      setProfileData({
        ...profileData,
        [name]: value
      });
    }
  };

  const handleSave = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSaveSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  const handleImageUpload = (e) => {
    // Handle profile image upload
    console.log('Uploading image:', e.target.files[0]);
  };

  const StatCard = ({ icon, label, value, color }) => (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center text-xl`}>
          {icon}
        </div>
        <div>
          <p className="text-xs text-gray-500">{label}</p>
          <p className="text-lg font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout title="Seller Profile">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your personal and business information</p>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2"
            >
              <FaEdit />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center gap-2"
              >
                {loading ? 'Saving...' : <><FaSave /> Save Changes</>}
              </button>
            </div>
          )}
        </div>

        {/* Success Message */}
        {saveSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <FaCheckCircle className="text-green-600" />
            <p className="text-sm text-green-700">Profile updated successfully!</p>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Summary */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="h-24 bg-gradient-to-r from-blue-600 to-purple-600"></div>
              <div className="px-6 pb-6 -mt-12">
                <div className="relative">
                  <div className="w-24 h-24 rounded-xl border-4 border-white overflow-hidden bg-white shadow-lg mx-auto">
                    <img
                      src={`https://ui-avatars.com/api/?name=${profileData.name}&size=96&background=2563eb&color=fff`}
                      alt={profileData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-1/2 transform translate-x-8 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition shadow-lg">
                      <FaCamera size={14} />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>

                <div className="text-center mt-4">
                  <h2 className="text-xl font-bold text-gray-900">{profileData.name}</h2>
                  <p className="text-sm text-gray-500">{profileData.company}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < Math.floor(stats.rating) ? 'text-yellow-400' : 'text-gray-300'} />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">{stats.rating} ({stats.reviews} reviews)</span>
                  </div>

                  {/* Member since */}
                  <div className="flex items-center justify-center gap-1 mt-2 text-xs text-gray-500">
                    <FaCalendarAlt size={12} />
                    <span>Member since {stats.memberSince}</span>
                  </div>
                </div>

                {/* KYC Status */}
                <div className="mt-4 p-3 bg-green-50 rounded-lg flex items-center gap-2">
                  <FaShieldAlt className="text-green-600" />
                  <span className="text-sm text-green-700">KYC Verified</span>
                  <FaCheckCircle className="text-green-600 ml-auto" />
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <StatCard icon={<FaHome />} label="Total Properties" value={stats.totalProperties} color="bg-blue-100 text-blue-600" />
                <StatCard icon={<FaCheckCircle />} label="Active Listings" value={stats.activeListings} color="bg-green-100 text-green-600" />
                <StatCard icon={<FaEye />} label="Total Views" value={stats.totalViews} color="bg-purple-100 text-purple-600" />
                <StatCard icon={<FaComments />} label="Inquiries" value={stats.totalInquiries} color="bg-yellow-100 text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Right Column - Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaUser className="text-blue-600" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">Experience</label>
                  {isEditing ? (
                    <select
                      name="experience"
                      value={profileData.experience}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option>1-2 years</option>
                      <option>3-5 years</option>
                      <option>5-10 years</option>
                      <option>10+ years</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{profileData.experience}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Business Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaBuilding className="text-green-600" />
                Business Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Company Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="company"
                      value={profileData.company}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.company}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">GST Number</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="gstNumber"
                      value={profileData.gstNumber}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.gstNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">PAN Number</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="panNumber"
                      value={profileData.panNumber}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.panNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">Aadhaar Number</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="aadhaarNumber"
                      value={profileData.aadhaarNumber}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.aadhaarNumber}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-600" />
                Address
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-500 mb-1">Street Address</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={profileData.address}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.address}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">City</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="city"
                      value={profileData.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">State</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="state"
                      value={profileData.state}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.state}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">Pincode</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="pincode"
                      value={profileData.pincode}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.pincode}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">Website</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="website"
                      value={profileData.website}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.website}</p>
                  )}
                </div>
              </div>
            </div>

            {/* About */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">About</h3>
              {isEditing ? (
                <textarea
                  name="about"
                  value={profileData.about}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-600">{profileData.about}</p>
              )}
            </div>

            {/* Specializations */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Specializations</h3>
              <div className="flex flex-wrap gap-2">
                {profileData.specialization.map((spec, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SellerProfile;