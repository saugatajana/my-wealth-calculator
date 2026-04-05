export const companyName = 'Investical';

const adsenseClientFromEnv = import.meta.env.VITE_ADSENSE_CLIENT?.trim() ?? '';
const adsenseAdSlotAfterChartFromEnv = import.meta.env.VITE_ADSENSE_AD_SLOT_AFTER_CHART?.trim() ?? '';
const adsenseAdSlotLeftRailFromEnv = import.meta.env.VITE_ADSENSE_AD_SLOT_LEFT_RAIL?.trim() ?? '';
const adsenseAdSlotRightRailFromEnv = import.meta.env.VITE_ADSENSE_AD_SLOT_RIGHT_RAIL?.trim() ?? '';
const enablePageLevelAdsFromEnv = import.meta.env.VITE_ADSENSE_ENABLE_PAGE_LEVEL_ADS?.trim() ?? 'true';

export const adsenseClient = adsenseClientFromEnv;
export const adsenseAdSlotAfterChart = adsenseAdSlotAfterChartFromEnv;
export const adsenseAdSlotLeftRail = adsenseAdSlotLeftRailFromEnv || adsenseAdSlotAfterChart;
export const adsenseAdSlotRightRail = adsenseAdSlotRightRailFromEnv || adsenseAdSlotAfterChart;
export const enablePageLevelAds =
  enablePageLevelAdsFromEnv !== 'false' && enablePageLevelAdsFromEnv !== '0';
export const isAdsenseEnabled = Boolean(adsenseClient);
