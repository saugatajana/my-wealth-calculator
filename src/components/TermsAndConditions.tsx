import React from 'react';
import { companyName } from '../constants/siteConfig';

type TermsAndConditionsProps = {
  className?: string;
};

export const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ className }) => {
  return (
    <div className={className ?? 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10'}>
      <div className="card">
        <div className="p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms and Conditions</h1>

          <p className="text-gray-700 mb-6">
            By accessing and using {companyName}, you agree to the following terms.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mb-3">Use of Content</h2>
          <p className="text-gray-700 mb-3">
            All calculators and content provided on this website are for educational and informational purposes only.
          </p>
          <p className="text-gray-700 mb-6">
            We do not guarantee the accuracy, completeness, or reliability of any calculations or content.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mb-3">No Financial Advice</h2>
          <p className="text-gray-700 mb-3">Nothing on this website constitutes financial, investment, or legal advice.</p>
          <p className="text-gray-700 mb-6">
            Users should consult qualified professionals before making financial decisions.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mb-3">External Links</h2>
          <p className="text-gray-700 mb-6">
            This website may include links to third-party websites. We do not control or endorse their content and are not
            responsible for any loss or damage arising from their use.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mb-3">Limitation of Liability</h2>
          <p className="text-gray-700 mb-6">
            We shall not be liable for any direct, indirect, or consequential loss arising from the use of this website or
            reliance on its calculations.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mb-3">Changes</h2>
          <p className="text-gray-700 mb-6">We may update these terms at any time without prior notice.</p>

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
