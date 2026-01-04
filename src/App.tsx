import React from 'react';
import { CalculatorNav } from './components/CalculatorNav';
import { SIPCalculator } from './components/SIPCalculator';
import { LumpsumCalculator } from './components/LumpsumCalculator';
import { FIRECalculator } from './components/FIRECalculator';
import { SWPCalculator } from './components/SWPCalculator';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsAndConditions } from './components/TermsAndConditions';
import { DisclaimerPage } from './components/DisclaimerPage';
import './App.css';

function App() {
  const [hash, setHash] = React.useState(() => window.location.hash);

  React.useEffect(() => {
    if (window.location.pathname === '/' || window.location.pathname === '') {
      window.history.replaceState(null, '', '/sip-calculator/');
    }

    if (window.location.pathname === '/sip-calculator') {
      window.history.replaceState(null, '', '/sip-calculator/');
    }

    const onHashChange = () => {
      setHash(window.location.hash);
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const path = hash.replace(/^#/, '');
  const pathname = window.location.pathname;
  const isSipCalculatorPath = pathname.startsWith('/sip-calculator');
  const isLumpsumCalculatorPath = pathname.startsWith('/lumpsum-calculator');
  const isFireCalculatorPath = pathname.startsWith('/fire-calculator');
  const isSwpCalculatorPath = pathname.startsWith('/swp-calculator');

  const content =
    path === '/privacy-policy'
      ? <PrivacyPolicy />
      : path === '/terms-and-conditions'
        ? <TermsAndConditions />
        : path === '/disclaimer'
          ? <DisclaimerPage />
          : isSipCalculatorPath
            ? <SIPCalculator />
            : isLumpsumCalculatorPath
              ? <LumpsumCalculator />
              : isFireCalculatorPath
                ? <FIRECalculator />
                : isSwpCalculatorPath
                  ? <SWPCalculator />
                : null;

  React.useEffect(() => {
    if (content === null) {
      window.history.replaceState(null, '', '/sip-calculator/');
    }
  }, [content]);

  return (
    <div className="min-h-screen bg-gray-50">
      <CalculatorNav />
      {content}
    </div>
  );
}

export default App;

