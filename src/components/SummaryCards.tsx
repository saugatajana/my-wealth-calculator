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
    <div className="grid grid-cols-1 gap-4">
      {/* Total Invested and Estimated Returns - Same Row, Smaller Size */}
      <div className="grid grid-cols-2 gap-3">
        <div className="card bg-white border-2 border-gray-200">
          <h3 className="text-xs font-medium text-gray-600 mb-1">Total Invested</h3>
          <p className="text-lg font-bold text-gray-900 mb-0.5">
            {formatCurrency(totalInvested)}
          </p>
          <p className="text-xs text-gray-500">{formatNumber(totalInvested)}</p>
        </div>
        <div className="card bg-white border-2 border-gray-200">
          <h3 className="text-xs font-medium text-gray-600 mb-1">Estimated Returns</h3>
          <p className="text-lg font-bold text-gray-900 mb-0.5">
            {formatCurrency(estimatedReturns)}
          </p>
          <p className="text-xs text-gray-500">{formatNumber(estimatedReturns)}</p>
        </div>
      </div>

      {/* Final Corpus - Hero Card */}
      <div className="card bg-gradient-to-br from-primary-600 to-primary-700 text-white border-2 border-primary-600 shadow-lg">
        <h3 className="text-sm font-medium text-primary-100 mb-2">Final Corpus</h3>
        <p className="text-4xl md:text-5xl font-bold text-white mb-1">
          {formatCurrency(finalCorpus)}
        </p>
        <p className="text-sm text-primary-100">Maturity value</p>
      </div>

      {/* Inflation Adjusted - Full Width */}
      <div className="card bg-white border-2 border-gray-200">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Inflation Adjusted</h3>
        <p className="text-2xl font-bold text-gray-900 mb-1">
          {formatCurrency(inflationAdjustedValue)}
        </p>
        <p className="text-xs text-gray-500">Today's value ({inflationRate}% inflation)</p>
      </div>
    </div>
  );
};

