# SIP Calculator India

A modern, SEO-friendly SIP (Systematic Investment Plan) Calculator web application built with React, TypeScript, Tailwind CSS, and Recharts.

## Features

- **Real-time SIP Calculations**: Calculate total invested, estimated returns, and final corpus
- **Step-up SIP Support**: Increase your monthly investment annually
- **Inflation Adjustment**: View inflation-adjusted final value (6% inflation)
- **Interactive Charts**: Visualize corpus growth year-wise using Recharts
- **Responsive Design**: Mobile-friendly UI with premium fintech aesthetics
- **SEO Optimized**: Semantic HTML, meta tags, and proper structure
- **Monetization Ready**: AdSense placeholder and affiliate CTA sections

## Tech Stack

- **React 18** with **Vite**
- **TypeScript**
- **Tailwind CSS** for styling
- **Recharts** for data visualization

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
my-wealth-calculator/
├── src/
│   ├── components/
│   │   ├── SIPCalculator.tsx      # Main calculator component
│   │   ├── SliderInput.tsx        # Reusable slider + input component
│   │   ├── SummaryCards.tsx       # Summary metrics cards
│   │   └── GrowthChart.tsx        # Recharts line chart
│   ├── utils/
│   │   └── sipCalculations.ts     # SIP calculation logic
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

## SIP Calculation Formula

The calculator uses the standard SIP formula:

```
M = P × [{(1 + r)^n - 1} / r] × (1 + r)
```

Where:
- M = Maturity amount
- P = Monthly investment (SIP amount)
- r = Monthly rate of return (annual rate / 12)
- n = Number of months

For step-up SIP, the monthly investment increases annually by the specified percentage.

## Features in Detail

### Input Controls
- Monthly Investment: ₹500 - ₹1,00,000 (slider + input)
- Expected Annual Return: 6% - 20% (slider + input)
- Investment Duration: 1 - 30 years
- Step-up SIP: 0% - 20% yearly increase

### Output Metrics
- **Total Invested**: Sum of all monthly investments
- **Estimated Returns**: Difference between corpus and invested amount
- **Final Corpus**: Maturity value at the end of investment period
- **Inflation Adjusted Value**: Real purchasing power (6% inflation)

### Visualizations
- Year-wise corpus growth line chart
- Comparison of invested vs. corpus over time

## SEO & Monetization

- Semantic HTML structure
- Meta tags optimized for "SIP Calculator India"
- Google AdSense placeholder section
- CTA section with affiliate links (Groww, Zerodha)

## Enable Google AdSense

1. Create a local env file from the example:

```bash
cp .env.example .env
```

2. Add your AdSense details in `.env`:

- `VITE_ADSENSE_CLIENT`: your AdSense publisher id (example: `ca-pub-1234567890123456`)
- `VITE_ADSENSE_AD_SLOT_AFTER_CHART`: ad slot id to render below charts
- `VITE_ADSENSE_AD_SLOT_LEFT_RAIL` (optional): left side rail ad slot (desktop)
- `VITE_ADSENSE_AD_SLOT_RIGHT_RAIL` (optional): right side rail ad slot (desktop)
- `VITE_ADSENSE_ENABLE_PAGE_LEVEL_ADS` (optional): set `true` to enable AdSense auto/page-level ads (default `true`)

If left/right rail slots are not set, the app falls back to `VITE_ADSENSE_AD_SLOT_AFTER_CHART`.

3. Restart dev server after changing env vars:

```bash
npm run dev
```

4. For production, set the same variables in your hosting provider (for example Vercel project environment variables) and redeploy.

## License

MIT

