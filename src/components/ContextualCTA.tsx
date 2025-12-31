import React from 'react';
import { formatCurrency, formatNumber } from '../utils/sipCalculations';

interface AffiliateLink {
  label: string;
  url: string;
  isPrimary?: boolean;
}

interface ContextualCTAProps {
  finalCorpus: number;
  durationYears: number;
  monthlyInvestment: number;
  headline?: string;
  primaryCTA?: AffiliateLink;
  secondaryCTA?: AffiliateLink;
  showTrustBadges?: boolean;
}

/**
 * Contextual CTA Component
 * 
 * Trust & Conversion Strategy:
 * - Dynamic messaging: Uses actual calculated values (corpus, years, monthly investment)
 *   to create personalized, relevant CTAs that feel tailored to the user's scenario
 * - Immediate updates: CTA text updates in real-time as user adjusts inputs,
 *   maintaining relevance and reducing friction
 * - Trust badges: Visual indicators (India-focused, no signup, free, educational)
 *   build confidence without being pushy
 * - Clear value proposition: Headline shows specific outcome user can achieve,
 *   making the benefit tangible and actionable
 * - Affiliate disclosure: Transparent about monetization to maintain trust
 * 
 * High-conversion design principles:
 * - Primary CTA uses specific amount (₹X/month) for clarity
 * - Secondary CTA provides alternative option
 * - Mobile-responsive with proper spacing and touch targets
 * - Visual hierarchy guides attention to CTAs
 */
export const ContextualCTA: React.FC<ContextualCTAProps> = ({
  finalCorpus,
  durationYears,
  monthlyInvestment,
  headline,
  primaryCTA,
  secondaryCTA,
  showTrustBadges = true,
}) => {
  const formattedCorpus = formatCurrency(finalCorpus);
  const formattedMonthly = formatNumber(monthlyInvestment);

  // Default affiliate links if not provided
  const defaultPrimaryCTA: AffiliateLink = {
    label: `Start ₹${formattedMonthly}/month SIP on Groww`,
    url: 'https://groww.in',
    isPrimary: true,
  };

  const defaultSecondaryCTA: AffiliateLink = {
    label: 'Start this SIP on Zerodha',
    url: 'https://zerodha.com',
    isPrimary: false,
  };

  const finalPrimaryCTA = primaryCTA || defaultPrimaryCTA;
  const finalSecondaryCTA = secondaryCTA || defaultSecondaryCTA;

  return (
    <div className="card bg-gradient-to-br from-primary-50 to-primary-100 border-2 border-primary-200 mb-8">
      <div className="text-center py-6">
        {/* Headline */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 px-2">
          {headline ? (
            headline
          ) : (
            <>
              To build <span className="text-primary-700">{formattedCorpus}</span> in{' '}
              <span className="text-primary-700">{durationYears} years</span>, start your SIP today
            </>
          )}
        </h2>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          {finalPrimaryCTA && (
            <a
              href={finalPrimaryCTA.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg ${
                finalPrimaryCTA.isPrimary
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-white text-primary-700 border-2 border-primary-600 hover:bg-primary-50'
              }`}
            >
              {finalPrimaryCTA.label}
            </a>
          )}
          {finalSecondaryCTA && (
            <a
              href={finalSecondaryCTA.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg ${
                finalSecondaryCTA.isPrimary
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-white text-primary-700 border-2 border-primary-600 hover:bg-primary-50'
              }`}
            >
              {finalSecondaryCTA.label}
            </a>
          )}
        </div>

        {/* Affiliate disclosure */}
        <p className="text-xs text-gray-600 mb-6">
          These are affiliate links. We may earn a commission at no extra cost to you.
        </p>

        {/* Trust Badges - Conditionally rendered */}
        {showTrustBadges && (
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 pt-4 border-t border-primary-200">
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-gray-600">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="whitespace-nowrap">India-focused</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-gray-600">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="whitespace-nowrap">No signup</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-gray-600">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="whitespace-nowrap">Free & private</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-gray-600">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="whitespace-nowrap">Educational</span>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

