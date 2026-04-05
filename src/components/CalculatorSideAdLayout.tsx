import React from 'react';
import { adsenseAdSlotLeftRail, adsenseAdSlotRightRail, adsenseClient } from '../constants/siteConfig';
import { AdSlot } from './AdSlot';

type CalculatorSideAdLayoutProps = {
  children: React.ReactNode;
};

export const CalculatorSideAdLayout: React.FC<CalculatorSideAdLayoutProps> = ({ children }) => {
  return (
    <div className="mx-auto w-full max-w-[1800px] xl:px-3">
      <div className="flex items-start gap-4">
        {adsenseClient && adsenseAdSlotLeftRail ? (
          <aside className="sticky top-24 hidden w-[160px] shrink-0 xl:block">
            <AdSlot
              client={adsenseClient}
              slot={adsenseAdSlotLeftRail}
              className="rounded-lg bg-white p-2 shadow-sm"
            />
          </aside>
        ) : null}

        <div className="min-w-0 flex-1">{children}</div>

        {adsenseClient && adsenseAdSlotRightRail ? (
          <aside className="sticky top-24 hidden w-[160px] shrink-0 xl:block">
            <AdSlot
              client={adsenseClient}
              slot={adsenseAdSlotRightRail}
              className="rounded-lg bg-white p-2 shadow-sm"
            />
          </aside>
        ) : null}
      </div>
    </div>
  );
};
