import React, { useState, useMemo } from 'react';
import { SliderInput } from './SliderInput';
import { SummaryCards } from './SummaryCards';
import { GrowthChart } from './GrowthChart';
import { calculateSIP, SIPInputs } from '../utils/sipCalculations';

/**
 * Main SIP Calculator Component
 * Handles all inputs and displays results
 */
export const SIPCalculator: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [annualReturn, setAnnualReturn] = useState(12);
  const [durationYears, setDurationYears] = useState(10);
  const [stepUpPercentage, setStepUpPercentage] = useState(0);

  // Calculate SIP results whenever inputs change
  const results = useMemo(() => {
    const inputs: SIPInputs = {
      monthlyInvestment,
      annualReturn,
      durationYears,
      stepUpPercentage,
    };
    return calculateSIP(inputs);
  }, [monthlyInvestment, annualReturn, durationYears, stepUpPercentage]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          SIP Calculator India
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Calculate your Systematic Investment Plan returns, total invested amount, and final corpus. 
          Plan your financial future with our free SIP calculator.
        </p>
      </div>

      {/* Input Section */}
      <div className="card mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Investment Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SliderInput
            label="Monthly Investment"
            value={monthlyInvestment}
            min={500}
            max={100000}
            step={500}
            unit="₹"
            onChange={setMonthlyInvestment}
            formatValue={(val) => val.toLocaleString('en-IN')}
          />
          
          <SliderInput
            label="Expected Annual Return"
            value={annualReturn}
            min={6}
            max={20}
            step={0.5}
            unit="%"
            onChange={setAnnualReturn}
          />
          
          <SliderInput
            label="Investment Duration"
            value={durationYears}
            min={1}
            max={30}
            step={1}
            unit="Years"
            onChange={setDurationYears}
          />
          
          <SliderInput
            label="Step-up SIP (Yearly Increase)"
            value={stepUpPercentage}
            min={0}
            max={20}
            step={1}
            unit="%"
            onChange={setStepUpPercentage}
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-8">
        <SummaryCards
          totalInvested={results.totalInvested}
          estimatedReturns={results.estimatedReturns}
          finalCorpus={results.finalCorpus}
          inflationAdjustedValue={results.inflationAdjustedValue}
        />
      </div>

      {/* Growth Chart */}
      <div className="mb-8">
        <GrowthChart yearlyData={results.yearlyData} />
      </div>

      {/* AdSense Placeholder */}
      <div className="card mb-8 bg-gray-50 border-2 border-dashed border-gray-300">
        <div className="text-center py-12">
          <p className="text-sm text-gray-500 mb-2">Advertisement</p>
          <div className="h-32 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-400 text-sm">Google AdSense Ad Unit</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="card bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="text-center py-8">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your SIP Journey?
          </h2>
          <p className="text-primary-100 mb-6 text-lg">
            Start investing in mutual funds with India's leading platforms
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://groww.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary-700 font-semibold rounded-lg hover:bg-primary-50 transition-colors duration-200 shadow-lg"
            >
              Start SIP with Groww
            </a>
            <a
              href="https://zerodha.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary-700 font-semibold rounded-lg hover:bg-primary-50 transition-colors duration-200 shadow-lg"
            >
              Start SIP with Zerodha
            </a>
          </div>
          <p className="text-primary-200 text-sm mt-4">
            * These are affiliate links. We may earn a commission at no extra cost to you.
          </p>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-8 card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          About SIP Calculator
        </h2>
        <div className="prose prose-sm max-w-none text-gray-600 space-y-3">
          <p>
            A Systematic Investment Plan (SIP) is a method of investing in mutual funds where you invest 
            a fixed amount regularly (usually monthly) over a period of time. This calculator helps you 
            understand the potential returns on your SIP investments.
          </p>
          <p>
            <strong>Key Features:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Calculate total invested amount over the investment period</li>
            <li>Estimate returns based on expected annual return rate</li>
            <li>View final corpus (maturity amount)</li>
            <li>Step-up SIP: Increase your monthly investment annually</li>
            <li>Inflation-adjusted value: See the real purchasing power of your corpus</li>
            <li>Year-wise growth visualization</li>
          </ul>
          <p className="text-xs text-gray-500 mt-4">
            <strong>Disclaimer:</strong> This calculator provides estimates based on the inputs provided. 
            Actual returns may vary based on market conditions. Past performance is not indicative of future results. 
            Please consult with a financial advisor before making investment decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

