import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { YearlyData } from '../utils/sipCalculations';
import { formatCurrency } from '../utils/sipCalculations';

interface GrowthChartProps {
  yearlyData: YearlyData[];
  startYear?: number;
}

/**
 * Growth Chart Component
 * Displays year-wise corpus growth using Recharts
 */
export const GrowthChart: React.FC<GrowthChartProps> = ({ yearlyData, startYear = new Date().getFullYear() }) => {

  // Custom tooltip formatter
  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const yearIndex = payload[0].payload.year;
      const calendarYear = startYear + (yearIndex - 1);
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 mb-2">
            {calendarYear}
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Format Y-axis values - compact format to avoid disruption
  const formatYAxis = (value: number) => {
    if (value >= 10000000) {
      const crores = value / 10000000;
      // Use very compact format: 1.4Cr or 3500Cr without ₹ to save space
      if (crores >= 1000) {
        return `${crores.toFixed(0)}Cr`;
      } else if (crores >= 100) {
        return `${crores.toFixed(0)}Cr`;
      } else if (crores >= 10) {
        return `${crores.toFixed(1)}Cr`;
      } else {
        return `${crores.toFixed(1)}Cr`;
      }
    } else if (value >= 100000) {
      const lakhs = value / 100000;
      return lakhs >= 100
        ? `${lakhs.toFixed(0)}L`
        : `${lakhs.toFixed(1)}L`;
    } else if (value >= 1000) {
      const thousands = value / 1000;
      return `${thousands.toFixed(0)}K`;
    }
    return `${value.toFixed(0)}`;
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Corpus Growth Over Time
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={yearlyData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="year"
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            tickFormatter={(val) => String(startYear + (Number(val) - 1))}
            label={{ value: 'Year', position: 'insideBottom', offset: -5 }}
          />
          <YAxis
            stroke="#6b7280"
            style={{ fontSize: '11px' }}
            tickFormatter={formatYAxis}
            width={60}
            label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip content={customTooltip} />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="line"
          />
          <Line
            type="monotone"
            dataKey="invested"
            stroke="#3b82f6"
            strokeWidth={2}
            name="Total Invested"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="corpus"
            stroke="#10b981"
            strokeWidth={3}
            name="Final Corpus"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

