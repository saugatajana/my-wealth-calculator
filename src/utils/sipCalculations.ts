/**
 * SIP Calculation Utilities
 * 
 * Formula for SIP:
 * M = P × [{(1 + r)^n - 1} / r] × (1 + r)
 * 
 * Where:
 * M = Maturity amount
 * P = Monthly investment (SIP amount)
 * r = Monthly rate of return (annual rate / 12)
 * n = Number of months
 * 
 * For step-up SIP:
 * Each year, the SIP amount increases by step-up percentage
 */

export interface SIPInputs {
  monthlyInvestment: number;
  annualReturn: number;
  durationYears: number;
  stepUpPercentage: number;
}

export interface YearlyData {
  year: number;
  invested: number;
  returns: number;
  corpus: number;
  monthlySIP: number;
}

export interface SIPResult {
  totalInvested: number;
  estimatedReturns: number;
  finalCorpus: number;
  inflationAdjustedValue: number;
  yearlyData: YearlyData[];
}

/**
 * Calculate monthly rate of return from annual return
 */
function getMonthlyRate(annualReturn: number): number {
  return annualReturn / 100 / 12;
}

/**
 * Calculate SIP maturity amount for a given period
 * Formula: M = P × [{(1 + r)^n - 1} / r] × (1 + r)
 */
function calculateSIPMaturity(
  monthlyInvestment: number,
  monthlyRate: number,
  months: number
): number {
  if (monthlyRate === 0) {
    return monthlyInvestment * months;
  }
  
  const factor = (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
  return monthlyInvestment * factor * (1 + monthlyRate);
}

/**
 * Calculate total invested amount for a period
 */
function calculateTotalInvested(
  monthlyInvestment: number,
  months: number
): number {
  return monthlyInvestment * months;
}

/**
 * Calculate SIP with step-up
 * Each year, the monthly SIP amount increases by step-up percentage
 * 
 * Calculation approach:
 * - For each year, previous corpus grows with compound interest
 * - New SIP contributions for that year are added
 * - Step-up is applied at the start of each new year
 */
export function calculateSIP(inputs: SIPInputs): SIPResult {
  const { monthlyInvestment, annualReturn, durationYears, stepUpPercentage } = inputs;
  const monthlyRate = getMonthlyRate(annualReturn);
  const inflationRate = 0.06; // 6% inflation
  
  const yearlyData: YearlyData[] = [];
  let totalInvested = 0;
  let currentSIP = monthlyInvestment;
  let previousCorpus = 0;
  
  // Calculate year by year
  for (let year = 1; year <= durationYears; year++) {
    const monthsInYear = 12;
    const yearInvested = currentSIP * monthsInYear;
    totalInvested += yearInvested;
    
    // Calculate corpus at the end of this year
    // Step 1: Previous corpus (if any) grows with compound interest for 12 months
    const previousCorpusWithReturns = previousCorpus * Math.pow(1 + monthlyRate, monthsInYear);
    
    // Step 2: Calculate maturity value of new SIP contributions for this year
    // Formula assumes payments at the beginning of each month (annuity due)
    const newSIPMaturity = calculateSIPMaturity(currentSIP, monthlyRate, monthsInYear);
    
    // Step 3: Total corpus = previous corpus (grown) + new SIP contributions
    const corpus = previousCorpusWithReturns + newSIPMaturity;
    
    const returns = corpus - totalInvested;
    
    yearlyData.push({
      year,
      invested: totalInvested,
      returns,
      corpus,
      monthlySIP: currentSIP,
    });
    
    // Update for next year
    previousCorpus = corpus;
    // Apply step-up for next year (increase monthly SIP by step-up percentage)
    currentSIP = currentSIP * (1 + stepUpPercentage / 100);
  }
  
  const finalData = yearlyData[yearlyData.length - 1];
  const finalCorpus = finalData.corpus;
  const estimatedReturns = finalData.returns;
  
  // Calculate inflation-adjusted value
  // Future value adjusted for inflation: FV / (1 + inflation)^years
  // This shows the real purchasing power in today's terms
  const inflationAdjustedValue = finalCorpus / Math.pow(1 + inflationRate, durationYears);
  
  return {
    totalInvested,
    estimatedReturns,
    finalCorpus,
    inflationAdjustedValue,
    yearlyData,
  };
}

/**
 * Format currency in Indian Rupees format
 */
export function formatCurrency(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  } else if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(2)} K`;
  }
  return `₹${amount.toFixed(0)}`;
}

/**
 * Format large numbers with commas
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(num);
}

