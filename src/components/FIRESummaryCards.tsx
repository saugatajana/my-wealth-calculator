import React from 'react';
import { formatCurrency, formatNumber } from '../utils/sipCalculations';

interface FIRESummaryCardsProps {
  fireCorpusTarget: number;
  projectedCorpusAtRetirement: number;
  requiredMonthlyInvestment: number;
  yearsToRetirement: number;
}

export const FIRESummaryCards: React.FC<FIRESummaryCardsProps> = ({
  fireCorpusTarget,
  projectedCorpusAtRetirement,
  requiredMonthlyInvestment,
  yearsToRetirement,
}) => {
  const gap = fireCorpusTarget - projectedCorpusAtRetirement;

  return (
    <div className="grid grid-cols-1 gap-1.5 h-full">
      <div className="card bg-gradient-to-br from-green-600 to-green-700 text-white border-2 border-green-600 shadow-lg overflow-hidden p-2">
        <h3 className="text-xs font-medium text-green-100 mb-0.5 leading-tight">FIRE Target Corpus</h3>
        <p className="text-base sm:text-lg md:text-xl font-bold text-white mb-0 break-words overflow-wrap-anywhere min-w-0 leading-tight">
          ₹{formatNumber(fireCorpusTarget)}
        </p>
        <p className="text-xs text-green-100 mt-0.5 leading-tight">{formatCurrency(fireCorpusTarget)}</p>
      </div>

      <div className="card bg-white border-2 border-gray-200 overflow-hidden p-2">
        <h3 className="text-xs font-medium text-gray-600 mb-0.5 leading-tight">Projected Corpus</h3>
        <p className="text-xs sm:text-sm font-bold text-gray-900 mb-0 break-words overflow-wrap-anywhere min-w-0 leading-tight">
          ₹{formatNumber(projectedCorpusAtRetirement)}
        </p>
        <p className="text-xs text-gray-500 mt-0.5 leading-tight">{formatCurrency(projectedCorpusAtRetirement)} • ({yearsToRetirement} yrs)</p>
      </div>

      <div className="card bg-white border-2 border-gray-200 overflow-hidden p-2">
        <h3 className="text-xs font-medium text-gray-600 mb-0.5 leading-tight">Required Monthly Investment</h3>
        <p className="text-xs sm:text-sm font-bold text-gray-900 mb-0 break-words overflow-wrap-anywhere min-w-0 leading-tight">
          ₹{formatNumber(requiredMonthlyInvestment)}
        </p>
        <p className="text-xs text-gray-500 mt-0.5 leading-tight">{formatCurrency(requiredMonthlyInvestment)}/month</p>
      </div>

      <div className="card bg-white border-2 border-gray-200 overflow-hidden p-2">
        <h3 className="text-xs font-medium text-gray-600 mb-0.5 leading-tight">Gap (Target - Projected)</h3>
        <p className="text-xs sm:text-sm font-bold text-gray-900 mb-0 break-words overflow-wrap-anywhere min-w-0 leading-tight">
          ₹{formatNumber(gap)}
        </p>
        <p className="text-xs text-gray-500 mt-0.5 leading-tight">{formatCurrency(gap)}</p>
      </div>
    </div>
  );
};
