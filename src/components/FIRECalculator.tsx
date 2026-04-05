import React, { useMemo, useState } from 'react';
import { SliderInput } from './SliderInput';
import { GrowthChart } from './GrowthChart';
import { AssumptionsSection } from './AssumptionsSection';
import { FooterLinks } from './FooterLinks';
import { AdSlot } from './AdSlot';
import { CalculatorSideAdLayout } from './CalculatorSideAdLayout';
import { adsenseAdSlotAfterChart, adsenseClient } from '../constants/siteConfig';
import { calculateFIRE, FIREInputs } from '../utils/fireCalculations';
import { FIRESummaryCards } from './FIRESummaryCards';

export const FIRECalculator: React.FC = () => {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(50);
  const [monthlyExpensesToday, setMonthlyExpensesToday] = useState(50000);
  const [currentCorpus, setCurrentCorpus] = useState(1000000);
  const [monthlyInvestment, setMonthlyInvestment] = useState(20000);
  const [annualReturn, setAnnualReturn] = useState(12);
  const [inflationRate, setInflationRate] = useState(5);
  const [withdrawalRate, setWithdrawalRate] = useState(4);

  const results = useMemo(() => {
    const inputs: FIREInputs = {
      currentAge,
      retirementAge,
      monthlyExpensesToday,
      currentCorpus,
      monthlyInvestment,
      annualReturn,
      inflationRate,
      withdrawalRate,
    };

    return calculateFIRE(inputs);
  }, [
    currentAge,
    retirementAge,
    monthlyExpensesToday,
    currentCorpus,
    monthlyInvestment,
    annualReturn,
    inflationRate,
    withdrawalRate,
  ]);

  return (
    <CalculatorSideAdLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            FIRE Calculator
          </h1>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 items-stretch">
        <div className="lg:col-span-2 h-full">
          <div className="card h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SliderInput
                label="Current Age"
                value={currentAge}
                min={18}
                max={60}
                step={1}
                unit="Years"
                onChange={(v) => setCurrentAge(Math.min(v, retirementAge))}
                compact={true}
                showInput={false}
                footer="none"
              />

              <SliderInput
                label="Retirement Age"
                value={retirementAge}
                min={Math.max(18, currentAge)}
                max={75}
                step={1}
                unit="Years"
                onChange={(v) => setRetirementAge(Math.max(v, currentAge))}
                compact={true}
                showInput={false}
                footer="none"
              />

              <SliderInput
                label="Monthly Expenses (Today)"
                value={monthlyExpensesToday}
                min={0}
                max={1000000}
                step={1000}
                unit="₹"
                onChange={setMonthlyExpensesToday}
                formatValue={(val) => val.toLocaleString('en-IN')}
                footer="selected"
                selectedFooterFormat="compact"
                tooltip="Your current monthly expenses in today's rupees. We'll inflate this to estimate expenses at retirement."
              />

              <SliderInput
                label="Current Corpus"
                value={currentCorpus}
                min={0}
                max={100000000}
                step={10000}
                unit="₹"
                onChange={setCurrentCorpus}
                formatValue={(val) => val.toLocaleString('en-IN')}
                footer="selected"
                selectedFooterFormat="compact"
                tooltip="Your current investable corpus that will grow until retirement."
              />

              <SliderInput
                label="Monthly Investment"
                value={monthlyInvestment}
                min={0}
                max={1000000}
                step={500}
                unit="₹"
                onChange={setMonthlyInvestment}
                formatValue={(val) => val.toLocaleString('en-IN')}
                footer="selected"
                selectedFooterFormat="compact"
                tooltip="Amount you invest every month until retirement."
              />

              <SliderInput
                label="Expected Annual Return"
                value={annualReturn}
                min={0}
                max={40}
                step={0.5}
                unit="%"
                onChange={setAnnualReturn}
                tooltip="Expected annual return (not guaranteed). Used to project corpus growth until retirement."
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
                tooltip="Used to inflate your current expenses to estimate expenses at retirement."
                compact={true}
                showInput={false}
                footer="none"
              />

              <SliderInput
                label="Withdrawal Rate"
                value={withdrawalRate}
                min={2}
                max={8}
                step={0.25}
                unit="%"
                onChange={setWithdrawalRate}
                tooltip="Used to estimate FIRE corpus. Example: 4% implies ~25x annual expenses as target corpus."
                compact={true}
                showInput={false}
                footer="none"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 h-full">
          <FIRESummaryCards
            fireCorpusTarget={results.fireCorpusTarget}
            projectedCorpusAtRetirement={results.projectedCorpusAtRetirement}
            requiredMonthlyInvestment={results.requiredMonthlyInvestment}
            yearsToRetirement={results.yearsToRetirement}
          />
        </div>
      </div>

      <div className="mb-8">
        <GrowthChart yearlyData={results.yearlyData} />
      </div>

      {adsenseClient && adsenseAdSlotAfterChart ? (
        <div className="mb-8">
          <AdSlot client={adsenseClient} slot={adsenseAdSlotAfterChart} />
        </div>
      ) : null}

      <AssumptionsSection mode="fire" />

        <div className="mt-6">
          <FooterLinks />
        </div>
      </div>
    </CalculatorSideAdLayout>
  );
};
