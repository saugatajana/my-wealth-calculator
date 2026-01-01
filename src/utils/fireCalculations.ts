import { YearlyData } from './sipCalculations';

export interface FIREInputs {
  currentAge: number;
  retirementAge: number;
  monthlyExpensesToday: number;
  currentCorpus: number;
  monthlyInvestment: number;
  annualReturn: number;
  inflationRate: number;
  withdrawalRate: number;
}

export interface FIREResult {
  yearsToRetirement: number;
  fireCorpusTarget: number;
  annualExpensesAtRetirement: number;
  projectedCorpusAtRetirement: number;
  totalInvested: number;
  estimatedReturns: number;
  requiredMonthlyInvestment: number;
  yearlyData: YearlyData[];
}

function getMonthlyRate(annualReturn: number): number {
  return annualReturn / 100 / 12;
}

function sipFutureValueAnnuityDue(monthlyInvestment: number, monthlyRate: number, months: number): number {
  if (months <= 0) return 0;
  if (monthlyRate === 0) return monthlyInvestment * months;

  const factor = (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
  return monthlyInvestment * factor * (1 + monthlyRate);
}

function requiredSIPForTargetFV(targetFV: number, pv: number, monthlyRate: number, months: number): number {
  if (months <= 0) return 0;

  const pvFV = pv * Math.pow(1 + monthlyRate, months);
  const remaining = targetFV - pvFV;

  if (remaining <= 0) return 0;

  if (monthlyRate === 0) {
    return remaining / months;
  }

  const factor = (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
  const denom = factor * (1 + monthlyRate);

  if (denom === 0) return 0;

  return remaining / denom;
}

export function calculateFIRE(inputs: FIREInputs): FIREResult {
  const {
    currentAge,
    retirementAge,
    monthlyExpensesToday,
    currentCorpus,
    monthlyInvestment,
    annualReturn,
    inflationRate,
    withdrawalRate,
  } = inputs;

  const yearsToRetirement = Math.max(0, retirementAge - currentAge);
  const monthsToRetirement = yearsToRetirement * 12;

  const inflationDecimal = inflationRate / 100;
  const annualExpensesToday = monthlyExpensesToday * 12;
  const annualExpensesAtRetirement = annualExpensesToday * Math.pow(1 + inflationDecimal, yearsToRetirement);

  const withdrawalDecimal = withdrawalRate / 100;
  const fireCorpusTarget = withdrawalDecimal === 0 ? 0 : annualExpensesAtRetirement / withdrawalDecimal;

  const monthlyRate = getMonthlyRate(annualReturn);
  const fvCurrentCorpus = currentCorpus * Math.pow(1 + monthlyRate, monthsToRetirement);
  const fvContributions = sipFutureValueAnnuityDue(monthlyInvestment, monthlyRate, monthsToRetirement);
  const projectedCorpusAtRetirement = fvCurrentCorpus + fvContributions;

  const requiredMonthlyInvestment = requiredSIPForTargetFV(
    fireCorpusTarget,
    currentCorpus,
    monthlyRate,
    monthsToRetirement
  );

  const yearlyData: YearlyData[] = [];
  let corpus = currentCorpus;

  for (let year = 1; year <= yearsToRetirement; year++) {
    const monthsElapsed = year * 12;
    const investedTillYear = currentCorpus + monthlyInvestment * monthsElapsed;

    const fvCorpus = currentCorpus * Math.pow(1 + monthlyRate, monthsElapsed);
    const fvSip = sipFutureValueAnnuityDue(monthlyInvestment, monthlyRate, monthsElapsed);
    corpus = fvCorpus + fvSip;

    yearlyData.push({
      year,
      invested: investedTillYear,
      returns: corpus - investedTillYear,
      corpus,
      monthlySIP: monthlyInvestment,
      initialInvestmentGrown: currentCorpus,
    });
  }

  const estimatedReturns = projectedCorpusAtRetirement - (currentCorpus + monthlyInvestment * monthsToRetirement);

  return {
    yearsToRetirement,
    fireCorpusTarget,
    annualExpensesAtRetirement,
    projectedCorpusAtRetirement,
    totalInvested: currentCorpus + monthlyInvestment * monthsToRetirement,
    estimatedReturns,
    requiredMonthlyInvestment,
    yearlyData,
  };
}
