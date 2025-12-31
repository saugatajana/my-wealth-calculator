import React, { useState, useMemo } from 'react';
import { SliderInput } from './SliderInput';
import { SummaryCards } from './SummaryCards';
import { GrowthChart } from './GrowthChart';
import { AssumptionsSection } from './AssumptionsSection';
import { calculateSIP, SIPInputs } from '../utils/sipCalculations';

/**
 * Main SIP Calculator Component
 * Handles all inputs and displays results
 */
export const SIPCalculator: React.FC = () => {

  const [initialInvestment, setInitialInvestment] = useState(0);
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [annualReturn, setAnnualReturn] = useState(12);
  const [durationYears, setDurationYears] = useState(10);
  const [stepUpPercentage, setStepUpPercentage] = useState(0);
  const [inflationRate, setInflationRate] = useState(6);

  // Calculate SIP results whenever inputs change
  const results = useMemo(() => {
    const inputs: SIPInputs = {
      monthlyInvestment,
      annualReturn,
      durationYears,
      stepUpPercentage,
      initialInvestment,
      inflationRate,
    };
    return calculateSIP(inputs);
  }, [monthlyInvestment, annualReturn, durationYears, stepUpPercentage, initialInvestment, inflationRate]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          SIP Calculator
        </h1>
      </div>

      {/* Input Section and Summary Cards Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Investment Details - Left Side */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Investment Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SliderInput
                label="Initial Investment (Optional)"
                value={initialInvestment}
                min={0}
                max={10000000}
                step={10000}
                unit="₹"
                onChange={setInitialInvestment}
                formatValue={(val) => val.toLocaleString('en-IN')}
                tooltip="One-time lump sum investment at the start. This amount will grow with returns, and monthly SIP will be added on top of it."
              />
              
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
                tooltip="This is the expected annual return rate. It's an estimate and not guaranteed. Actual returns may vary based on market conditions."
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
                tooltip="Increase your monthly SIP amount by this percentage every year. For example, 10% step-up means if you invest ₹10,000/month in year 1, you'll invest ₹11,000/month in year 2."
              />
              
              <SliderInput
                label="Inflation Rate"
                value={inflationRate}
                min={0}
                max={15}
                step={0.5}
                unit="%"
                onChange={setInflationRate}
                tooltip="Expected annual inflation rate used to calculate the real purchasing power of your corpus. This helps you understand what your money will be worth in today's terms."
              />
            </div>
          </div>
        </div>

        {/* Summary Cards - Right Side */}
        <div className="lg:col-span-1">
          <SummaryCards
            totalInvested={results.totalInvested}
            estimatedReturns={results.estimatedReturns}
            finalCorpus={results.finalCorpus}
            inflationAdjustedValue={results.inflationAdjustedValue}
            inflationRate={results.inflationRate}
          />
        </div>
      </div>

      {/* Growth Chart */}
      <div className="mb-8">
        <GrowthChart yearlyData={results.yearlyData} />
      </div>

      {/* Assumptions & Methodology Section */}
      <AssumptionsSection />
    </div>
  );
};

