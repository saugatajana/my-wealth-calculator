import React from 'react';
import { formatCurrency, formatNumber } from '../utils/sipCalculations';

interface SummaryCardsProps {
  totalInvested: number;
  estimatedReturns: number;
  finalCorpus: number;
  inflationAdjustedValue: number;
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
}) => {
  const returnPercentage = totalInvested > 0 
    ? ((estimatedReturns / totalInvested) * 100).toFixed(1)
    : '0.0';

  const cards = [
    {
      title: 'Total Invested',
      value: formatCurrency(totalInvested),
      subtitle: formatNumber(totalInvested),
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      title: 'Estimated Returns',
      value: formatCurrency(estimatedReturns),
      subtitle: `${returnPercentage}% returns`,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      title: 'Final Corpus',
      value: formatCurrency(finalCorpus),
      subtitle: 'Maturity value',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
    {
      title: 'Inflation Adjusted',
      value: formatCurrency(inflationAdjustedValue),
      subtitle: 'Today\'s value (6% inflation)',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`card ${card.bgColor} ${card.borderColor} border-2`}
        >
          <h3 className="text-sm font-medium text-gray-600 mb-2">{card.title}</h3>
          <p className={`text-2xl font-bold ${card.color} mb-1`}>{card.value}</p>
          <p className="text-xs text-gray-500">{card.subtitle}</p>
        </div>
      ))}
    </div>
  );
};

