import { YearlyData } from './sipCalculations';

export interface LumpsumInputs {
  investmentAmount: number;
  annualReturn: number;
  durationYears: number;
  inflationRate?: number;
}

export interface LumpsumResult {
  totalInvested: number;
  initialInvestment: number;
  estimatedReturns: number;
  finalCorpus: number;
  inflationAdjustedValue: number;
  inflationRate: number;
  yearlyData: YearlyData[];
}

function getMonthlyRate(annualReturn: number): number {
  return annualReturn / 100 / 12;
}

export function calculateLumpsum(inputs: LumpsumInputs): LumpsumResult {
  const { investmentAmount, annualReturn, durationYears, inflationRate = 5 } = inputs;
  const monthlyRate = getMonthlyRate(annualReturn);
  const inflationRateDecimal = inflationRate / 100;

  const yearlyData: YearlyData[] = [];

  for (let year = 1; year <= durationYears; year++) {
    const monthsElapsed = year * 12;
    const corpus = investmentAmount * Math.pow(1 + monthlyRate, monthsElapsed);

    yearlyData.push({
      year,
      invested: investmentAmount,
      returns: corpus - investmentAmount,
      corpus,
      monthlySIP: 0,
      initialInvestmentGrown: investmentAmount,
    });
  }

  const finalCorpus =
    durationYears === 0
      ? investmentAmount
      : investmentAmount * Math.pow(1 + monthlyRate, durationYears * 12);

  const totalInvested = investmentAmount;
  const estimatedReturns = finalCorpus - totalInvested;
  const inflationAdjustedValue = finalCorpus / Math.pow(1 + inflationRateDecimal, durationYears);

  return {
    totalInvested,
    initialInvestment: investmentAmount,
    estimatedReturns,
    finalCorpus,
    inflationAdjustedValue,
    inflationRate,
    yearlyData,
  };
}
