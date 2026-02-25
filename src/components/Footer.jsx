import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaPlayCircle, FaApple } from 'react-icons/fa';
import { MdChat } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Section - Logo, Description, Social Icons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12 pb-12 border-b border-slate-700">
          {/* Left: Logo & Description */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold text-white mb-4 inline-block bg-blue-600 px-3 py-1 rounded">
              VeriEstate
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mt-4">
              A complete verification & transaction platform designed to help buyers and sellers 
              gain transparency, confidence, and secure opportunities.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-blue-600 hover:text-blue-600 transition">
                <FaFacebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-blue-600 hover:text-blue-600 transition">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-blue-600 hover:text-blue-600 transition">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Learn Column */}
          <div>
            <h4 className="text-base font-semibold text-yellow-400 mb-6">Learn</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition">All Resources</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Buying Guide</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white transition">About Platform</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Property Verification</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Legal Insights</a></li>
            </ul>
          </div>

          {/* Get Started Column */}
          <div>
            <h4 className="text-base font-semibold text-yellow-400 mb-6">Get Started</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Start Verification</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Find Properties</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Seller Tools</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Agent Directory</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Support</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-base font-semibold text-yellow-400 mb-6">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">FAQs</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section - Copyright, Legal Links, App Store Badges */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left: Copyright & Legal */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-gray-500">
            <p>© 2026 <span className="font-semibold text-white">VeriEstate</span> · All rights reserved</p>
            <div className="hidden sm:flex items-center gap-4">
              <span>·</span>
              <a href="#" className="hover:text-gray-300 transition">Terms & Conditions</a>
              <span>·</span>
              <a href="#" className="hover:text-gray-300 transition">Privacy Policy</a>
              <span>·</span>
              <a href="#" className="hover:text-gray-300 transition">Refund Policy</a>
            </div>
          </div>

          {/* Right: App Store & Chat */}
          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg hover:border-blue-600 hover:text-blue-600 transition text-sm font-medium">
              <FaPlayCircle size={18} /> Google Play
            </a>
            <a href="#" className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg hover:border-blue-600 hover:text-blue-600 transition text-sm font-medium">
              <FaApple size={18} /> App Store
            </a>
            <button className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition shadow-lg">
              <MdChat size={24} className="text-white" />
            </button>
          </div>
        </div>

        {/* Mobile Legal Links */}
        <div className="sm:hidden flex flex-col gap-2 mt-6 text-xs text-gray-500 border-t border-slate-700 pt-4">
          <a href="#" className="hover:text-gray-300 transition">Terms & Conditions</a>
          <a href="#" className="hover:text-gray-300 transition">Privacy Policy</a>
          <a href="#" className="hover:text-gray-300 transition">Refund Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;