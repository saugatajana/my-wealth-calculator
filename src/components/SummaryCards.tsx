import React from 'react';
import { formatCurrency, formatNumber } from '../utils/sipCalculations';

interface SummaryCardsProps {
  totalInvested: number;
  estimatedReturns: number;
  finalCorpus: number;
  inflationAdjustedValue: number;
  inflationRate: number;
}

/**
 * Summary Cards Component
 * Displays key metrics in a card-based layout
 */
export const SummaryCards: React.FC<SummaryCardsProps> = ({
  totalInvested,
  estimatedReturns,
  finalCorpus,
  inflationAdjustedValue,
  inflationRate,
}) => {
  return (
    <div className="grid grid-cols-1 gap-1.5 h-full">
      {/* Final Corpus - Hero Card */}
      <div className="card bg-gradient-to-br from-green-600 to-green-700 text-white border-2 border-green-600 shadow-lg overflow-hidden p-2">
        <h3 className="text-xs font-medium text-green-100 mb-0.5 leading-tight">Final Corpus</h3>
        <p className="text-base sm:text-lg md:text-xl font-bold text-white mb-0 break-words overflow-wrap-anywhere min-w-0 leading-tight">
          ₹{formatNumber(finalCorpus)}
        </p>
        <p className="text-xs text-green-100 mt-0.5 leading-tight">{formatCurrency(finalCorpus)}</p>
      </div>

      {/* Total Invested */}
      <div className="card bg-white border-2 border-gray-200 overflow-hidden p-2">
        <h3 className="text-xs font-medium text-gray-600 mb-0.5 leading-tight">Total Invested</h3>
        <p className="text-xs sm:text-sm font-bold text-gray-900 mb-0 break-words overflow-wrap-anywhere min-w-0 leading-tight">
          ₹{formatNumber(totalInvested)}
        </p>
        <p className="text-xs text-gray-500 mt-0.5 leading-tight">{formatCurrency(totalInvested)}</p>
      </div>

      {/* Estimated Returns */}
      <div className="card bg-white border-2 border-gray-200 overflow-hidden p-2">
        <h3 className="text-xs font-medium text-gray-600 mb-0.5 leading-tight">Estimated Returns</h3>
        <p className="text-xs sm:text-sm font-bold text-gray-900 mb-0 break-words overflow-wrap-anywhere min-w-0 leading-tight">
          ₹{formatNumber(estimatedReturns)}
        </p>
        <p className="text-xs text-gray-500 mt-0.5 leading-tight">{formatCurrency(estimatedReturns)}</p>
      </div>

      {/* Inflation Adjusted */}
      <div className="card bg-white border-2 border-gray-200 overflow-hidden p-2">
        <h3 className="text-xs font-medium text-gray-600 mb-0.5 leading-tight">Inflation Adjusted</h3>
        <p className="text-xs sm:text-sm font-bold text-gray-900 mb-0 break-words overflow-wrap-anywhere min-w-0 leading-tight">
          ₹{formatNumber(inflationAdjustedValue)}
        </p>
        <p className="text-xs text-gray-500 mt-0.5 leading-tight">{formatCurrency(inflationAdjustedValue)} • ({inflationRate}%)</p>
      </div>
    </div>
  );
};

