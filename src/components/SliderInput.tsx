import React, { useEffect, useState } from 'react';
import { InfoTooltip } from './InfoTooltip';

interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
  tooltip?: string;
  compact?: boolean; // For smaller inputs (2-3 characters)
  showInput?: boolean; // Show/hide the text input box
  footer?: 'range' | 'selected' | 'none';
  selectedFooterFormat?: 'default' | 'compact';
}

/**
 * Reusable SliderInput component
 * Combines a range slider with a number input for better UX
 */
export const SliderInput: React.FC<SliderInputProps> = ({
  label,
  value,
  min,
  max,
  step,
  unit = '',
  onChange,
  formatValue,
  tooltip,
  compact = false,
  showInput = true,
  footer = 'range',
  selectedFooterFormat = 'default',
}) => {
  const [inputValue, setInputValue] = useState<string>(String(value));
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setInputValue(String(value));
    }
  }, [value, isEditing]);

  const formatMinMaxLabel = (num: number) => {
    const formatted = formatValue ? formatValue(num) : String(num);
    if (!unit) return formatted;

    if (unit === '₹') {
      return `${unit}${formatted}`;
    }

    return `${formatted}${unit}`;
  };

  const formatSelectedCompact = (n: number) => {
    const abs = Math.abs(n);
    const formatDecimal = (v: number) => {
      const rounded = Math.round(v * 10) / 10;
      return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
    };

    if (abs >= 10000000) return `${formatDecimal(n / 10000000)}Cr`;
    if (abs >= 100000) return `${formatDecimal(n / 100000)}L`;
    if (abs >= 1000) return `${Math.round(n / 1000)}K`;
    return String(Math.round(n));
  };

  const formatSelectedFooter = (num: number) => {
    const formatted =
      selectedFooterFormat === 'compact'
        ? formatSelectedCompact(num)
        : (formatValue ? formatValue(num) : String(num));

    if (!unit) return formatted;

    if (unit === '₹') return `${unit}${formatted}`;

    return `${formatted} ${unit}`;
  };

  const sliderPercent = max === min ? 0 : ((value - min) / (max - min)) * 100;
  const sliderTrackStyle: React.CSSProperties = {
    background: `linear-gradient(to right, #0284c7 0%, #0284c7 ${sliderPercent}%, #e5e7eb ${sliderPercent}%, #e5e7eb 100%)`,
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(e.target.value));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let next = e.target.value;

    if (next === '') {
      setInputValue('');
      onChange(min);
      return;
    }

    // Strip leading zeros (e.g. 013 -> 13) while keeping a single zero valid.
    next = next.replace(/^0+(?=\d)/, '');
    setInputValue(next);

    const raw = parseFloat(next);
    if (!Number.isFinite(raw)) {
      return;
    }

    const clampedValue = Math.max(min, Math.min(max, raw));
    onChange(clampedValue);
  };

  const handleInputBlur = () => {
    setIsEditing(false);

    if (inputValue.trim() === '') {
      setInputValue(String(min));
      onChange(min);
      return;
    }

    const raw = parseFloat(inputValue);
    const newValue = Number.isFinite(raw) ? raw : min;
    const clampedValue = Math.max(min, Math.min(max, newValue));
    setInputValue(String(clampedValue));
    onChange(clampedValue);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700 flex items-center">
          {label}
          {tooltip && <InfoTooltip content={tooltip} />}
        </label>
        {showInput && (
          <div className="flex items-center gap-2">
            {unit === '₹' && (
              <span className="text-sm font-medium text-gray-600">{unit}</span>
            )}
            <input
              type="number"
              value={inputValue}
              min={min}
              max={max}
              step={step}
              onChange={handleInputChange}
              onFocus={() => setIsEditing(true)}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              className={compact 
                ? "w-16 sm:w-20 px-2 py-1.5 text-sm font-semibold text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                : "w-28 sm:w-32 px-2.5 py-1.5 text-sm font-semibold text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              }
            />
            {unit && unit !== '₹' && (
              <span className="text-sm font-medium text-gray-600">{unit}</span>
            )}
          </div>
        )}
        {!showInput && unit && (
          <span className="text-base font-semibold text-gray-900">
            {unit === '₹' ? `${unit}${value}` : `${value} ${unit}`}
          </span>
        )}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleSliderChange}
        style={sliderTrackStyle}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary-600"
      />
      {footer !== 'none' &&
        (footer === 'selected' ? (
          <div className="flex justify-start text-xs text-gray-600 font-medium">
            <span>{formatSelectedFooter(value)}</span>
          </div>
        ) : (
          <div className="flex justify-between text-xs text-gray-500">
            <span>{formatMinMaxLabel(min)}</span>
            <span>{formatMinMaxLabel(max)}</span>
          </div>
        ))}
    </div>
  );
};

