import React, { useState } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { FaSave, FaBell, FaShieldAlt, FaPalette, FaGlobe, FaDatabase, FaEnvelope, FaUserCog } from 'react-icons/fa';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // General Settings
    siteName: 'RealEstate Platform',
    siteUrl: 'https://realestate.com',
    supportEmail: 'support@realestate.com',
    contactPhone: '+91 9876543210',
    
    // Email Settings
    smtpServer: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUsername: 'noreply@realestate.com',
    smtpPassword: '********',
    
    // Security Settings
    twoFactorAuth: true,
    sessionTimeout: '30',
    maxLoginAttempts: '5',
    passwordExpiry: '90',
    
    // KYC Settings
    requireAadhaar: true,
    requirePAN: true,
    requireSelfie: true,
    autoApproveKYC: false,
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: false,
    
    // API Settings
    apiKey: 'sk_live_********',
    apiSecret: '********',
    webhookUrl: 'https://api.realestate.com/webhook',
    
    // Appearance
    themeColor: '#2563eb',
    logo: null,
    favicon: null
  });

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSave = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1500);
  };

  const tabs = [
    { id: 'general', name: 'General', icon: <FaGlobe /> },
    { id: 'email', name: 'Email', icon: <FaEnvelope /> },
    { id: 'security', name: 'Security', icon: <FaShieldAlt /> },
    { id: 'kyc', name: 'KYC Settings', icon: <FaUserCog /> },
    { id: 'notifications', name: 'Notifications', icon: <FaBell /> },
    { id: 'api', name: 'API', icon: <FaDatabase /> },
    { id: 'appearance', name: 'Appearance', icon: <FaPalette /> }
  ];

  return (
    <DashboardLayout title="Admin Settings">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 bg-white rounded-xl shadow-sm p-4">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="mr-3">{tab.icon}</span>
                <span className="text-sm font-medium">{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 capitalize">
              {activeTab} Settings
            </h2>
            <button
              onClick={handleSave}
              disabled={loading}
              className={`flex items-center px-4 py-2 rounded-lg text-white ${
                loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              <FaSave className="mr-2" />
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

          {saved && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
              Settings saved successfully!
            </div>
          )}

          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Name
                  </label>
                  <input
                    type="text"
                    name="siteName"
                    value={settings.siteName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site URL
                  </label>
                  <input
                    type="url"
                    name="siteUrl"
                    value={settings.siteUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Support Email
                  </label>
                  <input
                    type="email"
                    name="supportEmail"
                    value={settings.supportEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={settings.contactPhone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Email Settings */}
          {activeTab === 'email' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SMTP Server
                  </label>
                  <input
                    type="text"
                    name="smtpServer"
                    value={settings.smtpServer}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SMTP Port
                  </label>
                  <input
                    type="text"
                    name="smtpPort"
                    value={settings.smtpPort}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SMTP Username
                  </label>
                  <input
                    type="text"
                    name="smtpUsername"
                    value={settings.smtpUsername}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SMTP Password
                  </label>
                  <input
                    type="password"
                    name="smtpPassword"
                    value={settings.smtpPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="twoFactorAuth"
                      checked={settings.twoFactorAuth}
                      onChange={handleChange}
                      className="rounded text-blue-600"
                    />
                    <span className="text-sm text-gray-700">Enable Two-Factor Authentication</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    name="sessionTimeout"
                    value={settings.sessionTimeout}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Login Attempts
                  </label>
                  <input
                    type="number"
                    name="maxLoginAttempts"
                    value={settings.maxLoginAttempts}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password Expiry (days)
                  </label>
                  <input
                    type="number"
                    name="passwordExpiry"
                    value={settings.passwordExpiry}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* KYC Settings */}
          {activeTab === 'kyc' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="requireAadhaar"
                      checked={settings.requireAadhaar}
                      onChange={handleChange}
                      className="rounded text-blue-600"
                    />
                    <span className="text-sm text-gray-700">Require Aadhaar Card</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="requirePAN"
                      checked={settings.requirePAN}
                      onChange={handleChange}
                      className="rounded text-blue-600"
                    />
                    <span className="text-sm text-gray-700">Require PAN Card</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="requireSelfie"
                      checked={settings.requireSelfie}
                      onChange={handleChange}
                      className="rounded text-blue-600"
                    />
                    <span className="text-sm text-gray-700">Require Selfie Verification</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="autoApproveKYC"
                      checked={settings.autoApproveKYC}
                      onChange={handleChange}
                      className="rounded text-blue-600"
                    />
                    <span className="text-sm text-gray-700">Auto-approve KYC (for testing)</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={settings.emailNotifications}
                      onChange={handleChange}
                      className="rounded text-blue-600"
                    />
                    <span className="text-sm text-gray-700">Email Notifications</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="smsNotifications"
                      checked={settings.smsNotifications}
                      onChange={handleChange}
                      className="rounded text-blue-600"
                    />
                    <span className="text-sm text-gray-700">SMS Notifications</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="pushNotifications"
                      checked={settings.pushNotifications}
                      onChange={handleChange}
                      className="rounded text-blue-600"
                    />
                    <span className="text-sm text-gray-700">Push Notifications</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* API Settings */}
          {activeTab === 'api' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API Key
                  </label>
                  <input
                    type="text"
                    name="apiKey"
                    value={settings.apiKey}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API Secret
                  </label>
                  <input
                    type="password"
                    name="apiSecret"
                    value={settings.apiSecret}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Webhook URL
                  </label>
                  <input
                    type="url"
                    name="webhookUrl"
                    value={settings.webhookUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Theme Color
                  </label>
                  <input
                    type="color"
                    name="themeColor"
                    value={settings.themeColor}
                    onChange={handleChange}
                    className="w-full h-10 p-1 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Favicon
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;