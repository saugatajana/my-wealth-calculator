import { YearlyData } from './sipCalculations';

export interface SWPInputs {
  initialCorpus: number;
  monthlyWithdrawal: number;
  annualReturn: number;
  durationYears: number;
  stepUpPercentage: number;
  inflationRate?: number;
}

export interface SWPResult {
  totalWithdrawn: number;
  remainingCorpus: number;
  estimatedReturns: number;
  inflationAdjustedValue: number;
  inflationRate: number;
  yearlyData: YearlyData[];
  isCorpusDepleted: boolean;
  yearsLasted: number;
}

function getMonthlyRate(annualReturn: number): number {
  return annualReturn / 100 / 12;
}

export function calculateSWP(inputs: SWPInputs): SWPResult {
  const {
    initialCorpus,
    monthlyWithdrawal,
    annualReturn,
    durationYears,
    stepUpPercentage,
    inflationRate = 5,
  } = inputs;

  const monthlyRate = getMonthlyRate(annualReturn);
  const inflationRateDecimal = inflationRate / 100;
  const depletionEpsilon = 1;

  const yearlyData: YearlyData[] = [];

  let corpus = Math.max(0, initialCorpus);
  let totalWithdrawn = 0;
  let currentWithdrawal = Math.max(0, monthlyWithdrawal);

  let isCorpusDepleted = false;
  let monthsLasted = durationYears * 12;

  for (let year = 1; year <= durationYears; year++) {
    const monthsInYear = 12;

    for (let m = 0; m < monthsInYear; m++) {
      const withdrawThisMonth = Math.min(corpus, currentWithdrawal);
      corpus -= withdrawThisMonth;
      totalWithdrawn += withdrawThisMonth;

      if (corpus <= depletionEpsilon) {
        corpus = 0;
        isCorpusDepleted = true;
        monthsLasted = (year - 1) * 12 + (m + 1);
        break;
      }

      corpus = corpus * (1 + monthlyRate);

      if (corpus <= depletionEpsilon) {
        corpus = 0;
        isCorpusDepleted = true;
        monthsLasted = (year - 1) * 12 + (m + 1);
        break;
      }
    }

    const netInvested = initialCorpus - totalWithdrawn;
    const estimatedReturns = corpus - netInvested;

    yearlyData.push({
      year,
      invested: totalWithdrawn,
      returns: estimatedReturns,
      corpus,
      monthlySIP: -currentWithdrawal,
      initialInvestmentGrown: initialCorpus,
    });

    if (isCorpusDepleted) {
      break;
    }

    currentWithdrawal = currentWithdrawal * (1 + stepUpPercentage / 100);
  }

  const remainingCorpus = corpus;
  const netInvested = initialCorpus - totalWithdrawn;
  const estimatedReturns = remainingCorpus - netInvested;
  const yearsLasted = Math.max(0, monthsLasted / 12);

  const inflationAdjustedValue =
    durationYears <= 0
      ? remainingCorpus
      : remainingCorpus / Math.pow(1 + inflationRateDecimal, durationYears);

  return {
    totalWithdrawn,
    remainingCorpus,
    estimatedReturns,
    inflationAdjustedValue,
    inflationRate,
    yearlyData,
    isCorpusDepleted,
    yearsLasted,
  };
}
