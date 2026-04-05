import React from 'react';
import { adsenseClient, isAdsenseEnabled } from '../constants/siteConfig';

const ADSENSE_SCRIPT_BASE = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';

export const AdSenseScript: React.FC = () => {
  React.useEffect(() => {
    if (!isAdsenseEnabled || !adsenseClient) {
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src^="${ADSENSE_SCRIPT_BASE}"]`
    );
    if (existingScript) {
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = `${ADSENSE_SCRIPT_BASE}?client=${encodeURIComponent(adsenseClient)}`;
    document.head.appendChild(script);
  }, []);

  return null;
};
