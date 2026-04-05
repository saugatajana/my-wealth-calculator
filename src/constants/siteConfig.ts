export const companyName = 'Investical';

const adsenseClientFromEnv = import.meta.env.VITE_ADSENSE_CLIENT?.trim() ?? '';
const adsenseAdSlotAfterChartFromEnv = import.meta.env.VITE_ADSENSE_AD_SLOT_AFTER_CHART?.trim() ?? '';

export const adsenseClient = adsenseClientFromEnv;
export const adsenseAdSlotAfterChart = adsenseAdSlotAfterChartFromEnv;
export const isAdsenseEnabled = Boolean(adsenseClient && adsenseAdSlotAfterChart);
