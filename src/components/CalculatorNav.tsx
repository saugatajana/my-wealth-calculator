import React from 'react';

type NavLink = {
  label: string;
  href: string;
  startsWith: string;
};

const links: NavLink[] = [
  { label: 'SIP Calculator', href: '/sip-calculator/', startsWith: '/sip-calculator' },
  { label: 'Lumpsum Calculator', href: '/lumpsum-calculator/', startsWith: '/lumpsum-calculator' },
  { label: 'FIRE Calculator', href: '/fire-calculator/', startsWith: '/fire-calculator' },
];

export const CalculatorNav: React.FC = () => {
  const pathname = window.location.pathname;

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end py-3">
          <nav className="flex items-center gap-2">
            {links.map((l) => {
              const isActive = pathname.startsWith(l.startsWith);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={
                    isActive
                      ? 'text-sm font-semibold text-primary-700 bg-primary-50 border border-primary-200 rounded-md px-3 py-1.5'
                      : 'text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 border border-transparent rounded-md px-3 py-1.5'
                  }
                >
                  {l.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};
