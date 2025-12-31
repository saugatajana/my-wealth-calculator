import React from 'react';
import { companyName } from '../constants/siteConfig';

type PrivacyPolicyProps = {
  className?: string;
};

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ className }) => {
  return (
    <div className={className ?? 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10'}>
      <div className="card">
        <div className="p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>

          <p className="text-gray-700 mb-6">
            This Privacy Policy explains how {companyName} uses and protects information when you use this website.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mb-3">Information We Collect</h2>
          <p className="text-gray-700 mb-4">
            We do not collect personally identifiable information such as name, email, phone number, or financial account
            details.
          </p>
          <p className="text-gray-700 mb-3">We may collect:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>Non-personal usage data (pages visited, device type, browser)</li>
            <li>Cookies and similar technologies for analytics and advertising purposes</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mb-3">Cookies</h2>
          <p className="text-gray-700 mb-3">We use cookies to:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Improve user experience</li>
            <li>Analyze website traffic</li>
            <li>Display relevant advertisements</li>
          </ul>
          <p className="text-gray-700 mb-6">
            Third-party vendors, including Google, may use cookies to serve ads based on a user’s prior visits to this
            website or other websites.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mb-3">Third-Party Links</h2>
          <p className="text-gray-700 mb-6">
            This website may contain links to third-party platforms such as investment service providers. We are not
            responsible for the privacy practices of those external websites.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mb-3">Data Security</h2>
          <p className="text-gray-700 mb-6">
            We take reasonable measures to protect information, but no method of transmission over the internet is 100%
            secure.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mb-3">Consent</h2>
          <p className="text-gray-700">
            By using this website, you consent to this Privacy Policy.
          </p>

          <div className="mt-8">
            <a href="#/" className="text-sm text-blue-700 hover:text-blue-900 underline">
              Back to Calculator
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
