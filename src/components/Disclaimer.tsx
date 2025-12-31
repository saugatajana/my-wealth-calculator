import React from 'react';

type DisclaimerProps = {
  className?: string;
};

export const Disclaimer: React.FC<DisclaimerProps> = ({ className }) => {
  return (
    <p className={className ?? 'text-xs text-gray-600 italic'}>
      Returns shown are illustrative and not guaranteed. Mutual fund investments are subject to market risk.
    </p>
  );
};
