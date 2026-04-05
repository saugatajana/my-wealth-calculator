import React from 'react';
import { adsenseClient, enablePageLevelAds, isAdsenseEnabled } from '../constants/siteConfig';

const ADSENSE_SCRIPT_BASE = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
    __adsensePageLevelConfigured?: boolean;
  }
}

export const AdSenseScript: React.FC = () => {
  React.useEffect(() => {
    if (!isAdsenseEnabled || !adsenseClient) {
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src^="${ADSENSE_SCRIPT_BASE}"]`
    );
    if (!existingScript) {
      const script = document.createElement('script');
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.src = `${ADSENSE_SCRIPT_BASE}?client=${encodeURIComponent(adsenseClient)}`;
      document.head.appendChild(script);
    }

    if (enablePageLevelAds && !window.__adsensePageLevelConfigured) {
      window.adsbygoogle = window.adsbygoogle || [];
      const pageLevelConfig: unknown = {
        google_ad_client: adsenseClient,
        enable_page_level_ads: true,
      };
      window.adsbygoogle.push(pageLevelConfig);
      window.__adsensePageLevelConfigured = true;
    }
  }, [adsenseClient]);

  return null;
};
