import React from 'react';

type FooterLinksProps = {
  className?: string;
  onPrivacyClick?: () => void;
  onTermsClick?: () => void;
  onDisclaimerClick?: () => void;
};

export const FooterLinks: React.FC<FooterLinksProps> = ({
  className,
  onPrivacyClick,
  onTermsClick,
  onDisclaimerClick,
}) => {
  const handleClick = (e: React.MouseEvent, cb?: () => void) => {
    e.preventDefault();
    cb?.();
  };

  return (
    <div className={className ?? 'w-full text-center text-xs text-gray-500'}>
      <a
        href="#/privacy-policy"
        className="hover:text-gray-700 underline"
        onClick={onPrivacyClick ? (e) => handleClick(e, onPrivacyClick) : undefined}
      >
        Privacy Policy
      </a>
      <span className="mx-2">|</span>
      <a
        href="#/terms-and-conditions"
        className="hover:text-gray-700 underline"
        onClick={onTermsClick ? (e) => handleClick(e, onTermsClick) : undefined}
      >
        Terms &amp; Conditions
      </a>
      <span className="mx-2">|</span>
      <a
        href="#/disclaimer"
        className="hover:text-gray-700 underline"
        onClick={onDisclaimerClick ? (e) => handleClick(e, onDisclaimerClick) : undefined}
      >
        Disclaimer
      </a>
    </div>
  );
};
