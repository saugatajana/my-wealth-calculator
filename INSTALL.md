# Installation Guide

## Quick Install

If `npm install` is stuck or having permission issues, try these solutions:

### Option 1: Run npm install directly in your terminal
```bash
cd /Users/s0j011f/CascadeProjects/my-wealth-calculator
npm install
```

### Option 2: Use npm with different flags
```bash
npm install --legacy-peer-deps --no-audit --no-fund
```

### Option 3: Clear npm cache and retry
```bash
npm cache clean --force
npm install
```

### Option 4: Install packages individually (if bulk install fails)
```bash
npm install react react-dom
npm install recharts
npm install -D vite @vitejs/plugin-react
npm install -D typescript @types/react @types/react-dom
npm install -D tailwindcss postcss autoprefixer
npm install -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
npm install -D eslint-plugin-react-hooks eslint-plugin-react-refresh
```

### Option 5: Use alternative package manager

**Install Yarn:**
```bash
npm install -g yarn
yarn install
```

**Or install pnpm:**
```bash
npm install -g pnpm
pnpm install
```

## After Installation

Once dependencies are installed, run:

```bash
npm run dev
```

This will start the development server at `http://localhost:5173`

