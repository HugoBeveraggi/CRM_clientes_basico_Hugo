/**
 * Select — Mini CRM UI
 * Styled native select element.
 */

import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  wrapperClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, wrapperClassName = '', className = '', id, children, ...rest }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className={`flex flex-col gap-1 ${wrapperClassName}`}>
        {label && (
          <label
            htmlFor={selectId}
            className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={`
              w-full appearance-none
              bg-[var(--color-surface)] text-[var(--color-text)] text-sm
              border border-[var(--color-border)] rounded-[var(--radius-md)]
              px-3 py-2 pr-9
              transition-colors duration-[var(--transition-fast)]
              hover:border-[var(--color-accent)]/60
              focus:outline-none focus:border-[var(--color-accent)]
              focus:ring-1 focus:ring-[var(--color-accent)]/30
              cursor-pointer
              ${error ? 'border-red-500' : ''}
              ${className}
            `}
            {...rest}
          >
            {children}
          </select>
          <ChevronDown
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-dim)] pointer-events-none"
          />
        </div>
        {error && (
          <span className="text-xs text-red-400">{error}</span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
