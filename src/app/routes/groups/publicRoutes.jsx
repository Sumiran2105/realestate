import React from 'react';
import { Route } from 'react-router-dom';

import About from '@/features/marketing/pages/About';
import Contact from '@/features/marketing/pages/Contact';
import Home from '@/features/marketing/pages/Home';
import Services from '@/features/marketing/pages/Services';
import Properties from '@/features/properties/pages/Properties';
import PropertyDetail from '@/features/properties/pages/PropertyDetail';
import VerificationReport from '@/features/properties/pages/VerificationReport';
import HomeLoan from '@/features/services/pages/HomeLoan';
import LegalAssistance from '@/features/services/pages/LegalAssistance';
import RentalAgreements from '@/features/services/pages/RentalAgreements';
import VerifyProperty from '@/features/services/pages/VerifyProperty';

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
