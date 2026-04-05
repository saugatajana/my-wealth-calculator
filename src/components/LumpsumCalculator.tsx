import React, { useMemo, useState } from 'react';
import { SliderInput } from './SliderInput';
import { SummaryCards } from './SummaryCards';
import { GrowthChart } from './GrowthChart';
import { AssumptionsSection } from './AssumptionsSection';
import { FooterLinks } from './FooterLinks';
import { AdSlot } from './AdSlot';
import { CalculatorSideAdLayout } from './CalculatorSideAdLayout';
import { calculateLumpsum, LumpsumInputs } from '../utils/lumpsumCalculations';
import { adsenseAdSlotAfterChart, adsenseClient } from '../constants/siteConfig';

export const LumpsumCalculator: React.FC = () => {
  const [investmentAmount, setInvestmentAmount] = useState(100000);
  const [annualReturn, setAnnualReturn] = useState(12);
  const [durationYears, setDurationYears] = useState(10);
  const [inflationRate, setInflationRate] = useState(5);

  const results = useMemo(() => {
    const inputs: LumpsumInputs = {
      investmentAmount,
      annualReturn,
      durationYears,
      inflationRate,
    };

    return calculateLumpsum(inputs);
  }, [investmentAmount, annualReturn, durationYears, inflationRate]);

  return (
    <CalculatorSideAdLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Lumpsum Calculator
          </h1>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 items-stretch">
        <div className="lg:col-span-2 h-full">
          <div className="card h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SliderInput
                label="Investment Amount"
                value={investmentAmount}
                min={0}
                max={100000000}
                step={10000}
                unit="₹"
                onChange={setInvestmentAmount}
                formatValue={(val) => val.toLocaleString('en-IN')}
                footer="selected"
                selectedFooterFormat="compact"
                tooltip="One-time lump sum investment at the start. This amount grows with compounding over the investment duration."
              />

              <SliderInput
                label="Expected Annual Return"
                value={annualReturn}
                min={6}
                max={40}
                step={0.5}
                unit="%"
                onChange={setAnnualReturn}
                tooltip="This is the expected annual return rate. It's an estimate and not guaranteed. Actual returns may vary based on market conditions."
                compact={true}
                showInput={false}
                footer="none"
              />

              <SliderInput
                label="Investment Duration"
                value={durationYears}
                min={1}
                max={30}
                step={1}
                unit="Years"
                onChange={setDurationYears}
                compact={true}
                showInput={false}
                footer="none"
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
                compact={true}
                showInput={false}
                footer="none"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 h-full">
          <SummaryCards
            totalInvested={results.totalInvested}
            estimatedReturns={results.estimatedReturns}
            finalCorpus={results.finalCorpus}
            inflationAdjustedValue={results.inflationAdjustedValue}
            inflationRate={results.inflationRate}
          />
        </div>
      </div>

      <div className="mb-8">
        <GrowthChart yearlyData={results.yearlyData} />
      </div>

      {adsenseClient && adsenseAdSlotAfterChart ? (
        <div className="mb-8">
          <AdSlot
            client={adsenseClient}
            slot={adsenseAdSlotAfterChart}
          />
        </div>
      ) : null}

      <AssumptionsSection mode="lumpsum" />

        <div className="mt-6">
          <FooterLinks />
        </div>
      </div>
    </CalculatorSideAdLayout>
  );
};
