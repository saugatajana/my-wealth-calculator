/**
 * Feature Flags Configuration
 * 
 * Centralized feature flag management for monetization features.
 * Enable/disable ads and affiliate links across all pages from a single location.
 * 
 * Usage:
 * - Set to true to enable the feature
 * - Set to false to completely hide the feature (no layout gaps, no scripts loaded)
 * 
 * Future: Can be extended to use environment variables:
 *   const ENABLE_ADS = import.meta.env.VITE_ENABLE_ADS === "true"
 */

/*
 * Advertisement section feature flag.
 * Enable by setting ENABLE_ADS = true
 * or toggling env variable in production.
 */
export const ENABLE_ADS = false;

/*
 * Affiliate links/CTA section feature flag.
 * Enable by setting ENABLE_AFFILIATE_LINKS = true
 * or toggling env variable in production.
 * 
 * When enabled, shows contextual CTAs with affiliate links.
 * When disabled, section is completely hidden with no layout gaps.
 */
export const ENABLE_AFFILIATE_LINKS = false;

