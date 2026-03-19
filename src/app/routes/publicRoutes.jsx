import React from 'react';
import { Route } from 'react-router-dom';

import About from '@/pages/public/About';
import Contact from '@/pages/public/Contact';
import Home from '@/pages/public/Home';
import HomeLoan from '@/pages/public/HomeLoan';
import LegalAssistance from '@/pages/public/LegalAssistance';
import Properties from '@/features/properties/pages/Properties';
import PropertyDetail from '@/features/properties/pages/PropertyDetail';
import VerificationReport from '@/features/properties/pages/VerificationReport';
import RentalAgreements from '@/pages/public/RentalAgreements';
import Services from '@/pages/public/Services';
import VerifyProperty from '@/pages/public/VerifyProperty';

export function renderPublicRoutes() {
  return [
    <Route key="/" path="/" element={<Home />} />,
    <Route key="/about" path="/about" element={<About />} />,
    <Route key="/properties" path="/properties" element={<Properties />} />,
    <Route key="/property/:id" path="/property/:id" element={<PropertyDetail />} />,
    <Route key="/services" path="/services" element={<Services />} />,
    <Route key="/services/legal-assistance" path="/services/legal-assistance" element={<LegalAssistance />} />,
    <Route key="/services/verify-property" path="/services/verify-property" element={<VerifyProperty />} />,
    <Route key="/services/home-loan" path="/services/home-loan" element={<HomeLoan />} />,
    <Route key="/services/rental-agreements" path="/services/rental-agreements" element={<RentalAgreements />} />,
    <Route key="/contact" path="/contact" element={<Contact />} />,
    <Route
      key="/verification-report/:propertyId"
      path="/verification-report/:propertyId"
      element={<VerificationReport />}
    />,
  ];
}
