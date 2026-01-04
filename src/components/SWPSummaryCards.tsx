import React from 'react';
import { formatCurrency, formatNumber } from '../utils/sipCalculations';

interface SWPSummaryCardsProps {
  initialCorpus: number;
  totalWithdrawn: number;
  remainingCorpus: number;
  estimatedReturns: number;
  isCorpusDepleted: boolean;
  yearsLasted: number;
  plannedYears: number;
}

export const SWPSummaryCards: React.FC<SWPSummaryCardsProps> = ({
  initialCorpus,
  totalWithdrawn,
  remainingCorpus,
  estimatedReturns,
  isCorpusDepleted,
  yearsLasted,
  plannedYears,
}) => {
  return (
    <div className="grid grid-cols-1 gap-1.5 h-full">
      <div className="card bg-gradient-to-br from-green-600 to-green-700 text-white border-2 border-green-600 shadow-lg overflow-hidden p-2">
        <h3 className="text-xs font-medium text-green-100 mb-0.5 leading-tight">Remaining Corpus</h3>
        <p className="text-base sm:text-lg md:text-xl font-bold text-white mb-0 break-words overflow-wrap-anywhere min-w-0 leading-tight">
          ₹{formatNumber(remainingCorpus)}
        </p>
        <p className="text-xs text-green-100 mt-0.5 leading-tight">{formatCurrency(remainingCorpus)}</p>
      </div>

      <div className="card bg-white border-2 border-gray-200 overflow-hidden p-2">
        <h3 className="text-xs font-medium text-gray-600 mb-0.5 leading-tight">Initial Corpus</h3>
        <p className="text-xs sm:text-sm font-bold text-gray-900 mb-0 break-words overflow-wrap-anywhere min-w-0 leading-tight">
          ₹{formatNumber(initialCorpus)}
        </p>
        <p className="text-xs text-gray-500 mt-0.5 leading-tight">{formatCurrency(initialCorpus)}</p>
      </div>

      <div className="card bg-white border-2 border-gray-200 overflow-hidden p-2">
        <h3 className="text-xs font-medium text-gray-600 mb-0.5 leading-tight">Total Withdrawn</h3>
        <p className="text-xs sm:text-sm font-bold text-gray-900 mb-0 break-words overflow-wrap-anywhere min-w-0 leading-tight">
          ₹{formatNumber(totalWithdrawn)}
        </p>
        <p className="text-xs text-gray-500 mt-0.5 leading-tight">{formatCurrency(totalWithdrawn)}</p>
      </div>

      <div className="card bg-white border-2 border-gray-200 overflow-hidden p-2">
        <h3 className="text-xs font-medium text-gray-600 mb-0.5 leading-tight">Estimated Returns</h3>
        <p className="text-xs sm:text-sm font-bold text-gray-900 mb-0 break-words overflow-wrap-anywhere min-w-0 leading-tight">
          ₹{formatNumber(estimatedReturns)}
        </p>
        <p className="text-xs text-gray-500 mt-0.5 leading-tight">{formatCurrency(estimatedReturns)}</p>
      </div>

      <div className={isCorpusDepleted ? 'card bg-red-50 border-2 border-red-200 overflow-hidden p-2' : 'card bg-white border-2 border-gray-200 overflow-hidden p-2'}>
        <h3 className="text-xs font-medium text-gray-600 mb-0.5 leading-tight">Status</h3>
        <p className={isCorpusDepleted ? 'text-xs sm:text-sm font-bold text-red-700 mb-0 break-words overflow-wrap-anywhere min-w-0 leading-tight' : 'text-xs sm:text-sm font-bold text-gray-900 mb-0 break-words overflow-wrap-anywhere min-w-0 leading-tight'}>
          {isCorpusDepleted ? 'Depleted' : 'Sustainable'}
        </p>
        <p className={isCorpusDepleted ? 'text-xs text-red-600 mt-0.5 leading-tight' : 'text-xs text-gray-500 mt-0.5 leading-tight'}>
          {isCorpusDepleted ? `Lasted ${yearsLasted.toFixed(1)} years` : `Planned ${plannedYears} years`}
        </p>
      </div>
    </div>
  );
};
