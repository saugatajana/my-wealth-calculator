import React, { useMemo, useState } from 'react';
import { SliderInput } from './SliderInput';
import { GrowthChart } from './GrowthChart';
import { AssumptionsSection } from './AssumptionsSection';
import { FooterLinks } from './FooterLinks';
import { AdSlot } from './AdSlot';
import { CalculatorSideAdLayout } from './CalculatorSideAdLayout';
import { adsenseAdSlotAfterChart, adsenseClient } from '../constants/siteConfig';
import { calculateSWP, SWPInputs } from '../utils/swpCalculations';
import { SWPSummaryCards } from './SWPSummaryCards';

export const SWPCalculator: React.FC = () => {
  const [initialCorpus, setInitialCorpus] = useState(5000000);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(50000);
  const [annualReturn, setAnnualReturn] = useState(10);
  const [durationYears, setDurationYears] = useState(20);
  const [stepUpPercentage, setStepUpPercentage] = useState(5);

  const results = useMemo(() => {
    const inputs: SWPInputs = {
      initialCorpus,
      monthlyWithdrawal,
      annualReturn,
      durationYears,
      stepUpPercentage,
    };

    return calculateSWP(inputs);
  }, [initialCorpus, monthlyWithdrawal, annualReturn, durationYears, stepUpPercentage]);

  return (
    <CalculatorSideAdLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">SWP Calculator</h1>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 items-stretch">
        <div className="lg:col-span-2 h-full">
          <div className="card h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SliderInput
                label="Initial Corpus"
                value={initialCorpus}
                min={0}
                max={100000000}
                step={10000}
                unit="₹"
                onChange={setInitialCorpus}
                formatValue={(val) => val.toLocaleString('en-IN')}
                footer="selected"
                selectedFooterFormat="compact"
                tooltip="Your starting investable amount from which you will withdraw periodically."
              />

              <SliderInput
                label="Monthly Withdrawal"
                value={monthlyWithdrawal}
                min={0}
                max={1000000}
                step={500}
                unit="₹"
                onChange={setMonthlyWithdrawal}
                formatValue={(val) => val.toLocaleString('en-IN')}
                footer="selected"
                selectedFooterFormat="compact"
                tooltip="Amount withdrawn at the beginning of each month. The remaining corpus continues to earn returns."
              />

              <SliderInput
                label="Expected Annual Return"
                value={annualReturn}
                min={0}
                max={40}
                step={0.5}
                unit="%"
                onChange={setAnnualReturn}
                tooltip="Expected annual return (not guaranteed). Used to project corpus growth/decay during withdrawals."
                compact={true}
                showInput={false}
                footer="none"
              />

              <SliderInput
                label="Withdrawal Duration"
                value={durationYears}
                min={1}
                max={40}
                step={1}
                unit="Years"
                onChange={setDurationYears}
                compact={true}
                showInput={false}
                footer="none"
              />

              <SliderInput
                label="Withdrawal Step-up (Yearly Increase)"
                value={stepUpPercentage}
                min={0}
                max={20}
                step={1}
                unit="%"
                onChange={setStepUpPercentage}
                tooltip="Increase your monthly withdrawal amount by this percentage every year (to account for lifestyle/inflation)."
                compact={true}
                showInput={false}
                footer="none"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 h-full">
          <SWPSummaryCards
            initialCorpus={initialCorpus}
            totalWithdrawn={results.totalWithdrawn}
            remainingCorpus={results.remainingCorpus}
            estimatedReturns={results.estimatedReturns}
            isCorpusDepleted={results.isCorpusDepleted}
            yearsLasted={results.yearsLasted}
            plannedYears={durationYears}
          />
        </div>
      </div>

      <div className="mb-8">
        <GrowthChart yearlyData={results.yearlyData} investedLabel="Total Withdrawn" corpusLabel="Remaining Corpus" />
      </div>

      {adsenseClient && adsenseAdSlotAfterChart ? (
        <div className="mb-8">
          <AdSlot client={adsenseClient} slot={adsenseAdSlotAfterChart} />
        </div>
      ) : null}

      <AssumptionsSection mode="swp" />

        <div className="mt-6">
          <FooterLinks />
        </div>
      </div>
    </CalculatorSideAdLayout>
  );
};
