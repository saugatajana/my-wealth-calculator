export const companyName = 'Investical';

const adsenseClientFromEnv = import.meta.env.VITE_ADSENSE_CLIENT?.trim() ?? '';
const adsenseAdSlotAfterChartFromEnv = import.meta.env.VITE_ADSENSE_AD_SLOT_AFTER_CHART?.trim() ?? '';
const adsenseAdSlotLeftRailFromEnv = import.meta.env.VITE_ADSENSE_AD_SLOT_LEFT_RAIL?.trim() ?? '';
const adsenseAdSlotRightRailFromEnv = import.meta.env.VITE_ADSENSE_AD_SLOT_RIGHT_RAIL?.trim() ?? '';

export const adsenseClient = adsenseClientFromEnv;
export const adsenseAdSlotAfterChart = adsenseAdSlotAfterChartFromEnv;
export const adsenseAdSlotLeftRail = adsenseAdSlotLeftRailFromEnv || adsenseAdSlotAfterChart;
export const adsenseAdSlotRightRail = adsenseAdSlotRightRailFromEnv || adsenseAdSlotAfterChart;
export const isAdsenseEnabled = Boolean(
  adsenseClient && (adsenseAdSlotAfterChart || adsenseAdSlotLeftRail || adsenseAdSlotRightRail)
);
