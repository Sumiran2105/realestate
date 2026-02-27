import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaPlayCircle, FaApple } from 'react-icons/fa';
import { MdChat } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className=" hardgreen text-gray-100 py-6 pt-10 sm:py-5 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Section - Logo, Description, Social Icons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 pb-12 pt-6">
          {/* Left: Logo & Description */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold text-yellow-400 mb-4 inline-block bg-blue-dark px-3 py-1 rounded">
              VeriEstate
            </h3>
            <p className="text-sm text-gray-100 leading-relaxed mt-4">
              A complete verification & transaction platform designed to help buyers and sellers 
              gain transparency, confidence, and secure opportunities.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <Link to="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-blue-600 hover:text-blue-600 transition">
                <FaFacebook size={18} />
              </Link>
              <Link to="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-blue-600 hover:text-blue-600 transition">
                <FaInstagram size={18} />
              </Link>
              <Link to="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-blue-600 hover:text-blue-600 transition">
                <FaLinkedin size={18} />
              </Link>
            </div>
          </div>

          {/* Learn Column */}
          <div>
            <h4 className="text-base font-semibold text-yellow-400 mb-6">Learn</h4>
            <ul className="space-y-3">
              <li><Link to="#" className="text-gray-100 hover:text-white transition">All Resources</Link></li>
              <li><Link to="#" className="text-gray-100 hover:text-white transition">Buying Guide</Link></li>
              <li><Link to="/about" className="text-gray-100 hover:text-white transition">About Platform</Link></li>
              <li><Link to="/services/verify-property" className="text-gray-100 hover:text-white transition">Property Verification</Link></li>
              <li><Link to="/services/legal-assistance" className="text-gray-100 hover:text-white transition">Legal Insights</Link></li>
            </ul>
          </div>

          {/* Get Started Column */}
          <div>
            <h4 className="text-base font-semibold text-yellow-400 mb-6">Get Started</h4>
            <ul className="space-y-3">
              <li><Link to="#" className="text-gray-100 hover:text-white transition">Start Verification</Link></li>
              <li><Link to="#" className="text-gray-100 hover:text-white transition">Find Properties</Link></li>
              <li><Link to="#" className="text-gray-100 hover:text-white transition">Seller Tools</Link></li>
              <li><Link to="#" className="text-gray-100 hover:text-white transition">Agent Directory</Link></li>
              <li><Link to="#" className="text-gray-100 hover:text-white transition">Support</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-base font-semibold text-yellow-400 mb-6">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-100 hover:text-white transition">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-100 hover:text-white transition">Contact Us</Link></li>
              <li><Link to="/services" className="text-gray-100 hover:text-white transition">Services</Link></li>
              {/* <li><Link to="#" className="text-gray-100 hover:text-white transition">Blog</Link></li> */}
              <li><Link to="/contact" className="text-gray-100 hover:text-white transition">FAQs</Link></li>
            </ul>
          </div>
        </div>  

        {/* Bottom Section - Copyright, Legal Links, App Store Badges */}
        <div className="flex flex-col sm:flex-row items-center justify-between">
          {/* Left: Copyright & Legal */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-gray-200">
            <p>© 2026 <span className="font-semibold text-yellow-400">VeriEstate</span> · All rights reserved</p>
            <div className="hidden sm:flex items-center gap-4">
              <span>·</span>
              <Link to="#" className="hover:text-gray-200 transition">Terms & Conditions</Link>
              <span>·</span>
              <Link to="#" className="hover:text-gray-200 transition">Privacy Policy</Link>
              <span>·</span>
              <Link to="#" className="hover:text-gray-200 transition">Refund Policy</Link>
            </div>
          </div>

          {/* Right: App Store & Chat */}
          <div className="flex items-center gap-4">
            <Link to="#" className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg hover:border-blue-600 hover:text-blue-600 transition text-sm font-medium">
              <FaPlayCircle size={18} /> Google Play
            </Link>
            <Link to="#" className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg hover:border-blue-600 hover:text-blue-600 transition text-sm font-medium">
              <FaApple size={18} /> App Store
            </Link>
            <button className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition shadow-lg">
              <MdChat size={24} className="text-white" />
            </button>
          </div>
        </div>

        {/* Mobile Legal Links */}
        <div className="sm:hidden flex flex-col gap-2 mt-6 text-xs text-gray-500 border-t border-slate-700 pt-4">
          <Link to="#" className="hover:text-gray-300 transition">Terms & Conditions</Link>
          <Link to="#" className="hover:text-gray-300 transition">Privacy Policy</Link>
          <Link to="#" className="hover:text-gray-300 transition">Refund Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;