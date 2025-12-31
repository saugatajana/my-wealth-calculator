import React from 'react';

/**
 * Assumptions & Methodology Section
 * 
 * Trust Building Strategy:
 * - Transparency: Explains exactly how calculations are performed
 * - Education: Helps users understand SIP mechanics
 * - Risk awareness: Clear disclaimer about market risks
 * - Credibility: Shows we're not hiding assumptions or overselling returns
 * 
 * Placement: Directly below results to address user questions immediately
 * after seeing their calculated returns, building confidence in the tool.
 */
export const AssumptionsSection: React.FC = () => {
  return (
    <div className="card bg-blue-50 border border-blue-200 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        How are these returns calculated?
      </h3>
      <ul className="space-y-2 text-sm text-gray-700 mb-4">
        <li className="flex items-start">
          <span className="text-primary-600 mr-2">•</span>
          <span>Initial investment (if any) grows with compound interest over the entire duration</span>
        </li>
        <li className="flex items-start">
          <span className="text-primary-600 mr-2">•</span>
          <span>Monthly SIP investment with monthly compounding</span>
        </li>
        <li className="flex items-start">
          <span className="text-primary-600 mr-2">•</span>
          <span>Expected annual return is annualized (not guaranteed)</span>
        </li>
        <li className="flex items-start">
          <span className="text-primary-600 mr-2">•</span>
          <span>Step-up SIP is applied once every year</span>
        </li>
        <li className="flex items-start">
          <span className="text-primary-600 mr-2">•</span>
          <span>Inflation-adjusted value uses the inflation rate you specify</span>
        </li>
      </ul>
      <p className="text-xs text-gray-600 italic border-t border-blue-200 pt-3">
        Returns shown are illustrative and not guaranteed. Mutual fund investments are subject to market risk.
      </p>
    </div>
  );
};

