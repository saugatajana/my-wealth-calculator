import React from 'react';
import { companyName } from '../constants/siteConfig';

type DisclaimerPageProps = {
  className?: string;
};

export const DisclaimerPage: React.FC<DisclaimerPageProps> = ({ className }) => {
  return (
    <div className={className ?? 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10'}>
      <div className="card">
        <div className="p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Disclaimer</h1>

          <p className="text-gray-700 mb-6">
            All calculators and tools provided on this website are for educational and informational purposes only.
          </p>

          <p className="text-gray-700 mb-6">
            The results displayed are based on user inputs, assumptions, and standard financial formulas. These calculations
            are illustrative in nature and do not guarantee actual returns. Actual outcomes may vary due to market
            conditions, taxes, fees, and other factors.
          </p>

          <p className="text-gray-700 mb-6">
            {companyName} does not provide investment advice, financial planning services, or personalized recommendations.
            Nothing on this website should be construed as financial, investment, legal, or tax advice.
          </p>

          <p className="text-gray-700 mb-6">
            Users are advised to consult a SEBI-registered financial advisor or other qualified professionals before making
            any financial or investment decisions.
          </p>

          <p className="text-gray-700 mb-6">
            Mutual fund investments and market-linked instruments are subject to market risks. Past performance is not
            indicative of future results.
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
