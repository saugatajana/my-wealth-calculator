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
  initialInvestment?: number; // Optional initial lump sum investment
  inflationRate?: number; // Optional inflation rate for adjustment (default: 6%)
}

export interface YearlyData {
  year: number;
  invested: number;
  returns: number;
  corpus: number;
  monthlySIP: number;
  initialInvestmentGrown?: number; // Initial investment value after growth
}

export interface SIPResult {
  totalInvested: number;
  initialInvestment: number;
  estimatedReturns: number;
  finalCorpus: number;
  inflationAdjustedValue: number;
  inflationRate: number; // Store the inflation rate used for display
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
 * Calculate SIP with step-up
 * Each year, the monthly SIP amount increases by step-up percentage
 * 
 * Calculation approach:
 * - Initial investment (if any) grows with compound interest over the entire duration
 * - For each year, previous corpus grows with compound interest
 * - New SIP contributions for that year are added
 * - Step-up is applied at the start of each new year
 */
export function calculateSIP(inputs: SIPInputs): SIPResult {
  const { monthlyInvestment, annualReturn, durationYears, stepUpPercentage, initialInvestment = 0, inflationRate = 5 } = inputs;
  const monthlyRate = getMonthlyRate(annualReturn);
  const inflationRateDecimal = inflationRate / 100; // Convert percentage to decimal
  
  const yearlyData: YearlyData[] = [];
  let totalSIPInvested = 0;
  let currentSIP = monthlyInvestment;
  let previousCorpus = initialInvestment; // Start with initial investment
  
  // Calculate year by year
  for (let year = 1; year <= durationYears; year++) {
    const monthsInYear = 12;
    const yearSIPInvested = currentSIP * monthsInYear;
    totalSIPInvested += yearSIPInvested;
    
    // Calculate corpus at the end of this year
    // Step 1: Previous corpus (initial investment + previous SIP contributions) grows with compound interest for 12 months
    const previousCorpusWithReturns = previousCorpus * Math.pow(1 + monthlyRate, monthsInYear);
    
    // Step 2: Calculate maturity value of new SIP contributions for this year
    // Formula assumes payments at the beginning of each month (annuity due)
    const newSIPMaturity = calculateSIPMaturity(currentSIP, monthlyRate, monthsInYear);
    
    // Step 3: Total corpus = previous corpus (grown) + new SIP contributions
    const corpus = previousCorpusWithReturns + newSIPMaturity;
    
    // Calculate how much the initial investment has grown by this year
    const monthsElapsed = year * 12;
    const initialInvestmentGrown = initialInvestment * Math.pow(1 + monthlyRate, monthsElapsed);
    
    // Total invested includes initial investment + all SIP contributions
    const totalInvested = initialInvestment + totalSIPInvested;
    const returns = corpus - totalInvested;
    
    yearlyData.push({
      year,
      invested: totalInvested,
      returns,
      corpus,
      monthlySIP: currentSIP,
      initialInvestmentGrown: initialInvestment > 0 ? initialInvestmentGrown : undefined,
    });
    
    // Update for next year
    previousCorpus = corpus;
    // Apply step-up for next year (increase monthly SIP by step-up percentage)
    currentSIP = currentSIP * (1 + stepUpPercentage / 100);
  }
  
  const finalData = yearlyData[yearlyData.length - 1];
  const finalCorpus = finalData.corpus;
  const totalInvested = initialInvestment + totalSIPInvested;
  const estimatedReturns = finalCorpus - totalInvested;
  
  // Calculate inflation-adjusted value
  // Future value adjusted for inflation: FV / (1 + inflation)^years
  // This shows the real purchasing power in today's terms
  const inflationAdjustedValue = finalCorpus / Math.pow(1 + inflationRateDecimal, durationYears);
  
  return {
    totalInvested,
    initialInvestment,
    estimatedReturns,
    finalCorpus,
    inflationAdjustedValue,
    inflationRate,
    yearlyData,
  };
}

/**
 * Format currency in Indian Rupees format with commas
 */
export function formatCurrency(amount: number): string {
  if (amount >= 10000000) {
    const crores = amount / 10000000;
    return `₹${crores.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Cr`;
  } else if (amount >= 100000) {
    const lakhs = amount / 100000;
    return `₹${lakhs.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} L`;
  } else if (amount >= 1000) {
    const thousands = amount / 1000;
    return `₹${thousands.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} K`;
  }
  return `₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
}

/**
 * Format large numbers with commas
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(num);
}

