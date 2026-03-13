import React from 'react';
import { Route } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-[60vh] flex items-center justify-center px-4">
    <div className="text-center">
      <h1 className="text-9xl font-bold text-blue-600">404</h1>
      <h2 className="text-3xl font-semibold text-gray-900 mt-4">Page Not Found</h2>
      <p className="text-gray-600 mt-2 mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <a href="/" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Go Back Home
      </a>
    </div>
  </div>
);

export function renderFallbackRoutes() {
  return [<Route key="*" path="*" element={<NotFound />} />];
}
