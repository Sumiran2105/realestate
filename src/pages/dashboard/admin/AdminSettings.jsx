import React, { useState } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { 
  FaSave, 
  FaBell, 
  FaShieldAlt, 
  FaPalette, 
  FaGlobe, 
  FaDatabase, 
  FaEnvelope, 
  FaUserCog,
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
  FaEyeSlash,
  FaCopy,
  FaRegQuestionCircle,
  FaCog,
  FaServer,
  FaLock,
  FaMobile,
  FaPaintBrush,
  FaKey,
  FaPlug
} from 'react-icons/fa';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState({});
  const [copied, setCopied] = useState(null);
  const [settings, setSettings] = useState({
    // General Settings
    siteName: 'RealEstate Platform',
    siteUrl: 'https://realestate.com',
    supportEmail: 'support@realestate.com',
    contactPhone: '+91 9876543210',
    address: '123 Business Park, Hyderabad, TS 500001',
    timezone: 'Asia/Kolkata',
    language: 'en',
    
    // Email Settings
    smtpServer: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUsername: 'noreply@realestate.com',
    smtpPassword: 'securepassword123',
    smtpEncryption: 'tls',
    emailFrom: 'noreply@realestate.com',
    emailFromName: 'RealEstate Platform',
    
    // Security Settings
    twoFactorAuth: true,
    sessionTimeout: '30',
    maxLoginAttempts: '5',
    passwordExpiry: '90',
    passwordMinLength: '8',
    requireSpecialChar: true,
    requireNumber: true,
    ipWhitelisting: false,
    
    // KYC Settings
    requireAadhaar: true,
    requirePAN: true,
    requireSelfie: true,
    autoApproveKYC: false,
    kycExpiryDays: '365',
    maxKycAttempts: '3',
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: false,
    notifyNewUser: true,
    notifyNewProperty: true,
    notifyKYC: true,
    notifyDeals: true,
    
    // API Settings
    apiKey: 'sk_live_7x8f9g2h3j4k5l6m7n8p9q',
    apiSecret: 'sk_secret_9h8g7f6d5s4a3s2d1f0g',
    webhookUrl: 'https://api.realestate.com/webhook',
    apiRateLimit: '1000',
    apiVersion: 'v2',
    
    // Appearance
    themeColor: '#2563eb',
    darkMode: false,
    logo: null,
    favicon: null,
    accentColor: '#8b5cf6',
    fontFamily: 'Inter',
    
    // Integration Settings
    googleMapsApi: '',
    paymentGateway: 'razorpay',
    smsProvider: 'twilio',
    emailProvider: 'sendgrid'
  });

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const [testResult, setTestResult] = useState(null);

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

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleTestConnection = () => {
    setTestingConnection(true);
    setTimeout(() => {
      setTestingConnection(false);
      setTestResult('success');
      setTimeout(() => setTestResult(null), 3000);
    }, 2000);
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field]
    });
  };

  const tabs = [
    { id: 'general', name: 'General', icon: <FaGlobe />, color: 'blue' },
    { id: 'email', name: 'Email', icon: <FaEnvelope />, color: 'green' },
    { id: 'security', name: 'Security', icon: <FaShieldAlt />, color: 'purple' },
    { id: 'kyc', name: 'KYC Settings', icon: <FaUserCog />, color: 'amber' },
    { id: 'notifications', name: 'Notifications', icon: <FaBell />, color: 'red' },
    { id: 'api', name: 'API', icon: <FaDatabase />, color: 'indigo' },
    { id: 'appearance', name: 'Appearance', icon: <FaPaintBrush />, color: 'pink' },
    { id: 'integrations', name: 'Integrations', icon: <FaPlug />, color: 'teal' }
  ];

  const SectionHeader = ({ title, description, icon }) => (
    <div className="flex items-start gap-3 mb-6">
      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-lg shadow-lg">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );

  const InputField = ({ label, name, type = 'text', value, onChange, placeholder, required, helpText, icon }) => (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white`}
        />
      </div>
      {helpText && <p className="text-xs text-gray-500">{helpText}</p>}
    </div>
  );

  const ToggleSwitch = ({ label, name, checked, onChange, description }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-700">{label}</p>
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
      </div>
      <button
        type="button"
        onClick={() => onChange({ target: { name, value: !checked, type: 'checkbox', checked: !checked } })}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          checked ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  const ApiKeyField = ({ label, name, value, onChange }) => (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type={showPassword[name] ? 'text' : 'password'}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 font-mono text-sm"
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility(name)}
            className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword[name] ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
          </button>
        </div>
        <button
          onClick={() => handleCopy(value, name)}
          className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2"
        >
          <FaCopy />
          {copied === name ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );

  return (
    <DashboardLayout title="Settings">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Platform Settings</h1>
            <p className="text-sm text-gray-500 mt-1">Configure and manage your platform preferences</p>
          </div>
          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            <button
              onClick={handleTestConnection}
              disabled={testingConnection}
              className="px-4 py-2 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all shadow-md border border-gray-200 flex items-center gap-2 text-sm w-full sm:w-auto justify-center"
            >
              <FaServer />
              {testingConnection ? 'Testing...' : 'Test Connection'}
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className={`px-6 py-2 rounded-xl text-white flex items-center justify-center gap-2 transition-all shadow-lg w-full sm:w-auto ${
                loading 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
              }`}
            >
              <FaSave />
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Test Connection Result */}
        {testResult && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 animate-slideDown">
            <FaCheckCircle className="text-green-600 text-xl" />
            <p className="text-sm text-green-700">Connection test successful! All services are reachable.</p>
          </div>
        )}

        {/* Saved Notification */}
        {saved && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 animate-slideDown">
            <FaCheckCircle className="text-green-600 text-xl" />
            <p className="text-sm text-green-700">Settings saved successfully!</p>
          </div>
        )}

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Modern Tab Navigation */}
          <div className="w-full lg:w-72 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-blue-600 to-blue-700">
              <h2 className="text-white font-semibold flex items-center gap-2">
                <FaCog />
                Settings Menu
              </h2>
              <p className="text-xs text-blue-100 mt-1">Select a category to configure</p>
            </div>
            <nav className="p-3 space-y-1">
              {tabs.map((tab) => {
                const colors = {
                  blue: 'text-blue-600 bg-blue-50',
                  green: 'text-green-600 bg-green-50',
                  purple: 'text-purple-600 bg-purple-50',
                  amber: 'text-amber-600 bg-amber-50',
                  red: 'text-red-600 bg-red-50',
                  indigo: 'text-indigo-600 bg-indigo-50',
                  pink: 'text-pink-600 bg-pink-50',
                  teal: 'text-teal-600 bg-teal-50'
                };
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
                      activeTab === tab.id
                        ? colors[tab.color] + ' shadow-md'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="mr-3 text-lg">{tab.icon}</span>
                    <span className="text-sm font-medium">{tab.name}</span>
                    {activeTab === tab.id && (
                      <span className="ml-auto w-2 h-2 bg-current rounded-full"></span>
                    )}
                  </button>
                );
              })}
            </nav>
            
            {/* System Info */}
            <div className="p-4 border-t border-gray-100">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-2">System Status</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Version</span>
                    <span className="font-medium text-gray-900">v2.5.1</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Environment</span>
                    <span className="font-medium text-green-600">Production</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Last Backup</span>
                    <span className="font-medium text-gray-900">2 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area - Modern Cards */}
          <div className="flex-1 space-y-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <SectionHeader 
                    title="General Settings"
                    description="Configure your platform's basic information"
                    icon={<FaGlobe />}
                  />
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField 
                      label="Site Name" 
                      name="siteName" 
                      value={settings.siteName} 
                      onChange={handleChange}
                      placeholder="Enter site name"
                      icon={<FaGlobe className="text-gray-400" />}
                      required
                    />
                    <InputField 
                      label="Site URL" 
                      name="siteUrl" 
                      type="url"
                      value={settings.siteUrl} 
                      onChange={handleChange}
                      placeholder="https://example.com"
                      icon={<FaServer className="text-gray-400" />}
                      required
                    />
                    <InputField 
                      label="Support Email" 
                      name="supportEmail" 
                      type="email"
                      value={settings.supportEmail} 
                      onChange={handleChange}
                      placeholder="support@example.com"
                      icon={<FaEnvelope className="text-gray-400" />}
                      required
                    />
                    <InputField 
                      label="Contact Phone" 
                      name="contactPhone" 
                      value={settings.contactPhone} 
                      onChange={handleChange}
                      placeholder="+91 9876543210"
                      icon={<FaMobile className="text-gray-400" />}
                      required
                    />
                    <InputField 
                      label="Address" 
                      name="address" 
                      value={settings.address} 
                      onChange={handleChange}
                      placeholder="Business address"
                      className="md:col-span-2"
                    />
                    <InputField 
                      label="Timezone" 
                      name="timezone" 
                      value={settings.timezone} 
                      onChange={handleChange}
                      placeholder="Select timezone"
                    />
                    <InputField 
                      label="Language" 
                      name="language" 
                      value={settings.language} 
                      onChange={handleChange}
                      placeholder="Select language"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Email Settings */}
            {activeTab === 'email' && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <SectionHeader 
                    title="Email Configuration"
                    description="Configure your email server settings"
                    icon={<FaEnvelope />}
                  />
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField 
                      label="SMTP Server" 
                      name="smtpServer" 
                      value={settings.smtpServer} 
                      onChange={handleChange}
                      placeholder="smtp.gmail.com"
                      required
                    />
                    <InputField 
                      label="SMTP Port" 
                      name="smtpPort" 
                      value={settings.smtpPort} 
                      onChange={handleChange}
                      placeholder="587"
                      required
                    />
                    <InputField 
                      label="SMTP Username" 
                      name="smtpUsername" 
                      value={settings.smtpUsername} 
                      onChange={handleChange}
                      placeholder="noreply@example.com"
                      required
                    />
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-gray-700">SMTP Password</label>
                      <div className="relative">
                        <input
                          type={showPassword.smtpPassword ? 'text' : 'password'}
                          name="smtpPassword"
                          value={settings.smtpPassword}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('smtpPassword')}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword.smtpPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>
                    <InputField 
                      label="From Email" 
                      name="emailFrom" 
                      value={settings.emailFrom} 
                      onChange={handleChange}
                      placeholder="noreply@example.com"
                      required
                    />
                    <InputField 
                      label="From Name" 
                      name="emailFromName" 
                      value={settings.emailFromName} 
                      onChange={handleChange}
                      placeholder="RealEstate Platform"
                      required
                    />
                  </div>
                  
                  <div className="mt-6 flex gap-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm flex items-center gap-2">
                      <FaEnvelope />
                      Send Test Email
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <SectionHeader 
                    title="Security Settings"
                    description="Configure platform security and access controls"
                    icon={<FaShieldAlt />}
                  />
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <ToggleSwitch 
                      label="Two-Factor Authentication"
                      description="Require 2FA for admin accounts"
                      name="twoFactorAuth"
                      checked={settings.twoFactorAuth}
                      onChange={handleChange}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                      <InputField 
                        label="Session Timeout" 
                        name="sessionTimeout" 
                        type="number"
                        value={settings.sessionTimeout} 
                        onChange={handleChange}
                        helpText="Minutes"
                      />
                      <InputField 
                        label="Max Login Attempts" 
                        name="maxLoginAttempts" 
                        type="number"
                        value={settings.maxLoginAttempts} 
                        onChange={handleChange}
                        helpText="Attempts"
                      />
                      <InputField 
                        label="Password Expiry" 
                        name="passwordExpiry" 
                        type="number"
                        value={settings.passwordExpiry} 
                        onChange={handleChange}
                        helpText="Days"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      <ToggleSwitch 
                        label="Require Special Characters"
                        description="Password must include special characters"
                        name="requireSpecialChar"
                        checked={settings.requireSpecialChar}
                        onChange={handleChange}
                      />
                      <ToggleSwitch 
                        label="Require Numbers"
                        description="Password must include numbers"
                        name="requireNumber"
                        checked={settings.requireNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* KYC Settings */}
            {activeTab === 'kyc' && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <SectionHeader 
                    title="KYC Settings"
                    description="Configure verification requirements"
                    icon={<FaUserCog />}
                  />
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <ToggleSwitch 
                      label="Require Aadhaar Card"
                      description="Users must upload Aadhaar card for verification"
                      name="requireAadhaar"
                      checked={settings.requireAadhaar}
                      onChange={handleChange}
                    />
                    <ToggleSwitch 
                      label="Require PAN Card"
                      description="Users must upload PAN card for verification"
                      name="requirePAN"
                      checked={settings.requirePAN}
                      onChange={handleChange}
                    />
                    <ToggleSwitch 
                      label="Require Selfie"
                      description="Users must upload selfie with ID card"
                      name="requireSelfie"
                      checked={settings.requireSelfie}
                      onChange={handleChange}
                    />
                    <ToggleSwitch 
                      label="Auto-approve KYC"
                      description="Automatically approve KYC for testing"
                      name="autoApproveKYC"
                      checked={settings.autoApproveKYC}
                      onChange={handleChange}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <InputField 
                        label="KYC Expiry (days)" 
                        name="kycExpiryDays" 
                        type="number"
                        value={settings.kycExpiryDays} 
                        onChange={handleChange}
                        helpText="Days before KYC expires"
                      />
                      <InputField 
                        label="Max KYC Attempts" 
                        name="maxKycAttempts" 
                        type="number"
                        value={settings.maxKycAttempts} 
                        onChange={handleChange}
                        helpText="Maximum verification attempts"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <SectionHeader 
                    title="Notification Settings"
                    description="Configure how users receive notifications"
                    icon={<FaBell />}
                  />
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ToggleSwitch 
                      label="Email Notifications"
                      description="Send notifications via email"
                      name="emailNotifications"
                      checked={settings.emailNotifications}
                      onChange={handleChange}
                    />
                    <ToggleSwitch 
                      label="SMS Notifications"
                      description="Send notifications via SMS"
                      name="smsNotifications"
                      checked={settings.smsNotifications}
                      onChange={handleChange}
                    />
                    <ToggleSwitch 
                      label="Push Notifications"
                      description="Send push notifications"
                      name="pushNotifications"
                      checked={settings.pushNotifications}
                      onChange={handleChange}
                    />
                    <ToggleSwitch 
                      label="New User Alerts"
                      description="Notify when new user registers"
                      name="notifyNewUser"
                      checked={settings.notifyNewUser}
                      onChange={handleChange}
                    />
                    <ToggleSwitch 
                      label="New Property Alerts"
                      description="Notify when new property listed"
                      name="notifyNewProperty"
                      checked={settings.notifyNewProperty}
                      onChange={handleChange}
                    />
                    <ToggleSwitch 
                      label="KYC Updates"
                      description="Notify when KYC status changes"
                      name="notifyKYC"
                      checked={settings.notifyKYC}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* API Settings */}
            {activeTab === 'api' && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <SectionHeader 
                    title="API Configuration"
                    description="Manage API keys and endpoints"
                    icon={<FaKey />}
                  />
                </div>
                <div className="p-6 space-y-6">
                  <ApiKeyField 
                    label="API Key"
                    name="apiKey"
                    value={settings.apiKey}
                    onChange={handleChange}
                  />
                  
                  <ApiKeyField 
                    label="API Secret"
                    name="apiSecret"
                    value={settings.apiSecret}
                    onChange={handleChange}
                  />

                  <InputField 
                    label="Webhook URL" 
                    name="webhookUrl" 
                    value={settings.webhookUrl} 
                    onChange={handleChange}
                    placeholder="https://api.example.com/webhook"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField 
                      label="Rate Limit" 
                      name="apiRateLimit" 
                      value={settings.apiRateLimit} 
                      onChange={handleChange}
                      helpText="Requests per minute"
                    />
                    <InputField 
                      label="API Version" 
                      name="apiVersion" 
                      value={settings.apiVersion} 
                      onChange={handleChange}
                      helpText="Current version"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === 'appearance' && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <SectionHeader 
                    title="Appearance Settings"
                    description="Customize the look and feel of your platform"
                    icon={<FaPaintBrush />}
                  />
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Theme Color</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          name="themeColor"
                          value={settings.themeColor}
                          onChange={handleChange}
                          className="w-16 h-12 rounded-lg border border-gray-200 cursor-pointer"
                        />
                        <input
                          type="text"
                          name="themeColor"
                          value={settings.themeColor}
                          onChange={handleChange}
                          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Accent Color</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          name="accentColor"
                          value={settings.accentColor}
                          onChange={handleChange}
                          className="w-16 h-12 rounded-lg border border-gray-200 cursor-pointer"
                        />
                        <input
                          type="text"
                          name="accentColor"
                          value={settings.accentColor}
                          onChange={handleChange}
                          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <ToggleSwitch 
                      label="Dark Mode"
                      description="Enable dark theme for the platform"
                      name="darkMode"
                      checked={settings.darkMode}
                      onChange={handleChange}
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
                      <select
                        name="fontFamily"
                        value={settings.fontFamily}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50"
                      >
                        <option>Inter</option>
                        <option>Poppins</option>
                        <option>Roboto</option>
                        <option>Open Sans</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                        <input type="file" accept="image/*" className="hidden" id="logo-upload" />
                        <label htmlFor="logo-upload" className="cursor-pointer">
                          <span className="text-4xl mb-2 block">🖼️</span>
                          <span className="text-sm text-blue-600">Click to upload logo</span>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB</p>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Favicon</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                        <input type="file" accept="image/*" className="hidden" id="favicon-upload" />
                        <label htmlFor="favicon-upload" className="cursor-pointer">
                          <span className="text-4xl mb-2 block">⭐</span>
                          <span className="text-sm text-blue-600">Click to upload favicon</span>
                          <p className="text-xs text-gray-500 mt-1">ICO, PNG 16x16px</p>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Integrations Settings */}
            {activeTab === 'integrations' && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <SectionHeader 
                    title="Integrations"
                    description="Configure third-party service integrations"
                    icon={<FaPlug />}
                  />
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Payment Gateway</label>
                      <select
                        name="paymentGateway"
                        value={settings.paymentGateway}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="razorpay">Razorpay</option>
                        <option value="stripe">Stripe</option>
                        <option value="payu">PayU</option>
                        <option value="ccavenue">CCAvenue</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">SMS Provider</label>
                      <select
                        name="smsProvider"
                        value={settings.smsProvider}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="twilio">Twilio</option>
                        <option value="msg91">MSG91</option>
                        <option value="textlocal">TextLocal</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Provider</label>
                      <select
                        name="emailProvider"
                        value={settings.emailProvider}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="sendgrid">SendGrid</option>
                        <option value="mailgun">Mailgun</option>
                        <option value="ses">Amazon SES</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Google Maps API Key</label>
                      <input
                        type="text"
                        name="googleMapsApi"
                        value={settings.googleMapsApi}
                        onChange={handleChange}
                        placeholder="Enter API key"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default AdminSettings;
