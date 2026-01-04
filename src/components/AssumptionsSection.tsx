import React from 'react';
import { Disclaimer } from './Disclaimer';

type AssumptionsSectionProps = {
  mode?: 'sip' | 'lumpsum' | 'fire' | 'swp';
};

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
export const AssumptionsSection: React.FC<AssumptionsSectionProps> = ({ mode = 'sip' }) => {
  return (
    <div className="card bg-blue-50 border border-blue-200 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        How are these returns calculated?
      </h3>
      <ul className="space-y-2 text-sm text-gray-700 mb-4">
        {mode === 'lumpsum' ? (
          <>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Your lump sum investment grows with compound interest over the entire duration</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Returns are compounded monthly based on the expected annual return</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Expected annual return is annualized (not guaranteed)</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Inflation-adjusted value uses the inflation rate you specify</span>
            </li>
          </>
        ) : mode === 'fire' ? (
          <>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>We estimate your expenses at retirement by inflating your current expenses using the inflation rate</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>FIRE target corpus is calculated as: annual expenses at retirement ÷ withdrawal rate</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Your current corpus and monthly investments are compounded monthly using the expected annual return (not guaranteed)</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Required monthly investment is an estimate to reach the FIRE target by your retirement age</span>
            </li>
          </>
        ) : mode === 'swp' ? (
          <>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Your starting corpus is reduced by the withdrawal amount at the beginning of each month</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>The remaining corpus is compounded monthly using the expected annual return (not guaranteed)</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Withdrawal step-up (if any) is applied once every year</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Total withdrawn is the sum of all monthly withdrawals until the end of duration (or until corpus is depleted)</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Estimated returns are computed as: remaining corpus − (initial corpus − total withdrawn)</span>
            </li>
          </>
        ) : (
          <>
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
          </>
        )}
      </ul>
      <Disclaimer className="text-xs text-gray-600 italic border-t border-blue-200 pt-3" />
    </div>
  );
};

